import React from 'react';
import { ShieldCheck, Activity, Lock, Globe, ArrowUpRight, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer({ onOpenDemoModal }) {
  return (
    <footer className="bg-[#030712] border-t border-cyan-500/20 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle Glow background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <ShieldCheck className="w-6 h-6 text-cyan-400 animate-shield" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-[Space_Grotesk]">
                AI PHISHING <span className="text-cyan-400">SHIELD</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Next-generation AI cybersecurity platform protecting modern businesses from phishing URLs, malicious emails, QR codes, SMS traps, and weaponized file attachments in real time.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="badge-safe py-1 px-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-mono">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              PROTECTION LAYERS
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Phishing URL Scanner</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Email Security & BEC</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">QR Code Defense</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">SMS Smishing Detection</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">File Payload Sandbox</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Browser Extension</a></li>
            </ul>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              PLATFORM
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Enterprise Features</a></li>
              <li><a href="#live-scanner" className="hover:text-cyan-400 transition-colors">Live AI Sandbox</a></li>
              <li><a href="#dashboard" className="hover:text-cyan-400 transition-colors">Telemetry Dashboard</a></li>
              <li>
                <button onClick={() => onOpenDemoModal('demo')} className="text-cyan-400 hover:underline">
                  Request 1-on-1 Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              COMPLIANCE
            </h4>
            <div className="space-y-2 text-xs font-mono text-slate-400">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>SOC2 TYPE II AUDITED</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>ISO 27001 CERTIFIED</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>GDPR & HIPAA READY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            © {new Date().getFullYear()} AI Phishing Shield Inc. All rights reserved. Real-time Cyber Defense.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Security Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
