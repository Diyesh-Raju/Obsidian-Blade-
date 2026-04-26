"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const directors = [
  {
    name: "Arthur Pendelton",
    title: "Chairman",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Evelyn Vance",
    title: "Managing Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Marcus Hale",
    title: "Chief Financial Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Sophia Laurent",
    title: "Head of Design & Architecture",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Julian Thorne",
    title: "Director of Operations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  },
];

export default function BoardOfDirectors() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    // Card width = ~85vw on mobile, ~30% on desktop. Use the actual first card width
    // so a single arrow tap advances exactly one card. behavior:"smooth" is unreliable
    // on mobile Safari + virtual scrollers; we manually animate.
    const firstCard = track.querySelector("article") as HTMLElement | null;
    const distance = firstCard
      ? firstCard.offsetWidth + 24
      : Math.min(track.clientWidth * 0.85, 400);
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }, []);

  return (
    <section className="w-full bg-zinc-50 text-zinc-900 py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#b76e79] font-bold block mb-2">
              Board of
            </span>
            <h2 className="font-clash text-4xl md:text-5xl font-light text-zinc-900">
              Directors
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="w-11 h-11 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-900 active:bg-zinc-100 transition-all duration-300 touch-manipulation cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="w-11 h-11 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-900 active:bg-zinc-100 transition-all duration-300 touch-manipulation cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={trackRef}
          className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6"
        >
          {directors.map((d) => (
            <article
              key={d.name}
              className="min-w-[85vw] md:min-w-[30%] snap-start border border-zinc-200 bg-white p-4 flex-shrink-0"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden mb-4">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="(max-width: 768px) 85vw, 30vw"
                  className="object-cover"
                />
              </div>
              <span className="text-lg text-[#b76e79] font-medium block">{d.name}</span>
              <span className="text-xs text-zinc-500 uppercase tracking-wider mt-1 block">{d.title}</span>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
