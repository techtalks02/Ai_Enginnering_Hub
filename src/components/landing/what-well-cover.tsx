"use client";

import { useState, useEffect, useRef, type MouseEvent, type TouchEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHAT_WE_COVER } from "@/lib/constants";
import { cn } from "@/lib/utils";

function ThreeDCarousel() {
  const [rotationY, setRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(400);
  const [cardWidth, setCardWidth] = useState(280);
  const [cardHeight, setCardHeight] = useState(220);

  const startX = useRef(0);
  const startRotation = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const count = WHAT_WE_COVER.length;
  const angleStep = 360 / count;
  const activeModule = WHAT_WE_COVER[activeIndex];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(270);
        setCardWidth(220);
        setCardHeight(190);
      } else if (window.innerWidth < 1024) {
        setRadius(340);
        setCardWidth(250);
        setCardHeight(205);
      } else {
        setRadius(420);
        setCardWidth(280);
        setCardHeight(220);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let normalized = -rotationY % 360;
    if (normalized < 0) normalized += 360;
    const index = Math.round(normalized / angleStep) % count;
    setActiveIndex(index);
  }, [rotationY, angleStep, count]);

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const handlePointerStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
    startRotation.current = rotationY;
    lastX.current = clientX;
    lastTime.current = performance.now();
    velocity.current = 0;

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  };

  const handlePointerMove = (clientX: number, sensitivity: number) => {
    if (!isDragging) return;

    const dx = clientX - startX.current;
    const now = performance.now();
    const dt = now - lastTime.current;

    if (dt > 0) {
      const deltaX = clientX - lastX.current;
      const degreeDelta = (deltaX / window.innerWidth) * 360;
      velocity.current = degreeDelta / dt;
    }

    lastX.current = clientX;
    lastTime.current = now;
    setRotationY(startRotation.current + (dx / window.innerWidth) * 360 * sensitivity);
  };

  const animateTo = (targetAngle: number) => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    const startAngle = rotationY;
    const duration = 500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentAngle = startAngle + (targetAngle - startAngle) * ease;

      setRotationY(currentAngle);

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(tick);
      } else {
        animationFrameId.current = null;
      }
    };

    animationFrameId.current = requestAnimationFrame(tick);
  };

  const handlePointerEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    let targetRotation = rotationY;

    if (Math.abs(velocity.current) > 0.15) {
      const direction = velocity.current > 0 ? 1 : -1;
      const stepChange = Math.min(3, Math.round(Math.abs(velocity.current) * 12));
      targetRotation += direction * stepChange * angleStep;
    }

    const snapAngle = Math.round(targetRotation / angleStep) * angleStep;
    animateTo(snapAngle);
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    handlePointerStart(event.clientX);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    handlePointerMove(event.clientX, 0.55);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    handlePointerStart(event.touches[0].clientX);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    handlePointerMove(event.touches[0].clientX, 0.65);
  };

  const step = (dir: number) => {
    const currentSnap = Math.round(rotationY / angleStep) * angleStep;
    animateTo(currentSnap + dir * angleStep);
  };

  const selectIndex = (index: number) => {
    const targetRotation = -index * angleStep;
    let diff = (targetRotation - rotationY) % 360;

    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    animateTo(rotationY + diff);
  };

  return (
    <div className="relative w-full overflow-hidden py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-10 h-56 bg-[radial-gradient(circle_at_center,_rgba(196,92,38,0.22),_transparent_62%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_center,_rgba(123,104,166,0.16),_transparent_58%)] blur-3xl" />

      <div className="relative mx-auto mb-8 max-w-5xl rounded-[32px] border border-border/50 bg-card/45 p-4 shadow-[0_24px_100px_-48px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Roadmap Slider
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Active Module
              </p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                {activeModule.title}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
            <div className="rounded-2xl border border-border/50 bg-background/60 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">Phase</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{activeModule.id}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/60 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">Timeline</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{activeModule.duration}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80">
            Module {activeModule.id}
          </span>
          {activeModule.highlight ? (
            <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white">
              Highlight Track
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full border border-border/50 bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Core Track
            </span>
          )}
        </div>

        <div
          className={cn(
            "relative flex h-[360px] w-full items-center justify-center overflow-hidden rounded-[28px] border border-border/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] cursor-grab active:cursor-grabbing sm:h-[460px]",
            isDragging && "cursor-grabbing"
          )}
          style={{ perspective: "1400px" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handlePointerEnd}
          onMouseLeave={handlePointerEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handlePointerEnd}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.10),_transparent_46%)]" />
          <div className="pointer-events-none absolute bottom-10 left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-full bg-black/30 blur-3xl" />

          <div
            className="relative flex h-full w-full items-center justify-center transition-transform duration-75 ease-out"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(-7deg) rotateY(${rotationY}deg)`,
            }}
          >
            {WHAT_WE_COVER.map((module, index) => {
              const cardAngle = index * angleStep;
              let relAngle = (cardAngle + rotationY) % 360;
              if (relAngle < 0) relAngle += 360;

              const diffAngle = Math.min(relAngle, 360 - relAngle);
              const normalizedDist = diffAngle / 180;
              const scale = 1 - normalizedDist * 0.38;
              const opacity = 1 - normalizedDist * 0.72;
              const blurAmount = normalizedDist * 7;
              const yLift = normalizedDist * 18;
              const isCurrent = index === activeIndex;

              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => selectIndex(index)}
                  className={cn(
                    "absolute flex select-none flex-col justify-between overflow-hidden rounded-[28px] border p-5 text-left transition-all duration-300 sm:p-6",
                    "shadow-[0_28px_70px_-28px_rgba(0,0,0,0.65)]",
                    isCurrent ? "border-white/25 ring-1 ring-white/20" : "border-white/10"
                  )}
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    background: `linear-gradient(160deg, ${module.color} 0%, rgba(10,10,10,0.88) 135%)`,
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) translateY(${yLift}px) scale(${scale})`,
                    opacity,
                    filter: `blur(${blurAmount}px) saturate(${1 - normalizedDist * 0.25})`,
                    backfaceVisibility: "visible",
                    transformStyle: "preserve-3d",
                    zIndex: Math.round((1 - normalizedDist) * 100),
                  }}
                  aria-label={`Select module ${module.id}: ${module.title}`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.22),_transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_42%)]" />

                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-white/90">
                      Module {module.id}
                    </div>
                    {module.highlight && (
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/85">
                        <ArrowUpRight className="h-4.5 w-4.5" />
                      </div>
                    )}
                  </div>

                  <div className="relative z-10">
                    <span className="mb-3 block text-4xl font-light tracking-tight text-white/95">{module.id}</span>
                    <h3 className="mb-2 font-serif text-lg font-semibold leading-snug text-white sm:text-[1.15rem]">
                      {module.title}
                    </h3>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-mono text-white/72">{module.duration}</p>
                      <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/78">
                        {isCurrent ? "Now Viewing" : "Preview"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => step(1)}
              className="rounded-full border border-border bg-card/70 p-3 text-foreground shadow-md transition-all hover:scale-105 hover:bg-muted cursor-pointer"
              aria-label="Previous Module"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => step(-1)}
              className="rounded-full border border-border bg-card/70 p-3 text-foreground shadow-md transition-all hover:scale-105 hover:bg-muted cursor-pointer"
              aria-label="Next Module"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            <p className="hidden text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground sm:block">
              Drag or tap cards to explore
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {WHAT_WE_COVER.map((module, index) => (
              <button
                key={module.id}
                onClick={() => selectIndex(index)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer",
                  index === activeIndex
                    ? "border-primary bg-primary text-white shadow-md"
                    : "border-border/60 bg-background/55 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
                aria-label={`Go to module ${module.id}`}
              >
                <span>{module.id}</span>
                <span className="hidden sm:inline">{module.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-border/50 bg-card/40 p-5 shadow-[0_24px_80px_-50px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-primary">Focused Track</p>
          <h4 className="mt-3 font-serif text-2xl font-bold text-foreground">{activeModule.title}</h4>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            This module is part of a production-first roadmap designed to move from foundations into enterprise AI system design with practical delivery milestones.
          </p>
        </div>

        <div className="rounded-[28px] border border-border/50 bg-card/40 p-5 shadow-[0_24px_80px_-50px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-muted-foreground">Roadmap Position</p>
          <div className="mt-4 h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-primary via-orange-500 to-amber-400 transition-all duration-500"
              style={{ width: `${((activeIndex + 1) / count) * 100}%` }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="font-semibold text-foreground">
              Phase {activeModule.id} of {String(count).padStart(2, "0")}
            </span>
            <span className="text-muted-foreground">{activeModule.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhatWellCoverSection() {
  const GOOGLE_DOC_URL = "/ai-engineer-roadmap-complete.html";

  return (
    <section id="roadmap" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,_rgba(196,92,38,0.07),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="flex flex-col gap-4 sm:gap-5 mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                AI Engineer Roadmap
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                What we&apos;ll{" "}
                <span className="text-primary italic">cover.</span>
              </h2>
            </div>
            <p className="text-muted-foreground italic text-sm sm:text-base max-w-sm lg:text-right lg:pb-2 leading-relaxed">
              A complete production-grade journey. Every module grounded in real enterprise AI engineering.
            </p>
          </div>

          {/* CTA Button — full-width on mobile, auto on desktop */}
          <div className="w-full sm:w-auto">
            <a
              href={GOOGLE_DOC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block sm:inline-block"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white rounded-2xl gap-2.5 font-semibold cursor-pointer shadow-[0_8px_32px_-8px_rgba(196,92,38,0.5)] hover:shadow-[0_12px_40px_-8px_rgba(196,92,38,0.7)] hover:-translate-y-0.5 transition-all duration-200 py-3 px-6 text-sm sm:text-base"
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>View full roadmap document</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Interactive 3D Carousel Stage */}
        <ThreeDCarousel />
      </div>
    </section>
  );
}
