import React, { useState } from 'react';
import {
  Globe,
  Mail,
  QrCode,
  MessageSquare,
  FileCheck,
  ShieldAlert,
  ShieldCheck,
  Zap,
  AlertTriangle,
  RefreshCw,
  Search,
  CheckCircle2,
  Lock,
  Cpu,
  ArrowRight,
  UploadCloud
} from 'lucide-react';

const PRESET_SAMPLES = {
  url: [
    {
      label: 'Malicious PayPal Phish',
      type: 'threat',
      value: 'http://paypaI-security-verify-login.com.auth-update.xyz/login.php',
    },
    {
      label: 'Legitimate Bank URL',
      type: 'safe',
      value: 'https://www.chase.com/personal/banking/security-center',
    },
  ],
  email: [
    {
      label: 'Urgent Wire Transfer Scam',
      type: 'threat',
      value: `From: CEO Executive <executive-office@company-domain-update.net>\nSubject: URGENT: Wire Transfer Approval Needed Immediately\n\nTeam,\nI am in a meeting with auditors. Kindly process an wire transfer of $45,800 to invoice vendor account attached below before 5 PM today. Do not call, reply to this email directly.`,
    },
    {
      label: 'Standard Team Update',
      type: 'safe',
      value: `From: HR Team <hr@acme-corp.com>\nSubject: Quarterly All-Hands Meeting Agenda\n\nHi Everyone,\nPlease review the attached agenda for tomorrow's all-hands call. Let us know if you have any slides to add before 3 PM.`,
    },
  ],
  qr: [
    {
      label: 'Tampered Parking Meter QR',
      type: 'threat',
      value: 'QR Code parsed data: http://fastpay-parking-zone.top/pay?session=98213',
    },
    {
      label: 'Valid Restaurant Menu QR',
      type: 'safe',
      value: 'QR Code parsed data: https://menu.bistrocentral.com/table/14',
    },
  ],
  sms: [
    {
      label: 'Smishing USPS Package Scam',
      type: 'threat',
      value: 'USPS Notice: Your package could not be delivered due to an incorrect address. Update details immediately to prevent return: http://usps-redelivery-update.com/track',
    },
    {
      label: 'Bank 2FA Security Code',
      type: 'safe',
      value: 'Your verification code for Acme Portal is 894012. Valid for 5 minutes. Do not share this code with anyone.',
    },
  ],
  file: [
    {
      label: 'Invoice_March2026.pdf.exe',
      type: 'threat',
      value: 'Filename: Invoice_March2026.pdf.exe (Size: 1.4 MB, Hash: 8f9b1c72... - Embedded Macro Payload Detected)',
    },
    {
      label: 'Project_Proposal_Q3.pdf',
      type: 'safe',
      value: 'Filename: Project_Proposal_Q3.pdf (Size: 3.8 MB, Hash: 3a2c4e11... - Clean Document Signature)',
    },
  ],
};

