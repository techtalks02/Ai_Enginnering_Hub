"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Search,
  Clock,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  PlayCircle,
  AlertCircle,
  Lock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Fallback high-quality mock courses if the database is empty
const MOCK_COURSES = [
  {
    id: "m-00000000-0000-0000-0000-000000000001",
    slug: "python-ai-foundations",
    title: "Python for AI Foundations",
    short_description: "Master clean object-oriented Python, asynchronous programming patterns, and Pydantic validation for robust LLM applications.",
    description: "Go from python basics to production-ready scripts. Learn types, asyncio concurrency, and structured schemas.",
    thumbnail_url: null,

    price: 2499,
    difficulty: "Beginner",
    duration_hours: 12,
    tags: ["Python", "AsyncIO", "Pydantic"]
  },
  {
    id: "m-00000000-0000-0000-0000-000000000002",
    slug: "advanced-rag-systems",
    title: "Advanced RAG Systems",
    short_description: "Build state-of-the-art Retrieval Augmented Generation pipelines incorporating hybrid index searches, rerankers, and Ragas metrics.",
    description: "Learn chunking strategies, vector index layouts, metadata filters, and evaluation frameworks for accurate response grounding.",
    thumbnail_url: null,
    is_free: true,
    price: 0,
    difficulty: "Intermediate",
    duration_hours: 18,
    tags: ["RAG", "Pinecone", "Reranking"]
  },
  {
    id: "m-00000000-0000-0000-0000-000000000003",
    slug: "multi-agent-mcp",
    title: "Multi-Agent Orchestration & MCP",
    short_description: "Orchestrate agent teams utilizing Supervisor-worker loops, CrewAI workflows, and tool calling via the Model Context Protocol.",
    description: "Build autonomous multi-agent networks that coordinate, share context, call local tool servers, and execute tasks self-correctively.",
    thumbnail_url: null,
    is_free: true,
    price: 0,
    difficulty: "Advanced",
    duration_hours: 24,
    tags: ["Agents", "MCP", "LangGraph"]
  },
  {
    id: "m-00000000-0000-0000-0000-000000000004",
    slug: "llmops-cloud-deployment",
    title: "LLMOps & Cloud Deployment",
    short_description: "Package, evaluate, deploy, and scale large language model servers in Kubernetes with serverless GPU inference providers.",
    description: "Implement continuous evaluation, prompt version controls, semantic caching, rate limiting, and cloud scaling policies.",
    thumbnail_url: null,
    is_free: true,
    price: 0,
    difficulty: "Advanced",
    duration_hours: 14,
    tags: ["LLMOps", "Docker", "Modal"]
  }
];

const COURSE_IMAGES: Record<string, string> = {
  "python-ai-foundations": "/assets/python_essentials_cover.png",
  "advanced-rag-systems": "/assets/advanced_rag_cover.png",
  "multi-agent-mcp": "/assets/multi_agent_cover.png",
  "llmops-cloud-deployment": "/assets/llmops_cover.png"
};

const COURSE_PRICING: Record<string, { original: string; price: string; discount: string; buyLink: string }> = {
  "python-ai-foundations": { original: "₹1,599", price: "₹599", discount: "62% OFF", buyLink: "https://superprofile.bio/vp/ai-engineer--zero-to-production" },
  "advanced-rag-systems": { original: "₹4,999", price: "₹2,999", discount: "40% OFF", buyLink: "https://superprofile.bio/vp/ai-agent-handnotes" },
  "multi-agent-mcp": { original: "₹4,999", price: "₹2,999", discount: "40% OFF", buyLink: "https://superprofile.bio/vp/ai-agent-handnotes" },
  "llmops-cloud-deployment": { original: "₹4,999", price: "₹2,999", discount: "40% OFF", buyLink: "https://superprofile.bio/vp/ai-agent-handnotes" }
};

