"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code,
  Compass,
  FileText,
  Layers,
  Sparkles,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const VOLUMES_DATA = [
  {
    volume: "VOL 01",
    title: "FOUNDATIONS",
    pages: "478 Pages",
    flow: "Math → Python → Data → Machine Learning",
    description:
      "Build the foundation required to understand and engineer AI systems—from mathematical intuition and Python tooling to classical machine-learning algorithms and real-world ML workflows.",
    master: ["Mathematics", "Python", "Data", "Machine Learning"],
    color: "from-amber-500/20 to-orange-500/10"
  },
  {
    volume: "VOL 02",
    title: "DEEP LEARNING",
    pages: "439 Pages",
    flow: "Neural Networks → Computer Vision → Speech",
    description:
      "Understand deep learning from the ground up. Learn how neural networks learn, how modern architectures work, and how to build practical vision and speech applications.",
    master: ["Neural Networks", "Vision", "Speech", "PyTorch"],
    color: "from-blue-500/20 to-indigo-500/10"
  },
  {
    volume: "VOL 03",
    title: "LANGUAGE",
    pages: "267 Pages",
    flow: "NLP → Embeddings → Attention → Transformers",
    description:
      "Understand how machines process human language and how the Transformer architecture became the foundation of today's modern AI systems.",
    master: ["NLP", "Embeddings", "Attention", "Transformers"],
    color: "from-emerald-500/20 to-teal-500/10"
  },
  {
    volume: "VOL 04",
    title: "LARGE LANGUAGE MODELS",
    pages: "624 Pages",
    flow: "LLMs → Pretraining → Fine-Tuning → RAG → LLM Engineering",
    description:
      "Go beyond prompting. Understand the engineering behind modern LLM systems—from tokenization, architectures and training concepts to fine-tuning, inference, RAG, evaluation, and production application design.",
    master: ["LLM Architecture", "Fine-Tuning", "RAG", "Evaluation", "LLM Engineering"],
    color: "from-purple-500/20 to-pink-500/10"
  },
  {
    volume: "VOL 05",
    title: "AI AGENTS",
    pages: "672 Pages",
    flow: "Tools → Memory → Planning → RAG → MCP → Multi-Agent Systems",
    description:
      "Move from AI applications to AI systems that can act. Build agents that can reason, plan, use tools, retrieve information, maintain context, make decisions, and collaborate with other agents. Explore Agentic RAG, tool calling, memory, MCP, autonomous workflows, multi-agent orchestration, and agent swarms.",
    master: ["Tools", "Memory", "Planning", "Agentic RAG", "MCP", "Multi-Agent Systems"],
    color: "from-rose-500/20 to-red-500/10"
  },
  {
    volume: "VOL 06",
    title: "PRODUCTION AI",
    pages: "604 Pages",
    flow: "Infrastructure → Deployment → Safety → Observability → Capstones",
    description:
      "Learn what it takes to take AI systems from a prototype to production. Master APIs, deployment, infrastructure, evaluation, monitoring, observability, security, safety, performance, cost optimization, and production-grade AI architectures.",
    master: ["APIs", "Deployment", "Infrastructure", "Security", "Observability"],
    color: "from-cyan-500/20 to-blue-500/10"
  }
];

