"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { BrandLogo } from "@/components/ui/brand-logo";

import { useUIStore } from "@/store/ui-store";

const FOOTER_LINKS = {
  Platform: [
    { label: "Full Roadmap", href: "/#roadmap" },
    { label: "Curriculum Lessons", href: "/lesson" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "AI Projects", href: "/courses/ai-projects" },
    { label: "AI Mentor", href: "/ai-mentor" },
  ],
  Resources: [
    { label: "Free Content", href: "/courses/free" },
    { label: "FAQ", href: "/#faq" },
    { label: "Community", href: "/community" },
    { label: "Blog", href: "/blog" },
  ],
  Learning: [
    { label: "Python Fundamentals", href: "/lesson?module=01&lesson=01-1" },
    { label: "Math for AI", href: "/lesson?module=02&lesson=02-1" },
    { label: "Machine Learning", href: "/lesson?module=03&lesson=03-1" },
    { label: "Deep Learning", href: "/lesson?module=04&lesson=04-1" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const openReserveSeat = useUIStore((s) => s.openReserveSeat);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/admin/newsletter", { email });
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Ready to become an AI Engineer?</h2>
          <p className="text-white/70 mb-6">Join thousands of engineers building production LLM applications.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-[#C45C26] hover:bg-[#C45C26]/90 text-white rounded-xl px-8 h-13 text-base font-medium cursor-pointer">
                Start Learning
              </Button>
            </Link>

            <button
              onClick={openReserveSeat}
              className="relative flex items-center justify-between gap-5 px-6 py-2.5 rounded-full text-white font-mono uppercase transition-all shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer h-13"
              style={{ background: "linear-gradient(90deg, #C45C26 0%, #D4A017 100%)" }}
            >
              <div className="flex flex-col items-center leading-normal text-center select-none pr-1">
                <div className="text-[11px] font-bold tracking-wider">
                  Reserve Seat <span className="mx-0.5 font-sans opacity-70">·</span> <span className="line-through opacity-70">₹299</span> Free <span className="mx-0.5 font-sans opacity-70">·</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 shrink-0">
                <span className="text-white text-sm font-bold">→</span>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-white/10 pt-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <BrandLogo variant="light" size="lg" />
            </div>
            <p className="text-sm text-white/60 mb-4">The complete path to becoming a professional AI engineer.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button type="submit" size="sm" className="shrink-0 bg-primary">
                {subscribed ? "✓" : "Subscribe"}
              </Button>
            </form>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/80">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">© {new Date().getFullYear()} AI Engineer Hub. All rights reserved.</p>
          <div className="flex gap-4">
            {[
              { name: "LinkedIn", href: "#" },
              { name: "Twitter", href: "#" },
              { name: "GitHub", href: "#" },
              { name: "YouTube", href: "https://www.youtube.com/@Techtalks02-ai" },
              { name: "Instagram", href: "https://www.instagram.com/techtalks02/" },
            ].map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-primary transition-colors">
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
