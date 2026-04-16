"use client";

import React, { useEffect, useRef } from "react";
import { TurbulenceParticles } from "@/components/ui/turbulence-particles";
import { HorizontalGallery } from "@/components/ui/horizontal-gallery";

export default function CommercialPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 1. THIS IS THE FIX: We explicitly force the browser to load and play the video 
    // via JavaScript, bypassing the browser's aggressive auto-play throttling.
    if (videoRef.current) {
      // Force it to load the whole file
      videoRef.current.load();
      // Force it to play
      videoRef.current.play().catch((error) => {
        console.warn("Video autoplay was prevented by the browser:", error);
      });
    }
  }, []);

  return (
    <main className="bg-white overflow-x-hidden">
      
      {/* THE 100VH CINEMATIC VIDEO HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        
        {/* --- THE VIDEO LAYER --- */}
        <video
          ref={videoRef}
          src="/commercial-video.mp4"
          loop
          muted
          playsInline
          preload="auto" // Forces the browser to download the whole 20s file
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* --- OVERLAYS --- */}
        {/* Dark gradient so the white text is perfectly readable */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        
        {/* The floating Rose Gold dust particles */}
        <div className="absolute inset-0 z-10 opacity-50 pointer-events-none">
          <TurbulenceParticles />
        </div>

        {/* --- HERO TEXT --- */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <h1
            className="text-white text-6xl md:text-8xl lg:text-[10rem] font-normal drop-shadow-2xl"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Corporate Estates
          </h1>
          <p className="mt-8 text-white/90 text-sm md:text-lg tracking-[0.4em] uppercase font-light drop-shadow-md">
            The Pinnacle of Business
          </p>
        </div>
      </section>

      {/* --- SUBSEQUENT CONTENT --- */}
      <section className="relative z-40 min-h-screen bg-white py-32 px-6 border-t border-zinc-100 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto text-center">
          <h2 
            className="text-[#b76e79] text-4xl md:text-5xl font-normal mb-8"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Unmatched Infrastructure
          </h2>
          <p className="text-zinc-500 font-light tracking-wide text-lg max-w-2xl mx-auto">
            Discover architectural masterpieces designed strictly for the world's most visionary enterprises.
          </p>
        </div>
      </section>

      {/* --- HORIZONTAL SCROLL GALLERY --- */}
      <HorizontalGallery />
      
    </main>
  );
}