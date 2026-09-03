import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, Share2, ArrowRight, BookOpen, Layers, CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

interface ArticleData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: {
    summary: string;
    sections: {
      heading: string;
      paragraphs: string[];
      code?: {
        language: string;
        filename: string;
        snippet: string;
      };
      keyTakeaways?: string[];
    }[];
  };
}

const ARTICLES_DATABASE: Record<string, ArticleData> = {
  "what-is-agentic-rag": {
    slug: "what-is-agentic-rag",
    title: "What Is Agentic RAG? Autonomous Retrieval, Multi-Hop Reasoning & Query Routing",
    subtitle: "Move beyond naive cosine similarity into dynamic retrieval agents that plan, formulate sub-queries, and verify information.",
    category: "RAG",
    readTime: "12 min read",
    date: "Jan 18, 2026",
    author: {
      name: "Alex Rivera",
      role: "AI Systems Architect",
      avatar: "AR"
    },
    content: {
      summary: "Traditional RAG pipelines follow a rigid single-turn path: embed query -> top-k vector search -> inject context -> generate. Agentic RAG replaces this static pipeline with an autonomous agent loop that formulates multiple search queries, evaluates context sufficiency, reformulates search terms, and invokes tool APIs when needed.",
      sections: [
        {
          heading: "The Limits of Naive Vector RAG",
          paragraphs: [
            "Naive vector retrieval suffers from high sensitivity to chunk boundaries, semantic drift in multi-topic queries, and inability to answer comparative or multi-hop questions (e.g. 'How did company revenue change between the two quarters where product X had outages?').",
            "Because static vector search lacks a feedback loop, if the retrieved chunks fail to answer the query, the LLM either hallucinates or responds with 'I don't know'."
          ],
          keyTakeaways: [
            "Static top-k retrieval cannot resolve multi-hop dependencies",
            "Single-shot embeddings miss exact numerical identifiers and code symbols",
            "Lacks reflection mechanisms to retry when initial context is insufficient"
          ]
        },
        {
          heading: "The Agentic RAG Architecture",
          paragraphs: [
            "In an Agentic RAG system, an agentic controller evaluates the incoming user intent and generates a plan. It routes between diverse indices (dense vector stores, sparse BM25 lexical indices, structured SQL databases, and web search APIs).",
            "After retrieval, a Self-RAG reflection node grades the retrieved passages for document relevance. If documents are irrelevant, the agent automatically rewrites the search query and searches again."
          ],
          code: {
            language: "python",
            filename: "agentic_rag_router.py",
            snippet: `from typing import List, Literal
from pydantic import BaseModel, Field

class RetrievalPlan(BaseModel):
    needs_retrieval: bool
    data_source: Literal["vector_index", "sql_financial_db", "web_search"]
    decomposed_subqueries: List[str] = Field(description="Sub-queries for parallel retrieval")

def evaluate_retrieval_adequacy(query: str, retrieved_chunks: List[str]) -> bool:
    """Evaluate whether retrieved context contains sufficient evidence to answer."""
    # Self-RAG reflection check
    return len(retrieved_chunks) > 0 and any("revenue" in chunk.lower() for chunk in retrieved_chunks)`
          }
        },
        {
          heading: "Production Implementation Strategy",
          paragraphs: [
            "To deploy Agentic RAG safely, you must enforce recursion ceilings (e.g. maximum 3 retrieval iterations) and implement caching for frequently recurring sub-queries to prevent runaway latency.",
            "Pairing dense vector search with cross-encoder rerankers reduces token overhead before passing context to the generator LLM."
          ],
          keyTakeaways: [
            "Set strict timeout budgets (p95 < 800ms) on tool invocations",
            "Use Reciprocal Rank Fusion (RRF) to blend vector and keyword scores",
            "Log all agent routing trajectories to OpenTelemetry/LangSmith"
          ]
        }
      ]
    }
  },
  "llm-evaluation-guide": {
    slug: "llm-evaluation-guide",
    title: "The Complete Guide to LLM Evaluation: Faithfulness, Relevance & CI/CD Regression",
    subtitle: "How to reliably measure, benchmark, and prevent regressions in generative AI systems.",
    category: "Evaluation",
    readTime: "15 min read",
    date: "Jan 24, 2026",
    author: {
      name: "Elena Rostova",
      role: "Lead Evaluation Engineer",
      avatar: "ER"
    },
    content: {
      summary: "Deploying LLMs without automated evaluation is flying blind. This guide outlines how to build automated evaluation suites using Ragas, TruLens, LLM-as-a-judge patterns, and CI/CD regression testing.",
      sections: [
        {
          heading: "Core Evaluation Dimensions",
          paragraphs: [
            "A production evaluation framework measures three critical pillars: Faithfulness (is the answer grounded in context?), Answer Relevance (does it answer the user's question?), and Context Precision (did retrieval return clean, noise-free chunks?).",
            "Automating these metrics using synthetic golden datasets enables your engineering team to push prompt, model, and chunking changes with confidence."
          ],
          keyTakeaways: [
            "Faithfulness: Ground truth alignment without hallucination",
            "Context Precision: Signal-to-noise ratio in retrieved context",
            "Answer Relevance: Direct response to user intent"
          ]
        },
        {
          heading: "Automating LLM-as-a-Judge Tests in CI/CD",
          paragraphs: [
            "Running automated evaluations on every pull request prevents prompt regressions from breaking production SLAs.",
            "Use small, fast models (e.g., gpt-4o-mini or claude-3-5-haiku) with strictly constrained JSON schemas for scoring judges."
          ],
          code: {
            language: "python",
            filename: "eval_judge.py",
            snippet: `from pydantic import BaseModel, Field

class EvaluationScore(BaseModel):
    faithfulness_score: float = Field(ge=0.0, le=1.0)
    relevance_score: float = Field(ge=0.0, le=1.0)
    reasoning: str

def evaluate_response(query: str, context: str, response: str) -> EvaluationScore:
    # Run evaluation judge against ground truth
    return EvaluationScore(faithfulness_score=0.98, relevance_score=0.95, reasoning="Strictly grounded in provided context.")`
          }
        }
      ]
    }
  },
  "multi-agent-design": {
    slug: "multi-agent-design",
    title: "Designing Multi-Agent Systems: Supervisor-Worker Patterns & LangGraph State Channels",
    subtitle: "Architecting resilient swarms of specialized agents with deterministic state machines and recursion boundaries.",
    category: "AI Agents",
    readTime: "18 min read",
    date: "Feb 05, 2026",
    author: {
      name: "Marcus Vance",
      role: "Agentic Systems Lead",
      avatar: "MV"
    },
    content: {
      summary: "Single agents collapse when tasks exceed 5 distinct tool domains. Multi-agent systems decompose complex workflows into specialized nodes coordinated by deterministic supervisor state machines.",
      sections: [
        {
          heading: "Why Single Agents Fail at Scale",
          paragraphs: [
            "When an agent is loaded with dozens of tool schemas, LLM tool selection accuracy drops significantly. Context windows fill with irrelevant tool descriptions, increasing cost and latency.",
            "By decomposing responsibilities into dedicated Research, Analysis, and Output agents, each specialist operates with a focused context and narrow tool suite."
          ],
          keyTakeaways: [
            "Tool selection degradation occurs when single agents manage >10 tools",
            "Specialized agents preserve clean context boundaries",
            "Supervisor routers guarantee deterministic handoffs"
          ]
        },
        {
          heading: "LangGraph State Channels",
          paragraphs: [
            "LangGraph implements graph-based agent state machines where nodes emit delta updates merged into a validated state schema.",
            "This ensures concurrent agents can write to shared state channels without race conditions."
          ],
          code: {
            language: "python",
            filename: "multi_agent_graph.py",
            snippet: `from typing import TypedDict, Sequence
from langgraph.graph import StateGraph, END

class SwarmState(TypedDict):
    task: str
    research_output: str
    code_output: str
    verified: bool

def supervisor_node(state: SwarmState) -> dict:
    if not state.get("research_output"):
        return {"next_agent": "researcher"}
    return {"next_agent": "coder"}`
          }
        }
      ]
    }
  },
  "rag-vs-fine-tuning": {
    slug: "rag-vs-fine-tuning",
    title: "RAG vs Fine-Tuning: The Definitive Architectural Decision Framework",
    subtitle: "When to inject knowledge via retrieval versus when to bake patterns into model weights with LoRA.",
    category: "LLM Engineering",
    readTime: "10 min read",
    date: "Feb 12, 2026",
    author: {
      name: "Alex Rivera",
      role: "AI Systems Architect",
      avatar: "AR"
    },
    content: {
      summary: "A practical decision matrix comparing Retrieval-Augmented Generation (RAG) and Parameter-Efficient Fine-Tuning (PEFT/LoRA). Learn when each approach is appropriate and how hybrid architectures combine both.",
      sections: [
        {
          heading: "The Core Difference: Knowledge vs Behavior",
          paragraphs: [
            "RAG is optimized for dynamic, factual knowledge injection with instant updates and verifiable citations.",
            "Fine-Tuning is optimized for teaching style, formatting, specialized syntax, and domain vocabulary behavior."
          ],
          keyTakeaways: [
            "Use RAG when data changes frequently or requires permission filtering",
            "Use Fine-Tuning when you need specific output formatting or smaller model deployment",
            "Use Hybrid RAG + Fine-Tuned Model for maximum enterprise performance"
          ]
        }
      ]
    }
  },
  "mcp-guide": {
    slug: "mcp-guide",
    title: "The Model Context Protocol (MCP) Engineering Guide",
    subtitle: "How to build, secure, and deploy standardized tool servers for Claude and next-gen AI agents.",
    category: "MCP",
    readTime: "20 min read",
    date: "Mar 02, 2026",
    author: {
      name: "Sarah Chen",
      role: "Protocol Engineer",
      avatar: "SC"
    },
    content: {
      summary: "Anthropic's Model Context Protocol (MCP) has become the open standard for connecting AI models to external tools, databases, and environments. This guide explains how to build production MCP servers in Python and TypeScript.",
      sections: [
        {
          heading: "Why MCP Standardizes Agent Tooling",
          paragraphs: [
            "Before MCP, every developer wrote bespoke function calling glue code for each model provider. MCP provides a standardized JSON-RPC protocol for discovering tools, reading resources, and executing actions.",
            "Building an MCP server allows any compatible agent client to seamlessly interact with your internal databases and APIs."
          ],
          keyTakeaways: [
            "Standardized JSON-RPC protocol across model providers",
            "Strongly typed input and output schemas",
            "Bi-directional notification capabilities"
          ]
        }
      ]
    }
  },
  "production-ai-monitoring": {
    slug: "production-ai-monitoring",
    title: "Production AI Monitoring & Observability: Tracing, Latency SLAs & Cost Caps",
    subtitle: "Setting up OpenTelemetry, LangSmith, semantic caching with Redis, and automatic circuit breakers.",
    category: "Production AI",
    readTime: "14 min read",
    date: "Mar 10, 2026",
    author: {
      name: "David Kim",
      role: "SRE & Infrastructure Lead",
      avatar: "DK"
    },
    content: {
      summary: "Operating AI applications in production requires real-time observability into token budgets, TTFT (time-to-first-token), ITL (inter-token latency), and semantic cache hit rates.",
      sections: [
        {
          heading: "Essential Telemetry Metrics",
          paragraphs: [
            "Track TTFT, generation throughput (tokens/sec), provider fallback counts, and validation error rates.",
            "Implement semantic caching with Redis vector search to serve repeated queries with sub-10ms response times and zero model token cost."
          ],
          keyTakeaways: [
            "Track p95 Time to First Token (TTFT)",
            "Implement semantic caching for common queries",
            "Configure automatic fallback cascades between model providers"
          ]
        }
      ]
    }
  }
};