export default function TextCoursesPage() {
  const [expandedVolume, setExpandedVolume] = useState<string | null>("VOL 01");

  return (
    <>
      <Header />
      <main className="flex-grow py-12 sm:py-16 lg:py-20 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Header Layout with back button, breadcrumb, and title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/dashboard">
                <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all cursor-pointer shadow-sm">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3" />
                  Engineering Handbooks & Libraries
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                  Text Courses & Handbooks
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-mono font-semibold text-muted-foreground">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                3,084+ Pages of Material
              </span>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* FLAGSHIP HERO: AI ENGINEER: ZERO TO PRODUCTION (6 VOLUMES)         */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card/80 via-card/50 to-primary/5 p-6 sm:p-8 lg:p-10 shadow-xl backdrop-blur-md"
          >
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
              {/* Left Column: Overview & Value Prop */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-sm">
                    Flagship Mastery Program
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                    AI Engineer: <span className="text-primary italic">Zero to Production</span>
                  </h2>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    The Complete AI Engineering Mastery Program
                  </p>
                </div>

                <p className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed">
                  Learn AI from first principles. Build intelligent systems. Engineer AI Agents. Deploy to production.
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  A complete, hands-on AI Engineering journey covering everything from Mathematics and Machine Learning to Deep Learning, Transformers, LLMs, RAG, AI Agents, Multi-Agent Systems, and Production AI.
                </p>

                {/* Key Stats Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="rounded-2xl border border-border/50 bg-background/60 p-3 text-center">
                    <div className="text-lg sm:text-xl font-mono font-bold text-primary">6</div>
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Volumes</div>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-background/60 p-3 text-center">
                    <div className="text-lg sm:text-xl font-mono font-bold text-primary">3,084</div>
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Pages</div>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-background/60 p-3 text-center col-span-2 sm:col-span-1">
                    <div className="text-lg sm:text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400">Lifetime</div>
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Updates</div>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-4 border-t border-border/40 space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm text-muted-foreground line-through font-mono">₹1,599</span>
                    <span className="text-3xl font-extrabold text-foreground font-mono">₹599</span>
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-primary/20">
                      62% OFF · Complete 6-Vol Bundle
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://superprofile.bio/vp/ai-engineer--zero-to-production"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/95 text-white rounded-xl py-6 text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer gap-2"
                      >
                        Get Instant Access (All 6 Volumes)
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Instant PDF download · Complete 6-Volume library included · DRM-free access
                  </p>
                </div>
              </div>

              {/* Right Column: 6-Volume Interactive Library Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    The 6-Volume Curriculum
                  </h3>
                  <span className="text-[11px] font-mono text-muted-foreground">Click to inspect</span>
                </div>

                <div className="space-y-2.5">
                  {VOLUMES_DATA.map((vol) => {
                    const isExpanded = expandedVolume === vol.volume;
                    return (
                      <div
                        key={vol.volume}
                        className={cn(
                          "rounded-2xl border transition-all duration-200 overflow-hidden",
                          isExpanded
                            ? "border-primary/50 bg-card shadow-sm"
                            : "border-border/60 bg-card/40 hover:border-border hover:bg-card/70"
                        )}
                      >
                        <button
                          onClick={() => setExpandedVolume(isExpanded ? null : vol.volume)}
                          className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-muted text-foreground shrink-0">
                              {vol.volume}
                            </span>
                            <div className="min-w-0">
                              <div className="font-sans text-sm font-bold text-foreground truncate">
                                {vol.title}
                              </div>
                              <div className="text-[11px] text-muted-foreground font-mono truncate">
                                {vol.flow}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs font-mono font-semibold text-primary">
                              {vol.pages}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="px-4 pb-4 pt-1 border-t border-border/30 space-y-3"
                            >
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {vol.description}
                              </p>

                              <div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5">
                                  What You&apos;ll Master:
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {vol.master.map((item) => (
                                    <span
                                      key={item}
                                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-muted/70 text-foreground border border-border/40"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* SECOND HANDBOOK: AI AGENTS HANDBOOK                                 */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 shrink-0">
                Companion Handbooks
              </span>
              <div className="flex-grow border-t border-border/40"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1: AI Agents Handbook */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group rounded-3xl border border-border/60 bg-card/45 p-6 flex flex-col justify-between backdrop-blur-md hover:border-primary/50 hover:bg-card/75 transition-all shadow-md hover:shadow-xl duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-muted border border-border/30 mb-5 relative group-hover:scale-[1.01] transition-transform duration-300">
                    <img
                      src="/assets/ai_roadmap_cover.png"
                      alt="AI Agents Handbook"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                    Beginner to Advanced
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                    AI Agents Handbook
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Everything you need to go from writing software to engineering intelligent systems — covering Model Creation, Inference Engineering, Agentic Applications, MCP tools, and production deployment.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 border-t border-border/20 pt-4 mb-6">
                    <span className="text-xs text-muted-foreground line-through font-mono">₹499</span>
                    <span className="text-base sm:text-lg font-extrabold text-foreground font-mono">₹199</span>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      60% OFF
                    </span>
                  </div>

                  <Link href="https://superprofile.bio/vp/ai-agent-handnotes" className="block w-full" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-primary hover:bg-primary/95 text-white rounded-xl py-5 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer">
                      BUY NOW
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Card 2: Interactive Playground & Notebooks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="group rounded-3xl border border-border/60 bg-gradient-to-br from-card/60 to-primary/5 p-6 flex flex-col justify-between backdrop-blur-md hover:border-primary/50 transition-all shadow-md hover:shadow-xl duration-300"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5">
                    <Code className="h-6 w-6" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                    Interactive Lab Included
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                    Jupyter Notebooks & Code Repositories
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Every concept across the 6 volumes and handbooks comes with runnable Python code, starter templates, and end-to-end multi-agent scripts you can execute in our dashboard.
                  </p>
                </div>

                <div>
                  <div className="border-t border-border/20 pt-4 mb-6 space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      <span>Python, PyTorch & LangGraph source code</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      <span>Vector database & RAG templates</span>
                    </div>
                  </div>

                  <Link href="/dashboard" className="block w-full">
                    <Button variant="outline" className="w-full rounded-xl py-5 text-xs font-bold uppercase tracking-wider shadow-xs hover:border-primary/50 transition-all cursor-pointer">
                      Open Interactive Dashboard
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="text-center pt-4">
            <p className="text-xs text-muted-foreground">
              Questions about the curriculum or need team licensing? Reach out at{" "}
              <a href="https://substack.com/@techtalks02" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                TechTalks AI Substack
              </a>
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
