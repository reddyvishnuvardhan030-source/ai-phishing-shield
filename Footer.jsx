import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Github,
  Mail,
  X,
  CheckCircle2,
  ExternalLink,
  Shield,
  FileText
} from 'lucide-react';

export default function Footer({ onOpenDemoModal }) {
  const [modalContent, setModalContent] = useState(null); // 'privacy' | 'terms' | null

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

            {/* GitHub & Contact Email Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary-cyber text-xs py-2 px-3 flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href="mailto:contact@aiphishingshield.com"
                className="btn-secondary-cyber text-xs py-2 px-3 flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>contact@aiphishingshield.com</span>
              </a>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="badge-safe py-1 px-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-mono">ALL AI ENGINES OPERATIONAL</span>
              </div>
            </div>
          </div>

          {/* Protection Layers */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              PROTECTION LAYERS
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">🔗 URL Scanner</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">📧 Email Scanner</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">📱 QR Code Scanner</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">🧠 AI Threat Analysis</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">🌐 Domain Intelligence</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">⚡ Live Threat Detection</a></li>
            </ul>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              PLATFORM
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#ai-agent" className="hover:text-cyan-400 transition-colors">Meet AI Security Agent</a></li>
              <li><a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works Pipeline</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Enterprise Features</a></li>
              <li><a href="#live-scanner" className="hover:text-cyan-400 transition-colors">Live Threat Scanner</a></li>
              <li>
                <button onClick={() => onOpenDemoModal('demo')} className="text-cyan-400 hover:underline">
                  Request Enterprise Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              COMPLIANCE & CONTACT
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
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>contact@aiphishingshield.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            © {new Date().getFullYear()} AI Phishing Shield Inc. All rights reserved. Real-Time Cyber Protection.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalContent('privacy')}
              className="hover:text-cyan-400 transition-colors underline underline-offset-4"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalContent('terms')}
              className="hover:text-cyan-400 transition-colors underline underline-offset-4"
            >
              Terms of Service
            </button>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Policy & Terms Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md fade-in">
          <div className="glass-panel max-w-2xl w-full p-6 sm:p-8 relative border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] bg-[#070d1e]/95 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {modalContent === 'privacy' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-7 h-7 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white font-[Space_Grotesk]">
                    Privacy Policy
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Last updated: August 2026. AI Phishing Shield is committed to safeguarding organizational privacy.
                </p>
                <div className="space-y-3 text-xs text-slate-300 font-mono">
                  <h4 className="text-sm font-bold text-cyan-400">1. Telemetry Data Handling</h4>
                  <p>All scanned URLs, headers, and QR payloads are processed in encrypted memory buffers and purged within 24 hours. We do not sell or monetize threat logs.</p>
                  
                  <h4 className="text-sm font-bold text-cyan-400">2. Zero-Trust Data Isolation</h4>
                  <p>Enterprise customer data is isolated in dedicated SOC2 Type II compliant vaults with TLS 1.3 encryption in transit and AES-256 at rest.</p>

                  <h4 className="text-sm font-bold text-cyan-400">3. Contact</h4>
                  <p>For data privacy requests or DPO contact: <strong className="text-cyan-300">contact@aiphishingshield.com</strong></p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-7 h-7 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white font-[Space_Grotesk]">
                    Terms of Service
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  By utilizing AI Phishing Shield, you agree to these service terms and threat intelligence sharing guidelines.
                </p>
                <div className="space-y-3 text-xs text-slate-300 font-mono">
                  <h4 className="text-sm font-bold text-cyan-400">1. Acceptable Use Policy</h4>
                  <p>Users may only scan URLs, emails, and assets for legitimate security verification. Reverse engineering our neural weight models is strictly prohibited.</p>
                  
                  <h4 className="text-sm font-bold text-cyan-400">2. Service Level SLA</h4>
                  <p>Enterprise plans include a 99.99% operational uptime SLA with sub-50ms threat inspection guarantees.</p>

                  <h4 className="text-sm font-bold text-cyan-400">3. Inquiries</h4>
                  <p>Legal & compliance inquiries: <strong className="text-cyan-300">contact@aiphishingshield.com</strong></p>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="btn-secondary-cyber text-xs py-2 px-5"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
