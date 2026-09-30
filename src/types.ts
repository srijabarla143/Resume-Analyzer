export interface SubmissionResult {
  success: boolean;
  message: string;
  n8nStatus?: number;
  data?: any;
  candidate?: {
    name: string;
    email: string;
    fileName: string;
    fileSizeBytes: number;
    targetRole?: string;
  };
  referenceId?: string;
  timestamp?: string;
}

export interface N8nHealthStatus {
  online: boolean;
  status?: number;
  latencyMs?: number;
  url: string;
  timestamp?: string;
  error?: string;
}

export interface SampleResume {
  id: string;
  role: string;
  name: string;
  email: string;
  fileName: string;
  content: string;
  highlights: string[];
}
