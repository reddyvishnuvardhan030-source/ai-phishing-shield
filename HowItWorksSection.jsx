import React, { useState } from 'react';
import {
  Link2,
  Cpu,
  ShieldAlert,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';

const STEPS_DATA = [
  {
    step: '01',
    title: 'Enter URL',
    subtitle: 'Submit any link, URL, or data string',
    desc: 'Input suspicious web links, email content, QR code payload strings, or text messages directly into the scanner or via browser extension.',
    icon: Link2,
    details: [
      'Accepts raw website links (e.g., https://paypal-sercuity-login.xyz)',
      'Supports QR code parsed payload strings & short URLs',
      'Instant mobile SMS & email gateway webhook ingestion',
    ],
    codeSnippet: `INPUT RECEIVED:\n-------------------------\nVector: URL / Link Inspection\nTarget: https://paypal-sercuity-login.xyz\nStatus: Pending Neural Analysis`,
  },
  {
    step: '02',
    title: 'AI Analysis',
    subtitle: 'Deep neural multi-vector scanning',
    desc: 'Our deep neural networks run natural language processing, visual DOM layout comparison, DNS reputation, and homoglyph typosquatting checks in under 45ms.',
    icon: Cpu,
    details: [
      'Homoglyph character spoofing parser (paypaI vs paypal)',
      'Visual logo & DOM similarity graph matching',
      'Dynamic JavaScript redirect & TLD reputation inspection (.xyz / .top)',
    ],
    codeSnippet: `AI ANALYZING PIPELINE...\n[+] Typosquatting Check: FAILED (Spoofed Char 'I')\n[+] TLD Reputation: HIGH RISK UNTRUSTED (.xyz)\n[+] Form Analysis: Password Harvesting Script Detected`,
  },
  {
    step: '03',
    title: 'Threat Detection',
    subtitle: '1-100 Risk Scoring & Threat Flagging',
    desc: 'The agent calculates a precise Threat Index from 1 (Safest) to 100 (Critical Threat) and flags indicators of compromise (IOCs).',
    icon: ShieldAlert,
    details: [
      'Sub-50ms execution latency',
      'Explainable AI reasons in plain, clear English',
      'Categorized threat severity (CRITICAL PHISHING RISK)',
    ],
    codeSnippet: `THREAT SCORE GENERATED\n-------------------------\nFinal Risk Index: 96 / 100 [CRITICAL]\nCategory: Typosquatting Credential Harvester\nConfidence Index: High (96%)`,
  },
  {
    step: '04',
    title: 'Security Report',
    subtitle: 'Clear English explanation & remediation',
    desc: 'Generates a comprehensive security report detailing why the item is dangerous and listing actionable safe remediation steps.',
    icon: FileText,
    details: [
      'Plain English threat breakdown for non-technical users',
      'Step-by-step recommended safe actions',
      'Automated SIEM logging & DNS firewall block dispatch',
    ],
    codeSnippet: `SECURITY REPORT COMPLETED\n[✓] User Warning Generated\n[✓] Safe Actions: Do not enter passwords • Block domain\n[✓] Firewall & DNS Rule Applied #RULE-8891`,
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
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="badge-neon mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>EXPLICIT WORKFLOW PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-[Space_Grotesk]">
            How <span className="text-gradient-neon">AI Phishing Shield</span> Works
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            A simple, transparent 4-stage pipeline that converts raw web links into instant threat intelligence.
          </p>
        </div>

        {/* Visual Flow Diagram Banner */}
        <div className="glass-panel p-6 mb-12 border-cyan-500/40 bg-[#070d1e]/90 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.15)]">
          <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider text-center mb-6">
            ⚡ Threat Neutralization Sequence Flow
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center">
            {STEPS_DATA.map((s, idx) => {
              const Icon = s.icon;
              const isActive = activeStep === idx;
              return (
                <React.Fragment key={idx}>
                  <div
                    onClick={() => setActiveStep(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center gap-2 ${
                      isActive
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] scale-105'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isActive ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">Step {s.step}</span>
                    <h4 className="text-sm font-bold text-white font-[Space_Grotesk]">{s.title}</h4>
                  </div>

                  {idx < STEPS_DATA.length - 1 && (
                    <div className="hidden md:flex items-center justify-center text-cyan-400">
                      <ArrowRight className="w-6 h-6 animate-pulse" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 4 Steps Detailed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12 relative">
          {STEPS_DATA.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`glass-panel p-6 cursor-pointer relative z-10 transition-all duration-300 ${
                  isActive
                    ? 'border-cyan-400 bg-slate-900/95 shadow-[0_0_25px_rgba(0,240,255,0.25)] -translate-y-2'
                    : 'border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100 bg-[#070d1e]/80'
                }`}
              >
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
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Detailed Interactive Showcase Box for Active Step */}
        <div className="glass-panel p-6 sm:p-8 border-cyan-500/30 bg-slate-950/90">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
                <Zap className="w-3.5 h-3.5" />
                <span>ACTIVE STAGE: STEP {STEPS_DATA[activeStep].step} — {STEPS_DATA[activeStep].title}</span>
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
                  className="btn-primary-neon text-xs py-2.5 px-5 flex items-center gap-2"
                >
                  <span>Advance Pipeline Stage</span>
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
                    pipeline_stage_{STEPS_DATA[activeStep].step}.log
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">STATUS: PROCESSED</span>
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

