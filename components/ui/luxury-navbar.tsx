"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/lib/theme-store";

const NAV_LINKS = [
  { name: "Villa Projects", href: "/villas" },
  { name: "Residential", href: "/residential" },
  { name: "Commercial", href: "/commercial" },
  { name: "Investors", href: "/investors" },
  { name: "About", href: "/about" }
];

export function LuxuryNavbar() {
  const activePath = usePathname() || "";
  const progressRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isCinemaMode = useThemeStore((s) => s.isHoveringBubble);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // GSAP controls the scroll progress line for zero-lag performance
    gsap.to(progressRef.current, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
      },
    });

    // Lightweight scroll listener for transparent-to-glass transition
    const handleScroll = () => setIsScrolled(window.scrollY >= 50);
    handleScroll(); // set initial state on mount
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // ADDED 'font-sans' here to strictly enforce your Geist font from layout.tsx
    <nav className={cn(
      "font-sans fixed top-0 left-0 w-full z-50 h-20 flex justify-between items-center px-6 md:px-12 transition-all duration-500 border-b",
      isCinemaMode
        ? "bg-black/95 backdrop-blur-xl border-white/5"
        : isScrolled
          ? "bg-white/80 backdrop-blur-md border-zinc-200"
          : "bg-transparent backdrop-blur-none border-transparent"
    )}>

      {/* 1. BRAND LOGO */}
      <Link href="/" className={cn(
        "text-xl tracking-[0.3em] font-medium uppercase z-10 transition-colors duration-500",
        isCinemaMode ? "text-[#b76e79]" : "text-black"
      )}>
        Obsidian Blade
      </Link>

      {/* 2. NAVIGATION LINKS */}
      <div className="hidden md:flex h-full items-center gap-4">
        {NAV_LINKS.map((link) => {
          const isActive = activePath.includes(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative h-full flex items-center px-4 text-xs tracking-widest uppercase transition-colors duration-500",
                isActive
                  ? "text-[#b76e79] font-semibold"
                  : isCinemaMode
                    ? "text-[#b76e79]/70 hover:text-[#b76e79]"
                    : "text-zinc-500 hover:text-[#b76e79]"
              )}
            >
              {link.name}

              {/* THE BRIGHT ROSE GOLD ACTIVE HIGHLIGHT */}
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#b76e79] shadow-[0_-2px_12px_rgba(183,110,121,0.9)] rounded-t-sm" />
              )}
            </Link>
          );
        })}
      </div>

      {/* 3. CONNECT BUTTON */}
      <div className="hidden md:block z-10">
        <button className={cn(
          "px-8 py-3 rounded-full border-none outline-none text-xs tracking-widest uppercase transition-all duration-500 shadow-md",
          isCinemaMode
            ? "bg-[#b76e79] text-black shadow-[0_0_20px_rgba(183,110,121,0.3)] hover:shadow-[0_0_25px_rgba(183,110,121,0.5)]"
            : "bg-[#b76e79] hover:bg-[#a05d68] text-white hover:shadow-[0_0_15px_rgba(183,110,121,0.4)]"
        )}>
          Connect
        </button>
      </div>

      {/* 4. THE ZERO-LAG SCROLL PROGRESS TRACKER */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent pointer-events-none">
        <div 
          ref={progressRef}
          className="h-full bg-[#b76e79]/40 w-0"
        />
      </div>
    </nav>
  );
}