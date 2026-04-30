"use client";

import { useState, useCallback, useRef } from "react";
import { motion, type PanInfo } from "framer-motion";
import Image from "next/image";

export type StackItem = {
  id: number;
  src: string;
  alt: string;
  name: string;
  role: string;
  description: string;
};

export function VerticalImageStack({ items }: { items: StackItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastNavigationTime = useRef(0);
  const navigationCooldown = 400;

  const navigate = useCallback(
    (direction: number) => {
      const now = Date.now();
      if (now - lastNavigationTime.current < navigationCooldown) return;
      lastNavigationTime.current = now;
      setCurrentIndex((prev) => {
        if (direction > 0) return prev === items.length - 1 ? 0 : prev + 1;
        return prev === 0 ? items.length - 1 : prev - 1;
      });
    },
    [items.length]
  );

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.y < -threshold) navigate(1);
    else if (info.offset.y > threshold) navigate(-1);
  };

  const getCardStyle = (index: number) => {
    const total = items.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 };
    if (diff === -1) return { y: -160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: 8 };
    if (diff === -2) return { y: -280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 };
    if (diff === 1) return { y: 160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: -8 };
    if (diff === 2) return { y: 280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 };
    return {
      y: diff > 0 ? 400 : -400,
      scale: 0.6,
      opacity: 0,
      zIndex: 0,
      rotateX: diff > 0 ? -20 : 20,
    };
  };

  const isVisible = (index: number) => {
    const total = items.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return Math.abs(diff) <= 2;
  };

  const current = items[currentIndex];

  return (
    <div className="relative flex h-[760px] md:h-[820px] w-full items-center justify-center overflow-hidden bg-white">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900/[0.02] blur-3xl" />
      </div>

      {/* Side panel — name / role / description for the active person */}
      <div className="hidden md:flex absolute left-12 lg:left-24 top-1/2 -translate-y-1/2 max-w-sm flex-col gap-4 z-10">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#b76e79] font-medium">
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </span>
        <motion.h3
          key={`name-${current.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-clash text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900 leading-[1.1]"
        >
          {current.name}
        </motion.h3>
        <motion.p
          key={`role-${current.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          className="text-[11px] uppercase tracking-[0.25em] text-zinc-500"
        >
          {current.role}
        </motion.p>
        <motion.p
          key={`desc-${current.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-zinc-600 text-sm lg:text-base leading-relaxed font-light mt-2"
        >
          {current.description}
        </motion.p>
      </div>

      {/* Card stack with up/down arrows above and below for navigation */}
      <div
        className="relative flex flex-col items-center justify-center gap-3"
        style={{ perspective: "1200px" }}
      >
        {/* UP ARROW (previous) */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Previous person"
          className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 hover:border-[#b76e79] hover:text-[#b76e79] hover:shadow-[0_0_18px_rgba(183,110,121,0.35)] transition-all duration-300 bg-white/80 backdrop-blur-sm"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>

        <div className="relative flex h-[500px] w-[320px] items-center justify-center">
        {items.map((item, index) => {
          if (!isVisible(index)) return null;
          const style = getCardStyle(index);
          const isCurrent = index === currentIndex;

          return (
            <motion.div
              key={item.id}
              className="absolute cursor-grab active:cursor-grabbing"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
            >
              <div
                className="relative h-[420px] w-[280px] overflow-hidden rounded-3xl bg-zinc-100 ring-1 ring-zinc-200/60"
                style={{
                  boxShadow: isCurrent
                    ? "0 25px 50px -12px rgba(24,24,27,0.18), 0 0 0 1px rgba(24,24,27,0.05)"
                    : "0 10px 30px -10px rgba(24,24,27,0.12)",
                }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-zinc-900/10 via-transparent to-transparent z-10 pointer-events-none" />
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="280px"
                  className="object-cover"
                  draggable={false}
                  priority={isCurrent}
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/60 to-transparent z-10 pointer-events-none" />
              </div>
            </motion.div>
          );
        })}
        </div>

        {/* DOWN ARROW (next) */}
        <button
          onClick={() => navigate(1)}
          aria-label="Next person"
          className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 hover:border-[#b76e79] hover:text-[#b76e79] hover:shadow-[0_0_18px_rgba(183,110,121,0.35)] transition-all duration-300 bg-white/80 backdrop-blur-sm"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Mobile-only side panel — shown below the stack */}
      <div className="md:hidden absolute bottom-20 left-1/2 -translate-x-1/2 max-w-xs flex flex-col items-center text-center gap-2 px-4 z-10">
        <motion.h3
          key={`m-name-${current.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-clash text-2xl font-semibold tracking-tight text-zinc-900"
        >
          {current.name}
        </motion.h3>
        <motion.p
          key={`m-role-${current.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-[10px] uppercase tracking-[0.25em] text-zinc-500"
        >
          {current.role}
        </motion.p>
        <motion.p
          key={`m-desc-${current.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-zinc-600 text-xs leading-relaxed font-light mt-1"
        >
          {current.description}
        </motion.p>
      </div>

      {/* Navigation dots */}
      <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col gap-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => index !== currentIndex && setCurrentIndex(index)}
            className={`w-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "h-6 bg-zinc-900"
                : "h-2 bg-zinc-900/30 hover:bg-zinc-900/50"
            }`}
            aria-label={`Go to person ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
