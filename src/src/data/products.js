// ================================================
// COREX Headphones — Product Data & Specifications
// ================================================

export const PRODUCT_NAME = "COREX";

export const VARIANTS = [
  {
    id: "midnight",
    name: "COREX Midnight",
    edition: "Obsidian Edition",
    tagline: "Forged in shadow. Engineered for absolute silence.",
    accent: "#8B5CF6",
    accentGlow: "rgba(139, 92, 246, 0.45)",
    accentSoft: "rgba(139, 92, 246, 0.14)",
    gradient: "linear-gradient(135deg, #181032 0%, #06060a 100%)",
    headbandColor: "#171726",
    cupColor: "#0d0d17",
    cupHighlight: "#281b47",
    padColor: "#111120",
    accentColor: "#8B5CF6",
    logoColor: "#8B5CF6",
    price: "$349",
    originalPrice: "$399",
    inStock: true,
    badge: "Most Popular",
    finish: "Micro-blasted Matte Obsidian with PVD violet chamber trims",
  },
  {
    id: "lunar",
    name: "COREX Lunar",
    edition: "Aero Edition",
    tagline: "Aerospace lightness. Celestial acoustic clarity.",
    accent: "#38BDF8",
    accentGlow: "rgba(56, 189, 248, 0.45)",
    accentSoft: "rgba(56, 189, 248, 0.14)",
    gradient: "linear-gradient(135deg, #0d2238 0%, #06060a 100%)",
    headbandColor: "#c2d3e0",
    cupColor: "#d8e4ed",
    cupHighlight: "#eef6fc",
    padColor: "#b2c5d4",
    accentColor: "#38BDF8",
    logoColor: "#38BDF8",
    price: "$379",
    originalPrice: "$429",
    inStock: true,
    badge: "New Release",
    finish: "Anodized Aerospace Aluminum with diamond-cut chamfered edges",
  },
  {
    id: "ember",
    name: "COREX Ember",
    edition: "Forge Edition",
    tagline: "Visceral warmth. Dynamic sub-bass punch.",
    accent: "#F97316",
    accentGlow: "rgba(249, 115, 22, 0.45)",
    accentSoft: "rgba(249, 115, 22, 0.14)",
    gradient: "linear-gradient(135deg, #2c1202 0%, #06060a 100%)",
    headbandColor: "#6b1a03",
    cupColor: "#822505",
    cupHighlight: "#be3e0c",
    padColor: "#521402",
    accentColor: "#F97316",
    logoColor: "#F97316",
    price: "$329",
    originalPrice: "$379",
    inStock: true,
    badge: "Collector's Tier",
    finish: "Crimson Cerakote with brushed copper resonance plates",
  },
];

export const VIDEO_CHAPTERS = [
  {
    id: "pivot",
    title: "Cinematic Pivot",
    subtitle: "Tri-Axis Pivot & Soundstage Deployment",
    videoSrc: "/videos/corex-pivot.mp4",
    badge: "Industrial Form",
    description: "Aerospace-grade zinc-alloy hinges open fluidly to lock into an optimized ergonomic listening clamp force.",
    milestones: [
      { progress: 0.05, label: "Closed Geometry", sub: "Ultra-compact travel footprint with magnetic folding latches." },
      { progress: 0.40, label: "Hinge Articulation", sub: "Multi-axis dampened movement calibrated to 0.45 N·m resistance." },
      { progress: 0.75, label: "Acoustic Alignment", sub: "Drivers align parallel to ear canals for pinpoint stereophonic imaging." },
      { progress: 0.95, label: "Full Deployment", sub: "Pressure-equalized memory foam creates a hermetic acoustic seal." },
    ],
    telemetry: [
      { key: "Hinge Tolerance", val: "±0.02 mm" },
      { key: "Clamp Pressure", val: "4.2 N" },
      { key: "Fold Angle", val: "105°" },
    ],
  },
  {
    id: "internals",
    title: "Chassis & Internals",
    subtitle: "Dual-Cavity Acoustic Architecture",
    videoSrc: "/videos/corex-internals.mp4",
    badge: "Engineering Core",
    description: "Every millimeter is populated with high-precision components: dual DACs, discrete amps, and quad ANC microphones.",
    milestones: [
      { progress: 0.05, label: "Monocoque Frame", sub: "Lightweight magnesium-aluminum exoskeleton absorbing micro-vibrations." },
      { progress: 0.35, label: "Quad-Mic Array", sub: "4 exterior & interior microphones sampling environment 192,000 times/sec." },
      { progress: 0.65, label: "Battery Subsystem", sub: "Dual 600mAh lithium-polymer cells balanced for zero headband tilt." },
      { progress: 0.95, label: "Dual DSP Core", sub: "Dedicated 32-bit floating-point audio processor with neural noise filtering." },
    ],
    telemetry: [
      { key: "Noise Reduction", val: "-42 dB" },
      { key: "Sampling Rate", val: "192 kHz" },
      { key: "Battery Balance", val: "50:50 L/R" },
    ],
  },
  {
    id: "driver",
    title: "Titanium Driver Engine",
    subtitle: "40mm Electro-Dynamic Acoustic Transducer",
    videoSrc: "/videos/corex-driver.mp4",
    badge: "Acoustic Engine",
    description: "A free-floating titanium vapor-deposited diaphragm paired with N52 neodymium magnets delivers lightning transients.",
    milestones: [
      { progress: 0.05, label: "Suspension Ring", sub: "Ultra-compliant polymer surround enabling linear ±1.2mm excursion." },
      { progress: 0.35, label: "Copper Voice Coil", sub: "Japanese CCAW (Copper-Clad Aluminum Wire) with zero thermal compression." },
      { progress: 0.70, label: "N52 Magnet Motor", sub: "1.45 Tesla flux density delivering effortless dynamic headroom." },
      { progress: 0.95, label: "Titanium Dome", sub: "Rigid dome eliminating breakup modes up to an astonishing 40kHz." },
    ],
    telemetry: [
      { key: "Frequency Band", val: "4Hz–40kHz" },
      { key: "Total Distortion", val: "<0.05% THD" },
      { key: "Magnetic Flux", val: "1.45 Tesla" },
    ],
  },
];

