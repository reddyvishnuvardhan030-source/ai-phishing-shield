import React, { useState } from 'react';
import CyberBackground from './components/CyberBackground.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import StatsSection from './components/StatsSection.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import HowItWorksSection from './components/HowItWorksSection.jsx';
import FeaturesSection from './components/FeaturesSection.jsx';
import LiveDashboardDemo from './components/LiveDashboardDemo.jsx';
import Footer from './components/Footer.jsx';
import RequestDemoModal from './components/RequestDemoModal.jsx';

export default function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoModalMode, setDemoModalMode] = useState('demo');

  const handleOpenDemoModal = (mode = 'demo') => {
    setDemoModalMode(mode);
    setDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative selection:bg-cyan-500 selection:text-black font-[Inter]">
      {/* Animated Canvas Particle Network Background */}
      <CyberBackground />

      {/* Main Layout */}
      <Navbar onOpenDemoModal={handleOpenDemoModal} />

      <main className="relative z-10">
        <Hero onOpenDemoModal={handleOpenDemoModal} />
        <StatsSection />
        <ServicesSection />
        <HowItWorksSection />
        <FeaturesSection />
        <LiveDashboardDemo />
      </main>

      <Footer onOpenDemoModal={handleOpenDemoModal} />

      {/* Interactive Modal */}
      <RequestDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialMode={demoModalMode}
      />
    </div>
  );
}

