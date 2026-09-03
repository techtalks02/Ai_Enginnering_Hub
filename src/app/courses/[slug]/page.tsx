"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  BookOpen, Clock, Award, FileText, ArrowLeft, CheckCircle2,
  Circle, HelpCircle, ChevronRight, Lock, ExternalLink, RefreshCw,
  Sparkles, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

// Syllabus / Registry for courses
const COURSE_DETAILS: Record<string, {
  id: string;
  title: string;
  difficulty: string;
  duration: string;
  pdf_url?: string;
  description: string;
  tags: string[];
  lessons: string[];
  lessonExplanations: Record<string, {
    title: string;
    content: string;
    keyPoints: string[];
  }>;
  buyNowLink: string;
  quizQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}> = {
  "python-ai-foundations": {
    id: "m-00000000-0000-0000-0000-000000000001",
    title: "Python for AI Foundations",
    difficulty: "Beginner",
    duration: "12 Hours",
    pdf_url: "https://pub-743b665653ac4510a8ab8bfcc165590e.r2.dev/Python%20Fundamentals/complete%20python%20core.pdf",
    description: "Master clean object-oriented Python, asynchronous programming patterns, and Pydantic validation for robust LLM applications.",
    tags: ["Python", "AsyncIO", "Pydantic"],
    buyNowLink: "https://superprofile.bio/vp/ai-engineer--zero-to-production",
    lessons: [
      "Google Colab Tutorial: Step-by-Step Guide for Beginners",
      "Keywords, Identifiers & Comments",
      "Indentation, Statements & Variables",
      "Data Types vs Data Structures Explained",
      "Numeric Data Types & Strings",
      "Lists in Python: Methods & Manipulation",
      "Tuples in Python: Mastering Immutable Data Structures",
      "Sets in Python: Methods & Manipulations",
      "Dictionaries in Python: Methods & Manipulation",
      "Advanced Dict & Lists comprehensions"
    ],
    lessonExplanations: {
      "Google Colab Tutorial: Step-by-Step Guide for Beginners": {
        title: "Getting Started with Google Colab",
        content: "Google Colab is a free cloud-based platform that allows you to write and execute Python code in your browser. It provides free access to GPU and TPU resources, making it ideal for AI and machine learning projects.",
        keyPoints: [
          "Free cloud-based Jupyter notebook environment",
          "Access to GPU/TPU for accelerated computing",
          "Easy sharing and collaboration features",
          "Pre-installed popular ML libraries"
        ]
      },
      "Keywords, Identifiers & Comments": {
        title: "Python Building Blocks",
        content: "Keywords are reserved words with special meanings in Python. Identifiers are names given to variables, functions, classes, etc. Comments help document your code and are ignored by the interpreter.",
        keyPoints: [
          "Python has 35+ keywords like if, else, for, while, def",
          "Identifiers follow snake_case convention in Python",
          "Single-line comments start with #",
          "Multi-line comments use triple quotes ''' or \"\"\""
        ]
      },
      "Indentation, Statements & Variables": {
        title: "Python Syntax Fundamentals",
        content: "Unlike other languages that use braces, Python uses indentation to define code blocks. Variables are containers for storing data values, and Python is dynamically typed.",
        keyPoints: [
          "Indentation defines code blocks (4 spaces recommended)",
          "No need to declare variable types explicitly",
          "Variables can change type after assignment",
          "Multiple assignment is supported (a, b = 1, 2)"
        ]
      },
      "Data Types vs Data Structures Explained": {
        title: "Data Organization in Python",
        content: "Data types are the basic types of data (int, float, string, boolean). Data structures are collections that organize and group data types together in different ways.",
        keyPoints: [
          "Basic data types: int, float, str, bool, None",
          "Built-in data structures: list, tuple, set, dict",
          "Mutable vs immutable types",
          "Type hints improve code readability"
        ]
      },
      "Numeric Data Types & Strings": {
        title: "Working with Numbers and Text",
        content: "Python supports integers, floating-point numbers, and complex numbers. Strings are sequences of Unicode characters and are immutable.",
        keyPoints: [
          "Integers have unlimited precision",
          "Floats use double-precision (64-bit)",
          "String formatting with f-strings",
          "String methods: upper(), lower(), split(), join()"
        ]
      },
      "Lists in Python: Methods & Manipulation": {
        title: "Dynamic Arrays in Python",
        content: "Lists are ordered, mutable collections that can hold items of different types. They support various methods for adding, removing, and modifying elements.",
        keyPoints: [
          "Zero-indexed and ordered",
          "Mutable: can modify elements in place",
          "Common methods: append(), extend(), pop(), remove()",
          "List slicing with [start:end:step]"
        ]
      },
      "Tuples in Python: Mastering Immutable Data Structures": {
        title: "Immutable Sequences",
        content: "Tuples are similar to lists but are immutable, meaning they cannot be modified after creation. They are faster and use less memory than lists.",
        keyPoints: [
          "Created with parentheses (1, 2, 3)",
          "Immutable: cannot change elements",
          "Useful for fixed data that shouldn't change",
          "Can be used as dictionary keys"
        ]
      },
      "Sets in Python: Methods & Manipulations": {
        title: "Unordered Unique Collections",
        content: "Sets are unordered collections of unique elements. They are useful for membership testing and eliminating duplicate entries.",
        keyPoints: [
          "Unordered: elements have no index",
          "No duplicate elements allowed",
          "Set operations: union, intersection, difference",
          "Created with curly braces {1, 2, 3} or set()"
        ]
      },
      "Dictionaries in Python: Methods & Manipulation": {
        title: "Key-Value Pair Storage",
        content: "Dictionaries store key-value pairs where keys must be unique and hashable. They provide O(1) average time complexity for lookups.",
        keyPoints: [
          "Keys must be immutable (strings, numbers, tuples)",
          "Values can be any type",
          "Methods: get(), keys(), values(), items()",
          "Dictionary comprehensions for creation"
        ]
      },
      "Advanced Dict & Lists comprehensions": {
        title: "Efficient Data Creation",
        content: "Comprehensions provide a concise way to create lists, dictionaries, and sets. They are more readable and often faster than using loops with append().",
        keyPoints: [
          "List comprehensions: [x for x in iterable]",
          "Dictionary comprehensions: {k: v for k, v in items}",
          "Can include conditional logic",
          "Nested comprehensions for complex structures"
        ]
      }
    },
    quizQuestions: [
      {
        question: "What is cooperative multitasking in Python's AsyncIO?",
        options: [
          "Multiple OS threads running concurrently.",
          "Tasks voluntarily yielding control back to the event loop using await.",
          "The OS forcing threads to swap at regular intervals."
        ],
        correctAnswer: 1,
        explanation: "In AsyncIO, cooperative multitasking means that the running task explicitly yields control back to the event loop (usually using await), allowing other tasks to run."
      },
      {
        question: "What does Pydantic do when you initialize a BaseModel with invalid types?",
        options: [
          "It silently converts them or ignores the validation.",
          "It raises a ValidationError at runtime.",
          "It throws a syntax error compile-time."
        ],
        correctAnswer: 1,
        explanation: "Pydantic raises a ValidationError at runtime, identifying exactly which fields failed validation and why."
      },
      {
        question: "What is the primary function of __init__.py in a directory?",
        options: [
          "It makes Python treat the directory as containing packages.",
          "It initializes database configurations.",
          "It acts as a script to trigger the event loop."
        ],
        correctAnswer: 0,
        explanation: "The __init__.py file is used to mark directories on disk as Python package directories so they can be imported."
      }
    ]
  },
  "advanced-rag-systems": {
    id: "m-00000000-0000-0000-0000-000000000002",
    title: "Advanced RAG Systems",
    difficulty: "Intermediate",
    duration: "18 Hours",
    description: "Build state-of-the-art Retrieval-Augmented Generation pipelines incorporating hybrid index searches, rerankers, and Ragas metrics.",
    tags: ["RAG", "Pinecone", "Reranking"],
    buyNowLink: "https://superprofile.bio/vp/ai-agent-handnotes",
    lessons: [
      "Introduction to RAG & Production RAG Architecture",
      "Document Ingestion, Parsing & Data Preprocessing",
      "Chunking Strategies (Fixed, Recursive, Semantic & Parent-Child)",
      "Embedding Models & Vector Databases (FAISS, Chroma, Pinecone, Qdrant)",
      "Indexing, Metadata Management & Vector Storage",
      "Retrieval Strategies (Dense, Sparse, Hybrid & Multi-Query Search)",
      "Reranking, Context Compression & Query Transformation"
    ],
    lessonExplanations: {},
    quizQuestions: [
      {
        question: "What does RAG stand for in Generative AI?",
        options: [
          "Randomized Adversarial Generation",
          "Retrieval-Augmented Generation",
          "Response Auto-Grading"
        ],
        correctAnswer: 1,
        explanation: "RAG stands for Retrieval-Augmented Generation, where external database information is retrieved and added to the prompt context before generating a response."
      }
    ]
  },
  "multi-agent-mcp": {
    id: "m-00000000-0000-0000-0000-000000000003",
    title: "Multi-Agent Orchestration & MCP",
    difficulty: "Advanced",
    duration: "24 Hours",
    description: "Orchestrate agent teams utilizing Supervisor-worker loops, CrewAI workflows, and tool calling via the Model Context Protocol.",
    tags: ["Agents", "MCP", "LangGraph"],
    buyNowLink: "https://superprofile.bio/vp/ai-agent-handnotes",
    lessons: [
      "Introduction to AI Agents & Agent Architecture",
      "Setting Up LLM APIs (OpenAI, Gemini & Claude)",
      "System Prompts, Roles & Message Architecture",
      "Understanding the Agent Loop (Think → Act → Observe)",
      "Prompt Engineering for AI Agents",
      "Tool Calling & Function Calling"
    ],
    lessonExplanations: {},
    quizQuestions: [
      {
        question: "What is the primary role of a Supervisor agent in multi-agent orchestration?",
        options: [
          "To execute tool-calling queries.",
          "To coordinate tasks and route communication between specialized worker agents.",
          "To clean training data sets."
        ],
        correctAnswer: 1,
        explanation: "A Supervisor agent routes instructions, breaks down tasks, and delegates them to specialized worker agents dynamically."
      }
    ]
  },
  "ai-agents-handbook": {
    id: "m-00000000-0000-0000-0000-000000000003",
    title: "AI Agents Handbook (Beginner to Advanced)",
    difficulty: "Advanced",
    duration: "24 Hours",
    description: "Orchestrate agent teams utilizing Supervisor-worker loops, CrewAI workflows, and tool calling via the Model Context Protocol.",
    tags: ["Agents", "MCP", "LangGraph"],
    buyNowLink: "https://superprofile.bio/vp/ai-agent-handnotes",
    lessons: [
      "Introduction to AI Agents & Agent Architecture",
      "Setting Up LLM APIs (OpenAI, Gemini & Claude)",
      "System Prompts, Roles & Message Architecture",
      "Understanding the Agent Loop (Think → Act → Observe)",
      "Prompt Engineering for AI Agents",
      "Tool Calling & Function Calling"
    ],
    lessonExplanations: {},
    quizQuestions: [
      {
        question: "What is the primary role of a Supervisor agent in multi-agent orchestration?",
        options: [
          "To execute tool-calling queries.",
          "To coordinate tasks and route communication between specialized worker agents.",
          "To clean training data sets."
        ],
        correctAnswer: 1,
        explanation: "A Supervisor agent routes instructions, breaks down tasks, and delegates them to specialized worker agents dynamically."
      }
    ]
  },
  "llmops-cloud-deployment": {
    id: "m-00000000-0000-0000-0000-000000000004",
    title: "LLMOps & Cloud Deployment",
    difficulty: "Advanced",
    duration: "14 Hours",
    description: "Package, evaluate, deploy, and scale large language model servers in Kubernetes with serverless GPU inference providers.",
    tags: ["LLMOps", "Docker", "Modal"],
    buyNowLink: "https://superprofile.bio/vp/ai-agent-handnotes",
    lessons: [
      "Building REST APIs with FastAPI for AI Applications",
      "FastAPI vs uvicorn deployment configuration",
      "Dockerizing FastAPI Backends for production setups",
      "Deploying servers to Render, AWS, and GCP clouds"
    ],
    lessonExplanations: {},
    quizQuestions: [
      {
        question: "Which python library is commonly used to build production REST APIs for AI services?",
        options: [
          "Django templates",
          "FastAPI",
          "Tkinter"
        ],
        correctAnswer: 1,
        explanation: "FastAPI is heavily utilized for AI backends due to its asynchronous support, speed, and automatic validation with Pydantic schemas."
      }
    ]
  }
};

