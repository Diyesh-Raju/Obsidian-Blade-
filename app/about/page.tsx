import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 pt-32 px-8 md:px-24">
      <div className="max-w-4xl">
        <h2 className="text-xs uppercase tracking-[0.3em] text-boxrose mb-6">
          Our Philosophy
        </h2>
        <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">
          About Obsidian Blade
        </h1>
        <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl">
          Forging the skyline of tomorrow. We are a collective of visionary architects,
          engineers, and developers dedicated to creating spaces that transcend time.
        </p>
      </div>

      <div className="mt-24 h-96 w-full bg-zinc-50 flex flex-col items-center justify-center border border-rosegold/20">
        <span className="text-zinc-500 text-xs tracking-widest uppercase mb-4">Leadership & Visionary Board</span>
        <span className="text-zinc-500 text-[10px] uppercase tracking-widest">Module Coming Soon</span>
      </div>
    </main>
  );
}
