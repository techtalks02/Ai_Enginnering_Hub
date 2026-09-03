"use client";

import { useState } from "react";
import { Check, Zap } from "lucide-react";

interface HighlightCardProps {
  icon: string;
  title: string;
  description: string;
  badge: string;
  actionText: string;
  bullets: string[];
  color: string;
}

function HighlightCard({ icon, title, description, badge, actionText, bullets, color }: HighlightCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col justify-between rounded-3xl bg-card border border-border/50 p-6 sm:p-8 transition-all duration-500 overflow-hidden cursor-pointer select-none"
      style={{
        boxShadow: hovered 
          ? `0 20px 40px -15px rgba(0,0,0,0.06), 0 0 25px -5px ${color}15` 
          : "0 4px 20px -5px rgba(0,0,0,0.02)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        borderTop: `4px solid ${color}`,
      }}
    >
      {/* Content Area */}
      <div className="space-y-4 sm:space-y-5">
        {/* Icon & Badge Row */}
        <div className="flex items-center justify-between">
          <span 
            className="text-3xl sm:text-4xl p-2.5 sm:p-3.5 rounded-2xl bg-muted/40 transition-transform duration-500 flex items-center justify-center"
            style={{
              transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0)",
            }}
          >
            {icon}
          </span>
          <span 
            className="text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-mono transition-colors duration-300"
            style={{
              backgroundColor: `${color}12`,
              color: color
            }}
          >
            {badge}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* CSS Grid Expandable Checklist Section */}
        <div 
          className="grid transition-all duration-500 ease-in-out"
          style={{
            gridTemplateRows: hovered ? "1fr" : "0fr",
            opacity: hovered ? 1 : 0,
            marginTop: hovered ? "1.25rem" : "0px",
          }}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2.5 pt-2 border-t border-border/40">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2.5 text-sm font-medium text-foreground/80 animate-in fade-in slide-in-from-top-1 duration-200">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 sm:mt-8">
        <div 
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group"
          style={{ color: color }}
        >
          {actionText}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </div>
  );
}

const HIGHLIGHT_CARDS = [
  {
    icon: "💻",
    title: "Project-Based Learning",
    description: "Every module ends with a real-world project.",
    badge: "120+ Projects",
    actionText: "Learn More",
    bullets: [
      "Source Code Included",
      "GitHub Repositories",
      "Production Deployment",
      "Resume Ready Project"
    ],
    color: "#E85D75"
  },
  {
    icon: "👨‍🏫",
    title: "1-on-1 Mentorship",
    description: "Book personal sync sessions with industry veterans for direct guidance.",
    badge: "Direct Code Reviews",
    actionText: "Book Session",
    bullets: [
      "Weekly Office Hours",
      "Career & CV Guidance",
      "Portfolio Auditing",
      "Mock Technical Interviews"
    ],
    color: "#D4A017"
  },
  {
    icon: "🚀",
    title: "Production First",
    description: "Build robust backend architectures built for scale and cloud deployment.",
    badge: "Enterprise Patterns",
    actionText: "Explore",
    bullets: [
      "Docker Containers",
      "Kubernetes Clusters",
      "CI/CD Pipeline Setup",
      "Monitoring & Logging"
    ],
    color: "#5BC0BE"
  }
];

export function HighlightsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[#F9F7F2]/40 dark:bg-[#121212]/20" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5" />
            Why Choose Us
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">
            Built for real engineers
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {HIGHLIGHT_CARDS.map((card) => (
            <HighlightCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
