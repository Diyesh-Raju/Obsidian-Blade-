"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { FeaturedProperties } from "@/components/ui/featured-properties";
import { FloorplanFolders } from "@/components/ui/3d-folder";
import Footer from "@/components/Footer";

// We convert the emojis into inline React components so they scale perfectly inside the nodes
const timelineData = [
  {
    id: 1,
    title: "Zero Delays",
    date: "Guaranteed",
    content: "Possession on promised date, guaranteed.",
    category: "Delivery",
    icon: ({ size }: any) => <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>🔑</span>,
    relatedIds: [2],
    status: "completed" as const, // Uses the Rose Gold styling
    energy: 100,
  },
  {
    id: 2,
    title: "Move-In Ready",
    date: "Seamless",
    content: "Your home awaits, fully finished with uncompromising attention to detail.",
    category: "Lifestyle",
    icon: ({ size }: any) => <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>🏡</span>,
    relatedIds: [1],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 3,
    title: "Eco Certified",
    date: "Sustainable",
    content: "Green living, lower bills, better future.",
    category: "Environment",
    icon: ({ size }: any) => <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>🌿</span>,
    relatedIds: [4],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 4,
    title: "Title Guaranteed",
    date: "Secure",
    content: "Clean ownership, zero legal worries. Complete peace of mind.",
    category: "Legal",
    icon: ({ size }: any) => <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>🔒</span>,
    relatedIds: [3, 5],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 5,
    title: "RERA Approved",
    date: "Compliant",
    content: "Strict adherence to all regulatory standards for absolute transparency.",
    category: "Trust",
    icon: ({ size }: any) => <span style={{ fontSize: `${size}px`, lineHeight: 1 }}>📜</span>,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 100,
  }
];

export default function ResidentialPage() {
  const slides = [
    "/residential-1.jpg",
    "/residential-2.jpg",
    "/residential-3.jpg",
    "/residential-4.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000); 

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <main className="min-h-screen bg-white text-black w-full">
      
      {/* --- FULL SCREEN HERO SLIDESHOW --- */}
      <section className="relative w-full h-screen overflow-hidden bg-zinc-900">
        {slides.map((slide, index) => (
          <Image
            key={index}
            src={slide}
            alt={`Residential luxury view ${index + 1}`}
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority={index === 0 ? "high" : "auto"}
            quality={75}
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/20 z-20 pointer-events-none" />

        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <h1
            className="text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-normal drop-shadow-xl tracking-wide leading-[1.05]"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
          >
            Residential Towers
          </h1>
          <p className="mt-4 sm:mt-6 text-white/90 text-[10px] sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed font-light tracking-[0.25em] sm:tracking-[0.3em] uppercase drop-shadow-md px-4">
            Redefining the skyline with unparalleled elegance
          </p>
        </div>
      </section>

      {/* --- THE GUARANTEES ORBITAL TIMELINE --- */}
      <section className="py-24 bg-white relative z-10 border-t border-[#b76e79]/15">
        <div className="text-center mb-10">
          <h2 
            className="text-[#b76e79] text-4xl sm:text-5xl md:text-6xl font-normal drop-shadow-sm"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
          >
            Our Guarantees
          </h2>
          <p className="text-zinc-500 mt-4 font-light tracking-wide max-w-2xl mx-auto px-6">
            Experience absolute peace of mind with our uncompromising standards, 
            certified commitments, and seamless delivery process.
          </p>
        </div>
        
        <RadialOrbitalTimeline timelineData={timelineData} />
      </section>
      
      {/* --- FEATURED PROPERTIES GRID --- */}
      <section
        id="current-collections"
        className="scroll-mt-24 py-24 bg-zinc-50 relative z-10 border-t border-zinc-200"
      >
        <div className="text-center mb-16">
          <h2 
            className="text-[#b76e79] text-4xl sm:text-5xl md:text-6xl font-normal drop-shadow-sm"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
          >
            Current Collections
          </h2>
          <p className="text-zinc-500 mt-4 font-light tracking-wide max-w-2xl mx-auto px-6">
            Discover our active portfolio of ultra-luxury high-rise residences available for acquisition.
          </p>
        </div>
        
        <FeaturedProperties />
      </section>

      {/* --- FLOORPLAN FOLDERS --- */}
      <FloorplanFolders />

      {/* FOOTER */}
      <Footer />

    </main>
  );
}