const CURRICULUM = [
  {
    id: "00",
    title: "Python Fundamentals",
    description: "The Python you actually need before touching an LLM — from Colab setup to file handling.",
    build: "Command your Python basics: data structures, control flow, functions & file I/O",
    lessons: [
      "Google Colab Tutorial: Step-by-Step Guide for Beginners",
      "Keywords, Identifiers & Comments",
      "Indentation, Statements & Variables",
      "Data Types vs Data Structures Explained",
      "Numeric Data Types & Strings",
      "Lists in Python: Methods & Manipulation",
      "Tuples in Python: Mastering Immutable Data Structures",
      "Sets in Python: Methods & Manipulations",
      "Dictionaries in Python: Methods & Manipulation",
      "Advanced Dict & Lists comprehensions"
    ]
  },
  {
    id: "01",
    title: "Build a Full Working Agent",
    description: "Get hands-on immediately. Build a fully functional single-loop AI agent from scratch using basic API calls.",
    build: "Your first custom agent that resolves multi-step math and web search queries.",
    lessons: [
      "Introduction to AI Agents & Agent Architecture",
      "Setting Up LLM APIs (OpenAI, Gemini & Claude)",
      "System Prompts, Roles & Message Architecture",
      "Understanding the Agent Loop (Think → Act → Observe)",
      "Prompt Engineering for AI Agents",
      "Tool Calling & Function Calling",
      "Building Custom Tools & API Integrations",
      "Maintaining Conversation Context & Memory",
      "Error Handling, Retry Logic & Recovery Loops",
      "Build & Deploy Your First Production AI Agent"


    ]
  },
  {
    id: "02",
    title: "NLP Basics, Intuition-First",
    description: "Build an intuitive foundation of natural language processing concepts without complex math.",
    build: "A custom tf-idf text classifier and semantic similarity search script.",
    lessons: [
      "Introduction to Natural Language Processing (NLP)",
      "Text Preprocessing & Cleaning",
      "Tokenization, Vocabulary & Text Representation",
      "Bag of Words (BoW) & N-Gram Models",
      "TF-IDF Vectorization",
      "Cosine Similarity & Semantic Search",
      "Word Embeddings (Word2Vec, GloVe & FastText)",
      "Sentence Embeddings & Transformer Embeddings",
      "Named Entity Recognition (NER), POS Tagging & Text Classification",
      "Build a Semantic Search & Text Classification Application"

    ]
  },
  {
    id: "03",
    title: "LLMs: Internals, Parameters, Benchmarking & Cost",
    description: "Learn how modern LLMs are structured, how configuration parameters alter outputs, and how to optimize cost.",
    build: "A dynamic model playground that compares generation speed, costs, and token counts.",
    lessons: [
      "Introduction to Large Language Models (LLMs)",
      "Transformer Architecture & Self-Attention",
      "Embeddings, Tokens & Context Windows",
      "Inference Parameters (Temperature, Top-K, Top-P, Penalties)",
      "System Prompts, User Prompts & Response Generation",
      "Tokenization, Token Counting & Context Management",
      "Comparing GPT, Claude, Gemini, Llama & Open-Source Models",
      "Model Benchmarking, Evaluation Metrics & Latency Analysis",
      "Cost Optimization, Rate Limits & Performance Tuning",
      "Build an Interactive LLM Playground & Benchmark Dashboard"
    ]
  },
  {
    id: "04",
    title: "Prompt Engineering",
    description: "Go beyond basic prompts. Master zero-shot, few-shot, Chain-of-Thought, and structured output parsing.",
    build: "A structured prompt template engine that extracts JSON schemas reliably.",
    lessons: [
      "Prompt Engineering Fundamentals & Prompt Anatomy",
      "System, User & Assistant Prompts",
      "Zero-Shot, One-Shot & Few-Shot Prompting",
      "Chain of Thought (CoT), Self-Consistency & Tree of Thoughts",
      "ReAct (Reasoning + Acting) Prompting",
      "Prompt Chaining & Multi-Step Workflows",
      "Structured Outputs (JSON Mode, Function Calling & Schema Validation)",
      "Prompt Optimization, Testing & Versioning",
      "Prompt Injection, Jailbreak Prevention & AI Safety",
      "Build a Production-Ready Prompt Template Engine"
    ]
  },
  {
    id: "05",
    title: "Foundations of Agentic Systems",
    description: "Understand the core architecture of agents: planning, tools, memory, and execution loops.",
    build: "A modular single-agent system with registry-based tool execution.",
    lessons: [
      "Introduction to Agentic AI & Agent Architecture",
      "The Agent Loop (Think → Plan → Act → Observe)",
      "Task Planning, Decomposition & Decision Making",
      "Tool Registry, Tool Specifications & Function Calling",
      "Dynamic Tool Selection & Intelligent Execution",
      "Agent State Management & Context Handling",
      "Execution Loops, Reflection & Self-Correction",
      "Error Handling, Retries & Recovery Strategies",
      "Logging, Tracing & Debugging Agent Workflows",
      "Build a Production-Ready Modular AI Agent"
    ]
  },
  {
    id: "06",
    title: "RAG — Retrieval-Augmented Generation",
    description: "Connect LLMs to external data sources. Master document chunking, vector indexing, and hybrid retrieval.",
    build: "A production-ready RAG pipeline that answers queries over PDF files.",
    lessons: [
      "Introduction to RAG & Production RAG Architecture",
      "Document Ingestion, Parsing & Data Preprocessing",
      "Chunking Strategies (Fixed, Recursive, Semantic & Parent-Child)",
      "Embedding Models & Vector Databases (FAISS, Chroma, Pinecone, Qdrant)",
      "Indexing, Metadata Management & Vector Storage",
      "Retrieval Strategies (Dense, Sparse, Hybrid & Multi-Query Search)",
      "Reranking, Context Compression & Query Transformation",
      "Response Generation, Prompt Augmentation & Source Citations",
      "Evaluating RAG Systems (Faithfulness, Relevance & Hallucination Detection)",
      "Build a Production-Ready Enterprise RAG System"
    ]
  },
  {
    id: "07",
    title: "MCP — Model Context Protocol",
    description: "Master the Model Context Protocol (MCP) to seamlessly connect AI agents to local and remote tool servers.",
    build: "A custom MCP client that queries local file paths and database servers.",
    lessons: [
      "Introduction to MCP & MCP Architecture",
      "MCP Clients, Servers, Hosts & Communication Flow",
      "Working with Standard MCP Servers (Filesystem, PostgreSQL, GitHub, Brave Search)",
      "Building Custom MCP Servers with Python & TypeScript",
      "Creating MCP Tools, Resources & Prompt Templates",
      "Session Management, Context Handling & Tool Discovery",
      "Authentication, Authorization & Permission Management",
      "Connecting AI Agents to External APIs, Databases & Local Resources",
      "Debugging, Testing & Deploying Production MCP Servers",
      "Build a Production-Ready MCP Ecosystem for AI Agents"
    ]
  },
  {
    id: "08",
    title: "Memory & Optimization",
    description: "Give your agents short-term and long-term memory. Optimize token usage and context window consumption.",
    build: "An agent chat interface with summarization and vector-backed episodic memory.",
    lessons: [
      "Introduction to AI Memory & Memory Architectures",
      "Short-Term Memory, Long-Term Memory & Episodic Memory",
      "Conversation History, Context Windows & State Management",
      "Persistent Memory using Vector Databases & SQL Databases",
      "Semantic Search, Memory Retrieval & Personalization",
      "Conversation Summarization & Context Compression",
      "Semantic Caching & Token Cost Optimization",
      "Entity Memory, User Profiles & Preference Tracking",
      "Memory Evaluation, Retrieval Accuracy & Performance Optimization",
      "Build a Production-Ready Memory System for AI Agents"
    ]
  },
  {
    id: "09",
    title: "State Machines & DAGs (LangGraph)",
    description: "Build robust, deterministic agentic workflows using Directed Acyclic Graphs (DAGs) and state machine libraries like LangGraph.",
    build: "A complex multi-step user onboarding flow with conditional routing.",
    lessons: [
      "Introduction to LangGraph, Graphs, Nodes & Edges",
      "State Management, Shared State & Agent Context",
      "Building Stateful Agent Workflows with LangGraph",
      "Conditional Routing, Branching & Dynamic Decision Making",
      "Parallel Execution, Subgraphs & Workflow Composition",
      "Human-in-the-Loop, Interrupts & Approval Workflows",
      "Persistence, Checkpointing, Time Travel & State Recovery",
      "Multi-Agent Workflows & Agent Collaboration using LangGraph",
      "Debugging, Visualization & Production Best Practices",
      "Build a Production-Ready LangGraph AI Workflow"
    ]
  },
  {
    id: "10",
    title: "Evaluation",
    description: "Measure the performance of your LLM applications using automated evaluations, test sets, and feedback loops.",
    build: "An automated evaluation script running ragas metrics over test samples.",
    lessons: [
      "Introduction to AI Evaluation & Benchmarking",
      "Creating Golden Datasets & Test Suites",
      "LLM-as-a-Judge (G-Eval) & Human Evaluation",
      "RAG Evaluation (Faithfulness, Relevance, Precision & Recall)",
      "Agent Evaluation & Task Success Metrics",
      "Hallucination Detection & Response Validation",
      "Prompt Regression Testing & Version Comparison",
      "Continuous Evaluation with CI/CD Pipelines",
      "Monitoring, Error Analysis & Performance Optimization",
      "Build a Production-Ready AI Evaluation Framework"
    ]
  },
  {
    id: "11",
    title: "Multi-Agent Orchestration",
    description: "Scale from single agents to multi-agent architectures using supervisor, hierarchical, and collaborative designs.",
    build: "A virtual software development team: supervisor agent distributing tasks to developer and QA agents.",
    lessons: [
      "Introduction to Multi-Agent Systems & Architecture",
      "Supervisor, Hierarchical & Collaborative Agent Patterns",
      "Agent Communication, Messaging & Context Sharing",
      "Task Planning, Routing & Intelligent Delegation",
      "Shared Memory, State Management & Knowledge Transfer",
      "Specialized Agents (Planner, Researcher, Developer, Reviewer & QA)",
      "Parallel Execution, Synchronization & Workflow Coordination",
      "Conflict Resolution, Loop Prevention & Failure Recovery",
      "Scaling, Monitoring & Optimizing Multi-Agent Systems",
      "Build a Production-Ready Multi-Agent AI Team"
    ]
  },
  {
    id: "12",
    title: "Security & Guardrails",
    description: "Secure your AI applications against prompt injection, data leaks, jailbreaks, and unsafe generations.",
    build: "A secure API gateway filtering inputs/outputs using LlamaGuard and NeMo guardrails.",
    lessons: [
      "Introduction to AI Security & OWASP Top 10 for LLM Applications",
      "Prompt Injection, Jailbreak Attacks & Defense Strategies",
      "Input Validation, Sanitization & Threat Detection",
      "PII Detection, Data Privacy & Sensitive Information Protection",
      "Authentication, Authorization & Secure Tool Access",
      "Output Moderation, Toxicity Filtering & Hallucination Prevention",
      "Guardrail Frameworks (Llama Guard, NeMo Guardrails & Guardrails AI)",
      "Secure Agent Design, Tool Permissions & Sandbox Execution",
      "Monitoring, Auditing & Incident Response for AI Systems",
      "Build a Production-Ready Secure AI Gateway"
    ]
  },
  {
    id: "13",
    title: "Deployment (incl. FastAPI)",
    description: "Deploy your agentic applications to cloud servers with production-ready REST APIs using FastAPI.",
    build: "A Dockerized FastAPI backend hosting a background task queue for agents.",
    lessons: [
      "Building REST APIs with FastAPI for AI Applications",
      "Synchronous vs Asynchronous APIs & Streaming Responses (SSE/WebSockets)",
      "Authentication, Authorization, JWT & API Security",
      "Background Tasks, Queues & Scheduling (Celery, Redis & Workers)",
      "Database Integration (PostgreSQL, Supabase & ORM)",
      "Docker, Docker Compose & Containerized AI Applications",
      "Environment Variables, Configuration & Secrets Management",
      "Cloud Deployment (AWS, Azure, GCP, Railway, Render & Vercel)",
      "CI/CD, Scaling, Load Balancing & Production Best Practices",
      "Build & Deploy a Production-Ready AI Agent Backend"
    ]
  },
  {
    id: "14",
    title: "Monitoring & Operations",
    description: "Gain complete observability into production LLM apps. Track latencies, token usage, errors, and user feedback.",
    build: "Integration of Langfuse/LangSmith tracing into your agentic pipelines.",
    lessons: [
      "Introduction to AI Observability & Production Operations",
      "Tracing AI Workflows with LangSmith, Langfuse & OpenTelemetry",
      "Logging, Debugging & End-to-End Request Tracking",
      "Monitoring Latency, Throughput & Response Performance",
      "Token Usage, API Costs & Resource Optimization",
      "Collecting User Feedback & AI Quality Metrics",
      "Error Monitoring, Alerting & Incident Management",
      "Prompt Analytics, Model Performance & A/B Testing",
      "Production Dashboards, Reporting & Continuous Optimization",
      "Build a Production-Ready AI Monitoring & Observability Platform"
    ]
  },
  {
    id: "15",
    title: "Capstone Pro",
    description: "Synthesize all learned techniques into a comprehensive, production-grade AI enterprise product.",
    build: "A full-stack, enterprise-grade AI system featuring multi-agent coordination, RAG, safety, and cloud deployment.",
    lessons: [
      "Enterprise AI Customer Support Platform",
      "AI HR Recruitment & Interview Assistant",
      "AI Sales & CRM Copilot",
      "AI Financial Research & Investment Analyst",
      "Medical AI Assistant with RAG",
      "Legal Document Intelligence Platform",
      "AI Software Development Team (Multi-Agent)",
      "AI Data Analyst & Business Intelligence Agent",
      "Enterprise Knowledge Management System",
      "AI Research Assistant with Web Search & Citations",
      "AI Email & Meeting Assistant",
      "Autonomous Coding Assistant",
      "AI Content Creation & Marketing Platform",
      "AI Workflow Automation Platform",
      "AI Customer Success & Ticket Resolution Agent",
      "AI Personal Productivity Assistant",
      "AI Learning & Tutoring Platform",
      "AI Resume Screening & Talent Matching System",
      "AI Cybersecurity Incident Response Assistant",
      "Production-Ready AI SaaS Platform (Final Capstone)"
    ]
  }
];

