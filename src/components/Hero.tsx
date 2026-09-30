import React from 'react';
import { ArrowDown, CheckCircle2, ShieldCheck, Zap, Sparkles, FileText, Bot, Send } from 'lucide-react';

interface HeroProps {
  onStartScan: () => void;
  onViewSample: () => void;
  targetUrl: string;
}

export const Hero: React.FC<HeroProps> = ({ onStartScan, onViewSample, targetUrl }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 bg-radial from-orange-50/50 via-slate-50 to-white">
      {/* Decorative gradient blur background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-rose-200/40 via-orange-100/30 to-amber-100/20 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top pill badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-900 text-xs font-semibold mb-6 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-orange-600 animate-pulse" />
            <span>Connected to n8n Cloud Workflow</span>
            <span className="text-orange-400">|</span>
            <span className="text-orange-700">Resume Analyser Node</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Land More Interviews with{' '}
            <span className="bg-gradient-to-r from-rose-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{' '}
            Resume Insights
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Tired of resume black holes? Our automated n8n cloud workflow extracts your resume,
            evaluates it against modern Applicant Tracking Systems (ATS), pinpoints missing keywords,
            and delivers an actionable review straight to your email.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onStartScan}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all text-sm sm:text-base"
            >
              <Zap className="w-5 h-5 text-amber-200" />
              <span>Submit Resume for Free</span>
              <ArrowDown className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={onViewSample}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm active:scale-[0.98] transition-all text-sm sm:text-base"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Explore Sample Report</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-10 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-slate-700">
                Instant ATS Check
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Zap className="w-5 h-5 text-amber-500 shrink-0" />
              <span className="text-xs font-semibold text-slate-700">
                n8n Cloud Webhook
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Send className="w-5 h-5 text-rose-500 shrink-0" />
              <span className="text-xs font-semibold text-slate-700">
                Direct Email Report
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
              <span className="text-xs font-semibold text-slate-700">
                100% Private & Secure
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
