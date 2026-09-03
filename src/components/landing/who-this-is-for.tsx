"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface PersonaCardProps {
  icon: string;
  title: string;
  skills: string[];
  goal: string;
  isPerfectMatch?: boolean;
  color: string;
}

function PersonaCard({ icon, title, skills, goal, isPerfectMatch, color }: PersonaCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col justify-between rounded-3xl bg-card border border-border/50 p-6 sm:p-8 transition-all duration-500 overflow-hidden cursor-pointer select-none"
      style={{
        boxShadow: hovered 
          ? `0 20px 40px -15px rgba(0,0,0,0.06), 0 0 25px -5px ${color}20` 
          : "0 4px 20px -5px rgba(0,0,0,0.02)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div className="space-y-4 sm:space-y-6">
        {/* Profile Header (Icon & Perfect Match Badge) */}
        <div className="flex items-start justify-between">
          <span 
            className="text-3xl sm:text-4xl p-2.5 sm:p-3.5 rounded-2xl bg-muted/40 transition-transform duration-500 flex items-center justify-center"
            style={{
              transform: hovered ? "scale(1.15) rotate(4deg)" : "scale(1) rotate(0)",
            }}
          >
            {icon}
          </span>
          {isPerfectMatch && (
            <span 
              className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full animate-pulse transition-all duration-300"
              style={{
                backgroundColor: `${color}15`,
                color: color,
                border: `1px solid ${color}30`
              }}
            >
              Perfect Match
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
          {title}
        </h3>

        {/* Skills list with checkmarks */}
        <ul className="space-y-2.5 pt-2">
          {skills.map((skill) => (
            <li key={skill} className="flex items-center gap-2.5 text-sm font-medium text-foreground/80">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 shrink-0">
                <Check className="w-3.5 h-3.5" />
              </span>
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Transition Goal Footer */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/40">
        <div 
          className="flex items-center gap-2 text-sm font-semibold transition-all duration-300"
          style={{ color: color }}
        >
          <span className="text-muted-foreground text-xs uppercase tracking-wider font-mono mr-1">Goal:</span>
          <span className="flex items-center gap-1.5 font-sans">
            <span 
              className="transition-transform duration-300 inline-block"
              style={{
                transform: hovered ? "translateX(4px)" : "translateX(0)"
              }}
            >
              →
            </span>{" "}
            {goal}
          </span>
        </div>
      </div>
    </div>
  );
}

const PERSONAS = [
  {
    icon: "👨‍💻",
    title: "Software Engineer",
    skills: ["Python", "Backend", "APIs"],
    goal: "Become AI Engineer",
    isPerfectMatch: true,
    color: "#E85D75"
  },
  {
    icon: "📊",
    title: "Data Scientist",
    skills: ["ML", "Deep Learning", "Statistics"],
    goal: "Build Production LLM Apps",
    color: "#7B68A6"
  },
  {
    icon: "🤖",
    title: "ML Engineer",
    skills: ["PyTorch / TensorFlow", "Feature Stores", "Scikit-Learn"],
    goal: "Master RAG, Agents & LLMOps",
    color: "#5BC0BE"
  },
  {
    icon: "🏛️",
    title: "Tech Lead & Architect",
    skills: ["System Design", "Cloud Infrastructure", "Team Leadership"],
    goal: "Design AI Systems at Scale",
    color: "#D4A017"
  }
];

export function WhoThisIsForSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[#F9F7F2]/20 dark:bg-[#121212]/10 border-t border-border/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold mb-10 sm:mb-14 text-center">
          Who this is for
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PERSONAS.map((persona) => (
            <PersonaCard key={persona.title} {...persona} />
          ))}
        </div>
      </div>
    </section>
  );
}
