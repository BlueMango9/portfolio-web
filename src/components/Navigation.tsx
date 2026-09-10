import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X, Clock, Compass, ShieldCheck, Camera } from 'lucide-react';
import { SoundController } from './SoundController';
import { formatTimeIST, formatTimeUTC } from '../lib/utils';

interface NavigationProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTerminal: () => void;
  onPlayClick?: () => void;
}

const NAV_TABS = [
  { id: 'hero', label: 'Home', number: '00' },
  { id: 'about', label: 'About', number: '01' },
  { id: 'systems', label: 'Systems', number: '02' },
  { id: 'ventures', label: 'Ventures', number: '03' },
  { id: 'photography', label: 'Visuals', number: '04' },
  { id: 'interests', label: 'Interests', number: '05' },
  { id: 'contact', label: 'Connect', number: '06' },
];

export const Navigation: React.FC<NavigationProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenTerminal,
  onPlayClick
}) => {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [istTime, setIstTime] = useState<string>(formatTimeIST());
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Live clocks for IST
  useEffect(() => {
    const timer = setInterval(() => {
      setIstTime(formatTimeIST());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Track active section and scroll offset
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_TABS.map(tab => document.getElementById(tab.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveTab(NAV_TABS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (onPlayClick) onPlayClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Floating Glass HUD Bar */}
      <header
        className={`fixed top-0 inset-x-0 z-40 px-3 sm:px-8 py-3 transition-all duration-500 ${
          scrolled ? 'py-2.5 backdrop-blur-md' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Mark & Live Time Scaffolding */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollToSection('hero')}
              data-cursor="button"
              data-cursor-text="HOME"
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-ds-deep/80 border border-ds-sky/40 flex items-center justify-center group-hover:border-ds-sky transition-colors shadow-glow-subtle">
                <span className="font-display font-black text-sm text-ds-sky tracking-tighter">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-wider text-ds-white group-hover:text-ds-sky transition-colors">
                  AKSHITH
                </span>
                <span className="text-[9px] font-mono text-ds-white/40 tracking-widest uppercase">
                  CSE // CLOUD
                </span>
              </div>
            </button>

            {/* Live IST Status Pill (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-ds-deep/40 border border-ds-ocean/20 text-xs font-mono text-ds-white/70">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>HYDERABAD IST</span>
              <span className="text-ds-sky font-semibold">{istTime}</span>
            </div>
          </div>

          {/* Desktop Frosted Glass Floating Nav Island */}
          <nav className="hidden md:flex items-center p-1 rounded-full bg-ds-deep/50 border border-ds-sky/20 backdrop-blur-2xl shadow-glass-card">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  data-cursor="button"
                  data-cursor-text={tab.label.toUpperCase()}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-ds-white font-bold'
                      : 'text-ds-white/60 hover:text-ds-white hover:bg-ds-sky/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-ds-ocean/70 border border-ds-sky/60 shadow-glow-sky -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="text-[9px] text-ds-sky/80 mr-1 opacity-80">{tab.number}</span>
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Sound + CLI Terminal + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <SoundController
              soundEnabled={soundEnabled}
              onToggle={onToggleSound}
              onPlayClick={onPlayClick}
            />

            {/* Terminal CLI Trigger Button */}
            <button
              onClick={() => {
                if (onPlayClick) onPlayClick();
                onOpenTerminal();
              }}
              data-cursor="button"
              data-cursor-text="TERMINAL"
              title="Open CLI Terminal (Ctrl/Cmd + K)"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ds-deep/40 border border-ds-ocean/30 hover:border-ds-sky/60 hover:bg-ds-deep/70 transition-all text-xs font-mono text-ds-sky group"
            >
              <Terminal className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] tracking-wider uppercase">CLI</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                if (onPlayClick) onPlayClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              data-cursor="button"
              data-cursor-text={mobileMenuOpen ? "CLOSE" : "MENU"}
              aria-label="Toggle navigation menu"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-ds-deep/60 border border-ds-sky/25 text-ds-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-ds-sky" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Glass Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pt-20 px-6 pb-8 bg-ds-abyss/95 backdrop-blur-3xl md:hidden flex flex-col justify-between"
          >
            <div className="flex flex-col gap-2 pt-4">
              <span className="font-mono text-xs text-ds-sky/70 tracking-widest uppercase mb-2">
                INDEX / DIRECTORY
              </span>

              {NAV_TABS.map((tab, idx) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => scrollToSection(tab.id)}
                    className={`flex items-center justify-between w-full p-3.5 rounded-xl text-left border min-h-[48px] ${
                      isActive
                        ? 'bg-ds-deep/80 border-ds-sky text-ds-white shadow-glow-subtle'
                        : 'bg-ds-deep/20 border-ds-ocean/20 text-ds-white/70 hover:bg-ds-deep/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-ds-sky">{tab.number}</span>
                      <span className="font-display text-base font-bold uppercase tracking-wider">
                        {tab.label}
                      </span>
                    </div>
                    {isActive && <div className="w-2 h-2 rounded-full bg-ds-sky shadow-glow-sky" />}
                  </motion.button>
                );
              })}

              {/* Mobile Terminal Launcher */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="mt-3 flex items-center justify-center gap-2 w-full p-3.5 rounded-xl bg-ds-ocean/30 border border-ds-sky/40 text-ds-sky font-mono text-xs uppercase font-bold"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch Interactive CLI Terminal</span>
              </button>
            </div>

            {/* Mobile Footer Status */}
            <div className="pt-4 border-t border-ds-ocean/20 flex flex-col gap-2 text-xs font-mono text-ds-white/50">
              <div className="flex items-center justify-between">
                <span>HYDERABAD IST</span>
                <span className="text-ds-sky font-semibold">{istTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>STATUS</span>
                <span className="text-emerald-400 font-semibold">ALL SYSTEMS NOMINAL</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
