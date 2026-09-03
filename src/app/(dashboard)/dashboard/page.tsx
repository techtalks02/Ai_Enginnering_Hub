"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Play,
  CheckCircle2,
  Circle,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Clock,
  Sparkles,
  Layers,
  Compass,
  Check,
  Target
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MODULES_LIST, ModuleData, Lesson } from "@/components/landing/curriculum";
import { getLessonPath } from "@/lib/lesson-content";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("techtalks_completed_lessons");
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load completed lessons:", e);
    }
  }, []);

  // First 5 modules from the official curriculum
  const firstFiveModules = useMemo(() => {
    return MODULES_LIST.slice(0, 5);
  }, []);

  // Compute curriculum-wide statistics
  const totalCompletedLessons = useMemo(() => {
    return Object.values(completedLessons).filter(Boolean).length;
  }, [completedLessons]);

  const totalCurriculumLessons = useMemo(() => {
    return MODULES_LIST.reduce((acc, m) => acc + m.lessons.length, 0);
  }, []);

  const overallProgressPercent = Math.round((totalCompletedLessons / (totalCurriculumLessons || 1)) * 100);

  // Status for the first 5 modules
  const moduleProgressStats = useMemo(() => {
    let completedMods = 0;
    let inProgressMods = 0;
    let notStartedMods = 0;

    firstFiveModules.forEach((mod) => {
      const done = mod.lessons.filter((l) => completedLessons[l.id]).length;
      if (done === mod.lessons.length && mod.lessons.length > 0) {
        completedMods++;
      } else if (done > 0) {
        inProgressMods++;
      } else {
        notStartedMods++;
      }
    });

    return { completedMods, inProgressMods, notStartedMods };
  }, [firstFiveModules, completedLessons]);

  // First lesson to continue
  const nextLessonToLearn = useMemo(() => {
    for (const mod of firstFiveModules) {
      for (const les of mod.lessons) {
        if (!completedLessons[les.id]) {
          return { module: mod, lesson: les };
        }
      }
    }
    return { module: firstFiveModules[0], lesson: firstFiveModules[0].lessons[0] };
  }, [firstFiveModules, completedLessons]);

  const continueUrl = useMemo(() => {
    if (!nextLessonToLearn) return "/lesson";
    const path = getLessonPath(nextLessonToLearn.module, nextLessonToLearn.lesson);
    return `/lesson?path=${encodeURIComponent(path)}&module=${nextLessonToLearn.module.num}&lesson=${nextLessonToLearn.lesson.id}`;
  }, [nextLessonToLearn]);

  const statsCards = [
    {
      label: "Completed Lessons",
      value: `${totalCompletedLessons}`,
      subtitle: `${overallProgressPercent}% of total curriculum`,
      percent: overallProgressPercent,
      icon: CheckCircle2,
      color: "emerald"
    },
    {
      label: "Modules In Progress",
      value: `${moduleProgressStats.inProgressMods}`,
      subtitle: `${moduleProgressStats.inProgressMods} of 5 foundation phases`,
      percent: Math.round((moduleProgressStats.inProgressMods / 5) * 100),
      icon: Clock,
      color: "violet"
    },
    {
      label: "Curriculum Phases",
      value: `${firstFiveModules.length}`,
      subtitle: "First 5 foundation modules active",
      percent: 100,
      icon: Layers,
      color: "primary"
    }
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-2">
      {/* Back button link */}
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-xl text-xs font-semibold hover:bg-muted/50 cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Landing Page
          </Button>
        </Link>
        <Link href="/lesson">
          <Button variant="ghost" size="sm" className="text-xs font-semibold text-primary hover:bg-primary/10 gap-1.5 cursor-pointer">
            <Compass className="w-3.5 h-3.5" /> Open Full Workspace
          </Button>
        </Link>
      </div>

      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl border border-border/40 p-8 sm:p-12 overflow-hidden bg-card/60 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="space-y-4 max-w-xl z-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
            Welcome to <span className="text-primary">AI Engineer Hub</span> 👋
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Your personalized AI engineering track is ready. Dive into the curriculum from Python foundations to multi-agent architectures and enterprise scale.
          </p>
        </div>
        <div className="z-10 shrink-0">
          <Link href={continueUrl}>
            <Button className="bg-primary hover:bg-primary/95 text-white rounded-full px-7 py-6 font-semibold text-sm flex items-center gap-2 shadow-lg shadow-primary/10 transition-transform hover:scale-102 cursor-pointer">
              <Play className="w-4.5 h-4.5 fill-current" /> Continue Learning
            </Button>
          </Link>
        </div>
      </div>

      {/* Course Status Grid */}
      <div className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Curriculum Status</h2>
          <p className="text-muted-foreground text-sm">Real-time breakdown of your learning milestones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsCards.map((card) => (
            <Card key={card.label} className="border-border/40 bg-card/65 backdrop-blur-md shadow-md rounded-2xl overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl border",
                    card.color === "emerald" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                    card.color === "violet" ? "bg-violet-500/10 text-violet-500 border-violet-500/20" :
                    "bg-primary/10 text-primary border-primary/20"
                  )}>
                    <card.icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-semibold text-sm text-foreground">{card.label}</span>
                </div>

                <div className="space-y-1">
                  <span className={cn(
                    "text-4xl font-extrabold font-mono tracking-tight",
                    card.color === "emerald" ? "text-emerald-500" :
                    card.color === "violet" ? "text-violet-500" :
                    "text-primary"
                  )}>
                    {card.value}
                  </span>
                  <p className="text-xs text-muted-foreground font-medium">{card.subtitle}</p>
                </div>

                <div className="w-full h-1.5 bg-muted/60 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      card.color === "emerald" ? "bg-emerald-500" :
                      card.color === "violet" ? "bg-violet-500" :
                      "bg-primary"
                    )}
                    style={{ width: `${Math.max(card.percent, 4)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Curriculum Progress Section (First 5 Modules) ── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-lg sm:text-xl font-bold tracking-tight uppercase">
              Course Progress · Foundation Modules
            </h2>
          </div>
          <Link href="/lesson" className="text-xs font-bold text-primary hover:underline flex items-center gap-1 uppercase tracking-wider">
            View All 31 Modules <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {firstFiveModules.map((module) => {
            const completedCount = module.lessons.filter((l) => completedLessons[l.id]).length;
            const progress = Math.round((completedCount / (module.lessons.length || 1)) * 100);
            const isCompleted = completedCount === module.lessons.length && module.lessons.length > 0;
            const firstLesson = module.lessons[0];
            const nextUnfinished = module.lessons.find((l) => !completedLessons[l.id]) || firstLesson;
            const moduleLessonUrl = `/lesson?path=${encodeURIComponent(getLessonPath(module, nextUnfinished))}&module=${module.num}&lesson=${nextUnfinished.id}`;

            return (
              <Card
                key={module.id}
                className="group relative flex flex-col justify-between border-border/40 shadow-sm hover:shadow-md transition-all duration-300 rounded-3xl overflow-hidden bg-card/65 backdrop-blur-md"
              >
                {/* Active top highlight */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="p-6 flex flex-col justify-between h-full space-y-5">
                  <div className="space-y-3.5">
                    {/* Header badge row */}
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                        MODULE {module.num}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                        <span className="bg-muted px-2 py-0.5 rounded">{module.category}</span>
                        <span>·</span>
                        <span>{module.totalDuration}</span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-lg sm:text-xl font-bold group-hover:text-primary transition-colors leading-snug">
                        {module.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {module.description}
                      </p>
                    </div>

                    {/* Lessons list preview */}
                    <div className="pt-2 border-t border-border/30 space-y-1.5">
                      <div className="text-[11px] font-bold font-mono text-muted-foreground uppercase tracking-wider">
                        Lessons Preview ({module.lessons.length} total)
                      </div>
                      <div className="space-y-1">
                        {module.lessons.slice(0, 3).map((lesson, idx) => {
                          const isDone = !!completedLessons[lesson.id];
                          const lesUrl = `/lesson?path=${encodeURIComponent(getLessonPath(module, lesson))}&module=${module.num}&lesson=${lesson.id}`;

                          return (
                            <Link
                              key={lesson.id}
                              href={lesUrl}
                              className="flex items-center justify-between p-1.5 px-2.5 rounded-lg hover:bg-muted/50 transition-colors text-xs group/les"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span className={cn(
                                  "w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] shrink-0",
                                  isDone ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                                )}>
                                  {isDone ? "✓" : idx + 1}
                                </span>
                                <span className={cn("truncate text-[11px]", isDone && "line-through opacity-70")}>
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-muted-foreground shrink-0 ml-2">
                                {lesson.duration}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-border/40">
                    {/* Progress Indicator */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                        <span>{completedCount} of {module.lessons.length} lessons completed</span>
                        <span className="text-primary font-bold">{progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div>
                      <Link href={moduleLessonUrl}>
                        <Button
                          variant="outline"
                          className="w-full rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer flex items-center justify-center gap-1.5 py-4"
                        >
                          {isCompleted ? "Review Module" : (progress > 0 ? "Resume Module" : "Start Module")}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
