"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const properties = [
  { id: "01", category: "Commercial", title: "The Apex Tower", location: "Financial District", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" },
  { id: "02", category: "Residences", title: "Glass Pavilion", location: "Coastal Palisades", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" },
  { id: "03", category: "Villas", title: "Villa Nocturne", location: "Private Island Estate", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" }
];

export default function PortfolioGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white text-zinc-900 py-32 px-8 md:px-24">
      <h2 className="text-xs uppercase tracking-[0.3em] text-boxrose mb-16">
        Selected Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
        {properties.map((prop, i) => (
          <div
            key={prop.id}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="group cursor-pointer"
          >
            {/* Image Container with Zoom effect */}
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 rounded-2xl">
              <img
                src={prop.image}
                alt={prop.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Property Text Details */}
            <div className="mt-6">
              <div className="flex justify-between items-center text-xs tracking-widest text-zinc-500 uppercase mb-2">
                <span>{prop.category}</span>
                <span>{prop.id}</span>
              </div>
              <h3 className="text-2xl font-light tracking-tight">{prop.title}</h3>
              <p className="text-sm text-zinc-500 mt-1">{prop.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