type CourseEnrollment = {
  progress: number;
  completed: boolean;
  lessonStatus?: Record<string, boolean>;
};

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { isAuthenticated } = useAuthStore();
  const course = COURSE_DETAILS[slug];

  const getStoredEnrollments = (): Record<string, CourseEnrollment> => {
    if (typeof window === "undefined") {
      return {};
    }

    try {
      const saved = localStorage.getItem("mock_enrollments");
      if (!saved) {
        return {};
      }

      const parsed = JSON.parse(saved) as Record<string, CourseEnrollment>;
      return parsed;
    } catch (error) {
      console.error("Failed to load enrollment status:", error);
      return {};
    }
  };

  // Tab management
  const [activeTab, setActiveTab] = useState<"material" | "syllabus" | "quiz">("material");

  // Lessons completed list state
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>(() => {
    if (!course) {
      return {};
    }

    const enrollments = getStoredEnrollments();
    return enrollments[course.id]?.lessonStatus ?? {};
  });
  const [mockEnrollments, setMockEnrollments] = useState<Record<string, CourseEnrollment>>(getStoredEnrollments);

  // Selected lesson for split view
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  // Quiz interactive state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Fetch user enrollments (only if authenticated)
  const { data: dbEnrollments, isLoading: enrollmentsLoading, error: enrollmentsError } = useQuery({
    queryKey: ["enrollments"],
    queryFn: () => api.get("/courses/enrollments/me").then((r) => r.data),
    enabled: isAuthenticated,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const enrollmentList = (enrollmentsError ? [] : dbEnrollments) || [];

  if (!course) {
    return (
      <>
        <Header />
        <main className="flex-grow py-24 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 space-y-4">
            <h1 className="font-serif text-3xl font-bold">Course Not Found</h1>
            <p className="text-muted-foreground text-sm">We could not find the course page you are looking for.</p>
            <Link href="/dashboard">
              <Button className="bg-primary text-white rounded-xl">Back to Dashboard</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Course is always fully unlocked and accessible
  const isEnrolled = true;

  // Toggle single lesson checkbox
  const toggleLesson = (lessonName: string) => {
    const updated = {
      ...completedLessons,
      [lessonName]: !completedLessons[lessonName]
    };
    setCompletedLessons(updated);

    // Save back to mock_enrollments and calculate progress percentage
    const completedCount = Object.values(updated).filter(Boolean).length;
    const totalCount = course.lessons.length;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const completed = progress === 100;

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mock_enrollments") || "{}";
      try {
        const enrollments = JSON.parse(saved);
        enrollments[course.id] = {
          progress,
          completed,
          lessonStatus: updated
        };
        localStorage.setItem("mock_enrollments", JSON.stringify(enrollments));
      } catch (e) {
        console.error("Failed to save progress:", e);
      }
    }
  };

  // Handle Quiz Submission
  const handleQuizSubmit = () => {
    let score = 0;
    course.quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const totalLessonsChecked = Object.values(completedLessons).filter(Boolean).length;
  const currentProgressPercent = course.lessons.length > 0 ? Math.round((totalLessonsChecked / course.lessons.length) * 100) : 0;

  return (
    <>
      <Header />
      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-xl text-xs font-semibold hover:bg-muted/50 cursor-pointer">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
              </Button>
            </Link>

            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <span>Courses</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">{course.title}</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-border/60 bg-card/80 p-5 shadow-[0_24px_90px_-40px_rgba(196,92,38,0.45)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(196,92,38,0.18),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(108,92,231,0.16),_transparent_50%)]" />
            <div className="relative z-10 grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-primary/10 text-primary">
                    {course.difficulty}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1 font-semibold uppercase">
                    <Clock className="w-3.5 h-3.5" /> {course.duration}
                  </span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  {course.title}
                </h1>
                <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {course.description}
                </p>
              </div>

              <div className="rounded-[24px] border border-primary/20 bg-background/75 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Course progress</p>
                    <p className="mt-1 font-serif text-xl font-bold text-foreground">{currentProgressPercent}% complete</p>
                  </div>
                  <div className="rounded-2xl bg-primary/10 px-3 py-2 text-right">
                    <p className="text-2xl font-bold text-primary">{currentProgressPercent}%</p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">done</p>
                  </div>
                </div>

                <div className="mt-4 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-primary via-orange-500 to-amber-400 transition-all duration-300"
                    style={{ width: `${currentProgressPercent}%` }}
                  />
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-muted/40 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Lessons</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{course.lessons.length}</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-muted/40 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Completed</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{totalLessonsChecked}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-8 items-start">

            <div className="space-y-6">

              <div className="overflow-x-auto rounded-[24px] border border-border/60 bg-muted/30 p-1.5">
                <div className="flex min-w-max gap-2">
                  <button
                    onClick={() => setActiveTab("material")}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-[0.25em] transition-all sm:min-w-[150px]",
                      activeTab === "material" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <BookOpen className="w-4 h-4" /> Study Material
                  </button>
                  <button
                    onClick={() => setActiveTab("syllabus")}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-[0.25em] transition-all sm:min-w-[140px]",
                      activeTab === "syllabus" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <FileText className="w-4 h-4" /> Outline
                  </button>
                  <button
                    onClick={() => setActiveTab("quiz")}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-[0.25em] transition-all sm:min-w-[150px]",
                      activeTab === "quiz" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Award className="w-4 h-4" /> Practice Quiz
                  </button>
                </div>
              </div>

              {/* Tab Content 1: Split View - PDF + Lesson Explanation */}
              {activeTab === "material" && (
                <div className="space-y-4">
                  {course.pdf_url ? (
                    <>
                      {/* Tips bar */}
                      <div className="rounded-[24px] border border-primary/20 bg-gradient-to-r from-primary/10 via-background/70 to-background/60 p-4 shadow-sm sm:p-5">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                          <div className="text-sm leading-relaxed text-foreground/80">
                            <strong>Interactive learning mode</strong> — select a lesson below to view the PDF and explanation side-by-side without leaving the page.
                          </div>
                          <a
                            href={course.pdf_url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full lg:w-auto inline-flex"
                          >
                            <Button size="sm" variant="outline" className="w-full text-xs font-bold rounded-xl gap-1.5 cursor-pointer shadow-sm lg:w-auto">
                              Open PDF <ExternalLink className="w-3.5 h-3.5" />
                            </Button>
                          </a>
                        </div>
                      </div>

                      <div className="rounded-[24px] border border-border/60 bg-card/70 p-4 shadow-sm sm:p-5">
                        <h3 className="font-serif text-sm sm:text-base font-bold mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" /> Select a Lesson to Begin
                        </h3>
                        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                          {course.lessons.map((lesson, idx) => {
                            const isSelected = selectedLesson === lesson;
                            const isCompleted = !!completedLessons[lesson];
                            return (
                              <button
                                key={lesson}
                                onClick={() => setSelectedLesson(lesson)}
                                className={cn(
                                  "text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between",
                                  isSelected ? "border-primary bg-primary/10 text-primary font-bold" : "border-border/30 bg-background/30 hover:bg-background/60",
                                  isCompleted && !isSelected && "border-emerald-500/30 bg-emerald-500/5"
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-6 flex items-center justify-center rounded-lg text-[10px] font-mono font-bold bg-muted">
                                    {idx + 1}
                                  </span>
                                  <span className="line-clamp-1">{lesson}</span>
                                </div>
                                {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Split view layout */}
                      <div className={cn(
                        "space-y-6",
                        selectedLesson && "xl:grid xl:grid-cols-[0.95fr_1.05fr] xl:gap-6 xl:space-y-0"
                      )}>
                        <div className="overflow-hidden rounded-[24px] border border-border/60 bg-card/75 shadow-sm">
                          <div className="border-b border-border/60 bg-muted/35 p-4">
                            <h3 className="font-serif text-sm sm:text-base font-bold flex items-center gap-2">
                              <FileText className="w-4 h-4 text-primary" /> Course PDF
                            </h3>
                          </div>
                          <div className="min-h-[320px] sm:min-h-[420px] lg:min-h-[500px]">
                            <iframe
                              src={`${course.pdf_url}#toolbar=1`}
                              className="w-full h-full border-none"
                              title={`${course.title} PDF Material`}
                            />
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-[24px] border border-border/60 bg-card/75 shadow-sm">
                          <div className="flex flex-col gap-3 border-b border-border/60 bg-muted/35 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="font-serif text-sm sm:text-base font-bold flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-primary" /> Lesson Explanation
                            </h3>
                            {selectedLesson && (
                              <button
                                onClick={() => toggleLesson(selectedLesson)}
                                className={cn(
                                  "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all",
                                  completedLessons[selectedLesson]
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : "bg-muted/60 hover:bg-muted/80 text-muted-foreground"
                                )}
                              >
                                {completedLessons[selectedLesson] ? (
                                  <>Completed <CheckCircle2 className="w-3.5 h-3.5" /></>
                                ) : (
                                  <>Mark Complete <Circle className="w-3.5 h-3.5" /></>
                                )}
                              </button>
                            )}
                          </div>

                          <div className="max-h-[420px] overflow-y-auto p-4 sm:p-6">
                            {selectedLesson && course.lessonExplanations && course.lessonExplanations[selectedLesson] ? (
                              <div className="space-y-4">
                                <h4 className="font-serif text-lg sm:text-xl font-bold text-foreground">
                                  {course.lessonExplanations[selectedLesson].title}
                                </h4>

                                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                  {course.lessonExplanations[selectedLesson].content}
                                </p>

                                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 sm:p-5">
                                  <h5 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-amber-500" /> Key Points
                                  </h5>
                                  <ul className="space-y-2">
                                    {course.lessonExplanations[selectedLesson].keyPoints.map((point, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Navigation buttons */}
                                <div className="flex justify-between items-center pt-2">
                                  <button
                                    onClick={() => {
                                      const currentIdx = course.lessons.indexOf(selectedLesson);
                                      if (currentIdx > 0) {
                                        setSelectedLesson(course.lessons[currentIdx - 1]);
                                      }
                                    }}
                                    disabled={course.lessons.indexOf(selectedLesson) === 0}
                                    className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-border/30 bg-background/50 hover:bg-background/70 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                  >
                                    <ChevronRight className="w-3.5 h-3.5 rotate-180" /> Previous
                                  </button>
                                  <button
                                    onClick={() => {
                                      const currentIdx = course.lessons.indexOf(selectedLesson);
                                      if (currentIdx < course.lessons.length - 1) {
                                        setSelectedLesson(course.lessons[currentIdx + 1]);
                                      }
                                    }}
                                    disabled={course.lessons.indexOf(selectedLesson) === course.lessons.length - 1}
                                    className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                  >
                                    Next <ChevronRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-12 sm:py-16">
                                <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/30 mx-auto mb-3" />
                                <h3 className="font-serif text-base sm:text-lg font-bold">Select a Lesson</h3>
                                <p className="text-muted-foreground text-xs sm:text-sm mt-1">Choose a lesson from the list above to see its detailed explanation alongside the PDF.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-20 border border-dashed border-border/40 rounded-3xl bg-muted/10">
                      <HelpCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                      <h3 className="font-serif text-lg font-bold">No Study Material Added</h3>
                      <p className="text-muted-foreground text-xs mt-1">Study materials for this course are coming soon.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab Content 2: Syllabus list */}
              {activeTab === "syllabus" && (
                <div className="rounded-[24px] border border-border/60 bg-card/70 p-5 shadow-sm sm:p-6">
                  <div>
                    <h3 className="font-serif text-lg font-bold">Course Outline & Syllabus</h3>
                    <p className="text-muted-foreground text-xs">Track your lessons step-by-step. Mark them off to update progress.</p>
                  </div>
                  <div className="space-y-2">
                    {course.lessons.map((lesson, idx) => {
                      const isCompleted = !!completedLessons[lesson];
                      return (
                        <div
                          key={lesson}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-xl border border-border/30 transition-all",
                            isCompleted ? "bg-emerald-500/5 border-emerald-500/20" : "bg-background/40 hover:bg-background/70"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-mono font-bold border",
                              isCompleted ? "bg-emerald-500 text-white border-emerald-500" : "bg-muted border-border/60 text-muted-foreground"
                            )}>
                              {idx + 1}
                            </span>
                            <span className={cn(
                              "text-xs sm:text-sm font-medium leading-tight cursor-pointer",
                              isCompleted ? "text-emerald-700 dark:text-emerald-400 font-semibold" : "text-foreground"
                            )}
                              onClick={() => toggleLesson(lesson)}
                            >
                              {lesson}
                            </span>
                          </div>

                          <button
                            onClick={() => toggleLesson(lesson)}
                            className="cursor-pointer"
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground/40 hover:text-primary transition-colors" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  </div>
              )}

              {/* Tab Content 3: Interactive Practice Quiz */}
              {activeTab === "quiz" && (
                <div className="rounded-[24px] border border-border/60 bg-card/70 p-5 shadow-sm sm:p-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold">Interactive Practice Quiz</h3>
                    <p className="text-muted-foreground text-xs">Validate your knowledge of this course material. Select your answers below.</p>
                  </div>

                  <div className="space-y-6">
                    {course.quizQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="space-y-3">
                        <h4 className="font-serif text-sm sm:text-base font-bold text-foreground flex gap-2">
                          <span className="text-primary font-mono">{qIdx + 1}.</span> {q.question}
                        </h4>

                        <div className="grid gap-2">
                          {q.options.map((opt, oIdx) => {
                            const isSelected = selectedAnswers[qIdx] === oIdx;
                            const isCorrect = q.correctAnswer === oIdx;
                            const showSuccess = quizSubmitted && isCorrect;
                            const showFailure = quizSubmitted && isSelected && !isCorrect;

                            return (
                              <button
                                key={oIdx}
                                disabled={quizSubmitted}
                                onClick={() => setSelectedAnswers({ ...selectedAnswers, [qIdx]: oIdx })}
                                className={cn(
                                  "w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all select-none",
                                  isSelected ? "border-primary bg-primary/5 font-semibold" : "border-border/30 bg-background/30",
                                  showSuccess && "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold",
                                  showFailure && "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400 font-semibold",
                                  !quizSubmitted && "hover:bg-background/60 cursor-pointer"
                                )}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && selectedAnswers[qIdx] === q.correctAnswer && (
                          <div className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
                            ✓ <strong>Explanation:</strong> {q.explanation}
                          </div>
                        )}
                        {quizSubmitted && selectedAnswers[qIdx] !== q.correctAnswer && (
                          <div className="text-xs text-rose-600 dark:text-rose-400 bg-rose-500/5 p-3 rounded-lg border border-rose-500/10">
                            ✗ Incorrect. <strong>Correct answer:</strong> {q.options[q.correctAnswer]} <br />
                            <span className="block mt-1 text-muted-foreground"><strong>Explanation:</strong> {q.explanation}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {quizSubmitted ? (
                    <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="text-sm font-semibold">
                        Your Score: <span className="text-primary font-bold">{quizScore}</span> / {course.quizQuestions.length} ({Math.round((quizScore / course.quizQuestions.length) * 100)}%)
                      </div>
                      <Button onClick={resetQuiz} className="bg-primary text-white rounded-xl flex items-center gap-2 cursor-pointer">
                        <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
                      </Button>
                    </div>
                  ) : (
                    <div className="border-t border-border/40 pt-6">
                      <Button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(selectedAnswers).length < course.quizQuestions.length}
                        className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white rounded-xl px-8 py-3 cursor-pointer"
                      >
                        Submit Answers
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">

              <div className="rounded-[24px] border border-border/60 bg-card/70 p-6 shadow-sm">
                <h3 className="font-serif text-base font-bold text-foreground">Course Details</h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-muted-foreground font-medium">Difficulty Level</span>
                    <span className="font-bold text-foreground uppercase">{course.difficulty}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-muted-foreground font-medium">Duration</span>
                    <span className="font-bold text-foreground uppercase">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-muted-foreground font-medium">Lessons</span>
                    <span className="font-bold text-foreground uppercase">{course.lessons.length} Modules</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-muted-foreground font-medium">Access</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Free Lifetime Access</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={course.pdf_url}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex"
                  >
                    <Button variant="outline" className="w-full rounded-xl text-xs font-bold uppercase tracking-wider gap-1.5 cursor-pointer">
                      Download PDF Material
                    </Button>
                  </a>
                </div>
              </div>

              <div className="rounded-[24px] border border-border/60 bg-card/70 p-6 shadow-sm">
                <h3 className="font-serif text-base font-bold text-foreground flex items-center gap-1.5">
                  <Award className="w-5 h-5 text-primary" /> Study Support
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Need help with the topics in this PDF? Join our dedicated channels to connect with peers and study group mentors.
                </p>
                <Link href="/community" className="w-full block">
                  <Button className="w-full bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer">
                    Join Discord Chat
                  </Button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
