import React, { useState, useEffect } from 'react';
import CyberBackground from './components/CyberBackground.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import StatsSection from './components/StatsSection.jsx';
import AIAgentSection from './components/AIAgentSection.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import HowItWorksSection from './components/HowItWorksSection.jsx';
import InteractiveScanner from './components/InteractiveScanner.jsx';
import ArchitectureFlowSection from './components/ArchitectureFlowSection.jsx';
import FeaturesSection from './components/FeaturesSection.jsx';
import LiveDashboardDemo from './components/LiveDashboardDemo.jsx';
import APIDeveloperSection from './components/APIDeveloperSection.jsx';
import Footer from './components/Footer.jsx';
import RequestDemoModal from './components/RequestDemoModal.jsx';
import ScanHistoryModal from './components/ScanHistoryModal.jsx';

export default function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoModalMode, setDemoModalMode] = useState('demo');
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  // Active User Session State
  const [currentUser, setCurrentUser] = useState({
    email: 'user@cybersecurity.io',
    full_name: 'Alexander Vance',
    company: 'Enterprise Cyber Defense Inc',
    role: 'Lead Security Analyst',
    api_key: 'sec_live_98a72f1b4092d6e'
  });

  // Scan History Logs State with Persistence
  const [scanHistory, setScanHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('ai_phishing_scan_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return [
      {
        id: 'SCAN-892A',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        input_type_statement: 'This is a web URL vector',
        input_category: 'URL',
        risk_score: 96,
        status: 'DANGEROUS',
        status_label: '🔴 Dangerous',
        verdict: 'High-Risk Phishing Attack Detected',
        reasons: [
          { title: 'Spoofed PayPal Domain (Typosquatting)', details: 'Contains suspicious domain spelling tricks.' }
        ]
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('ai_phishing_scan_history', JSON.stringify(scanHistory));
    } catch (e) {
      console.warn('LocalStorage save failed');
    }
  }, [scanHistory]);

  const handleOpenDemoModal = (mode = 'demo') => {
    setDemoModalMode(mode);
    setDemoModalOpen(true);
  };

  const handleSaveScanToHistory = (scanItem) => {
    setScanHistory((prev) => {
      // Avoid exact duplicate IDs
      const filtered = prev.filter((p) => p.id !== scanItem.id);
      return [scanItem, ...filtered];
    });
  };

  const handleClearHistory = () => {
    setScanHistory([]);
    fetch('http://localhost:8000/api/v1/history/clear', { method: 'DELETE' }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative selection:bg-cyan-500 selection:text-black font-[Inter]">
      {/* Animated Canvas Particle Network Background */}
      <CyberBackground />

      {/* Main Layout Navigation */}
      <Navbar
        onOpenDemoModal={handleOpenDemoModal}
        historyCount={scanHistory.length}
        onOpenHistoryModal={() => setHistoryModalOpen(true)}
        currentUser={currentUser}
      />

      <main className="relative z-10">
        <Hero onOpenDemoModal={handleOpenDemoModal} />
        <StatsSection />
        <AIAgentSection />
        <ServicesSection />
        <HowItWorksSection />
        
        {/* Interactive Threat Scanner Hub */}
        <section className="py-20 relative px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="badge-neon mb-3">SERVICES #1-#8 UNIFIED ENGINE</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-[Space_Grotesk]">
              Interactive <span className="text-gradient-neon">Threat Scanner Hub</span>
            </h2>
            <p className="mt-3 text-slate-300 text-base sm:text-lg">
              Scan links, email headers, QR payloads, and domain WHOIS reputation in real-time with 0-100 risk score ratings.
            </p>
          </div>
          <InteractiveScanner
            onSaveScanToHistory={handleSaveScanToHistory}
            onOpenHistoryModal={() => setHistoryModalOpen(true)}
          />
        </section>

        <ArchitectureFlowSection />
        <FeaturesSection />
        <LiveDashboardDemo />
        <APIDeveloperSection />
      </main>

      <Footer onOpenDemoModal={handleOpenDemoModal} />

      {/* Auth & Demo Modal */}
      <RequestDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialMode={demoModalMode}
        currentUser={currentUser}
        onAuthSuccess={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Scan History Repository Modal */}
      <ScanHistoryModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        historyList={scanHistory}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}
