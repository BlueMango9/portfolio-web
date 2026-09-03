import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { GlassCard } from '../components/GlassCard';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ShieldCheck, Cpu, Compass, Activity, Server, MapPin, GraduationCap, Clock } from 'lucide-react';

interface AboutSectionProps {
  onPlayClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onPlayClick }) => {
  return (
    <section id="about" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-ds-abyss text-ds-white">
      <div className="max-w-7xl mx-auto">
        {/* Constructivist Section Header */}
        <SectionHeader
          number="01"
          title="The Machine & The Architect"
          subtitle="Building the way I think — in distributed logic, precision hardware, and venture systems."
          badge="BIOGRAPHY // CORE PHILOSOPHY"
        />

        {/* Top 2-Column Grid: Narrative Bio & Live System Status HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Narrative Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl bg-ds-deep/20 border border-ds-sky/20 backdrop-blur-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-ds-ocean/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-6 font-mono text-xs text-ds-sky tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-ds-sky" />
                <span>NARRATIVE MANIFESTO</span>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-ds-white/90 leading-relaxed font-light">
                <p>
                  {PORTFOLIO_DATA.profile.bio[0]}
                </p>
                <p className="text-ds-white/80">
                  {PORTFOLIO_DATA.profile.bio[1]}
                </p>
              </div>

              {/* Quote Highlight Box */}
              <div className="mt-8 p-4 rounded-xl bg-ds-deep/40 border-l-2 border-ds-sky font-mono text-xs sm:text-sm text-ds-sky/90 italic">
                &ldquo;I&apos;d rather spend twice as long getting something right than ship something forgettable.&rdquo;
              </div>
            </motion.div>
          </div>

          {/* Right Column: Live Status HUD & Specifications Widget */}
          <div className="lg:col-span-5 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-6 rounded-3xl bg-ds-deep/30 border border-ds-sky/20 backdrop-blur-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-ds-sky/15 pb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-ds-white/80 uppercase">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>OPERATIONAL TELEMETRY</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-3.5 text-xs font-mono">
                <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-ds-deep/40 border border-ds-sky/10">
                  <div className="flex items-center gap-2 text-ds-white/60">
                    <GraduationCap className="w-4 h-4 text-ds-sky" />
                    <span>INSTITUTION</span>
                  </div>
                  <div className="text-right text-ds-white font-semibold">
                    SRM Institute of Science &amp; Tech
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-ds-deep/40 border border-ds-sky/10">
                  <div className="flex items-center gap-2 text-ds-white/60">
                    <Server className="w-4 h-4 text-ds-sky" />
                    <span>SPECIALIZATION</span>
                  </div>
                  <div className="text-right text-ds-sky font-semibold">
                    CSE (Cloud Computing)
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-ds-deep/40 border border-ds-sky/10">
                  <div className="flex items-center gap-2 text-ds-white/60">
                    <MapPin className="w-4 h-4 text-ds-sky" />
                    <span>BASE OF OPERATIONS</span>
                  </div>
                  <div className="text-right text-ds-white font-semibold">
                    Hyderabad, India
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-ds-deep/40 border border-ds-sky/10">
                  <div className="flex items-center gap-2 text-ds-white/60">
                    <Cpu className="w-4 h-4 text-ds-sky" />
                    <span>CURRENT FOCUS</span>
                  </div>
                  <div className="text-right text-emerald-400 font-semibold max-w-[200px]">
                    C++ Cloud Engines &amp; ARIA v2
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3 Pillars of Engineering Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.philosophy.map((pillar, idx) => (
            <GlassCard
              key={pillar.number}
              cursorLabel="PILLAR"
              onClick={onPlayClick}
              className="p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-3xl font-black text-ds-sky/40">
                    {pillar.number}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-ds-sky shadow-glow-sky" />
                </div>
                <h3 className="font-display text-xl font-bold text-ds-white mb-1">
                  {pillar.title}
                </h3>
                <h4 className="font-mono text-xs text-ds-sky uppercase tracking-wider mb-4">
                  {pillar.subtitle}
                </h4>
                <p className="text-sm text-ds-white/70 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ds-sky/10 flex items-center justify-between font-mono text-[10px] text-ds-white/40 uppercase">
                <span>DISCIPLINE</span>
                <span className="text-ds-sky">ACTIVE // VERIFIED</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
