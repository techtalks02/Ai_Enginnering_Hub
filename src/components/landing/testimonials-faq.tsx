"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "AI Engineer @ Google", content: "This roadmap transformed my career. I went from backend dev to AI Engineer in 8 months.", rating: 5 },
  { name: "Marcus Johnson", role: "LLM Specialist @ OpenAI", content: "The structured path and hands-on projects gave me confidence to work on production LLM systems.", rating: 5 },
  { name: "Priya Sharma", role: "AI Architect @ Microsoft", content: "The AI Architect path module alone was worth the subscription. Comprehensive and practical.", rating: 5 },
  { name: "David Kim", role: "ML Engineer @ Meta", content: "Best investment in my career. The mentorship sessions helped me land my dream role.", rating: 5 },
];

const FAQ_ITEMS = [
  { q: "Do I need a PhD to become an AI Engineer?", a: "No. This roadmap is designed for developers at all levels. Strong programming fundamentals and dedication are the key requirements." },
  { q: "How long does it take to complete?", a: "Most learners complete the full roadmap in 6-12 months studying 10-15 hours per week. Go at your own pace with lifetime access." },
  { q: "Is this suitable for beginners?", a: "Yes! We start from Python fundamentals and progressively build to advanced AI architecture with beginner, intermediate, and advanced paths." },
  { q: "Do I get a certificate?", a: "Yes. Verified certificates for each module and a comprehensive AI Engineer certificate upon completing the full roadmap." },
  { q: "Can I get 1-on-1 mentorship?", a: "Pro and Enterprise subscribers can book sessions with industry expert mentors for personalized guidance." },
  { q: "What is the refund policy?", a: "We offer a 14-day money-back guarantee on all paid plans if you are not satisfied." },
];

export function TestimonialsFaqSection() {
  const [faqSearch, setFaqSearch] = useState("");
  const filteredFaq = FAQ_ITEMS.filter(
    (item) =>
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Student Success Stories</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex gap-1 mb-2.5 sm:mb-3">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-3.5 sm:h-4 w-3.5 sm:w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3.5 sm:mb-4">&ldquo;{t.content}&rdquo;</p>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="relative mb-5 sm:mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQ..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
