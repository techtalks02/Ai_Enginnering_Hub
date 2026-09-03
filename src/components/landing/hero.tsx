"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRUSTED_COMPANIES } from "@/lib/constants";
import { useUIStore } from "@/store/ui-store";

export function HeroSection() {
  const openReserveSeat = useUIStore((s) => s.openReserveSeat);

  return (
    <section className="relative overflow-hidden min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)] lg:min-h-[calc(100svh-6rem)]">
      {/* Decorative gradients */}
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(196,92,38,0.14),transparent_55%)] pointer-events-none" />

      <div className="mx-auto flex min-h-full max-w-7xl flex-col justify-center px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

          {/* ── Image: Displayed FIRST on mobile (order-1), Right on desktop (order-2) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2 relative mx-auto w-full max-w-2xl mb-4 lg:mb-0"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 shadow-[0_40px_120px_-60px_rgba(196,92,38,0.35)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.28),transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(255,180,50,0.18),transparent_35%)] pointer-events-none" />
              <Image
                src="/assets/website-banner.png"
                alt="AI Engineer Roadmap"
                width={900}
                height={700}
                className="relative z-10 h-full w-full object-cover"
                priority
              />
            </div>

            {/* Floating stats pill */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-card/95 border border-border/50 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 shadow-lg sm:gap-4 z-20">
              <div className="text-center">
                <div className="text-sm sm:text-base font-bold text-foreground">9</div>
                <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Phases</div>
              </div>
              <div className="h-6 sm:h-8 w-px bg-border/60" />
              <div className="text-center">
                <div className="text-sm sm:text-base font-bold text-foreground">20+</div>
                <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Projects</div>
              </div>
              <div className="h-6 sm:h-8 w-px bg-border/60" />
              <div className="text-center">
                <div className="text-sm sm:text-base font-bold text-foreground">26</div>
                <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Weeks</div>
              </div>
            </div>
          </motion.div>

          {/* ── Copy & CTAs: Displayed SECOND on mobile (order-2), Left on desktop (order-1) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1 text-center lg:text-left mt-2 lg:mt-0"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              AI Engineering Cohort · Now Enrolling
            </div>

            <h1 className="mx-auto max-w-3xl font-serif text-[32px] leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[42px] md:text-[58px] lg:mx-0 lg:text-[72px] font-bold">
              Learn with clarity. Build with confidence.{" "}
              <span className="text-primary">Become an AI Engineer.</span>
            </h1>

            <p className="mx-auto mt-4 sm:mt-5 max-w-3xl text-[14px] leading-[1.7] text-muted-foreground sm:text-[17px] md:text-[19px] lg:mx-0">
              Master LLM-powered applications from Python foundations to multi-agent orchestration, RAG pipelines, and cloud deployment — with real enterprise projects.
            </p>

            {/* CTA Buttons: Start Learning Now, Articles, 1:1 Call */}
            <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start lg:justify-start">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="inline-flex w-full items-center justify-center rounded-[1.75rem] bg-secondary px-8 py-4 text-[16px] font-semibold text-white transition-all hover:bg-secondary/90 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto sm:text-[17px] md:text-[18px] lg:text-[19px] cursor-pointer"
                >
                  Start Learning Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <div className="flex w-full gap-3 sm:w-auto">
                <a
                  href="https://substack.com/@techtalks02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="inline-flex w-full items-center justify-center rounded-[1.75rem] border border-primary/20 bg-background/70 px-5 py-4 text-[14px] font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:shadow-md sm:w-auto sm:text-[15px] cursor-pointer"
                  >
                    <BookOpen className="mr-1.5 h-4 w-4" />
                    Articles
                  </Button>
                </a>

                <a
                  href="https://superprofile.bio/bookings/techtalks02-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="inline-flex w-full items-center justify-center rounded-[1.75rem] border border-primary/20 bg-background/70 px-5 py-4 text-[14px] font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:shadow-md sm:w-auto sm:text-[15px] cursor-pointer"
                  >
                    <Play className="mr-1.5 h-4 w-4" />
                    1:1 Call
                  </Button>
                </a>
              </div>
            </div>

            {/* Reserve Seat Button */}
            <div className="mt-4 flex justify-center lg:justify-start">
              <button
                onClick={openReserveSeat}
                className="inline-flex w-full max-w-[360px] items-center justify-center rounded-[2rem] bg-gradient-to-r from-primary via-orange-500 to-amber-400 px-6 py-4 text-[15px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_28px_80px_-40px_rgba(196,92,38,0.85)] transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 sm:text-[16px] md:text-[17px] lg:text-[18px] cursor-pointer"
              >
                Reserve Seat ·{" "}
                <span className="line-through opacity-70 mx-1">₹299</span>{" "}
                Free →
              </button>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
