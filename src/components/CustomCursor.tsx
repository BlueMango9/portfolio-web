import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouchDevice } from '../hooks/useMediaQuery';

export type CursorVariant = 'default' | 'button' | 'link' | 'explore' | 'inspect' | 'orbit' | 'text' | 'hidden';

interface CustomCursorProps {
  variant?: CursorVariant;
  customText?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = () => {
  const isTouch = useIsTouchDevice();
  const [cursorState, setCursorState] = useState<{
    variant: CursorVariant;
    text: string;
    visible: boolean;
  }>({
    variant: 'default',
    text: '',
    visible: false
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!cursorState.visible) {
        setCursorState(prev => ({ ...prev, visible: true }));
      }
    };

    const handleMouseLeave = () => {
      setCursorState(prev => ({ ...prev, visible: false }));
    };

    const handleMouseEnter = () => {
      setCursorState(prev => ({ ...prev, visible: true }));
    };

    // Event delegation for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('[data-cursor]') as HTMLElement | null;
      const button = target.closest('button, a, input, textarea, select, [role="button"]') as HTMLElement | null;
      const canvas3D = target.closest('canvas, [data-cursor-3d]') as HTMLElement | null;

      if (interactive) {
        const cursorType = interactive.getAttribute('data-cursor') as CursorVariant;
        const cursorLabel = interactive.getAttribute('data-cursor-text') || '';
        setCursorState(prev => ({
          ...prev,
          variant: cursorType || 'button',
          text: cursorLabel
        }));
      } else if (canvas3D) {
        setCursorState(prev => ({
          ...prev,
          variant: 'orbit',
          text: 'Drag to Rotate'
        }));
      } else if (button) {
        setCursorState(prev => ({
          ...prev,
          variant: 'button',
          text: button.getAttribute('data-cursor-text') || ''
        }));
      } else {
        setCursorState(prev => ({
          ...prev,
          variant: 'default',
          text: ''
        }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouch, mouseX, mouseY, cursorState.visible]);

  if (isTouch || !cursorState.visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Micro Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-ds-sky shadow-glow-sky -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: cursorState.variant === 'button' || cursorState.variant === 'explore' || cursorState.variant === 'inspect' ? 0 : 1,
          scale: cursorState.variant === 'orbit' ? 1.5 : 1
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Lagged Spring Physics Ring / Badge */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-ds-sky/40 backdrop-blur-[2px] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: cursorState.variant === 'explore' || cursorState.variant === 'inspect' || cursorState.variant === 'orbit'
            ? 84
            : cursorState.variant === 'button'
            ? 52
            : 32,
          height: cursorState.variant === 'explore' || cursorState.variant === 'inspect' || cursorState.variant === 'orbit'
            ? 84
            : cursorState.variant === 'button'
            ? 52
            : 32,
          backgroundColor:
            cursorState.variant === 'explore'
              ? 'rgba(0, 168, 232, 0.25)'
              : cursorState.variant === 'inspect'
              ? 'rgba(0, 52, 89, 0.65)'
              : cursorState.variant === 'orbit'
              ? 'rgba(0, 23, 31, 0.75)'
              : cursorState.variant === 'button'
              ? 'rgba(0, 168, 232, 0.15)'
              : 'rgba(0, 126, 167, 0.05)',
          borderColor:
            cursorState.variant === 'orbit'
              ? '#00A8E8'
              : cursorState.variant === 'button'
              ? '#00A8E8'
              : 'rgba(0, 168, 232, 0.35)',
          scale: 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {cursorState.text ? (
          <span className="text-[10px] font-mono font-bold tracking-widest text-ds-white text-center px-1 uppercase leading-tight select-none">
            {cursorState.text}
          </span>
        ) : cursorState.variant === 'orbit' ? (
          <div className="flex flex-col items-center justify-center">
            <svg className="w-4 h-4 text-ds-sky animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-[8px] font-mono text-ds-sky/90 mt-0.5 tracking-tighter">ORBIT</span>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
};
