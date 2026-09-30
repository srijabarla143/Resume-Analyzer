import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Multer memory storage (up to 20MB files)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DEFAULT_N8N_URL = 'https://barlasrija.app.n8n.cloud/form/4df2bfb6-3bc8-4836-a2ea-9619fbf8c544';

// Check n8n webhook health / availability
app.get('/api/check-n8n', async (req: Request, res: Response) => {
  const targetUrl = (req.query.url as string) || DEFAULT_N8N_URL;
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ResumeAnalyser/1.0)',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const latency = Date.now() - startTime;
    return res.json({
      online: response.ok || response.status === 200 || response.status === 404, // 404 on GET is standard for n8n webhook/forms when expecting POST or signature
      status: response.status,
      latencyMs: latency,
      url: targetUrl,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    const latency = Date.now() - startTime;
    return res.json({
      online: false,
      error: err.message || 'Connection failed',
      latencyMs: latency,
      url: targetUrl,
      timestamp: new Date().toISOString(),
    });
  }
});

// Get Configuration
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({
    defaultN8nUrl: DEFAULT_N8N_URL,
    appName: 'AI Resume Analyser',
    supportedFormats: ['.pdf', '.docx', '.doc', '.txt', '.rtf'],
    maxFileSizeMb: 20,
  });
});

// Proxy form submission to n8n webhook
app.post('/api/submit-resume', upload.single('resume'), async (req: Request, res: Response) => {
  try {
    const name = (req.body.name || req.body['field-0'] || '').trim();
    const email = (req.body.email || req.body['field-1'] || '').trim();
    const targetRole = (req.body.targetRole || '').trim();
    const customN8nUrl = (req.body.customN8nUrl || '').trim();
    const n8nUrl = customN8nUrl || DEFAULT_N8N_URL;

    if (!name) {
      return res.status(400).json({ error: 'Candidate name is required.' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid candidate email is required.' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required.' });
    }

    // Build FormData to forward to n8n form endpoint
    // n8n expects field-0 (name), field-1 (email), and field-2 (file)
    const forwardFormData = new FormData();
    forwardFormData.append('field-0', name);
    forwardFormData.append('field-1', email);

    // Optional metadata that n8n workflow can parse
    if (targetRole) {
      forwardFormData.append('targetRole', targetRole);
    }

    const fileBlob = new Blob([new Uint8Array(req.file.buffer)], {
      type: req.file.mimetype || 'application/octet-stream',
    });
    forwardFormData.append('field-2', fileBlob, req.file.originalname || 'resume.pdf');

    // Forward to n8n
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000); // 20s timeout for n8n processing

    const n8nResponse = await fetch(n8nUrl, {
      method: 'POST',
      body: forwardFormData,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const responseText = await n8nResponse.text();
    let responseData: any = null;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    if (n8nResponse.ok || n8nResponse.status === 200) {
      return res.json({
        success: true,
        message: 'Resume received and successfully queued in n8n automation workflow!',
        n8nStatus: n8nResponse.status,
        data: responseData,
        candidate: {
          name,
          email,
          fileName: req.file.originalname,
          fileSizeBytes: req.file.size,
          targetRole: targetRole || 'General Professional',
        },
        referenceId: 'N8N-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        timestamp: new Date().toISOString(),
      });
    } else {
      return res.status(n8nResponse.status).json({
        success: false,
        error: `n8n responded with status ${n8nResponse.status}`,
        details: responseData,
      });
    }
  } catch (err: any) {
    console.error('Error in /api/submit-resume:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to submit resume to n8n workflow.',
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Target n8n Webhook: ${DEFAULT_N8N_URL}`);
  });
}

startServer();
