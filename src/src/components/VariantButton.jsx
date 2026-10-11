import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "./VariantButton.module.css";

// VariantButton — Reusable component with default/hover/selected states
export default function VariantButton({ variant, isSelected, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion variants for state changes
  const buttonVariants = {
    default: {
      scale: 1,
      boxShadow: "0 0 0px rgba(0,0,0,0)",
    },
    hover: {
      scale: 1.06,
      boxShadow: `0 0 18px ${variant.accentGlow}`,
    },
    selected: {
      scale: 1.08,
      boxShadow: `0 0 24px ${variant.accentGlow}, 0 0 48px ${variant.accentGlow}`,
    },
  };

  const currentState = isSelected ? "selected" : isHovered ? "hover" : "default";

  return (
    <motion.button
      id={`variant-btn-${variant.id}`}
      className={styles.variantBtn}
      aria-label={`Select ${variant.name} colorway`}
      aria-pressed={isSelected}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={buttonVariants}
      animate={currentState}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        "--btn-accent": variant.accent,
        "--btn-glow": variant.accentGlow,
        "--btn-soft": variant.accentSoft,
        border: isSelected
          ? `2px solid ${variant.accent}`
          : "2px solid rgba(255,255,255,0.1)",
        background: isSelected ? variant.accentSoft : "rgba(255,255,255,0.04)",
      }}
    >
      {/* Color swatch */}
      <motion.span
        className={styles.swatch}
        style={{ background: variant.accent }}
        animate={{
          scale: isSelected ? 1.2 : 1,
          boxShadow: isSelected
            ? `0 0 10px ${variant.accentGlow}`
            : "0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      <span className={styles.label}>{variant.name}</span>

      <span className={styles.price}>{variant.price}</span>

      {/* Badge */}
      {variant.badge && (
        <motion.span
          className={styles.badge}
          style={{ background: variant.accentSoft, color: variant.accent }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {variant.badge}
        </motion.span>
      )}

      {/* Selected checkmark */}
      <AnimatePresence>
        {isSelected && (
          <motion.span
            className={styles.check}
            style={{ color: variant.accent }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            ✓
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
