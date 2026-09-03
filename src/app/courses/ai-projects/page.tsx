"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Sparkles, Clock, ArrowUpRight, Lock, Unlock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PROJECTS = [
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
  {
    title: "Search Relevance Optimizer",
    author: "Tech Talks Team",
    tags: ["Search", "Optimization", "AI"],
    image: "/assets/semantic search engine.png",
    duration: "9 hours",
    isFree: true,
    link: "https://github.com/techtalks02/Search-Relevance-Optimizer-System"
  }
];

export default function AIProjectsPage() {
  return (
    <>
      <Header />
      <main className="flex-grow py-12 sm:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Real World <span className="text-primary">Projects</span>
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Curated by industry experts</span>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Build production-grade AI applications with step-by-step guides and complete source code.
            </p>
          </div>

          {/* Grid of Projects */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
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
                <div className="absolute top-4 left-4">
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
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    {project.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
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

        </div>
      </main>
      <Footer />
    </>
  );
}
