"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CircularGallery from "../components/CircularGallery";
import PropertySearch from "../components/PropertySearch";
import HomepageExtras from "../components/HomepageExtras";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const totalFrames = 240;

  useEffect(() => {
    if (!wordsRef.current || !imgRef.current || !containerRef.current) return;

    // Silent Preloader
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedNumber = String(i).padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${paddedNumber}.jpg`;
    }

    // Hero Text Animation
    const words = wordsRef.current.querySelectorAll(".hero-word");
    const diamonds = wordsRef.current.querySelectorAll(".hero-diamond");

    gsap.fromTo(
      words,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.15 }
    );
    gsap.fromTo(
      diamonds,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.15,
        delay: 0.4,
      }
    );

    // Hero Sequence Timeline — scrub-linked to scroll
    const sequence = { frame: 1 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500",
        scrub: 0.1,
        pin: true,
        pinSpacing: true,
      },
    });

    // Frame sequence plays across 0%–80% of the scroll range
    tl.to(
      sequence,
      {
        frame: totalFrames,
        snap: "frame",
        ease: "none",
        duration: 0.8,
        onUpdate: () => {
          if (imgRef.current) {
            const currentFrame = Math.round(sequence.frame);
            const paddedNumber = String(currentFrame).padStart(3, "0");
            imgRef.current.src = `/sequence/ezgif-frame-${paddedNumber}.jpg`;
          }
        },
      },
      0
    );

    // Fade hero text out near the end
    tl.to(
      wordsRef.current,
      { opacity: 0, y: -30, duration: 0.2, ease: "power2.in" },
      0.7
    );

    // White overlay fades in at 75%–100% for a seamless transition to the white sections
    tl.to(
      overlayRef.current,
      { opacity: 1, duration: 0.25, ease: "power2.inOut" },
      0.75
    );

    // Parallax reveal for PropertySearch
    if (searchRef.current) {
      gsap.fromTo(
        searchRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: searchRef.current,
            start: "top 95%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main className="bg-white">
      {/* HERO SEQUENCE */}
      <section
        ref={containerRef}
        className="relative h-screen w-full bg-black overflow-hidden"
      >
        <img
          ref={imgRef}
          src="/sequence/ezgif-frame-001.jpg"
          alt="Luxury Estate Intro"
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-[1.1] pointer-events-none"
        />

        <div
          ref={wordsRef}
          className="absolute inset-0 flex flex-wrap justify-center items-center gap-6 md:gap-10 px-4 z-10"
        >
          {["ARCHITECTURAL", "MASTERPIECES", "ESTATES"].map((word, i) => (
            <span key={word} className="flex items-center gap-6 md:gap-10">
              {i > 0 && (
                <span className="hero-diamond text-[#b76e79]/50 text-lg select-none">
                  &#9670;
                </span>
              )}
              <span
                className="hero-word text-[#b76e79] text-sm md:text-lg lg:text-3xl font-light uppercase tracking-[0.3em] drop-shadow-lg opacity-0"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>

        {/* Seamless white fade overlay — driven by the timeline */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-white z-20 pointer-events-none opacity-0"
        />
      </section>

      {/* PROPERTY SEARCH — parallax reveal */}
      <div ref={searchRef}>
        <PropertySearch />
      </div>

      {/* CIRCULAR GALLERY */}
      <CircularGallery />

      {/* CLIENT TRUST / FAQS / CTA */}
      <HomepageExtras />
    </main>
  );
}
