"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Menu } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/ui/brand-logo";

export function AnnouncementBar({ onClose, onReserve }: { onClose: () => void; onReserve: () => void }) {
  return (
    <div
      className="hidden md:flex relative items-center justify-center gap-3 px-4 py-2.5 text-white text-xs sm:text-sm"
      style={{ background: "linear-gradient(90deg, #C45C26 0%, #D4A017 50%, #B8860B 100%)" }}
      suppressHydrationWarning
    >
      <span className="hidden lg:inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
        Free Webinar
      </span>
      <p className="text-center leading-snug text-[12px] sm:text-xs">
        <span className="hidden lg:inline">Learn by doing — </span>
        <strong>Mastering Claude Code:</strong>
        <span className="hidden lg:inline"> · Sat, Jun 1 · </span>
        <span className="line-through opacity-70">₹299</span>{" "}
        <strong>Free</strong>
      </p>
      <button
        type="button"
        onClick={onReserve}
        className="hidden lg:inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#8B3A1A] hover:bg-white/90 transition-colors shrink-0"
      >
        Reserve seat · <span className="line-through opacity-60 mx-0.5">₹299</span> Free →
      </button>
      <button
        onClick={onClose}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Header() {
  const router = useRouter();
  const [bannerVisible, setBannerVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openReserveSeat = useUIStore((s) => s.openReserveSeat);

  useEffect(() => {
    const dismissed = localStorage.getItem("announcement-dismissed");
    if (dismissed !== "true") {
      setBannerVisible(true);
    }
  }, []);

  const dismissBanner = () => {
    setBannerVisible(false);
    localStorage.setItem("announcement-dismissed", "true");
  };

  return (
    <header className="sticky top-0 z-50 w-full" suppressHydrationWarning>
      {bannerVisible && <AnnouncementBar onClose={dismissBanner} onReserve={openReserveSeat} />}

      <div
        className="px-2.5 sm:px-4 py-1.5 sm:py-2 w-full max-w-full overflow-hidden"
        style={{ background: "linear-gradient(90deg, #C45C26 0%, #D4A017 40%, #E8C87A 100%)" }}
        suppressHydrationWarning
      >
        <nav
          className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2 rounded-full border border-border/30 bg-card/95 backdrop-blur-md px-3 py-1.5 sm:py-2 shadow-lg shadow-black/5"
          suppressHydrationWarning
        >
          {/* Left: Brand Logo */}
          <BrandLogo size="md" />

          {/* Center: Nav links */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#learning-paths"
              className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
            >
              Paths
            </Link>
            <Link
              href="/#roadmap"
              className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
            >
              Full Roadmap
            </Link>
            <Link
              href="/lesson"
              className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
            >
              Lessons
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
          </div>

          {/* Right: Reserve + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openReserveSeat}
              className="hidden md:inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Reserve <span className="line-through opacity-60 mx-1">₹299</span> Free
            </button>

            {/* Mobile menu toggle */}
            <button
              className="sm:hidden p-2 rounded-full hover:bg-muted/50"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="mx-auto mt-2 max-w-4xl rounded-2xl border border-border/40 bg-card backdrop-blur-md p-4 shadow-lg sm:hidden space-y-1">
            <Link href="/" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-all" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/#learning-paths" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-all" onClick={() => setMobileOpen(false)}>Learning Paths</Link>
            <Link href="/#roadmap" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-all" onClick={() => setMobileOpen(false)}>Full Roadmap</Link>
            <Link href="/lesson" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-all" onClick={() => setMobileOpen(false)}>Curriculum Lessons</Link>
            <Link href="/dashboard" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-all" onClick={() => setMobileOpen(false)}>Dashboard</Link>
            <a href="#instructor" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-xl transition-all" onClick={() => setMobileOpen(false)}>Instructor</a>
            <a href="#faq" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-xl transition-all" onClick={() => setMobileOpen(false)}>FAQ</a>
            <button
              type="button"
              onClick={() => { openReserveSeat(); setMobileOpen(false); }}
              className="block mt-3 w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white text-center cursor-pointer hover:bg-primary/90 transition-all"
            >
              Reserve Free Seat
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
