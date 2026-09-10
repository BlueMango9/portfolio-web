export interface SystemProject {
  id: string;
  title: string;
  category: 'Cloud & Infrastructure' | 'AI & Agents' | 'Automation' | 'Data Tooling' | 'Hardware' | 'Full-Stack';
  status: 'ACTIVE' | 'BUILDING' | 'DEPLOYED' | 'MAINTAINED';
  description: string;
  tags: string[];
  metrics?: string;
  link?: string;
  demoUrl?: string;
  githubUrl?: string;
  codeSnippet?: string;
  stats: { label: string; value: string }[];
}

export interface VentureItem {
  id: string;
  name: string;
  tagline: string;
  accentColor: string;
  bgGradient: string;
  description: string;
  websiteUrl?: string;
  pillars: string[];
  metrics: { label: string; value: string }[];
  visualType: 'coffee' | 'media';
  links?: { label: string; url: string }[];
}

export interface PhotoItem {
  id: string;
  title: string;
  category: 'Editorial & Objects' | 'Horology Macro' | 'Architecture' | 'Moody Noir';
  aspectRatio: 'aspect-square' | 'aspect-[4/5]' | 'aspect-[16/9]';
  imageSrc?: string;
  fallbackGradient: string;
  accentColor: string;
  vscoPreset: string;
  exif: {
    camera: string;
    focalLength: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
  description: string;
}

export interface InterestDomain {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  badge: string;
  tags: string[];
  interactiveType: 'watch' | 'telemetry' | 'audiophile' | 'finance' | 'athletics' | 'polymath';
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "AKSHITH",
    fullName: "Akshith",
    headline: "Building systems. Shipping ventures. Studying the machine.",
    currentRole: "1st-Year CSE (Cloud Computing) Student",
    institution: "SRM Institute of Science and Technology",
    location: "Hyderabad, India",
    timeZone: "Asia/Kolkata (IST)",
    bio: [
      "First-year Computer Science Engineering student at SRM Institute of Science and Technology, specializing in Cloud Computing. Based in Hyderabad. I build the way I think — in systems: backend logic, distributed infrastructure, and the quiet architecture underneath things that look simple on the surface.",
      "Outside the stack, I run a constellation of ventures — Kápi Cartel (cold brew coffee brand), algorithmic audience channels, a photography archive exploring editorial object framing and low-key film aesthetics, and an obsession with mechanical watches and audiophile in-ear monitors (IEMs)."
    ],
    status: {
      availability: "Open for high-impact engineering & venture collaborations",
      currentBuild: "C++ high-throughput backend services & ARIA v2 agent core",
      uptime: "99.98% operational"
    },
    socials: {
      github: "https://github.com/BlueMango9",
      linkedin: "https://linkedin.com",
      x: "https://x.com",
      vsco: "https://vsco.co",
      kapicartel: "https://kapicartel.com",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com",
      email: "akshith.contact@gmail.com"
    }
  },

  philosophy: [
    {
      number: "01",
      title: "Systems Architecture",
      subtitle: "The quiet engine underneath",
      description: "Any interface is only as resilient as the distributed pipelines, memory models, and state synchronization beneath it. I architect for throughput, deterministic reliability, and clean separation of concerns."
    },
    {
      number: "02",
      title: "Radical Precision",
      subtitle: "Horological discipline in software",
      description: "Whether regulating a mechanical balance wheel, tuning dynamic driver damping in an IEM, or configuring parallel Playwright scrapers, precision is non-negotiable."
    },
    {
      number: "03",
      title: "Venture Craft",
      subtitle: "Engineering meeting product economics",
      description: "Code without distribution is dormant potential. I build real brands (Kápi Cartel) and algorithmic content funnels (Nexarclips) to test marketing systems against live market feedback."
    }
  ],

