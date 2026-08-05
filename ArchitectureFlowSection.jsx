import React from 'react';
import {
  Globe,
  MousePointerClick,
  Server,
  Bot,
  FileCheck2,
  MonitorCheck,
  ArrowDown,
  ArrowRight,
  ShieldAlert,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function ArchitectureFlowSection() {
  const steps = [
    {
      num: '1',
      title: 'User Visits Website',
      desc: 'Opens the AI Phishing Shield interface or browser extension',
      icon: Globe,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      badge: 'FRONTEND INTERFACE',
    },
    {
      num: '2',
      title: 'Enters URL or Email',
      desc: 'Inputs suspicious web link (e.g. https://paypal-sercuity-login.xyz) or raw email text',
      icon: MousePointerClick,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      badge: 'INPUT PAYLOAD',
    },
    {
      num: '3',
      title: 'Clicks "Scan"',
      desc: 'Sends data via HTTP POST request to FastAPI Backend (/api/v1/scan)',
      icon: Server,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/40',
      badge: 'REST API TRANSMISSION',
    },
    {
      num: '4',
      title: 'AI Agent Analyzes It',
      desc: 'Runs domain typosquatting, NLP urgency, SSL authority, & DOM similarity checks',
      icon: Bot,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/40',
      badge: 'NEURAL EVALUATION',
    },
    {
      num: '5',
      title: 'Returns JSON Threat Output',
      desc: 'Generates Risk Score (1-100), Status (Safe/Suspicious/Dangerous), Explanation, & Actions',
      icon: FileCheck2,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      badge: 'STRUCTURED REPORT',
    },
    {
      num: '6',
      title: 'Website Displays Results',
      desc: 'Renders instant risk gauge, clear English reasons, and recommended safe actions',
      icon: MonitorCheck,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      badge: 'USER UI ALERT',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-[#070d1e]/80 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="badge-neon mb-3 flex items-center justify-center gap-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>FULLSTACK FASTAPI ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-[Space_Grotesk]">
            End-to-End <span className="text-gradient-neon">System Data Flow</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            See how your request travels from the browser, through FastAPI backend neural processing, and back to your screen in real time.
          </p>
        </div>

        {/* Vertical Flow Diagram Cards */}
        <div className="max-w-3xl mx-auto space-y-4 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <React.Fragment key={idx}>
                <div className={`glass-panel p-5 border ${s.borderColor} bg-[#030712]/90 rounded-2xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_25px_rgba(0,240,255,0.1)] hover:border-cyan-400 transition-all`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-6 h-6 ${s.color}`} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950 border border-cyan-500/30 px-2 py-0.5 rounded">
                          STEP {s.num} • {s.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white font-[Space_Grotesk]">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-normal">
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-cyan-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Processed</span>
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <div className="flex justify-center my-1 text-cyan-400">
                    <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Live Output Specification Summary Box */}
        <div className="mt-12 max-w-3xl mx-auto glass-panel p-6 border-emerald-500/40 bg-emerald-950/20 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              FastAPI Output Specification Payload Returned To Website:
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">RISK SCORE</span>
              <strong className="text-cyan-300 font-bold text-sm">1 to 100 Index</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">STATUS</span>
              <strong className="text-rose-400 font-bold text-sm">Safe / Suspicious / Dangerous</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">EXPLANATION</span>
              <strong className="text-slate-200 font-bold text-sm">Clear English Reasons</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">RECOMMENDED ACTIONS</span>
              <strong className="text-emerald-400 font-bold text-sm">Safe Protocols</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
