import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  User,
  Mail,
  Briefcase,
  X,
  ArrowRight,
  Shield,
  Sparkles,
  ExternalLink,
  Clock,
  RotateCcw,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SAMPLE_RESUMES } from '../data/sampleResumes.ts';
import { SubmissionResult } from '../types.ts';

interface ResumeUploadFormProps {
  onSuccess: (result: SubmissionResult) => void;
  targetN8nUrl: string;
}

export const ResumeUploadForm: React.FC<ResumeUploadFormProps> = ({
  onSuccess,
  targetN8nUrl,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0); // 0 to 4
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#f97316', '#eab308', '#10b981', '#6366f1'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (selectedFile: File) => {
    setErrorMessage(null);
    const validExtensions = ['.pdf', '.docx', '.doc', '.txt', '.rtf'];
    const fileName = selectedFile.name.toLowerCase();
    const isValidType = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValidType) {
      setErrorMessage(
        'Please upload a supported resume format: PDF, DOCX, DOC, TXT, or RTF.'
      );
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setErrorMessage('Resume file size must be less than 20MB.');
      return;
    }

    setFile(selectedFile);
  };

  const loadSampleResume = (sampleId: string) => {
    const sample = SAMPLE_RESUMES.find((s) => s.id === sampleId);
    if (!sample) return;

    setName(sample.name);
    setEmail(sample.email);
    setTargetRole(sample.role);
    setErrorMessage(null);

    // Create a File object from the sample text
    const blob = new Blob([sample.content], { type: 'text/plain' });
    const sampleFile = new File([blob], sample.fileName, { type: 'text/plain' });
    setFile(sampleFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!file) {
      setErrorMessage('Please upload your resume file.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStep(1);

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('email', email.trim());
    formData.append('targetRole', targetRole.trim());
    formData.append('resume', file);
    formData.append('customN8nUrl', targetN8nUrl);

    // Visual step progression
    const timer1 = setTimeout(() => setSubmitStep(2), 700);
    const timer2 = setTimeout(() => setSubmitStep(3), 1600);

    try {
      const response = await fetch('/api/submit-resume', {
        method: 'POST',
        body: formData,
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      setSubmitStep(4);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit resume to n8n workflow.');
      }

      setResult(data);
      onSuccess(data);
      triggerConfetti();
    } catch (err: any) {
      console.error('Submission failed:', err);
      setErrorMessage(
        err.message ||
          'Submission to n8n failed. Please verify the n8n workflow is active or try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setTargetRole('');
    setFile(null);
    setResult(null);
    setErrorMessage(null);
    setSubmitStep(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div id="upload-section" className="scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 sm:px-10 py-6 sm:py-8 text-white relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold uppercase tracking-wider">
                  Resume Analyser Form
                </span>
                <span className="text-slate-400 text-xs flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400 inline" />
                  <span>n8n Webhook Linked</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2 text-white">
                Upload Resume for AI Evaluation
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                Outputs are generated by the n8n cloud automation workflow and
                delivered directly to your specified email.
              </p>
            </div>

            {/* n8n cloud badge */}
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl p-3 text-right hidden sm:block shrink-0">
              <span className="block text-[11px] font-mono-code text-slate-400">Target Webhook</span>
              <span className="block text-xs font-semibold text-rose-400 truncate max-w-[200px]" title={targetN8nUrl}>
                ...{targetN8nUrl.slice(-28)}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-10">
          {/* Quick Fill Sample Section */}
          <div className="mb-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <div className="flex items-center space-x-2 text-amber-900 text-xs sm:text-sm font-bold">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Need a sample resume to test immediately?</span>
              </div>
              <span className="text-[11px] font-medium text-amber-700">1-Click Auto-Fill</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
              {SAMPLE_RESUMES.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => loadSampleResume(sample.id)}
                  className="flex flex-col text-left p-2.5 rounded-xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-xs transition-all text-xs group"
                >
                  <span className="font-bold text-slate-900 group-hover:text-amber-800">
                    {sample.role}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {sample.name} ({sample.fileName.replace('.txt', '')})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* If Result exists: Success Screen */}
          {result && (
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-emerald-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Form Successfully Submitted!
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800">
                      Your resume has been ingested into the n8n Resume Analyser pipeline.
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 font-mono-code text-xs font-semibold">
                  HTTP 200 • {result.referenceId || 'N8N-TRIGGERED'}
                </div>
              </div>

              {/* Submission details breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-xs">
                <div className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-xs">
                  <span className="text-slate-400 block font-medium">Candidate Name</span>
                  <span className="text-slate-900 font-bold text-sm block mt-0.5">
                    {result.candidate?.name || name}
                  </span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-xs">
                  <span className="text-slate-400 block font-medium">Recipient Email</span>
                  <span className="text-slate-900 font-bold text-sm block mt-0.5 truncate">
                    {result.candidate?.email || email}
                  </span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-emerald-100 shadow-xs">
                  <span className="text-slate-400 block font-medium">Attached Resume</span>
                  <span className="text-slate-900 font-bold text-sm block mt-0.5 truncate">
                    {result.candidate?.fileName || file?.name}
                  </span>
                </div>
              </div>

              {/* What happens next */}
              <div className="p-4 rounded-xl bg-white border border-emerald-100 mb-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Next Steps in n8n Automation</span>
                </h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-500 font-bold">1.</span>
                    <span>
                      n8n form trigger received the document payload and initiated the workflow execution.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-500 font-bold">2.</span>
                    <span>
                      AI parser analyzes your skills, formatting, keyword density, and quantifiable metrics.
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-500 font-bold">3.</span>
                    <span>
                      Your complete Resume Analyser report is being dispatched to{' '}
                      <strong className="text-slate-900">{email}</strong>.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors text-xs sm:text-sm"
                >
                  <RotateCcw className="w-4 h-4 text-slate-500" />
                  <span>Submit Another Resume</span>
                </button>
                <a
                  href="#sample-report-section"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-colors text-xs sm:text-sm"
                >
                  <span>Preview What You'll Receive</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Form */}
          {!result && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-bold block">Submission Alert</span>
                    <span>{errorMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Personal Details Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Candidate Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-slate-900 text-sm placeholder:text-slate-400 transition-colors bg-white disabled:bg-slate-50"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Email Address for Report <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex.rivera@example.com"
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-slate-900 text-sm placeholder:text-slate-400 transition-colors bg-white disabled:bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              {/* Target Role (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>Target Role or Industry (Recommended)</span>
                  <span className="text-[11px] text-slate-400 font-normal">Helps tailor ATS keywords</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Senior Software Engineer, Product Manager, Financial Analyst"
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-slate-900 text-sm placeholder:text-slate-400 transition-colors bg-white disabled:bg-slate-50"
                  />
                </div>
              </div>

              {/* Resume File Upload Dropzone */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Upload Resume File <span className="text-rose-500">*</span>
                </label>

                {!file ? (
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                      dragActive
                        ? 'border-rose-500 bg-rose-50/50 scale-[1.01]'
                        : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.docx,.doc,.txt,.rtf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-600 mb-3 group-hover:scale-105 transition-transform">
                      <Upload className="w-6 h-6 text-rose-600" />
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      Click to upload or drag & drop your resume
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Supports PDF, DOCX, DOC, TXT, RTF (Max 20MB)
                    </p>
                    <div className="mt-3 flex items-center justify-center space-x-2 text-[11px] font-medium text-slate-400">
                      <Shield className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Encrypted transmission to n8n Cloud</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3.5 overflow-hidden">
                      <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="truncate">
                        <span className="text-sm font-bold text-slate-900 block truncate">
                          {file.name}
                        </span>
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <span>{formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Ready for upload</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      disabled={isSubmitting}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                      title="Remove file"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Progress Steps during submission */}
              {isSubmitting && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-rose-400 flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping inline-block" />
                      <span>
                        {submitStep === 1 && 'Validating resume document...'}
                        {submitStep === 2 && 'Packaging multipart payload...'}
                        {submitStep === 3 && 'Triggering n8n Resume Analyser...'}
                        {submitStep === 4 && 'Execution confirmed!'}
                      </span>
                    </span>
                    <span className="font-mono-code text-slate-400">
                      {submitStep === 1 && '25%'}
                      {submitStep === 2 && '55%'}
                      {submitStep === 3 && '85%'}
                      {submitStep === 4 && '100%'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-rose-500 via-orange-500 to-emerald-500 h-2 transition-all duration-500"
                      style={{
                        width:
                          submitStep === 1
                            ? '25%'
                            : submitStep === 2
                            ? '55%'
                            : submitStep === 3
                            ? '85%'
                            : '100%',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 hover:from-rose-500 hover:via-orange-500 hover:to-amber-500 shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span>
                    {isSubmitting
                      ? 'Submitting to n8n Automation...'
                      : 'Run AI Resume Analysis'}
                  </span>
                  {!isSubmitting && <ArrowRight className="w-4 h-4 ml-1" />}
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2.5">
                  Automated by n8n Cloud webhook. We never sell or share candidate data.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
