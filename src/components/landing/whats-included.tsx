"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { WHATS_INCLUDED } from "@/lib/constants";

export function WhatsIncludedSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Light texture */}
      <div className="pointer-events-none absolute inset-0 bg-[#F9F7F2]/40 dark:bg-[#121212]/20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
            <Package className="w-3.5 h-3.5" />
            Everything you get
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">
            What&apos;s included in the course
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {WHATS_INCLUDED.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group rounded-2xl bg-card border border-border/50 p-5 sm:p-6 flex gap-4 sm:gap-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl text-lg sm:text-xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${item.color}18` }}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-1.5 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
