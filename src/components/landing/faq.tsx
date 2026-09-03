"use client";

import { useState } from "react";
import { Search, MessageCircleQuestion } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ_ITEMS = [
  { q: "Do I need prior AI experience?", a: "No. We start from Python fundamentals and progressively build to advanced topics. Software engineering experience is helpful but not required." },
  { q: "How long does the full roadmap take?", a: "The curriculum spans 26 weeks at a recommended pace of 10-15 hours per week. You have lifetime access and can go at your own speed." },
  { q: "Is this suitable for beginners?", a: "Yes. Chapter 1 covers Python and async engineering from the ground up. Each phase builds on the previous one." },
  { q: "Do I get a certificate?", a: "Yes. You receive a verified certificate for each chapter and a comprehensive AI Engineer certificate upon completing all 9 phases." },
  { q: "What projects will I build?", a: "You'll build 20+ production-grade projects including RAG chatbots, multi-agent systems, MCP servers, and a capstone deployed to cloud." },
  { q: "Can I get mentorship?", a: "Pro subscribers can book 1-on-1 sessions with industry expert mentors for personalized career and technical guidance." },
  { q: "What is the refund policy?", a: "We offer a 14-day money-back guarantee on all paid plans if you're not satisfied with the platform." },
];

export function FaqSection() {
  const [faqSearch, setFaqSearch] = useState("");
  const filteredFaq = FAQ_ITEMS.filter(
    (item) =>
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(ellipse_at_bottom,_rgba(196,92,38,0.06),transparent_60%)]" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight mb-3">
            Common Questions
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            Everything you need to know before you start your AI engineering journey.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6 sm:mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            className="pl-11 rounded-2xl h-12 border-border/60 bg-card/60 focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>

        {/* FAQ items */}
        <div className="rounded-3xl border border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden shadow-sm">
          {filteredFaq.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-sm">
              No questions found matching &ldquo;{faqSearch}&rdquo;
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-border/30 last:border-0 px-5 sm:px-6"
                >
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base py-5 hover:text-primary transition-colors hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        {/* Bottom CTA */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Still have questions?{" "}
          <a
            href="https://www.instagram.com/techtalks02/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            DM us on Instagram
          </a>
        </p>
      </div>
    </section>
  );
}
