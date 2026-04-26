"use client";

import React, { useState, useEffect, useRef } from "react";
import { GLSLHills } from "@/components/ui/glsl-hills";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import { useThemeStore } from "@/lib/theme-store";
import WhyObsidianVillas from "@/components/WhyObsidianVillas";
import Footer from "@/components/Footer";

// ----------------------------------------------------------------------
// NATIVE, BULLETPROOF FADE-IN ENGINE
// Replaces the broken external ScrollReveal to guarantee zero scroll-locks
// ----------------------------------------------------------------------
function FadeInSection({ children }: { children: React.ReactNode }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          } else {
            // Optional: Remove this else block if you only want it to animate once
            setVisible(false);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-[opacity,transform] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[60px]"
      }`}
    >
      {children}
    </div>
  );
}
// ----------------------------------------------------------------------

export default function VillasPage() {
  const { isHoveringBubble, setHoveringBubble } = useThemeStore();

  const bedroomSlides = [
    { day: "/bedroom-day.jpg", night: "/bedroom-night.jpg", altTag: "Luxury Villa Bedroom" },
    { day: "/bathroom-day.jpg", night: "/bathroom-night.jpg", altTag: "Luxury Villa En-Suite Bathroom" }
  ];
  const [bedroomIndex, setBedroomIndex] = useState(0);

  const nextBedroom = () => setBedroomIndex((prev) => Math.min(prev + 1, bedroomSlides.length - 1));
  const prevBedroom = () => setBedroomIndex((prev) => Math.max(prev - 1, 0));

  // Clean up on unmount: ensure theme resets if user navigates away while hovering
  useEffect(() => {
    return () => setHoveringBubble(false);
  }, [setHoveringBubble]);

  return (
    <main className="min-h-screen bg-white text-black w-full">
      <div className={`fixed inset-0 bg-[#0a0a0a] transition-opacity duration-[1200ms] ease-in-out pointer-events-none z-40 transform-gpu will-change-opacity ${isHoveringBubble ? "opacity-100" : "opacity-0"}`} />

      {/* 1. GLSL HERO SECTION */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center border-b border-[#b76e79]/20">
        <div className="absolute inset-0 z-0">
          <GLSLHills />
        </div>
        <div className="relative z-10 text-center px-4 pointer-events-none mt-16">
          <h1 className="font-clash font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1]">
            <span className="italic font-light">Designs That Speak</span> <br/>
            <span className="liquid-text">Louder Than Words</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-zinc-600 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed px-2">
            We craft stunning visuals and user-friendly experiences that
            help your brand stand out and connect with your audience.
          </p>
        </div>
      </div>

      {/* 2. CINEMATIC MONTAGE BUBBLE SECTION */}
      <section
        onMouseEnter={() => setHoveringBubble(true)}
        onMouseLeave={() => setHoveringBubble(false)}
        className={`py-32 px-6 md:px-12 relative transition-all duration-1000 ${isHoveringBubble ? "z-50" : "z-10"}`}
      >
        <div
          className={`w-full max-w-[1400px] mx-auto aspect-video rounded-[1.5rem] sm:rounded-[3rem] p-3 sm:p-6 backdrop-blur-xl border border-[#b76e79]/30 transition-all duration-[1200ms] ease-in-out transform-gpu ${isHoveringBubble ? "bg-transparent border-[#b76e79] border-opacity-100 shadow-[0_0_20px_10px_rgba(183,110,121,1),0_0_100px_10px_rgba(183,110,121,0.15)] scale-[1.02]" : "bg-white/50 border-opacity-30 shadow-[0_20px_60px_-15px_rgba(183,110,121,0.15)] hover:shadow-[0_30px_80px_-15px_rgba(183,110,121,0.25)]"}`}
        >
          <div className="w-full h-full rounded-[1rem] sm:rounded-[2rem] bg-zinc-100 overflow-hidden relative border border-white/40">
            <video
              autoPlay loop muted playsInline
              className="w-full h-full object-cover rounded-[2.5rem] pointer-events-none"
              style={{ transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden", perspective: 1000, WebkitTransform: "translate3d(0, 0, 0)", WebkitBackfaceVisibility: "hidden" }}
            >
              <source src="/villa-montage.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#b76e79]/10 via-transparent to-transparent pointer-events-none z-10 mix-blend-multiply" />
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none z-20 rounded-[1rem] sm:rounded-[2rem]" />
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <p className="text-zinc-600 text-lg md:text-xl leading-relaxed font-light">
            Our villa projects represent the apex of architectural mastery and bespoke living. Nestled in the world's most secluded and breathtaking landscapes, these private sanctuaries are engineered to blend seamlessly with nature while offering an uncompromising fortress of luxury.
          </p>
        </div>
      </section>

      {/* 3. EXCLUSIVE AMENITIES SECTION */}
      <FadeInSection>
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white relative z-10">
          <h2
            className="text-[#b76e79] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center mb-10 sm:mb-16 drop-shadow-sm font-normal"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Exclusive Amenities
          </h2>
          <div className="w-full max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { label: "Sous Chef Kitchen", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-4 text-[#b76e79] drop-shadow-sm"><path strokeLinecap="round" strokeLinejoin="round" d="M20 4v10M14 8h12M10 14h20c1.1 0 2 .9 2 2v2H8v-2c0-1.1.9-2 2-2zM8 18h24v2a4 4 0 01-4 4H12a4 4 0 01-4-4v-2zM14 24v4a4 4 0 004 4h4a4 4 0 004-4v-4" /></svg> },
              { label: "4 Bedrooms", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-4 text-[#b76e79] drop-shadow-sm"><path strokeLinecap="round" strokeLinejoin="round" d="M6 28V14a2 2 0 012-2h24a2 2 0 012 2v14M6 22h28M6 28h28M10 22v-4a2 2 0 012-2h4a2 2 0 012 2v4M22 22v-4a2 2 0 012-2h4a2 2 0 012 2v4M8 28v4M32 28v4" /></svg> },
              { label: "Luxury Swimming Pool", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-4 text-[#b76e79] drop-shadow-sm"><path strokeLinecap="round" strokeLinejoin="round" d="M4 26c2 -2 4 -2 6 0s4 2 6 0 4 -2 6 0 4 2 6 0 4 -2 6 0M4 32c2 -2 4 -2 6 0s4 2 6 0 4 -2 6 0 4 2 6 0 4 -2 6 0M14 8v12M26 8v12M14 8c0 -2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4" /></svg> },
              { label: "Spa Wellness Room", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-4 text-[#b76e79] drop-shadow-sm"><path strokeLinecap="round" strokeLinejoin="round" d="M20 4c0 6-6 10-6 16a6 6 0 0012 0c0-6-6-10-6-16zM16 30c-4 2-8 4-8 6h24c0-2-4-4-8-6M20 10c0 3-3 5-3 8a3 3 0 006 0c0-3-3-5-3-8z" /></svg> },
              { label: "2000 Sq Ft Private Backyard", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-4 text-[#b76e79] drop-shadow-sm"><path d="M12 22c0-4.2-1.5-8-3-11" /><path d="M7 22h10" /><path d="M9 11c-2.5-1.5-5.5-1.5-5.5-1.5s2.5 3 5.5 2.5" /><path d="M9 11c-1.5-3-2-6-2-6s2 2.5 3.5 5" /><path d="M9 11c1-3 3-5.5 3-5.5s-1.5 3-2 5.5" /><path d="M9 11c2.5-1 6-1 6-1s-3 2.5-5 2.5" /><path d="M9 11c2 1.5 4 4 4 4s-2-2.5-4-3.5" /></svg> },
              { label: "2× 2 Car Garage", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-4 text-[#b76e79] drop-shadow-sm"><path strokeLinecap="round" strokeLinejoin="round" d="M4 20l16-12 16 12M6 20v14h28V20M10 28h8v6h-8zM22 28h8v6h-8zM10 28v-4h8v4M22 28v-4h8v4" /><circle cx="14" cy="30" r="1" /><circle cx="26" cy="30" r="1" /></svg> },
              { label: "Club House", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-4 text-[#b76e79] drop-shadow-sm"><path strokeLinecap="round" strokeLinejoin="round" d="M4 36h32M6 36V18L20 6l14 12v18M14 36v-10h12v10M16 22h8M20 18v8M2 18h4M34 18h4M10 10l-2-2M30 10l2-2" /></svg> },
              { label: "Outside Barbeque", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-4 text-[#b76e79] drop-shadow-sm"><path d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8" /><path d="M4 12h16c0 4.418-3.582 8-8 8s-8-3.582-8-8z" /><path d="M9 20l-2 4" /><path d="M15 20l2 4" /><path d="M10 4h4" /><line x1="3" y1="12" x2="21" y2="12" /></svg> }
            ].map((amenity, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-[#b76e79]/30 bg-white shadow-sm transition-colors duration-500 hover:border-[#b76e79] hover:shadow-[0_0_30px_rgba(183,110,121,0.1)]">
                {amenity.icon}
                <span className="text-zinc-600 text-sm md:text-base font-light tracking-wide">{amenity.label}</span>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* 4. ARCHITECT'S DRAFT BLUEPRINTS SECTION */}
      <FadeInSection>
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white relative z-10 border-t border-[#b76e79]/15">
          <h2 className="text-[#b76e79] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center mb-10 sm:mb-16 drop-shadow-sm font-normal" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Architect's Draft
          </h2>
          <div className="relative group w-full max-w-[1200px] mx-auto aspect-video transition-all duration-1000 ease-out rotate-3 group-hover:rotate-0 transform-gpu will-change-transform">
            <div className="absolute -inset-2 md:-inset-4 bg-[#b76e79] rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 ease-out z-0 transform-gpu will-change-opacity"></div>
            <div className="relative w-full h-full overflow-hidden rounded-[1rem] sm:rounded-[2rem] border-[3px] border-[#b76e79]/40 group-hover:border-[#b76e79] transition-colors duration-1000 bg-white shadow-2xl transform-gpu">
              
              {/* FIXED WRAPPER: 180 Flip (rotate-90) & Perfect Fit */}
              <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 rotate-90 flex items-center justify-center pointer-events-none">
                <img 
                  src="/tropical-villa-floor-plan.jpg" 
                  alt="Tropical Villa Floor Plan Blueprint"
                  className="w-full h-full object-contain p-4 md:p-8 transform-gpu"
                />
              </div>

              <div className="absolute inset-0 bg-[#fdfcf3] opacity-5 mix-blend-multiply pointer-events-none z-10" />
              <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none z-20 rounded-[1rem] sm:rounded-[2rem]" />
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 5. BEDROOMS SECTION */}
      <FadeInSection>
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative z-10 bg-white border-t border-[#b76e79]/15">
          <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-16 md:gap-24 items-center">
            <div className="relative flex items-center w-full">
              {bedroomIndex > 0 && (
                <button onClick={prevBedroom} className="absolute -left-10 md:-left-16 z-40 p-2 text-zinc-300 hover:text-[#b76e79] transition-colors duration-300 transform -translate-y-1/2 top-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
              )}
              <div className="relative group w-full aspect-[5/4]">
                <div className="absolute -inset-2 md:-inset-4 bg-[#b76e79] rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 ease-out z-0 transform-gpu will-change-opacity"></div>
                <div className="relative w-full h-full overflow-hidden rounded-[1rem] sm:rounded-[2rem] border-[3px] border-[#b76e79]/40 group-hover:border-[#b76e79] transition-colors duration-1000 z-10 bg-white shadow-xl">
                  <img key={`day-${bedroomIndex}`} src={bedroomSlides[bedroomIndex].day} alt="Bedroom Day" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 animate-in fade-in duration-700 transform-gpu will-change-transform" />
                  <img key={`night-${bedroomIndex}`} src={bedroomSlides[bedroomIndex].night} alt="Bedroom Night" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-1000 ease-out transform scale-105 transform-gpu will-change-[opacity,transform]" />
                </div>
              </div>
              {bedroomIndex < bedroomSlides.length - 1 && (
                <button onClick={nextBedroom} className="absolute -right-10 md:-right-16 z-40 p-2 text-zinc-300 hover:text-[#b76e79] transition-colors duration-300 transform -translate-y-1/2 top-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              )}
            </div>
            <div className="text-left">
              <h2 className="text-[#b76e79] text-xs uppercase tracking-[0.3em] font-bold mb-6">Bedrooms & Sanctuaries</h2>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-light mb-6">Our villa bedrooms are sanctuary-like havens, engineered for seamless atmospheric transitions and absolute acoustic tranquility.</p>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-light">As evening falls, the ambiance melts into a state of sophisticated repose, casting a warm glow that highlights the rich textures of raw silk walls and brushed rose-gold hardware.</p>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 6. EXTERIOR SECTION */}
      <FadeInSection>
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative z-10 bg-white border-t border-[#b76e79]/15">
          <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24 items-center">
            <div className="text-left order-2 md:order-1">
              <h2 className="text-[#b76e79] text-xs uppercase tracking-[0.3em] font-bold mb-6">Exterior & Landscapes</h2>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-light mb-6">Our villa's outdoor spaces are private sanctuaries, engineered for seamless connection to the natural world and absolute atmospheric control.</p>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-light">As twilight descends, the exterior transforms into a state of sophisticated repose. Curated warm uplighting activates, highlighting the lush gardens.</p>
            </div>
            <div className="relative group w-full aspect-[5/4] order-1 md:order-2">
              <div className="absolute -inset-2 md:-inset-4 bg-[#b76e79] rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 ease-out z-0 transform-gpu will-change-opacity"></div>
              <div className="relative w-full h-full overflow-hidden rounded-[1rem] sm:rounded-[2rem] border-[3px] border-[#b76e79]/40 group-hover:border-[#b76e79] transition-colors duration-1000 z-10 bg-white shadow-xl">
                <img src="/outdoor-day.jpg" alt="Exterior Day" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 transform-gpu will-change-transform" />
                <img src="/outdoor-night.jpg" alt="Exterior Night" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-1000 ease-out transform scale-105 transform-gpu will-change-[opacity,transform]" />
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 7. SPA SECTION */}
      <FadeInSection>
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative z-10 bg-white border-t border-[#b76e79]/15">
          <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-16 md:gap-24 items-center">
            <div className="relative group w-full aspect-[5/4]">
              <div className="absolute -inset-2 md:-inset-4 bg-[#b76e79] rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 ease-out z-0 transform-gpu will-change-opacity"></div>
              <div className="relative w-full h-full overflow-hidden rounded-[1rem] sm:rounded-[2rem] border-[3px] border-[#b76e79]/40 group-hover:border-[#b76e79] transition-colors duration-1000 z-10 bg-white shadow-xl">
                <img src="/spa-day.jpg" alt="Spa Day" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 transform-gpu will-change-transform" />
                <img src="/spa-night.jpg" alt="Spa Night" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-1000 ease-out transform scale-105 transform-gpu will-change-[opacity,transform]" />
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-[#b76e79] text-xs uppercase tracking-[0.3em] font-bold mb-6">Wellness Sanctuaries</h2>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-light mb-6">Our villa estates feature bespoke wellness pavilions designed to rival the world's most exclusive spas, surrounded by rich cedar woodwork.</p>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-light">Every element is meticulously crafted for holistic rejuvenation, offering an uninterrupted escape from the outside world.</p>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 8. GARAGE SECTION */}
      <FadeInSection>
        <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative z-10 bg-white border-t border-[#b76e79]/15">
          <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24 items-center">
            <div className="text-left order-2 md:order-1">
              <h2 className="text-[#b76e79] text-xs uppercase tracking-[0.3em] font-bold mb-6">Curated Collector Showcase</h2>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-light mb-6">The villa's entry sequence is engineered as a private showcase for a discerning vehicle collection, harmonizing the modern architecture.</p>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed font-light">Twilight descends, turning the driveway and garage entrance into an architectural display of private, secluded luxury and impeccable design.</p>
            </div>
            <div className="relative group w-full aspect-[5/4] order-1 md:order-2">
              <div className="absolute -inset-2 md:-inset-4 bg-[#b76e79] rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 ease-out z-0 transform-gpu will-change-opacity"></div>
              <div className="relative w-full h-full overflow-hidden rounded-[1rem] sm:rounded-[2rem] border-[3px] border-[#b76e79]/40 group-hover:border-[#b76e79] transition-colors duration-1000 bg-white shadow-2xl transform-gpu">
                <img src="/garage-day.jpg" alt="Garage Day" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 transform-gpu will-change-transform" />
                <img src="/garage-night.jpg" alt="Garage Night" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-1000 ease-out transform scale-105 transform-gpu will-change-[opacity,transform]" />
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 9. PROJECT SHOWCASE COMPONENT */}
      <FadeInSection>
        <div className="bg-white relative z-10 border-t border-[#b76e79]/15">
          <ProjectShowcase />
        </div>
      </FadeInSection>

      {/* 10. WHY OBSIDIAN BLADE VILLAS — Interactive Accordion */}
      <WhyObsidianVillas />

      {/* FOOTER */}
      <Footer />

    </main>
  );
}