import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { GlassCard } from '../components/GlassCard';
import { PORTFOLIO_DATA, SystemProject } from '../data/portfolioData';
import { ARIA_MODE_PRESETS, AriaMode, getAriaResponse, AriaMessage } from '../data/ariaSimulator';
import {
  Terminal,
  Cpu,
  Bot,
  Cloud,
  Layers,
  Wrench,
  Sparkles,
  Play,
  Send,
  Code2,
  ExternalLink,
  ChevronRight,
  Database,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

interface SystemsSectionProps {
  onSelectProject: (project: SystemProject) => void;
  onPlayClick?: () => void;
}

export const SystemsSection: React.FC<SystemsSectionProps> = ({
  onSelectProject,
  onPlayClick
}) => {
  // ARIA Simulator State
  const [ariaMode, setAriaMode] = useState<AriaMode>('CHAT');
  const [ariaInput, setAriaInput] = useState<string>('');
  const [ariaMessages, setAriaMessages] = useState<AriaMessage[]>([
    {
      id: 'msg-init',
      sender: 'aria',
      mode: 'CHAT',
      text: ARIA_MODE_PRESETS.CHAT.initialPrompt,
      timestamp: '12:00:00'
    }
  ]);
  const [isAriaThinking, setIsAriaThinking] = useState<boolean>(false);

  const handleAriaModeChange = (mode: AriaMode) => {
    if (onPlayClick) onPlayClick();
    setAriaMode(mode);
    setAriaMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'system',
        mode: mode,
        text: `Switched operational mode to [${mode}] — ${ARIA_MODE_PRESETS[mode].description}`,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const handleAriaSubmit = (queryText?: string) => {
    const text = queryText || ariaInput;
    if (!text.trim()) return;

    if (onPlayClick) onPlayClick();

    const userMsg: AriaMessage = {
      id: Math.random().toString(),
      sender: 'user',
      mode: ariaMode,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    setAriaMessages(prev => [...prev, userMsg]);
    setAriaInput('');
    setIsAriaThinking(true);

    setTimeout(() => {
      const responseData = getAriaResponse(ariaMode, text);
      const ariaMsg: AriaMessage = {
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString(),
        ...responseData
      };
      setAriaMessages(prev => [...prev, ariaMsg]);
      setIsAriaThinking(false);
    }, 450);
  };

  return (
    <section id="systems" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-ds-abyss text-ds-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="02"
          title="Systems &amp; Architecture"
          subtitle="Engineered for high-throughput concurrency, agentic intelligence, and deterministic hardware."
          badge="CSE ENGINEERING LAB"
        />

        {/* ========================================================================= */}
        {/* SIGNATURE 1: ARIA PERSONAL AI HUD SIMULATOR                               */}
        {/* ========================================================================= */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-ds-sky shadow-glow-sky animate-pulse" />
              <h3 className="font-display text-xl sm:text-2xl font-bold text-ds-white">
                ARIA — Personal AI Operating System (Interactive HUD)
              </h3>
            </div>
            <span className="font-mono text-xs text-ds-sky/80 border border-ds-sky/30 px-2.5 py-1 rounded-full bg-ds-deep/40 hidden sm:inline">
              LIVE SIMULATOR
            </span>
          </div>

          <div className="rounded-3xl bg-ds-deep/25 border border-ds-sky/30 shadow-2xl backdrop-blur-2xl overflow-hidden scanlines">
            {/* HUD Top Bar */}
            <div className="p-4 sm:p-5 bg-ds-deep/70 border-b border-ds-sky/20 flex flex-wrap items-center justify-between gap-4">
              {/* Mode Selector Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['CHAT', 'RESEARCH', 'CODE', 'EMAIL', 'TASKS'] as AriaMode[]).map((mode) => {
                  const isActive = ariaMode === mode;
                  return (
                    <button
                      key={mode}
                      onClick={() => handleAriaModeChange(mode)}
                      data-cursor="button"
                      data-cursor-text={mode}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                        isActive
                          ? 'bg-ds-sky text-ds-abyss font-bold shadow-glow-sky'
                          : 'bg-ds-abyss/60 text-ds-white/60 hover:text-ds-white hover:bg-ds-deep'
                      }`}
                    >
                      {mode}
                    </button>
                  );
                })}
              </div>

              {/* Waveform Telemetry */}
              <div className="flex items-center gap-3 font-mono text-xs text-ds-sky">
                <span className="hidden md:inline text-ds-white/40">AUDIO WAVEFORM:</span>
                <div className="flex items-center gap-1 h-4">
                  {[4, 12, 8, 16, 10, 6, 14, 8, 12, 4].map((h, i) => (
                    <span
                      key={i}
                      className="w-[3px] bg-ds-sky rounded-full animate-pulse"
                      style={{
                        height: `${h}px`,
                        animationDelay: `${i * 100}ms`
                      }}
                    />
                  ))}
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded">
                  HUD CONNECTED
                </span>
              </div>
            </div>

            {/* HUD Conversation Screen */}
            <div className="p-4 sm:p-6 h-[340px] overflow-y-auto space-y-4 font-mono text-xs">
              {ariaMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user'
                      ? 'items-end'
                      : msg.sender === 'system'
                      ? 'items-center'
                      : 'items-start'
                  }`}
                >
                  {msg.sender === 'system' ? (
                    <span className="px-3 py-1 rounded-full bg-ds-deep/40 text-ds-sky/70 text-[10px] border border-ds-sky/20">
                      {msg.text}
                    </span>
                  ) : (
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-ds-ocean/60 text-ds-white border border-ds-sky/40'
                          : 'bg-ds-abyss/80 text-ds-white/90 border border-ds-sky/25 shadow-glow-subtle'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-1 text-[10px] text-ds-sky/80 uppercase">
                        <span>{msg.sender === 'user' ? 'GUEST' : `ARIA CORE // ${msg.mode}`}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-sans font-light leading-relaxed">{msg.text}</p>

                      {/* Code Block if any */}
                      {msg.metadata?.codeBlock && (
                        <pre className="mt-3 p-3 rounded-xl bg-ds-deep/80 border border-ds-sky/20 text-xs font-mono text-ds-sky overflow-x-auto">
                          <code>{msg.metadata.codeBlock}</code>
                        </pre>
                      )}

                      {/* Stats if any */}
                      {msg.metadata?.stats && (
                        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {msg.metadata.stats.map((st, i) => (
                            <div key={i} className="p-2 rounded bg-ds-deep/50 border border-ds-sky/15 text-[10px]">
                              <span className="text-ds-white/40 block uppercase">{st.label}</span>
                              <span className="text-emerald-400 font-bold">{st.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isAriaThinking && (
                <div className="flex items-center gap-2 text-ds-sky text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-ds-sky animate-ping" />
                  <span>ARIA is synthesizing query across neural bus...</span>
                </div>
              )}
            </div>

            {/* Preset Query Chips */}
            <div className="px-4 py-2 bg-ds-deep/30 border-t border-ds-sky/10 flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] font-mono text-ds-white/40 uppercase whitespace-nowrap">
                PROMPTS:
              </span>
              {ARIA_MODE_PRESETS[ariaMode].presetQueries.map((query, i) => (
                <button
                  key={i}
                  onClick={() => handleAriaSubmit(query)}
                  className="px-2.5 py-1 rounded-lg bg-ds-deep/60 border border-ds-sky/20 text-[11px] font-mono text-ds-sky hover:bg-ds-ocean/30 whitespace-nowrap transition-colors"
                >
                  &ldquo;{query}&rdquo;
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-ds-deep/60 border-t border-ds-sky/20 flex items-center gap-2">
              <input
                type="text"
                value={ariaInput}
                onChange={(e) => setAriaInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAriaSubmit()}
                placeholder={`Ask ARIA in ${ariaMode} mode...`}
                className="flex-1 px-4 py-2.5 rounded-xl bg-ds-abyss/80 border border-ds-sky/25 text-xs sm:text-sm font-mono text-ds-white placeholder:text-ds-white/30 focus:outline-none focus:border-ds-sky"
              />
              <button
                onClick={() => handleAriaSubmit()}
                data-cursor="button"
                data-cursor-text="SEND"
                className="px-4 py-2.5 rounded-xl bg-ds-sky text-ds-abyss font-mono font-bold text-xs uppercase hover:bg-ds-white transition-colors flex items-center gap-1.5 shadow-glow-sky"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">DISPATCH</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CSE MODULES GRID                                                          */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.systems.map((project) => (
            <GlassCard
              key={project.id}
              onClick={() => {
                if (onPlayClick) onPlayClick();
                onSelectProject(project);
              }}
              cursorLabel="INSPECT"
              className="p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header: Category & Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-ds-sky tracking-widest uppercase py-0.5 px-2 rounded bg-ds-deep/80 border border-ds-sky/30">
                    {project.category}
                  </span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded uppercase font-semibold ${
                      project.status === 'ACTIVE'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : project.status === 'BUILDING'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-ds-ocean/30 text-ds-sky border border-ds-sky/30'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-ds-white mb-2 group-hover:text-ds-sky transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-ds-white/70 font-light leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Micro Stats */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-ds-sky/10 mb-4 font-mono text-[10px]">
                  {project.stats.map((st, i) => (
                    <div key={i}>
                      <span className="text-ds-white/40 block uppercase">{st.label}</span>
                      <span className="text-ds-white font-semibold">{st.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-ds-deep/40 text-ds-sky border border-ds-sky/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="flex items-center justify-between pt-3 border-t border-ds-sky/10 font-mono text-xs text-ds-sky group-hover:text-ds-white">
                <span>INSPECT ARCHITECTURE</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
