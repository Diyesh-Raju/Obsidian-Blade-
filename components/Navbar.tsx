"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Villa Projects", path: "/villas" },
  { name: "Residential", path: "/residential" },
  { name: "Commercial", path: "/commercial" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isGlobalCinemaMode, setIsGlobalCinemaMode] = useState(false);
  const pathname = usePathname();

  // When a nav link points to the page we're already on, Next.js skips navigation
  // (and therefore skips its default scroll-to-top). Intercept those same-route
  // clicks and smooth-scroll manually. Cross-route clicks fall through to Next.
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 1. Handle Scroll State
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Handle Cinema Mode State (Listens to the html tag)
  useEffect(() => {
    if (typeof document !== "undefined") {
      const htmlElement = document.documentElement;
      
      // Initial check just in case
      setIsGlobalCinemaMode(htmlElement.classList.contains("theme-cinema-mode"));

      // Set up the observer to watch for class changes triggered by the Villas page
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            setIsGlobalCinemaMode(htmlElement.classList.contains("theme-cinema-mode"));
          }
        });
      });
      
      observer.observe(htmlElement, { attributes: true });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${
        isGlobalCinemaMode 
          ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 py-4" // CINEMA MODE: Dark glass
          : scrolled 
            ? "bg-white/80 backdrop-blur-md border-b border-[#b76e79]/10 py-4 shadow-sm" // SCROLLED: Light glass
            : "bg-transparent py-6" // DEFAULT: Transparent
      }`}
    >
      <div className="flex items-center justify-between px-8 md:px-24">
        
        {/* LOGO */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className={`text-sm font-bold tracking-[0.3em] uppercase transition-colors duration-1000 ${
            isGlobalCinemaMode ? "text-[#b76e79]" : "text-black"
          }`}
        >
          OBSIDIAN BLADE
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className={`text-xs uppercase tracking-[0.2em] transition-colors duration-1000 ${
                isGlobalCinemaMode
                  ? "text-[#b76e79]/70 hover:text-[#b76e79]" // CINEMA MODE: Muted rose to bright rose
                  : "text-zinc-500 hover:text-[#b76e79]" // DEFAULT: Gray to bright rose
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <Link
          href="/contact"
          onClick={(e) => handleNavClick(e, "/contact")}
          className={`heartbeateffect px-8 py-3 text-xs uppercase tracking-widest font-bold hidden md:block transition-all duration-1000 ${
            isGlobalCinemaMode
              ? "bg-[#b76e79] text-[#0a0a0a] rounded-full shadow-[0_0_20px_rgba(183,110,121,0.3)] border border-[#b76e79]" // CINEMA MODE: Solid Rose Gold
              : "glass-button" // DEFAULT: Liquid Glass
          }`}
        >
          Connect
        </Link>
      </div>
    </header>
  );
}