export default function CoursesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  // Local state to simulate mock enrollments for outstanding UX when DB is clean
  const [localEnrollments, setLocalEnrollments] = useState<Record<string, { progress: number; completed: boolean }>>({});

  // Query states
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyTab, setDifficultyTab] = useState("All"); // "All" | "Beginner" | "Intermediate" | "Advanced"
  const [statusTab, setStatusTab] = useState("All"); // "All" | "Enrolled" | "Not Enrolled"
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  // Fetch courses from backend
  const { data: dbCourses, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => api.get("/courses?page_size=100").then((r) => r.data),
  });

  // Fetch user enrollments (only if authenticated)
  const { data: dbEnrollments, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: () => api.get("/courses/enrollments/me").then((r) => r.data),
    enabled: isAuthenticated,
  });

  // Enroll mutation
  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => api.post(`/courses/${courseId}/enroll`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });

  // Determine active courses list: fallback to MOCK if DB is empty or fails
  const rawCoursesList = dbCourses?.items && dbCourses.items.length > 0 ? dbCourses.items : MOCK_COURSES;

  // Handles enrollment click
  const handleEnroll = async (courseId: string) => {
    // Check if it is a mock course
    if (courseId.startsWith("m-")) {
      // Simulate local enrollment state
      setLocalEnrollments((prev) => ({
        ...prev,
        [courseId]: { progress: 0, completed: false }
      }));
      return;
    }

    try {
      await enrollMutation.mutateAsync(courseId);
    } catch (err) {
      console.error("Enrollment failed:", err);
    }
  };

  // Check enrollment details for a specific course
  const getEnrollmentInfo = (courseId: string) => {
    if (courseId.startsWith("m-")) {
      return localEnrollments[courseId] || null;
    }

    const matched = dbEnrollments?.find((e: { course_id: string }) => e.course_id === courseId);
    if (!matched) return null;

    return {
      progress: Number(matched.progress_percent),
      completed: matched.completed,
    };
  };

  const activeModule = CURRICULUM[activeModuleIndex];

  // Filter courses based on user criteria
  const filteredCourses = rawCoursesList.filter((course: any) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.short_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty =
      difficultyTab === "All" ||
      course.difficulty?.toLowerCase() === difficultyTab.toLowerCase();

    const enrollmentInfo = getEnrollmentInfo(course.id);
    const matchesStatus =
      statusTab === "All" ||
      (statusTab === "Enrolled" && enrollmentInfo !== null) ||
      (statusTab === "Not Enrolled" && enrollmentInfo === null);

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const isLoading = coursesLoading || (isAuthenticated && enrollmentsLoading);

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-2 relative">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 -translate-y-12 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Banner */}
      <div className="relative rounded-3xl border border-border/40 p-8 sm:p-12 overflow-hidden bg-card/60 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="space-y-4 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Learning Path</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
            Explore our expert-led <br />
            <span className="text-primary italic">AI Courses.</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Gain production-grade engineering skills. Build multi-agent networks, design scalable RAG retrieval services, and orchestrate serverless model pipelines.
          </p>
        </div>
        <div className="h-40 w-40 shrink-0 bg-primary/10 rounded-2xl flex items-center justify-center text-primary z-10 border border-primary/20 shadow-inner">
          <BookOpen className="w-16 h-16 animate-pulse" />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border border-border/40 p-6 rounded-2xl bg-card/40 backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses, tags, concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/60 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Difficulty tabs */}
          <div className="flex bg-muted/65 p-1 rounded-xl border border-border/40">
            {["All", "Beginner", "Intermediate", "Advanced"].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyTab(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${difficultyTab === diff
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Status filter (only logged in) */}
          {isAuthenticated && (
            <div className="flex bg-muted/65 p-1 rounded-xl border border-border/40">
              {["All", "Enrolled", "Not Enrolled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusTab(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${statusTab === status
                    ? "bg-secondary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-border/40 h-64 animate-pulse">
              <CardHeader className="space-y-2 h-1/2">
                <div className="h-4 w-24 bg-muted rounded-full" />
                <div className="h-6 w-48 bg-muted rounded-full" />
              </CardHeader>
              <CardContent className="h-1/2 flex items-end">
                <div className="h-10 w-full bg-muted rounded-xl" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border/60 rounded-3xl bg-muted/10 space-y-4 max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-muted-foreground/45 mx-auto" />
          <div>
            <h3 className="font-serif text-lg font-bold">No courses found</h3>
            <p className="text-muted-foreground text-xs mt-1">Try adjusting your filters or search keywords.</p>
          </div>
          <Button size="sm" onClick={() => { setSearchQuery(""); setDifficultyTab("All"); setStatusTab("All"); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredCourses.map((course: any) => {
            const enrollInfo = getEnrollmentInfo(course.id);
            const imageUrl = COURSE_IMAGES[course.slug] || "/assets/website-banner.png";
            const pricing = COURSE_PRICING[course.slug] || { original: "₹1,999", price: "Free", discount: "100% OFF" };

            return (
              <Card
                key={course.id}
                className="group rounded-3xl border border-border/60 bg-card/45 p-6 flex flex-col justify-between backdrop-blur-md hover:border-primary/50 hover:bg-card/75 transition-all shadow-md hover:shadow-xl duration-300 relative overflow-hidden"
              >
                <div>
                  {/* Thumbnail Cover Image */}
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-muted border border-border/30 mb-5 relative group-hover:scale-[1.01] transition-transform duration-300">
                    <img
                      src={imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Metadata: Difficulty & Duration */}
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider",
                      course.difficulty?.toLowerCase() === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        course.difficulty?.toLowerCase() === 'intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'
                    )}>
                      {course.difficulty}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1 font-semibold uppercase">
                      <Clock className="w-3.5 h-3.5" /> {course.duration_hours} Hours
                    </span>
                  </div>

                  {/* Course Text Details */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-6">
                    {course.short_description}
                  </p>

                  {/* Tag List */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {course.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[9px] font-bold tracking-wider font-mono bg-muted/80 rounded-md text-muted-foreground/90 uppercase border border-border/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Enrollment Progress Indicator */}
                  {enrollInfo !== null && (
                    <div className="space-y-1.5 mb-6">
                      <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          {enrollInfo.completed ? "Course Complete" : "In Progress"}
                        </span>
                        <span>{enrollInfo.progress}%</span>
                      </div>
                      <Progress value={enrollInfo.progress} className="h-1.5" />
                    </div>
                  )}
                </div>

                <div>
                  {/* Price Row */}
                  <div className="flex items-center gap-3 border-t border-border/20 pt-4 mb-6">
                    <span className="text-xs text-muted-foreground line-through font-mono">
                      {pricing.original}
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-foreground font-mono">
                      {pricing.price}
                    </span>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {pricing.discount}
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <div>
                    {enrollInfo !== null ? (
                      <Link href={`/courses/${course.slug}`} className="w-full block">
                        <Button
                          className="w-full bg-primary hover:bg-primary/95 text-white rounded-xl py-5 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                        >
                          Resume Learning
                        </Button>
                      </Link>
                    ) : (
                      <Link href={pricing.buyLink} target="_blank" rel="noopener noreferrer" className="w-full block">
                        <Button
                          className="w-full bg-primary hover:bg-primary/95 text-white rounded-xl py-5 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                        >
                          BUY NOW
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Course Curriculum Section */}
      <div className="space-y-8 pt-8 border-t border-border/40">
        <div className="text-center space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-primary">Full Curriculum</div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Course Curriculum
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto font-light">
            16 modules, each paired with a shippable build. Click a module to see what's inside.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Modules List (Left side, occupies 5 columns on desktop) */}
          <div className="lg:col-span-5 space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {CURRICULUM.map((mod, index) => {
              const isActive = index === activeModuleIndex;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleIndex(index)}
                  className={cn(
                    "w-full text-left flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer duration-200 select-none",
                    isActive
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.01]"
                      : "bg-card backdrop-blur-md border-border/40 text-foreground hover:bg-muted hover:border-border/60"
                  )}
                >
                  <span className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-mono font-bold border",
                    isActive
                      ? "bg-white/20 border-white/20 text-white"
                      : "bg-muted border-border/60 text-muted-foreground"
                  )}>
                    {mod.id}
                  </span>
                  <span className="font-semibold text-sm line-clamp-1">{mod.title}</span>
                </button>
              );
            })}
          </div>

          {/* Module Subtopics / Lessons Slider (Right side, occupies 7 columns on desktop) */}
          <div className="lg:col-span-7 rounded-3xl border border-border/40 bg-card/40 backdrop-blur-md p-6 sm:p-8 space-y-6 shadow-xl relative min-h-[500px] flex flex-col justify-between">
            <div className="space-y-6">
              {/* Module Header */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-primary">
                  Module {activeModule.id}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
                  {activeModule.title}
                </h3>
              </div>

              {/* Module Descriptions */}
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                  {activeModule.description}
                </p>
                <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4">
                  <p className="text-xs sm:text-sm leading-relaxed text-foreground/90 font-medium">
                    <span className="text-primary font-bold">You build: </span>
                    {activeModule.build}
                  </p>
                </div>
              </div>

              {/* Lessons Scrollpane */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/80">
                  Subtopics & Lessons
                </h4>
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                  {activeModule.lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl border border-border/30 bg-background/40 hover:bg-background/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-muted text-[10px] font-mono font-bold text-muted-foreground border">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-foreground/85 font-medium leading-tight">
                          {lesson}
                        </span>
                      </div>
                      <PlayCircle className="w-3.5 h-3.5 text-primary/70 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
