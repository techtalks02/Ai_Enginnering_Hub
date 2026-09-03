"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Target,
  CheckCircle2,
  Users,
  Compass,
  Clock,
  Layers,
  Code2,
  Cpu,
  Brain,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface LearningPathData {
  id: string;
  level: string;
  category: string;
  duration: string;
  title: string;
  subtitle: string;
  description: string;
  targetAudience: string;
  whatYouWillLearn: string[];
  stages: string[];
  seriesCount: number;
  chaptersCount: number;
  exploreHref: string;
}

export const LEARNING_PATHS: LearningPathData[] = [
  {
    id: "ai-engineer",
    level: "Level 1",
    category: "AI Engineering Foundations",
    duration: "~16 weeks",
    title: "AI Engineer Path",
    subtitle: "From software developer to AI Engineer",
    description:
      "The complete journey from software engineering foundations through production AI systems. Master Python, APIs, LLM fundamentals, prompt engineering, RAG, tool calling, agents, evaluation and production deployment.",
    targetAudience:
      "Software developers entering AI engineering who want a structured, production-grade roadmap from code to deployment.",
    whatYouWillLearn: [
      "Build and deploy production LLM applications",
      "Implement RAG systems with retrieval, reranking and evaluation",
      "Design and ship AI agents with tool calling",
      "Apply production patterns: observability, caching, fallbacks, guardrails"
    ],
    stages: [
      "Foundation",
      "Python & APIs",
      "LLM Fundamentals",
      "Prompt Engineering",
      "RAG",
      "Tool Calling",
      "Agents",
      "Evaluation",
      "Production AI",
      "Capstone"
    ],
    seriesCount: 2,
    chaptersCount: 6,
    exploreHref: "/learn/ai-engineering"
  },
  {
    id: "genai-engineer",
    level: "Level 2",
    category: "Generative AI Engineering",
    duration: "~14 weeks",
    title: "GenAI Engineer Path",
    subtitle: "Master generative AI systems",
    description:
      "Specialise in generative AI: LLMs, structured outputs, embeddings, vector search, RAG, multimodal systems, agents and production evaluation.",
    targetAudience:
      "Engineers with software fundamentals who want to specialise in cutting-edge LLMs, fine-tuning, and hybrid vector systems.",
    whatYouWillLearn: [
      "Architect production RAG systems end to end",
      "Master embeddings, vector databases and retrieval strategies",
      "Build multimodal AI applications",
      "Implement structured output and function calling patterns"
    ],
    stages: [
      "LLMs",
      "Structured Outputs",
      "Embeddings",
      "Vector Search",
      "RAG",
      "Multimodal",
      "Agents",
      "Fine-tuning",
      "Evaluation",
      "Production"
    ],
    seriesCount: 4,
    chaptersCount: 13,
    exploreHref: "/learn/genai-engineering"
  },
  {
    id: "agentic-ai",
    level: "Level 3",
    category: "Agentic AI Engineering",
    duration: "~14 weeks",
    title: "Agentic AI Engineer Path",
    subtitle: "Build autonomous AI systems",
    description:
      "Master agentic AI: tool calling, agent loops, state and memory, planning, multi agent orchestration, MCP, and production agent systems with evaluation and security.",
    targetAudience:
      "Engineers building autonomous AI systems that plan, act, maintain persistent state, and dispatch dynamic tool suites.",
    whatYouWillLearn: [
      "Design and build production AI agents",
      "Implement agent loops with tool calling and memory",
      "Orchestrate multi-agent systems and workflow graphs",
      "Apply MCP for tool ecosystems"
    ],
    stages: [
      "LLM Fundamentals",
      "Tool Calling",
      "Agent Loops",
      "State & Memory",
      "Planning",
      "Workflows",
      "Multi-Agent Systems",
      "MCP",
      "Agent Evaluation",
      "Production Agents"
    ],
    seriesCount: 2,
    chaptersCount: 6,
    exploreHref: "/learn/agentic-ai"
  },
  {
    id: "fde-path",
    level: "Level 5",
    category: "Forward Deployed Engineering",
    duration: "~18 weeks",
    title: "FDE Path",
    subtitle: "Forward Deployed Engineering",
    description:
      "Work at the intersection of customer, product, engineering and AI. Master discovery, solution architecture, rapid prototyping, customer POCs, productionisation and enterprise AI deployment.",
    targetAudience:
      "Engineers who deploy AI directly to customers — discovery, bespoke POCs, production pipelines, and enterprise scale.",
    whatYouWillLearn: [
      "Run effective technical discovery with enterprise customers",
      "Design solution architecture under real constraints",
      "Ship customer-specific POCs rapidly",
      "Productionise bespoke implementations"
    ],
    stages: [
      "Software Engineering",
      "AI Engineering",
      "Technical Discovery",
      "Solution Architecture",
      "Rapid Prototyping",
      "Customer POC",
      "Production Deployment",
      "Enterprise AI",
      "FDE Capstone"
    ],
    seriesCount: 1,
    chaptersCount: 3,
    exploreHref: "/learn/fde"
  }
];

export function LearningPathsSection() {
  return (
    <section id="learning-paths" className="py-16 sm:py-24 relative overflow-hidden bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3.5 py-1 text-xs font-semibold text-muted-foreground shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-primary" />
            <span>Curriculum</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            Learning Paths
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            Structured journeys from software developer to AI Engineer to FDE. Each path is a sequence of series, labs and projects that take you from concept to portfolio.
          </p>
        </div>

        {/* ── 2x2 Grid of Learning Paths ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {LEARNING_PATHS.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group rounded-3xl border border-border/80 bg-white dark:bg-[#161B22] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 relative"
            >
              <div className="space-y-6">
                
                {/* ── Top Metadata Row ── */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-foreground border border-gray-200 dark:border-gray-700">
                      {path.level}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {path.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground font-medium">
                    {path.duration}
                  </span>
                </div>

                {/* ── Title & Subtitle ── */}
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {path.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">
                    {path.subtitle}
                  </p>
                </div>

                {/* ── Description ── */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {path.description}
                </p>

                {/* ── Target Audience Callout ── */}
                <div className="flex items-start gap-2.5 text-xs text-muted-foreground/90 bg-gray-50/80 dark:bg-gray-800/40 p-3 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <Users className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    {path.targetAudience}
                  </p>
                </div>

                {/* ── What You'll Be Able To Do ── */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    WHAT YOU&apos;LL BE ABLE TO DO
                  </h4>
                  <ul className="space-y-2">
                    {path.whatYouWillLearn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ── Stages Connected Pipeline Chips ── */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    STAGES
                  </h4>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {path.stages.map((stage, sIdx) => (
                      <React.Fragment key={stage}>
                        <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800/80 text-foreground border border-gray-200/80 dark:border-gray-700/80 shadow-2xs hover:border-primary/40 transition-colors">
                          {stage}
                        </span>
                        {sIdx < path.stages.length - 1 && (
                          <span className="text-muted-foreground/50 text-[10px] font-mono px-0.5 select-none">
                            →
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── Bottom Summary Row & Action Link ── */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
                <span className="text-xs font-mono text-muted-foreground">
                  {path.seriesCount} series · {path.chaptersCount} chapters
                </span>

                <Link
                  href={path.exploreHref}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group/link cursor-pointer"
                >
                  <span>Explore path</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