  systems: [
    {
      id: "aria-agent",
      title: "ARIA — Personal AI Operating System",
      category: "AI & Agents",
      status: "ACTIVE",
      description: "A personal AI agent with a Jarvis-style HUD interface and a Flask/Python backend, running five operational modes: Chat, Research, Code, Email, and Tasks. Built to explore how a custom voice/AI assistant should actually behave day-to-day, not just demo well.",
      tags: ["Python", "Flask", "Jarvis HUD", "Agentic Workflows", "Prompt Engineering"],
      metrics: "5 Core Operational Modes | Real-Time Audio Telemetry",
      codeSnippet: `class AriaAgentCore:\n    def __init__(self, mode="CODE"):\n        self.mode = mode\n        self.state_bus = EventBus()\n    async def dispatch(self, prompt: str):\n        return await self.pipeline[self.mode].execute(prompt)`,
      stats: [
        { label: "Modes", value: "5 Active" },
        { label: "Latency", value: "<120ms" },
        { label: "Architecture", value: "Flask + HUD" }
      ]
    },
    {
      id: "backend-cloud",
      title: "Backend & Cloud Infrastructure",
      category: "Cloud & Infrastructure",
      status: "BUILDING",
      description: "Actively expanding into C++ and modern backend libraries to build robust server-side architecture and cloud infrastructure — the specialization I'm building my degree around at SRM IST.",
      tags: ["C++", "Cloud Computing", "Distributed Systems", "Linux", "Docker", "REST/gRPC"],
      metrics: "Microservices & Distributed State Management",
      codeSnippet: `template <typename ServerConfig>\nclass CloudClusterNode {\npublic:\n    void BalanceLoad(const PacketStream& incoming) noexcept;\n    auto DispatchWorkers(size_t thread_pool_size) -> Status;\n};`,
      stats: [
        { label: "Focus", value: "C++ / Cloud" },
        { label: "Specialization", value: "SRM IST CSE" },
        { label: "Target", value: "High-Throughput" }
      ]
    },
    {
      id: "bookster-automation",
      title: "Bookster — Web Automation Engine",
      category: "Automation",
      status: "DEPLOYED",
      description: "A script and automation tool built to bypass virtual queues on high-traffic testing and ticketing websites. Small in scope, razor-sharp in deterministic execution.",
      tags: ["Python", "Automation", "Queue Bypass", "Headless Browser", "Reverse Engineering"],
      metrics: "Sub-second Queue Bypass & Auto-checkout",
      codeSnippet: `def bypass_virtual_queue(session_token: str) -> bool:\n    headers = generate_spoofed_fingerprint()\n    payload = decrypt_queue_handshake(session_token)\n    return route_direct_gateway(payload, headers)`,
      stats: [
        { label: "Success Rate", value: "99.4%" },
        { label: "Execution Time", value: "<850ms" },
        { label: "Bypass Ratio", value: "10x Human" }
      ]
    },
    {
      id: "maps-scraper",
      title: "Maps Scraper — B2B Lead Generation",
      category: "Data Tooling",
      status: "DEPLOYED",
      description: "A Google Maps web scraper built for B2B lead generation using Python + Playwright, featuring parallel browser workers, accurate hit-count logic, and clean dual-sheet automated spreadsheet exports.",
      tags: ["Python", "Playwright", "Asyncio", "Data Pipelines", "Excel Automation"],
      metrics: "Multi-threaded Workers | 10k+ Lead Extraction",
      codeSnippet: `async def run_parallel_workers(geo_bounds, query_matrix):\n    async with async_playwright() as p:\n        pool = [spawn_worker(p, q) for q in query_matrix]\n        results = await asyncio.gather(*pool)\n    return export_dual_sheets(results)`,
      stats: [
        { label: "Parallel Workers", value: "12 Concurrent" },
        { label: "Throughput", value: "500 leads/min" },
        { label: "Export Format", value: "Dual Sheet XLSX" }
      ]
    },
    {
      id: "hardware-lab",
      title: "Hardware Lab & Micro-Computing",
      category: "Hardware",
      status: "MAINTAINED",
      description: "Raspberry Pi builds and PCB-level tinkering, plus legacy hardware restoration — iPod Nano and Shuffle battery replacements and soldering included. Where software curiosity meets physical circuitry.",
      tags: ["Raspberry Pi", "PCB Soldering", "Hardware Restoration", "iPod Modding", "Micro-controllers"],
      metrics: "Battery Modding & Firmware Flash",
      codeSnippet: `// Pin configuration & I2C Bus telemetry\n#define SENSOR_I2C_ADDR 0x48\nvoid setup_micro_bus() {\n    Wire.begin();\n    Serial.println("[HW_LAB] Hardware bus synchronized.");\n}`,
      stats: [
        { label: "Projects", value: "iPod / Pi / PCB" },
        { label: "Soldering", value: "SMD Micro" },
        { label: "Restoration", value: "Legacy Hardware" }
      ]
    },
    {
      id: "fullstack-commercial",
      title: "Full-Stack Commercial Builds",
      category: "Full-Stack",
      status: "DEPLOYED",
      description: "Shipped e-commerce and multi-purpose boutique builds including Aakarshana (Indian fashion SPA — catalogue, cart, checkout, INR pricing), Lumière & Co. (UK luxury jewelry boutique), and Varsity (Hyderabad sports league site for basketball, football, volleyball).",
      tags: ["React", "TypeScript", "Tailwind CSS", "Cart/Checkout", "SPA Architecture"],
      metrics: "3 Live Commercial Builds | Zero-latency SPAs",
      demoUrl: "#commercial-builds",
      stats: [
        { label: "Aakarshana", value: "Indian Fashion SPA" },
        { label: "Lumière & Co.", value: "UK Luxury Jewelry" },
        { label: "Varsity", value: "Hyd Sports League" }
      ]
    }
  ] as SystemProject[],

