import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2, Layers, Cpu, CheckCircle2, Copy, Check } from 'lucide-react';
import { SystemProject } from '../data/portfolioData';

interface ProjectModalProps {
  project: SystemProject | null;
  onClose: () => void;
  onPlayClick?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onPlayClick
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'architecture'>('overview');

  if (!project) return null;

  const copyCode = () => {
    if (onPlayClick) onPlayClick();
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ds-abyss/85 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl max-h-[85vh] rounded-2xl bg-ds-abyss border border-ds-sky/30 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-ds-deep/50 border-b border-ds-sky/20">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-ds-sky shadow-glow-sky animate-pulse" />
              <div>
                <span className="font-mono text-[10px] text-ds-sky tracking-widest uppercase">
                  {project.category}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-ds-white">
                  {project.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              data-cursor="button"
              data-cursor-text="CLOSE"
              className="p-2 rounded-xl bg-ds-deep/60 border border-ds-sky/20 text-ds-white/70 hover:text-ds-white hover:border-ds-sky transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 py-2.5 bg-ds-deep/20 border-b border-ds-sky/10 text-xs font-mono">
            <button
              onClick={() => {
                if (onPlayClick) onPlayClick();
                setActiveTab('overview');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-ds-sky/20 text-ds-sky font-bold border border-ds-sky/30'
                  : 'text-ds-white/60 hover:text-ds-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>OVERVIEW</span>
            </button>
            {project.codeSnippet && (
              <button
                onClick={() => {
                  if (onPlayClick) onPlayClick();
                  setActiveTab('code');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${
                  activeTab === 'code'
                    ? 'bg-ds-sky/20 text-ds-sky font-bold border border-ds-sky/30'
                    : 'text-ds-white/60 hover:text-ds-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>CODE SNIPPET</span>
              </button>
            )}
            <button
              onClick={() => {
                if (onPlayClick) onPlayClick();
                setActiveTab('architecture');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${
                activeTab === 'architecture'
                  ? 'bg-ds-sky/20 text-ds-sky font-bold border border-ds-sky/30'
                  : 'text-ds-white/60 hover:text-ds-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>METRICS &amp; STACK</span>
            </button>
          </div>

          {/* Modal Content Scroll Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono text-ds-sky uppercase tracking-widest mb-2">
                    SYSTEM OBJECTIVE &amp; SPECIFICATION
                  </h4>
                  <p className="text-sm sm:text-base text-ds-white/90 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {/* Key Performance Indicators */}
                <div className="grid grid-cols-3 gap-3">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-ds-deep/40 border border-ds-sky/15">
                      <div className="text-[10px] font-mono text-ds-white/50 uppercase">{stat.label}</div>
                      <div className="text-base sm:text-lg font-bold text-ds-white font-mono mt-1">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technology Tags */}
                <div>
                  <h4 className="text-xs font-mono text-ds-white/50 uppercase tracking-widest mb-2">
                    SUBSYSTEM TECHNOLOGIES
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-ds-deep/60 border border-ds-ocean/30 text-xs font-mono text-ds-sky"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && project.codeSnippet && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-ds-white/50 uppercase">
                    ARCHITECTURAL CORE SOURCE
                  </span>
                  <button
                    onClick={copyCode}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-ds-deep/60 border border-ds-sky/30 text-xs font-mono text-ds-sky hover:bg-ds-deep"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-ds-deep/80 border border-ds-sky/20 overflow-x-auto text-xs font-mono text-ds-white leading-relaxed">
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-ds-deep/30 border border-ds-sky/20 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-ds-sky font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>DETERMINISTIC CONCURRENCY &amp; PIPELINES</span>
                  </div>
                  <p className="text-xs text-ds-white/70 leading-relaxed">
                    Designed with fault-tolerant error boundaries, asynchronous non-blocking worker pools, and memory safety checks to guarantee continuous system availability under heavy workload bursts.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-ds-deep/20 border border-ds-ocean/20">
                    <span className="text-[10px] font-mono text-ds-white/40 uppercase">STATUS CODE</span>
                    <div className="text-sm font-mono text-emerald-400 font-semibold mt-1">
                      {project.status} // SYNCHRONIZED
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-ds-deep/20 border border-ds-ocean/20">
                    <span className="text-[10px] font-mono text-ds-white/40 uppercase">METRICS INDEX</span>
                    <div className="text-sm font-mono text-ds-sky font-semibold mt-1">
                      {project.metrics || 'HIGH-THROUGHPUT'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-ds-deep/40 border-t border-ds-sky/15 flex items-center justify-between">
            <span className="text-[10px] font-mono text-ds-white/40">
              AKSHITH SYSTEMS ARCHITECTURE
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-ds-ocean/30 border border-ds-sky/40 text-xs font-mono text-ds-sky hover:bg-ds-ocean/50 transition-colors"
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
