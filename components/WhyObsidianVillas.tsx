"use client";

import { useState } from "react";
import Image from "next/image";

const features = [
  {
    id: "symmetry",
    title: "Architectural Symmetry",
    description:
      "Every Obsidian Blade villa is engineered with meticulous attention to proportion, blending striking geometric facades with organic surroundings to create a timeless visual equilibrium.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "sustainability",
    title: "Sustainable Elegance",
    description:
      "We embed high-performance sustainability into the DNA of our developments. From climate-responsive design to advanced energy management, luxury no longer comes at the expense of the environment.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "privacy",
    title: "Curated Privacy",
    description:
      "Our master planning ensures an unparalleled level of seclusion. Strategic landscaping, private entryways, and intelligent spatial design offer a sanctuary away from the world.",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "interiors",
    title: "Bespoke Interiors",
    description:
      "Step into spaces designed for the discerning. Double-height ceilings, imported materials, and hospitality-led layouts ensure every square foot serves a purpose of pure refinement.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
  },
];

export default function WhyObsidianVillas() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-white text-zinc-900 py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1500px] mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#b76e79] font-medium mb-6 block">
            The Obsidian Standard
          </span>
          <h2 className="font-clash text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.1] tracking-tight text-zinc-900">
            Why Obsidian Blade Villas?
          </h2>
          <p className="mt-6 text-zinc-500 text-base sm:text-lg leading-relaxed">
            Four pillars define every residence we commission — a deliberate philosophy
            of design, restraint, and legacy built for those who see property not as shelter, but as signature.
          </p>
        </div>

        {/* Horizontal Expanding Panels */}
        <div className="flex flex-col lg:flex-row gap-3 w-full h-auto lg:h-[72vh] lg:min-h-[560px] lg:max-h-[760px]">
          {features.map((feature, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-expanded={isActive}
                aria-label={feature.title}
                className={`relative overflow-hidden rounded-2xl transition-[flex-grow,flex-basis,height] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b76e79] ${
                  isActive
                    ? "lg:flex-[5] h-[70vh] min-h-[480px]"
                    : "lg:flex-[1] h-[88px] lg:h-auto"
                }`}
              >
                {/* Background image */}
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes={isActive ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 15vw"}
                  priority={i === 0}
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />

                {/* Gradient overlay — tuned for active vs inactive */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive
                      ? "bg-gradient-to-t from-black/85 via-black/35 to-black/5"
                      : "bg-black/55 group-hover:bg-black/40"
                  }`}
                />

                {/* Inactive state — compact label */}
                <div
                  className={`absolute inset-0 flex items-center justify-center lg:items-end lg:justify-center lg:pb-10 transition-opacity duration-500 ${
                    isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  {/* Mobile: horizontal label */}
                  <span className="lg:hidden font-clash text-white text-sm tracking-[0.25em] uppercase">
                    {feature.title}
                  </span>
                  {/* Desktop: vertical label */}
                  <span
                    className="hidden lg:inline-block font-clash text-white/95 text-sm tracking-[0.3em] uppercase whitespace-nowrap"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {feature.title}
                  </span>
                </div>

                {/* Active state — full content */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12 text-left transition-opacity duration-700 delay-200 ${
                    isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#b76e79] font-semibold mb-4">
                    0{i + 1} &nbsp;—&nbsp; {String(features.length).padStart(2, "0")}
                  </span>
                  <h3 className="font-clash text-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] mb-5 max-w-2xl">
                    {feature.title}
                  </h3>
                  {/* Luxury accent line under the title */}
                  <span
                    className={`block h-px bg-[#b76e79] mb-6 origin-left transition-transform duration-[900ms] ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{ width: "72px" }}
                  />
                  <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-xl">
                    {feature.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Premium divider line below the accordion */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
      </div>
    </section>
  );
}
