"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Clock,
  CheckCircle,
  Layers,
  Sparkles,
  BookOpen,
  Code2,
  Cpu,
  Zap,
  Users,
  Award,
  ChevronRight
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LEARNING_PATHS_DATA, FullLearningPath, RoadmapStage } from "@/lib/learning-paths-data";
import { cn } from "@/lib/utils";

const STAGE_COLOR_STYLES: Record<
  RoadmapStage["color"],
  {
    boxBg: string;
    border: string;
    text: string;
    badgeBg: string;
  }
> = {
  emerald: {
    boxBg: "bg-emerald-500/10 dark:bg-emerald-950/30",
    border: "border-emerald-500/30 dark:border-emerald-500/30",
    text: "text-emerald-700 dark:text-emerald-300",
    badgeBg: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
  },
  sky: {
    boxBg: "bg-sky-500/10 dark:bg-sky-950/30",
    border: "border-sky-500/30 dark:border-sky-500/30",
    text: "text-sky-700 dark:text-sky-300",
    badgeBg: "bg-sky-500/20 text-sky-700 dark:text-sky-300"
  },
  violet: {
    boxBg: "bg-violet-500/10 dark:bg-violet-950/30",
    border: "border-violet-500/30 dark:border-violet-500/30",
    text: "text-violet-700 dark:text-violet-300",
    badgeBg: "bg-violet-500/20 text-violet-700 dark:text-violet-300"
  },
  amber: {
    boxBg: "bg-amber-500/10 dark:bg-amber-950/30",
    border: "border-amber-500/30 dark:border-amber-500/30",
    text: "text-amber-700 dark:text-amber-300",
    badgeBg: "bg-amber-500/20 text-amber-700 dark:text-amber-300"
  },
  rose: {
    boxBg: "bg-rose-500/10 dark:bg-rose-950/30",
    border: "border-rose-500/30 dark:border-rose-500/30",
    text: "text-rose-700 dark:text-rose-300",
    badgeBg: "bg-rose-500/20 text-rose-700 dark:text-rose-300"
  },
  teal: {
    boxBg: "bg-teal-500/10 dark:bg-teal-950/30",
    border: "border-teal-500/30 dark:border-teal-500/30",
    text: "text-teal-700 dark:text-teal-300",
    badgeBg: "bg-teal-500/20 text-teal-700 dark:text-teal-300"
  },
  orange: {
    boxBg: "bg-orange-500/10 dark:bg-orange-950/30",
    border: "border-orange-500/30 dark:border-orange-500/30",
    text: "text-orange-700 dark:text-orange-300",
    badgeBg: "bg-orange-500/20 text-orange-700 dark:text-orange-300"
  },
  indigo: {
    boxBg: "bg-indigo-500/10 dark:bg-indigo-950/30",
    border: "border-indigo-500/30 dark:border-indigo-500/30",
    text: "text-indigo-700 dark:text-indigo-300",
    badgeBg: "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300"
  },
  pink: {
    boxBg: "bg-pink-500/10 dark:bg-pink-950/30",
    border: "border-pink-500/30 dark:border-pink-500/30",
    text: "text-pink-700 dark:text-pink-300",
    badgeBg: "bg-pink-500/20 text-pink-700 dark:text-pink-300"
  },
  cyan: {
    boxBg: "bg-cyan-500/10 dark:bg-cyan-950/30",
    border: "border-cyan-500/30 dark:border-cyan-500/30",
    text: "text-cyan-700 dark:text-cyan-300",
    badgeBg: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300"
  }
};

export default function LearningPathDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const pathData: FullLearningPath | undefined = LEARNING_PATHS_DATA[slug];

  if (!pathData) {
    // If not matching exact slug, try fallback to ai-engineering
    if (slug === "ai-engineering" || slug === "ai-engineer") {
      return <LearningPathView pathData={LEARNING_PATHS_DATA["ai-engineering"]} />;
    }
    notFound();
  }

  return <LearningPathView pathData={pathData} />;
}

