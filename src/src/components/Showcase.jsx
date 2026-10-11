import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ScrollReveal from "./ScrollReveal";
import InteractiveSoundLab from "./InteractiveSoundLab";
import ComparisonSection from "./ComparisonSection";
import ReviewsAndPress from "./ReviewsAndPress";
import FaqSection from "./FaqSection";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import VariantButton from "./VariantButton";
import SpecCard from "./SpecCard";
import FeatureHotspot from "./FeatureHotspot";
import { VARIANTS, SPECS, FEATURES } from "../data/products";
import styles from "./Showcase.module.css";

// ── Animated headline words ──────────────────────────────────────────────────
const WORDS = ["Pure.", "Powerful.", "Precise.", "Limitless."];

function AnimatedWord({ accent }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={idx}
        style={{ color: accent, display: "inline-block" }}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {WORDS[idx]}
      </motion.span>
    </AnimatePresence>
  );
}

// ── Floating stat chips ──────────────────────────────────────────────────────
const CHIPS = [
  { value: "60hr", label: "Battery Life" },
  { value: "4Hz–40kHz", label: "Frequency Range" },
  { value: "-42dB", label: "Adaptive ANC" },
  { value: "<0.05%", label: "Total Distortion" },
];

function StatChip({ value, label, accent, accentSoft, delay }) {
  return (
    <motion.div
      className={styles.chip}
      style={{ background: accentSoft, border: `1px solid ${accent}30` }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.05, borderColor: accent }}
    >
      <span className={styles.chipValue} style={{ color: accent }}>{value}</span>
      <span className={styles.chipLabel}>{label}</span>
    </motion.div>
  );
}

