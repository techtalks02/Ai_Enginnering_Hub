"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  Compass,
  ArrowUpRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Target,
  FileCode,
  Layers,
  Code2,
  Cpu,
  Workflow,
  Sparkle,
  X,
  Search,
  Check,
  GraduationCap,
  Maximize2,
  Hand,
  Move
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PathNode {
  id: string;
  title: string;
  subtitle: string;
  routeType: "traditional" | "modern-code" | "modern-nocode" | "advanced";
  colorTheme: "blue" | "purple" | "green" | "orange";
  phaseNum: string;
  totalDuration: string;
  lessonsCount: number;
  description: string;
  youWillBuild: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    type: string;
    tech?: string;
  }[];
}

const FLOWCHART_NODES: Record<string, PathNode> = {
  // ── TRADITIONAL ROUTE ──
  "ds-first": {
    id: "ds-first",
    title: "Data Science First",
    subtitle: "Traditional Route",
    routeType: "traditional",
    colorTheme: "blue",
    phaseNum: "01-03",
    totalDuration: "19h 55m",
    lessonsCount: 56,
    description: "Start with Python, linear algebra, statistics, data manipulation, and exploratory data analysis.",
    youWillBuild: "End-to-end data analysis pipelines, feature engineering systems, and statistical models.",
    lessons: [
      { id: "DS-1", title: "Python for Data Science & NumPy Arrays", duration: "16:20", type: "Build", tech: "Python" },
      { id: "DS-2", title: "Pandas DataFrames & Data Cleaning", duration: "21:40", type: "Build", tech: "Pandas" },
      { id: "DS-3", title: "Linear Algebra Intuition & Matrix Ops", duration: "18:20", type: "Learn", tech: "Python" },
      { id: "DS-4", title: "Probability Distributions & Bayes Theorem", duration: "24:00", type: "Learn", tech: "Python" },
      { id: "DS-5", title: "Exploratory Data Analysis (EDA) Pipeline", duration: "25:10", type: "Build", tech: "Seaborn" }
    ]
  },
  "master-ds-ml": {
    id: "master-ds-ml",
    title: "Master DS + ML + CV + NLP",
    subtitle: "Core Foundations",
    routeType: "traditional",
    colorTheme: "blue",
    phaseNum: "03-07",
    totalDuration: "26h 40m",
    lessonsCount: 70,
    description: "Deep dive into Scikit-Learn, PyTorch neural networks, CNNs for Vision, and RNNs/Transformers for NLP.",
    youWillBuild: "Custom ML classification models, neural networks from scratch, and vision detection pipelines.",
    lessons: [
      { id: "ML-1", title: "Supervised & Unsupervised ML Algorithms", duration: "22:15", type: "Build", tech: "Scikit-Learn" },
      { id: "ML-2", title: "Neural Networks & Backpropagation from Scratch", duration: "32:00", type: "Build", tech: "PyTorch" },
      { id: "ML-3", title: "Convolutional Neural Networks & Computer Vision", duration: "28:30", type: "Build", tech: "OpenCV" },
      { id: "ML-4", title: "Sequence Models, RNNs, and Attention Mechanics", duration: "35:10", type: "Build", tech: "PyTorch" },
      { id: "ML-5", title: "Complete Transformer Architecture from Scratch", duration: "45:00", type: "Build", tech: "PyTorch" }
    ]
  },
  "trad-add-genai": {
    id: "trad-add-genai",
    title: "Add Generative AI",
    subtitle: "Generative Models",
    routeType: "traditional",
    colorTheme: "purple",
    phaseNum: "08-11",
    totalDuration: "35h 20m",
    lessonsCount: 98,
    description: "Bridge traditional ML into modern LLMs: tokenization, attention layers, GPT pretraining, and LoRA fine-tuning.",
    youWillBuild: "Custom GPT-style language model, tokenizer, and PEFT fine-tuning pipeline.",
    lessons: [
      { id: "GA-1", title: "Tokenization, Embeddings & Vector Spaces", duration: "20:45", type: "Learn", tech: "Python" },
      { id: "GA-2", title: "Building GPT Architecture with PyTorch", duration: "48:10", type: "Build", tech: "PyTorch" },
      { id: "GA-3", title: "Pretraining on Custom Web Datasets", duration: "42:30", type: "Build", tech: "PyTorch" },
      { id: "GA-4", title: "LoRA & QLoRA Parameter-Efficient Fine-Tuning", duration: "38:00", type: "Build", tech: "HuggingFace" },
      { id: "GA-5", title: "DPO & RLHF Alignment from Scratch", duration: "36:15", type: "Build", tech: "TRL" }
    ]
  },
  "trad-agentic-ai": {
    id: "trad-agentic-ai",
    title: "Learn Agentic AI",
    subtitle: "Autonomous Systems",
    routeType: "traditional",
    colorTheme: "orange",
    phaseNum: "12-17",
    totalDuration: "44h 50m",
    lessonsCount: 120,
    description: "Capstone integration: Advanced GraphRAG, autonomous reasoning agents, MCP servers, and multi-agent swarms.",
    youWillBuild: "Enterprise multi-agent software engineering squad with self-correcting GraphRAG.",
    lessons: [
      { id: "AG-1", title: "Vector Databases & Hybrid Dense-Sparse RAG", duration: "30:00", type: "Build", tech: "pgvector" },
      { id: "AG-2", title: "GraphRAG & Multi-Hop Query Routing", duration: "34:20", type: "Build", tech: "Neo4j" },
      { id: "AG-3", title: "ReAct Reasoning Loops & Tool Execution", duration: "38:40", type: "Build", tech: "LangGraph" },
      { id: "AG-4", title: "Building Production MCP Client & Servers", duration: "41:10", type: "Build", tech: "FastAPI" },
      { id: "AG-5", title: "Multi-Agent Orchestration with CrewAI & LangGraph", duration: "50:00", type: "Build", tech: "LangGraph" }
    ]
  },

  // ── MODERN ROUTE (CODE) ──
  "genai-first": {
    id: "genai-first",
    title: "Generative AI First",
    subtitle: "Modern Route",
    routeType: "modern-code",
    colorTheme: "purple",
    phaseNum: "08-10",
    totalDuration: "28h 15m",
    lessonsCount: 80,
    description: "Start straight with LLMs, prompt engineering, structured JSON outputs, function calling, and API routing.",
    youWillBuild: "Production-ready LLM applications with Pydantic contracts, streaming, and smart model routing.",
    lessons: [
      { id: "MOD-1", title: "LLM APIs, Structured Outputs & JSON Schemas", duration: "25:00", type: "Build", tech: "Pydantic" },
      { id: "MOD-2", title: "Context Engineering & Token Budget Optimization", duration: "22:15", type: "Learn", tech: "OpenAI" },
      { id: "MOD-3", title: "Function Calling & Dynamic Tool Schemas", duration: "29:30", type: "Build", tech: "FastAPI" },
      { id: "MOD-4", title: "In-Memory & Semantic Caching with Redis", duration: "24:45", type: "Build", tech: "Redis" },
      { id: "MOD-5", title: "Reliable LLM Output Parsing & Error Recovery", duration: "26:10", type: "Build", tech: "Python" }
    ]
  },
  "master-genai-llms": {
    id: "master-genai-llms",
    title: "Master Gen AI & LLMs",
    subtitle: "Advanced LLM Engineering",
    routeType: "modern-code",
    colorTheme: "purple",
    phaseNum: "09-12",
    totalDuration: "38h 40m",
    lessonsCount: 100,
    description: "Build custom RAG pipelines, fine-tune open weights with LoRA, and deploy high-throughput inference endpoints.",
    youWillBuild: "Enterprise RAG search engine with hybrid cross-encoder reranking and LoRA fine-tuned assistant.",
    lessons: [
      { id: "LLM-1", title: "Vector Chunking Strategies & Semantic Splitting", duration: "24:10", type: "Build", tech: "Python" },
      { id: "LLM-2", title: "Cross-Encoder Reranking & Hybrid BM25 Fusion", duration: "31:40", type: "Build", tech: "Qdrant" },
      { id: "LLM-3", title: "Fine-Tuning Llama 3 with Unsloth & QLoRA", duration: "42:00", type: "Build", tech: "Unsloth" },
      { id: "LLM-4", title: "vLLM High-Throughput Serving & Continuous Batching", duration: "35:15", type: "Deploy", tech: "Docker" }
    ]
  },
  "modern-add-agentic": {
    id: "modern-add-agentic",
    title: "Add Agentic AI",
    subtitle: "Autonomous Workflows",
    routeType: "modern-code",
    colorTheme: "orange",
    phaseNum: "14-17",
    totalDuration: "42h 10m",
    lessonsCount: 115,
    description: "Build agents that plan, execute code, query tools via MCP, and coordinate in hierarchical multi-agent teams.",
    youWillBuild: "Self-correcting coding and deep research agents with LangGraph state channels.",
    lessons: [
      { id: "MAG-1", title: "LangGraph State Channels & Graph Nodes", duration: "36:00", type: "Build", tech: "LangGraph" },
      { id: "MAG-2", title: "Building Custom MCP Tool Servers", duration: "32:15", type: "Build", tech: "FastAPI" },
      { id: "MAG-3", title: "Human-in-the-Loop Approval Intercepts", duration: "28:40", type: "Build", tech: "LangGraph" },
      { id: "MAG-4", title: "Supervisor-Worker Multi-Agent Orchestration", duration: "45:00", type: "Build", tech: "CrewAI" }
    ]
  },
  "learn-ds-fund": {
    id: "learn-ds-fund",
    title: "Learn DS Fundamentals",
    subtitle: "Complete The Circle",
    routeType: "modern-code",
    colorTheme: "blue",
    phaseNum: "01-04",
    totalDuration: "18h 30m",
    lessonsCount: 50,
    description: "Backfill mathematics, linear algebra, neural network architectures, and custom training loops.",
    youWillBuild: "Automatic differentiation engine and custom neural network backprop trainer.",
    lessons: [
      { id: "FND-1", title: "Matrix Math & Vector Operations for Tensors", duration: "22:00", type: "Learn", tech: "Python" },
      { id: "FND-2", title: "Building Autograd Engine from Scratch", duration: "35:10", type: "Build", tech: "PyTorch" },
      { id: "FND-3", title: "Loss Functions, Gradient Descent & AdamW", duration: "26:30", type: "Build", tech: "Python" }
    ]
  },

  // ── MODERN ROUTE (NO-CODE) ──
  "understanding-ai": {
    id: "understanding-ai",
    title: "Understanding AI",
    subtitle: "Foundations & Capabilities",
    routeType: "modern-nocode",
    colorTheme: "green",
    phaseNum: "NC-01",
    totalDuration: "6h 45m",
    lessonsCount: 16,
    description: "Understand model capabilities, prompt structuring, multimodal AI, token limits, and AI safety without code.",
    youWillBuild: "System prompts, dynamic workflow blueprints, and comprehensive evaluation matrices.",
    lessons: [
      { id: "NC-1", title: "Mental Model: How LLMs and Transformers Think", duration: "18:00", type: "Learn" },
      { id: "NC-2", title: "Advanced Prompting: Zero-Shot, Few-Shot & Chain-of-Thought", duration: "24:15", type: "Build" },
      { id: "NC-3", title: "Structured Prompt Frameworks & System Prompts", duration: "21:30", type: "Build" }
    ]
  },
  "ai-in-daily-life": {
    id: "ai-in-daily-life",
    title: "AI in Daily Life",
    subtitle: "Workflow Productivity",
    routeType: "modern-nocode",
    colorTheme: "green",
    phaseNum: "NC-02",
    totalDuration: "8h 15m",
    lessonsCount: 20,
    description: "Supercharge personal workflows using ChatGPT, Claude Projects, Cursor, Midjourney, and research tools.",
    youWillBuild: "Personal AI knowledge management and document synthesis pipelines.",
    lessons: [
      { id: "DL-1", title: "Building Custom GPTs & Claude Artifacts", duration: "20:00", type: "Build" },
      { id: "DL-2", title: "AI-Assisted Research & Knowledge Synthesis", duration: "25:10", type: "Build" },
      { id: "DL-3", title: "Multimodal Generation with Midjourney & ElevenLabs", duration: "22:40", type: "Build" }
    ]
  },
  "automations-n8n": {
    id: "automations-n8n",
    title: "Automations & n8n",
    subtitle: "No-Code Agentic Workflows",
    routeType: "modern-nocode",
    colorTheme: "green",
    phaseNum: "NC-03",
    totalDuration: "12h 30m",
    lessonsCount: 28,
    description: "Build autonomous workflows connecting Webhooks, Slack, Gmail, Notion, and AI models via n8n & Make.",
    youWillBuild: "Automated AI lead triage, customer support bot, and social media content generator.",
    lessons: [
      { id: "N8N-1", title: "Setting Up Self-Hosted n8n with Webhooks", duration: "25:00", type: "Build", tech: "n8n" },
      { id: "N8N-2", title: "Building AI Agents with n8n Vector Stores", duration: "32:00", type: "Build", tech: "n8n" },
      { id: "N8N-3", title: "Automated Multi-Step Email & Document Parser", duration: "28:15", type: "Build", tech: "n8n" }
    ]
  },
  "real-products-ai": {
    id: "real-products-ai",
    title: "Real Products Using AI",
    subtitle: "End-to-End Solutions",
    routeType: "modern-nocode",
    colorTheme: "green",
    phaseNum: "NC-04",
    totalDuration: "14h 50m",
    lessonsCount: 32,
    description: "Deploy customer-facing AI applications using Lovable, Bolt, v0, Supabase, and Stripe.",
    youWillBuild: "Fully monetized SaaS AI application with authentication, database, and payments.",
    lessons: [
      { id: "PRD-1", title: "Full-Stack AI Prototyping with v0 & Bolt.new", duration: "30:00", type: "Build" },
      { id: "PRD-2", title: "Connecting Supabase Database & Auth to AI", duration: "28:45", type: "Build", tech: "Supabase" },
      { id: "PRD-3", title: "Deploying and Monetizing Your AI Application", duration: "35:00", type: "Deploy", tech: "Stripe" }
    ]
  },

  // ── ADVANCED ROUTE ──
  "all-simultaneous": {
    id: "all-simultaneous",
    title: "All 3 Simultaneously",
    subtitle: "Advanced Route",
    routeType: "advanced",
    colorTheme: "orange",
    phaseNum: "00-30",
    totalDuration: "120h+",
    lessonsCount: 991,
    description: "Master Data Science, Generative AI, and Agentic Systems concurrently in a comprehensive parallel curriculum.",
    youWillBuild: "Enterprise-grade autonomous AI platforms, custom models, and production infrastructure.",
    lessons: [
      { id: "ADV-1", title: "Mathematics & Tensors to Neural Architecture", duration: "45:00", type: "Build", tech: "PyTorch" },
      { id: "ADV-2", title: "LLM Pretraining, PEFT LoRA & Alignment", duration: "50:00", type: "Build", tech: "PyTorch" },
      { id: "ADV-3", title: "GraphRAG & Autonomous Multi-Agent Swarms", duration: "55:00", type: "Build", tech: "LangGraph" },
      { id: "ADV-4", title: "Enterprise Safety Guardrails & Real-Time Voice AI", duration: "48:00", type: "Deploy", tech: "Docker" }
    ]
  },
  "comprehensive-ai-expert": {
    id: "comprehensive-ai-expert",
    title: "Comprehensive AI Expert",
    subtitle: "Full-Stack Mastery",
    routeType: "advanced",
    colorTheme: "orange",
    phaseNum: "30",
    totalDuration: "50h 00m",
    lessonsCount: 40,
    description: "The ultimate mastery proof: build and deploy full-stack autonomous AI company platforms at scale.",
    youWillBuild: "Autonomous AI Company Platform with orchestration, evaluation CI/CD, and Kubernetes clustering.",
    lessons: [
      { id: "EXP-1", title: "Full-Stack Enterprise Autonomous AI Platform", duration: "60:00", type: "Deploy", tech: "Kubernetes" },
      { id: "EXP-2", title: "Continuous LLM Evaluation & CI/CD Regression Tests", duration: "45:00", type: "Build", tech: "Ragas" },
      { id: "EXP-3", title: "Production Cluster Deployment on AWS & Docker", duration: "50:00", type: "Deploy", tech: "AWS" }
    ]
  }
};

