"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GALLERY_ITEMS = [
  {
    src: "/residential-1.jpg",
    alt: "Obsidian Blade waterfront penthouse exterior with infinity pool overlooking the harbor at sunset",
  },
  {
    src: "/residential-2.jpg",
    alt: "Grand marble foyer of the Celestial Residence featuring double-height ceilings and rose gold accents",
  },
  {
    src: "/residential-3.jpg",
    alt: "Modern open-concept living space with floor-to-ceiling windows and panoramic mountain views",
  },
  {
    src: "/residential-4.jpg",
    alt: "Obsidian Blade rooftop terrace lounge with landscaped garden and skyline backdrop at dusk",
  },
];

export function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current?.scrollWidth || 0;
      const clientWidth = document.documentElement.clientWidth;

      gsap.to(scrollRef.current, {
        x: -(scrollWidth - clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "center center",
          end: `+=${scrollWidth}`,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full bg-zinc-900 overflow-hidden flex flex-col justify-center"
    >
      <div className="px-12 mb-8 absolute top-32">
        <h2 className="text-[#b76e79] text-5xl font-light tracking-wide drop-shadow-md">
          The Master Portfolio
        </h2>
        <p className="text-zinc-500 text-sm tracking-widest uppercase mt-4">
          Scroll to explore
        </p>
      </div>

      {/* HORIZONTAL SCROLL TRACK */}
      <div ref={scrollRef} className="flex gap-8 px-12 mt-20 w-max">
        {GALLERY_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="relative w-[60vw] md:w-[40vw] h-[50vh] rounded-2xl overflow-hidden shrink-0 group"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
