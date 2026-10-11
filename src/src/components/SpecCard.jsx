import { motion } from "framer-motion";
import styles from "./SpecCard.module.css";

// SpecCard — Premium spec display with strong visual emphasis
export default function SpecCard({ label, value, accentColor, accentGlow, index = 0 }) {
  return (
    <motion.div
      className={styles.card}
      style={{ "--accent-color": accentColor, "--accent-glow": accentGlow }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{
        background: "rgba(255,255,255,0.06)",
        borderColor: `${accentColor}40`,
        y: -2,
      }}
    >
      <div className={styles.accentBar} style={{ background: accentColor }} />
      <span className={styles.value} style={{ color: accentColor }}>
        {value}
      </span>
      <span className={styles.label}>{label}</span>
    </motion.div>
  );
}
