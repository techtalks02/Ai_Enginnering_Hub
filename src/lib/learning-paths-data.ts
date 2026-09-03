export interface RoadmapStage {
  number: number;
  title: string;
  shortDesc: string;
  color: "emerald" | "sky" | "violet" | "amber" | "rose" | "teal" | "orange" | "indigo" | "pink" | "cyan";
  href: string;
  seriesName?: string;
  completionPercent?: number;
}

export interface PathSeries {
  id: string;
  title: string;
  badge: string;
  badgeVariant: "foundations" | "intermediate" | "advanced" | "expert";
  description: string;
  tags: string[];
  chaptersCount: number;
  labsCount: number;
  duration: string;
  href: string;
}

export interface FullLearningPath {
  slug: string;
  level: string;
  levelBadge: string;
  category: string;
  title: string;
  subtitle: string;
  estimatedTime: string;
  overview: string;
  targetAudience: string;
  learningOutcomes: string[];
  stages: RoadmapStage[];
  details: {
    seriesCount: number;
    totalChapters: number;
    totalLabs: number;
    totalProjects: number;
  };
  startHere: {
    title: string;
    description: string;
    href: string;
  };
  series: PathSeries[];
}

export const LEARNING_PATHS_DATA: Record<string, FullLearningPath> = {
  "ai-engineering": {
    slug: "ai-engineering",
    level: "Level 1",
    levelBadge: "L1",
    category: "AI Engineering Foundations",
    title: "AI Engineer Path",
    subtitle: "From software developer to AI Engineer",
    estimatedTime: "16 weeks",
    overview:
      "The complete journey from software engineering foundations through production AI systems. Master Python, APIs, LLM fundamentals, prompt engineering, RAG, tool calling, agents, evaluation and production deployment.",
    targetAudience:
      "Software developers entering AI engineering who want a structured path to shipping production AI systems.",
    learningOutcomes: [
      "Build and deploy production LLM applications",
      "Implement RAG systems with retrieval, reranking and evaluation",
      "Design and ship AI agents with tool calling",
      "Apply production patterns: observability, caching, fallbacks, guardrails",
      "Diagnose and debug failing AI systems"
    ],
    details: {
      seriesCount: 2,
      totalChapters: 6,
      totalLabs: 3,
      totalProjects: 2
    },
    startHere: {
      title: "AI Engineering Foundations",
      description: "Python, APIs, HTTP and the engineering craft behind every AI system",
      href: "/lesson?module=01&lesson=01-1"
    },
    stages: [
      {
        number: 1,
        title: "Foundation",
        shortDesc: "Python, APIs, JSON, HTTP, Git, Docker, databases",
        color: "emerald",
        href: "/lesson?module=01&lesson=01-1",
        seriesName: "AI Engineering Foundations"
      },
      {
        number: 2,
        title: "Python & APIs",
        shortDesc: "Build robust backend services",
        color: "sky",
        href: "/lesson?module=01&lesson=01-2",
        seriesName: "AI Engineering Foundations",
        completionPercent: 0
      },
      {
        number: 3,
        title: "LLM Fundamentals",
        shortDesc: "Tokens, context windows, model APIs",
        color: "violet",
        href: "/lesson?module=09&lesson=09-1",
        seriesName: "Building LLM Applications"
      },
      {
        number: 4,
        title: "Prompt Engineering",
        shortDesc: "Structured outputs, function calling",
        color: "amber",
        href: "/lesson?module=10&lesson=10-9",
        seriesName: "Building LLM Applications"
      },
      {
        number: 5,
        title: "RAG",
        shortDesc: "Retrieval, embeddings, vector search",
        color: "rose",
        href: "/lesson?module=12&lesson=12-1",
        seriesName: "Production RAG"
      },
      {
        number: 6,
        title: "Tool Calling",
        shortDesc: "Give models the ability to act",
        color: "teal",
        href: "/lesson?module=10&lesson=10-17",
        seriesName: "Building AI Agents"
      },
      {
        number: 7,
        title: "Agents",
        shortDesc: "Agent loops, memory, planning",
        color: "orange",
        href: "/lesson?module=14&lesson=14-1",
        seriesName: "Building AI Agents"
      },
      {
        number: 8,
        title: "Evaluation",
        shortDesc: "Measure what matters",
        color: "indigo",
        href: "/lesson?module=10&lesson=10-29",
        seriesName: "LLM Evaluation"
      },
      {
        number: 9,
        title: "Production AI",
        shortDesc: "Observability, cost, reliability",
        color: "pink",
        href: "/lesson?module=10&lesson=10-38",
        seriesName: "Production AI Systems",
        completionPercent: 0
      },
      {
        number: 10,
        title: "Capstone",
        shortDesc: "Ship a production AI system",
        color: "cyan",
        href: "/courses/ai-projects",
        seriesName: "AI Engineering Capstone"
      }
    ],
    series: [
      {
        id: "ai-engineering-foundations",
        title: "AI Engineering Foundations",
        badge: "Foundations",
        badgeVariant: "foundations",
        description: "Python, APIs, HTTP and the engineering craft behind every AI system",
        tags: ["Python", "HTTP APIs", "JSON", "Git", "Docker", "SQL"],
        chaptersCount: 3,
        labsCount: 2,
        duration: "~6h",
        href: "/lesson?module=01&lesson=01-1"
      },
      {
        id: "production-ai-systems",
        title: "Production AI Systems",
        badge: "Expert",
        badgeVariant: "expert",
        description: "Observability, cost, reliability, security and deployment",
        tags: ["Observability", "Cost", "Guardrails", "Caching", "Security", "CI/CD"],
        chaptersCount: 3,
        labsCount: 1,
        duration: "~11h",
        href: "/lesson?module=10&lesson=10-38"
      }
    ]
  },
  "genai-engineering": {
    slug: "genai-engineering",
    level: "Level 2",
    levelBadge: "L2",
    category: "Generative AI Engineering",
    title: "GenAI Engineer Path",
    subtitle: "Master generative AI systems",
    estimatedTime: "14 weeks",
    overview:
      "Specialise in generative AI: LLMs, structured outputs, embeddings, vector search, RAG, multimodal systems, agents and production evaluation.",
    targetAudience:
      "Engineers with software fundamentals who want to specialise in cutting-edge LLMs, fine-tuning, and hybrid vector systems.",
    learningOutcomes: [
      "Architect production RAG systems end to end",
      "Master embeddings, vector databases and retrieval strategies",
      "Build multimodal AI applications",
      "Implement structured output and function calling patterns",
      "Fine-tune open weights models using LoRA and QLoRA"
    ],
    details: {
      seriesCount: 4,
      totalChapters: 13,
      totalLabs: 6,
      totalProjects: 3
    },
    startHere: {
      title: "Master Gen AI & LLMs",
      description: "Structured outputs, embeddings, vector search, and model architectures",
      href: "/lesson?module=09&lesson=09-1"
    },
    stages: [
      { number: 1, title: "LLMs", shortDesc: "Foundations of large language models", color: "emerald", href: "/lesson?module=09&lesson=09-1" },
      { number: 2, title: "Structured Outputs", shortDesc: "JSON schemas & Pydantic contracts", color: "sky", href: "/lesson?module=10&lesson=10-13" },
      { number: 3, title: "Embeddings", shortDesc: "Vector spaces & dense representations", color: "violet", href: "/lesson?module=12&lesson=12-15" },
      { number: 4, title: "Vector Search", shortDesc: "Qdrant, pgvector & HNSW indexing", color: "amber", href: "/lesson?module=12&lesson=12-20" },
      { number: 5, title: "RAG", shortDesc: "Hybrid search & reciprocal rank fusion", color: "rose", href: "/lesson?module=12&lesson=12-24" },
      { number: 6, title: "Multimodal", shortDesc: "Vision models & audio processing", color: "teal", href: "/lesson?module=08&lesson=08-11" },
      { number: 7, title: "Agents", shortDesc: "Tool calling & reasoning loops", color: "orange", href: "/lesson?module=14&lesson=14-1" },
      { number: 8, title: "Fine-Tuning", shortDesc: "LoRA, QLoRA & instruction tuning", color: "indigo", href: "/lesson?module=11&lesson=11-1" },
      { number: 9, title: "Evaluation", shortDesc: "Ragas, TruLens & benchmarking", color: "pink", href: "/lesson?module=10&lesson=10-29" },
      { number: 10, title: "Production", shortDesc: "vLLM, continuous batching & latency", color: "cyan", href: "/lesson?module=10&lesson=10-38" }
    ],
    series: [
      {
        id: "llm-engineering-core",
        title: "LLM Engineering Core",
        badge: "Intermediate",
        badgeVariant: "intermediate",
        description: "From prompt engineering to structured outputs and tool calling",
        tags: ["OpenAI", "Anthropic", "Pydantic", "Structured Outputs"],
        chaptersCount: 5,
        labsCount: 3,
        duration: "~8h",
        href: "/lesson?module=10&lesson=10-1"
      },
      {
        id: "production-rag-systems",
        title: "Production RAG Systems",
        badge: "Advanced",
        badgeVariant: "advanced",
        description: "Hybrid search, cross-encoder reranking, and semantic chunking",
        tags: ["Qdrant", "BM25", "Reranking", "LangChain"],
        chaptersCount: 4,
        labsCount: 2,
        duration: "~7h",
        href: "/lesson?module=12&lesson=12-1"
      }
    ]
  },
  "agentic-ai": {
    slug: "agentic-ai",
    level: "Level 3",
    levelBadge: "L3",
    category: "Agentic AI Engineering",
    title: "Agentic AI Engineer Path",
    subtitle: "Build autonomous AI systems",
    estimatedTime: "14 weeks",
    overview:
      "Master agentic AI: tool calling, agent loops, state and memory, planning, multi agent orchestration, MCP, and production agent systems with evaluation and security.",
    targetAudience:
      "Engineers building autonomous AI systems that plan, act, maintain persistent state, and dispatch dynamic tool suites.",
    learningOutcomes: [
      "Design and build production AI agents",
      "Implement agent loops with tool calling and memory",
      "Orchestrate multi-agent systems and workflow graphs",
      "Apply MCP for tool ecosystems",
      "Enforce human-in-the-loop approvals and recursion guards"
    ],
    details: {
      seriesCount: 2,
      totalChapters: 6,
      totalLabs: 4,
      totalProjects: 2
    },
    startHere: {
      title: "Building AI Agents",
      description: "State machines, supervisor-worker loops, and MCP tools",
      href: "/lesson?module=14&lesson=14-1"
    },
    stages: [
      { number: 1, title: "LLM Fundamentals", shortDesc: "Function calling & tool schemas", color: "emerald", href: "/lesson?module=09&lesson=09-1" },
      { number: 2, title: "Tool Calling", shortDesc: "Dynamic execution & JSON schemas", color: "sky", href: "/lesson?module=10&lesson=10-17" },
      { number: 3, title: "Agent Loops", shortDesc: "ReAct pattern & reasoning chains", color: "violet", href: "/lesson?module=14&lesson=14-4" },
      { number: 4, title: "State & Memory", shortDesc: "Short-term buffers & persistent graphs", color: "amber", href: "/lesson?module=14&lesson=14-6" },
      { number: 5, title: "Planning", shortDesc: "Plan-and-execute decomposition", color: "rose", href: "/lesson?module=14&lesson=14-11" },
      { number: 6, title: "Workflows", shortDesc: "LangGraph state channels", color: "teal", href: "/lesson?module=14&lesson=14-20" },
      { number: 7, title: "Multi-Agent Systems", shortDesc: "Supervisor-worker orchestration", color: "orange", href: "/lesson?module=14&lesson=14-24" },
      { number: 8, title: "MCP", shortDesc: "Model Context Protocol client/servers", color: "indigo", href: "/lesson?module=14&lesson=14-7" },
      { number: 9, title: "Agent Evaluation", shortDesc: "Trajectory evaluation & mock tests", color: "pink", href: "/lesson?module=14&lesson=14-29" },
      { number: 10, title: "Production Agents", shortDesc: "Guardrails, timeouts & sandboxing", color: "cyan", href: "/lesson?module=14&lesson=14-36" }
    ],
    series: [
      {
        id: "building-ai-agents",
        title: "Building AI Agents",
        badge: "Advanced",
        badgeVariant: "advanced",
        description: "Agent loops, memory, planning and LangGraph state orchestration",
        tags: ["LangGraph", "MCP", "CrewAI", "Function Calling"],
        chaptersCount: 4,
        labsCount: 2,
        duration: "~8h",
        href: "/lesson?module=14&lesson=14-1"
      }
    ]
  },
  "fde": {
    slug: "fde",
    level: "Level 5",
    levelBadge: "L5",
    category: "Forward Deployed Engineering",
    title: "FDE Path",
    subtitle: "Forward Deployed Engineering",
    estimatedTime: "18 weeks",
    overview:
      "Work at the intersection of customer, product, engineering and AI. Master discovery, solution architecture, rapid prototyping, customer POCs, productionisation and enterprise AI deployment.",
    targetAudience:
      "Engineers who deploy AI directly to enterprise customers — discovery, bespoke POCs, production pipelines, security reviews, and enterprise scale.",
    learningOutcomes: [
      "Run effective technical discovery with enterprise stakeholders",
      "Design resilient solution architecture under real security constraints",
      "Ship customer-specific POCs rapidly in 48-hour turnarounds",
      "Productionise bespoke implementations into Kubernetes clusters",
      "Manage customer security reviews, IAM roles, and SOC2 compliance"
    ],
    details: {
      seriesCount: 4,
      totalChapters: 14,
      totalLabs: 8,
      totalProjects: 4
    },
    startHere: {
      title: "Forward Deployed AI Engineering",
      description: "Discovery, architecture, POCs, and enterprise deployments",
      href: "/lesson?title=Enterprise%20Technical%20Discovery%20%26%20Scoping&tech=FDE%20%2F%20Enterprise"
    },
    stages: [
      { number: 1, title: "Software Engineering", shortDesc: "Clean Python, async APIs & typing", color: "emerald", href: "/lesson?title=Software%20Engineering%20Foundations&tech=Python%20%2F%20FastAPI" },
      { number: 2, title: "AI Engineering", shortDesc: "LLMs, embeddings & model APIs", color: "sky", href: "/lesson?title=AI%20Engineering%20Core%20Models%20%26%20Pipelines&tech=Python%20%2F%20PyTorch" },
      { number: 3, title: "Technical Discovery", shortDesc: "Scoping client pain points & data audits", color: "violet", href: "/lesson?title=Enterprise%20Technical%20Discovery%20%26%20Scoping&tech=FDE%20%2F%20Enterprise" },
      { number: 4, title: "Solution Architecture", shortDesc: "Enterprise topology & security boundaries", color: "amber", href: "/lesson?title=Enterprise%20Solution%20Architecture%20%26%20Topology&tech=Cloud%20%2F%20Security" },
      { number: 5, title: "Rapid Prototyping", shortDesc: "Building 48-hour interactive POCs", color: "rose", href: "/lesson?title=Rapid%20Prototyping%20%26%2048-Hour%20POCs&tech=FastAPI%20%2F%20Streamlit" },
      { number: 6, title: "Customer POC", shortDesc: "Pilot deployments & acceptance testing", color: "teal", href: "/lesson?title=Customer%20POC%20Deployment%20%26%20Acceptance%20Testing&tech=FDE%20%2F%20Pilot" },
      { number: 7, title: "Production Deployment", shortDesc: "Kubernetes, scaling & telemetry", color: "orange", href: "/lesson?title=Production%20Deployment%20%26%20Kubernetes%20Clusters&tech=Docker%20%2F%20K8s" },
      { number: 8, title: "Enterprise AI Security", shortDesc: "VPC endpoints, IAM & audit trails", color: "indigo", href: "/lesson?title=Enterprise%20AI%20Security%2C%20IAM%20%26%20Audit%20Trails&tech=Security%20%2F%20SOC2" },
      { number: 9, title: "Client Integration", shortDesc: "Legacy ERP/CRM data connectors & ETL", color: "pink", href: "/lesson?title=Enterprise%20Client%20Integration%20%26%20Connectors&tech=ETL%20%2F%20SQL" },
      { number: 10, title: "FDE Capstone", shortDesc: "End-to-end client delivery simulation", color: "cyan", href: "/lesson?title=Forward%20Deployed%20Engineering%20Capstone%20Delivery&tech=Enterprise%20AI" }
    ],
    series: [
      {
        id: "technical-discovery-scoping",
        title: "Technical Discovery & Client Scoping",
        badge: "Intermediate",
        badgeVariant: "intermediate",
        description: "Stakeholder interviewing, data readiness audits, and ROI feasibility estimation",
        tags: ["Discovery", "Requirements", "Data Audit", "Scoping"],
        chaptersCount: 3,
        labsCount: 2,
        duration: "~6h",
        href: "/lesson?title=Enterprise%20Technical%20Discovery%20%26%20Scoping&tech=FDE%20%2F%20Enterprise"
      },
      {
        id: "enterprise-solution-architecture",
        title: "Enterprise Solution Architecture & Security",
        badge: "Advanced",
        badgeVariant: "advanced",
        description: "Cloud VPC topology, air-gapped models, tenant isolation, and SOC2 compliance",
        tags: ["Architecture", "VPC", "Security", "SOC2", "IAM"],
        chaptersCount: 4,
        labsCount: 2,
        duration: "~8h",
        href: "/lesson?title=Enterprise%20Solution%20Architecture%20%26%20Topology&tech=Cloud%20%2F%20Security"
      },
      {
        id: "rapid-client-prototyping",
        title: "Rapid Client Prototyping & POCs",
        badge: "Advanced",
        badgeVariant: "advanced",
        description: "48-hour prototype builds, acceptance criteria, and stakeholder demos",
        tags: ["FastAPI", "Streamlit", "POCs", "Demos"],
        chaptersCount: 3,
        labsCount: 2,
        duration: "~7h",
        href: "/lesson?title=Rapid%20Prototyping%20%26%2048-Hour%20POCs&tech=FastAPI%20%2F%20Streamlit"
      },
      {
        id: "enterprise-production-rollout",
        title: "Enterprise Production Rollout & Scaling",
        badge: "Expert",
        badgeVariant: "expert",
        description: "Kubernetes clustering, latency SLA guarantees, monitoring, and failover",
        tags: ["Kubernetes", "Docker", "SLA", "Observability", "CI/CD"],
        chaptersCount: 4,
        labsCount: 2,
        duration: "~9h",
        href: "/lesson?title=Production%20Deployment%20%26%20Kubernetes%20Clusters&tech=Docker%20%2F%20K8s"
      }
    ]
  }
};
