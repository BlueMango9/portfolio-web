import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { GlassCard } from '../components/GlassCard';
import { WatchScene } from '../scenes/WatchScene';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  Watch,
  Gauge,
  TrendingUp,
  Activity,
  BookOpen,
  Sparkles,
  Zap,
  Dumbbell,
  Compass,
  Trophy,
  Headphones,
  Sliders,
  Volume2,
  Waves,
  Disc,
  CheckCircle2
} from 'lucide-react';

interface InterestsSectionProps {
  onPlayClick?: () => void;
  onEngineRev?: () => void;
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({
  onPlayClick,
  onEngineRev
}) => {
  // F1 / BMW Telemetry Rev State
  const [rpm, setRpm] = useState<number>(3200);
  const [gear, setGear] = useState<number>(3);
  const [isReving, setIsReving] = useState<boolean>(false);

  // Audiophile / IEM Frequency Curve State
  const [activeCurveTarget, setActiveCurveTarget] = useState<'harman' | 'simgot' | 'flat'>('simgot');
  const [activeFrequencyBand, setActiveFrequencyBand] = useState<'sub' | 'mids' | 'air'>('mids');

  const triggerRev = () => {
    if (onPlayClick) onPlayClick();
    if (onEngineRev) onEngineRev();
    setIsReving(true);
    setRpm(8400);
    setGear(prev => (prev < 7 ? prev + 1 : 3));
    setTimeout(() => {
      setRpm(3800);
      setIsReving(false);
    }, 600);
  };

  return (
    <section id="interests" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-ds-abyss text-ds-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="05"
          title="Interests &amp; Disciplines"
          subtitle="Obsessions in mechanical precision, audiophile acoustic physics, powertrain telemetry, and physical mastery."
          badge="THE MULTIDISCIPLINARY CORE"
        />

        {/* ========================================================================= */}
        {/* DOMAIN 1: HOROLOGY & WATCH MODDING (3D Interactive Movement)             */}
        {/* ========================================================================= */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <Watch className="w-4 h-4 text-ds-sky animate-spin-slow" />
              <span className="font-mono text-xs font-bold text-ds-sky tracking-widest uppercase">
                MECHANICAL HOROLOGY &amp; MODIFICATION
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-ds-white">
              Tissot PRX &amp; Roger Dubuis Skeleton Regulation
            </h3>

            <p className="text-sm sm:text-base text-ds-white/80 font-light leading-relaxed">
              A deep fascination with micro-mechanical precision that runs parallel to software architecture. Analyzing balance wheel harmonics, pallet fork engagement, sapphire casebacks, and custom modifications where a 0.1s deviation per day defines perfection.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-ds-deep/40 border border-ds-sky/15">
                <span className="text-[10px] font-mono text-ds-white/40 block uppercase">OSCILLATION FREQUENCY</span>
                <span className="text-sm font-bold font-mono text-ds-sky">28,800 VPH (4Hz)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-ds-deep/40 border border-ds-sky/15">
                <span className="text-[10px] font-mono text-ds-white/40 block uppercase">REGULATION ACCURACY</span>
                <span className="text-sm font-bold font-mono text-emerald-400">&plusmn;0.1s / Day</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <WatchScene />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DOMAIN 2: AUDIOPHILE & IEM ACOUSTIC ENGINEERING (Simgot EW200 Spotlight)  */}
        {/* ========================================================================= */}
        <div className="mb-20 rounded-3xl bg-gradient-to-br from-ds-deep/50 via-[#07131e] to-ds-abyss border border-cyan-500/20 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left IEM Architecture Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-cyan-400 tracking-widest uppercase">
                  ACOUSTIC ENGINEERING &amp; IN-EAR MONITORS (IEMS)
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-ds-white uppercase tracking-tight">
                  Simgot EW200 &amp; Acoustic Tuning
                </h3>
                <p className="mt-1 font-mono text-xs sm:text-sm text-cyan-300/80">
                  Daily Driver: Simgot EW200 ("Maze") • 10mm Dual-Cavity SCP Diaphragm
                </p>
              </div>

              <p className="text-sm sm:text-base text-ds-white/80 font-light leading-relaxed">
                Obsessed with high-fidelity acoustic reproduction and IEM transducer physics. Analyzing how dual-magnetic circuit dynamic drivers, acoustic damping meshes, and chamber resonance sculpt the frequency response curve to achieve surgical imaging and planar-like transient speed.
              </p>

              {/* Hardware Spec Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-ds-deep/60 border border-cyan-500/20">
                  <span className="text-[10px] font-mono text-cyan-300/60 block uppercase">TRANSDUCER</span>
                  <span className="text-xs font-mono font-bold text-ds-white">10mm SCP Diaphragm</span>
                </div>
                <div className="p-3 rounded-xl bg-ds-deep/60 border border-cyan-500/20">
                  <span className="text-[10px] font-mono text-cyan-300/60 block uppercase">CHASSIS HOUSING</span>
                  <span className="text-xs font-mono font-bold text-cyan-300">Mirror Zinc Alloy</span>
                </div>
                <div className="p-3 rounded-xl bg-ds-deep/60 border border-cyan-500/20 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono text-cyan-300/60 block uppercase">TUNING TARGET</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">Harman 2016 Target</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-ds-white/70">
                <span className="px-2.5 py-1 rounded-md bg-ds-abyss border border-cyan-500/20">24-Bit / 192kHz Lossless</span>
                <span className="px-2.5 py-1 rounded-md bg-ds-abyss border border-cyan-500/20">Low-THD Decoding</span>
                <span className="px-2.5 py-1 rounded-md bg-ds-abyss border border-cyan-500/20">Silver-Plated OFC</span>
              </div>
            </div>

            {/* Right Interactive Frequency Response Curve Telemetry */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-ds-abyss/95 border border-cyan-500/30 p-6 space-y-5 shadow-2xl">
                {/* Curve Profile Selector Header */}
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono text-ds-white/80 font-bold">FREQUENCY RESPONSE TELEMETRY</span>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        if (onPlayClick) onPlayClick();
                        setActiveCurveTarget('simgot');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                        activeCurveTarget === 'simgot'
                          ? 'bg-cyan-500 text-ds-abyss font-bold shadow-glow-sky'
                          : 'bg-ds-deep/40 text-ds-white/60 hover:text-ds-white'
                      }`}
                    >
                      Simgot Target
                    </button>
                    <button
                      onClick={() => {
                        if (onPlayClick) onPlayClick();
                        setActiveCurveTarget('harman');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                        activeCurveTarget === 'harman'
                          ? 'bg-cyan-500 text-ds-abyss font-bold shadow-glow-sky'
                          : 'bg-ds-deep/40 text-ds-white/60 hover:text-ds-white'
                      }`}
                    >
                      Harman 2016
                    </button>
                  </div>
                </div>

                {/* Simulated SVG Frequency Response Curve Visualizer */}
                <div className="relative h-44 rounded-xl bg-ds-deep/30 border border-cyan-500/20 p-3 flex flex-col justify-between overflow-hidden">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 opacity-15 pointer-events-none">
                    <div className="border-r border-b border-cyan-300" />
                    <div className="border-r border-b border-cyan-300" />
                    <div className="border-r border-b border-cyan-300" />
                    <div className="border-b border-cyan-300" />
                  </div>

                  {/* SVG Waveform Curve */}
                  <svg className="w-full h-28 overflow-visible" viewBox="0 0 400 100">
                    <defs>
                      <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#00A8E8" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>

                    {/* Target Reference Line (Dashed) */}
                    <path
                      d="M 10,40 Q 60,35 120,55 T 240,30 T 320,60 T 390,75"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="opacity-60"
                    />

                    {/* Dynamic Simgot EW200 Measured Curve */}
                    <motion.path
                      d={
                        activeCurveTarget === 'simgot'
                          ? "M 10,32 Q 70,28 130,52 T 240,24 T 320,50 T 390,70"
                          : activeCurveTarget === 'harman'
                          ? "M 10,25 Q 70,30 130,55 T 240,20 T 320,55 T 390,80"
                          : "M 10,50 L 390,50"
                      }
                      fill="none"
                      stroke="url(#curveGradient)"
                      strokeWidth="3"
                      className="drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                  </svg>

                  {/* Frequency Axis Labels */}
                  <div className="flex justify-between text-[9px] font-mono text-ds-white/40 pt-1 border-t border-cyan-500/15">
                    <span>20 Hz (Sub-Bass)</span>
                    <span>250 Hz</span>
                    <span className="text-cyan-300 font-bold">3 kHz (Pinna Gain)</span>
                    <span>8 kHz</span>
                    <span className="text-emerald-400">20 kHz (Air)</span>
                  </div>
                </div>

                {/* Acoustic Telemetry Metrics */}
                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-ds-deep/40 border border-cyan-500/15">
                    <span className="text-[9px] text-ds-white/40 block">SUB-BASS TIGHTNESS</span>
                    <span className="text-cyan-300 font-bold">+6.5 dB @ 35Hz</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-ds-deep/40 border border-cyan-500/15">
                    <span className="text-[9px] text-ds-white/40 block">PINNA VOCAL CLARITY</span>
                    <span className="text-ds-white font-bold">10.2 dB Peak</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-ds-deep/40 border border-cyan-500/15">
                    <span className="text-[9px] text-ds-white/40 block">TREBLE EXTENSION</span>
                    <span className="text-emerald-400 font-bold">Smooth &gt;16kHz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DOMAIN 3: F1 & BMW M TELEMETRY LAB                                        */}
        {/* ========================================================================= */}
        <div className="mb-20 rounded-3xl bg-ds-deep/20 border border-ds-sky/20 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-ds-sky" />
                <span className="font-mono text-xs font-bold text-ds-sky tracking-widest uppercase">
                  MOTORSPORT &amp; POWERTRAIN TELEMETRY
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-ds-white">
                F1 Aero Dynamics &amp; BMW M3 Powertrain
              </h3>

