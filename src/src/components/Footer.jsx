import { useState } from "react";
import { ArrowRight, Check, Headphones, Mail } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer({ variant }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Newsletter Box */}
        <div className={styles.newsletterCard}>
          <div className={styles.newsLeft}>
            <span className={styles.newsTag} style={{ color: variant.accent }}>
              ✦ VIP ACCESS & FIRMWARE UPDATES
            </span>
            <h3 className={styles.newsTitle}>Join the COREX Audiophile Circle</h3>
            <p className={styles.newsSub}>
              Receive exclusive acoustic tuning profiles, lossless audio release stems, and priority firmware updates.
            </p>
          </div>

          <div className={styles.newsRight}>
            {subscribed ? (
              <div className={styles.subscribedMsg}>
                <Check className={styles.checkIcon} style={{ color: variant.accent }} />
                <span>Welcome to COREX. Your VIP welcome gift has been sent.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.emailForm}>
                <div className={styles.inputWrap}>
                  <Mail className={styles.mailIcon} />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.emailInput}
                  />
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    style={{ background: variant.accent }}
                  >
                    <span>Subscribe</span>
                    <ArrowRight className={styles.btnArrow} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className={styles.mainGrid}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <div className={styles.brandWrap}>
              <div className={styles.logoMark} style={{ borderColor: variant.accent }}>
                <span className={styles.logoCore} style={{ background: variant.accent }} />
              </div>
              <span className={styles.brandName}>COREX</span>
            </div>
            <p className={styles.brandMission}>
              Obsessively engineered in Zurich & California. The definitive intersection of titanium transducer acoustics and wireless zero-loss fidelity.
            </p>
            <div className={styles.certBadge}>
              <Headphones className={styles.certIcon} />
              <span>Certified Hi-Res Wireless & LDAC Lossless</span>
            </div>
          </div>

          {/* Links 1 */}
          <div className={styles.linkCol}>
            <h4 className={styles.linkTitle}>Acoustic Hardware</h4>
            <a href="#cinematic-reveal" className={styles.link}>The Pivot Hinge</a>
            <a href="#cinematic-reveal" className={styles.link}>Exposed Internals</a>
            <a href="#cinematic-reveal" className={styles.link}>Titanium Driver</a>
            <a href="#sound-lab" className={styles.link}>DSP Sound Profiles</a>
            <a href="#specs" className={styles.link}>Full Specifications</a>
          </div>

          {/* Links 2 */}
          <div className={styles.linkCol}>
            <h4 className={styles.linkTitle}>Editions</h4>
            <a href="#editions" className={styles.link}>Midnight Obsidian</a>
            <a href="#editions" className={styles.link}>Lunar Aero Silver</a>
            <a href="#editions" className={styles.link}>Ember Forge Crimson</a>
            <a href="#editions" className={styles.link}>Carry Case & Accs</a>
            <a href="#compare" className={styles.link}>Benchmark Audit</a>
          </div>

          {/* Links 3 */}
          <div className={styles.linkCol}>
            <h4 className={styles.linkTitle}>Ownership & Support</h4>
            <a href="#faq" className={styles.link}>30-Day Home Trial</a>
            <a href="#faq" className={styles.link}>2-Year Warranty</a>
            <a href="#faq" className={styles.link}>Zero-Power Mode</a>
            <a href="#faq" className={styles.link}>Replacement Pads</a>
            <a href="#faq" className={styles.link}>Support Concierge</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copy}>
            © 2026 COREX Audio Technologies Inc. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <a href="#privacy" className={styles.legalLink}>Privacy Policy</a>
            <a href="#terms" className={styles.legalLink}>Terms of Sale</a>
            <a href="#compliance" className={styles.legalLink}>Acoustic Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
