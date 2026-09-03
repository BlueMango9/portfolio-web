import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'right' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
  subtitle,
  badge,
  align = 'left'
}) => {
  return (
    <div className={`relative mb-14 md:mb-20 ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
      {/* Oversized Constructivist Background Watermark */}
      <span
        aria-hidden="true"
        className="absolute -top-10 sm:-top-16 select-none font-display font-extrabold text-7xl sm:text-9xl text-ds-ocean/5 pointer-events-none tracking-tighter"
        style={{
          left: align === 'center' ? '50%' : align === 'right' ? 'auto' : '0',
          right: align === 'right' ? '0' : 'auto',
          transform: align === 'center' ? 'translateX(-50%)' : 'none'
        }}
      >
        {number}
      </span>

      {/* Scaffolding Bar & Badge */}
      <div className={`flex items-center gap-3 mb-3 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
        <span className="font-mono text-xs font-bold text-ds-sky tracking-widest uppercase py-0.5 px-2 rounded bg-ds-deep/60 border border-ds-sky/30">
          SECTION {number}
        </span>
        {badge && (
          <span className="font-mono text-[11px] text-ds-white/60 tracking-wider uppercase border-l border-ds-sky/40 pl-3">
            {badge}
          </span>
        )}
      </div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-ds-white tracking-tight uppercase"
      >
        {title}
      </motion.h2>

      {/* Subtitle / Narrative Scaffolding */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 text-base sm:text-lg text-ds-white/60 font-sans max-w-2xl font-light"
          style={{
            marginLeft: align === 'center' || align === 'right' ? 'auto' : '0',
            marginRight: align === 'center' ? 'auto' : '0',
          }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Constructivist Accent Divider Line */}
      <div className={`mt-6 flex items-center gap-2 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
        <div className="w-12 sm:w-20 h-[2px] bg-gradient-to-r from-ds-sky to-ds-ocean" />
        <div className="w-2 h-2 rotate-45 border border-ds-sky bg-ds-sky/30" />
        <div className="w-32 sm:w-64 h-[1px] bg-ds-ocean/20" />
      </div>
    </div>
  );
};
