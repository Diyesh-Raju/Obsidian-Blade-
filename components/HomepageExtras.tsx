"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import VideoTestimonial from "./VideoTestimonial";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const testimonials = [
  { quote: "The architectural precision is unmatched. Obsidian Blade delivered our commercial headquarters ahead of schedule.", author: "Elena Rostova", title: "CEO, Vertex Financial" },
  { quote: "Our coastal residence is a masterpiece of light and glass. A truly seamless and professional development process.", author: "Marcus Vance", title: "Private Investor" },
  { quote: "They redefine luxury living. The attention to structural detail and environmental integration is phenomenal.", author: "Dr. Aris Thorne", title: "Global Portfolio Manager" },
];

const faqs = [
  { question: "What is your typical project timeline?", answer: "Project timelines vary by scale. Luxury residences typically require 14-18 months, while commercial towers scale from 24-36 months." },
  { question: "Do you handle international investments?", answer: "Yes. Our NRI and International Investor division handles end-to-end legal, financial, and architectural consulting for global clients." },
  { question: "Are your developments sustainable?", answer: "Sustainability is core to our architecture. We utilize smart-glass, passive cooling, and LEED-certified materials across all portfolios." },
];

export default function HomepageExtras() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useGSAP(
    () => {
      const sections = containerRef.current?.querySelectorAll<HTMLElement>(".reveal-section");
      if (!sections) return;

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 85%" },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full bg-white text-zinc-900">

      {/* TESTIMONIALS */}
      <section className="reveal-section py-20 sm:py-32 px-4 sm:px-8 md:px-24 bg-zinc-50 border-t border-rosegold/20">
        <h2 className="text-xs uppercase tracking-[0.3em] text-boxrose mb-16 text-center">Client Trust</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] bg-white/40 backdrop-blur-xl shadow-xl shadow-rosegold/5 transition-transform duration-500 hover:-translate-y-2"
              style={{
                border: "1px solid transparent",
                background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #b76e79, #a47774) border-box",
                borderRadius: "2.5rem",
              }}
            >
              <span className="text-base sm:text-lg font-light leading-relaxed text-zinc-700 mb-6 sm:mb-8 block">&ldquo;{t.quote}&rdquo;</span>
              <div>
                <span className="font-medium text-sm block">{t.author}</span>
                <span className="text-xs text-zinc-500 mt-1 block">{t.title}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* VIDEO TESTIMONIAL */}
      <VideoTestimonial />

      {/* FAQ ACCORDION */}
      <section className="reveal-section py-20 sm:py-32 px-4 sm:px-8 md:px-24 max-w-4xl mx-auto">
        <h2 className="text-xs uppercase tracking-[0.3em] text-boxrose mb-12 text-center">Frequently Asked Questions</h2>
        <div className="border-t border-rosegold/20">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-rosegold/20 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none touch-manipulation cursor-pointer"
              >
                <span className={`text-base sm:text-lg pr-4 transition-colors duration-300 ${openFaq === i ? "text-[#b76e79]" : "text-zinc-600"}`}>
                  {faq.question}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-500 ease-in-out text-[#b76e79] flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`}
                >
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`grid transition-all duration-500 ease-in-out ${openFaq === i ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                <span className="text-zinc-500 text-sm sm:text-base leading-relaxed pr-4 sm:pr-12 block">{faq.answer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="reveal-section py-20 sm:py-32 px-4 sm:px-8 md:px-24 bg-zinc-50 border-t border-[#b76e79]/15 text-zinc-900 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight mb-5 sm:mb-6 leading-tight">Ready to initiate your next project?</h2>
          <p className="text-zinc-500 mb-8 sm:mb-10 text-base sm:text-lg">Connect with our architectural advisory board to discuss your portfolio requirements.</p>
          <a href="/contact" className="inline-block glass-button rounded-full px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold">
            Schedule a Consultation
          </a>
        </div>
      </section>

    </div>
  );
}
