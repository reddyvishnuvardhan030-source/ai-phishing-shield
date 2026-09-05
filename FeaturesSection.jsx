import React from 'react';
import {
  Zap,
  Lock,
  Clock,
  Cloud,
  LayoutDashboard,
  ShieldCheck,
  FileText,
  Activity,
  Check
} from 'lucide-react';

const FEATURES_DATA = [
  {
    icon: Zap,
    title: 'Real-time AI Detection',
    subtitle: 'Zero-day attack mitigation',
    desc: 'Uses continuous online neural inference to identify zero-day phishing sites and newly registered malicious domains before threat feeds even log them.',
    badge: 'SUB-50MS LATENCY',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    subtitle: 'Zero data retention policy',
    desc: 'Engineered with local zero-knowledge parsing and memory-only analysis. Your sensitive emails, credentials, and business files are never stored or logged.',
    badge: 'PRIVACY PRESERVING',
  },
  {
    icon: Clock,
    title: 'Fast Threat Analysis',
    subtitle: 'Ultra-low overhead',
    desc: 'Distributed edge processing delivers instant risk scores without slowing down network bandwidth, employee browsing, or email delivery speeds.',
    badge: 'EDGE ACCELERATED',
  },
  {
    icon: Cloud,
    title: 'Cloud-Based Security',
    subtitle: 'Zero infrastructure hassle',
    desc: 'Cloud-native architecture deploys seamlessly via API webhooks and DNS proxies in under 5 minutes without installing heavy endpoint software.',
    badge: 'CLOUD NATIVE ARCHITECTURE',
  },
  {
    icon: LayoutDashboard,
    title: 'Easy Dashboard',
    subtitle: 'CISO-ready visual analytics',
    desc: 'Intuitive single-pane control center offering real-time threat graphs, attack vector distribution, risk trends, and 1-click incident remediation.',
    badge: 'SINGLE-PANE VIEW',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    subtitle: 'Strict security standards',
    desc: 'Standardized API endpoints with transparent rule evaluation, role-based access control (RBAC), and enterprise API key management.',
    badge: 'TRANSPARENT API',
  },
  {
    icon: FileText,
    title: 'Detailed Reports',
    subtitle: 'Audit & forensic exports',
    desc: 'Generates detailed executive PDF summaries and SIEM-ready JSON forensic reports complete with raw domain evidence and threat score justifications.',
    badge: 'PDF & SIEM EXPORTS',
  },
  {
    icon: Activity,
    title: '24/7 Protection',
    subtitle: 'Always-on automated defense',
    desc: 'Autonomous AI containment operates 24/7/365, intercepting midnight credential harvesting campaigns and isolating threats while your SOC sleeps.',
    badge: 'AUTOMATED 24/7',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#070d1e]/80 border-t border-b border-slate-800">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-neon mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>ENTERPRISE-GRADE ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-[Space_Grotesk]">
            Engineered for <span className="text-gradient-neon">Uncompromising Security</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Eight essential core features delivering Multi-Layer Phishing Protection, seamless threat detection, and zero productivity friction.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES_DATA.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 flex flex-col justify-between group hover:border-cyan-400/60 transition-all duration-300 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-950/40 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 font-[Space_Grotesk] group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400/80 mb-3">{feat.subtitle}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Feature Enabled</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