export const FEATURES = [
  {
    id: "anc",
    label: "Adaptive Quad-Mic ANC",
    description: "Blocks up to 98% of ambient noise (-42dB) with neural inverse-wave processing that adapts to your environment in real-time.",
    icon: "🎛️",
    x: "18%",
    y: "50%",
    mobileX: "12%",
    mobileY: "48%",
  },
  {
    id: "driver",
    label: "40mm Titanium Dome Driver",
    description: "Vapor-deposited titanium dome provides ultra-fast transient response from 4Hz deep sub-bass to 40kHz airy micro-detail.",
    icon: "🔊",
    x: "80%",
    y: "58%",
    mobileX: "76%",
    mobileY: "54%",
  },
  {
    id: "battery",
    label: "60-Hour Non-Stop Playback",
    description: "Dual balanced 600mAh battery cells with USB-C Turbo Charge. 10 minutes of fast charging yields 5 hours of lossless playback.",
    icon: "⚡",
    x: "54%",
    y: "12%",
    mobileX: "52%",
    mobileY: "10%",
  },
  {
    id: "materials",
    label: "Magnesium-Aluminum Chassis",
    description: "Precision CNC milled framework weighing only 248 grams, lined with breathable memory foam and vegan protein leather.",
    icon: "🛡️",
    x: "24%",
    y: "22%",
    mobileX: "20%",
    mobileY: "20%",
  },
];

export const SPECS = [
  { label: "Driver Type", value: "40mm Titanium Dynamic" },
  { label: "Frequency Response", value: "4Hz – 40,000Hz" },
  { label: "Total Harmonic Distortion", value: "< 0.05% @ 1kHz" },
  { label: "Active Noise Cancellation", value: "-42dB Quad-Mic" },
  { label: "Battery Life", value: "60 Hours (40h ANC)" },
  { label: "Fast Charging", value: "10 min = 5 Hours" },
  { label: "Bluetooth Architecture", value: "Bluetooth 5.4 + LE" },
  { label: "Lossless Codecs", value: "LDAC, aptX Lossless, AAC" },
  { label: "Wired Latency", value: "0ms (3.5mm / USB-C)" },
  { label: "Wireless Gaming Mode", value: "28ms Ultra-Low" },
  { label: "Total Weight", value: "248 grams" },
  { label: "DAC Resolution", value: "24-bit / 192kHz Lossless" },
];