function LearningPathView({ pathData }: { pathData: FullLearningPath }) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0E1117] text-foreground font-sans flex flex-col antialiased selection:bg-primary/20 selection:text-primary" suppressHydrationWarning>
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-[1200px] w-full px-4 lg:px-6 py-8 sm:py-10">

          {/* ── Top Breadcrumb / Back Link ── */}
          <Link
            href="/#learning-paths"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors font-medium group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>All learning paths</span>
          </Link>

          {/* ── Path Header ── */}
          <div className="mb-8 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-foreground border border-gray-200 dark:border-gray-700">
                {pathData.level}
              </span>
              <span className="text-xs font-mono text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-md">
                {pathData.category}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              {pathData.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {pathData.subtitle}
            </p>
          </div>

          {/* ── Interactive Visual Roadmap ── */}
          <div className="mb-10">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161B22] p-5 sm:p-6 shadow-sm overflow-x-auto">
              
              {/* Header inside roadmap */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    Visual Roadmap
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {pathData.stages.length} stages · click any stage to jump
                  </p>
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  <span className="font-bold text-foreground">{pathData.levelBadge}</span> · {pathData.category}
                </div>
              </div>

              {/* Horizontal Pipeline Track */}
              <div className="relative min-w-[780px] pb-2">
                {/* Dashed connector line */}
                <svg className="absolute left-0 top-[38px] h-1 w-full -translate-y-1/2 pointer-events-none" preserveAspectRatio="none">
                  <line x1="2%" y1="50%" x2="98%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-gray-200 dark:text-gray-700" strokeDasharray="4 4" />
                </svg>

                {/* Stages List */}
                <div className="relative flex items-start justify-between gap-2">
                  {pathData.stages.map((stage) => {
                    const style = STAGE_COLOR_STYLES[stage.color] || STAGE_COLOR_STYLES.emerald;

                    return (
                      <div key={stage.number} className="flex flex-col items-center gap-2 shrink-0 w-[9.5%]">
                        <Link
                          href={stage.href}
                          className="group block w-full"
                        >
                          <div className={cn(
                            "relative rounded-xl border px-1.5 py-2.5 text-center transition-all duration-200 hover:scale-105 hover:shadow-md cursor-pointer",
                            style.boxBg,
                            style.border,
                            style.text
                          )}>
                            <div className="flex h-7 w-7 mx-auto mb-1 items-center justify-center rounded-full bg-white dark:bg-[#161B22] border-2 border-current text-[11px] font-bold shadow-2xs">
                              {stage.number}
                            </div>
                            <p className="text-[10.5px] font-bold leading-tight truncate px-0.5">
                              {stage.title}
                            </p>
                          </div>
                        </Link>
                        <p className="text-[9px] text-muted-foreground text-center leading-tight line-clamp-2 w-full px-0.5">
                          {stage.shortDesc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Indicators */}
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  Start
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  Capstone
                </span>
              </div>

            </div>
          </div>

          {/* ── Main Content Grid: Left Column & Right Sidebar ── */}
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            
            {/* ── Left Column: Overview, Outcomes, Vertical Stages ── */}
            <div className="space-y-10 min-w-0">
              
              {/* Overview Section */}
              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                  Overview
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {pathData.overview}
                </p>
              </section>

              {/* Learning Outcomes Section */}
              <section className="space-y-4">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Learning outcomes</span>
                </h2>
                <ul className="space-y-2.5">
                  {pathData.learningOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                      <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span className="leading-snug">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Stages Vertical Timeline Section */}
              <section className="space-y-4">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <span>Stages</span>
                </h2>

                <div className="space-y-3">
                  {pathData.stages.map((stage) => (
                    <div key={stage.number} className="flex items-start gap-3.5 group">
                      <Link
                        href={stage.href}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 group-hover:border-primary text-xs font-semibold text-primary mt-0.5 transition-colors bg-white dark:bg-[#161B22] cursor-pointer"
                      >
                        {stage.number}
                      </Link>

                      <div className="flex-1 pb-4 border-b border-gray-200/80 dark:border-gray-800 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            href={stage.href}
                            className="font-semibold text-sm text-foreground hover:text-primary transition-colors cursor-pointer"
                          >
                            {stage.title}
                          </Link>
                          {stage.completionPercent !== undefined && (
                            <span className="inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 px-1.5 py-0.2 font-mono text-[10px] bg-muted/60 text-muted-foreground">
                              {stage.completionPercent}%
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground">
                          {stage.shortDesc}
                        </p>

                        <Link
                          href={stage.href}
                          className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:gap-1.5 transition-all mt-1 cursor-pointer"
                        >
                          <span>{stage.seriesName || `Start Stage ${stage.number}`}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* ── Right Sidebar: Details, Audience, Start Here ── */}
            <aside className="space-y-5">
              
              {/* Card 1: Path Details */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161B22] p-5 shadow-sm space-y-3.5">
                <h3 className="font-bold text-sm text-foreground">Path details</h3>
                <div className="space-y-2.5 text-xs divide-y divide-gray-100 dark:divide-gray-800">
                  <div className="flex justify-between pt-2 first:pt-0">
                    <span className="text-muted-foreground">Estimated time</span>
                    <span className="flex items-center gap-1 font-semibold text-foreground font-mono">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {pathData.estimatedTime}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-muted-foreground">Series</span>
                    <span className="font-semibold text-foreground font-mono">{pathData.details.seriesCount}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-muted-foreground">Total chapters</span>
                    <span className="font-semibold text-foreground font-mono">{pathData.details.totalChapters}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-muted-foreground">Total labs</span>
                    <span className="font-semibold text-foreground font-mono">{pathData.details.totalLabs}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-muted-foreground">Total projects</span>
                    <span className="font-semibold text-foreground font-mono">{pathData.details.totalProjects}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Audience */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161B22] p-5 shadow-sm space-y-2.5">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Audience</span>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {pathData.targetAudience}
                </p>
              </div>

              {/* Card 3: Start Here (CTA Box) */}
              <Link href={pathData.startHere.href} className="block group">
                <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent p-5 shadow-sm hover:shadow-md hover:border-primary transition-all">
                  <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">
                    Start here
                  </p>
                  <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    {pathData.startHere.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                    {pathData.startHere.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-3 group-hover:gap-1.5 transition-all">
                    <span>Begin</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>

            </aside>

          </div>

          {/* ── Series In This Path Section ── */}
          <section className="mt-14 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Series in this path
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              {pathData.series.map((item) => (
                <Link key={item.id} href={item.href} className="block group">
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161B22] p-6 shadow-sm h-full flex flex-col justify-between hover:border-primary/50 hover:shadow-md transition-all">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <span className={cn(
                          "px-2 py-0.5 text-[11px] font-semibold rounded-md border shrink-0",
                          item.badgeVariant === "foundations"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
                            : item.badgeVariant === "expert"
                            ? "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20"
                            : "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20"
                        )}>
                          {item.badge}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[11px] font-mono rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{item.chaptersCount} chapters · {item.labsCount} labs</span>
                      <span className="font-bold text-foreground">{item.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
