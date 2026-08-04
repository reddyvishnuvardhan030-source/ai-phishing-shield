import React, { useState } from 'react';
import {
  UploadCloud,
  Cpu,
  Gauge,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Lock,
  Layers
} from 'lucide-react';

const STEPS_DATA = [
  {
    step: '01',
    title: 'Submit Content Vector',
    subtitle: 'Submit a URL, email, QR code, SMS, or file.',
    desc: 'Input suspicious items via browser extension, inline API, email gateway rule, or manual submission scanner widget.',
    icon: UploadCloud,
    details: [
      'Automated API ingestion for MS 365, Google Workspace & Slack',
      'Drag-and-drop file support for PDFs, DOCX, and EXEs',
      'Instant mobile QR & SMS webhook integration',
    ],
    codeSnippet: `POST /api/v1/scan/inspect\n{\n  "vector": "email_attachment",\n  "target": "Invoice_March2026.pdf",\n  "strict_mode": true\n}`,
  },
  {
    step: '02',
    title: 'AI Multi-Layer Analysis',
    subtitle: 'AI analyzes the content.',
    desc: 'Our deep neural networks run natural language processing, visual layout comparison, DNS reputation, and micro-VM sandbox execution.',
    icon: Cpu,
    details: [
      'Computer vision matching against 500,000+ brand logos',
      'NLP semantic sentiment & coerciveness parsing',
      'Dynamic JavaScript redirection tracing',
    ],
    codeSnippet: `ANALYZING NEURAL WEIGHINGS...\n[+] Homoglyph Check: FAILED (Spoofed Char)\n[+] SSL Authority: UNTRUSTED FREE CERT\n[+] OCR Logo Match: PayPal 99.4% Similarity`,
  },
  {
    step: '03',
    title: 'Real-Time Risk Scoring',
    subtitle: 'Receive a real-time risk score.',
    desc: 'Receive an instant 0 to 100 risk confidence metric with granular indicators of compromise (IOCs) in sub-50 milliseconds.',
    icon: Gauge,
    details: [
      'Sub-50ms total response latency',
      'Explainable threat telemetry for SOC analyst review',
      'Automated threat categorization (Phishing, Malware, BEC)',
    ],
    codeSnippet: `THREAT ASSESSMENT REPORT\n-------------------------\nFinal Risk Index: 96/100 [CRITICAL]\nCategory: Typosquatting / Credential Harvester\nConfidence Level: 99.98%`,
  },
  {
    step: '04',
    title: 'Automated Protection',
    subtitle: 'Get protection recommendations.',
    desc: 'Get actionable mitigation advice, auto-quarantine malicious emails, revoke compromised session tokens, and block dangerous endpoints.',
    icon: ShieldCheck,
    details: [
      'Automated email mailbox quarantine & deletion',
      'SIEM / SOAR Webhook alerts dispatched instantly',
      '1-Click CISO Domain Takedown request dispatch',
    ],
    codeSnippet: `ACTION TAKEN: QUARANTINED\n[✓] User Notification Sent\n[✓] Domain Blocked on Enterprise Firewall\n[✓] SIEM Incident Created #INC-9821`,
  },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#030712]">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-neon mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>FOUR-STEP THREAT MITIGATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-[Space_Grotesk]">
            How <span className="text-gradient-neon">AI Phishing Shield</span> Works
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            From raw input submission to instant automated containment — inspect how our neural engine neutralizes attacks in milliseconds.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12 relative">
          {/* Connector Line behind steps (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-cyan-500/20 via-cyan-400/60 to-blue-600/20 -translate-y-6 z-0" />

          {STEPS_DATA.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`glass-panel p-6 cursor-pointer relative z-10 transition-all duration-300 ${
                  isActive
                    ? 'border-cyan-400 bg-slate-900/90 shadow-[0_0_25px_rgba(0,240,255,0.25)] -translate-y-2'
                    : 'border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-mono text-sm font-bold px-3 py-1 rounded-lg border ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    STEP {item.step}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                      isActive
                        ? 'bg-cyan-950 text-cyan-400 border-cyan-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 font-[Space_Grotesk]">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-cyan-400 mb-3">{item.subtitle}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Detailed Interactive Showcase Box for Active Step */}
        <div className="glass-panel p-6 sm:p-8 border-cyan-500/30 bg-slate-950/80">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
                <Zap className="w-3.5 h-3.5" />
                <span>ACTIVE STAGE: STEP {STEPS_DATA[activeStep].step}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-[Space_Grotesk]">
                {STEPS_DATA[activeStep].title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {STEPS_DATA[activeStep].desc}
              </p>

              <div className="space-y-2.5 pt-2">
                {STEPS_DATA[activeStep].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % STEPS_DATA.length)}
                  className="btn-primary-neon text-xs py-2.5 px-5"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulated Terminal Code Box */}
            <div className="bg-[#040914] border border-cyan-500/30 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-slate-900/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">
                    ai-engine-telemetry.log
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">LATENCY: 12ms</span>
              </div>
              <pre className="p-5 text-xs font-mono text-cyan-300/90 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {STEPS_DATA[activeStep].codeSnippet}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