  ventures: [
    {
      id: "kapi-cartel",
      name: "Kápi Cartel",
      tagline: "Premium South Indian Cold Coffee Architecture",
      accentColor: "#D90429",
      bgGradient: "from-[#2B090E] to-[#00171F]",
      websiteUrl: "https://kapicartel.com",
      description: "A premium cold coffee brand built around South Indian coffee bean origins. The identity leans dark, moody, and high-contrast — deep reds and blacks — art-directed with editorial-style object cinematography rather than conventional ad formats, and increasingly powered by AI-generated video and social content.",
      pillars: [
        "Single-Origin Chikmagalur & Coorg Arabica Beans",
        "Dark & Moody Editorial Art Direction",
        "AI-Generated Video Marketing Pipelines",
        "Direct-to-Consumer Packaging & Narrative"
      ],
      metrics: [
        { label: "Live Domain", value: "kapicartel.com" },
        { label: "Origin", value: "South India" },
        { label: "Roast Profile", value: "Dark Velvet Cold Brew" }
      ],
      visualType: "coffee",
      links: [
        { label: "kapicartel.com", url: "https://kapicartel.com" }
      ]
    },
    {
      id: "content-channels",
      name: "Nexarclips & Quoteunquotetalks",
      tagline: "Algorithmic Audience Building & Content Systems",
      accentColor: "#00A8E8",
      bgGradient: "from-[#003459] to-[#00171F]",
      description: "Two content-clipping channels that repurpose podcast and motivational content at scale — a look into audience-building and content systems outside of code. Treating video pacing, sound typography, and retention curves as engineering metrics.",
      pillars: [
        "Automated Video Ingestion & Whisper Transcription",
        "Dynamic Kinetic Captions & Audio Normalization",
        "Hook Optimization & Retention Analytics",
        "Multi-Platform Distribution Workflows"
      ],
      metrics: [
        { label: "Channels", value: "Nexarclips + QUTalks" },
        { label: "Format", value: "Short-form Cinematic" },
        { label: "Focus", value: "Mindset & Tech Titans" }
      ],
      visualType: "media"
    }
  ] as VentureItem[],

