"use client";

import { motion } from "framer-motion";
import { Hammer } from "lucide-react";
import { PROJECTS } from "@/lib/constants";

export function ProjectsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-white/30 dark:bg-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
            <Hammer className="w-3.5 h-3.5" />
            Capstone Projects
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4">
            What you&apos;ll build
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto text-sm sm:text-base">
            Production-grade projects that demonstrate real AI engineering skills to employers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl bg-card border border-border/50 p-6 sm:p-7 hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-orange-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="h-1 w-10 rounded-full bg-primary mb-4 sm:mb-5 group-hover:w-16 transition-all duration-300" />
              <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
