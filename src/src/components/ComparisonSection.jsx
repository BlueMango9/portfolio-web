import { motion } from "framer-motion";
import { Check, X, Award } from "lucide-react";
import { COMPARISON } from "../data/products";
import styles from "./ComparisonSection.module.css";

export default function ComparisonSection({ accent = "#8B5CF6" }) {
  return (
    <section id="compare" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.pill} style={{ borderColor: `${accent}40` }}>
            <Award className={styles.pillIcon} style={{ color: accent }} />
            <span>BENCHMARK AUDIT</span>
          </div>
          <h2 className={styles.title}>Engineered Beyond Standards</h2>
          <p className={styles.subtitle}>
            A rigorous component-level comparison between COREX and conventional luxury wireless headphones.
          </p>
        </motion.div>

        {/* Table Container */}
        <motion.div
          className={styles.tableCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className={styles.tableHeader}>
            <div className={styles.colFeature}>Architecture Feature</div>
            <div className={styles.colCorex} style={{ borderColor: accent }}>
              <span className={styles.corexBadge} style={{ background: accent }}>COREX PRO</span>
            </div>
            <div className={styles.colIndustry}>Conventional Flagships</div>
          </div>

          <div className={styles.tableBody}>
            {COMPARISON.map((row) => (
              <div key={row.feature} className={styles.tableRow}>
                <div className={styles.colFeature}>
                  <span className={styles.featureName}>{row.feature}</span>
                </div>

                <div className={styles.colCorex}>
                  <div className={styles.valWithIcon}>
                    <div className={styles.iconCheck} style={{ background: `${accent}20`, color: accent }}>
                      <Check className={styles.checkIcon} />
                    </div>
                    <span className={styles.corexVal}>{row.corex}</span>
                  </div>
                </div>

                <div className={styles.colIndustry}>
                  <div className={styles.valWithIcon}>
                    <div className={styles.iconCross}>
                      <X className={styles.crossIcon} />
                    </div>
                    <span className={styles.industryVal}>{row.industry}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