export function generateStaticParams() {
  return Object.keys(ARTICLES_DATABASE).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES_DATABASE[slug];
  if (!article) return { title: "Article Not Found | AI Engineer Hub" };
  return {
    title: `${article.title} | AI Engineer Hub`,
    description: article.subtitle,
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES_DATABASE[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0E1117] text-foreground font-sans flex flex-col antialiased selection:bg-primary/20 selection:text-primary">
      <Header />

      <main className="flex-1">
        {/* Top Breadcrumb & Article Header */}
        <div className="border-b border-border/40 bg-gradient-to-b from-muted/20 to-transparent py-10 sm:py-14">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to all articles</span>
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
                <span className="text-muted-foreground/40">·</span>
                <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
                {article.title}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {article.subtitle}
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-border/60">
                <div className="h-9 w-9 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                  {article.author.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{article.author.name}</div>
                  <div className="text-xs text-muted-foreground">{article.author.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
          
          {/* Executive Summary Card */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-7 space-y-2.5">
            <h2 className="font-serif text-lg font-bold text-primary flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Executive Summary</span>
            </h2>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-normal">
              {article.content.summary}
            </p>
          </div>

          {/* Dynamic Content Sections */}
          <div className="space-y-12">
            {article.content.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-5">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  {section.heading}
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {/* Key Takeaways */}
                {section.keyTakeaways && (
                  <div className="rounded-xl border border-border/80 bg-card p-5 space-y-2.5 my-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                      Key Takeaways
                    </span>
                    <ul className="space-y-2">
                      {section.keyTakeaways.map((takeaway, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                          <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Code Snippet */}
                {section.code && (
                  <div className="rounded-2xl border border-border/80 bg-[#1A1B26] dark:bg-[#0D1117] overflow-hidden shadow-sm my-6">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#24283B] dark:bg-[#161B22] border-b border-border/30 text-xs font-mono text-slate-300">
                      <span>{section.code.filename}</span>
                      <span className="text-[10px] uppercase text-primary font-bold">{section.code.language}</span>
                    </div>
                    <div className="p-4 sm:p-5 overflow-x-auto text-xs font-mono leading-relaxed text-slate-100">
                      <pre>{section.code.snippet}</pre>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Bottom Substack / Roadmap CTA Banner */}
          <div className="rounded-2xl border border-border/80 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                Enjoyed this article?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Subscribe to our technical Substack publication or dive into the full AI Engineer roadmap.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="https://substack.com/@techtalks02"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none"
              >
                <Button className="w-full sm:w-auto font-semibold">
                  <span>Read on Substack</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
              <Link href="/lesson" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full sm:w-auto font-semibold">
                  Start Curriculum
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
