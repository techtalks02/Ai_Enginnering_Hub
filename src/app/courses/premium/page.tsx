"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Sparkles, Calendar, BookOpen, Star, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PREMIUM_COURSES = [
  {
    title: "Professional AI Engineer Bootcamp",
    badge: "12-Week Cohort",
    description: "Go from software developer to professional AI engineer. Master foundational LLM architectures, fine-tuning, retrieval pipelines, and scaling systems on AWS/GCP.",
    duration: "12 weeks · 120+ hours",
    rating: "4.9 (180+ reviews)",
    price: "₹24,999",
    originalPrice: "₹49,999",
    features: [
      "Live interactive Q&A and code reviews",
      "4 comprehensive production capstone projects",
      "1-on-1 mentorship with industry experts",
      "Dedicated Slack community & career placement assistance"
    ],
    isPopular: true
  },
  {
    title: "Multi-Agent System Orchestration with LangGraph",
    badge: "6-Week Advanced Masterclass",
    description: "Architect stateful, multi-agent workflows. Learn Supervisor patterns, human-in-the-loop validation, memory checkpoints, and tool-calling with Model Context Protocol (MCP).",
    duration: "6 weeks · 45+ hours",
    rating: "4.8 (95+ reviews)",
    price: "₹14,999",
    originalPrice: "₹29,999",
    features: [
      "Hands-on building of 3 production-grade agents",
      "Detailed focus on state design & graph cyclical workflows",
      "Integrations with MCP servers and custom database tools",
      "Certificate of Completion and repository portfolio review"
    ],
    isPopular: false
  },
  {
    title: "Enterprise RAG Systems in Production",
    badge: "4-Week Cohort",
    description: "Scale semantic search. Master hybrid BM25 + dense embedding indexing, metadata pre-filtering, cross-encoder rerankers, semantic caching, and LLM evaluation frameworks.",
    duration: "4 weeks · 30+ hours",
    rating: "4.9 (140+ reviews)",
    price: "₹9,999",
    originalPrice: "₹19,999",
    features: [
      "Build real-time vector search index with Pinecone/Qdrant",
      "Implement RAGAS metric evaluation pipeline",
      "Optimize token utilization and query latency by 40%",
      "Lifetime access to templates and github starter repositories"
    ],
    isPopular: false
  }
];

export default function PremiumCoursesPage() {
  return (
    <>
      <Header />
      <main className="flex-grow py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header text section */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Cohort-based learning
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Become an Expert with our <span className="text-primary">Premium Courses</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Level up your career with cohort-based bootcamps. Access live mentoring sessions, peer networks, code reviews, and build production-ready AI portfolios.
            </p>
          </div>

          {/* Grid list of courses */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {PREMIUM_COURSES.map((course, idx) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-3xl border ${
                  course.isPopular
                    ? "border-primary bg-card/60 shadow-xl shadow-primary/5"
                    : "border-border/60 bg-card/45"
                } p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md transition-all hover:scale-[1.01]`}
              >
                {course.isPopular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}
                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {course.badge}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-3">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{course.description}</p>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {course.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/80">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border/40 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-foreground">{course.price}</span>
                      <span className="text-sm line-through text-muted-foreground">{course.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  
                  <Link href="/dashboard">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl py-5 text-sm font-semibold cursor-pointer">
                      Enroll in Cohort
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Guarantee / Callout */}
          <div className="rounded-3xl border border-border/40 bg-card/25 p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-foreground mb-1">100% Satisfaction Guarantee</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Try the course for 7 days. If you are not satisfied, request a full refund. No questions asked.
                </p>
              </div>
            </div>
            <Link href="/#faq">
              <Button variant="outline" className="border-border/60 text-foreground hover:bg-muted shrink-0 rounded-xl px-6">
                Have questions? FAQs
              </Button>
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
