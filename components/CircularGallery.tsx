"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface GalleryItem {
  category: string;
  title: string;
  location: string;
  image: string;
}

const properties: GalleryItem[] = [
  {
    category: "Commercial",
    title: "The Apex Tower",
    location: "Financial District",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  {
    category: "Residences",
    title: "Glass Pavilion",
    location: "Coastal Palisades",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
  },
  {
    category: "Villas",
    title: "Villa Nocturne",
    location: "Private Island",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  },
  {
    category: "Penthouse",
    title: "Skyline Reserve",
    location: "Downtown Core",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop",
  },
  {
    category: "Hospitality",
    title: "The Obsidian Resort",
    location: "Alpine Ridge",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    category: "Commercial",
    title: "Aura Plaza",
    location: "Innovation Park",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  },
];

export default function CircularGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const [rotation, setRotation] = useState(0);
  const [viewport, setViewport] = useState({
    radius: 650,
    cardW: 320,
    cardH: 450,
  });

  useEffect(() => {
    const computeViewport = () => {
      const w = window.innerWidth;
      if (w < 640) {
        return { radius: 260, cardW: 200, cardH: 280 };
      }
      if (w < 1024) {
        return { radius: 440, cardW: 260, cardH: 370 };
      }
      return { radius: 650, cardW: 320, cardH: 450 };
    };
    setViewport(computeViewport());
    const onResize = () => setViewport(computeViewport());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          setRotation(self.progress * 360);
        },
      });

      setTimeout(() => ScrollTrigger.refresh(), 200);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const { radius, cardW, cardH } = viewport;

  const anglePerItem = 360 / properties.length;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-white overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="absolute top-12 text-center z-10">
        <h2 className="text-[#b76e79] text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
          Selected Works
        </h2>
        <h3 className="font-clash text-3xl sm:text-4xl md:text-5xl tracking-tight text-black">
          Global Portfolio
        </h3>
      </div>

      <div
        className="relative w-full h-full flex items-center justify-center mt-12"
        style={{ perspective: "2000px" }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${-rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {properties.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = -rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
            );
            const opacity = Math.max(0.2, 1 - normalizedAngle / 120);

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  width: `${cardW}px`,
                  height: `${cardH}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: `-${cardW / 2}px`,
                  marginTop: `-${cardH / 2}px`,
                  opacity: opacity,
                  transition: "opacity 0.1s ease-out",
                }}
              >
                <div className="relative w-full h-full glass-card overflow-hidden group p-2">
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white/90 to-transparent">
                      <p className="text-[#b76e79] text-[10px] uppercase tracking-widest font-bold mb-1">
                        {item.category}
                      </p>
                      <h4 className="text-xl font-medium text-black tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-zinc-500 text-xs mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#b76e79]"></span>{" "}
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