export default function OverviewPage() {
  const [modalNode, setModalNode] = useState<PathNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);

  // Set optimal default zoom level on mobile so full diagram is visible
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        setZoomLevel(58); // Responsive initial fit on mobile
      } else if (window.innerWidth < 1024) {
        setZoomLevel(80);
      } else {
        setZoomLevel(100);
      }
    }
  }, []);

  const handleZoom = (type: "in" | "out" | "reset" | "fit") => {
    if (type === "in") setZoomLevel((prev) => Math.min(prev + 12, 160));
    if (type === "out") setZoomLevel((prev) => Math.max(prev - 12, 40));
    if (type === "reset") setZoomLevel(100);
    if (type === "fit") {
      if (typeof window !== "undefined" && window.innerWidth < 640) {
        setZoomLevel(55);
      } else {
        setZoomLevel(85);
      }
    }
  };

  const toggleLesson = (lessonId: string) => {
    setCompletedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }));
  };

  const getBadgeColor = (theme: PathNode["colorTheme"]) => {
    switch (theme) {
      case "blue":
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
      case "purple":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "green":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "orange":
      default:
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] dark:bg-[#121212] text-foreground font-sans flex flex-col antialiased selection:bg-primary/20 selection:text-primary" suppressHydrationWarning>
      {/* Global Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-4 sm:space-y-6">

        {/* ── Section Header Strip ── */}
        <div className="text-center max-w-3xl mx-auto px-2 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] sm:text-xs font-bold uppercase tracking-widest border border-primary/20 shadow-xs">
            <Compass className="w-3.5 h-3.5" />
            Interactive Learning Whiteboard
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            Choose Your <span className="text-primary italic">AI Journey</span>
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-light">
            An interactive infinite canvas. Drag freely to explore branches or use the zoom controls. Click any node to view lessons.
          </p>
        </div>

        {/* ── Floating Whiteboard Controls Bar ── */}
        <div className="sticky top-20 z-20 flex items-center justify-between gap-2 max-w-lg mx-auto bg-card/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-border/80 shadow-md font-mono text-xs select-none">
          
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Hand className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline font-sans text-xs font-medium">Pan & Zoom Canvas:</span>
            <span className="sm:hidden text-[11px] font-bold text-foreground">Canvas:</span>
          </div>

          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/60">
            <button
              onClick={() => handleZoom("out")}
              className="p-1.5 hover:bg-card rounded-lg text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleZoom("reset")}
              className="px-2 py-1 text-[11px] font-bold text-foreground hover:text-primary transition-colors cursor-pointer min-w-[48px] text-center"
              title="Reset Zoom"
            >
              {zoomLevel}%
            </button>

            <button
              onClick={() => handleZoom("in")}
              className="p-1.5 hover:bg-card rounded-lg text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => handleZoom("fit")}
            className="px-2.5 py-1.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-[11px] font-bold cursor-pointer"
          >
            Fit View
          </button>
        </div>

        {/* ── Main Whiteboard Canvas (Draggable / Zoomable) ── */}
        <div
          ref={containerRef}
          className="w-full rounded-3xl border-2 border-border/80 bg-[#FBF9F4] dark:bg-[#141414] shadow-lg relative overflow-hidden h-[75vh] sm:h-[82vh] touch-none cursor-grab active:cursor-grabbing select-none"
        >
          {/* Subtle Grid Dot Matrix Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#737373_1px,transparent_1px)] [background-size:22px_22px] opacity-15 pointer-events-none" />

          {/* Draggable & Scalable Canvas Layer */}
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.15}
            onDragStart={() => setIsPanning(true)}
            onDragEnd={() => setIsPanning(false)}
            animate={{ scale: zoomLevel / 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full min-w-[950px] p-6 sm:p-12 flex flex-col items-center origin-top cursor-grab active:cursor-grabbing"
          >
            <div className="w-full max-w-5xl relative z-10 flex flex-col items-center pb-16">

              {/* 1. START HERE (Top Pill Badge) */}
              <div className="flex flex-col items-center">
                <div className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#FF6B35] via-[#C45C26] to-[#E85D75] text-white font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-primary/25 select-none">
                  Start Here
                </div>
                <div className="w-0.5 h-6 bg-gradient-to-b from-[#C45C26] to-amber-500" />
                <div className="w-2.5 h-2.5 border-b-2 border-r-2 border-amber-500 transform rotate-45 -mt-1.5" />
              </div>

              {/* 2. CHOOSE YOUR PATH (Diamond Decision Node) */}
              <div className="my-4 relative flex items-center justify-center">
                {/* Outer Diamond */}
                <div className="w-32 h-32 border-2 border-amber-500/90 bg-card shadow-xl shadow-amber-500/10 transform rotate-45 rounded-2xl flex items-center justify-center transition-transform hover:scale-105" />
                
                {/* Inner Diamond Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none text-center px-2">
                  <span className="font-serif text-sm font-bold text-amber-600 dark:text-amber-400 leading-tight">
                    Choose <br /> Your Path
                  </span>
                </div>
              </div>

              {/* 3. Three Branching Connectors (SVG Curves) */}
              <div className="w-full relative mt-2 mb-6">
                <svg className="w-full h-20 overflow-visible" viewBox="0 0 900 80" fill="none">
                  {/* Left Branch (Traditional) */}
                  <path
                    d="M 450 0 C 450 40, 160 20, 160 75"
                    stroke="#0284C7"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                  />
                  {/* Center Branch (Modern) */}
                  <path
                    d="M 450 0 L 450 75"
                    stroke="#9333EA"
                    strokeWidth="2.5"
                  />
                  {/* Right Branch (Advanced) */}
                  <path
                    d="M 450 0 C 450 40, 740 20, 740 75"
                    stroke="#C45C26"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* Branch Badges */}
                <div className="absolute top-4 left-[20%] -translate-x-1/2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-xs font-mono font-bold">
                  Traditional
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-xs font-mono font-bold">
                  Modern
                </div>
                <div className="absolute top-4 left-[80%] -translate-x-1/2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 text-xs font-mono font-bold">
                  Advanced
                </div>
              </div>

              {/* 4. Three Main Route Columns */}
              <div className="w-full grid grid-cols-3 gap-8 items-start">

                {/* ── COLUMN 1: TRADITIONAL ROUTE (Left) ── */}
                <div className="flex flex-col items-center space-y-4">
                  {/* Node 1: Data Science First */}
                  <FlowNodeCard
                    node={FLOWCHART_NODES["ds-first"]}
                    onClick={() => setModalNode(FLOWCHART_NODES["ds-first"])}
                  />

                  <ConnectorArrow color="#0284C7" />

                  {/* Node 2: Master DS + ML + CV + NLP */}
                  <FlowNodeCard
                    node={FLOWCHART_NODES["master-ds-ml"]}
                    onClick={() => setModalNode(FLOWCHART_NODES["master-ds-ml"])}
                  />

                  <ConnectorArrow color="#0284C7" />

                  {/* Node 3: Add Generative AI */}
                  <FlowNodeCard
                    node={FLOWCHART_NODES["trad-add-genai"]}
                    onClick={() => setModalNode(FLOWCHART_NODES["trad-add-genai"])}
                  />

                  <ConnectorArrow color="#9333EA" />

                  {/* Node 4: Learn Agentic AI */}
                  <FlowNodeCard
                    node={FLOWCHART_NODES["trad-agentic-ai"]}
                    onClick={() => setModalNode(FLOWCHART_NODES["trad-agentic-ai"])}
                  />
                </div>

                {/* ── COLUMN 2: MODERN ROUTE (Center) ── */}
                <div className="flex flex-col items-center space-y-4">
                  {/* Node 1: Generative AI First */}
                  <FlowNodeCard
                    node={FLOWCHART_NODES["genai-first"]}
                    onClick={() => setModalNode(FLOWCHART_NODES["genai-first"])}
                  />

                  {/* Sub-Branching Splitter: Code vs No-Code */}
                  <div className="w-full flex flex-col items-center my-1">
                    <div className="w-0.5 h-4 bg-purple-500" />
                    <div className="flex items-center justify-between w-full max-w-[260px] px-2 text-xs font-mono font-bold">
                      <span className="text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-md border border-purple-500/20">
                        Code
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                        No-Code
                      </span>
                    </div>
                  </div>

                  {/* Sub-Grid for Code & No-Code */}
                  <div className="w-full grid grid-cols-2 gap-4 items-start">
                    
                    {/* Code Track */}
                    <div className="flex flex-col items-center space-y-4">
                      <FlowNodeCard
                        node={FLOWCHART_NODES["master-genai-llms"]}
                        onClick={() => setModalNode(FLOWCHART_NODES["master-genai-llms"])}
                        compact
                      />
                      <ConnectorArrow color="#9333EA" />
                      <FlowNodeCard
                        node={FLOWCHART_NODES["modern-add-agentic"]}
                        onClick={() => setModalNode(FLOWCHART_NODES["modern-add-agentic"])}
                        compact
                      />
                      <ConnectorArrow color="#C45C26" />
                      <FlowNodeCard
                        node={FLOWCHART_NODES["learn-ds-fund"]}
                        onClick={() => setModalNode(FLOWCHART_NODES["learn-ds-fund"])}
                        compact
                      />
                    </div>

                    {/* No-Code Track */}
                    <div className="flex flex-col items-center space-y-4">
                      <FlowNodeCard
                        node={FLOWCHART_NODES["understanding-ai"]}
                        onClick={() => setModalNode(FLOWCHART_NODES["understanding-ai"])}
                        compact
                      />
                      <ConnectorArrow color="#10B981" />
                      <FlowNodeCard
                        node={FLOWCHART_NODES["ai-in-daily-life"]}
                        onClick={() => setModalNode(FLOWCHART_NODES["ai-in-daily-life"])}
                        compact
                      />
                      <ConnectorArrow color="#10B981" />
                      <FlowNodeCard
                        node={FLOWCHART_NODES["automations-n8n"]}
                        onClick={() => setModalNode(FLOWCHART_NODES["automations-n8n"])}
                        compact
                      />
                      <ConnectorArrow color="#10B981" />
                      <FlowNodeCard
                        node={FLOWCHART_NODES["real-products-ai"]}
                        onClick={() => setModalNode(FLOWCHART_NODES["real-products-ai"])}
                        compact
                      />
                    </div>

                  </div>
                </div>

                {/* ── COLUMN 3: ADVANCED ROUTE (Right) ── */}
                <div className="flex flex-col items-center space-y-4">
                  {/* Node 1: All 3 Simultaneously */}
                  <FlowNodeCard
                    node={FLOWCHART_NODES["all-simultaneous"]}
                    onClick={() => setModalNode(FLOWCHART_NODES["all-simultaneous"])}
                  />

                  <ConnectorArrow color="#C45C26" />

                  {/* Parallel Container Card */}
                  <div className="w-full rounded-2xl border-2 border-amber-500/60 bg-amber-500/5 p-4 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-600 dark:text-amber-400 border-b border-amber-500/20 pb-2">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        ALL 3 IN PARALLEL
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-card border border-sky-500/40 text-xs font-semibold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                        <span>Data Science + ML</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-card border border-purple-500/40 text-xs font-semibold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                        <span>Gen AI + LLMs</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-card border border-amber-500/40 text-xs font-semibold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span>Agentic AI Systems</span>
                      </div>
                    </div>
                  </div>

                  <ConnectorArrow color="#C45C26" />

                  {/* Final Node: Comprehensive AI Expert */}
                  <FlowNodeCard
                    node={FLOWCHART_NODES["comprehensive-ai-expert"]}
                    onClick={() => setModalNode(FLOWCHART_NODES["comprehensive-ai-expert"])}
                  />
                </div>

              </div>

            </div>
          </motion.div>

          {/* Canvas Floating Hint in Bottom Left */}
          <div className="absolute bottom-3 left-3 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-border text-[11px] font-mono text-muted-foreground flex items-center gap-1.5 pointer-events-none">
            <Move className="w-3.5 h-3.5 text-primary" />
            <span>Drag canvas · Click any box</span>
          </div>
        </div>

        {/* ── Interactive Lesson Syllabus Modal (Popup) ── */}
        <AnimatePresence>
          {modalNode && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
              {/* Animated Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalNode(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="relative z-10 w-full max-w-2xl bg-card rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
              >
                {/* Modal Header */}
                <div className="p-5 sm:p-7 border-b border-border/70 bg-muted/20 relative">
                  <button
                    onClick={() => setModalNode(null)}
                    className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold">
                    <span className={cn("px-2.5 py-0.5 rounded-md border uppercase", getBadgeColor(modalNode.colorTheme))}>
                      {modalNode.subtitle}
                    </span>
                    <span className="text-muted-foreground font-semibold">
                      Phase {modalNode.phaseNum}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                    {modalNode.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                    {modalNode.description}
                  </p>

                  {/* You'll Build highlight */}
                  <div className="mt-3 p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-2.5">
                    <Target className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground/90 font-medium leading-snug">
                      <strong className="text-primary font-semibold">You&apos;ll Build: </strong>
                      {modalNode.youWillBuild}
                    </p>
                  </div>

                  {/* Stats strip */}
                  <div className="mt-3 flex items-center gap-3 text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {modalNode.totalDuration}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-primary" />
                      {modalNode.lessonsCount} Total Lessons
                    </span>
                  </div>
                </div>

                {/* Lessons Scroll List */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-2.5">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Featured Syllabus Lessons:
                  </div>

                  {modalNode.lessons.map((lesson) => {
                    const isDone = !!completedLessons[lesson.id];
                    const lessonHref = `/lesson?title=${encodeURIComponent(lesson.title)}&lesson=${encodeURIComponent(lesson.id)}&tech=${encodeURIComponent(lesson.tech || "")}&type=${encodeURIComponent(lesson.type || "")}`;

                    return (
                      <div
                        key={lesson.id}
                        className={cn(
                          "group/item p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 select-none",
                          isDone
                            ? "bg-emerald-500/10 border-emerald-500/30 text-foreground"
                            : "bg-background border-border/80 hover:border-primary/50 hover:bg-muted/40 text-foreground"
                        )}
                      >
                        {/* Checkbox toggle */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLesson(lesson.id);
                          }}
                          className={cn(
                            "w-5 h-5 rounded-lg border flex items-center justify-center transition-colors shrink-0 cursor-pointer",
                            isDone
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "border-border text-transparent hover:border-primary hover:text-primary/30"
                          )}
                          title={isDone ? "Mark as uncompleted" : "Mark as completed"}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>

                        {/* Clickable Lesson Link */}
                        <Link
                          href={lessonHref}
                          className="min-w-0 flex-1 flex items-center justify-between gap-3 group/link"
                        >
                          <div className="min-w-0">
                            <span className={cn("text-xs font-bold leading-snug truncate block group-hover/link:text-primary transition-colors", isDone && "line-through opacity-70")}>
                              {lesson.title}
                            </span>
                            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground mt-0.5">
                              <span className="text-primary font-semibold">{lesson.id}</span>
                              {lesson.tech && (
                                <>
                                  <span>·</span>
                                  <span>{lesson.tech}</span>
                                </>
                              )}
                              <span>·</span>
                              <span>{lesson.duration}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground group-hover/link:bg-primary/10 group-hover/link:text-primary transition-colors">
                              {lesson.type}
                            </span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover/link:text-primary group-hover/link:translate-x-0.5 transition-all" />
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>

                {/* Modal Footer CTA */}
                <div className="p-4 sm:px-6 border-t border-border/60 bg-muted/20 flex items-center justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setModalNode(null)}
                    className="text-xs rounded-xl"
                  >
                    Close
                  </Button>

                  <Link href="/#curriculum">
                    <Button className="bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-xl gap-2 shadow-md">
                      <span>Explore Full 30-Module Curriculum</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── Bottom Reference Footer ── */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <div>
            AI ENGINEERING FROM SCRATCH · OPEN SOURCE · FREE FOREVER.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground transition-colors">HOME</Link>
            <a href="https://github.com/techtalks02" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GITHUB</a>
            <Link href="/#curriculum" className="hover:text-foreground transition-colors">CURRICULUM</Link>
            <Link href="/glossary" className="hover:text-foreground transition-colors">GLOSSARY</Link>
          </div>
        </div>

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

// ── Flowchart Node Card Component ──
function FlowNodeCard({
  node,
  onClick,
  compact
}: {
  node: PathNode;
  onClick: () => void;
  compact?: boolean;
}) {
  const getBorderColor = (theme: PathNode["colorTheme"]) => {
    switch (theme) {
      case "blue": return "border-sky-500/50 hover:border-sky-500 hover:shadow-sky-500/20";
      case "purple": return "border-purple-500/50 hover:border-purple-500 hover:shadow-purple-500/20";
      case "green": return "border-emerald-500/50 hover:border-emerald-500 hover:shadow-emerald-500/20";
      case "orange":
      default: return "border-amber-500/50 hover:border-amber-500 hover:shadow-amber-500/20";
    }
  };

  const getTextColor = (theme: PathNode["colorTheme"]) => {
    switch (theme) {
      case "blue": return "text-sky-600 dark:text-sky-400";
      case "purple": return "text-purple-600 dark:text-purple-400";
      case "green": return "text-emerald-600 dark:text-emerald-400";
      case "orange":
      default: return "text-amber-600 dark:text-amber-400";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border-2 bg-card/95 backdrop-blur-md p-4 text-center cursor-pointer shadow-sm transition-all duration-200 select-none relative group",
        getBorderColor(node.colorTheme),
        compact ? "py-3 px-3" : "py-4 px-4"
      )}
    >
      <h4 className={cn("font-serif font-bold leading-tight transition-colors", compact ? "text-xs sm:text-sm" : "text-sm sm:text-base", getTextColor(node.colorTheme))}>
        {node.title}
      </h4>

      <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
        {node.subtitle}
      </p>

      <div className="mt-2 pt-2 border-t border-border/40 flex items-center justify-center gap-1 text-[10px] font-mono font-bold text-muted-foreground group-hover:text-primary transition-colors">
        <span>OPEN ROADMAP</span>
        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </motion.div>
  );
}

// ── Downward Connector Arrow Helper ──
function ConnectorArrow({ color }: { color: string }) {
  return (
    <div className="flex flex-col items-center my-0.5">
      <div className="w-0.5 h-5" style={{ backgroundColor: color }} />
      <div
        className="w-2 h-2 border-b-2 border-r-2 transform rotate-45 -mt-1"
        style={{ borderColor: color }}
      />
    </div>
  );
}
