"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CircularGallery from "../components/CircularGallery";
import PropertySearch from "../components/PropertySearch";
import AboutStats from "../components/AboutStats";
import BoardOfDirectors from "../components/BoardOfDirectors";
import HomepageExtras from "../components/HomepageExtras";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;

export default function Home() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scrollSection = scrollSectionRef.current;
    if (!canvas || !scrollSection) return;

    const ctxCanvas = canvas.getContext("2d", { alpha: false });
    if (!ctxCanvas) return;

    // Pick frame set by viewport width. Mobile users get 960w frames (~9MB total)
    // instead of 1080p frames (~31MB). Desktop gets full quality.
    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia("(max-width: 768px)").matches ||
        window.matchMedia("(pointer: coarse)").matches);
    const framesDir = isMobile ? "/hero-frames-sm" : "/hero-frames";
    const framePath = (i: number) =>
      `${framesDir}/frame-${String(i).padStart(4, "0")}.jpg`;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT + 1);
    const state = { frame: 0 };
    let disposed = false;

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    };

    const drawCover = (img: HTMLImageElement) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;
      ctxCanvas.imageSmoothingEnabled = true;
      ctxCanvas.imageSmoothingQuality = "high";
      ctxCanvas.drawImage(img, x, y, w, h);
    };

    const render = () => {
      const idx = Math.min(
        FRAME_COUNT,
        Math.max(1, Math.round(state.frame) || 1)
      );
      const img = images[idx];
      if (img && img.complete && img.naturalWidth > 0) {
        drawCover(img);
      } else {
        for (let d = 1; d < FRAME_COUNT; d++) {
          const a = images[idx - d];
          if (a && a.complete && a.naturalWidth > 0) {
            drawCover(a);
            return;
          }
          const b = images[idx + d];
          if (b && b.complete && b.naturalWidth > 0) {
            drawCover(b);
            return;
          }
        }
      }
    };

    sizeCanvas();

    const onResize = () => {
      sizeCanvas();
      render();
    };
    window.addEventListener("resize", onResize);

    let loaded = 0;
    const startLoad = (i: number) => {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      images[i] = img;
      img.onload = () => {
        if (disposed) return;
        loaded += 1;
        setLoadedCount(loaded);
        if (i === 1) render();
        if (loaded >= FRAME_COUNT) {
          setReady(true);
          ScrollTrigger.refresh();
        }
      };
      img.onerror = () => {
        loaded += 1;
        setLoadedCount(loaded);
        if (loaded >= FRAME_COUNT) {
          setReady(true);
          ScrollTrigger.refresh();
        }
      };
    };

    startLoad(1);
    for (let i = 2; i <= FRAME_COUNT; i++) startLoad(i);

    const gctx = gsap.context(() => {
      gsap.fromTo(
        stickyRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
      );

      gsap.to(state, {
        frame: FRAME_COUNT,
        ease: "none",
        scrollTrigger: {
          trigger: scrollSection,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
        onUpdate: render,
      });

      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scrollSection,
          start: "88% bottom",
          end: "98% bottom",
          scrub: true,
        },
      });

      gsap.to(subTextRef.current, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scrollSection,
          start: "92% bottom",
          end: "100% bottom",
          scrub: true,
        },
      });
    }, scrollSectionRef);

    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      gctx.revert();
    };
  }, []);

  const pct = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    <main className="bg-black">
      {/* SCROLL-DRIVEN FRAME HERO */}
      <section
        ref={scrollSectionRef}
        className="relative w-full bg-black"
        style={{ height: "300vh" }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-black"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
          />

          {!ready && (
            <div
              className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-20 text-white/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Loading {pct}%
            </div>
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4 sm:px-6 text-center">
            <h1
              ref={textRef}
              className="text-white text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light uppercase tracking-[0.2em] sm:tracking-[0.3em]"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                opacity: 0,
                transform: "translateY(30px) scale(0.96)",
                textShadow:
                  "0 2px 12px rgba(0,0,0,0.55), 0 8px 40px rgba(0,0,0,0.45)",
              }}
            >
              <span>Obsidian</span> <span className="text-[#b76e79]">Blade</span>
            </h1>
            <p
              ref={subTextRef}
              className="mt-4 sm:mt-6 text-white/90 text-[10px] sm:text-sm md:text-base tracking-[0.3em] sm:tracking-[0.45em] uppercase"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                opacity: 0,
                transform: "translateY(20px)",
                textShadow: "0 2px 10px rgba(0,0,0,0.6)",
              }}
            >
              Where Architecture Becomes Art
            </p>
          </div>
        </div>
      </section>

      {/* REST OF PAGE */}
      <div className="relative z-20 bg-black w-full flex flex-col">
        <PropertySearch />
        <AboutStats />
        <CircularGallery />
        <BoardOfDirectors />
        <HomepageExtras />
        <Footer />
      </div>
    </main>
  );
}
