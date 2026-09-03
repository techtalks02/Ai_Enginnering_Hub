"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, ExternalLink, Gift, Unlock, Users } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FreeContentItem = {
  type: string;
  difficulty: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  tags: string[];
  link: string;
  hoverDetails: string[];
};

const PYTHON_PDF_URL = "https://drive.google.com/drive/folders/1k_kXP8YVL6mHxOB_FZpSqlucnhAL_CG2";
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@Techtalks02-ai";
const GITHUB_REPO_URL = "https://github.com/adinarayana02/techtalks";

const FREE_CONTENT: FreeContentItem[] = [
  {
    type: "Course",
    difficulty: "Beginner",
    title: "Python for AI Foundations",
    description: "Learn Python basics for AI with a simple direct-access study material flow.",
    duration: "12 Hours",
    thumbnail: "/assets/python_essentials_cover.png",
    tags: ["Python", "AI", "Beginner"],
    link: PYTHON_PDF_URL,
    hoverDetails: [
      "Covers Python basics, data types, lists, tuples, sets, and dictionaries.",
      "Good starting material for AI learners and software developers.",
      "Opens directly to the uploaded material without a separate detail page.",
    ],
  },
  {
    type: "Resource",
    difficulty: "Download",
    title: "Prompt Engineering Handbook",
    description: "Open the uploaded PDF directly and use it as your quick handbook.",
    duration: "100+ Pages",
    thumbnail: "/assets/ml handbook.png",
    tags: ["Algorithms", "Machine Learning", "Random forest"],
    link: PYTHON_PDF_URL,
    hoverDetails: [
      "Includes examples, explanations, and Python syntax reference.",
      "Useful for revision, practice, and fast concept lookup.",
      "Direct link behavior keeps the user flow simple and fast.",
    ],
  },
  {
    type: "Resource",
    difficulty: "Recording",
    title: "RAG Engineering",
    description: "Open the learning channel directly and access webinar-style content.",
    duration: "2 Hours",
    thumbnail: "/assets/advanced_rag_cover.png",
    tags: ["PyTorch", "Deep Learning", "Recording"],
    link: PYTHON_PDF_URL,
    hoverDetails: [
      "Focused on LLM app building patterns and practical workflows.",
      "Useful for exploring prompt chaining and production-minded concepts.",
      "Opens directly to the content source instead of a nested page.",
    ],
  },
  {
    type: "Starter Pack",
    difficulty: "Free",
    title: "Natural Language Processing (NLP)",
    description: "Open the starter project source directly and explore reusable code.",
    duration: "5 Projects",
    thumbnail: "/assets/NLP.png",
    tags: ["Boilerplate", "Templates", "Projects"],
    link: PYTHON_PDF_URL,
    hoverDetails: [
      "Useful for checking project structure and reusable setup patterns.",
      "Helps learners jump into building faster with existing code.",
      "Direct repository access removes unnecessary detail-page clicks.",
    ],
  },
];

export default function FreeContentPage() {
  return (
    <>
      <Header />
      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header section */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              <Gift className="h-3.5 w-3.5" />
              Free Learning Materials
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4">
              Free AI Engineering <span className="text-primary">Content</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Start building today. Access our free foundation courses, tool setup guides, live webinar recordings, and GitHub starter boilerplate codebases.
            </p>
          </div>

          {/* Grid of Free Content */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {FREE_CONTENT.map((content, idx) => (
              <motion.div
                key={content.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-card/45 p-5 shadow-md backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-card/75 hover:shadow-xl sm:p-6"
              >
                <div>
                  <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/30 bg-muted transition-transform duration-300 group-hover:scale-[1.01] sm:mb-5">
                    <img
                      src={content.thumbnail || "/assets/website-banner.png"}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <span className="flex items-center gap-1 bg-green-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        <Unlock className="h-3 w-3" />
                        Free
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 mb-2.5 sm:mb-3">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider",
                        content.difficulty?.toLowerCase() === "beginner"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : content.difficulty?.toLowerCase() === "intermediate"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400"
                      )}
                    >
                      {content.difficulty}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1 font-semibold uppercase">
                      <Clock className="w-3.5 h-3.5" /> {content.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-1.5 sm:mb-2">
                    {content.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 sm:mb-5">
                    {content.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
                    {content.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[9px] font-bold tracking-wider font-mono bg-muted/80 rounded-md text-muted-foreground/90 uppercase border border-border/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-56 group-hover:opacity-100 group-focus-within:max-h-56 group-focus-within:opacity-100">
                    <div className="p-4">
                      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                        More Details
                      </p>
                      <div className="space-y-2">
                        {content.hoverDetails.map((detail) => (
                          <div key={detail} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <a href={content.link} target="_blank" rel="noreferrer" className="block w-full">
                    <Button className="w-full cursor-pointer rounded-xl bg-primary py-4 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-primary/95 hover:shadow-lg sm:py-5">
                      Get Free Access
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <p className="mt-2 flex items-center justify-center gap-1 text-[11px] font-medium text-muted-foreground">
                    Opens material directly
                    <ExternalLink className="h-3.5 w-3.5" />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Community CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary/5 border border-primary/20 rounded-3xl p-6 sm:p-8 lg:p-10 text-center max-w-4xl mx-auto backdrop-blur-sm"
          >
            <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto mb-3 sm:mb-4">
              <Users className="h-5 sm:h-6 w-5 sm:w-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2">Join our Community</h3>
            <p className="text-sm text-muted-foreground mb-5 sm:mb-6 max-w-xl mx-auto">
              Connect with 5,000+ software developers and AI practitioners. Participate in code challenges, weekly build sessions, and get help from mentors.
            </p>
            <Link href="/community">
              <Button className="bg-[#C45C26] hover:bg-[#C45C26]/90 text-white rounded-xl px-6 sm:px-8 py-2.5 sm:py-3 cursor-pointer font-semibold text-sm">
                Join Community
              </Button>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="mt-10 sm:mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link href="/courses" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                View All Courses
                <CheckCircle2 className="w-4 h-4" />
              </Link>
              <Link href="/courses/ai-projects" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                View AI Projects
                <CheckCircle2 className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
