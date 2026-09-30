import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Copy,
  Zap,
} from 'lucide-react';
import { N8nHealthStatus } from '../types.ts';

interface N8nSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
  onUpdateTargetUrl: (url: string) => void;
  n8nStatus: N8nHealthStatus | null;
  onRefreshHealth: () => void;
  isChecking: boolean;
}

export const N8nSettingsModal: React.FC<N8nSettingsModalProps> = ({
  isOpen,
  onClose,
  targetUrl,
  onUpdateTargetUrl,
  n8nStatus,
  onRefreshHealth,
  isChecking,
}) => {
  const [url, setUrl] = useState(targetUrl);
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onUpdateTargetUrl(url.trim());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const handleResetDefault = () => {
    const defaultUrl = 'https://barlasrija.app.n8n.cloud/form/4df2bfb6-3bc8-4836-a2ea-9619fbf8c544';
    setUrl(defaultUrl);
    onUpdateTargetUrl(defaultUrl);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-rose-500" />
            <h3 className="font-bold text-base">n8n Cloud Webhook Configuration</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs sm:text-sm">
          {/* Health Status Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-xs block font-medium">Endpoint Status</span>
              <div className="flex items-center space-x-2 mt-0.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    n8nStatus?.online ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
                <span className="font-bold text-slate-900">
                  {n8nStatus?.online ? 'Online & Operational' : 'Checking Connection'}
                </span>
                {n8nStatus?.latencyMs !== undefined && (
                  <span className="text-slate-500 font-mono-code text-xs">
                    ({n8nStatus.latencyMs}ms)
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onRefreshHealth}
              disabled={isChecking}
              className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors disabled:opacity-50"
              title="Ping Webhook"
            >
              <RefreshCw
                className={`w-4 h-4 ${isChecking ? 'animate-spin text-rose-600' : ''}`}
              />
            </button>
          </div>

          {/* Form to update URL */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Target n8n Form Webhook URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono-code text-xs text-slate-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Submissions automatically map to fields: field-0 (name), field-1 (email), and field-2 (file).
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleResetDefault}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium underline"
              >
                Reset to Default URL
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-xs"
                >
                  {saveSuccess ? 'Saved!' : 'Save URL'}
                </button>
              </div>
            </div>
          </form>

          {/* Direct Raw Link */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Need to view n8n native form?</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 font-semibold text-rose-600 hover:text-rose-700"
            >
              <span>Open in new window</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