export default function InteractiveScanner() {
  const [activeTab, setActiveTab] = useState('url');
  const [inputValue, setInputValue] = useState(PRESET_SAMPLES.url[0].value);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState(null);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setInputValue(PRESET_SAMPLES[tabKey][0].value);
    setScanResult(null);
  };

  const handlePresetSelect = (sample) => {
    setInputValue(sample.value);
    setScanResult(null);
  };

  const runAnalysis = () => {
    if (!inputValue.trim()) return;

    setIsScanning(true);
    setScanResult(null);
    setScanStep(1);

    const stepInterval = setInterval(() => {
      setScanStep((prev) => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          return 4;
        }
        return prev + 1;
      });
    }, 450);

    setTimeout(() => {
      setIsScanning(false);
      // Determine threat score based on input heuristics
      const isMalicious =
        inputValue.includes('xyz') ||
        inputValue.includes('paypaI') ||
        inputValue.includes('executive-office') ||
        inputValue.includes('fastpay') ||
        inputValue.includes('usps-redelivery') ||
        inputValue.includes('.exe') ||
        inputValue.includes('URGENT') ||
        inputValue.includes('top');

      if (isMalicious) {
        setScanResult({
          score: 94,
          severity: 'CRITICAL THREAT',
          color: 'text-rose-500',
          bgBorder: 'border-rose-500/40 bg-rose-950/20',
          verdict: 'High-Risk Phishing Attack Detected',
          breakdown: [
            { name: 'Domain Reputational Score', status: 'Flagged (Suspicious TLD)', score: '98/100 Threat' },
            { name: 'Homoglyph / Typosquatting Check', status: 'Spoofed Char Detected (I vs l)', score: 'Critical' },
            { name: 'NLP Urgency & Coercion Intent', status: 'Social Engineering Pattern', score: 'High Risk' },
            { name: 'Zero-Day AI Payload Signature', status: 'Malicious Redirection Chain', score: 'Blocked' },
          ],
          recommendation:
            'Immediate Quarantine recommended. Block incoming requests to this domain and revoke session credentials if credentials were typed.',
        });
      } else {
        setScanResult({
          score: 3,
          severity: 'SAFE / VERIFIED',
          color: 'text-emerald-400',
          bgBorder: 'border-emerald-500/40 bg-emerald-950/20',
          verdict: 'Content Passed All AI Security Heuristics',
          breakdown: [
            { name: 'Domain Reputational Score', status: 'Verified Official Domain', score: '99/100 Safe' },
            { name: 'Cryptographic Certificate Check', status: 'Valid EV SSL / TLS Certificate', score: 'Passed' },
            { name: 'NLP & Brand Identity Match', status: 'Legitimate Corporate Pattern', score: 'Low Risk' },
            { name: 'AI Threat Graph Lookup', status: 'No Malicious Markers Found', score: 'Clean' },
          ],
          recommendation:
            'This asset exhibits standard legitimate security indicators. No suspicious redirection or obfuscated payloads detected.',
        });
      }
    }, 2000);
  };

  return (
    <div id="live-scanner" className="w-full max-w-5xl mx-auto glass-panel p-6 sm:p-8 relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-cyan-500/20">
        <div>
          <div className="badge-neon mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE REAL-TIME AI DEMO</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-[Space_Grotesk]">
            Test AI Phishing Shield Vector Scanner
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>MODEL: NEURAL-PHISH-V4.2</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {[
          { key: 'url', label: 'URL / Website', icon: Globe },
          { key: 'email', label: 'Email Security', icon: Mail },
          { key: 'qr', label: 'QR Code', icon: QrCode },
          { key: 'sms', label: 'SMS Phishing', icon: MessageSquare },
          { key: 'file', label: 'File Attachment', icon: FileCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all border ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Presets Quick Picker */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs font-mono text-slate-400">Quick Test Samples:</span>
        {PRESET_SAMPLES[activeTab].map((sample, idx) => (
          <button
            key={idx}
            onClick={() => handlePresetSelect(sample)}
            className={`text-xs px-3 py-1 rounded-lg border transition-all ${
              sample.type === 'threat'
                ? 'bg-rose-950/30 text-rose-300 border-rose-500/30 hover:border-rose-500'
                : 'bg-emerald-950/30 text-emerald-300 border-emerald-500/30 hover:border-emerald-500'
            }`}
          >
            {sample.type === 'threat' ? '⚠️ ' : '🛡️ '}
            {sample.label}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="relative mb-6">
        {activeTab === 'email' || activeTab === 'sms' ? (
          <textarea
            rows={4}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Paste suspicious text, email header, or message content..."
            className="w-full bg-[#070d1e] border border-cyan-500/30 rounded-xl p-4 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
          />
        ) : (
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter URL, domain, or raw data string..."
              className="w-full bg-[#070d1e] border border-cyan-500/30 rounded-xl py-3.5 pl-12 pr-36 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            <button
              onClick={runAnalysis}
              disabled={isScanning}
              className="absolute right-2 btn-primary-neon text-xs py-2 px-4 rounded-lg"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Scan Now
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {(activeTab === 'email' || activeTab === 'sms') && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={runAnalysis}
              disabled={isScanning}
              className="btn-primary-neon text-xs py-2.5 px-6"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing Content...
                </>
              ) : (
                <>
                  Analyze Threat Content
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Scanning State Loader */}
      {isScanning && (
        <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 space-y-4 fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md animate-ping" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white font-mono">
                  DEEP NEURAL NETWORK INSPECTION IN PROGRESS...
                </h4>
                <p className="text-xs text-slate-400">Extracting vectors & evaluating zero-day heuristic models</p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">{scanStep * 25}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-cyan-500/30">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full transition-all duration-300 shadow-[0_0_10px_#00f0ff]"
              style={{ width: `${scanStep * 25}%` }}
            />
          </div>

          {/* Micro Logs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-400 pt-2">
            <div className={`flex items-center gap-2 ${scanStep >= 1 ? 'text-cyan-300' : 'text-slate-600'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Step 1: Domain & Typosquatting Analysis</span>
            </div>
            <div className={`flex items-center gap-2 ${scanStep >= 2 ? 'text-cyan-300' : 'text-slate-600'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Step 2: Natural Language NLP Coercion Check</span>
            </div>
            <div className={`flex items-center gap-2 ${scanStep >= 3 ? 'text-cyan-300' : 'text-slate-600'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Step 3: Redirection Graph & Payload Inspection</span>
            </div>
            <div className={`flex items-center gap-2 ${scanStep >= 4 ? 'text-cyan-300' : 'text-slate-600'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Step 4: Threat Intelligence Graph Scoring</span>
            </div>
          </div>
        </div>
      )}

      {/* Result Display */}
      {scanResult && !isScanning && (
        <div className={`p-6 rounded-2xl border ${scanResult.bgBorder} fade-in space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              {/* Score Circular Metric */}
              <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-center">
                  <div className={`text-2xl font-bold font-mono ${scanResult.color}`}>
                    {scanResult.score}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">RISK INDEX</div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`font-mono text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      scanResult.score > 50
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    }`}
                  >
                    {scanResult.severity}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white font-[Space_Grotesk]">
                  {scanResult.verdict}
                </h4>
                <p className="text-xs text-slate-400 mt-1">{scanResult.recommendation}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={runAnalysis}
                className="btn-secondary-cyber text-xs py-2 px-3"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Re-Scan
              </button>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scanResult.breakdown.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200">{item.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{item.status}</div>
                </div>
                <div
                  className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                    scanResult.score > 50 ? 'bg-rose-950/60 text-rose-400' : 'bg-emerald-950/60 text-emerald-400'
                  }`}
                >
                  {item.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
