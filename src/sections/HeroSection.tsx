import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Terminal, Sparkles, Cpu, Coffee, Watch } from 'lucide-react';
import { HeroScene } from '../scenes/HeroScene';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroSectionProps {
  onExplore: (sectionId: string) => void;
  onOpenTerminal: () => void;
  onPlayClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onOpenTerminal,
  onPlayClick
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const height = containerRef.current.offsetHeight - window.innerHeight;
      if (height > 0) {
        const progress = Math.min(Math.max(-rect.top / height, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nameLetters = "AKSHITH".split("");

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[220vh] bg-ds-abyss text-ds-white"
    >
      {/* Sticky 100vh Viewport Container for Scroll-Scrubbed Movie Experience */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between p-6 sm:p-12 overflow-hidden">
        {/* 3D WebGL Canvas Layer */}
        <HeroScene scrollProgress={scrollProgress} />

        {/* Ambient Top HUD Meta Scaffolding */}
        <div className="w-full flex items-center justify-between pt-16 sm:pt-14 z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 text-[11px] font-mono text-ds-white/60"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ds-sky shadow-glow-sky animate-ping" />
            <span className="text-ds-sky font-semibold">INITIALIZING KERNEL</span>
            <span className="text-ds-white/30 hidden sm:inline">// HYDERABAD, IN</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => {
              if (onPlayClick) onPlayClick();
              onExplore('about');
            }}
            data-cursor="button"
            data-cursor-text="SKIP"
            className="text-[11px] font-mono text-ds-white/50 hover:text-ds-sky transition-colors flex items-center gap-1 uppercase tracking-widest px-3 py-1 rounded-full bg-ds-deep/30 border border-ds-sky/20"
          >
            <span>Skip Intro</span>
            <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>

        {/* Hero Center Typography Beat 1 (0 to 0.4 progress) */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center my-auto">
          {/* Subtitle Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ds-deep/60 border border-ds-sky/30 backdrop-blur-xl mb-6 shadow-glow-subtle"
          >
            <Sparkles className="w-3.5 h-3.5 text-ds-sky" />
            <span className="text-xs font-mono font-medium tracking-widest text-ds-sky uppercase">
              CSE — CLOUD COMPUTING @ SRM IST
            </span>
          </motion.div>

          {/* Kinetic Oversized Name Typography Letter-by-Letter Reveal */}
          <div className="flex items-center justify-center gap-1 sm:gap-3 overflow-hidden py-2 select-none">
            {nameLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 120, opacity: 0, rotateX: 60 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.4 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-ds-white tracking-tight sm:tracking-normal drop-shadow-2xl hover:text-ds-sky transition-colors duration-200"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subline Headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-4 sm:mt-6 text-lg sm:text-2xl md:text-3xl text-ds-white/80 font-display font-light max-w-3xl leading-snug tracking-wide"
          >
            Building systems. Shipping ventures. <span className="text-ds-sky font-normal">Studying the machine.</span>
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => {
                if (onPlayClick) onPlayClick();
                onExplore('systems');
              }}
              data-cursor="explore"
              data-cursor-text="EXPLORE"
              className="px-6 py-3 rounded-full bg-ds-sky text-ds-abyss font-mono font-bold text-xs uppercase tracking-widest hover:bg-ds-white transition-all shadow-glow-sky flex items-center gap-2 group"
            >
              <span>Explore Systems</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                if (onPlayClick) onPlayClick();
                onOpenTerminal();
              }}
              data-cursor="button"
              data-cursor-text="TERMINAL"
              className="px-6 py-3 rounded-full bg-ds-deep/60 border border-ds-sky/40 text-ds-sky font-mono font-bold text-xs uppercase tracking-widest hover:bg-ds-deep/90 hover:border-ds-sky transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Terminal CLI</span>
            </button>
          </motion.div>
        </div>

        {/* Scroll Scrub Mini Glyphs Visualizer Beat 2 (0.4 to 0.9 progress) */}
        <motion.div
          style={{ opacity: scrollProgress > 0.15 ? 1 : 0 }}
          className="absolute inset-x-6 top-1/2 -translate-y-1/2 max-w-4xl mx-auto flex items-center justify-between pointer-events-none transition-opacity duration-300"
        >
          {/* Systems Glyph */}
          <div
            className={`p-4 rounded-2xl bg-ds-deep/60 border border-ds-sky/30 backdrop-blur-xl transition-all duration-500 ${
              scrollProgress > 0.3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Cpu className="w-6 h-6 text-ds-sky" />
            <span className="block mt-2 font-mono text-[10px] text-ds-white/70 uppercase">01 SYSTEMS</span>
          </div>

          {/* Ventures Glyph */}
          <div
            className={`p-4 rounded-2xl bg-ds-deep/60 border border-rose-500/30 backdrop-blur-xl transition-all duration-500 ${
              scrollProgress > 0.5 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Coffee className="w-6 h-6 text-rose-400" />
            <span className="block mt-2 font-mono text-[10px] text-ds-white/70 uppercase">02 VENTURES</span>
          </div>

          {/* Interests Glyph */}
          <div
            className={`p-4 rounded-2xl bg-ds-deep/60 border border-emerald-500/30 backdrop-blur-xl transition-all duration-500 ${
              scrollProgress > 0.7 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Watch className="w-6 h-6 text-emerald-400" />
            <span className="block mt-2 font-mono text-[10px] text-ds-white/70 uppercase">03 INTERESTS</span>
          </div>
        </motion.div>

        {/* Bottom Scroll Cue & Progress Bar */}
        <div className="w-full flex items-center justify-between z-10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-24 sm:w-36 h-[2px] bg-ds-deep rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-ds-sky shadow-glow-sky"
                style={{ width: `${Math.max(scrollProgress * 100, 8)}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-ds-white/40 uppercase">
              {Math.round(scrollProgress * 100)}% DIVE
            </span>
          </div>

          <button
            onClick={() => {
              if (onPlayClick) onPlayClick();
              onExplore('about');
            }}
            data-cursor="button"
            data-cursor-text="SCROLL"
            className="flex items-center gap-1.5 font-mono text-[11px] text-ds-sky hover:text-ds-white transition-colors"
          >
            <span className="uppercase tracking-wider">Scroll to traverse</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
