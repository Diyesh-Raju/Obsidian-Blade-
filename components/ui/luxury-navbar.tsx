"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/lib/theme-store";
import { getLenis } from "@/lib/lenis-instance";

const NAV_LINKS = [
  { name: "Villa Projects", href: "/villas" },
  { name: "Residential", href: "/residential" },
  { name: "Commercial", href: "/commercial" },
  { name: "Investors", href: "/investors" },
  { name: "About", href: "/about" },
];

export function LuxuryNavbar() {
  const activePath = usePathname() || "";
  const progressRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isCinemaMode = useThemeStore((s) => s.isHoveringBubble);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMenuOpen(false);
    if (activePath === href) {
      e.preventDefault();
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    // Compute progress straight from the document's scroll position so the
    // bar reaches 100% only when the viewport bottom hits the document
    // bottom. GSAP ScrollTrigger on document.body misreported under Lenis's
    // virtual scroll wrapper, which let the bar fill early.
    const update = () => {
      const doc = document.documentElement;
      const max = Math.max(doc.scrollHeight, document.body.scrollHeight) -
        window.innerHeight;
      const y = window.scrollY;
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      const el = progressRef.current;
      if (el) el.style.transform = `scaleX(${progress})`;
      setIsScrolled(y >= 50);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [activePath]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        className={cn(
          "font-sans fixed top-0 left-0 w-full z-50 h-16 md:h-20 flex justify-between items-center px-4 sm:px-6 md:px-12 transition-all duration-500 border-b",
          isCinemaMode
            ? "bg-black/95 backdrop-blur-xl border-white/5"
            : isScrolled || menuOpen
              ? "bg-white/90 backdrop-blur-md border-zinc-200"
              : "bg-transparent backdrop-blur-none border-transparent"
        )}
      >
        {/* BRAND LOGO */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className={cn(
            "text-sm sm:text-base md:text-xl tracking-[0.25em] sm:tracking-[0.3em] font-medium uppercase z-10 transition-colors duration-500 whitespace-nowrap",
            isCinemaMode ? "text-[#b76e79]" : "text-black"
          )}
        >
          Obsidian Blade
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex h-full items-center gap-4">
          {NAV_LINKS.map((link) => {
            const isActive = activePath.includes(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
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
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#b76e79] shadow-[0_-2px_12px_rgba(183,110,121,0.9)] rounded-t-sm" />
                )}
              </Link>
            );
          })}
        </div>

        {/* DESKTOP CONNECT BUTTON */}
        <div className="hidden md:block z-10">
          <Link
            href="/contact"
            className={cn(
              "px-8 py-3 rounded-full border-none outline-none text-xs tracking-widest uppercase transition-all duration-500 shadow-md",
              isCinemaMode
                ? "bg-[#b76e79] text-black shadow-[0_0_20px_rgba(183,110,121,0.3)] hover:shadow-[0_0_25px_rgba(183,110,121,0.5)]"
                : "bg-[#b76e79] hover:bg-[#a05d68] text-white hover:shadow-[0_0_15px_rgba(183,110,121,0.4)]"
            )}
          >
            Contact Us
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={cn(
            "md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[5px] z-[60] transition-colors duration-300 touch-manipulation cursor-pointer bg-transparent",
            isCinemaMode ? "text-[#b76e79]" : "text-zinc-900"
          )}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <span
            className={cn(
              "block h-[2px] w-6 bg-current transition-all duration-300 origin-center",
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            )}
          />
          <span
            className={cn(
              "block h-[2px] w-6 bg-current transition-all duration-300",
              menuOpen ? "opacity-0" : "opacity-100"
            )}
          />
          <span
            className={cn(
              "block h-[2px] w-6 bg-current transition-all duration-300 origin-center",
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            )}
          />
        </button>

        {/* SCROLL PROGRESS TRACKER */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent pointer-events-none">
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-gradient-to-r from-[#b76e79] via-[#e8b4bc] to-[#b76e79] shadow-[0_0_10px_rgba(183,110,121,0.9),0_0_20px_rgba(183,110,121,0.55)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </nav>

      {/* MOBILE DRAWER — only mounted when open, so iOS can't fail hit-testing */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[55]"
          style={{ touchAction: "none" }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/50"
            style={{ WebkitTapHighlightColor: "transparent" }}
          />
          {/* Panel */}
          <div
            className="absolute top-16 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col pt-8 pb-10 px-6"
            style={{
              height: "calc(100dvh - 4rem)",
              minHeight: "calc(100vh - 4rem)",
            }}
          >
            <div className="flex flex-col divide-y divide-zinc-200">
              {NAV_LINKS.map((link) => {
                const isActive = activePath.includes(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "py-5 text-base tracking-[0.25em] uppercase font-medium",
                      isActive ? "text-[#b76e79]" : "text-zinc-800"
                    )}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-10 bg-[#b76e79] text-white py-4 rounded-full text-xs tracking-[0.3em] uppercase font-semibold shadow-md active:scale-[0.98] transition-transform touch-manipulation text-center"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
