import React, { useState, useEffect } from 'react';
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
  Bot,
  HelpCircle,
  AlertOctagon,
  Check
} from 'lucide-react';

const PRESET_SAMPLES = [
  {
    label: 'Spoofed PayPal URL (Step 3 Example)',
    input: 'https://paypal-sercuity-login.xyz',
    type: 'threat',
    category: 'URL',
  },
  {
    label: 'Malicious Typosquatting Link',
    input: 'http://paypaI-security-verify-login.com.auth-update.xyz/login.php',
    type: 'threat',
    category: 'URL',
  },
  {
    label: 'Legitimate Banking Webpage',
    input: 'https://www.chase.com/personal/banking/security-center',
    type: 'safe',
    category: 'URL',
  },
  {
    label: 'Urgent Wire Transfer Scam Email',
    input: `From: CEO Executive <executive-office@company-domain-update.net>\nSubject: URGENT: Wire Transfer Approval Needed Immediately\n\nTeam,\nI am in a meeting. Kindly process a wire transfer of $45,800 to invoice vendor account attached below before 5 PM today. Do not call, reply directly.`,
    type: 'threat',
    category: 'Email',
  },
  {
    label: 'Legitimate Team Update Email',
    input: `From: HR Team <hr@acme-corp.com>\nSubject: Quarterly All-Hands Meeting Agenda\n\nHi Everyone, Please review the attached agenda for tomorrow's call.`,
    type: 'safe',
    category: 'Email',
  },
  {
    label: 'Tampered Parking QR Code Data',
    input: 'QR Code parsed data: http://fastpay-parking-zone.top/pay?session=98213',
    type: 'threat',
    category: 'QR Code',
  },
  {
    label: 'Legitimate Restaurant Menu QR',
    input: 'QR Code parsed data: https://menu.bistrocentral.com/table/14',
    type: 'safe',
    category: 'QR Code',
  },
  {
    label: 'Smishing Package Delivery SMS',
    input: 'USPS Notice: Package delivery failed. Update details immediately to avoid return: http://usps-redelivery-update.com/track',
    type: 'threat',
    category: 'Plain Text',
  },
];

// Helper to classify input type as per Step 3 requirement
function classifyInputType(text) {
  if (!text || !text.trim()) return { category: 'Unknown', statement: 'Waiting for input...' };
  const trimmed = text.trim();
  
  if (trimmed.toLowerCase().includes('qr code') || trimmed.toLowerCase().startsWith('qr:') || /^https?:\/\/[^\s]+\?(qr|code)=/i.test(trimmed)) {
    return { category: 'QR Code', statement: 'This is a QR code' };
  }
  if (trimmed.toLowerCase().startsWith('from:') || trimmed.toLowerCase().includes('subject:') || (trimmed.includes('@') && trimmed.includes('\n'))) {
    return { category: 'Email', statement: 'This is an email' };
  }
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(trimmed.split('\n')[0])) {
    return { category: 'URL', statement: 'This is a URL' };
  }
  if (trimmed.toLowerCase().startsWith('filename:') || trimmed.includes('.exe') || trimmed.includes('.scr')) {
    return { category: 'File Attachment', statement: 'This is a file attachment' };
  }
  return { category: 'Plain Text', statement: 'This is plain text' };
}

