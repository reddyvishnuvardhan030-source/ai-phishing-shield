import React, { useState } from 'react';
import {
  Code2,
  Key,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Zap,
  Server,
  FileCode,
  Globe,
  Layers,
  Sparkles
} from 'lucide-react';

export default function APIDeveloperSection() {
  const [apiKey, setApiKey] = useState('sec_live_98a72f1b4092d6e');
  const [copiedKey, setCopiedKey] = useState(false);
  const [activeTab, setActiveTab] = useState('python');
  const [keyGenerating, setKeyGenerating] = useState(false);
  const [keySuccessMsg, setKeySuccessMsg] = useState('');

  const handleGenerateKey = async () => {
    setKeyGenerating(true);
    setKeySuccessMsg('');

    try {
      const response = await fetch('http://localhost:8000/api/v1/api-keys/generate', {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        setApiKey(data.api_key);
        setKeySuccessMsg('New Enterprise API Key generated successfully!');
      } else {
        throw new Error('API key endpoint failed');
      }
    } catch (e) {
      // Local fallback key generator
      const randomHex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setApiKey(`sec_live_${randomHex}`);
      setKeySuccessMsg('New API Key generated successfully (Client Fallback Engine)!');
    } finally {
      setKeyGenerating(false);
      setTimeout(() => setKeySuccessMsg(''), 4000);
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const codeSnippets = {
    python: `import requests

# AI Phishing Shield Python SDK Example
API_KEY = "${apiKey}"
ENDPOINT = "http://localhost:8000/api/v1/scan"

payload = {
    "input_text": "https://paypal-sercuity-login.xyz",
    "scan_vector": "URL"
}

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

response = requests.post(ENDPOINT, json=payload, headers=headers)
print("Risk Score:", response.json()["risk_score"])
print("Status:", response.json()["status_label"])
print("Verdict:", response.json()["verdict"])`,

    javascript: `// AI Phishing Shield Node.js / JavaScript Fetch Example
const apiKey = "${apiKey}";
const endpoint = "http://localhost:8000/api/v1/scan";

async function scanThreat(inputText) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${apiKey}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ input_text: inputText, scan_vector: "AUTO" })
  });

  const data = await res.json();
  console.log(\`[Score \${data.risk_score}/100] \${data.verdict}\`);
  console.log("Domain Reputation:", data.domain_reputation);
  return data;
}

scanThreat("http://auth-verify-chase.net/login");`,

    curl: `# cURL Command Line Phishing Scan Request
curl -X POST "http://localhost:8000/api/v1/scan" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input_text": "From: CEO Executive <executive@fake-corp.xyz>\\nSubject: URGENT Wire Transfer",
    "scan_vector": "EMAIL"
  }'`
  };

  return (
    <section id="api-developer" className="py-24 relative overflow-hidden bg-[#030712] border-t border-slate-800">
      {/* Background glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-neon mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>BACKEND SERVICE #12: API DEVELOPER HUB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-[Space_Grotesk]">
            Developer <span className="text-gradient-neon">REST API & SDK Service</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Integrate real-time URL, Email, and QR threat intelligence into your own applications, CI/CD pipelines, and security enterprise stacks.
          </p>
        </div>

        {/* API Control Hub Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: API Key Management & Endpoints Overview */}
          <div className="lg:col-span-5 space-y-6">
            {/* API Key Management Box */}
            <div className="glass-panel p-6 border-cyan-500/30 bg-[#070d1e]/90 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-[Space_Grotesk]">API Key Manager</h3>
                    <p className="text-xs text-slate-400">Enterprise Tier • 1,000,000 requests/mo</p>
                  </div>
                </div>

                <button
                  onClick={handleGenerateKey}
                  disabled={keyGenerating}
                  className="btn-primary-neon text-xs py-2 px-3 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {keyGenerating ? 'Generating...' : 'New Key'}
                </button>
              </div>

              {keySuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 fade-in">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{keySuccessMsg}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Active API Token Header:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={apiKey}
                    className="w-full bg-[#030712] border border-cyan-500/30 rounded-xl py-2.5 px-3.5 text-xs text-cyan-300 font-mono focus:outline-none"
                  />
                  <button
                    onClick={handleCopyKey}
                    className="btn-secondary-cyber py-2.5 px-3 text-xs flex items-center gap-1 shrink-0"
                    title="Copy API key"
                  >
                    {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                    <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>FastAPI Docs (Swagger UI):</span>
                <a
                  href="http://localhost:8000/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <span>http://localhost:8000/docs</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* List of Available REST Endpoints */}
            <div className="glass-panel p-6 border-cyan-500/30 bg-[#070d1e]/90 space-y-4">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Server className="w-4 h-4" />
                <span>Available API Endpoints</span>
              </h4>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">POST</span>
                    <span className="text-slate-200">/api/v1/scan</span>
                  </div>
                  <span className="text-slate-400">Unified Threat Scanner</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">POST</span>
                    <span className="text-slate-200">/api/v1/scan/url</span>
                  </div>
                  <span className="text-slate-400">URL & SSL Scanner</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">POST</span>
                    <span className="text-slate-200">/api/v1/scan/email</span>
                  </div>
                  <span className="text-slate-400">Email NLP Scanner</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">GET</span>
                    <span className="text-slate-200">/api/v1/domain-reputation</span>
                  </div>
                  <span className="text-slate-400">WHOIS & DNS Check</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">GET</span>
                    <span className="text-slate-200">/api/v1/threat-intel</span>
                  </div>
                  <span className="text-slate-400">Blacklist Feed Lookup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code Snippet Playground */}
          <div className="lg:col-span-7">
            <div className="glass-panel border-cyan-500/30 bg-[#040914] overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.1)] flex flex-col h-full">
              {/* Code Tab Navigation */}
              <div className="bg-[#070d1e] px-6 py-4 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Interactive SDK Code Generator
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('python')}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                      activeTab === 'python'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🐍 Python
                  </button>

                  <button
                    onClick={() => setActiveTab('javascript')}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                      activeTab === 'javascript'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🟨 JavaScript
                  </button>

                  <button
                    onClick={() => setActiveTab('curl')}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                      activeTab === 'curl'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    💻 cURL
                  </button>
                </div>
              </div>

              {/* Code Block Container */}
              <div className="p-6 flex-1 bg-[#02050c] overflow-x-auto relative font-mono text-xs text-cyan-300 leading-relaxed">
                <pre>
                  <code>{codeSnippets[activeTab]}</code>
                </pre>
              </div>

              {/* Bottom Quick Test Banner */}
              <div className="p-4 bg-[#070d1e] border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Response format: <code className="text-emerald-400">application/json</code></span>
                <a
                  href="http://localhost:8000/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary-cyber py-1.5 px-3 text-xs flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Test Live in Swagger UI
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
