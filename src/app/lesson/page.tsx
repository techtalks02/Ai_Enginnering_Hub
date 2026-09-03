"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Search,
  Check,
  Target,
  FileCode,
  Copy,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  Compass,
  Play,
  RotateCcw,
  HelpCircle,
  Award,
  Layers,
  GraduationCap,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Database,
  Terminal,
  Activity,
  ShieldCheck,
  Code2,
  Cpu,
  Zap,
  CheckSquare,
  Square,
  Flame,
  CheckCheck,
  ListTree
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { MODULES_LIST, ModuleData, Lesson } from "@/components/landing/curriculum";
import {
  getLessonPath,
  resolveLessonFromParams,
  generateDetailedLessonContent,
  QuizItem,
  DetailedLessonContent
} from "@/lib/lesson-content";
import { cn } from "@/lib/utils";

export default function LessonPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-mono text-xs text-muted-foreground bg-background">
          Loading lesson workspace...
        </div>
      }
    >
      <LessonWorkspace />
    </Suspense>
  );
}

function LessonWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathParam = searchParams.get("path");
  const moduleParam = searchParams.get("module");
  const lessonParam = searchParams.get("lesson");
  const titleParam = searchParams.get("title");
  const techParam = searchParams.get("tech");
  const typeParam = searchParams.get("type");

  // Resolve current module & lesson from parameters
  const { module: initialModule, lesson: initialLesson } = useMemo(() => {
    return resolveLessonFromParams(pathParam, moduleParam, lessonParam, titleParam, techParam, typeParam);
  }, [pathParam, moduleParam, lessonParam, titleParam, techParam, typeParam]);

  const [activeModuleId, setActiveModuleId] = useState<string>(initialModule.id);
  const [activeLessonId, setActiveLessonId] = useState<string>(initialLesson.id);
  const [activeSection, setActiveSection] = useState<string>("act-on-this-lesson");
  const [codeMode, setCodeMode] = useState<"before" | "after">("before");
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});

  // Mobile Drawers
  const [mobileSyllabusOpen, setMobileSyllabusOpen] = useState<boolean>(false);
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

  // 5 Checkpoint loop states for this lesson
  const [checkpoints, setCheckpoints] = useState<Record<string, boolean>>({
    read: true,
    build: false,
    run: false,
    prove: false,
    continue: false
  });

  // Terminal run simulation state
  const [terminalRunning, setTerminalRunning] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);

  // Sync state when URL params change
  useEffect(() => {
    const { module: resMod, lesson: resLes } = resolveLessonFromParams(
      pathParam,
      moduleParam,
      lessonParam,
      titleParam,
      techParam,
      typeParam
    );
    setActiveModuleId(resMod.id);
    setActiveLessonId(resLes.id);
    setSelectedAnswers({});
    setCodeMode("before");
    setTerminalOutput(null);
    setCheckpoints({
      read: true,
      build: false,
      run: false,
      prove: false,
      continue: false
    });
    setMobileSyllabusOpen(false);
    setMobileTocOpen(false);
  }, [pathParam, moduleParam, lessonParam, titleParam, techParam, typeParam]);

  // Load completed lessons from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("techtalks_completed_lessons");
      if (saved) setCompletedLessons(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const currentModuleIndex = useMemo(() => {
    const idx = MODULES_LIST.findIndex((m) => m.id === activeModuleId);
    return idx >= 0 ? idx : 0;
  }, [activeModuleId]);

  const currentModule = useMemo(() => {
    return MODULES_LIST[currentModuleIndex] || initialModule;
  }, [currentModuleIndex, initialModule]);

  const currentLesson = useMemo(() => {
    return currentModule.lessons.find((l) => l.id === activeLessonId) || currentModule.lessons[0] || initialLesson;
  }, [currentModule, activeLessonId, initialLesson]);

  const lessonContent = useMemo(() => {
    return generateDetailedLessonContent(currentModule, currentLesson);
  }, [currentModule, currentLesson]);

  // Module completion count
  const moduleCompletedCount = useMemo(() => {
    return currentModule.lessons.filter((l) => !!completedLessons[l.id]).length;
  }, [currentModule, completedLessons]);

  // Checkpoint counting
  const completedCheckpointsCount = useMemo(() => {
    return Object.values(checkpoints).filter(Boolean).length;
  }, [checkpoints]);

  const isQuizPassed = useMemo(() => {
    if (!lessonContent.quizzes || lessonContent.quizzes.length === 0) return false;
    return lessonContent.quizzes.every((q) => selectedAnswers[q.id] === q.correctIndex);
  }, [lessonContent.quizzes, selectedAnswers]);

  // Subtopics generator for On This Page table of contents
  const subtopicsList = useMemo(() => {
    const t = currentLesson.title.toLowerCase();
    if (t.includes("linear algebra") || t.includes("matrix") || t.includes("vector")) {
      return [
        { id: "subtopic-vectors", title: "Vectors Are Points (and Directions)" },
        { id: "subtopic-matrices", title: "Matrices Are Transformations" },
        { id: "subtopic-dot-product", title: "The Dot Product Measures Alignment" },
        { id: "subtopic-independence", title: "Linear Independence & Span" },
        { id: "subtopic-basis-rank", title: "Basis and Rank" },
        { id: "subtopic-projection", title: "Orthogonal Projections" },
        { id: "subtopic-gram-schmidt", title: "Gram-Schmidt Orthogonalization" }
      ];
    }
    if (t.includes("transformer") || t.includes("attention")) {
      return [
        { id: "subtopic-tokens", title: "Token Embeddings & Vocabulary" },
        { id: "subtopic-attention", title: "Scaled Dot-Product Attention" },
        { id: "subtopic-multihead", title: "Multi-Head Subspaces" },
        { id: "subtopic-kvcache", title: "KV-Caching & Autoregressive Decoding" }
      ];
    }
    if (t.includes("agent") || t.includes("mcp")) {
      return [
        { id: "subtopic-react", title: "ReAct Reasoning Loops" },
        { id: "subtopic-tools", title: "Model Context Protocol Tool Calls" },
        { id: "subtopic-state", title: "Stateful Graph Channels" },
        { id: "subtopic-guards", title: "Recursion Limits & Safety Intercepts" }
      ];
    }
    if (t.includes("rag") || t.includes("retrieval") || t.includes("vector")) {
      return [
        { id: "subtopic-chunking", title: "Semantic Chunking Strategies" },
        { id: "subtopic-indexing", title: "HNSW Vector Indexing" },
        { id: "subtopic-hybrid", title: "Reciprocal Rank Fusion (BM25 + Dense)" },
        { id: "subtopic-rerank", title: "Cross-Encoder Reranker" }
      ];
    }
    if (t.includes("fde") || t.includes("enterprise") || t.includes("discovery")) {
      return [
        { id: "subtopic-discovery", title: "Enterprise Technical Discovery" },
        { id: "subtopic-vpc", title: "VPC Peering & IAM Security Boundary" },
        { id: "subtopic-poc", title: "48-Hour Rapid Client POC" },
        { id: "subtopic-audit", title: "SOC2 Compliance & Tenant Isolation" }
      ];
    }
    return [
      { id: "subtopic-core-concepts", title: "First Principles & Representation" },
      { id: "subtopic-algorithms", title: "Algorithmic Complexity & Flow" },
      { id: "subtopic-memory", title: "Memory Contiguity & Cache Locality" },
      { id: "subtopic-vectorization", title: "Vectorized SIMD Acceleration" }
    ];
  }, [currentLesson.title]);

  const toggleCheckpoint = (key: string) => {
    setCheckpoints((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleLessonComplete = (lessonId: string) => {
    const next = { ...completedLessons, [lessonId]: !completedLessons[lessonId] };
    setCompletedLessons(next);
    try {
      localStorage.setItem("techtalks_completed_lessons", JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  const navigateToLesson = (mod: ModuleData, les: Lesson) => {
    const targetPath = getLessonPath(mod, les);
    router.push(`/lesson?path=${encodeURIComponent(targetPath)}&module=${mod.num}&lesson=${les.id}`);
    setMobileSyllabusOpen(false);
  };

  const switchModule = (offset: number) => {
    const newIdx = currentModuleIndex + offset;
    if (newIdx >= 0 && newIdx < MODULES_LIST.length) {
      const targetMod = MODULES_LIST[newIdx];
      if (targetMod.lessons.length > 0) {
        navigateToLesson(targetMod, targetMod.lessons[0]);
      }
    }
  };

  const prevModule = currentModuleIndex > 0 ? MODULES_LIST[currentModuleIndex - 1] : null;
  const nextModule = currentModuleIndex < MODULES_LIST.length - 1 ? MODULES_LIST[currentModuleIndex + 1] : null;

  // Previous & Next lessons inside current or adjacent modules
  const { prevLesson, nextLesson } = useMemo(() => {
    const currentIndex = currentModule.lessons.findIndex((l) => l.id === currentLesson.id);
    let prev: { module: ModuleData; lesson: Lesson } | null = null;
    let next: { module: ModuleData; lesson: Lesson } | null = null;

    if (currentIndex > 0) {
      prev = { module: currentModule, lesson: currentModule.lessons[currentIndex - 1] };
    } else if (prevModule && prevModule.lessons.length > 0) {
      prev = { module: prevModule, lesson: prevModule.lessons[prevModule.lessons.length - 1] };
    }

    if (currentIndex < currentModule.lessons.length - 1) {
      next = { module: currentModule, lesson: currentModule.lessons[currentIndex + 1] };
    } else if (nextModule && nextModule.lessons.length > 0) {
      next = { module: nextModule, lesson: nextModule.lessons[0] };
    }

    return { prevLesson: prev, nextLesson: next };
  }, [currentModule, currentLesson, prevModule, nextModule]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileTocOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const copyCurrentCode = () => {
    const codeStr = codeMode === "before" ? lessonContent.code.before.code : lessonContent.code.after.code;
    navigator.clipboard.writeText(codeStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runTerminalSimulation = () => {
    setTerminalRunning(true);
    setTerminalOutput("Initializing Python 3.11 environment...\nLoading PyTorch & NumPy SIMD runtime...");
    setTimeout(() => {
      setTerminalOutput(
        `$ python -m pytest tests/test_${currentLesson.id.toLowerCase().replace(/[^a-z0-9]/g, "_")}.py\n` +
        `==================== TEST SESSION STARTS ====================\n` +
        `platform linux -- Python 3.11.8, pytest-8.1.1, pluggy-1.4.0\n` +
        `rootdir: /workspace/ai-engineering/${currentLesson.id}\n` +
        `collected 4 items\n\n` +
        `test_vectorized_execution.py ....                     [100%]\n\n` +
        `==================== 4 passed in 0.08s ====================\n` +
        `[BENCHMARK] Peak throughput: 48,200 ops/sec | Memory: 4.2 MB\n` +
        `[STATUS] All assertions passed. Ready to continue.`
      );
      setTerminalRunning(false);
      setCheckpoints((prev) => ({ ...prev, run: true, prove: true }));
    }, 900);
  };

  const isCurrentLessonDone = !!completedLessons[currentLesson.id];

  return (
    <div
      className="min-h-screen bg-[#FDFBF7] dark:bg-[#0E1117] text-foreground font-sans flex flex-col antialiased selection:bg-primary/20 selection:text-primary overflow-x-hidden"
      suppressHydrationWarning
    >
      <Header />

      {/* ── STICKY SECONDARY MOBILE HEADER BAR (< lg) ── */}
      <div className="lg:hidden sticky top-14 z-30 bg-background/95 backdrop-blur-md border-b border-border/80 px-3 py-2 flex items-center justify-between gap-2 shadow-2xs">
        {/* Mobile Syllabus Drawer Trigger */}
        <button
          onClick={() => setMobileSyllabusOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold font-mono cursor-pointer truncate max-w-[55%]"
        >
          <Layers className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Phase {currentModule.num} ({moduleCompletedCount}/{currentModule.lessons.length})</span>
          <ChevronDown className="w-3 h-3 shrink-0 opacity-70" />
        </button>

        {/* Mobile TOC Quick Jump Trigger */}
        <button
          onClick={() => setMobileTocOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted text-foreground text-[11px] font-bold font-mono cursor-pointer shrink-0 border border-border/60"
        >
          <ListTree className="w-3.5 h-3.5 text-primary" />
          <span>On This Page</span>
          <ChevronDown className="w-3 h-3 opacity-70" />
        </button>
      </div>

      {/* ── Main Workspace 3-Column Layout ── */}
      <div className="flex-1 w-full max-w-[1680px] mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">

          {/* ───────────────────────────────────────────────────────────── */}
          {/* ── LEFT SIDEBAR: PHASE / MODULE LESSONS CHECKLIST ──────────── */}
          {/* ───────────────────────────────────────────────────────────── */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-3 select-none border-r border-border/60 dark:border-gray-800/80 space-y-4">
            
            {/* Top Phase Navigation Switchers */}
            <div className="flex items-center justify-between gap-1 text-[11px] font-mono text-muted-foreground border-b border-border/60 dark:border-gray-800 pb-3">
              {prevModule ? (
                <button
                  onClick={() => switchModule(-1)}
                  className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer truncate max-w-[48%]"
                  title={`Go to Phase ${prevModule.num}: ${prevModule.title}`}
                >
                  <span>← PHASE {prevModule.num}: {prevModule.title.split(" ")[0]}</span>
                </button>
              ) : (
                <span className="opacity-40">← START</span>
              )}

              {nextModule ? (
                <button
                  onClick={() => switchModule(1)}
                  className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer truncate max-w-[48%] text-right justify-end ml-auto"
                  title={`Go to Phase ${nextModule.num}: ${nextModule.title}`}
                >
                  <span>PHASE {nextModule.num}: {nextModule.title.split(" ")[0]} →</span>
                </button>
              ) : (
                <span className="opacity-40 ml-auto">END →</span>
              )}
            </div>

            {/* Current Phase Header */}
            <div className="space-y-1">
              <div className="text-[11px] font-mono font-bold tracking-wider text-primary uppercase">
                PHASE {currentModule.num} · {currentModule.category || currentModule.title}
              </div>
              <div className="text-xs font-semibold text-foreground truncate font-serif">
                {currentModule.title}
              </div>
            </div>

            {/* List of Phase Lessons */}
            <div className="space-y-0.5 pt-1">
              {currentModule.lessons.map((les) => {
                const isLessonActive = les.id === currentLesson.id;
                const isDone = !!completedLessons[les.id];

                return (
                  <div
                    key={les.id}
                    onClick={() => navigateToLesson(currentModule, les)}
                    className={cn(
                      "group flex items-start gap-2.5 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer",
                      isLessonActive
                        ? "bg-primary/10 text-primary font-bold border-l-2 border-primary shadow-2xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    )}
                  >
                    {/* Interactive Completion Checkbox */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLessonComplete(les.id);
                      }}
                      className={cn(
                        "w-4 h-4 mt-0.5 rounded-md border flex items-center justify-center transition-colors shrink-0 cursor-pointer",
                        isDone
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-border/80 bg-background hover:border-primary"
                      )}
                      title={isDone ? "Mark incomplete" : "Mark completed"}
                    >
                      {isDone && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </button>

                    <span className={cn("leading-tight min-w-0 flex-1", isDone && !isLessonActive && "line-through opacity-60")}>
                      {les.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* ── CENTER WORKSPACE: MAIN LESSON CONTENT & ACT LOOP ────────── */}
          {/* ───────────────────────────────────────────────────────────── */}
          <main className="lg:col-span-6 space-y-6 sm:space-y-8 min-w-0 pb-16">

            {/* ── Heading with Underline ── */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold">
                  Phase {currentModule.num}
                </span>
                <span>·</span>
                <span>{currentLesson.duration || "25 min"} read</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground uppercase leading-snug break-words">
                {currentLesson.title}
              </h1>
              <div className="h-0.5 w-full bg-gradient-to-r from-primary/80 via-primary/30 to-transparent" />
            </div>

            {/* ── HERO CARD: ACT ON THIS LESSON ── */}
            <div
              id="act-on-this-lesson"
              className="rounded-2xl border border-border/80 dark:border-gray-800 bg-white dark:bg-[#161B22] p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-5"
            >
              {/* Checkpoint Header Banner */}
              <div className="flex items-center justify-between gap-2 border-b border-border/60 dark:border-gray-800 pb-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1.5 font-bold text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  {completedCheckpointsCount} OF 5 CHECKPOINTS
                </span>
                <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold", isQuizPassed ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-muted text-muted-foreground")}>
                  {isQuizPassed ? "QUIZ PASSED (100%)" : "QUIZ NOT YET PASSED"}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-foreground">
                  Act On This Lesson
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Use this loop to turn reading into evidence. Each checkpoint is yours to mark and stays separate from quiz correctness.
                </p>
              </div>

              {/* 5-Step Action Grid (Responsive on Mobile: 2 cols on mobile, 5 on desktop) */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5 pt-1">
                {[
                  { key: "read", num: "01", label: "READ", desc: "Understand the claim and constraints." },
                  { key: "build", num: "02", label: "BUILD", desc: "Create or modify the lesson artifact." },
                  { key: "run", num: "03", label: "RUN", desc: "Execute the relevant program or exercise." },
                  { key: "prove", num: "04", label: "PROVE", desc: "Capture output that supports the claim." },
                  { key: "continue", num: "05", label: "CONTINUE", desc: "Mark the lesson complete when you are ready." }
                ].map((step, sIdx) => {
                  const isChecked = !!checkpoints[step.key];
                  const isLastOdd = sIdx === 4;

                  return (
                    <button
                      key={step.key}
                      onClick={() => toggleCheckpoint(step.key)}
                      className={cn(
                        "p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 select-none",
                        isLastOdd ? "col-span-2 sm:col-span-1" : "col-span-1",
                        isChecked
                          ? "bg-primary/10 border-primary/40 text-primary shadow-2xs font-semibold"
                          : "bg-muted/30 dark:bg-muted/10 border-border/70 text-muted-foreground hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-primary/80 font-bold">{step.num}</span>
                        <div className={cn("w-4 h-4 rounded-md border flex items-center justify-center", isChecked ? "bg-primary border-primary text-white" : "border-border/80 bg-background")}>
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold block text-foreground">{step.label}</span>
                        <p className="text-[10px] text-muted-foreground leading-tight mt-0.5 line-clamp-2">
                          {step.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* LOCAL PROGRESS Terminal Simulator Subcard */}
              <div className="rounded-xl border border-border/80 dark:border-gray-800 bg-[#FAF8F5] dark:bg-[#0D1117] p-3 sm:p-4 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground flex-wrap gap-1">
                  <span className="text-primary font-bold uppercase tracking-wider">LOCAL PROGRESS</span>
                  <span>RUN FROM THE REPOSITORY</span>
                </div>

                <div className="rounded-lg bg-[#181825] dark:bg-[#080B10] border border-border/40 p-3 sm:p-3.5 font-mono text-xs text-emerald-400 min-h-[4rem] flex flex-col justify-between gap-2 shadow-inner overflow-hidden">
                  {terminalOutput ? (
                    <pre className="whitespace-pre-wrap leading-relaxed text-[10px] sm:text-[11px] text-emerald-300 overflow-x-auto max-h-48">
                      {terminalOutput}
                    </pre>
                  ) : (
                    <div className="text-slate-400 text-xs italic">
                      No standalone main file detected. Ready to execute lesson verification harness.
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <Button
                      size="sm"
                      onClick={runTerminalSimulation}
                      disabled={terminalRunning}
                      className="h-8 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 cursor-pointer rounded-lg shadow-xs w-full sm:w-auto"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{terminalRunning ? "Running..." : "Run Benchmark Test"}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 1. THE PROBLEM SECTION ── */}
            <section id="the-problem" className="space-y-3 sm:space-y-4 pt-4 border-t border-border/60 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                  The Problem
                </h2>
              </div>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-3">
                {lessonContent.whyItMatters.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* ── 2. THE CONCEPT SECTION & SUBTOPICS ── */}
            <section id="the-concept" className="space-y-5 sm:space-y-6 pt-4 border-t border-border/60 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                  The Concept
                </h2>
              </div>

              <div className="prose prose-neutral dark:prose-invert max-w-none text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-3">
                {lessonContent.concept.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Dynamic Mathematical & Architectural Subtopics */}
              <div className="space-y-3 pt-1">
                {subtopicsList.map((sub, idx) => (
                  <div
                    key={sub.id}
                    id={sub.id}
                    className="p-4 rounded-2xl border border-border/80 dark:border-gray-800 bg-white dark:bg-[#161B22] shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">0{idx + 1}</span>
                      <h3 className="font-serif text-sm sm:text-base font-bold text-foreground">
                        {sub.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Fundamental mathematical transformation mapping coordinate spaces via linear transformations, dot-product projections, and tensor basis decomposition.
                    </p>
                  </div>
                ))}
              </div>

              {/* Architecture Diagram Box */}
              <div className="rounded-2xl border border-border/80 dark:border-gray-800 bg-white dark:bg-[#161B22] p-4 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-primary flex-wrap gap-1">
                  <span className="font-bold uppercase tracking-wider">{lessonContent.architecture.title}</span>
                  <span className="text-[10px] text-muted-foreground">EXECUTION FLOW</span>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 dark:bg-muted/10 border border-border/60 font-mono text-xs text-foreground leading-relaxed overflow-x-auto">
                  {lessonContent.architecture.flowSummary}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {lessonContent.architecture.flowSteps.map((s) => (
                    <div key={s.step} className="p-3 rounded-xl bg-background border border-border/70 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono text-primary font-bold">
                        <span>{s.step}</span>
                        <span>{s.label}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-snug">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── 3. BUILD IT SECTION ── */}
            <section id="build-it" className="space-y-4 sm:space-y-5 pt-4 border-t border-border/60 dark:border-gray-800">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                    Build It
                  </h2>
                </div>

                {/* Before / After Selector */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/50 dark:bg-muted/20 border border-border/70 text-xs font-mono">
                  <button
                    onClick={() => setCodeMode("before")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[11px] sm:text-xs",
                      codeMode === "before" ? "bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => setCodeMode("after")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[11px] sm:text-xs",
                      codeMode === "after" ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    After (Production)
                  </button>
                </div>
              </div>

              {/* Code Box with Syntax & Copy */}
              <div className="rounded-2xl border border-border/80 dark:border-gray-800 bg-[#1A1B26] dark:bg-[#0D1117] overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#24283B] dark:bg-[#161B22] border-b border-border/30 text-xs font-mono">
                  <span className="text-slate-300 font-semibold truncate max-w-[70%]">
                    {codeMode === "before" ? lessonContent.code.before.filename : lessonContent.code.after.filename}
                  </span>
                  <button
                    onClick={copyCurrentCode}
                    className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 transition-colors cursor-pointer"
                  >
                    {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="p-3.5 sm:p-4 overflow-x-auto text-[11px] sm:text-xs font-mono leading-relaxed text-slate-100">
                  <pre>{codeMode === "before" ? lessonContent.code.before.code : lessonContent.code.after.code}</pre>
                </div>

                {/* Problems / Improvements Strip */}
                <div className="px-3.5 py-3 bg-[#161B22] border-t border-border/30 text-xs space-y-1.5">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase text-slate-300">
                    {codeMode === "before" ? "Key Issues Detected:" : "Production Improvements:"}
                  </span>
                  <ul className="space-y-1 text-[11px]">
                    {codeMode === "before"
                      ? lessonContent.code.before.problems?.map((prob, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-rose-300">
                            <span>✕</span>
                            <span>{prob}</span>
                          </li>
                        ))
                      : lessonContent.code.after.improvements?.map((imp, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-emerald-300">
                            <span>✓</span>
                            <span>{imp}</span>
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ── 4. USE IT SECTION ── */}
            <section id="use-it" className="space-y-3 sm:space-y-4 pt-4 border-t border-border/60 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                  Use It
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Connect mathematical representations directly to production framework engines (PyTorch tensors, NumPy SIMD, and FastAPI pipelines).
              </p>
              <div className="p-3.5 sm:p-5 rounded-2xl border border-border/80 dark:border-gray-800 bg-[#1A1B26] dark:bg-[#0D1117] font-mono text-xs text-slate-200 space-y-2">
                <span className="text-primary text-[11px] font-bold"># PyTorch Real-World Vector Operation</span>
                <pre className="text-slate-100 leading-relaxed overflow-x-auto text-[11px]">
{`import torch

# GPU Tensor projection with batch matrix multiplication
A = torch.randn(32, 512, 512, device="cuda" if torch.cuda.is_available() else "cpu")
B = torch.randn(32, 512, 128, device="cuda" if torch.cuda.is_available() else "cpu")
result = torch.bmm(A, B) # O(N) hardware tensor core execution`}
                </pre>
              </div>
            </section>

            {/* ── 5. EXPERIMENT SECTION ── */}
            <section id="experiment" className="space-y-3 sm:space-y-4 pt-4 border-t border-border/60 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                  Experiment
                </h2>
              </div>

              <div className="rounded-2xl border border-border/80 dark:border-gray-800 bg-white dark:bg-[#161B22] p-4 sm:p-5 shadow-xs space-y-3">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {lessonContent.experiment.description}
                </div>

                <div className="space-y-2.5">
                  {lessonContent.experiment.scenarios.map((scen, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-border/70 bg-background space-y-1.5 font-mono text-xs"
                    >
                      <div className="flex items-center justify-between text-primary font-bold flex-wrap gap-1">
                        <span>{scen.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {scen.method} {scen.expectedStatus} {scen.statusText}
                        </span>
                      </div>
                      <div className="text-muted-foreground text-[11px] truncate">{scen.endpoint}</div>
                      <pre className="p-2.5 rounded-lg bg-[#181825] dark:bg-[#080B10] text-emerald-400 text-[10px] sm:text-[11px] overflow-x-auto">
                        {scen.response}
                      </pre>
                      <p className="text-[11px] text-muted-foreground font-sans">{scen.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── 6. PRODUCTION RULES ── */}
            <section id="production" className="space-y-3 sm:space-y-4 pt-4 border-t border-border/60 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                  Production Rules
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lessonContent.production.rules.map((rule, idx) => (
                  <div key={idx} className="p-3.5 sm:p-4 rounded-2xl border border-border/80 dark:border-gray-800 bg-white dark:bg-[#161B22] shadow-xs space-y-1">
                    <h3 className="text-xs font-mono font-bold text-primary">{rule.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-snug">{rule.description}</p>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block pt-1">
                      Impact: {rule.impact}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 7. KNOWLEDGE CHECK / QUIZ ── */}
            <section id="knowledge-check" className="space-y-3 sm:space-y-4 pt-4 border-t border-border/60 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                  Knowledge Check
                </h2>
              </div>

              <div className="space-y-3.5">
                {lessonContent.quizzes.map((quiz) => {
                  const sel = selectedAnswers[quiz.id];
                  const hasAnswered = sel !== undefined;
                  const isCorrect = sel === quiz.correctIndex;

                  return (
                    <div
                      key={quiz.id}
                      className="p-4 sm:p-5 rounded-2xl border border-border/80 dark:border-gray-800 bg-white dark:bg-[#161B22] shadow-xs space-y-3"
                    >
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                        {quiz.question}
                      </h3>

                      <div className="space-y-2">
                        {quiz.options.map((opt, oIdx) => {
                          const isOptionSelected = sel === oIdx;
                          const isOptionCorrect = quiz.correctIndex === oIdx;

                          return (
                            <button
                              key={oIdx}
                              onClick={() => setSelectedAnswers((prev) => ({ ...prev, [quiz.id]: oIdx }))}
                              className={cn(
                                "w-full text-left p-2.5 sm:p-3 rounded-xl text-xs transition-all border flex items-start gap-2.5 cursor-pointer font-sans",
                                hasAnswered
                                  ? isOptionCorrect
                                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold"
                                    : isOptionSelected
                                    ? "bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300"
                                    : "bg-muted/30 border-border/60 text-muted-foreground opacity-60"
                                  : "bg-background border-border/80 text-foreground hover:border-primary/50 hover:bg-muted/30"
                              )}
                            >
                              <span className="font-mono text-[10px] opacity-60 mt-0.5">
                                {String.fromCharCode(65 + oIdx)}.
                              </span>
                              <span className="flex-1">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div
                          className={cn(
                            "p-3 rounded-xl text-xs leading-relaxed font-sans",
                            isCorrect ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 border border-emerald-500/20" : "bg-rose-500/10 text-rose-800 dark:text-rose-200 border border-rose-500/20"
                          )}
                        >
                          <span className="font-bold font-mono">{isCorrect ? "Correct: " : "Incorrect: "}</span>
                          {quiz.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Bottom Prev / Next Lesson Navigation Bar ── */}
            <div className="pt-6 border-t border-border/60 dark:border-gray-800 flex items-center justify-between gap-3">
              {prevLesson ? (
                <button
                  onClick={() => navigateToLesson(prevLesson.module, prevLesson.lesson)}
                  className="px-3.5 py-2 rounded-xl border border-border/80 hover:border-primary bg-background text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs max-w-[48%]"
                >
                  <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Prev: {prevLesson.lesson.title}</span>
                </button>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <button
                  onClick={() => navigateToLesson(nextLesson.module, nextLesson.lesson)}
                  className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-xs font-mono text-primary-foreground font-bold flex items-center gap-1.5 cursor-pointer transition-all ml-auto shadow-xs max-w-[48%]"
                >
                  <span className="truncate">Next: {nextLesson.lesson.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              ) : (
                <Button
                  onClick={() => router.push("/#roadmap")}
                  className="text-xs font-mono bg-emerald-600 hover:bg-emerald-700 text-white ml-auto rounded-xl"
                >
                  Complete Curriculum 🎉
                </Button>
              )}
            </div>

          </main>

          {/* ───────────────────────────────────────────────────────────── */}
          {/* ── RIGHT SIDEBAR: ON THIS PAGE (Hierarchical Table of Contents) ─ */}
          {/* ───────────────────────────────────────────────────────────── */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pl-3 select-none border-l border-border/60 dark:border-gray-800/80 space-y-3">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary px-2">
              ON THIS PAGE
            </div>

            <nav className="space-y-1 text-xs">
              <button
                onClick={() => scrollToSection("act-on-this-lesson")}
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium truncate block",
                  activeSection === "act-on-this-lesson"
                    ? "text-primary font-bold border-l-2 border-primary pl-2 bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                Act on this lesson
              </button>

              <button
                onClick={() => scrollToSection("the-problem")}
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium truncate block",
                  activeSection === "the-problem"
                    ? "text-primary font-bold border-l-2 border-primary pl-2 bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                The Problem
              </button>

              <button
                onClick={() => scrollToSection("the-concept")}
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium truncate block",
                  activeSection === "the-concept"
                    ? "text-primary font-bold border-l-2 border-primary pl-2 bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                The Concept
              </button>

              {/* Nested Subtopics */}
              <div className="pl-3 space-y-0.5 border-l border-border/60 my-1">
                {subtopicsList.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => scrollToSection(sub.id)}
                    className={cn(
                      "w-full text-left px-2 py-1 rounded text-[11px] transition-all cursor-pointer truncate block",
                      activeSection === sub.id
                        ? "text-primary font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {sub.title}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollToSection("build-it")}
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium truncate block",
                  activeSection === "build-it"
                    ? "text-primary font-bold border-l-2 border-primary pl-2 bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                Build It
              </button>

              <button
                onClick={() => scrollToSection("use-it")}
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium truncate block",
                  activeSection === "use-it"
                    ? "text-primary font-bold border-l-2 border-primary pl-2 bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                Use It
              </button>

              <button
                onClick={() => scrollToSection("experiment")}
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium truncate block",
                  activeSection === "experiment"
                    ? "text-primary font-bold border-l-2 border-primary pl-2 bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                Experiment & Scenarios
              </button>

              <button
                onClick={() => scrollToSection("production")}
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium truncate block",
                  activeSection === "production"
                    ? "text-primary font-bold border-l-2 border-primary pl-2 bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                Production Rules
              </button>

              <button
                onClick={() => scrollToSection("knowledge-check")}
                className={cn(
                  "w-full text-left px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium truncate block",
                  activeSection === "knowledge-check"
                    ? "text-primary font-bold border-l-2 border-primary pl-2 bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                Knowledge Check
              </button>
            </nav>
          </aside>

        </div>
      </div>

      {/* ── MOBILE SYLLABUS DRAWER MODAL (< lg) ── */}
      <AnimatePresence>
        {mobileSyllabusOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSyllabusOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-over Content Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-4/5 max-w-sm bg-background border-r border-border h-full shadow-2xl z-10 flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-border/80 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold text-primary uppercase">
                    PHASE {currentModule.num} · {currentModule.category || currentModule.title}
                  </div>
                  <div className="text-sm font-bold text-foreground font-serif truncate max-w-[220px]">
                    {currentModule.title}
                  </div>
                </div>
                <button
                  onClick={() => setMobileSyllabusOpen(false)}
                  className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Phase Switchers in Drawer */}
              <div className="p-3 bg-muted/30 border-b border-border/60 flex items-center justify-between text-xs font-mono">
                {prevModule ? (
                  <button
                    onClick={() => switchModule(-1)}
                    className="text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    ← Phase {prevModule.num}
                  </button>
                ) : (
                  <span className="opacity-40">Start</span>
                )}

                {nextModule ? (
                  <button
                    onClick={() => switchModule(1)}
                    className="text-primary hover:underline flex items-center gap-1 cursor-pointer ml-auto"
                  >
                    Phase {nextModule.num} →
                  </button>
                ) : (
                  <span className="opacity-40 ml-auto">End</span>
                )}
              </div>

              {/* Lesson Items */}
              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {currentModule.lessons.map((les) => {
                  const isLessonActive = les.id === currentLesson.id;
                  const isDone = !!completedLessons[les.id];

                  return (
                    <div
                      key={les.id}
                      onClick={() => navigateToLesson(currentModule, les)}
                      className={cn(
                        "flex items-start gap-2.5 p-2.5 rounded-xl text-xs transition-all cursor-pointer",
                        isLessonActive
                          ? "bg-primary/10 text-primary font-bold border-l-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      )}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonComplete(les.id);
                        }}
                        className={cn(
                          "w-4 h-4 mt-0.5 rounded-md border flex items-center justify-center transition-colors shrink-0 cursor-pointer",
                          isDone
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-border/80 bg-background hover:border-primary"
                        )}
                      >
                        {isDone && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </button>

                      <span className={cn("leading-tight min-w-0 flex-1", isDone && !isLessonActive && "line-through opacity-60")}>
                        {les.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MOBILE TABLE OF CONTENTS DRAWER (< lg) ── */}
      <AnimatePresence>
        {mobileTocOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileTocOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-over Content Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-4/5 max-w-sm bg-background border-l border-border h-full shadow-2xl z-10 flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-border/80 flex items-center justify-between">
                <div className="text-xs font-mono font-bold text-primary uppercase">
                  ON THIS PAGE
                </div>
                <button
                  onClick={() => setMobileTocOpen(false)}
                  className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1 text-xs">
                <button
                  onClick={() => scrollToSection("act-on-this-lesson")}
                  className="w-full text-left p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                >
                  Act on this lesson
                </button>
                <button
                  onClick={() => scrollToSection("the-problem")}
                  className="w-full text-left p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                >
                  The Problem
                </button>
                <button
                  onClick={() => scrollToSection("the-concept")}
                  className="w-full text-left p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                >
                  The Concept
                </button>

                {/* Subtopics */}
                <div className="pl-3 border-l border-border/60 space-y-0.5 my-1">
                  {subtopicsList.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => scrollToSection(sub.id)}
                      className="w-full text-left p-1.5 rounded text-[11px] text-muted-foreground hover:text-foreground truncate block"
                    >
                      {sub.title}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => scrollToSection("build-it")}
                  className="w-full text-left p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                >
                  Build It
                </button>
                <button
                  onClick={() => scrollToSection("use-it")}
                  className="w-full text-left p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                >
                  Use It
                </button>
                <button
                  onClick={() => scrollToSection("experiment")}
                  className="w-full text-left p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                >
                  Experiment & Scenarios
                </button>
                <button
                  onClick={() => scrollToSection("production")}
                  className="w-full text-left p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                >
                  Production Rules
                </button>
                <button
                  onClick={() => scrollToSection("knowledge-check")}
                  className="w-full text-left p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
                >
                  Knowledge Check
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
