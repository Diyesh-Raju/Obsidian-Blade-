"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ------------------------------------------------------------------
// Reveal helper — native IntersectionObserver, zero hydration risk
// ------------------------------------------------------------------
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Replay on every re-entry: toggle shown based on intersection state
    // rather than disconnecting after the first reveal.
    const io = new IntersectionObserver(
      ([entry]) => {
        setShown(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-[opacity,transform] ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ------------------------------------------------------------------
// DATA
// ------------------------------------------------------------------
const legacyStats: Array<{
  label: string;
  target: number;
  format: (v: number) => string;
}> = [
  { label: "Established", target: 1995, format: (v) => Math.round(v).toString() },
  { label: "Years of Practice", target: 29, format: (v) => Math.round(v).toString() },
  { label: "Continents Served", target: 4, format: (v) => Math.round(v).toString() },
  { label: "Portfolio Value", target: 2.4, format: (v) => `$${v.toFixed(1)}B` },
];

const atelierStats: Array<{
  label: string;
  target: number;
  format: (v: number) => string;
}> = [
  { label: "Architects", target: 12, format: (v) => Math.round(v).toString() },
  { label: "Engineers", target: 6, format: (v) => Math.round(v).toString() },
  { label: "Curators", target: 4, format: (v) => Math.round(v).toString() },
  { label: "Principals", target: 4, format: (v) => Math.round(v).toString() },
];

const principles = [
  {
    n: "01",
    title: "Restraint Over Ornament",
    body: "Luxury is a discipline, not a decoration. We strip a space to its essential gesture — then obsess over the materials that remain.",
  },
  {
    n: "02",
    title: "Architecture as Legacy",
    body: "A residence should outlive its commissioner. We build for the second and third owner — structures that accrue meaning with time.",
  },
  {
    n: "03",
    title: "Site Is the First Collaborator",
    body: "Before a line is drawn, we spend months in the place. Light, wind, silence — every brief begins with listening to what is already there.",
  },
  {
    n: "04",
    title: "Hospitality-Grade Craft",
    body: "Every joint, every hinge, every shadow gap is engineered to the tolerance of a five-star hotel. Private residences deserve no less.",
  },
];

const leadership = [
  {
    name: "Arjun Mehra",
    role: "Founding Principal",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=900",
  },
  {
    name: "Isabelle Laurent",
    role: "Design Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900",
  },
  {
    name: "Rohan Desai",
    role: "Head of Engineering",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=900",
  },
  {
    name: "Mira Okonkwo",
    role: "Curatorial Lead, Interiors",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=900",
  },
];

const press = [
  "Architectural Digest",
  "Wallpaper*",
  "Dezeen",
  "Monocle",
  "Financial Times — How to Spend It",
  "Robb Report",
  "ELLE Decor",
  "The Plan",
];

// ------------------------------------------------------------------
// PAGE
// ------------------------------------------------------------------
export default function AboutPage() {
  // Legacy stats count-up refs
  const legacyStatsRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // Atelier stats count-up refs
  const atelierStatsRef = useRef<HTMLDivElement>(null);
  const atelierNumberRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      if (!legacyStatsRef.current) return;

      const counter = { v0: 0, v1: 0, v2: 0, v3: 0 };

      const writeValues = () => {
        const vs = [counter.v0, counter.v1, counter.v2, counter.v3];
        numberRefs.current.forEach((el, i) => {
          if (el) el.innerText = legacyStats[i].format(vs[i]);
        });
      };

      writeValues();

      gsap.to(counter, {
        v0: legacyStats[0].target,
        v1: legacyStats[1].target,
        v2: legacyStats[2].target,
        v3: legacyStats[3].target,
        duration: 4,
        ease: "expo.out",
        onUpdate: writeValues,
        scrollTrigger: {
          trigger: legacyStatsRef.current,
          start: "top 85%",
          end: "bottom 15%",
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
    { scope: legacyStatsRef }
  );

  useGSAP(
    () => {
      if (!atelierStatsRef.current) return;

      const counter = { v0: 0, v1: 0, v2: 0, v3: 0 };

      const writeValues = () => {
        const vs = [counter.v0, counter.v1, counter.v2, counter.v3];
        atelierNumberRefs.current.forEach((el, i) => {
          if (el) el.innerText = atelierStats[i].format(vs[i]);
        });
      };

      writeValues();

      gsap.to(counter, {
        v0: atelierStats[0].target,
        v1: atelierStats[1].target,
        v2: atelierStats[2].target,
        v3: atelierStats[3].target,
        duration: 4,
        ease: "expo.out",
        onUpdate: writeValues,
        scrollTrigger: {
          trigger: atelierStatsRef.current,
          start: "top 85%",
          end: "bottom 15%",
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
    { scope: atelierStatsRef }
  );

  return (
    <main className="bg-white text-zinc-900 w-full">

      {/* ============ 1. CINEMATIC HERO ============ */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <Image
          src="/interior.jpg"
          alt="Obsidian Blade interior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />

        <div className="relative z-10 h-full w-full flex flex-col justify-end px-4 sm:px-4 sm:px-6 md:px-16 lg:px-24 pb-16 sm:pb-20 md:pb-28">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#b76e79] font-medium mb-5 sm:mb-8 block">
              Est. MCMXCV &nbsp;—&nbsp; An Atelier of Record
            </span>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="font-clash text-white text-[2.25rem] sm:text-6xl md:text-8xl lg:text-[9rem] xl:text-[10.5rem] font-semibold leading-[1.05] sm:leading-[0.95] md:leading-[0.9] tracking-tight max-w-[18ch]">
              Architecture <br />
              <span
                className="italic font-normal text-[#b76e79]"
                style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}
              >
                as quiet
              </span>{" "}
              as <br /> consequence.
            </h1>
          </Reveal>
          <Reveal delay={350}>
            <p className="mt-6 sm:mt-10 text-white/75 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              Obsidian Blade is a private practice commissioning ultra-luxury residences
              and cultural estates for a global clientele of collectors, industrialists,
              and families of consequence.
            </p>
          </Reveal>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.4em] text-white/50 uppercase">Scroll</span>
          <span className="block w-px h-10 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ============ 2. MANIFESTO ============ */}
      <section className="py-20 sm:py-32 md:py-44 px-4 sm:px-4 sm:px-6 md:px-16 lg:px-24 bg-white relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 sm:gap-16 lg:gap-32">
          <Reveal>
            <div className="lg:sticky lg:top-28 self-start">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#b76e79] font-medium mb-6 block">
                The Manifesto
              </span>
              <h2 className="font-clash text-3xl md:text-4xl font-semibold leading-[1.15] tracking-tight text-zinc-900">
                We do not sell houses. <br />
                We commission <br />
                <span
                  className="italic font-normal text-[#b76e79]"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  signatures in stone.
                </span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-8 text-zinc-600 text-lg md:text-xl leading-[1.75] font-light max-w-[58ch]">
              <p>
                Every residence we deliver begins as a study — of the site, of the family,
                of the hundred small rituals that will one day take place inside its walls.
                We design backwards from the morning light a client will sit in thirty
                years from now, and forwards from the materials that will still read
                honest when that light has faded.
              </p>
              <p>
                The firm was founded in 1995 on a single conviction: that private
                architecture, done properly, is a form of inheritance. Our drawings are
                measured against a horizon longer than our lifetime. Our joinery is
                specified the way a watchmaker specifies an escapement.
              </p>
              <p>
                We take no more than a handful of commissions a year. The rest of our
                time belongs to thinking.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Hairline */}
        <div className="max-w-[1400px] mx-auto mt-32 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
      </section>

      {/* ============ 3. LEGACY STATS STRIP ============ */}
      <section className="relative py-28 md:py-36 px-4 sm:px-6 md:px-16 lg:px-24 bg-zinc-950 text-white overflow-hidden">
        <Image
          src="/exterior.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-zinc-950/55" />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#b76e79] font-medium mb-10 block text-center">
              A Quiet Legacy
            </span>
          </Reveal>

          <div ref={legacyStatsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8">
            {legacyStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <div className="text-center lg:text-left lg:border-l lg:border-white/15 lg:pl-8 first:lg:border-l-0 first:lg:pl-0">
                  <div className="font-clash text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight tabular-nums leading-none">
                    <span
                      ref={(el) => {
                        numberRefs.current[i] = el;
                      }}
                    >
                      {s.format(0)}
                    </span>
                  </div>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.25em] text-white/60">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. GUIDING PRINCIPLES ============ */}
      <section className="py-32 md:py-44 px-4 sm:px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#b76e79] font-medium mb-6 block">
                Four Convictions
              </span>
              <h2 className="font-clash text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.1] tracking-tight">
                The discipline behind every commission.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-16 md:gap-y-24">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={(i % 2) * 100}>
                <div className="group">
                  <div className="flex items-baseline gap-6 mb-6">
                    <span className="font-clash text-[#b76e79] text-sm font-semibold tracking-[0.3em]">
                      {p.n}
                    </span>
                    <span className="flex-1 h-px bg-zinc-200 group-hover:bg-[#b76e79] transition-colors duration-700" />
                  </div>
                  <h3 className="font-clash text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-5 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-zinc-500 text-base md:text-lg leading-relaxed font-light max-w-lg">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. ATELIER / PROCESS ============ */}
      <section className="py-32 md:py-44 px-4 sm:px-6 md:px-16 lg:px-24 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-center">

          <Reveal>
            <div className="relative group aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-zinc-900/20">
              <Image
                src="/exterior.jpg"
                alt="Inside the Obsidian Blade atelier"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/20 via-transparent to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#b76e79] font-medium mb-6 block">
                The Atelier
              </span>
              <h2 className="font-clash text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight mb-8">
                A studio that <br />
                <span
                  className="italic font-normal text-[#b76e79]"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  refuses to scale.
                </span>
              </h2>
              <div className="space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed font-light max-w-xl">
                <p>
                  Our practice is structured around a permanent team of twenty-four —
                  architects, engineers, material scientists, and interior curators who
                  have chosen not to leave.
                </p>
                <p>
                  We do not franchise. We do not sub-license. Every commission is led
                  personally by a founding principal, from first site visit to final
                  inspection. When we hand over keys, we hand over our name along with them.
                </p>
              </div>

              <div
                ref={atelierStatsRef}
                className="mt-12 flex flex-wrap gap-x-10 gap-y-6 text-sm"
              >
                {atelierStats.map((d, i) => (
                  <div key={d.label} className="flex items-baseline gap-3">
                    <span className="font-clash text-2xl font-semibold text-zinc-900 tabular-nums">
                      <span
                        ref={(el) => {
                          atelierNumberRefs.current[i] = el;
                        }}
                      >
                        {d.format(0)}
                      </span>
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                      {d.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 6. LEADERSHIP COLLECTIVE ============ */}
      <section className="py-32 md:py-44 px-4 sm:px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1500px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
              <div className="max-w-2xl">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#b76e79] font-medium mb-6 block">
                  The Principals
                </span>
                <h2 className="font-clash text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.1] tracking-tight">
                  Four voices. <br />
                  <span
                    className="italic font-normal text-[#b76e79]"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    One drawing table.
                  </span>
                </h2>
              </div>
              <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-md font-light">
                Each founding principal carries equal weight on every commission.
                Decisions are made together, or they are not made.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {leadership.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <div className="group cursor-default">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-zinc-100">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center grayscale contrast-[1.05] transition-all duration-[1400ms] ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <div className="mt-6">
                    <h3 className="font-clash text-xl md:text-2xl font-semibold tracking-tight text-zinc-900">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                      {p.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. PRESS MARQUEE ============ */}
      <section className="py-24 md:py-32 bg-zinc-950 text-white overflow-hidden border-y border-zinc-900">
        <Reveal>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 lg:px-24 mb-16 text-center">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#b76e79] font-medium mb-6 block">
              Selected Press
            </span>
            <h2 className="font-clash text-3xl md:text-4xl font-semibold tracking-tight leading-tight max-w-2xl mx-auto">
              Written about, rarely interviewed.
            </h2>
          </div>
        </Reveal>

        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex gap-16 whitespace-nowrap animate-marquee">
            {[...press, ...press].map((name, i) => (
              <span
                key={i}
                className="font-clash text-2xl md:text-4xl font-light tracking-tight text-white/40 hover:text-[#b76e79] transition-colors duration-500"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 8. CLOSING CTA ============ */}
      <section className="relative py-36 md:py-48 px-4 sm:px-6 md:px-16 lg:px-24 bg-white text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#b76e79] font-medium mb-8 block">
              A Private Audience
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-clash text-4xl md:text-6xl lg:text-[4.5rem] font-semibold leading-[1.05] tracking-tight text-zinc-900">
              If our philosophy <br /> resonates,{" "}
              <span
                className="italic font-normal text-[#b76e79]"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                we should meet.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 text-zinc-500 text-lg md:text-xl leading-relaxed font-light max-w-xl mx-auto">
              Initial consultations are conducted personally by a founding principal.
              Discretion is assumed, and guaranteed.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-14">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 group text-xs uppercase tracking-[0.3em] font-semibold text-zinc-900"
              >
                <span className="relative">
                  Request an Audience
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-[#b76e79] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                </span>
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                  ➔
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <Footer />

    </main>
  );
}
