"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  href?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
  variant?: "dark" | "light" | "auto";
}

export function BrandLogo({
  href = "/",
  size = "md",
  className,
  showIcon = true,
  showText = true,
  variant = "auto",
}: BrandLogoProps) {
  const iconSizeMap = {
    sm: "h-6 w-6",
    md: "h-7 sm:h-8 w-7 sm:w-8",
    lg: "h-9 sm:h-10 w-9 sm:w-10",
    xl: "h-12 sm:h-14 w-12 sm:w-14",
  };

  const titleSizeMap = {
    sm: "text-[11px] sm:text-xs",
    md: "text-xs sm:text-[13px] md:text-sm",
    lg: "text-sm sm:text-base md:text-lg",
    xl: "text-lg sm:text-xl md:text-2xl",
  };

  const hubSizeMap = {
    sm: "text-[11px] sm:text-xs",
    md: "text-xs sm:text-[13px] md:text-sm",
    lg: "text-sm sm:text-base md:text-lg",
    xl: "text-lg sm:text-xl md:text-2xl",
  };

  const dividerHeightMap = {
    sm: "h-5",
    md: "h-6 sm:h-7",
    lg: "h-7 sm:h-8",
    xl: "h-9 sm:h-11",
  };

  const textColor =
    variant === "light"
      ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
      : variant === "dark"
      ? "text-[#111827] dark:text-white"
      : "text-[#18181B] dark:text-[#F4F4F5]";

  const dividerColor =
    variant === "light"
      ? "bg-white/30"
      : variant === "dark"
      ? "bg-gray-300 dark:bg-white/20"
      : "bg-border/80 dark:bg-white/20";

  const content = (
    <div className={cn("inline-flex items-center gap-2 sm:gap-2.5 select-none group cursor-pointer", className)}>
      {/* Radiant Orange "Ai" Emblem Icon */}
      {showIcon && (
        <div className="relative shrink-0 flex items-center justify-center">
          <img
            src="/assets/logo-icon.png"
            alt="AI Engineer Hub"
            className={cn(
              "object-contain transform transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm",
              iconSizeMap[size]
            )}
          />
        </div>
      )}

      {/* Divider */}
      {showIcon && showText && (
        <div
          className={cn(
            "w-[1.5px] rounded-full shrink-0 transition-colors duration-200",
            dividerHeightMap[size],
            dividerColor
          )}
        />
      )}

      {/* Wordmark: AI Engineer Hub */}
      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          <span
            className={cn(
              "font-extrabold tracking-tight transition-colors duration-200 leading-none",
              titleSizeMap[size],
              textColor
            )}
            style={{
              fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            AI Engineer
          </span>
          <span
            className={cn(
              "font-black tracking-tight leading-none mt-0.5 inline-block transform transition-transform group-hover:translate-x-0.5 duration-200",
              hubSizeMap[size]
            )}
            style={{
              background: "linear-gradient(135deg, #FF5500 0%, #FF7700 50%, #FFA000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 1px 2px rgba(255, 107, 0, 0.25))",
              letterSpacing: "-0.01em",
            }}
          >
            Hub
          </span>
        </div>
      )}
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex items-center shrink-0">
      {content}
    </Link>
  );
}
