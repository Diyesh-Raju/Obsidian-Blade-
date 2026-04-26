"use client";

import Image from "next/image";
import { Play } from "lucide-react";

export default function VideoTestimonial() {
  return (
    <section className="w-full relative bg-zinc-50 py-24 overflow-hidden">

      {/* Background Layer — Faded Image */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full">
          <Image
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200"
            alt=""
            fill
            sizes="60vw"
            className="object-cover opacity-20"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 via-zinc-50/90 to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">

        {/* Left Column — White Card */}
        <div className="bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100 relative">
          <span className="absolute -top-4 -left-2 text-zinc-100 text-9xl font-serif select-none leading-none pointer-events-none" aria-hidden="true">
            &ldquo;
          </span>

          <span className="text-xs uppercase tracking-[0.2em] text-[#b76e79] font-bold mb-4 block relative">
            Testimonial
          </span>

          <h2 className="font-clash text-3xl md:text-5xl text-zinc-900 mb-6 relative">
            What Our Customers Say
          </h2>

          <span className="text-sm text-zinc-600 leading-relaxed block relative">
            Mr. Arthur Pendelton, a happy owner speaking about his experience
            staying at his extravagant property &lsquo;Obsidian Blade
            Residences&rsquo;. When you choose your home, choose wisely.
          </span>
        </div>

        {/* Right Column — Play Button */}
        <div className="flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-28 h-28 rounded-full border border-[#b76e79]/30 animate-ping-slow" aria-hidden="true" />
            <button
              type="button"
              className="relative w-24 h-24 rounded-full border border-[#b76e79] flex items-center justify-center text-[#b76e79] hover:bg-[#b76e79] hover:text-white transition-all duration-500 cursor-pointer group"
              aria-label="Play testimonial video"
            >
              <Play size={28} className="fill-current ml-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
