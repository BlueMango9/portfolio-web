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
  pillars: string[];
  metrics: { label: string; value: string }[];
  visualType: 'coffee' | 'media';
  links?: { label: string; url: string }[];
}

export interface InterestDomain {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  badge: string;
  tags: string[];
  interactiveType: 'watch' | 'telemetry' | 'finance' | 'athletics' | 'polymath';
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
      "Outside the stack, I run a small constellation of ventures — a coffee brand, two content channels, and a habit of pulling things apart (hardware, watches, ideas) to understand how they're actually built. I'm drawn to precision — in code, in mechanical engineering, in a well-regulated watch movement — and I'd rather spend twice as long getting something right than ship something forgettable."
    ],
    status: {
      availability: "Open for high-impact engineering & venture collaborations",
      currentBuild: "C++ high-throughput backend services & ARIA v2 agent core",
      uptime: "99.98% operational"
    },
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      x: "https://x.com",
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
      description: "Whether regulating a mechanical balance wheel or tuning a parallel Playwright scraper, precision is non-negotiable. I'd rather spend twice as long getting the architecture right than ship something fragile."
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
      description: "A premium cold coffee brand built around South Indian coffee bean origins. The identity leans dark, moody, and high-contrast — deep reds and blacks — art-directed with editorial-style object cinematography rather than conventional ad formats, and increasingly powered by AI-generated video and social content.",
      pillars: [
        "Single-Origin Chikmagalur & Coorg Arabica Beans",
        "Dark & Moody Editorial Art Direction",
        "AI-Generated Video Marketing Pipelines",
        "Direct-to-Consumer Packaging & Narrative"
      ],
      metrics: [
        { label: "Origin", value: "South India" },
        { label: "Roast Profile", value: "Dark Velvet Cold Brew" },
        { label: "Visual System", value: "Cinematic Noir" }
      ],
      visualType: "coffee"
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
