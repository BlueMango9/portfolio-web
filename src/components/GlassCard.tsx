import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowOnHover?: boolean;
  onClick?: () => void;
  cursorLabel?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glowOnHover = true,
  onClick,
  cursorLabel
}) => {
  return (
    <motion.div
      onClick={onClick}
      data-cursor={cursorLabel ? 'explore' : hoverEffect ? 'button' : undefined}
      data-cursor-text={cursorLabel}
      whileHover={
        hoverEffect
          ? {
              y: -4,
              transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
            }
          : undefined
      }
      className={`relative rounded-2xl bg-ds-deep/30 border border-ds-sky/15 backdrop-blur-2xl overflow-hidden transition-all duration-300 shadow-glass-card ${
        glowOnHover ? 'hover:border-ds-sky/40 hover:shadow-glow-subtle' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Specular Hairline Top Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-ds-sky/40 to-transparent pointer-events-none" />

      {/* Subtle Corner Grid Markings */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-ds-sky/30 pointer-events-none" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-ds-sky/30 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-ds-sky/30 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-ds-sky/30 pointer-events-none" />

      {children}
    </motion.div>
  );
};
