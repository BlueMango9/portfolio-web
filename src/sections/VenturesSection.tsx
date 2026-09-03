import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { CoffeeScene } from '../scenes/CoffeeScene';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Coffee, Flame, Video, Play, TrendingUp, Sparkles, Radio, CheckCircle2, ArrowRight } from 'lucide-react';

interface VenturesSectionProps {
  onPlayClick?: () => void;
}

export const VenturesSection: React.FC<VenturesSectionProps> = ({ onPlayClick }) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'nexar' | 'quote'>('nexar');
  const [isPlayingClip, setIsPlayingClip] = useState<boolean>(false);

  const kapiData = PORTFOLIO_DATA.ventures.find(v => v.id === 'kapi-cartel')!;
  const mediaData = PORTFOLIO_DATA.ventures.find(v => v.id === 'content-channels')!;

  return (
    <section id="ventures" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-ds-abyss text-ds-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="03"
          title="Ventures &amp; Distribution"
          subtitle="Where software engineering meets product economics, editorial branding, and algorithmic distribution."
          badge="FOUNDER LAB // AUDIENCE ENGINE"
        />

        {/* ========================================================================= */}
        {/* VENTURE 1: KÁPI CARTEL (Dark Crimson & Black Editorial Aesthetics)        */}
        {/* ========================================================================= */}
        <div className="mb-24 rounded-3xl bg-gradient-to-br from-[#20070a]/80 via-[#0a0204]/60 to-[#00171F] border border-rose-900/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_12px_#D90429]" />
                <span className="font-mono text-xs font-bold text-rose-400 tracking-widest uppercase">
                  DIRECT-TO-CONSUMER COFFEE ARCHITECTURE
                </span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight uppercase">
                  {kapiData.name}
                </h3>
                <p className="mt-2 text-rose-200/80 font-mono text-xs sm:text-sm">
                  {kapiData.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-ds-white/80 font-light leading-relaxed">
                {kapiData.description}
              </p>

              {/* Pillars List */}
              <div className="space-y-2.5 pt-2">
                {kapiData.pillars.map((pillar, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-sans text-ds-white/90">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>

              {/* Origin Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-rose-900/30">
                {kapiData.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/30">
                    <span className="text-[10px] font-mono text-rose-300/60 block uppercase">{m.label}</span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 3D Interactive Coffee Bottle Showcase */}
            <div className="lg:col-span-5">
              <CoffeeScene />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VENTURE 2: CONTENT CHANNELS (Nexarclips & Quoteunquotetalks)              */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-ds-deep/20 border border-ds-sky/20 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Engine Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-ds-sky animate-pulse" />
                <span className="font-mono text-xs font-bold text-ds-sky tracking-widest uppercase">
                  ALGORITHMIC AUDIENCE ENGINE
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-ds-white tracking-tight uppercase">
                  {mediaData.name}
                </h3>
                <p className="mt-1 text-ds-sky font-mono text-xs sm:text-sm">
                  {mediaData.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-ds-white/80 font-light leading-relaxed">
                {mediaData.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {mediaData.pillars.map((p, i) => (
                  <div key={i} className="p-3 rounded-xl bg-ds-deep/40 border border-ds-sky/15 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ds-sky mt-1.5 shrink-0" />
                    <span className="text-xs text-ds-white/90 font-mono">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Clip Telemetry Player */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-ds-abyss/90 border border-ds-sky/30 p-5 space-y-4 shadow-xl">
                {/* Channel Selector */}
                <div className="flex items-center justify-between pb-3 border-b border-ds-sky/20">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (onPlayClick) onPlayClick();
                        setActiveMediaTab('nexar');
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                        activeMediaTab === 'nexar'
                          ? 'bg-ds-sky text-ds-abyss font-bold'
                          : 'bg-ds-deep/40 text-ds-white/60 hover:text-ds-white'
                      }`}
                    >
                      @Nexarclips
                    </button>
                    <button
                      onClick={() => {
                        if (onPlayClick) onPlayClick();
                        setActiveMediaTab('quote');
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                        activeMediaTab === 'quote'
                          ? 'bg-ds-sky text-ds-abyss font-bold'
                          : 'bg-ds-deep/40 text-ds-white/60 hover:text-ds-white'
                      }`}
                    >
                      @Quoteunquotetalks
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">FEED SYNCED</span>
                </div>

                {/* Simulated Clip Preview Screen */}
                <div className="relative h-44 rounded-xl bg-gradient-to-t from-ds-abyss to-ds-deep/70 border border-ds-sky/20 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 font-mono text-[9px] text-ds-sky">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    <span>REC // 4K 60FPS</span>
                  </div>

                  <button
                    onClick={() => {
                      if (onPlayClick) onPlayClick();
                      setIsPlayingClip(!isPlayingClip);
                    }}
                    data-cursor="button"
                    data-cursor-text={isPlayingClip ? "PAUSE" : "PLAY"}
                    className="w-12 h-12 rounded-full bg-ds-sky/20 border border-ds-sky text-ds-sky flex items-center justify-center hover:scale-105 transition-transform shadow-glow-sky"
                  >
                    <Play className={`w-5 h-5 ml-0.5 ${isPlayingClip ? 'fill-ds-sky' : ''}`} />
                  </button>

                  <div className="mt-3 font-display font-bold text-sm text-ds-white">
                    {activeMediaTab === 'nexar'
                      ? 'The Discipline of Radical Systems Thinking'
                      : 'Why Execution Eats Strategy for Breakfast'}
                  </div>
                  <span className="font-mono text-[10px] text-ds-white/50 mt-1">
                    Kinetic Captions • Dynamic Audio Normalization • High Retention Cut
                  </span>
                </div>

                {/* Retention Metric Bar */}
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-ds-white/60 text-[11px]">
                    <span>RETENTION EFFICIENCY</span>
                    <span className="text-ds-sky font-bold">88.4% AVERAGE</span>
                  </div>
                  <div className="w-full h-1.5 bg-ds-deep rounded-full overflow-hidden">
                    <div className="w-[88%] h-full bg-gradient-to-r from-ds-ocean to-ds-sky shadow-glow-sky" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
