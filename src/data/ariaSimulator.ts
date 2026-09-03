export type AriaMode = 'CHAT' | 'RESEARCH' | 'CODE' | 'EMAIL' | 'TASKS';

export interface AriaMessage {
  id: string;
  sender: 'aria' | 'user' | 'system';
  mode: AriaMode;
  text: string;
  timestamp: string;
  metadata?: {
    codeBlock?: string;
    language?: string;
    actionType?: 'task_done' | 'email_draft' | 'search_complete';
    stats?: { label: string; value: string }[];
  };
}

export const ARIA_MODE_PRESETS: Record<AriaMode, {
  label: string;
  description: string;
  accent: string;
  initialPrompt: string;
  presetQueries: string[];
}> = {
  CHAT: {
    label: "Neural Chat",
    description: "Natural language interface & conversational intelligence",
    accent: "#00A8E8",
    initialPrompt: "ARIA Core v2.4 online. All systems nominal. How can I assist you with Akshith's architecture today?",
    presetQueries: [
      "What is Akshith's primary engineering focus?",
      "Tell me about Kápi Cartel's origin story.",
      "What is his philosophy on systems over templates?"
    ]
  },
  RESEARCH: {
    label: "Deep Research",
    description: "Autonomous data aggregation & technical whitepaper analysis",
    accent: "#007EA7",
    initialPrompt: "Research Mode activated. Semantic web crawlers and vector search clusters standing by.",
    presetQueries: [
      "Analyze C++ vs Rust for cloud-native microservices.",
      "Summarize F1 ground effect aerodynamics vs active aero.",
      "Explain the escapement mechanics of a tourbillon watch."
    ]
  },
  CODE: {
    label: "Code Synthesizer",
    description: "Real-time backend snippet generation & AST parsing",
    accent: "#00E5FF",
    initialPrompt: "Code engine connected. Ready to generate C++ servers, Playwright scrapers, or Python agent workflows.",
    presetQueries: [
      "Generate C++ thread pool server architecture.",
      "Show Playwright parallel worker scraping pipeline.",
      "Display ARIA agent event bus dispatcher."
    ]
  },
  EMAIL: {
    label: "Mail Agent",
    description: "Automated executive dispatch & inbox synthesis",
    accent: "#5BC0BE",
    initialPrompt: "Comms module ready. Generating outbound collaboration memos with zero boilerplate.",
    presetQueries: [
      "Draft collaboration inquiry for Akshith",
      "Send recruitment/internship outreach",
      "Inquire about Kápi Cartel wholesale"
    ]
  },
  TASKS: {
    label: "Task Daemon",
    description: "Priority queue execution & distributed job scheduler",
    accent: "#70E000",
    initialPrompt: "Daemon running at 100% efficiency. 6 cron workers active across Hyderabad and cloud nodes.",
    presetQueries: [
      "List active engineering build tasks",
      "Check Kápi Cartel AI marketing pipeline status",
      "Run system diagnostic on cloud infrastructure"
    ]
  }
};

