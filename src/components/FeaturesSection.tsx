import React from 'react';
import {
  FileSearch,
  Target,
  BarChart3,
  SpellCheck,
  Award,
  Lock,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: FileSearch,
      title: 'ATS Parser Compatibility',
      desc: 'Tested against standard algorithms used by Greenhouse, Lever, Workday, and Taleo to ensure zero parsing bottlenecks.',
      color: 'text-rose-600 bg-rose-50',
    },
    {
      icon: Target,
      title: 'Keyword Density & Gap Analysis',
      desc: 'Discovers high-frequency job description terms and indicates exactly which competencies you need to weave into your bullet points.',
      color: 'text-orange-600 bg-orange-50',
    },
    {
      icon: BarChart3,
      title: 'Quantified Impact Audit',
      desc: 'Evaluates your work history for numbers, percentages, dollar amounts, and operational scales to make your achievements pop.',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      icon: SpellCheck,
      title: 'Action-Verb & Grammar Polish',
      desc: 'Flags passive voice, redundant jargon, and generic filler words, replacing them with high-velocity executive action verbs.',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      icon: Award,
      title: 'Comparative Benchmark Score',
      desc: 'Receives an objective 0–100 percentile score against thousands of analyzed resumes in your target industry domain.',
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      icon: Lock,
      title: 'Zero-Retention Privacy',
      desc: 'Your uploaded resumes are processed exclusively for the purpose of generating your evaluation report, with strict confidentiality.',
      color: 'text-cyan-600 bg-cyan-50',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            Comprehensive Auditing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Everything Recruiter AI Checks on Your Resume
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Recruiters spend an average of 7.4 seconds on initial screening.
            Make sure every millisecond counts with our comprehensive audit framework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${feat.color} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
