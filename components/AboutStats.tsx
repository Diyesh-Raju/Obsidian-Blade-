"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  { target: 29, label: "Years of Excellence" },
  { target: 200, label: "Projects Completed" },
  { target: 180, label: "Mn. Sq. Ft. Delivered" },
  { target: 180, label: "Mn. Sq. Ft. Underway" },
];

export default function AboutStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      if (!triggerRef.current) return;

      const counter = { v0: 0, v1: 0, v2: 0, v3: 0 };

      const writeValues = () => {
        const vs = [counter.v0, counter.v1, counter.v2, counter.v3];
        numberRefs.current.forEach((el, i) => {
          if (el) el.innerText = String(Math.round(vs[i]));
        });
      };

      writeValues();

      gsap.to(counter, {
        v0: stats[0].target,
        v1: stats[1].target,
        v2: stats[2].target,
        v3: stats[3].target,
        duration: 3.5,
        ease: "expo.out",
        onUpdate: writeValues,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "restart reset restart reset",
          onLeave: () => {
            counter.v0 = 0;
            counter.v1 = 0;
            counter.v2 = 0;
            counter.v3 = 0;
            writeValues();
          },
          onLeaveBack: () => {
            counter.v0 = 0;
            counter.v1 = 0;
            counter.v2 = 0;
            counter.v3 = 0;
            writeValues();
          },
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full bg-white text-zinc-900 py-20 sm:py-28 px-4 sm:px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-0">

        {/* ── Left Column ── */}
        <div className="lg:border-r lg:border-zinc-200 lg:pr-20 flex flex-col justify-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#b76e79] font-medium mb-6 block">
            About Obsidian Blade
          </span>

          <h2 className="font-clash text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.2] tracking-tight text-zinc-900 mb-6">
            Defining Luxury Real Estate &amp; Architectural Masterpieces.
          </h2>

          <p className="text-sm sm:text-base text-zinc-500 leading-relaxed mb-10 max-w-lg">
            Obsidian Blade curates timeless, high-end real estate where
            architectural excellence meets uncompromising design. Every project
            is a deliberate composition of form, material, and space — built for
            those who see property not as shelter, but as legacy.
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-900 transition-colors duration-300 hover:text-[#b76e79] group w-fit"
          >
            See Details
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">➔</span>
          </Link>
        </div>

        {/* ── Right Column ── */}
        <div className="lg:pl-20 flex items-center">
          <div ref={triggerRef} className="grid grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-10 sm:gap-y-14 w-full">
            {stats.map((stat, i) => (
              <div key={stat.label}>
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    ref={(el) => {
                      numberRefs.current[i] = el;
                    }}
                    className="font-clash text-4xl sm:text-6xl font-semibold text-zinc-900 tabular-nums"
                  >
                    0
                  </span>
                  <span className="text-2xl sm:text-4xl font-semibold text-[#b76e79]">+</span>
                </div>
                <span className="text-xs sm:text-sm text-zinc-500 tracking-wide block leading-snug">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
