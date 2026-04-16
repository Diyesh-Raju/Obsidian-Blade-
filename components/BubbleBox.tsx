"use client";

import { useEffect, useRef } from "react";
import { useThemeStore } from "@/lib/theme-store";

export function BubbleBox() {
  const setHoveringBubble = useThemeStore((s) => s.setHoveringBubble);
  const videoRef = useRef<HTMLVideoElement>(null);

  // THE FIX: Safely force the video to play and catch React's interruption error
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Silently ignore the React Strict Mode abort error
      });
    }
  }, []);

  return (
    <section className="w-full flex justify-center py-32 bg-transparent">
      
      <div
        onMouseEnter={() => setHoveringBubble(true)}
        onMouseLeave={() => setHoveringBubble(false)}
        className="w-[90vw] max-w-[500px] bg-zinc-900 border border-white/10 p-10 flex flex-col items-center gap-6 rounded-[30px] relative transition-transform duration-500 hover:scale-[1.02]"
      >
        {/* Removed 'autoPlay' from here, it is now safely handled by the useEffect above */}
        <video
          ref={videoRef}
          src="/commercial-video.mp4"
          muted
          loop
          playsInline
          className="w-full rounded-2xl relative z-10 pointer-events-none"
        />
        <p className="text-white/60 text-sm text-center tracking-[0.2em] font-light uppercase relative z-10 pointer-events-none">
          Hover to enter cinema mode
        </p>
      </div>

    </section>
  );
}