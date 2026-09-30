import React, { useState, useEffect } from 'react';
import { Sparkles, ExternalLink, Cpu, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { N8nHealthStatus } from '../types.ts';

interface HeaderProps {
  n8nStatus: N8nHealthStatus | null;
  onRefreshHealth: () => void;
  isCheckingHealth: boolean;
  onOpenSettings: () => void;
  targetUrl: string;
}

export const Header: React.FC<HeaderProps> = ({
  n8nStatus,
  onRefreshHealth,
  isCheckingHealth,
  onOpenSettings,
  targetUrl,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg sm:text-xl">
                  Resume<span className="text-rose-600">Analyser</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                  n8n Cloud
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                AI Automated Candidate Feedback
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => scrollToSection('upload-section')}
              className="hover:text-slate-950 transition-colors"
            >
              Analyze Resume
            </button>
            <button
              onClick={() => scrollToSection('sample-report-section')}
              className="hover:text-slate-950 transition-colors"
            >
              Sample Report
            </button>
            <button
              onClick={() => scrollToSection('workflow-section')}
              className="hover:text-slate-950 transition-colors"
            >
              n8n Pipeline
            </button>
            <button
              onClick={() => scrollToSection('faq-section')}
              className="hover:text-slate-950 transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Right Status Indicator & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Live n8n Cloud status indicator badge */}
            <div
              onClick={onOpenSettings}
              className="cursor-pointer group flex items-center space-x-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all text-xs"
              title="Click to view n8n webhook settings and health"
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`w-2 h-2 rounded-full ${
                    n8nStatus?.online
                      ? 'bg-emerald-500'
                      : n8nStatus === null
                      ? 'bg-amber-400'
                      : 'bg-rose-500'
                  }`}
                />
                {n8nStatus?.online && (
                  <span className="absolute w-3.5 h-3.5 rounded-full bg-emerald-400 opacity-40 animate-ping" />
                )}
              </div>
              <span className="font-medium text-slate-700 hidden lg:inline">
                {n8nStatus?.online ? 'n8n Connected' : 'n8n Webhook'}
              </span>
              {n8nStatus?.latencyMs !== undefined && (
                <span className="text-slate-400 font-mono-code text-[11px] hidden sm:inline">
                  {n8nStatus.latencyMs}ms
                </span>
              )}
            </div>

            {/* Direct Link to original form */}
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs"
              title="Open raw n8n form in new tab"
            >
              <span className="hidden sm:inline">Raw Form</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {/* Primary Action Button */}
            <button
              onClick={() => scrollToSection('upload-section')}
              className="inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 shadow-md shadow-rose-500/20 active:scale-95 transition-all"
            >
              <span>Scan Resume</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
