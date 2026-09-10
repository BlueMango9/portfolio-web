import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minimize2, Maximize2, CornerDownLeft, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayClick?: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onPlayClick
}) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'sysinfo --verbose',
      output: (
        <div className="space-y-1 text-xs font-mono text-ds-white/80">
          <div className="text-ds-sky font-bold">AKSHITH KERNEL OS [v2.5.0-cloud-release]</div>
          <div>User: <span className="text-ds-sky">akshith</span>@<span className="text-emerald-400">hyd-node-01</span></div>
          <div>Specialization: <span className="text-ds-white">Computer Science Engineering (Cloud Computing)</span></div>
          <div>Status: <span className="text-emerald-400">ONLINE [99.98% uptime]</span></div>
          <div className="text-ds-white/60">Type <span className="text-ds-sky font-bold">help</span> to inspect available subsystem commands.</div>
        </div>
      ),
      timestamp: '00:00:01'
    }
  ]);

  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keyboard shortcut Ctrl+K or Cmd+K to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    if (onPlayClick) onPlayClick();

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const cmd = trimmed.toLowerCase();
    const timeStr = new Date().toLocaleTimeString();
    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs font-mono">
            <div className="text-ds-sky font-bold mb-1">AVAILABLE SUBSYSTEM COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-ds-white/80">
              <div><span className="text-ds-sky font-semibold">about</span> — Bio &amp; systems manifesto</div>
              <div><span className="text-ds-sky font-semibold">systems</span> — Inspect technical architecture</div>
              <div><span className="text-ds-sky font-semibold">aria</span> — ARIA AI agent status</div>
              <div><span className="text-rose-400 font-semibold">kapi</span> — Kápi Cartel coffee &amp; live link</div>
              <div><span className="text-emerald-400 font-semibold">photo</span> / <span className="text-emerald-400 font-semibold">vsco</span> — Photography &amp; Visuals</div>
              <div><span className="text-cyan-400 font-semibold">iem</span> / <span className="text-cyan-400 font-semibold">simgot</span> — Simgot EW200 acoustic lab</div>
              <div><span className="text-ds-sky font-semibold">skills</span> — Backend &amp; Cloud stack</div>
              <div><span className="text-ds-sky font-semibold">contact</span> — Reach out / credentials</div>
              <div><span className="text-ds-sky font-semibold">matrix</span> — Digital rain cascade</div>
              <div><span className="text-ds-sky font-semibold">clear</span> — Wipe terminal screen</div>
              <div><span className="text-ds-sky font-semibold">exit</span> — Close terminal modal</div>
            </div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-2 text-xs font-mono text-ds-white/80">
            <p className="text-ds-sky font-semibold">{PORTFOLIO_DATA.profile.headline}</p>
            <p>{PORTFOLIO_DATA.profile.bio[0]}</p>
            <p>{PORTFOLIO_DATA.profile.bio[1]}</p>
          </div>
        );
        break;

      case 'systems':
      case 'projects':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-ds-sky font-bold">SYSTEMS MODULES:</div>
            {PORTFOLIO_DATA.systems.map((s, idx) => (
              <div key={idx} className="border-l-2 border-ds-sky/40 pl-2 text-ds-white/80">
                <span className="text-ds-sky font-semibold">{s.title}</span> [{s.status}]
                <p className="text-ds-white/60 text-[11px]">{s.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'aria':
        output = (
          <div className="space-y-1 text-xs font-mono text-ds-white/80">
            <div className="text-ds-sky font-bold">ARIA AI AGENT HUD CORE:</div>
            <div>Status: <span className="text-emerald-400">ACTIVE &amp; DEPLOYED</span></div>
            <div>Modes: Chat, Research, Code, Email, Tasks</div>
            <div>Backend: Python Flask + Event Bus Dispatcher</div>
          </div>
        );
        break;

      case 'kapi':
      case 'coffee':
        output = (
          <div className="space-y-1.5 text-xs font-mono text-ds-white/80">
            <div className="text-rose-400 font-bold">KÁPI CARTEL — PREMIUM SOUTH INDIAN COLD BREW:</div>
            <div>Origin: Chikmagalur &amp; Coorg Arabica Beans</div>
            <div>Art Direction: Moody Editorial Noir + AI Video Pipelines</div>
            <div className="pt-1">
              <a
                href="https://kapicartel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-400 hover:text-rose-300 underline font-bold inline-flex items-center gap-1"
              >
                <span>Live Brand Site: https://kapicartel.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        );
        break;

      case 'photo':
      case 'photography':
      case 'vsco':
        output = (
          <div className="space-y-1.5 text-xs font-mono text-ds-white/80">
            <div className="text-emerald-400 font-bold">VISUAL CRAFT &amp; VSCO ARCHIVE:</div>
            <div>Focus: Editorial Object Cinematography, Horology Macro, Brutalist Geometry</div>
            <div>Aesthetics: Low-Key Contrast, Subtle Analog Film Grain, Dynamic Light Control</div>
            <div>Presets: VSCO A6, HB2 Noir, M5, B1 Monolith</div>
            <div className="pt-1">
              <a
                href={PORTFOLIO_DATA.photography.vscoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline font-bold inline-flex items-center gap-1"
              >
                <span>VSCO Journal: {PORTFOLIO_DATA.photography.vscoUrl}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        );
        break;

      case 'iem':
      case 'simgot':
      case 'audio':
      case 'audiophile':
        output = (
          <div className="space-y-1 text-xs font-mono text-ds-white/80">
            <div className="text-cyan-400 font-bold">AUDIOPHILE &amp; IEM ACOUSTIC LAB:</div>
            <div>Daily Driver: <span className="text-ds-white font-semibold">Simgot EW200 ("Maze")</span></div>
            <div>Transducer: <span className="text-cyan-300">10mm Dual-Magnetic Circuit &amp; Dual-Cavity SCP Diaphragm</span></div>
            <div>Housing: All-Metal Mirror Finish Zinc Alloy Chassis</div>
            <div>Acoustic Tuning: Harman 2016 Target + Simgot Classic Target (+6.5dB Sub-bass, 3kHz Pinna Gain)</div>
            <div>Signal Chain: High-Purity Silver-Plated OFC &bull; 24-Bit/192kHz Lossless FLAC</div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1 text-xs font-mono text-ds-white/80">
            <div className="text-ds-sky font-bold">CORE TECHNICAL ARSENAL:</div>
            <div>• <span className="text-ds-white font-semibold">Backend &amp; Cloud:</span> C++, Distributed Systems, Linux, Docker, REST/gRPC</div>
            <div>• <span className="text-ds-white font-semibold">AI &amp; Automation:</span> Python, Flask, Playwright, Asyncio, Agentic Workflows</div>
            <div>• <span className="text-ds-white font-semibold">Hardware:</span> Raspberry Pi, PCB Micro Soldering, Battery Restorations</div>
            <div>• <span className="text-ds-white font-semibold">Frontend:</span> React, TypeScript, Tailwind CSS, Three.js, GSAP</div>
            <div>• <span className="text-ds-white font-semibold">Visual Craft:</span> Editorial Cinematography, Color Grading, VSCO Film Emulation</div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs font-mono text-ds-white/80">
            <div className="text-ds-sky font-bold">DIRECT TRANSMISSION CHANNELS:</div>
            <div>Email: <span className="text-ds-sky">akshith.contact@gmail.com</span></div>
            <div>Location: Hyderabad, India (IST)</div>
            <div>Institution: SRM Institute of Science and Technology</div>
          </div>
        );
        break;

      case 'matrix':
        output = (
          <div className="text-emerald-400 font-mono text-xs space-y-1 overflow-hidden">
            <div>01000001 01001011 01010011 01001000 01001001 01010100 01001000</div>
            <div>01100011 01101100 01101111 01110101 01100100 00100000 01110011</div>
            <div>SYSTEM BREACH: KERNEL MEMORY DUMP SYNCHRONIZED ACROSS HYD NODES</div>
            <div className="text-ds-sky">Wake up, Neo... Akshith is building the machine.</div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        setInputVal('');
        return;

      default:
        output = (
          <div className="text-xs font-mono text-rose-400">
            zsh: command not found: {trimmed}. Type <span className="text-ds-sky font-bold">help</span> for valid commands.
          </div>
        );
    }

    setHistory(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        output,
        timestamp: timeStr
      }
    ]);
    setInputVal('');
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ds-abyss/80 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl h-[520px] rounded-2xl bg-ds-abyss/95 border border-ds-sky/30 shadow-2xl flex flex-col overflow-hidden relative scanlines"
          >
            {/* Terminal Window Chrome Titlebar */}
            <div className="flex items-center justify-between px-4 py-3 bg-ds-deep/60 border-b border-ds-sky/20 select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <div className="ml-3 flex items-center gap-1.5 text-xs font-mono text-ds-white/70">
                  <Terminal className="w-3.5 h-3.5 text-ds-sky" />
                  <span>akshith@cloud-node: ~</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-ds-white/40 hidden sm:inline">
                  ESC to close
                </span>
                <button
                  onClick={onClose}
                  className="p-1 rounded text-ds-white/60 hover:text-ds-white hover:bg-ds-ocean/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Output Stream */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-mono text-xs">
              {history.map((log) => (
                <div key={log.id} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-ds-sky">
                    <span className="text-emerald-400 font-bold">akshith@cloud:~$</span>
                    <span className="text-ds-white font-medium">{log.command}</span>
                  </div>
                  <div className="pl-4">{log.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Command Input Prompt */}
            <div className="p-3 bg-ds-deep/40 border-t border-ds-sky/15 flex items-center gap-2 font-mono text-xs">
              <span className="text-emerald-400 font-bold pl-2 select-none">akshith@cloud:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDownInput}
                placeholder="type 'help', 'kapi', 'photo', 'iem', 'systems'..."
                className="flex-1 bg-transparent text-ds-white placeholder:text-ds-white/30 focus:outline-none font-mono"
              />
              <button
                onClick={() => handleCommand(inputVal)}
                className="p-1.5 rounded-lg bg-ds-ocean/30 border border-ds-sky/40 text-ds-sky hover:bg-ds-ocean/50 transition-colors"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
