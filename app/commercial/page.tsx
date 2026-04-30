"use client";

import React, { useEffect, useRef, useState } from "react";
import { TurbulenceParticles } from "@/components/ui/turbulence-particles";
import { Sparkles } from "@/components/ui/sparkles";
import { FeaturedCommercial } from "@/components/ui/featured-commercial";
import Footer from "@/components/Footer";

const stats = [
  { value: 12, unit: "Mn Sqft", label: "Ongoing Developments" },
  { value: 28, unit: "Mn Sqft", label: "Completed Developments" },
  { value: 8, unit: "Mn Sqft", label: "Upcoming Developments" },
];

// Counts up from 0 to `target` whenever `active` flips to true.
// On `active === false` it resets to 0, so toggling out-and-back replays.
function CountUp({
  target,
  active,
  duration = 1800,
}: {
  target: number;
  active: boolean;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return <>{value}</>;
}

export default function CommercialPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const statsSectionRef = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.warn("Video autoplay was prevented by the browser:", error);
      });
    }
  }, []);

  useEffect(() => {
    const node = statsSectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStatsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white">
      {/* THE 100VH CINEMATIC VIDEO HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/commercial-video.mp4"
          loop
          muted
          playsInline
          autoPlay
          preload="metadata"
          poster="/commercial-video-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

        <div className="absolute inset-0 z-10 opacity-50 pointer-events-none">
          <TurbulenceParticles />
        </div>

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <h1
            className="text-white text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-normal drop-shadow-2xl leading-[1.05] text-center px-4"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
          >
            Corporate Estates
          </h1>
          <p className="mt-5 sm:mt-8 text-white/90 text-[10px] sm:text-sm md:text-lg tracking-[0.3em] sm:tracking-[0.4em] uppercase font-light drop-shadow-md text-center px-4">
            The Pinnacle of Business
          </p>
        </div>
      </section>

      {/* --- TRUSTED-BY SECTION (21st.dev Sparkles demo, white theme) --- */}
      <section className="relative h-screen w-full overflow-hidden bg-white">
        {/* HEADING + LOGOS */}
        <div className="relative z-10 mx-auto mt-32 w-full max-w-3xl px-6">
          <div className="text-center text-3xl md:text-5xl lg:text-6xl font-medium leading-tight">
            <span className="text-indigo-900">Trusted by experts.</span>
            <br />
            <span className="text-zinc-900">Used by the leaders.</span>
          </div>

          <div className="mt-14 grid grid-cols-5 items-center justify-items-center text-zinc-900 gap-2">
            {/* Retool */}
            <div className="flex items-center gap-1.5 text-sm md:text-base font-semibold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M3 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8v8a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1V4Z" />
                <path d="M14 13a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v8a1 1 0 0 1-1.7.7l-5-5A1 1 0 0 1 14 16v-3Z" />
              </svg>
              Retool
            </div>
            {/* Vercel */}
            <div className="flex items-center gap-1.5 text-sm md:text-base font-semibold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <polygon points="12,2 22,20 2,20" />
              </svg>
              Vercel
            </div>
            {/* remote */}
            <div className="flex items-center gap-1.5 text-sm md:text-base font-semibold lowercase">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 20V8a4 4 0 0 1 4-4h3a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H8" />
                <path d="m13 12 5 8" />
              </svg>
              remote
            </div>
            {/* ARC */}
            <div className="flex items-center gap-1.5 text-sm md:text-base font-semibold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M3 18a9 9 0 0 1 18 0" />
                <circle cx="12" cy="9" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              ARC
            </div>
            {/* Raycast */}
            <div className="flex items-center gap-1.5 text-sm md:text-base font-semibold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
                <path d="M2 14v8h8" />
                <path d="M2 14 14 2l8 8" />
                <path d="M10 22 22 10" />
              </svg>
              Raycast
            </div>
          </div>
        </div>

        {/* DOME — curved horizon + soft glow + sparkles, all stacked */}
        <div className="relative -mt-32 h-[34rem] w-full overflow-hidden [mask-image:radial-gradient(60%_60%,white,transparent)]">
          {/* Soft purple glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,#a78bfa,transparent_70%)] opacity-40" />
          {/* Big circle whose top edge becomes the curved horizon */}
          <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-indigo-900/10 bg-white" />
          {/* Sparkles fill the area, themselves masked into a softer falloff */}
          <Sparkles
            density={1500}
            className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(70%_70%,white,transparent_98%)]"
            color="#6366f1"
            size={1.2}
          />
        </div>

        {/* Bottom-fill sparkles — covers the white space below the dome and along the section floor */}
        <Sparkles
          density={900}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[28rem] w-full [mask-image:linear-gradient(to_top,white_55%,transparent)]"
          color="#6366f1"
          size={1}
        />
      </section>

      {/* --- DEVELOPMENTS / STATS SECTION (modeled on prestigeconstructions.com/offices) --- */}
      <section
        ref={statsSectionRef}
        className="relative w-full min-h-[100vh] overflow-hidden"
        style={{
          // Left-to-right fade keeps the skyline visible on the right
          // while darkening the left so the stats card + paragraphs stay legible.
          backgroundImage:
            "linear-gradient(to right, rgba(10,12,24,0.88) 0%, rgba(10,12,24,0.6) 35%, rgba(10,12,24,0.15) 65%, rgba(10,12,24,0) 100%), url('/commercial-skyline.jpg'), linear-gradient(to bottom, #1e1b3a 0%, #15132e 50%, #0a0a1e 100%)",
          backgroundSize: "cover, cover, cover",
          backgroundPosition: "center, center, center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-24 md:py-32">
          {/* STATS CARD */}
          <div className="max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <div className="flex items-start text-[#d4a07a]">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-extralight leading-none font-serif tabular-nums">
                      <CountUp target={stat.value} active={statsVisible} />
                    </span>
                    <span className="text-[10px] sm:text-xs ml-1 mt-1 tracking-wider uppercase opacity-90">
                      {stat.unit}
                    </span>
                  </div>
                  <p className="text-white/85 text-xs sm:text-sm mt-4 font-light leading-snug tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* BODY COPY */}
          <div className="mt-10 sm:mt-14 max-w-xl space-y-5 sm:space-y-6 text-white/85 font-light leading-relaxed text-base sm:text-lg">
            <p>
              With over a decade of architectural mastery, Obsidian Blade has
              been shaping the world&rsquo;s corporate landscape with
              future-ready workspaces that drive innovation, sustainability,
              and global leadership.
            </p>
            <p>
              Through our design philosophy, we continue to build
              forward-thinking environments that elevate human experiences
              while cementing our legacy of craftsmanship, vision, and
              landmark achievements.
            </p>
          </div>
        </div>
      </section>

      {/* --- CURRENT DEVELOPMENTS GRID --- */}
      <section
        id="current-developments"
        className="scroll-mt-24 py-24 bg-zinc-50 relative z-10 border-t border-zinc-200"
      >
        <div className="text-center mb-16">
          <h2
            className="text-[#b76e79] text-4xl sm:text-5xl md:text-6xl font-normal drop-shadow-sm"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
          >
            Current Developments
          </h2>
          <p className="text-zinc-500 mt-4 font-light tracking-wide max-w-2xl mx-auto px-6">
            Explore our active commercial portfolio — landmark towers and flagship pavilions shaping tomorrow's skylines.
          </p>
        </div>

        <FeaturedCommercial />
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
