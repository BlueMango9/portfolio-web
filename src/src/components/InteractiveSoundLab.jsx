import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, Activity, Disc } from "lucide-react";
import { SOUND_MODES } from "../data/products";
import styles from "./InteractiveSoundLab.module.css";

export default function InteractiveSoundLab() {
  const [selectedModeIndex, setSelectedModeIndex] = useState(0);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const audioCtxRef = useRef(null);
  const oscillatorRefs = useRef([]);
  const gainNodeRef = useRef(null);
  const filterNodeRef = useRef(null);

  const mode = SOUND_MODES[selectedModeIndex];
  const bands = ["32Hz", "125Hz", "500Hz", "2kHz", "8kHz", "16kHz"];

  const toggleSynth = () => {
    if (isSynthesizing) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  const startSynth = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
      gainNodeRef.current = masterGain;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowshelf";
      filter.frequency.setValueAtTime(250, ctx.currentTime);
      filterNodeRef.current = filter;

      masterGain.connect(filter);
      filter.connect(ctx.destination);

      const freqs = [110.0, 164.81, 220.0, 277.18];
      oscillatorRefs.current = freqs.map((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        osc.detune.setValueAtTime((i - 1.5) * 6, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(1 / freqs.length, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        return osc;
      });

      setIsSynthesizing(true);
    } catch {
      // Audio context blocked or not supported
    }
  };

  const stopSynth = () => {
    if (oscillatorRefs.current.length > 0) {
      oscillatorRefs.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      oscillatorRefs.current = [];
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch {}
      audioCtxRef.current = null;
    }
    setIsSynthesizing(false);
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(
        volume * 0.15,
        audioCtxRef.current.currentTime,
        0.05
      );
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);

  return (
    <section id="sound-lab" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.pill} style={{ borderColor: `${mode.color}40` }}>
            <Activity className={styles.pillIcon} style={{ color: mode.color }} />
            <span>COREX ACOUSTIC DSP LAB</span>
          </div>
          <h2 className={styles.title}>Bespoke Sound Profiles</h2>
          <p className={styles.subtitle}>
            Hear the difference custom driver calibration makes. Switch DSP curves or test the live acoustic frequency synthesizer.
          </p>
        </motion.div>

        <div className={styles.modeTabs}>
          {SOUND_MODES.map((m, idx) => {
            const isSelected = idx === selectedModeIndex;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedModeIndex(idx)}
                className={`${styles.modeTab} ${isSelected ? styles.modeTabActive : ""}`}
                style={{
                  borderColor: isSelected ? m.color : "rgba(255,255,255,0.08)",
                  background: isSelected ? "rgba(255,255,255,0.05)" : "transparent",
                }}
              >
                <span
                  className={styles.modeDot}
                  style={{ background: m.color, boxShadow: isSelected ? `0 0 10px ${m.color}` : "none" }}
                />
                <span className={styles.modeName}>{m.name}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.visualizerCard}>
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.cardTag} style={{ color: mode.color }}>
                {mode.name} Mode
              </span>
              <p className={styles.cardDesc}>{mode.desc}</p>
            </div>

            <div className={styles.synthControls}>
              <button
                onClick={toggleSynth}
                className={`${styles.synthBtn} ${isSynthesizing ? styles.synthBtnActive : ""}`}
                style={{
                  background: isSynthesizing ? mode.color : "rgba(255,255,255,0.08)",
                  borderColor: isSynthesizing ? mode.color : "rgba(255,255,255,0.15)",
                  boxShadow: isSynthesizing ? `0 0 20px ${mode.color}60` : "none",
                }}
              >
                {isSynthesizing ? <Volume2 className={styles.synthIcon} /> : <Disc className={styles.synthIcon} />}
                <span>{isSynthesizing ? "Playing Tone Demo" : "Synthesize Sound Tone"}</span>
              </button>

              {isSynthesizing && (
                <div className={styles.volumeWrap}>
                  <Volume2 className={styles.volIcon} />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className={styles.volumeSlider}
                    aria-label="Demo Volume"
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.curveArea}>
            <svg
              viewBox="0 0 400 120"
              preserveAspectRatio="none"
              className={styles.curveSvg}
            >
              <defs>
                <linearGradient id="freqGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={mode.color} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={mode.color} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.05)" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.05)" />

              <motion.path
                d={`${mode.freqHumps} L 400 120 L 0 120 Z`}
                fill="url(#freqGrad)"
                initial={false}
                animate={{ d: `${mode.freqHumps} L 400 120 L 0 120 Z` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />

              <motion.path
                d={mode.freqHumps}
                fill="none"
                stroke={mode.color}
                strokeWidth="2.5"
                initial={false}
                animate={{ d: mode.freqHumps, stroke: mode.color }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </svg>

            <div className={styles.spectrumRow}>
              {[...Array(24)].map((_, i) => {
                const targetScale = isSynthesizing ? 0.3 + (i % 6) * 0.12 : 0.15;
                return (
                  <motion.div
                    key={i}
                    className={styles.spectrumBar}
                    style={{ background: mode.color }}
                    animate={{
                      scaleY: isSynthesizing
                        ? [0.15, targetScale, 0.2, targetScale * 1.1, 0.15]
                        : 0.15,
                    }}
                    transition={{
                      duration: 0.6 + (i % 4) * 0.1,
                      repeat: isSynthesizing ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className={styles.eqGrid}>
            {bands.map((band, idx) => {
              const val = mode.eq[idx];
              const isPositive = val > 0;
              return (
                <div key={band} className={styles.eqCol}>
                  <span className={styles.eqVal} style={{ color: val !== 0 ? mode.color : "var(--text-muted)" }}>
                    {isPositive ? `+${val}` : val}dB
                  </span>
                  <div className={styles.eqTrack}>
                    <div
                      className={styles.eqFill}
                      style={{
                        height: `${Math.min(100, Math.max(10, 50 + val * 7))}%`,
                        background: val !== 0 ? mode.color : "rgba(255,255,255,0.2)",
                      }}
                    />
                  </div>
                  <span className={styles.eqBand}>{band}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
