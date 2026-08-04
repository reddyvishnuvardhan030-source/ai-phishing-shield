import React from 'react';
import { ShieldCheck, ChevronRight, Play, Sparkles, CheckCircle2, Lock, Zap, Shield } from 'lucide-react';
import InteractiveScanner from './InteractiveScanner.jsx';

export default function Hero({ onOpenDemoModal }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-radial-glow">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Hero Pill Tag */}
        <div className="flex justify-center mb-6">
          <div className="badge-neon py-1.5 px-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-wide">
              ZERO-DAY PHISHING DEFENSE PLATFORM
            </span>
          </div>
        </div>

        {/* Hero Headings */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] font-[Space_Grotesk]">
            AI-Powered Cybersecurity for{' '}
            <span className="text-gradient-neon block sm:inline">Modern Businesses</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Protect your organization from phishing attacks using advanced AI that detects malicious websites,
            emails, QR codes, SMS, and file attachments in real time.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenDemoModal('get-started')}
              className="btn-primary-neon text-base py-4 px-8 w-full sm:w-auto"
            >
              <Zap className="w-5 h-5 fill-current" />
              Get Started
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onOpenDemoModal('demo')}
              className="btn-secondary-cyber text-base py-4 px-8 w-full sm:w-auto"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
              Request Demo
            </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Sub-50ms Threat Inspection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>SOC2 Type II & ISO27001 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>99.98% Accuracy Rate</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Scanner Embedded Demo */}
        <div className="mt-14">
          <InteractiveScanner />
        </div>
      </div>
    </section>
  );
}
