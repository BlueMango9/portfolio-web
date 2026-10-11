import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Volume2, VolumeX, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar({
  variant,
  cartCount,
  onOpenCart,
  isAudioPlaying,
  onToggleAudio,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Anatomy", href: "#cinematic-reveal" },
    { label: "Sound Lab", href: "#sound-lab" },
    { label: "Editions", href: "#editions" },
    { label: "Specs", href: "#specs" },
    { label: "Compare", href: "#compare" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.container}>
        {/* Brand */}
        <a href="#overview" className={styles.brand} aria-label="COREX Home">
          <div className={styles.logoMark} style={{ borderColor: variant.accent }}>
            <span className={styles.logoCore} style={{ background: variant.accent }} />
          </div>
          <div className={styles.brandTextWrap}>
            <span className={styles.brandName}>COREX</span>
            <span className={styles.brandTag}>PRO ACOUSTICS</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className={styles.actions}>
          {/* Audio Test Mode Toggle */}
          <button
            onClick={onToggleAudio}
            className={`${styles.audioBtn} ${isAudioPlaying ? styles.audioBtnActive : ""}`}
            style={{
              borderColor: isAudioPlaying ? variant.accent : "rgba(255,255,255,0.12)",
              color: isAudioPlaying ? variant.accent : "rgba(255,255,255,0.8)",
            }}
            title={isAudioPlaying ? "Mute Acoustic Demo" : "Play Acoustic Sound Demo"}
            aria-label="Toggle audio demo"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className={styles.actionIcon} />
                <span className={styles.audioWave}>
                  <span style={{ background: variant.accent }} />
                  <span style={{ background: variant.accent }} />
                  <span style={{ background: variant.accent }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className={styles.actionIcon} />
                <span className={styles.btnLabel}>Demo Audio</span>
              </>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className={styles.cartBtn}
            style={{
              background: variant.accentSoft,
              borderColor: `${variant.accent}50`,
            }}
            aria-label={`Open shopping cart, ${cartCount} items`}
          >
            <ShoppingBag className={styles.actionIcon} style={{ color: variant.accent }} />
            <span className={styles.cartCount} style={{ background: variant.accent }}>
              {cartCount}
            </span>
          </button>

          {/* Pre-order Quick Button */}
          <button
            onClick={onOpenCart}
            className={styles.buyBtn}
            style={{
              background: variant.accent,
              boxShadow: `0 4px 20px ${variant.accentGlow}`,
            }}
          >
            Pre-Order
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileToggle}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileNavLinks}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className={styles.mobileCtaWrap}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className={styles.mobileBuyBtn}
                  style={{ background: variant.accent }}
                >
                  Order {variant.name} — {variant.price}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