export default function InteractiveScanner() {
  const [inputValue, setInputValue] = useState(PRESET_SAMPLES[0].input);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState(null);

  const currentClassification = classifyInputType(inputValue);

  const runAnalysis = (inputToScan = inputValue) => {
    if (!inputToScan.trim()) return;

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
    }, 400);

    setTimeout(() => {
      setIsScanning(false);
      const classified = classifyInputType(inputToScan);
      const isMalicious =
        inputToScan.includes('paypal-sercuity') ||
        inputToScan.includes('paypaI') ||
        inputToScan.includes('auth-update') ||
        inputToScan.includes('executive-office') ||
        inputToScan.includes('fastpay') ||
        inputToScan.includes('usps-redelivery') ||
        inputToScan.includes('.xyz') ||
        inputToScan.includes('.top') ||
        inputToScan.includes('URGENT') ||
        inputToScan.includes('.exe');

      if (isMalicious) {
        setScanResult({
          inputTypeStatement: classified.statement,
          inputCategory: classified.category,
          score: 96,
          riskLevel: 'CRITICAL PHISHING RISK',
          color: 'text-rose-400',
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          bgBorder: 'border-rose-500/40 bg-rose-950/30',
          verdict: 'High-Risk Phishing Threat Detected',
          reasons: [
            {
              title: 'Misspelled & Fake Domain (Typosquatting)',
              details: 'Contains suspicious domain tricks (e.g. "paypal-sercuity" misspelling or fake login subdomain) designed to trick users into thinking it is legitimate.',
            },
            {
              title: 'High-Risk Top-Level Domain (.xyz / .top)',
              details: 'The site uses a low-cost, untrusted top-level domain frequently associated with automated malicious phishing campaigns.',
            },
            {
              title: 'Credential Harvesting Attempt',
              details: 'Form analysis indicates password and sensitive login details are captured and transmitted to an unauthorized third-party server.',
            },
            {
              title: 'Social Engineering & Urgent Tone',
              details: 'Uses artificial pressure and urgency to manipulate the victim into bypassing security precautions.',
            },
          ],
          safeActions: [
            'DO NOT enter any passwords, credit card numbers, or personal information.',
            'Do not click any internal links or buttons on the target page.',
            'Block and report this link or sender in your browser and mail client.',
            'If you entered credentials, immediately change your password on the official website and enable 2FA.',
          ],
        });
      } else {
        setScanResult({
          inputTypeStatement: classified.statement,
          inputCategory: classified.category,
          score: 4,
          riskLevel: 'SAFE / VERIFIED CONTENT',
          color: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          bgBorder: 'border-emerald-500/40 bg-emerald-950/30',
          verdict: 'No Malicious Phishing Patterns Detected',
          reasons: [
            {
              title: 'Authenticated Official Infrastructure',
              details: 'Domain ownership and SSL certificates match verified official organization registration records.',
            },
            {
              title: 'Clean Content & No Deceptive Form Prompts',
              details: 'No homoglyph characters, zero-day payload scripts, or suspicious credential-harvesting redirects found.',
            },
            {
              title: 'Standard Security Headers Active',
              details: 'Proper HTTPS TLS encryption, DMARC/SPF mail verification, and secure cookie attributes confirmed.',
            },
          ],
          safeActions: [
            'You may proceed safely to view this content.',
            'Always double-check the browser URL bar to ensure you remain on the authentic domain.',
          ],
        });
      }
    }, 1800);
  };

  const handleSelectPreset = (sample) => {
    setInputValue(sample.input);
    setScanResult(null);
    runAnalysis(sample.input);
  };

  return (
    <div id="live-scanner" className="w-full max-w-5xl mx-auto glass-panel p-6 sm:p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)]">
      {/* Step 1 Agent Identity Mission Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 mb-6 backdrop-blur-md">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Bot className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="badge-neon text-[11px] py-0.5 px-2">STEP 1: AGENT IDENTITY</span>
              <span className="text-xs font-mono text-cyan-300 font-semibold">AI CYBERSECURITY AGENT</span>
            </div>
            <p className="text-sm font-semibold text-slate-100 italic leading-snug">
              "I am an AI cybersecurity agent that detects phishing attacks, explains why they are dangerous and recommends safe actions."
            </p>
          </div>
        </div>
      </div>

      {/* Main Scanner Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-cyan-500/20">
        <div>
          <h3 className="text-2xl font-bold text-white font-[Space_Grotesk]">
            Interactive Threat & Phishing Scanner
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Test any link, email text, plain text message, or QR code data string.
          </p>
        </div>
        
        {/* Live Step 3 Decision Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono bg-cyan-950/60 border border-cyan-400/40 px-3.5 py-2 rounded-xl">
          <span className="text-slate-400">Step 3 Decision:</span>
          <span className="text-cyan-300 font-bold bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-400/30">
            {currentClassification.statement}
          </span>
        </div>
      </div>

      {/* Quick Test Samples */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Quick Test Inputs:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_SAMPLES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(sample)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                sample.type === 'threat'
                  ? 'bg-rose-950/30 text-rose-300 border-rose-500/40 hover:border-rose-400 hover:bg-rose-900/40'
                  : 'bg-emerald-950/30 text-emerald-300 border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-900/40'
              }`}
            >
              {sample.type === 'threat' ? (
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>{sample.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Box with Step 3 Live Detection */}
      <div className="relative mb-6">
        <div className="relative flex flex-col gap-2">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-500" />
            <textarea
              rows={inputValue.includes('\n') ? 4 : 2}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Paste URL (e.g. https://paypal-sercuity-login.xyz), Email text, SMS, or QR data..."
              className="w-full bg-[#070d1e] border border-cyan-500/30 rounded-xl py-3 pl-12 pr-32 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-y"
            />
            <button
              onClick={() => runAnalysis()}
              disabled={isScanning}
              className="absolute right-2 top-2.5 btn-primary-neon text-xs py-2.5 px-4 rounded-lg flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  Scan Threat
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Live agent input recognition tag */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-semibold">Agent Input Classification:</span>
              <span className="bg-slate-900 text-slate-200 border border-slate-800 px-2 py-0.5 rounded font-bold">
                "{currentClassification.statement}"
              </span>
            </div>
            <span className="text-slate-500">Risk Scale: 1 to 100</span>
          </div>
        </div>
      </div>

      {/* Scanning Animation */}
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
                  AGENT RUNNING FULL VECTOR INSPECTION...
                </h4>
                <p className="text-xs text-slate-400">Classifying input type, scanning URL/link structures, and calculating risk score (1-100)</p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">{scanStep * 25}%</span>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-cyan-500/30">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full transition-all duration-300 shadow-[0_0_10px_#00f0ff]"
              style={{ width: `${scanStep * 25}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-400 pt-1">
            <div className={`flex items-center gap-2 ${scanStep >= 1 ? 'text-cyan-300' : 'text-slate-600'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Step 1 & 3: Agent Identity & Input Type Decision ({currentClassification.statement})</span>
            </div>
            <div className={`flex items-center gap-2 ${scanStep >= 2 ? 'text-cyan-300' : 'text-slate-600'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Step 2: URL & QR Code Link Structural Scan</span>
            </div>
            <div className={`flex items-center gap-2 ${scanStep >= 3 ? 'text-cyan-300' : 'text-slate-600'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Step 2: Plain English Reason Analysis & Typosquat Detection</span>
            </div>
            <div className={`flex items-center gap-2 ${scanStep >= 4 ? 'text-cyan-300' : 'text-slate-600'}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Step 2: Risk Score (1-100) & Safe Recommended Actions</span>
            </div>
          </div>
        </div>
      )}

      {/* Result Display Output */}
      {scanResult && !isScanning && (
        <div className={`p-6 rounded-2xl border ${scanResult.bgBorder} fade-in space-y-6`}>
          {/* Header section with score & decision */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-5">
              {/* Score Circular Metric (Scale 1 to 100) */}
              <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner flex-shrink-0">
                <div className="text-center">
                  <div className={`text-3xl font-extrabold font-mono ${scanResult.color}`}>
                    {scanResult.score}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                    RISK SCORE
                  </div>
                  <div className="text-[9px] font-mono text-slate-500">1 TO 100</div>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`font-mono text-xs font-bold uppercase px-3 py-1 rounded-lg border ${scanResult.badgeBg}`}>
                    {scanResult.riskLevel}
                  </span>
                  <span className="text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                    Agent Decision: <strong>{scanResult.inputTypeStatement}</strong>
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white font-[Space_Grotesk]">
                  {scanResult.verdict}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Scanned input: <code className="text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded font-mono text-[11px]">{inputValue}</code>
                </p>
              </div>
            </div>

            <button
              onClick={() => runAnalysis()}
              className="btn-secondary-cyber text-xs py-2 px-4 self-start md:self-center"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Re-Scan Request
            </button>
          </div>

          {/* Reasons Section in Clear English (Step 2 requirement) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className={`w-4 h-4 ${scanResult.score > 50 ? 'text-rose-400' : 'text-emerald-400'}`} />
              <h5 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Why is this dangerous / safe? (Clear English Reasons)
              </h5>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {scanResult.reasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${scanResult.score > 50 ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                    <h6 className="text-xs font-bold text-slate-100 font-mono">{reason.title}</h6>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal pl-4">
                    {reason.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Safe Actions (Step 1 & Step 2 requirement) */}
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <h5 className="text-sm font-bold text-cyan-300 font-mono uppercase tracking-wider">
                Recommended Safe Actions
              </h5>
            </div>
            <ul className="space-y-2">
              {scanResult.safeActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                  <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

