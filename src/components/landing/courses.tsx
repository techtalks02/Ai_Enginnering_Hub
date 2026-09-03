"use client";

import { motion } from "framer-motion";
import { Clock, BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COURSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CoursesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Our Courses</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4">
            Learn production-ready AI engineering
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            From Python fundamentals to multi-agent systems, build skills that land you jobs at top companies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {COURSES.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-3xl border border-border/60 bg-card/45 p-5 sm:p-6 flex flex-col justify-between backdrop-blur-md hover:border-primary/50 hover:bg-card/75 transition-all shadow-md hover:shadow-xl duration-300 relative overflow-hidden"
            >
              <div>
                {/* Thumbnail Cover Image */}
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-muted border border-border/30 mb-4 sm:mb-5 relative group-hover:scale-[1.01] transition-transform duration-300">
                  <img
                    src={course.thumbnail_url || "/assets/website-banner.png"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Metadata: Difficulty & Duration */}
                <div className="flex items-center justify-between gap-4 mb-2.5 sm:mb-3">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider",
                      course.difficulty?.toLowerCase() === "beginner"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : course.difficulty?.toLowerCase() === "intermediate"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400"
                    )}
                  >
                    {course.difficulty}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1 font-semibold uppercase">
                    <Clock className="w-3.5 h-3.5" /> {course.duration_hours} Hours
                  </span>
                </div>

                {/* Course Text Details */}
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-1.5 sm:mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-5 sm:mb-6">
                  {course.short_description}
                </p>

                {/* Tag List */}
                <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
                  {course.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[9px] font-bold tracking-wider font-mono bg-muted/80 rounded-md text-muted-foreground/90 uppercase border border-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {/* Price Row */}
                <div className="flex items-center gap-3 border-t border-border/20 pt-3.5 sm:pt-4 mb-5 sm:mb-6">
                  {!course.is_free && (
                    <span className="text-xs text-muted-foreground line-through font-mono">
                      ₹{course.originalPrice?.toLocaleString()}
                    </span>
                  )}
                  <span className="text-base sm:text-lg font-extrabold text-foreground font-mono">
                    {course.is_free ? "Free" : `₹${course.price?.toLocaleString()}`}
                  </span>
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {course.discount}
                  </span>
                </div>

                {/* CTA Buttons */}
                <Link href={course.buyLink} target="_blank" rel="noopener noreferrer" className="w-full block">
                  <Button className="w-full bg-primary hover:bg-primary/95 text-white rounded-xl py-4 sm:py-5 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer">
                    {course.is_free ? "ENROLL NOW" : "BUY NOW"}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link href="/courses" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
            View all courses
            <CheckCircle2 className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
