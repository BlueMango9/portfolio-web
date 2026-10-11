import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "../data/products";
import styles from "./FaqSection.module.css";

export default function FaqSection({ accent = "#8B5CF6" }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.pill} style={{ borderColor: `${accent}40` }}>
            <HelpCircle className={styles.pillIcon} style={{ color: accent }} />
            <span>KNOWLEDGE BASE</span>
          </div>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Everything you need to know about COREX drivers, battery architecture, and global guarantees.
          </p>
        </motion.div>

        <div className={styles.faqList}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={faq.q}
                className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen : ""}`}
                style={{
                  borderColor: isOpen ? `${accent}60` : "rgba(255, 255, 255, 0.08)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className={styles.questionBtn}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={styles.chevronWrap}
                    style={{ color: isOpen ? accent : "inherit" }}
                  >
                    <ChevronDown className={styles.chevron} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={styles.answerWrap}
                    >
                      <p className={styles.answerText}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
