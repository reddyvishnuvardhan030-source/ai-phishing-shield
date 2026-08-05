import React, { useState, useEffect } from 'react';
import { Globe, ShieldAlert, CheckCircle2, Zap, TrendingUp, Activity } from 'lucide-react';

export default function StatsSection() {
  const [urlCount, setUrlCount] = useState(14850000);
  const [threatCount, setThreatCount] = useState(1890500);

  // Live counter animation increment effect
  useEffect(() => {
    const interval = setInterval(() => {
      setUrlCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
      if (Math.random() > 0.6) {
        setThreatCount((prev) => prev + 1);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      id: 'urls-scanned',
      label: 'URLs Scanned',
      value: urlCount.toLocaleString() + '+',
      subtitle: 'Real-time telemetry feeds',
      icon: Globe,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      bgGlow: 'shadow-[0_0_25px_rgba(0,240,255,0.15)]',
    },
    {
      id: 'threats-blocked',
      label: 'Threats Blocked',
      value: threatCount.toLocaleString() + '+',
      subtitle: 'Zero-day phishing attacks',
      icon: ShieldAlert,
      color: 'text-rose-400',
      borderColor: 'border-rose-500/30',
      bgGlow: 'shadow-[0_0_25px_rgba(244,63,94,0.15)]',
    },
    {
      id: 'detection-accuracy',
      label: 'Detection Accuracy',
      value: '99.98%',
      subtitle: 'SOC & ISO27001 verified',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      bgGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.15)]',
    },
    {
      id: 'avg-scan-time',
      label: 'Average Scan Time',
      value: '< 45ms',
      subtitle: 'Ultra-low latency inference',
      icon: Zap,
      color: 'text-yellow-400',
      borderColor: 'border-yellow-500/30',
      bgGlow: 'shadow-[0_0_25px_rgba(234,179,8,0.15)]',
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden bg-[#030712] border-y border-slate-800/80">
      {/* Background Subtle Mesh */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800/60">
          <div>
            <div className="badge-neon mb-2 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>LIVE SYSTEM METRICS & PERFORMANCE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-[Space_Grotesk]">
              Global Phishing Defense Telemetry
            </h3>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3.5 py-1.5 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>LIVE HONEYPOT METRICS ACTIVE</span>
          </div>
        </div>

        {/* Animated Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`glass-panel p-6 border ${item.borderColor} ${item.bgGlow} bg-[#070d1e]/80 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    {item.label}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                </div>

                <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${item.color} mb-1`}>
                  {item.value}
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-1 mt-2 font-mono">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
