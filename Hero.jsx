import React, { useState } from 'react';
import { ShieldCheck, ChevronRight, Play, Sparkles, CheckCircle2, Lock, Zap, Shield, Search, ArrowRight } from 'lucide-react';
import InteractiveScanner from './InteractiveScanner.jsx';

export default function Hero({ onOpenDemoModal, onSaveScanToHistory, onOpenHistoryModal }) {
  const [heroInput, setHeroInput] = useState('https://paypal-sercuity-login.xyz');

  const scrollToScanner = (customUrl) => {
    const scannerElem = document.getElementById('live-scanner');
    if (scannerElem) {
      scannerElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 pb-20 overflow-hidden bg-radial-glow">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Hero Pill Tag */}
        <div className="flex justify-center mb-5">
          <div className="badge-neon py-1.5 px-4 shadow-[0_0_20px_rgba(0,240,255,0.2)] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-wide">
              ZERO-DAY PHISHING DEFENSE PLATFORM
            </span>
          </div>
        </div>

        {/* Hero Headings */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] font-[Space_Grotesk]">
            AI Cybersecurity That Blocks{' '}
            <span className="text-gradient-neon block sm:inline">Phishing Attacks</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Detect malicious URLs, phishing emails, smishing texts, and tampered QR codes in real time.
            Get instantaneous 1-100 risk scoring with clear English explanations.
          </p>

          {/* Above the Fold Live Demo Input Box */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="glass-panel p-2.5 sm:p-3 border-cyan-500/50 shadow-[0_0_30px_rgba(0,240,255,0.25)] rounded-2xl bg-[#070d1e]/90 flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full flex items-center">
                <Search className="absolute left-3.5 w-5 h-5 text-cyan-400" />
                <input
                  type="text"
                  value={heroInput}
                  onChange={(e) => setHeroInput(e.target.value)}
                  placeholder="Paste URL, link, or suspicious text to scan..."
                  className="w-full bg-[#030712] border border-cyan-500/30 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              {/* Clear Scan URL Now Button Above the Fold */}
              <button
                onClick={() => scrollToScanner(heroInput)}
                className="btn-primary-neon py-3 px-6 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap w-full sm:w-auto shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Scan URL Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-2">
              ⚡ Instant 1-100 AI Threat Risk Score • Zero Installation Required
            </p>
          </div>

          {/* Secondary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenDemoModal('get-started')}
              className="btn-secondary-cyber text-xs sm:text-sm py-2.5 px-5"
            >
              <Lock className="w-4 h-4 text-cyan-400" />
              Get Started Free
            </button>

            <button
              onClick={() => onOpenDemoModal('demo')}
              className="btn-secondary-cyber text-xs sm:text-sm py-2.5 px-5"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
              Request Enterprise Demo
            </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Sub-50ms Threat Inspection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Explainable Heuristics Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Multi-Factor Verification</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Scanner Embedded Demo */}
        <div className="mt-12">
          <InteractiveScanner onSaveScanToHistory={onSaveScanToHistory} onOpenHistoryModal={onOpenHistoryModal} />
        </div>
      </div>
    </section>
  );
}

