import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does this website connect to the n8n URL?',
      a: 'This website acts as a modern, high-converting interface for the n8n form webhook at https://barlasrija.app.n8n.cloud/form/4df2bfb6-3bc8-4836-a2ea-9619fbf8c544. When you submit your name, email, and resume, our proxy packages the data into the exact multipart format n8n expects (field-0, field-1, field-2) and triggers the cloud execution in real-time.',
    },
    {
      q: 'Which resume file formats are supported?',
      a: 'The n8n workflow accepts PDF (.pdf), Microsoft Word (.docx, .doc), Plain Text (.txt), and Rich Text (.rtf) formats up to 20MB in file size.',
    },
    {
      q: 'How long does the AI analysis take to reach my inbox?',
      a: 'Once submitted, the n8n cloud workflow extracts the text, runs it through the AI parsing and ATS scoring prompts, formats the dossier, and dispatches the email. This typically takes between 1 to 3 minutes depending on cloud load.',
    },
    {
      q: 'Is my resume data kept private and secure?',
      a: 'Yes! Your resume document is transmitted over encrypted TLS 1.3 connections directly to your private n8n cloud instance. It is never sold, indexed in public datasets, or shared with third parties.',
    },
    {
      q: 'Can I test the website even if I don’t have a resume file on my device right now?',
      a: 'Absolutely! Click any of the "Quick Test with Sample" presets on the upload form (Alex Rivera - SWE, Sophia Chen - PM, or David Patel - Data Analyst). The form will automatically populate realistic credentials and attach a sample resume file for you to test in one click.',
    },
  ];

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            Questions & Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Everything you need to know about the Resume Analyser & n8n integration.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-slate-900 font-bold text-sm sm:text-base hover:text-rose-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-rose-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
