import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "./FeatureHotspot.module.css";

// FeatureHotspot — Interactive point on the product visual
// Reveals feature info on click/tap with smooth enter/exit animation

export default function FeatureHotspot({ feature, accentColor, accentGlow, isMobile }) {
  const [isOpen, setIsOpen] = useState(false);

  const xPos = isMobile ? feature.mobileX : feature.x;
  const yPos = isMobile ? feature.mobileY : feature.y;

  // Tooltip position: flip to left if near right edge
  const xFloat = parseFloat(xPos);
  const tooltipLeft = xFloat > 60 ? "auto" : "calc(100% + 12px)";
  const tooltipRight = xFloat > 60 ? "calc(100% + 12px)" : "auto";

  return (
    <div
      className={styles.hotspot}
      style={{ left: xPos, top: yPos }}
      role="button"
      tabIndex={0}
      aria-label={`Feature: ${feature.label}`}
      aria-expanded={isOpen}
      onClick={() => setIsOpen(v => !v)}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && setIsOpen(v => !v)}
    >
      {/* Pulse ring */}
      <motion.span
        className={styles.pulseRing}
        style={{ borderColor: accentColor }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dot button */}
      <motion.button
        className={styles.dot}
        style={{ background: accentColor, boxShadow: `0 0 10px ${accentGlow}` }}
        whileHover={{ scale: 1.3, boxShadow: `0 0 20px ${accentGlow}` }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { scale: 1.2 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-hidden="true"
        tabIndex={-1}
      >
        <span className={styles.dotIcon}>{isOpen ? "×" : "+"}</span>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.tooltip}
            style={{ left: tooltipLeft, right: tooltipRight, borderColor: `${accentColor}40` }}
            initial={{ opacity: 0, scale: 0.85, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -6 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          >
            <span className={styles.tooltipIcon}>{feature.icon}</span>
            <div>
              <p className={styles.tooltipTitle} style={{ color: accentColor }}>
                {feature.label}
              </p>
              <p className={styles.tooltipDesc}>{feature.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
