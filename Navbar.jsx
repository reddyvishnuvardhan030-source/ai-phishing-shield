import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Menu, X, ChevronRight, Lock, Zap } from 'lucide-react';

export default function Navbar({ onOpenDemoModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/90 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-lg shadow-cyan-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/50 group-hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <ShieldCheck className="w-6 h-6 text-cyan-400 animate-shield" />
            <div className="absolute inset-0 rounded-xl bg-cyan-400/10 blur-sm group-hover:bg-cyan-400/20 transition-all" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-[Space_Grotesk]">
                AI PHISHING <span className="text-cyan-400">SHIELD</span>
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase font-semibold">
              NEXT-GEN CYBER DEFENSE
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#services" className="hover:text-cyan-400 transition-colors">
            Services
          </a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-cyan-400 transition-colors">
            Features
          </a>
          <a href="#live-scanner" className="hover:text-cyan-400 transition-colors">
            Live Scanner
          </a>
          <a href="#dashboard" className="hover:text-cyan-400 transition-colors">
            Live Intelligence
          </a>
        </nav>

        {/* Live Status & CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="badge-neon py-1.5 px-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs">AI ENGINE ONLINE</span>
          </div>

          <button
            onClick={() => onOpenDemoModal('demo')}
            className="btn-secondary-cyber text-xs py-2.5 px-4"
          >
            Request Demo
          </button>

          <button
            onClick={() => onOpenDemoModal('get-started')}
            className="btn-primary-neon text-xs py-2.5 px-5"
          >
            Get Started
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => onOpenDemoModal('get-started')}
            className="btn-primary-neon text-xs py-2 px-3"
          >
            Get Started
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-slate-300 hover:text-cyan-400"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070d1e]/95 border-b border-cyan-500/30 px-6 py-6 space-y-4 fade-in">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 font-medium text-lg"
          >
            Services
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 font-medium text-lg"
          >
            How It Works
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 font-medium text-lg"
          >
            Features
          </a>
          <a
            href="#live-scanner"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 font-medium text-lg"
          >
            Live Scanner
          </a>
          <a
            href="#dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 font-medium text-lg"
          >
            Live Intelligence
          </a>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal('demo');
              }}
              className="btn-secondary-cyber w-full justify-center"
            >
              Request Demo
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal('get-started');
              }}
              className="btn-primary-neon w-full justify-center"
            >
              Get Started Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