              <p className="text-sm text-ds-white/80 font-light leading-relaxed">
                Obsession with Formula 1 telemetry traces (throttle application delta, apex velocity, tire thermal degradation) and BMW S58 twin-turbocharged linear power delivery. Engineering where every millisecond is quantified.
              </p>

              <button
                onClick={triggerRev}
                data-cursor="button"
                data-cursor-text="REV ENGINE"
                className="px-6 py-3 rounded-full bg-ds-ocean/50 border border-ds-sky text-ds-white font-mono text-xs uppercase tracking-widest hover:bg-ds-sky hover:text-ds-abyss transition-all flex items-center gap-2 shadow-glow-subtle group"
              >
                <Zap className="w-4 h-4 text-ds-sky group-hover:text-ds-abyss" />
                <span>Simulate Throttle Rev (S58 Engine)</span>
              </button>
            </div>

            {/* Interactive Telemetry Dashboard Gauge */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-ds-abyss/90 border border-ds-sky/30 p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-ds-sky/15 pb-3">
                  <span className="text-xs font-mono text-ds-white/60">S58 TWIN-TURBO TELEMETRY</span>
                  <span className="text-xs font-mono text-emerald-400">STATUS: HOT LAP</span>
                </div>

                {/* Tachometer RPM Display */}
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-ds-white/40 block">ENGINE SPEED</span>
                    <span className={`text-4xl sm:text-5xl font-mono font-black transition-colors ${
                      rpm > 7000 ? 'text-rose-500' : 'text-ds-sky'
                    }`}>
                      {rpm}
                    </span>
                    <span className="text-xs font-mono text-ds-white/60 ml-2">RPM</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-ds-white/40 block">GEAR</span>
                    <span className="text-4xl font-mono font-black text-ds-white">
                      M{gear}
                    </span>
                  </div>
                </div>

                {/* Tachometer Bar */}
                <div className="space-y-1">
                  <div className="w-full h-3 bg-ds-deep rounded-full overflow-hidden flex gap-1 p-0.5">
                    {Array.from({ length: 20 }).map((_, i) => {
                      const threshold = (i + 1) * 450;
                      const isActive = rpm >= threshold;
                      const isRedline = i >= 16;
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm transition-all duration-150 ${
                            isActive
                              ? isRedline
                                ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
                                : 'bg-ds-sky shadow-glow-sky'
                              : 'bg-ds-deep/40'
                          }`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-ds-white/40 pt-1">
                    <span>0 RPM</span>
                    <span>4,500</span>
                    <span className="text-rose-400">9,000 REDLINE</span>
                  </div>
                </div>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-3 gap-2 font-mono text-xs pt-2">
                  <div className="p-2.5 rounded bg-ds-deep/40 border border-ds-sky/10">
                    <span className="text-[9px] text-ds-white/40 block">LATERAL G</span>
                    <span className="text-ds-white font-bold">{isReving ? '4.8 G' : '1.4 G'}</span>
                  </div>
                  <div className="p-2.5 rounded bg-ds-deep/40 border border-ds-sky/10">
                    <span className="text-[9px] text-ds-white/40 block">BOOST</span>
                    <span className="text-ds-white font-bold">{isReving ? '2.1 BAR' : '0.4 BAR'}</span>
                  </div>
                  <div className="p-2.5 rounded bg-ds-deep/40 border border-ds-sky/10">
                    <span className="text-[9px] text-ds-white/40 block">CHASSIS</span>
                    <span className="text-ds-sky font-bold">CARBON AERO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DOMAINS 4, 5, 6: FINANCE, ATHLETICS, & THE POLYMATH GRID                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quantitative Finance */}
          <GlassCard cursorLabel="FINANCE" onClick={onPlayClick} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest">
                  QUANT FINANCE
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-ds-white mb-2">
                Index Compounding &amp; Tech Moats
              </h4>
              <p className="text-xs text-ds-white/70 font-light leading-relaxed mb-4">
                Disciplined capital allocation across long-term index funds, semiconductor value chains, and cloud infrastructure equities.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-ds-deep/40 border border-ds-sky/15 font-mono text-xs flex justify-between">
              <span className="text-ds-white/50">HORIZON:</span>
              <span className="text-emerald-400 font-bold">10+ YEARS COMPOUND</span>
            </div>
          </GlassCard>

          {/* Athletics & Human Performance */}
          <GlassCard cursorLabel="ATHLETICS" onClick={onPlayClick} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-amber-400">
                <Trophy className="w-5 h-5" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest">
                  PHYSICAL DISCIPLINE
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-ds-white mb-2">
                Calisthenics, Basketball &amp; MMA
              </h4>
              <p className="text-xs text-ds-white/70 font-light leading-relaxed mb-4">
                A structured physical regimen: bodyweight calisthenics control, competitive basketball tournament experience, cricket, and active MMA combat training.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-ds-deep/40 border border-ds-sky/15 font-mono text-xs flex justify-between">
              <span className="text-ds-white/50">REGIMEN:</span>
              <span className="text-amber-400 font-bold">6 DAYS / WEEK</span>
            </div>
          </GlassCard>

          {/* Beyond the Stack / Polymath Matrix */}
          <GlassCard cursorLabel="POLYMATH" onClick={onPlayClick} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-ds-sky">
                <BookOpen className="w-5 h-5" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest">
                  BEYOND THE STACK
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-ds-white mb-2">
                Psychology, 48 Laws &amp; 3D Craft
              </h4>
              <p className="text-xs text-ds-white/70 font-light leading-relaxed mb-4">
                Studying strategic influence frameworks (48 Laws of Power), cognitive psychology, video cinematography, and 3D design as creative income engines.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-ds-deep/40 border border-ds-sky/15 font-mono text-xs flex justify-between">
              <span className="text-ds-white/50">MINDSET:</span>
              <span className="text-ds-sky font-bold">MULTIDISCIPLINARY</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
