"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, Menu, X, Compass, Sparkles
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/ui/brand-logo";

interface NavItem {
  href: string;
  label: string;
  icon: any;
  children?: { href: string; label: string }[];
}

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lesson", label: "Curriculum Lessons", icon: BookOpen },
  { href: "/#roadmap", label: "Full Roadmap", icon: Compass },
  { href: "/courses/ai-projects", label: "AI Projects", icon: Sparkles }
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="lg:hidden fixed top-3 sm:top-4 left-3 sm:left-4 z-50 p-2 rounded-xl bg-card/65 backdrop-blur-sm border border-border/40 shadow-md cursor-pointer" onClick={() => setOpen(!open)}>
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-60 sm:w-64 bg-card/65 backdrop-blur-md border-r border-border/40 transform transition-transform lg:translate-x-0 flex flex-col justify-between",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div>
          <div className="flex h-14 sm:h-16 items-center px-4 sm:px-5 border-b border-border/40">
            <BrandLogo size="md" />
          </div>
          <nav className="p-3 sm:p-4 space-y-1">
            {NAV.map((item) => {
              const isSelected = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));
              return (
                <div key={item.href} className="space-y-1">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent",
                      isSelected
                        ? "bg-primary/15 text-primary border-primary/10 shadow-sm"
                        : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-11 space-y-1.5 py-1">
                      {item.children.map((subItem) => {
                        const isSubSelected = pathname.includes(subItem.href) || pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "block px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 border-l-2",
                              isSubSelected
                                ? "text-primary border-primary bg-primary/5 font-semibold"
                                : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/30"
                            )}
                          >
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
        <div className="p-3 sm:p-4 border-t border-border/40">
          <div className="px-3 py-2">
            <div className="text-sm font-medium text-foreground">AI Engineering Student</div>
            <div className="text-xs text-muted-foreground">Active Cohort Access</div>
          </div>
        </div>
      </aside>
    </>
  );
}

