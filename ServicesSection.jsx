import React, { useState } from 'react';
import {
  Globe,
  Mail,
  QrCode,
  Brain,
  Database,
  Zap,
  ArrowRight,
  CheckCircle,
  X,
  Shield
} from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 'url-scanner',
    title: '🔗 URL Scanner',
    icon: Globe,
    shortDesc: 'Analyze links in real time using AI, domain reputation, SSL validation, and threat intelligence.',
    fullDesc: 'Performs deep link inspection using AI models, WHOIS domain reputation scoring, SSL/TLS certificate validation, homoglyph character analysis, and live threat intelligence feeds to block phishing links instantly.',
    metrics: 'Real-Time Link Inspection',
    badge: 'REAL-TIME URL GUARD',
    features: [
      'Homoglyph Typosquatting Detection',
      'SSL Certificate & TLS Validation',
      'Live Threat Intelligence Feed Matching'
    ],
  },
  {
    id: 'email-scanner',
    title: '📧 Email Scanner',
    icon: Mail,
    shortDesc: 'Detect phishing emails by examining sender identity, headers, links, attachments, and suspicious language.',
    fullDesc: 'Examines email headers (SPF, DKIM, DMARC), sender identity spoofing, coercive language patterns, malicious attachments (.exe, .vbs, .scr), and embedded hyperlinks to stop Executive BEC and phishing attacks.',
    metrics: 'Full Header & Payload Scan',
    badge: 'INLINE MAIL DEFENSE',
    features: [
      'Sender Identity & VIP Spoof Protection',
      'Natural Language Coercion Scoring',
      'Attachment & Link Payload Inspection'
    ],
  },
  {
    id: 'qr-scanner',
    title: '📱 QR Code Scanner',
    icon: QrCode,
    shortDesc: 'Decode QR codes and inspect hidden destinations before users visit them.',
    fullDesc: 'Decodes physical flyers, parking meters, and digital QR codes (quishing). Safely unshorts multi-tier URL redirect chains to reveal and scan the ultimate target destination.',
    metrics: 'Quishing Defense Engine',
    badge: 'QR MATRIX ENGINE',
    features: [
      'Multi-tier URL Unshortening Chain',
      'Physical & Digital QR Image Decryption',
      'Destination Safety Validation'
    ],
  },
  {
    id: 'ai-threat-analysis',
    title: '🧠 AI Threat Analysis',
    icon: Brain,
    shortDesc: 'Explain why a website or email is flagged with an AI-generated security report.',
    fullDesc: 'Generates explainable AI security assessments. Converts complex threat metrics into clear, simple English risk explanations detailing exact evidence and recommended safe actions.',
    metrics: '0-100 Risk Score Engine',
    badge: 'EXPLAINABLE AI (XAI)',
    features: [
      'Clear English Risk Explanations',
      'Zero-Day Threat Pattern Detection',
      'Categorized Threat Severity Breakdown'
    ],
  },
  {
    id: 'domain-intelligence',
    title: '🌐 Domain Intelligence',
    icon: Database,
    shortDesc: 'Check domain age, WHOIS information, DNS configuration, SSL certificate, and reputation.',
    fullDesc: 'Retrieves raw WHOIS domain creation age, registrar ownership records, SSL/TLS certificate validity, and DNS security posture (SPF, DKIM, DMARC) to verify organizational authenticity.',
    metrics: 'WHOIS & DNS Audit',
    badge: 'DOMAIN REPUTATION',
    features: [
      'WHOIS Domain Age Tracking',
      'SSL Certificate Issuer Verification',
      'SPF / DKIM / DMARC DNS Audit'
    ],
  },
  {
    id: 'live-threat-detection',
    title: '⚡ Live Threat Detection',
    icon: Zap,
    shortDesc: 'Monitor URLs against continuously updated phishing and malware indicators.',
    fullDesc: 'Continuously cross-references incoming web links and domains against real-time phishing and malware indicators (PhishTank, VirusTotal, OpenPhish) to stop zero-day attacks instantaneously.',
    metrics: 'Continuous Intel Feed',
    badge: 'REAL-TIME INTEL',
    features: [
      'PhishTank & VirusTotal Feed Sync',
      'Blacklisted IP & Domain Interception',
      'Automated Zero-Day Threat Mitigation'
    ],
  },
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="py-20 relative overflow-hidden bg-[#070d1e]/60 border-t border-slate-800">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="badge-neon mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>CORE PHISHING DEFENSE SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-[Space_Grotesk]">
            Comprehensive <span className="text-gradient-neon">AI Security Services</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Six specialized AI threat detection modules engineered to identify, analyze, and neutralize phishing attempts across all digital vectors.
          </p>
        </div>

        {/* Services Grid (6 Core Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="glass-panel p-6 flex flex-col justify-between group cursor-pointer hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden bg-[#070d1e]/90 border-cyan-500/30 hover:border-cyan-400"
              >
                {/* Glow border line top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-0.5 rounded">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-white mb-2 font-[Space_Grotesk] group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Bottom Metric & Action */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{service.metrics}</span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md fade-in">
          <div className="glass-panel max-w-2xl w-full p-6 sm:p-8 relative border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] bg-[#070d1e]/95">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                {React.createElement(selectedService.icon, { className: 'w-8 h-8 text-cyan-400' })}
              </div>
              <div>
                <span className="badge-neon mb-1">{selectedService.badge}</span>
                <h3 className="text-2xl font-bold text-white font-[Space_Grotesk]">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-3 mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Core Capabilities & Architecture
              </h4>
              <div className="space-y-2">
                {selectedService.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedService(null)}
                className="btn-secondary-cyber text-xs py-2.5 px-5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
