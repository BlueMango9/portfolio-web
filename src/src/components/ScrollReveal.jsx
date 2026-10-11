import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VIDEO_CHAPTERS } from "../data/products";
import { useScrollProgress } from "../hooks/useScrollProgress";
import styles from "./ScrollReveal.module.css";

// Each chapter occupies 1/3 of the total scroll range
const CHAPTER_COUNT = VIDEO_CHAPTERS.length;
const CHAPTER_FRACTION = 1 / CHAPTER_COUNT;

export default function ScrollReveal({ accent = "#8B5CF6", accentGlow }) {
  const containerRef = useRef(null);
  const videoRefs = useRef([null, null, null]);
  const [videoDurations, setVideoDurations] = useState([0, 0, 0]);
  const [videosLoaded, setVideosLoaded] = useState([false, false, false]);
  const [activeChapter, setActiveChapter] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);
  const durations = useRef([0, 0, 0]);

  const scrollProgress = useScrollProgress(containerRef);

  // Compute which chapter is active and progress within it
  useEffect(() => {
    const chapterIdx = Math.min(
      Math.floor(scrollProgress / CHAPTER_FRACTION),
      CHAPTER_COUNT - 1
    );
    const localProgress = Math.max(
      0,
      Math.min(
        1,
        (scrollProgress - chapterIdx * CHAPTER_FRACTION) / CHAPTER_FRACTION
      )
    );
    setActiveChapter(chapterIdx);
    setChapterProgress(localProgress);

    // Scrub the active video
    const vid = videoRefs.current[chapterIdx];
    const dur = durations.current[chapterIdx];
    if (vid && dur > 0) {
      const target = localProgress * dur;
      if (Math.abs(vid.currentTime - target) > 0.04) {
        vid.currentTime = target;
      }
    }

    // Pause all other videos, keep active video at correct time
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i !== chapterIdx) {
        if (!v.paused) v.pause();
        // Set other videos to their boundary position
        const d = durations.current[i];
        if (d > 0) {
          if (i < chapterIdx) v.currentTime = d; // fully played
          else v.currentTime = 0; // not yet reached
        }
      }
    });
  }, [scrollProgress]);

  const handleLoaded = useCallback((idx) => {
    const vid = videoRefs.current[idx];
    if (!vid) return;
    durations.current[idx] = vid.duration || 1;
    setVideoDurations((prev) => {
      const next = [...prev];
      next[idx] = vid.duration || 1;
      return next;
    });
    setVideosLoaded((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  }, []);

  const chapter = VIDEO_CHAPTERS[activeChapter];
  const currentProgress = scrollProgress;

  // Active milestone within the active chapter
  const activeMilestoneIndex = chapter.milestones.reduce((acc, m, idx) => {
    return chapterProgress >= m.progress ? idx : acc;
  }, 0);
  const activeMilestone =
    chapter.milestones[activeMilestoneIndex] || chapter.milestones[0];

  const allLoaded = videosLoaded.every(Boolean);

  return (
    <section
      ref={containerRef}
      id="cinematic-reveal"
      className={styles.scrollContainer}
    >
      <div className={styles.sticky}>
        {/* Ambient Glow */}
        <div
          className={styles.ambientGlow}
          style={{
            background: `radial-gradient(ellipse at center, ${accentGlow} 0%, transparent 65%)`,
          }}
        />

        {/* All 3 videos stacked — only active one is visible */}
        <div className={styles.videoStack}>
          {VIDEO_CHAPTERS.map((ch, idx) => (
            <video
              key={ch.id}
              ref={(el) => (videoRefs.current[idx] = el)}
              src={ch.videoSrc}
              preload="auto"
              muted
              playsInline
              className={`${styles.video} ${activeChapter === idx ? styles.videoActive : styles.videoHidden}`}
              onLoadedMetadata={() => handleLoaded(idx)}
            />
          ))}

          {!allLoaded && (
            <div className={styles.loadingState}>
              <div className={styles.spinner} style={{ borderTopColor: accent }} />
              <span className={styles.loadingText}>Loading cinematic sequence...</span>
              <div className={styles.loadingDots}>
                {VIDEO_CHAPTERS.map((ch, i) => (
                  <div
                    key={ch.id}
                    className={styles.loadingDot}
                    style={{
                      background: videosLoaded[i] ? accent : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Top chapter indicator */}
        <div className={styles.topBar}>
          <div className={styles.chapterBadge} style={{ borderColor: `${accent}40` }}>
            <span className={styles.chapterNum} style={{ color: accent }}>
              {String(activeChapter + 1).padStart(2, "0")} / {String(CHAPTER_COUNT).padStart(2, "0")}
            </span>
            <span className={styles.chapterTitle}>{chapter.title}</span>
          </div>

          {/* Chapter dots */}
          <div className={styles.chapterDots}>
            {VIDEO_CHAPTERS.map((ch, i) => (
              <div
                key={ch.id}
                className={styles.chapterDot}
                style={{
                  background: i === activeChapter ? accent : i < activeChapter ? `${accent}60` : "rgba(255,255,255,0.15)",
                  width: i === activeChapter ? "28px" : "8px",
                }}
                title={ch.title}
              />
            ))}
          </div>

          {/* Scroll hint */}
          <div className={styles.scrollHintTop}>
            <span>↕ Scroll to explore</span>
          </div>
        </div>

        {/* Telemetry HUD */}
        <div className={styles.telemetryHUD}>
          <div className={styles.hudHeader}>
            <span className={styles.hudDot} style={{ background: accent }} />
            <span>LIVE TELEMETRY</span>
          </div>
          <div className={styles.hudMetrics}>
            {chapter.telemetry.map((t) => (
              <div key={t.key} className={styles.metricItem}>
                <span className={styles.metricKey}>{t.key}</span>
                <span className={styles.metricVal} style={{ color: accent }}>
                  {t.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom milestone overlay */}
        <div className={styles.bottomOverlay}>
          <div className={styles.milestoneCard}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeChapter}-${activeMilestoneIndex}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className={styles.milestoneContent}
              >
                <div className={styles.milestoneHeader}>
                  <span className={styles.milestoneTag} style={{ color: accent }}>
                    PHASE {String(activeMilestoneIndex + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.progressPct}>
                    {Math.round(currentProgress * 100)}%
                  </span>
                </div>
                <h3 className={styles.milestoneTitle}>{activeMilestone.label}</h3>
                <p className={styles.milestoneSub}>{activeMilestone.sub}</p>
              </motion.div>
            </AnimatePresence>

            {/* Unified progress bar across all chapters */}
            <div className={styles.timelineBar}>
              {/* Chapter segments */}
              {VIDEO_CHAPTERS.map((ch, i) => {
                const segStart = i * CHAPTER_FRACTION;
                const segEnd = (i + 1) * CHAPTER_FRACTION;
                const segProgress = Math.max(
                  0,
                  Math.min(1, (scrollProgress - segStart) / CHAPTER_FRACTION)
                );
                return (
                  <div key={ch.id} className={styles.timelineSegment}>
                    <div
                      className={styles.timelineTrack}
                      style={{
                        width: `${segProgress * 100}%`,
                        background: accent,
                        boxShadow: i === activeChapter ? `0 0 8px ${accentGlow}` : "none",
                      }}
                    />
                    {/* Milestone markers */}
                    {ch.milestones.map((m, mi) => (
                      <div
                        key={mi}
                        className={`${styles.marker} ${
                          scrollProgress >= segStart + m.progress * CHAPTER_FRACTION
                            ? styles.markerActive
                            : ""
                        }`}
                        style={{
                          left: `${m.progress * 100}%`,
                          borderColor:
                            scrollProgress >= segStart + m.progress * CHAPTER_FRACTION
                              ? accent
                              : "rgba(255,255,255,0.25)",
                        }}
                      />
                    ))}
                  </div>
                );
              })}
              {/* Chapter dividers */}
              <div className={styles.chapterDividers}>
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className={styles.chapterDivider}
                    style={{ left: `${(i / CHAPTER_COUNT) * 100}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Chapter labels under the bar */}
            <div className={styles.chapterLabels}>
              {VIDEO_CHAPTERS.map((ch, i) => (
                <span
                  key={ch.id}
                  className={styles.chapterLabel}
                  style={{ color: i === activeChapter ? accent : "rgba(255,255,255,0.35)" }}
                >
                  {ch.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}