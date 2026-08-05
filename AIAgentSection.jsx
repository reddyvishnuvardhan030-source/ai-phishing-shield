import React, { useState } from 'react';
import {
  Bot,
  BrainCircuit,
  Cpu,
  Layers,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  SearchCheck,
  Target,
  FileCheck2,
  RefreshCw,
  Eye,
  ShieldQuestion
} from 'lucide-react';

export default function AIAgentSection() {
  const [activeTab, setActiveTab] = useState('explains');

  const AGENT_CAPABILITIES = [
    {
      id: 'explains',
      tabLabel: 'Explains Threats',
      icon: SearchCheck,
      title: 'Translates Cyber Telemetry Into Plain English Reasons',
      badge: 'EXPLAINABLE AI (XAI)',
      description:
        'Unlike black-box security tools, your AI Security Agent explains exact risk drivers in plain, clear English. It breaks down typosquatting tricks, fake TLDs, credential-harvesting forms, and urgent social engineering tactics.',
      points: [
        'Decodes deceptive homoglyph characters (e.g. paypaI vs paypal)',
        'Pinpoints manipulative urgency & VIP impersonation phrases',
        'Highlights unsafe login form POST endpoints and suspicious redirects',
      ],
      interactiveDemo: {
        type: 'Explanation View',
        input: 'http://paypaI-security-update.xyz/login.php',
        reason: 'Domain misspelling + suspicious .xyz TLD + hidden password harvesting form detected.',
        score: '96 / 100 Risk Score',
      },
    },
    {
      id: 'engines',
      tabLabel: 'Multiple Detection Engines',
      icon: Layers,
      title: 'Multi-Layered Neural Detection Stack',
      badge: '5-ENGINE PIPELINE',
      description:
        'The Agent runs every input through 5 specialized AI detection engines in under 45ms. If one engine detects a anomaly, the consensus network verifies zero-day phishing signatures.',
      points: [
        '🔗 Structural URL & Typosquat Engine',
        '📧 NLP Language & BEC Intent Engine',
        '📱 QR Code Matrix & Short-URL Unshortener',
        '👁️ Visual DOM & Logo Similarity Engine',
        '🧪 Cloud Micro-VM Payload Sandbox Engine',
      ],
      interactiveDemo: {
        type: 'Engine Inspection',
        input: 'Multi-Vector Input Analysis',
        reason: '5 / 5 Detection Engines synchronized • 0.01% False Positive Rate',
        score: '5 Parallel Engines Active',
      },
    },
    {
      id: 'confidence',
      tabLabel: 'Confidence Score',
      icon: Target,
      title: 'Precision 1 to 100 Risk Scoring',
      badge: 'CALIBRATED RISK INDEX',
      description:
        'Calculates a granular Threat Confidence Index (1-100) based on domain age, SSL telemetry, NLP urgency scores, and threat graph lineage, allowing automated SOC decision making.',
      points: [
        '1-20: Verified Safe & Official Infrastructure',
        '21-50: Low-Risk / Internal System Traffic',
        '51-80: Suspicious Anomaly Flagged for Review',
        '81-100: Critical Phishing Threat • Automated Quarantine',
      ],
      interactiveDemo: {
        type: 'Risk Meter',
        input: 'Risk Score Range: 1 (Safest) to 100 (Critical Threat)',
        reason: 'Calibrated using millions of real-time dark web threat feeds.',
        score: '99.98% Model Precision',
      },
    },
    {
      id: 'remediation',
      tabLabel: 'Provides Remediation',
      icon: ShieldCheck,
      title: 'Automated Safe Action Guidance',
      badge: 'INSTANT INCIDENT RESPONSE',
      description:
        'Provides step-by-step remediation protocols for users and security teams. From automatic DNS firewall blocking to credential revocation guidance, threats are neutralized instantly.',
      points: [
        'Immediate mailbox quarantine & inbound domain block',
        'Automated credential reset alert if passwords were exposed',
        'SIEM / Splunk / Sentinel incident payload dispatch',
        'One-click automated registrar takedown request',
      ],
      interactiveDemo: {
        type: 'Remediation Workflow',
        input: 'Action Recommended: BLOCK DOMAIN & REVOKE SESSIONS',
        reason: 'Quarantined 14 accounts automatically • Zero credential exposure',
        score: 'Automated Defense',
      },
    },
  ];

  const currentCapability = AGENT_CAPABILITIES.find((c) => c.id === activeTab);

  return (
    <section id="ai-agent" className="py-24 relative overflow-hidden bg-[#030712] border-t border-slate-800">
      {/* Background Orbs */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-neon mb-3 flex items-center justify-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>AUTONOMOUS CYBERSECURITY ASSISTANT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-[Space_Grotesk]">
            Meet Your <span className="text-gradient-neon">AI Security Agent</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Your 24/7 intelligent partner that analyzes links, emails, and QR codes, explains risks in clear English, scores threat levels from 1 to 100, and executes instant remediation.
          </p>
        </div>

        {/* Feature Grid: 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {AGENT_CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            const isActive = activeTab === cap.id;
            return (
              <div
                key={cap.id}
                onClick={() => setActiveTab(cap.id)}
                className={`glass-panel p-6 cursor-pointer transition-all duration-300 rounded-2xl border ${
                  isActive
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_30px_rgba(0,240,255,0.25)] -translate-y-1'
                    : 'border-slate-800 bg-[#070d1e]/80 hover:border-slate-700 hover:bg-[#070d1e]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                      isActive
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {cap.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-[Space_Grotesk]">
                  {cap.tabLabel}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {cap.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center text-xs font-semibold text-cyan-400 gap-1">
                  <span>Explore Feature</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Capability Interactive Stage */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border-cyan-500/40 bg-[#070d1e]/90 shadow-[0_0_50px_rgba(0,240,255,0.15)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Information */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="badge-neon py-1 px-3 text-xs">{currentCapability.badge}</span>
                <span className="text-xs font-mono text-cyan-400 font-semibold">AGENT CAPABILITY DEMO</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-[Space_Grotesk]">
                {currentCapability.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {currentCapability.description}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  Key Agent Highlights:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentCapability.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Simulated Agent Processing Display */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-[#030712] border border-cyan-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-mono text-cyan-300 font-bold uppercase">
                      AGENT RUNTIME INSPECTOR
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">STATE: ACTIVE</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 block mb-1 text-[10px]">CURRENT INSPECTION TARGET</span>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 truncate">
                      {currentCapability.interactiveDemo.input}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1 text-[10px]">AGENT DECISION REASON</span>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed">
                      {currentCapability.interactiveDemo.reason}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">OUTPUT METRIC</span>
                    <span className="px-3 py-1 rounded-lg bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/40">
                      {currentCapability.interactiveDemo.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
