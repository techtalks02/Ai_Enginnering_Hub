"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReadyToMasterSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden bg-[#F9F7F2] dark:bg-[#151515] border-t border-border/50">
      {/* Background Decorative Gradients for Premium Feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Main Title - Always visible */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
              Ready to Master{" "}
              <span className="text-primary italic">Agentic AI?</span>
            </h2>

            {/* Subtitle - Always visible */}
            <p className="text-muted-foreground text-sm sm:text-base lg:text-xl max-w-2xl mx-auto leading-relaxed font-light font-sans">
              Start with the foundations or jump to the roadmap. Either way, you&apos;ll be building real AI applications by the end of Level 2.
            </p>

            {/* Curriculum stat pill */}
            <div className="flex justify-center pt-1">
              <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-border/50 bg-card/80 backdrop-blur-sm px-5 py-2.5 shadow-sm">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Curriculum</span>
                <span className="h-3.5 w-px bg-border/70" />
                <span className="text-[11px] sm:text-xs font-bold text-foreground">31 modules</span>
                <span className="text-muted-foreground/50 text-xs">·</span>
                <span className="text-[11px] sm:text-xs font-bold text-foreground">991 lessons</span>
              </div>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="pt-3 sm:pt-4 flex justify-center">
            <Link href="/overview">
              <Button size="lg" className="h-12 sm:h-14 px-8 sm:px-10 text-sm sm:text-base font-semibold gap-3 group shadow-xl hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                View Full Roadmap
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