export function getAriaResponse(mode: AriaMode, query: string): Omit<AriaMessage, 'id' | 'timestamp'> {
  const q = query.toLowerCase();

  if (mode === 'CHAT') {
    if (q.includes('focus') || q.includes('engineering') || q.includes('c++') || q.includes('cloud')) {
      return {
        sender: 'aria',
        mode: 'CHAT',
        text: "Akshith is specializing in Cloud Computing within Computer Science Engineering at SRM IST. His core stack centers on high-throughput C++ backend services, distributed systems, Python automation pipelines, and custom AI agent architectures."
      };
    }
    if (q.includes('kapi') || q.includes('coffee')) {
      return {
        sender: 'aria',
        mode: 'CHAT',
        text: "Kápi Cartel is Akshith's premium cold coffee venture built around single-origin South Indian beans (Chikmagalur & Coorg). It combines a moody, high-contrast visual identity with AI-driven video content pipelines."
      };
    }
    if (q.includes('philosophy') || q.includes('machine') || q.includes('systems')) {
      return {
        sender: 'aria',
        mode: 'CHAT',
        text: "His philosophy: 'Build the way you think — in systems.' Interfaces are mere surfaces; the true beauty lies in resilient backend logic, deterministic concurrency, and radical mechanical precision."
      };
    }
    return {
      sender: 'aria',
      mode: 'CHAT',
      text: `Processing query: "${query}". Akshith is currently architecting high-throughput backend infrastructure, engineering Kápi Cartel, and modding mechanical timepieces. You can explore his Systems or Ventures tabs for deeper metrics.`
    };
  }

  if (mode === 'RESEARCH') {
    if (q.includes('c++') || q.includes('rust')) {
      return {
        sender: 'aria',
        mode: 'RESEARCH',
        text: "Analysis completed: C++ offers deterministic memory control, zero-overhead abstractions, and direct hardware intrinsics ideal for ultra-low-latency financial engines and cloud proxies. Akshith leverages C++20 features (concepts, coroutines) for structured concurrency.",
        metadata: {
          actionType: 'search_complete',
          stats: [
            { label: "Throughput", value: "3.2M req/sec" },
            { label: "Memory Overhead", value: "<1.2MB" },
            { label: "P99 Latency", value: "0.18ms" }
          ]
        }
      };
    }
    if (q.includes('f1') || q.includes('aero')) {
      return {
        sender: 'aria',
        mode: 'RESEARCH',
        text: "F1 Venturi tunnels create ground effect suction underneath the chassis, adhering to Bernoulli's principle. Akshith studies telemetry traces (throttle trace, apex delta, tire degradation) to analyze mechanical and aerodynamic efficiency.",
        metadata: {
          actionType: 'search_complete',
          stats: [
            { label: "Downforce Index", value: "3.85:1" },
            { label: "Apex Speed Delta", value: "+18.4 km/h" },
            { label: "Lateral G", value: "5.4G" }
          ]
        }
      };
    }
    return {
      sender: 'aria',
      mode: 'RESEARCH',
      text: `Deep research query compiled for "${query}". Cross-referencing technical whitepapers, GitHub source trees, and telemetry benchmarks.`,
      metadata: {
        actionType: 'search_complete',
        stats: [
          { label: "Sources Scanned", value: "148 Docs" },
          { label: "Confidence", value: "99.2%" }
        ]
      }
    };
  }

  if (mode === 'CODE') {
    if (q.includes('server') || q.includes('c++')) {
      return {
        sender: 'aria',
        mode: 'CODE',
        text: "Synthesized C++ async TCP server with thread-pool work stealing and epoll/kqueue event loop:",
        metadata: {
          language: 'cpp',
          codeBlock: `// High-Performance C++20 Server Architecture
#include <iostream>
#include <vector>
#include <thread>
#include <memory>
#include <atomic>

class AsyncServerCore {
public:
    explicit AsyncServerCore(size_t workers = std::thread::hardware_concurrency())
        : is_running_(true), pool_size_(workers) {}

    void Start(uint16_t port) {
        std::cout << "[SYSTEM] Listening on port " << port << " with " << pool_size_ << " workers.\\n";
        // Epoll event loop dispatch
    }

private:
    std::atomic<bool> is_running_;
    size_t pool_size_;
};`
        }
      };
    }
    return {
      sender: 'aria',
      mode: 'CODE',
      text: "Generated pipeline dispatch module:",
      metadata: {
        language: 'python',
        codeBlock: `async def dispatch_worker_mesh(task_queue: asyncio.Queue, worker_count: int = 8):\n    workers = [asyncio.create_task(worker_loop(f"worker-{i}", task_queue)) for i in range(worker_count)]\n    await task_queue.join()\n    for w in workers: w.cancel()`
      }
    };
  }

  if (mode === 'EMAIL') {
    return {
      sender: 'aria',
      mode: 'EMAIL',
      text: "Outbound draft prepared. Ready to transmit to Akshith's direct inbox:",
      metadata: {
        actionType: 'email_draft',
        codeBlock: `TO: akshith.contact@gmail.com\nSUBJECT: Engineering Collaboration / Venture Inquiry\n\nHi Akshith,\n\nI reviewed your portfolio and engineering systems (ARIA AI HUD, cloud architecture, and Kápi Cartel).\nI'd like to connect regarding an engineering collaboration / high-impact project.\n\nBest regards,\n[Your Name / Organization]`
      }
    };
  }

  // TASKS
  return {
    sender: 'aria',
    mode: 'TASKS',
    text: "Current background daemon priority queue:",
    metadata: {
      actionType: 'task_done',
      stats: [
        { label: "TASK-01", value: "C++ Microservices Cluster [BUILDING]" },
        { label: "TASK-02", value: "Kápi Cartel AI Render Pipeline [ACTIVE]" },
        { label: "TASK-03", value: "Playwright Maps Scraper Daemon [IDLE]" },
        { label: "TASK-04", value: "Tissot PRX Regulation Check [PASS 0.1s/d]" }
      ]
    }
  };
}