// ── Minimalist COREX Logo SVG ─────────────────────────────────────────────────
function CorexLogo({ accent, accentGlow, size = 80 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="COREX Logo"
    >
      <defs>
        <filter id="logo_glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Outer ring */}
      <circle
        cx="40"
        cy="40"
        r="36"
        stroke={accent}
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      {/* Middle ring */}
      <circle
        cx="40"
        cy="40"
        r="28"
        stroke={accent}
        strokeWidth="1.5"
        strokeOpacity="0.6"
        strokeDasharray="6 4"
      />
      {/* Inner solid ring */}
      <circle
        cx="40"
        cy="40"
        r="18"
        stroke={accent}
        strokeWidth="2"
        filter="url(#logo_glow)"
      />
      {/* Center dot */}
      <circle cx="40" cy="40" r="4" fill={accent} />
      {/* Cross hairlines */}
      <line x1="40" y1="22" x2="40" y2="32" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="48" x2="40" y2="58" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="40" x2="32" y2="40" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="48" y1="40" x2="58" y2="40" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function Showcase() {
  const [variantIdx, setVariantIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: "midnight",
      name: "COREX Midnight",
      edition: "Obsidian Edition",
      price: "$349",
      accent: "#8B5CF6",
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const variant = VARIANTS[variantIdx];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Update CSS root variables dynamically for active variant
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", variant.accent);
    document.documentElement.style.setProperty("--accent-glow", variant.accentGlow);
    document.documentElement.style.setProperty("--accent-soft", variant.accentSoft);
  }, [variant]);

  // Cart operations
  const handleAddToCart = (selectedVariant = variant) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === selectedVariant.id);
      if (existing) {
        return prev.map((item) =>
          item.id === selectedVariant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: selectedVariant.id,
          name: selectedVariant.name,
          edition: selectedVariant.edition,
          price: selectedVariant.price,
          accent: selectedVariant.accent,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Stagger animation
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <div className={styles.root}>
      {/* ── Navigation Bar ── */}
      <Navbar
        variant={variant}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
      />

      {/* ── Slide-Over Cart Drawer ── */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        variant={variant}
      />

      {/* ══════════════════════════════════════════
          HERO SECTION — TEXT-FIRST, NO IMAGE
      ══════════════════════════════════════════ */}
      <section id="overview" className={styles.hero}>
        {/* Background Aurora */}
        <div className={styles.aurora}>
          <motion.div
            className={styles.aurora1}
            animate={{
              background: `radial-gradient(ellipse, ${variant.accentGlow} 0%, transparent 65%)`,
              x: [0, 25, 0],
              y: [0, -20, 0],
            }}
            transition={{
              background: { duration: 0.7 },
              x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          <motion.div
            className={styles.aurora2}
            animate={{
              background: `radial-gradient(ellipse, ${variant.accentGlow} 0%, transparent 65%)`,
              x: [0, -20, 0],
              y: [0, 25, 0],
            }}
            transition={{
              background: { duration: 0.7 },
              x: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
          />
        </div>
        <div className={styles.gridOverlay} />

        {/* Hero Content — Centered */}
        <motion.div
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Minimalistic Logo */}
          <motion.div
            className={styles.logoWrap}
            variants={itemVariants}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <CorexLogo accent={variant.accent} accentGlow={variant.accentGlow} size={64} />
            </motion.div>
          </motion.div>

          <motion.div className={styles.eyebrow} variants={itemVariants}>
            <motion.span
              className={styles.eyebrowDot}
              style={{ background: variant.accent }}
              animate={{ background: variant.accent }}
              transition={{ duration: 0.5 }}
            />
            Introducing COREX Wireless Flagship
          </motion.div>

          <motion.h1 className={styles.h1} variants={itemVariants}>
            Sound.{" "}
            <AnimatedWord accent={variant.accent} />
          </motion.h1>

          <div className={styles.taglineBox}>
            <AnimatePresence mode="wait">
              <motion.p
                key={variant.id}
                className={styles.tagline}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.35 }}
              >
                {variant.tagline}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p className={styles.desc} variants={itemVariants}>
            Custom 40mm electro-dynamic Titanium drivers. 60-hour continuous playback.
            Adaptive -42dB neural noise cancellation. Uncompromised studio fidelity in an aerospace chassis.
          </motion.p>

          {/* Stat Chips */}
          <motion.div className={styles.chips} variants={itemVariants}>
            {CHIPS.map((ch, i) => (
              <StatChip
                key={ch.value}
                {...ch}
                accent={variant.accent}
                accentSoft={variant.accentSoft}
                delay={i * 0.08}
              />
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div className={styles.ctaRow} variants={itemVariants}>
            <motion.button
              id="cta-buy"
              onClick={() => handleAddToCart(variant)}
              className={styles.btnPrimary}
              style={{
                background: variant.accent,
                boxShadow: `0 8px 32px ${variant.accentGlow}`,
              }}
              animate={{
                background: variant.accent,
                boxShadow: `0 8px 32px ${variant.accentGlow}`,
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.04, boxShadow: `0 12px 40px ${variant.accentGlow}` }}
              whileTap={{ scale: 0.97 }}
            >
              Reserve {variant.name} — {variant.price}
            </motion.button>

            <motion.a
              href="#cinematic-reveal"
              className={styles.btnSecondary}
              whileHover={{ scale: 1.04, borderColor: variant.accent, color: variant.accent }}
              whileTap={{ scale: 0.97 }}
            >
              Inspect Anatomy ↓
            </motion.a>
          </motion.div>

          {/* Rating & Reviews */}
          <motion.div className={styles.rating} variants={itemVariants}>
            <motion.span style={{ color: variant.accent }} animate={{ color: variant.accent }}>
              ★★★★★
            </motion.span>
            <span className={styles.ratingText}>
              4.9 · 2,847 Master Audio Reviews
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className={styles.scrollHint}
          animate={{ y: [0, 7, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={styles.scrollLine} />
          <span>Scroll to dismantle &amp; inspect internal engineering</span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SCROLL-DRIVEN MULTI-CHAPTER VIDEO INSPECTOR
      ══════════════════════════════════════════ */}
      <ScrollReveal accent={variant.accent} accentGlow={variant.accentGlow} />

      {/* ══════════════════════════════════════════
          INTERACTIVE SOUND LAB & FREQUENCY SYNTHESIZER
      ══════════════════════════════════════════ */}
      <InteractiveSoundLab
        accent={variant.accent}
        accentGlow={variant.accentGlow}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
      />

      {/* ══════════════════════════════════════════
          EDITIONS & COLORWAY STUDIO
      ══════════════════════════════════════════ */}
      <section id="editions" className={styles.variantSection}>
        <div className={styles.inner}>
          <motion.div
            className={styles.sectionHead}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.pill} style={{ borderColor: `${variant.accent}40` }}>
              <span>FINISH &amp; FINESSE</span>
            </div>
            <h2 className={styles.h2}>Select Your COREX Edition</h2>
            <p className={styles.h2sub}>
              Three artisanal finishes. One uncompromising acoustic philosophy.
            </p>
          </motion.div>

          <div className={styles.variantList}>
            {VARIANTS.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <VariantButton
                  variant={v}
                  isSelected={i === variantIdx}
                  onClick={() => setVariantIdx(i)}
                />
              </motion.div>
            ))}
          </div>

          {/* Current Selection Summary Card */}
          <motion.div
            className={styles.selectionDetailCard}
            style={{ borderColor: `${variant.accent}30` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={variant.id}
          >
            <div className={styles.detailLeft}>
              <span className={styles.detailBadge} style={{ color: variant.accent }}>
                ✦ {variant.edition}
              </span>
              <h3 className={styles.detailTitle}>{variant.name}</h3>
              <p className={styles.detailFinish}>{variant.finish}</p>
            </div>

            <div className={styles.detailRight}>
              <div className={styles.priceRow}>
                <span className={styles.currentPrice}>{variant.price}</span>
                <span className={styles.origPrice}>{variant.originalPrice}</span>
              </div>
              <button
                onClick={() => handleAddToCart(variant)}
                className={styles.reserveBtn}
                style={{
                  background: variant.accent,
                  boxShadow: `0 6px 24px ${variant.accentGlow}`,
                }}
              >
                Add {variant.name} to Reserve
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BENCHMARK AUDIT / COMPARISON TABLE
      ══════════════════════════════════════════ */}
      <ComparisonSection accent={variant.accent} accentGlow={variant.accentGlow} />

      {/* ══════════════════════════════════════════
          FULL SPECIFICATIONS MATRIX
      ══════════════════════════════════════════ */}
      <section id="specs" className={styles.specsSection}>
        <div className={styles.inner}>
          <motion.div
            className={styles.sectionHead}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.pill} style={{ borderColor: `${variant.accent}40` }}>
              <span>ACOUSTIC METRICS</span>
            </div>
            <h2 className={styles.h2}>Technical Specifications</h2>
            <p className={styles.h2sub}>Zero marketing ambiguity. Strictly verifiable parameters.</p>
          </motion.div>

          <div className={styles.specsGrid}>
            {SPECS.map((s, i) => (
              <SpecCard
                key={s.label}
                label={s.label}
                value={s.value}
                accentColor={variant.accent}
                accentGlow={variant.accentGlow}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CRITICAL REVIEWS & PRESS
      ══════════════════════════════════════════ */}
      <ReviewsAndPress accent={variant.accent} accentGlow={variant.accentGlow} />

      {/* ══════════════════════════════════════════
          KNOWLEDGE BASE & FAQ
      ══════════════════════════════════════════ */}
      <FaqSection accent={variant.accent} accentGlow={variant.accentGlow} />

      {/* ══════════════════════════════════════════
          FINAL ORDER CALL-TO-ACTION
      ══════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <motion.div
          className={styles.ctaCard}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className={styles.ctaGlow}
            animate={{
              background: `radial-gradient(ellipse, ${variant.accentGlow} 0%, transparent 65%)`,
            }}
            transition={{ duration: 0.6 }}
          />
          <motion.p
            className={styles.ctaEyebrow}
            style={{ color: variant.accent }}
            animate={{ color: variant.accent }}
          >
            ✦ Batch 01 Allocation Open
          </motion.p>
          <h2 className={styles.ctaTitle}>Experience Pure Sound.</h2>
          <p className={styles.ctaSub}>
            Complimentary worldwide express courier · 30-day home trial · 2-year manufacturer warranty
          </p>
          <motion.button
            id="final-order"
            onClick={() => handleAddToCart(variant)}
            className={styles.btnPrimary}
            style={{
              background: variant.accent,
              boxShadow: `0 8px 40px ${variant.accentGlow}`,
              fontSize: "16px",
              padding: "16px 44px",
            }}
            animate={{
              background: variant.accent,
              boxShadow: `0 8px 40px ${variant.accentGlow}`,
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: `0 16px 60px ${variant.accentGlow}` }}
            whileTap={{ scale: 0.97 }}
          >
            Order {variant.name} — {variant.price}
          </motion.button>
        </motion.div>
      </section>

      {/* ── Global Footer ── */}
      <Footer variant={variant} />
    </div>
  );
}
