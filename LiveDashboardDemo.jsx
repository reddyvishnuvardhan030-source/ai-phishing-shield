import React, { useState, useEffect } from 'react';
import {
  Activity,
  ShieldAlert,
  Globe,
  Mail,
  QrCode,
  MessageSquare,
  FileCheck,
  RefreshCw,
  BarChart2,
  PieChart,
  ShieldCheck,
  Layers,
  ArrowUpRight
} from 'lucide-react';

const LIVE_LOGS_INITIAL = [
  {
    id: 'LOG-891',
    time: '12:04:19',
    vector: 'Phishing URL',
    target: 'http://auth-verify-chase-update.net/login',
    score: 98,
    action: 'BLOCKED',
    icon: Globe,
  },
  {
    id: 'LOG-890',
    time: '12:03:52',
    vector: 'Email BEC',
    target: 'CEO Wire Transfer Request (Spoofed Header)',
    score: 95,
    action: 'QUARANTINED',
    icon: Mail,
  },
  {
    id: 'LOG-889',
    time: '12:02:11',
    vector: 'SMS Smishing',
    target: 'USPS Redelivery Link (Malicious TLD)',
    score: 91,
    action: 'BLOCKED',
    icon: MessageSquare,
  },
  {
    id: 'LOG-888',
    time: '12:00:04',
    vector: 'QR Code',
    target: 'Tampered Parking Voucher (Obfuscated QR)',
    score: 88,
    action: 'BLOCKED',
    icon: QrCode,
  },
  {
    id: 'LOG-887',
    time: '11:58:30',
    vector: 'File Attachment',
    target: 'Purchase_Order_V2.pdf.exe (VBA Payload)',
    score: 99,
    action: 'ISOLATED',
    icon: FileCheck,
  },
];

export default function LiveDashboardDemo() {
  const [logs, setLogs] = useState(LIVE_LOGS_INITIAL);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [telemetry, setTelemetry] = useState({
    totalScansToday: 18942,
    threatsBlockedToday: 4812,
    avgScanLatencyMs: 14,
    zeroDayBreachRate: '0.00%',
    vectorBreakdown: { URL: 45, Email: 30, QR: 15, Text: 10 }
  });

  const fetchTelemetry = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setTelemetry({
          totalScansToday: data.total_scans_today || 18942,
          threatsBlockedToday: data.threats_blocked_today || 4812,
          avgScanLatencyMs: data.avg_scan_latency_ms || 14,
          zeroDayBreachRate: data.zero_day_breach_rate || '0.00%',
          vectorBreakdown: { URL: 45, Email: 30, QR: 15, Text: 10 }
        });
      }
    } catch (e) {
      // Backend offline fallback
    }
  };

  useEffect(() => {
    fetchTelemetry();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchTelemetry();
    setTimeout(() => {
      setIsRefreshing(false);
      const newLog = {
        id: `LOG-${Math.floor(892 + Math.random() * 50)}`,
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        vector: 'Phishing URL',
        target: `http://login-auth-pass-${Math.floor(Math.random() * 999)}.xyz/verify`,
        score: Math.floor(88 + Math.random() * 11),
        action: 'BLOCKED',
        icon: Globe,
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    }, 600);
  };

  return (
    <section id="dashboard" className="py-24 relative overflow-hidden bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-neon mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>BACKEND SERVICE #11: TELEMETRY DASHBOARD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-[Space_Grotesk]">
            Interactive <span className="text-gradient-neon">Security Dashboard</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Real-time analytics over incoming threat vectors, threat score distributions, and automated mitigations.
          </p>
        </div>

        {/* Dashboard Frame Container */}
        <div className="glass-panel border-cyan-500/30 overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)] bg-[#070d1e]/90">
          {/* Top Control Bar */}
          <div className="bg-[#040914] px-6 py-4 border-b border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  AI SHIELD TELEMETRY // TENANT: ACME-ENTERPRISE-GLOBAL
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="btn-secondary-cyber text-xs py-1.5 px-3"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Stream Telemetry Update
              </button>

              <div className="badge-neon py-1 px-3 text-xs font-mono">
                AUTO-CONTAINMENT: ACTIVE
              </div>
            </div>
          </div>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-slate-800 bg-slate-950/60 divide-x divide-y lg:divide-y-0 divide-slate-800">
            <div className="p-5">
              <div className="text-xs font-mono text-slate-400 uppercase">Total Scans Today</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 mt-1">
                {telemetry.totalScansToday.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400 font-mono mt-1">↑ +18% vs yesterday</div>
            </div>

            <div className="p-5">
              <div className="text-xs font-mono text-slate-400 uppercase">Threats Blocked</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400 mt-1">
                {telemetry.threatsBlockedToday.toLocaleString()}
              </div>
              <div className="text-[11px] text-cyan-400 font-mono mt-1">100% Mitigation SLA</div>
            </div>

            <div className="p-5">
              <div className="text-xs font-mono text-slate-400 uppercase">Avg Inspection Speed</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                {telemetry.avgScanLatencyMs} ms
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">Sub-50ms SLA</div>
            </div>

            <div className="p-5">
              <div className="text-xs font-mono text-slate-400 uppercase">Zero-Day Breach Rate</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                {telemetry.zeroDayBreachRate}
              </div>
              <div className="text-[11px] text-emerald-400 font-mono mt-1">Zero Breaches Logged</div>
            </div>
          </div>

          {/* Vector Distribution & Incident Feed Grid */}
          <div className="p-6 sm:p-8 bg-[#040914] grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Vector Breakdown Progress Bars */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-2">
                  <PieChart className="w-4 h-4" />
                  <span>Threat Vector Distribution</span>
                </h4>
                <span className="text-[10px] font-mono text-slate-400">TELEMETRY %</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>🔗 URL Vectors</span>
                    <span className="text-cyan-400 font-bold">45%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div className="bg-cyan-400 h-full w-[45%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>📧 Email & BEC Vectors</span>
                    <span className="text-indigo-400 font-bold">30%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div className="bg-indigo-400 h-full w-[30%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>📱 QR Code (Quishing)</span>
                    <span className="text-amber-400 font-bold">15%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div className="bg-amber-400 h-full w-[15%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>💬 Plain Text / Smishing</span>
                    <span className="text-emerald-400 font-bold">10%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div className="bg-emerald-400 h-full w-[10%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Incident Stream Feed */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white font-[Space_Grotesk] flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-cyan-400" />
                  Live Incident Detection Feed
                </h3>
                <span className="text-xs font-mono text-slate-400">Real-Time Telemetry Stream</span>
              </div>

              <div className="space-y-3">
                {logs.map((log) => {
                  const Icon = log.icon;
                  return (
                    <div
                      key={log.id}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-rose-950/40 border border-rose-500/30 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-rose-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-cyan-400">{log.id}</span>
                            <span className="text-xs font-mono text-slate-500">[{log.time}]</span>
                            <span className="text-xs font-mono text-slate-300 font-medium px-2 py-0.5 rounded bg-slate-800">
                              {log.vector}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-mono text-slate-200 mt-1 truncate max-w-xs sm:max-w-md">
                            {log.target}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                        <div className="text-right">
                          <div className="text-[9px] font-mono text-slate-400">RISK INDEX</div>
                          <div className="text-sm font-mono font-bold text-rose-400">{log.score}/100</div>
                        </div>

                        <span className="badge-threat font-bold text-xs py-1 px-3">
                          {log.action}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
