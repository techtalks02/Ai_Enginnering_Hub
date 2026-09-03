import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Engineering Blog - AI Engineer Hub",
  description: "In-depth technical articles on AI engineering.",
};

const ARTICLES = [
  { slug: "what-is-agentic-rag", title: "What Is Agentic RAG?", summary: "Autonomous retrieval agents that plan, query, and reason dynamically.", category: "RAG", readTime: "12 min", date: "Jan 2026" },
  { slug: "llm-evaluation-guide", title: "The Complete Guide to LLM Evaluation Metrics", summary: "Faithfulness, relevance, coherence, and toxicity metrics explained.", category: "Evaluation", readTime: "15 min", date: "Jan 2026" },
  { slug: "multi-agent-design", title: "Designing Multi-Agent Systems", summary: "Supervisor-worker patterns and agent communication strategies.", category: "AI Agents", readTime: "18 min", date: "Feb 2026" },
  { slug: "rag-vs-fine-tuning", title: "RAG vs Fine-Tuning", summary: "A decision framework for retrieval vs model fine-tuning.", category: "LLM Engineering", readTime: "10 min", date: "Feb 2026" },
  { slug: "mcp-guide", title: "MCP Engineering Guide", summary: "Build MCP servers and clients from scratch.", category: "MCP", readTime: "20 min", date: "Mar 2026" },
  { slug: "production-ai-monitoring", title: "Production AI Monitoring", summary: "LangSmith, LangFuse, cost monitoring, and observability.", category: "Production AI", readTime: "14 min", date: "Mar 2026" },
];

const COLORS: Record<string, string> = { RAG: "#1A3A5C", Evaluation: "#7D9D7A", "AI Agents": "#E9A319", "LLM Engineering": "#7B68A6", MCP: "#E85D75", "Production AI": "#D4A017" };

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="relative border-b border-border/40 bg-gradient-to-b from-muted/30 to-transparent">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-primary mb-6">Technical Articles</div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight mb-4">AI Engineering <span className="text-primary italic">Articles</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">In-depth technical articles on AI engineering, written by practitioners.</p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group rounded-2xl border border-border/40 bg-card/50 hover:bg-card/80 hover:border-border/70 hover:shadow-md transition-all p-5 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white" style={{ background: COLORS[article.category] || "#C45C26" }}>{article.category}</span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground"><Clock className="h-2.5 w-2.5" />{article.readTime}</span>
                </div>
                <h2 className="font-serif text-base font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors flex-1">{article.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.summary}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[11px] font-mono text-muted-foreground">{article.date}</span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-primary">Read <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}