  photography: {
    vscoUrl: "https://vsco.co",
    headline: "Visual Craft & Editorial Cinematography",
    tagline: "Framing the world through moody contrast, analog grain, and horological precision.",
    bio: "Photography is my visual study of light, geometry, and mechanical textures. Whether capturing the brushed stainless steel of a watch case, the rich crimson crema of cold brew, or brutalist city geometry in Hyderabad, I apply the same disciplined attention to composition as I do to software architecture.",
    skills: [
      {
        title: "Editorial Object Cinematography",
        description: "Dramatic side-lighting, rim highlights, and product framing for brands like Kápi Cartel."
      },
      {
        title: "Low-Key & Noir Film Grading",
        description: "Curating deep blacks, soft highlight rolloffs, and tactile analog film grain profiles."
      },
      {
        title: "Horological Macro Photography",
        description: "Capturing balance wheel oscillations, jewel bearings, and dial guilloché textures."
      },
      {
        title: "Architectural Perspective & Geometry",
        description: "Vanishing lines, industrial symmetry, and high-contrast ambient lighting."
      },
      {
        title: "Color Science & Post-Production",
        description: "Mastering Lightroom curves, VSCO film recipes, and luminance separation."
      }
    ],
    gear: [
      { item: "Primary Sensor", spec: "4K 60FPS / 48MP Dual-ISO Sensor" },
      { item: "Prime Glass", spec: "50mm f/1.8 & 28mm Wide Prime" },
      { item: "Color Matrix", spec: "VSCO Film Emulation / Custom LUTs" },
      { item: "Lighting", spec: "Directional Diffused Key & Rim Grid" }
    ],
    gallery: [
      {
        id: "photo-1",
        title: "Kápi Noir Cold Brew Extraction",
        category: "Editorial & Objects",
        aspectRatio: "aspect-[4/5]",
        imageSrc: "/images/coffee/kapi-bottle.jpg",
        fallbackGradient: "from-[#200508] via-[#100305] to-[#00171F]",
        accentColor: "#D90429",
        vscoPreset: "HB2 // Noir Crimson",
        exif: {
          camera: "50mm Prime",
          focalLength: "50mm",
          aperture: "f/1.8",
          shutter: "1/320s",
          iso: "100"
        },
        description: "Dark-field studio lighting highlighting condensation on the Kápi Cartel cold brew bottle."
      },
      {
        id: "photo-2",
        title: "Tissot PRX Calibre & Balance Wheel",
        category: "Horology Macro",
        aspectRatio: "aspect-square",
        imageSrc: "/images/watches/tissot-prx.jpg",
        fallbackGradient: "from-[#021b2d] via-[#00171F] to-[#0f172a]",
        accentColor: "#00A8E8",
        vscoPreset: "A6 // Clean Metallic",
        exif: {
          camera: "Macro Precision",
          focalLength: "90mm Macro",
          aperture: "f/2.8",
          shutter: "1/160s",
          iso: "200"
        },
        description: "Macro capture of the 28,800 VPH escapement and ruby jewel bearing under diffuse cross-light."
      },
      {
        id: "photo-3",
        title: "Simgot EW200 Mirror Acoustic Shell",
        category: "Editorial & Objects",
        aspectRatio: "aspect-[4/5]",
        imageSrc: "/images/photography/simgot-ew200.jpg",
        fallbackGradient: "from-[#0f172a] via-[#1e293b] to-[#00171F]",
        accentColor: "#38bdf8",
        vscoPreset: "M5 // Moody Steel",
        exif: {
          camera: "35mm Prime",
          focalLength: "35mm",
          aperture: "f/2.0",
          shutter: "1/250s",
          iso: "100"
        },
        description: "Specular reflections off the dual-cavity all-metal mirror zinc alloy housing of the Simgot EW200."
      },
      {
        id: "photo-4",
        title: "Brutalist Lines & Monolithic Void",
        category: "Architecture",
        aspectRatio: "aspect-square",
        imageSrc: "/images/photography/photo-4.jpg",
        fallbackGradient: "from-[#111827] via-[#00171F] to-[#030712]",
        accentColor: "#94a3b8",
        vscoPreset: "B1 // Monolith B&W",
        exif: {
          camera: "28mm Ultra-Wide",
          focalLength: "28mm",
          aperture: "f/4.0",
          shutter: "1/500s",
          iso: "50"
        },
        description: "High-contrast geometric vanishing points and concrete shadows in Hyderabad."
      },
      {
        id: "photo-5",
        title: "Roger Dubuis Skeleton Architecture",
        category: "Horology Macro",
        aspectRatio: "aspect-[4/5]",
        imageSrc: "/images/watches/roger-dubuis.jpg",
        fallbackGradient: "from-[#170a00] via-[#00171F] to-[#090d16]",
        accentColor: "#f59e0b",
        vscoPreset: "C1 // Amber Spectrum",
        exif: {
          camera: "Macro Prime",
          focalLength: "90mm Macro",
          aperture: "f/3.2",
          shutter: "1/200s",
          iso: "160"
        },
        description: "Skeletonized bridges, star-burst tourbillon cage, and Geneva seal finishing."
      },
      {
        id: "photo-6",
        title: "Midnight Noir & Neon Reflections",
        category: "Moody Noir",
        aspectRatio: "aspect-square",
        imageSrc: "/images/photography/photo-6.jpg",
        fallbackGradient: "from-[#1e0524] via-[#00171F] to-[#080d1a]",
        accentColor: "#ec4899",
        vscoPreset: "V1 // Cyber Noir",
        exif: {
          camera: "50mm Prime",
          focalLength: "50mm",
          aperture: "f/1.4",
          shutter: "1/80s",
          iso: "800"
        },
        description: "Low-light night photography capturing wet tarmac reflections and cyan-magenta color isolation."
      }
    ] as PhotoItem[]
  },

