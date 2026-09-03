"use client";

import { motion } from "framer-motion";
import { Clock, ArrowUpRight, Lock, Unlock, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SAMPLE_PROJECTS = [
  {
    title: "production-style-Retrieval-Augmented-Generation-RAG-application",
    author: "Tech Talks Team",
    tags: ["RAG", "FastAPI", "ChromaDB", "LangChain"],
    image: "/assets/Project level RAG SYSTEm.png",
    duration: "8 hours",
    isFree: true,
    link: "https://github.com/techtalks02/-production-style-Retrieval-Augmented-Generation-RAG-application"
  },
  {
    title: "Multi-Agent Coding Assistant",
    author: "Tech Talks Team",
    tags: ["LangGraph", "Agents", "qwen3", "Ollama"],
    image: "/assets/Multi-Agent Coding Assistant.png",
    duration: "12 hours",
    isFree: true,
    link: "https://github.com/techtalks02/Multi-Agent-AI-Coding-Assistant."
  },
  {
    title: "Healthcare AI Assistant",
    author: "Tech Talks Team",
    tags: ["Healthcare", "AI", "LangChain", "Ollama"],
    image: "/assets/Health-care-Ai-Assistant.png",
    duration: "6 hours",
    isFree: true,
    link: "https://github.com/techtalks02/Health-care-Ai-Assistant"
  },
  {
    title: "AI Interview Coach",
    author: "Tech Talks Team",
    tags: ["Interview", "AI", "Gemini"],
    image: "/assets/Ai interview coacj.png",
    duration: "10 hours",
    isFree: true,
    link: "https://github.com/techtalks02/Multi-Agent-Interview-Preparation-System"
  },
];

export function SampleProjectsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-white/40 dark:bg-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
            <FlaskConical className="w-3.5 h-3.5" />
            Open Source
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4">
            Sample AI <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Get a taste of what you&apos;ll build with our step-by-step project guides.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {SAMPLE_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-border/40 bg-card hover:border-primary/30 hover:shadow-xl transition-all"
            >
              {/* Project image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Free/Badge badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                {project.isFree ? (
                  <span className="flex items-center gap-1 bg-green-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    <Unlock className="h-3 w-3" />
                    Free
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    <Lock className="h-3 w-3" />
                    Paid
                  </span>
                )}
              </div>

              {/* Project content */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-1.5 mb-2.5 sm:mb-3 flex-wrap">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[10px] text-muted-foreground">+{project.tags.length - 3}</span>
                  )}
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-foreground mb-1.5 sm:mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    By {project.author}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {project.duration}
                  </span>
                </div>

                {/* View Project Button */}
                <Link href={project.link} className="block w-full">
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl py-2.5 text-xs font-semibold cursor-pointer">
                    View Project
                    <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link href="/courses/ai-projects" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
            View All Projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
