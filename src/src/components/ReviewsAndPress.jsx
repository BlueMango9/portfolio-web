import { motion } from "framer-motion";
import { Star, CheckCircle, Quote } from "lucide-react";
import { REVIEWS } from "../data/products";
import styles from "./ReviewsAndPress.module.css";

export default function ReviewsAndPress({ accent = "#8B5CF6" }) {
  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.ratingBadge}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={styles.starIcon} style={{ fill: accent, color: accent }} />
              ))}
            </div>
            <span className={styles.scoreText}>4.9 / 5.0 Global Rating · 2,847 Certified Audits</span>
          </div>

          <h2 className={styles.title}>Acclaimed by Master Audio Engineers</h2>
          <p className={styles.subtitle}>
            From studio mix consoles to high-altitude flights, hear what critical listeners say about COREX.
          </p>
        </motion.div>

        {/* Press Badges Bar */}
        <div className={styles.pressBar}>
          <span className={styles.pressItem}>SOUNDSTAGE · "BEST OF 2026"</span>
          <span className={styles.pressDot}>•</span>
          <span className={styles.pressItem}>WIREAUDIO · EDITORS' GOLD CHOICE</span>
          <span className={styles.pressDot}>•</span>
          <span className={styles.pressItem}>HEAD-FI · 5/5 TRANSIENT CLARITY</span>
          <span className={styles.pressDot}>•</span>
          <span className={styles.pressItem}>HI-RES AUDIO ALLIANCE CERTIFIED</span>
        </div>

        {/* Reviews Grid */}
        <div className={styles.grid}>
          {REVIEWS.map((r, idx) => (
            <motion.div
              key={r.author}
              className={styles.reviewCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, borderColor: `${accent}40` }}
            >
              <Quote className={styles.quoteIcon} style={{ color: accent }} />
              <p className={styles.quoteText}>"{r.quote}"</p>

              <div className={styles.authorRow}>
                <div className={styles.authorAvatar} style={{ background: `${accent}20`, color: accent }}>
                  {r.author.charAt(0)}
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.nameLine}>
                    <span className={styles.authorName}>{r.author}</span>
                    {r.verified && (
                      <span className={styles.verifiedTag}>
                        <CheckCircle className={styles.checkMini} /> Verified
                      </span>
                    )}
                  </div>
                  <span className={styles.authorSource}>{r.source}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