  interests: [
    {
      id: "horology",
      title: "Horology & Watch Modification",
      subtitle: "Tissot PRX, Roger Dubuis skeletonization & mechanical regulation",
      details: "A fascination with mechanical precision that runs parallel to software architecture. Analyzing balance wheels, escapements, sapphire casebacks, and custom modifications where a 0.1s deviation per day defines excellence.",
      badge: "MECHANICAL PRECISION",
      tags: ["Tissot PRX", "Roger Dubuis", "Automatic Movements", "Tourbillon", "Super-LumiNova"],
      interactiveType: "watch"
    },
    {
      id: "audiophile-iem",
      title: "Audiophile & IEM Acoustic Engineering",
      subtitle: "Daily driver: Simgot EW200, Dual-Cavity SCP Diaphragm & Harman Target Tuning",
      details: "Deep exploration of in-ear monitor (IEM) acoustic design, frequency response tuning, and lossless digital-to-analog conversion. Daily driving the Simgot EW200 ('Maze') with its 10mm Dual-Magnetic Circuit & Dual-Cavity Silicon Crystal Plated (SCP) dynamic driver, tuned to the Harman 2016 Target with precise sub-bass extension and crystal-clear treble resolution.",
      badge: "ACOUSTIC ENGINEERING",
      tags: ["Simgot EW200", "Harman 2016 Target", "10mm SCP Diaphragm", "24-bit/192kHz Lossless", "Acoustic Impedance"],
      interactiveType: "audiophile"
    },
    {
      id: "f1-bmw",
      title: "F1 & BMW M Engineering",
      subtitle: "Aerodynamics, telemetry, and high-RPM powertrain dynamics",
      details: "Obsession with Formula 1 telemetry curves, ground-effect aero, and BMW M3 twin-turbo power delivery. Engineering where every millisecond and gram of unsprung weight is quantified.",
      badge: "MOTORSPORT TELEMETRY",
      tags: ["Formula 1", "BMW M3", "Aerodynamics", "Telemetry Analysis", "Carbon Composites"],
      interactiveType: "telemetry"
    },
    {
      id: "finance",
      title: "Quantitative Finance & Long-term Markets",
      subtitle: "Index fund compounding, tech stock fundamentals & macro analysis",
      details: "Studying capital allocation, technology market moats, and disciplined index investing. Applying statistical models to long-term wealth compounding.",
      badge: "CAPITAL ALLOCATION",
      tags: ["Index Funds", "Tech Equities", "Compound Growth", "Macro Analysis", "Portfolio Theory"],
      interactiveType: "finance"
    },
    {
      id: "athletics",
      title: "Athletics & Human Performance",
      subtitle: "Calisthenics, competitive basketball, cricket, and MMA",
      details: "A structured physical regimen: bodyweight mastery through calisthenics, court vision in basketball tournaments, cricket, and actively training in Mixed Martial Arts (MMA).",
      badge: "PHYSICAL DISCIPLINE",
      tags: ["Calisthenics", "Basketball (Tournament)", "Cricket", "MMA Training", "Strength & Conditioning"],
      interactiveType: "athletics"
    },
    {
      id: "polymath",
      title: "Beyond the Stack — The Polymath Grid",
      subtitle: "Psychology, 48 Laws of Power, 3D craft & public speaking",
      details: "Genuinely drawn to psychology, biology, music, art, and public speaking; a self-described 'jack of all trades' who studies influence frameworks and treats video editing, photography, and 3D design as both craft and income streams.",
      badge: "STRATEGY & MULTIDISCIPLINARY",
      tags: ["48 Laws of Power", "Cognitive Psychology", "3D Art & Lighting", "Cinematography", "Public Speaking"],
      interactiveType: "polymath"
    }
  ] as InterestDomain[]
};
