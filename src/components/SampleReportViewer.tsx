import React, { useState } from 'react';
import {
  Award,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileCheck,
  Target,
  Sparkles,
  ArrowRight,
  Zap,
} from 'lucide-react';

export const SampleReportViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'bulletRewrites' | 'formatting'>('overview');
  const [selectedRole, setSelectedRole] = useState<'swe' | 'pm' | 'data'>('swe');

  const roleData = {
    swe: {
      candidate: 'Alex Rivera',
      target: 'Senior Full Stack Engineer',
      atsScore: 91,
      impactScore: 88,
      readabilityScore: 94,
      strengths: [
        'Strong quantifiable achievements (e.g. "reduced latency by 38%", "boosted engagement by 24%")',
        'Modern in-demand tech stack identified: React, TypeScript, Node.js, Docker, Kubernetes',
        'Clean, single-column chronological structure easily parsed by ATS robots',
      ],
      missingKeywords: ['GraphQL', 'Terraform', 'Micro-frontends', 'System Reliability'],
      matchedKeywords: ['TypeScript', 'React', 'Docker', 'AWS', 'PostgreSQL', 'CI/CD', 'Node.js', 'Express', 'Redis'],
      bulletSuggestion: {
        before: 'Built interactive client dashboards handling real-time financial telemetry.',
        after:
          'Engineered real-time telemetry dashboards with WebSockets & React for 12,000+ traders, cutting rendering latency by 45%.',
        reason: 'Added concrete scale (12,000+ traders) and quantified latency reduction.',
      },
    },
    pm: {
      candidate: 'Sophia Chen',
      target: 'Lead Product Manager',
      atsScore: 94,
      impactScore: 96,
      readabilityScore: 92,
      strengths: [
        'Exceptional business outcomes with dollar figures ("$8.2M ARR in new product initiatives")',
        'Clear cross-functional squad leadership metrics (18 engineers, 2 UX designers)',
        'Grounded customer discovery and retention metrics (Day-30 retention lift of 31%)',
      ],
      missingKeywords: ['SQL Query Optimization', 'Roadmunk', 'B2B Enterprise SLA', 'SOC2 Compliance'],
      matchedKeywords: ['Product Roadmapping', 'GTM Strategy', 'A/B Testing', 'Mixpanel', 'FullStory', 'ARR Growth', 'Agile/Scrum'],
      bulletSuggestion: {
        before: 'Managed core checkout conversion funnel handling $120M annual GMV.',
        after:
          'Spearheaded checkout funnel optimization across 4 platforms, lifting conversion by 14.8% and unlocking $17.7M incremental GMV.',
        reason: 'Quantified the direct financial ROI of the checkout redesign.',
      },
    },
    data: {
      candidate: 'David Patel',
      target: 'Senior Data Analyst',
      atsScore: 89,
      impactScore: 86,
      readabilityScore: 93,
      strengths: [
        'Heavy emphasis on modern warehouse and ETL toolsets (Snowflake, dbt, Python, Tableau)',
        'Clear predictive modeling ROI (84% accuracy, reduced customer churn)',
        'Quantified cost-saving operations ($3.5M in efficiencies)',
      ],
      missingKeywords: ['Looker Modeling Language (LookML)', 'Apache Airflow', 'Kafka Streaming', 'Statistical Significance Testing'],
      matchedKeywords: ['Python', 'SQL', 'Snowflake', 'dbt', 'Tableau', 'Power BI', 'Scikit-Learn', 'Pandas', 'ETL Pipelines'],
      bulletSuggestion: {
        before: 'Analyzed transaction fraud patterns using SQL and Pandas.',
        after:
          'Implemented anomaly detection pipelines across 400K daily transactions, reducing fraud false-positives by 28% and saving $420K.',
        reason: 'Specified transaction volume and direct loss-prevention impact.',
      },
    },
  };

  const current = roleData[selectedRole];

  return (
    <section id="sample-report-section" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Interactive Report Preview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Your n8n Resume Analysis Looks Like
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Every submission triggers an in-depth audit covering recruiter readability,
            ATS keyword density, and bullet-point impact.
          </p>

          {/* Role selector tabs */}
          <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <button
              onClick={() => setSelectedRole('swe')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedRole === 'swe'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Software Engineer
            </button>
            <button
              onClick={() => setSelectedRole('pm')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedRole === 'pm'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Product Manager
            </button>
            <button
              onClick={() => setSelectedRole('data')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedRole === 'data'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Data Analyst
            </button>
          </div>
        </div>

        {/* Mock Report Window */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-5xl mx-auto">
          {/* Top Bar simulating report metadata */}
          <div className="bg-slate-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  n8n AI Evaluation Dossier
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-300 font-mono-code">
                  ID: #N8N-{selectedRole.toUpperCase()}-2026
                </span>
              </div>
              <h3 className="text-xl font-bold mt-1 text-white">
                {current.candidate} — {current.target}
              </h3>
            </div>

            {/* Score Ring */}
            <div className="flex items-center space-x-3 bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700">
              <div className="text-right">
                <span className="block text-[11px] text-slate-400 uppercase font-bold">
                  Overall ATS Score
                </span>
                <span className="block text-2xl font-extrabold text-emerald-400">
                  {current.atsScore}/100
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
                <Award className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 px-6 gap-6 text-xs sm:text-sm font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-rose-600 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Executive Summary
            </button>
            <button
              onClick={() => setActiveTab('keywords')}
              className={`py-3.5 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'keywords'
                  ? 'border-rose-600 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Keyword Match & Gaps
            </button>
            <button
              onClick={() => setActiveTab('bulletRewrites')}
              className={`py-3.5 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'bulletRewrites'
                  ? 'border-rose-600 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Bullet Point Rewriter
            </button>
            <button
              onClick={() => setActiveTab('formatting')}
              className={`py-3.5 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'formatting'
                  ? 'border-rose-600 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              ATS Formatting Audit
            </button>
          </div>

          {/* Report Tab Contents */}
          <div className="p-6 sm:p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 3 Metric cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block">
                      ATS Readability
                    </span>
                    <span className="text-3xl font-extrabold text-emerald-600 mt-1 block">
                      {current.readabilityScore}%
                    </span>
                    <p className="text-[11px] text-emerald-700 mt-1">
                      Header tags, fonts, and bullet styles are fully parseable.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200">
                    <span className="text-xs font-bold text-orange-800 uppercase tracking-wide block">
                      Impact Metrics
                    </span>
                    <span className="text-3xl font-extrabold text-orange-600 mt-1 block">
                      {current.impactScore}%
                    </span>
                    <p className="text-[11px] text-orange-700 mt-1">
                      8 of 10 experience bullet points contain quantifiable numbers.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
                    <span className="text-xs font-bold text-indigo-800 uppercase tracking-wide block">
                      Recruiter Callback Odds
                    </span>
                    <span className="text-3xl font-extrabold text-indigo-600 mt-1 block">
                      High (Top 8%)
                    </span>
                    <p className="text-[11px] text-indigo-700 mt-1">
                      Resume easily passes initial keyword screening filters.
                    </p>
                  </div>
                </div>

                {/* Key Strengths list */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Key Automated Highlights</span>
                  </h4>
                  <div className="space-y-2.5">
                    {current.strengths.map((str, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3 text-xs sm:text-sm text-slate-700"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'keywords' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Identified In-Demand Keywords ({current.matchedKeywords.length})</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {current.matchedKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{kw}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Recommended Keywords to Add ({current.missingKeywords.length})</span>
                  </h4>
                  <p className="text-xs text-slate-500 mb-3">
                    These keywords frequently appear in job postings for {current.target} but were
                    not detected in the resume text:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {current.missingKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200 flex items-center space-x-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span>{kw}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bulletRewrites' && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold block mb-1">
                    AI Formula: Action Verb + Context + Quantifiable Metric = Maximum Recruiter Impact
                  </span>
                  Weak verbs like "assisted with" or "handled" are flagged and rewritten into power sentences.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Before */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-200 text-slate-700 uppercase">
                      Original Resume Bullet
                    </span>
                    <p className="mt-3 text-sm text-slate-700 italic">
                      "{current.bulletSuggestion.before}"
                    </p>
                    <span className="text-[11px] text-rose-500 block mt-3 font-semibold">
                      ⚠️ Needs specific metrics & user volume
                    </span>
                  </div>

                  {/* After */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-200 text-emerald-900 uppercase">
                      Suggested AI Enhancement
                    </span>
                    <p className="mt-3 text-sm text-slate-900 font-medium">
                      "{current.bulletSuggestion.after}"
                    </p>
                    <span className="text-[11px] text-emerald-700 block mt-3 font-semibold">
                      ✨ {current.bulletSuggestion.reason}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'formatting' && (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                    <span className="font-bold text-slate-900 block mb-2">
                      ATS Parser Checklist
                    </span>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>Single column layout (No complex tables)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>Standard section titles (Experience, Education)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>Clean font choice & readable margins</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                    <span className="font-bold text-slate-900 block mb-2">
                      Recruiter Eye-Track Audit
                    </span>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>Contact info prominently positioned at top</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>LinkedIn & Portfolio hyperlinks active</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>Reverse-chronological work history verified</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
