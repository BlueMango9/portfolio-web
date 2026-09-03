import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { GlassCard } from '../components/GlassCard';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  FileText,
  ArrowUpRight,
  Sparkles,
  Terminal
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onOpenTerminal: () => void;
  onPlayClick?: () => void;
  onPlaySuccess?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenTerminal,
  onPlayClick,
  onPlaySuccess
}) => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleCopyEmail = () => {
    if (onPlayClick) onPlayClick();
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.socials.email);
    setCopiedEmail(true);
    if (onPlaySuccess) onPlaySuccess();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#00A8E8', '#007EA7', '#FFFFFF']
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    if (onPlayClick) onPlayClick();
    if (onPlaySuccess) onPlaySuccess();

    setSubmitted(true);
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#00A8E8', '#007EA7', '#22c55e']
    });

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-ds-abyss text-ds-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="05"
          title="Connect &amp; Collaborate"
          subtitle="Direct transmission lines for backend engineering, cloud architecture, and high-impact venture partnerships."
          badge="DISPATCH PROTOCOL"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Column: Direct Credentials & Magnetic Social Pills */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-ds-deep/30 border border-ds-sky/20 backdrop-blur-2xl space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
                <span className="font-mono text-xs font-bold text-emerald-400 tracking-widest uppercase">
                  OPEN FOR VENTURES &amp; ENGINEERING
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-black text-ds-white">
                Let&apos;s build resilient systems together.
              </h3>

              <p className="text-sm sm:text-base text-ds-white/80 font-light leading-relaxed">
                Whether you are exploring distributed cloud infrastructure, discussing AI agent pipelines (ARIA), or looking into Kápi Cartel — my frequency is always open.
              </p>

              {/* Instant Email Copy Pill */}
              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-ds-abyss/80 border border-ds-sky/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-ds-deep flex items-center justify-center text-ds-sky border border-ds-sky/30">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-ds-white/40 block uppercase">DIRECT INBOX</span>
                      <span className="text-sm sm:text-base font-mono font-bold text-ds-white select-all">
                        {PORTFOLIO_DATA.profile.socials.email}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    data-cursor="button"
                    data-cursor-text="COPY"
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-ds-sky text-ds-abyss font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-ds-white transition-colors shadow-glow-sky"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Channels Network */}
              <div className="pt-4 border-t border-ds-sky/15">
                <span className="text-xs font-mono text-ds-white/50 block uppercase mb-3">
                  NETWORK NODES
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { label: 'GitHub', icon: Github, href: PORTFOLIO_DATA.profile.socials.github },
                    { label: 'LinkedIn', icon: Linkedin, href: PORTFOLIO_DATA.profile.socials.linkedin },
                    { label: 'X / Twitter', icon: Twitter, href: PORTFOLIO_DATA.profile.socials.x },
                    { label: 'YouTube', icon: Youtube, href: PORTFOLIO_DATA.profile.socials.youtube },
                    { label: 'Instagram', icon: Instagram, href: PORTFOLIO_DATA.profile.socials.instagram }
                  ].map((soc, idx) => (
                    <a
                      key={idx}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      data-cursor-text="OPEN"
                      className="px-3.5 py-2 rounded-xl bg-ds-deep/40 border border-ds-sky/20 hover:border-ds-sky hover:bg-ds-ocean/30 text-xs font-mono text-ds-white flex items-center gap-2 transition-all group"
                    >
                      <soc.icon className="w-4 h-4 text-ds-sky group-hover:scale-110 transition-transform" />
                      <span>{soc.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-ds-white/40 group-hover:text-ds-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Transmission Terminal */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-ds-deep/25 border border-ds-sky/20 backdrop-blur-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-ds-sky/15 pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-ds-sky" />
                  <span className="font-mono text-xs font-bold text-ds-white tracking-widest uppercase">
                    DIRECT DISPATCH CONSOLE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-ds-white/40">TLS 1.3 ENCRYPTED</span>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-ds-abyss/80 border border-emerald-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-ds-white">
                    Transmission Dispatched Successfully
                  </h4>
                  <p className="text-xs font-mono text-ds-white/70">
                    Your packet has been routed directly to Akshith&apos;s queue. Response inbound shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-ds-white/60 uppercase mb-1 text-[10px]">
                      YOUR NAME / ORGANIZATION
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Satya Nadella / Cloud Architect"
                      className="w-full px-4 py-3 rounded-xl bg-ds-abyss/80 border border-ds-sky/20 text-ds-white placeholder:text-ds-white/20 focus:outline-none focus:border-ds-sky"
                    />
                  </div>

                  <div>
                    <label className="block text-ds-white/60 uppercase mb-1 text-[10px]">
                      TRANSMISSION EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-ds-abyss/80 border border-ds-sky/20 text-ds-white placeholder:text-ds-white/20 focus:outline-none focus:border-ds-sky"
                    />
                  </div>

                  <div>
                    <label className="block text-ds-white/60 uppercase mb-1 text-[10px]">
                      MESSAGE / SPECIFICATION
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, architecture, or venture idea..."
                      className="w-full px-4 py-3 rounded-xl bg-ds-abyss/80 border border-ds-sky/20 text-ds-white placeholder:text-ds-white/20 focus:outline-none focus:border-ds-sky resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor="button"
                    data-cursor-text="DISPATCH"
                    className="w-full py-3.5 rounded-xl bg-ds-sky text-ds-abyss font-mono font-bold uppercase text-xs tracking-widest hover:bg-ds-white transition-all shadow-glow-sky flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT DISPATCH</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Closing Scaffolding Line & Footer Signature */}
        <div className="pt-12 border-t border-ds-sky/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-ds-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ds-sky" />
            <span className="text-ds-white font-bold tracking-wider">AKSHITH</span>
            <span>// SRM IST CSE (CLOUD) • HYDERABAD</span>
          </div>

          <div className="text-center sm:text-right text-[11px]">
            &ldquo;Building systems. Shipping ventures. Studying the machine.&rdquo;
          </div>
        </div>
      </div>
    </section>
  );
};
