import React from 'react';
import { Sparkles, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  targetUrl: string;
}

export const Footer: React.FC<FooterProps> = ({ targetUrl }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight">
                Resume<span className="text-rose-500">Analyser</span>
              </span>
              <p className="text-[11px] text-slate-400">
                Automated ATS Resume Assessment powered by n8n Cloud
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-xs text-slate-300">
            <a
              href="#upload-section"
              className="hover:text-white transition-colors"
            >
              Analyze Resume
            </a>
            <a
              href="#sample-report-section"
              className="hover:text-white transition-colors"
            >
              Sample Report
            </a>
            <a
              href="#workflow-section"
              className="hover:text-white transition-colors"
            >
              n8n Pipeline
            </a>
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>Raw n8n Form</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Resume Analyser. Connected to n8n Cloud workflow.
          </div>
          <div className="flex items-center space-x-1">
            <span>Built for intelligent workflow automation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
