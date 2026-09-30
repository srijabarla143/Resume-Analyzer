/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ResumeUploadForm } from './components/ResumeUploadForm.tsx';
import { SampleReportViewer } from './components/SampleReportViewer.tsx';
import { WorkflowInspector } from './components/WorkflowInspector.tsx';
import { FeaturesSection } from './components/FeaturesSection.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { Footer } from './components/Footer.tsx';
import { N8nSettingsModal } from './components/N8nSettingsModal.tsx';
import { N8nHealthStatus, SubmissionResult } from './types.ts';

const DEFAULT_N8N_URL = 'https://barlasrija.app.n8n.cloud/form/4df2bfb6-3bc8-4836-a2ea-9619fbf8c544';

export default function App() {
  const [targetN8nUrl, setTargetN8nUrl] = useState<string>(() => {
    return localStorage.getItem('n8n_target_url') || DEFAULT_N8N_URL;
  });
  const [n8nStatus, setN8nStatus] = useState<N8nHealthStatus | null>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<SubmissionResult | null>(null);

  const checkHealth = useCallback(async (urlToCheck = targetN8nUrl) => {
    setIsCheckingHealth(true);
    try {
      const res = await fetch(`/api/check-n8n?url=${encodeURIComponent(urlToCheck)}`);
      if (res.ok) {
        const data = await res.json();
        setN8nStatus(data);
      } else {
        setN8nStatus({
          online: false,
          error: `HTTP ${res.status}`,
          url: urlToCheck,
        });
      }
    } catch (err: any) {
      setN8nStatus({
        online: false,
        error: err.message || 'Network error',
        url: urlToCheck,
      });
    } finally {
      setIsCheckingHealth(false);
    }
  }, [targetN8nUrl]);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  const handleUpdateTargetUrl = (newUrl: string) => {
    setTargetN8nUrl(newUrl);
    localStorage.setItem('n8n_target_url', newUrl);
    checkHealth(newUrl);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-500 selection:text-white">
      {/* Top Banner indicating connected n8n cloud status */}
      <div className="bg-slate-950 text-slate-300 py-1.5 px-4 text-xs font-medium text-center border-b border-slate-900 flex items-center justify-center space-x-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Connected to Live n8n Cloud Automation Engine:</span>
        <span className="font-mono-code text-rose-400 font-semibold truncate max-w-xs sm:max-w-md">
          {targetN8nUrl}
        </span>
        <button
          onClick={() => setSettingsModalOpen(true)}
          className="text-white underline hover:text-rose-400 transition-colors ml-1 hidden sm:inline"
        >
          Inspect Config
        </button>
      </div>

      {/* Main Navbar */}
      <Header
        n8nStatus={n8nStatus}
        onRefreshHealth={() => checkHealth()}
        isCheckingHealth={isCheckingHealth}
        onOpenSettings={() => setSettingsModalOpen(true)}
        targetUrl={targetN8nUrl}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          onStartScan={() => scrollToSection('upload-section')}
          onViewSample={() => scrollToSection('sample-report-section')}
          targetUrl={targetN8nUrl}
        />

        {/* Upload Form Container with subtle elevated card spacing */}
        <div className="py-8 sm:py-12 bg-linear-to-b from-transparent via-slate-100/60 to-transparent">
          <ResumeUploadForm
            onSuccess={(result) => setLastSubmission(result)}
            targetN8nUrl={targetN8nUrl}
          />
        </div>

        {/* Sample Report Viewer */}
        <SampleReportViewer />

        {/* n8n Automation Architecture & Webhook Inspector */}
        <WorkflowInspector
          n8nStatus={n8nStatus}
          targetUrl={targetN8nUrl}
          onRefreshHealth={() => checkHealth()}
          isChecking={isCheckingHealth}
          onUpdateTargetUrl={handleUpdateTargetUrl}
        />

        {/* Comprehensive Features Section */}
        <FeaturesSection />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer targetUrl={targetN8nUrl} />

      {/* Settings / Webhook inspection modal */}
      <N8nSettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        targetUrl={targetN8nUrl}
        onUpdateTargetUrl={handleUpdateTargetUrl}
        n8nStatus={n8nStatus}
        onRefreshHealth={() => checkHealth()}
        isChecking={isCheckingHealth}
      />
    </div>
  );
}