export const SOUND_MODES = [
  {
    id: "reference",
    name: "Studio Reference",
    desc: "Uncolored flat response tuned to diffuse-field target curve for mixing, mastering, and critical listening.",
    eq: [0, 0, 0, 0, 0, 0],
    freqHumps: "M 0 60 Q 50 60 100 60 T 200 60 T 300 60 T 400 60",
    color: "#8B5CF6",
  },
  {
    id: "spatial",
    name: "Spatial Immersion",
    desc: "360-degree binaural acoustic room simulation with head-tracking virtualization for cinematic depth.",
    eq: [+2, +1, -1, +3, +4, +2],
    freqHumps: "M 0 55 Q 50 48 100 52 T 200 64 T 300 42 T 400 50",
    color: "#38BDF8",
  },
  {
    id: "bass",
    name: "Sub-Bass Punch",
    desc: "+6dB low-shelf elevation from 20Hz–80Hz for visceral electronic, hip-hop, and action cinema rumble.",
    eq: [+6, +4, +1, 0, -1, 0],
    freqHumps: "M 0 30 Q 50 36 100 50 T 200 62 T 300 60 T 400 60",
    color: "#F97316",
  },
  {
    id: "vocal",
    name: "Vocal Clarity",
    desc: "Midrange presence lift between 1kHz–3.5kHz for crystalline podcast, voice call, and acoustic intimacy.",
    eq: [-1, 0, +4, +5, +2, +1],
    freqHumps: "M 0 62 Q 50 60 100 45 T 200 38 T 300 52 T 400 58",
    color: "#10B981",
  },
];

export const COMPARISON = [
  { feature: "Driver Diaphragm", corex: "40mm Vapor-Deposited Titanium", industry: "40mm PET Mylar plastic" },
  { feature: "Frequency Extension", corex: "4Hz – 40,000Hz (Hi-Res Certified)", industry: "20Hz – 20,000Hz" },
  { feature: "ANC Attenuation", corex: "-42 dB Adaptive Neural ANC", industry: "-32 dB Static Filter" },
  { feature: "Battery Endurance", corex: "60 Hours continuous playback", industry: "30 Hours average" },
  { feature: "Lossless Wired USB-C", corex: "Integrated 24-bit/192kHz DAC", industry: "Analog 3.5mm only" },
  { feature: "Gaming Latency", corex: "28ms Low-Latency LE Audio", industry: "180ms – 220ms lag" },
  { feature: "Chassis Material", corex: "CNC Magnesium-Aluminum alloy", industry: "Molded Polycarbonate plastic" },
];

export const REVIEWS = [
  {
    author: "Julian Vance",
    source: "SoundStage Magazine",
    rating: 5,
    quote: "COREX obliterates headphones twice its price. The titanium driver delivers sub-bass speed and treble extension that rivals planar magnetic monitors.",
    verified: true,
  },
  {
    author: "Elena Rostova",
    source: "Audiophile Weekly",
    rating: 5,
    quote: "The pivot engineering and passive isolation alone are extraordinary. When ANC is engaged, the world simply ceases to exist.",
    verified: true,
  },
  {
    author: "Marcus Chen",
    source: "Lead Audio Engineer, Apex Studios",
    rating: 5,
    quote: "I use COREX for critical field monitoring. The USB-C 24-bit/192kHz lossless direct feed gives me pure uncolored sound on the road.",
    verified: true,
  },
];

export const FAQS = [
  {
    q: "Can I use COREX when the battery is completely drained?",
    a: "Yes. COREX features a zero-power passive analog mode. Simply connect the included oxygen-free copper 3.5mm cable or USB-C cable to continue listening in lossless quality without needing battery power.",
  },
  {
    q: "How does the titanium driver differ from standard headphone drivers?",
    a: "Standard headphones use soft PET plastic diaphragms which flex and deform at high volumes, causing distortion. COREX uses a 40mm titanium vapor-deposited dome that remains strictly rigid across the entire 4Hz–40kHz bandwidth, keeping total harmonic distortion below 0.05%.",
  },
  {
    q: "Does COREX support multi-point connection?",
    a: "Yes. Bluetooth 5.4 multi-point allows you to pair COREX with your laptop and smartphone simultaneously. Audio switches seamlessly when a call comes in.",
  },
  {
    q: "What is included inside the box?",
    a: "Every COREX package includes: COREX Wireless Headphones, hard-shell magnetic carry case, 1.2m braided 3.5mm analog cable with gold-plated jack, 1.5m braided USB-C to USB-C lossless audio/charging cable, flight adapter, and 2-year international warranty card.",
  },
  {
    q: "What is the return policy and warranty?",
    a: "We offer a 30-day risk-free home trial with free worldwide returns. Every COREX unit includes an ironclad 2-year manufacturer warranty with complimentary ear pad replacements.",
  },
];
