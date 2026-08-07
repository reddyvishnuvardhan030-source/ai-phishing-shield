import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Activity,
  Menu,
  X,
  ChevronRight,
  History,
  Code2,
  User,
  Key
} from 'lucide-react';

export default function Navbar({ onOpenDemoModal, historyCount = 0, onOpenHistoryModal, currentUser }) {
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
              12-SERVICE CYBER DEFENSE
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#ai-agent" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-cyan-300 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI Agent
          </a>
          <a href="#services" className="hover:text-cyan-400 transition-colors">
            Services
          </a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
            How It Works
          </a>
          <a href="#live-scanner" className="hover:text-cyan-400 transition-colors">
            Scanner
          </a>
          <a href="#dashboard" className="hover:text-cyan-400 transition-colors">
            Dashboard
          </a>
          <a href="#api-developer" className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-cyan-300 font-mono text-xs">
            <Code2 className="w-3.5 h-3.5" />
            <span>API Docs</span>
          </a>
        </nav>

        {/* Action Controls & User Auth */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenHistoryModal}
            className="btn-secondary-cyber text-xs py-2 px-3 flex items-center gap-1.5 relative"
            title="Open Scan History Log"
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="bg-cyan-500 text-black font-bold font-mono text-[10px] px-1.5 py-0.2 rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          {currentUser ? (
            <button
              onClick={() => onOpenDemoModal('profile')}
              className="badge-neon py-1.5 px-3 flex items-center gap-2 cursor-pointer hover:border-cyan-400"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-mono text-slate-200">{currentUser.full_name || currentUser.email}</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenDemoModal('login')}
              className="btn-secondary-cyber text-xs py-2.5 px-3.5"
            >
              Log In
            </button>
          )}

          <button
            onClick={() => onOpenDemoModal('signup')}
            className="btn-primary-neon text-xs py-2.5 px-4"
          >
            Get Started
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onOpenHistoryModal}
            className="p-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-400 relative"
          >
            <History className="w-5 h-5" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[9px] font-bold px-1 rounded-full">
                {historyCount}
              </span>
            )}
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
          <a href="#ai-agent" onClick={() => setMobileMenuOpen(false)} className="block text-cyan-300 font-bold hover:text-cyan-400 text-lg">
            🤖 AI Security Agent
          </a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-cyan-400 font-medium text-lg">
            Services Hub
          </a>
          <a href="#live-scanner" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-cyan-400 font-medium text-lg">
            Threat Scanner
          </a>
          <a href="#dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-cyan-400 font-medium text-lg">
            Security Dashboard
          </a>
          <a href="#api-developer" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-cyan-400 font-medium text-lg">
            Developer REST API
          </a>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHistoryModal();
              }}
              className="btn-secondary-cyber w-full justify-center text-xs py-2.5"
            >
              <History className="w-4 h-4 text-cyan-400" />
              View Scan History Logs ({historyCount})
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal('login');
              }}
              className="btn-primary-neon w-full justify-center text-xs py-2.5"
            >
              Account Login / Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
