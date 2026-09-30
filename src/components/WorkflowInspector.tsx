import React, { useState } from 'react';
import {
  GitBranch,
  FileCode,
  Send,
  Cpu,
  Mail,
  CheckCircle,
  Copy,
  ExternalLink,
  RefreshCw,
  Zap,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { N8nHealthStatus } from '../types.ts';

interface WorkflowInspectorProps {
  n8nStatus: N8nHealthStatus | null;
  targetUrl: string;
  onRefreshHealth: () => void;
  isChecking: boolean;
  onUpdateTargetUrl: (newUrl: string) => void;
}

export const WorkflowInspector: React.FC<WorkflowInspectorProps> = ({
  n8nStatus,
  targetUrl,
  onRefreshHealth,
  isChecking,
  onUpdateTargetUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [editingUrl, setEditingUrl] = useState(false);
  const [inputUrl, setInputUrl] = useState(targetUrl);

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onUpdateTargetUrl(inputUrl.trim());
      setEditingUrl(false);
    }
  };

  const nodes = [
    {
      step: '01',
      title: 'Form Trigger Node',
      type: 'n8n Form Trigger',
      desc: 'Listens for multipart POST at /form/4df2bfb6-3bc8-4836-a2ea-9619fbf8c544 with candidate fields.',
      icon: Zap,
      color: 'from-orange-500 to-rose-500',
    },
    {
      step: '02',
      title: 'File & Binary Parser',
      type: 'Document Extractor',
      desc: 'Parses binary payload (PDF, DOCX, TXT) into structured text streams and section trees.',
      icon: FileCode,
      color: 'from-amber-500 to-orange-500',
    },
    {
      step: '03',
      title: 'AI Analysis & ATS Scorer',
      type: 'LLM Reasoning Node',
      desc: 'Evaluates resume against ATS parsing rules, keyword matching, and quantifiable metrics.',
      icon: Cpu,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      step: '04',
      title: 'Report Synthesis',
      type: 'Code & Template Node',
      desc: 'Assembles scores, missing keyword suggestions, and personalized bullet rewrites into an executive dossier.',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      step: '05',
      title: 'Email Dispatcher',
      type: 'Email / SMTP Node',
      desc: 'Automates delivery of the complete candidate assessment report directly to the provided email address.',
      icon: Mail,
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <section id="workflow-section" className="py-16 sm:py-24 bg-white border-t border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-3">
            <GitBranch className="w-3.5 h-3.5 text-orange-600" />
            <span>n8n Cloud Automation Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How n8n Powers the Entire Pipeline
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Your submissions interact directly with n8n Cloud's visual workflow engine.
            Explore the connected nodes below.
          </p>
        </div>

        {/* Live URL & Health Control Banner */}
        <div className="max-w-4xl mx-auto mb-12 p-4 sm:p-5 rounded-2xl bg-slate-900 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="overflow-hidden">
              <span className="text-xs uppercase font-bold text-slate-400 block tracking-wider">
                Configured n8n Endpoint
              </span>
              {!editingUrl ? (
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-mono-code text-xs sm:text-sm text-rose-300 truncate max-w-md sm:max-w-lg">
                    {targetUrl}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors shrink-0"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copied && (
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      Copied!
                    </span>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSaveUrl} className="mt-2 flex items-center gap-2">
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 w-full focus:outline-hidden focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shrink-0"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputUrl(targetUrl);
                      setEditingUrl(false);
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs shrink-0"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={onRefreshHealth}
                disabled={isChecking}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-slate-400 ${
                    isChecking ? 'animate-spin' : ''
                  }`}
                />
                <span>Ping Webhook</span>
              </button>
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors"
              >
                <span>Direct Open</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Status info bar */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  n8nStatus?.online ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              />
              <span>
                Status:{' '}
                <strong className="text-white">
                  {n8nStatus?.online ? 'Online & Ready for POST' : 'Checking'}
                </strong>
              </span>
              {n8nStatus?.latencyMs !== undefined && (
                <span className="font-mono-code text-slate-400">
                  ({n8nStatus.latencyMs}ms response)
                </span>
              )}
            </div>
            {!editingUrl && (
              <button
                onClick={() => setEditingUrl(true)}
                className="text-slate-400 hover:text-white underline text-[11px]"
              >
                Change Webhook URL
              </button>
            )}
          </div>
        </div>

        {/* Nodes Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <div
                key={node.step}
                className="relative bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                {/* Arrow connector on desktop */}
                {index < nodes.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400 bg-white rounded-full p-0.5 border border-slate-200">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono-code font-bold text-slate-400">
                      NODE {node.step}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${node.color} text-white flex items-center justify-center shadow-xs`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {node.title}
                  </h4>
                  <span className="inline-block text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded mt-1">
                    {node.type}
                  </span>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {node.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center space-x-1.5 text-[11px] text-emerald-600 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Configured</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
