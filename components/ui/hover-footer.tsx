"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type AlignX = "start" | "middle" | "end";

export const TextHoverEffect = ({
  text,
  className,
  alignX = "middle",
  fontSize = 72,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
  alignX?: AlignX;
  fontSize?: number;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientRef = useRef<SVGRadialGradientElement>(null);
  const rafRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);

  const textX = alignX === "end" ? "98%" : alignX === "start" ? "2%" : "50%";

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || rafRef.current !== null) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const svg = svgRef.current;
      const gradient = gradientRef.current;
      if (!svg || !gradient) return;
      const rect = svg.getBoundingClientRect();
      const cx = `${((clientX - rect.left) / rect.width) * 100}%`;
      const cy = `${((clientY - rect.top) / rect.height) * 100}%`;
      gradient.setAttribute("cx", cx);
      gradient.setAttribute("cy", cy);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      preserveAspectRatio="xMidYMid meet"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ touchAction: "pan-y" }}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#945663" />
              <stop offset="35%" stopColor="#b76e79" />
              <stop offset="65%" stopColor="#d4a3b3" />
              <stop offset="100%" stopColor="#b76e79" />
            </>
          )}
        </linearGradient>

        <radialGradient
          ref={gradientRef}
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="20%"
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="textMask">
          <rect
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      <text
        x={textX}
        y="50%"
        textAnchor={alignX}
        dominantBaseline="middle"
        fontSize={fontSize}
        strokeWidth="0.3"
        className="font-clash fill-transparent stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0, fontWeight: 900 }}
      >
        {text}
      </text>
      <motion.text
        x={textX}
        y="50%"
        textAnchor={alignX}
        dominantBaseline="middle"
        fontSize={fontSize}
        strokeWidth="0.3"
        className="font-clash fill-transparent stroke-[#b76e79]"
        style={{ fontWeight: 900 }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      <text
        x={textX}
        y="50%"
        textAnchor={alignX}
        dominantBaseline="middle"
        fontSize={fontSize}
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="font-clash fill-transparent"
        style={{ fontWeight: 900 }}
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0A0A0B 45%, #b76e7933 100%)",
      }}
    />
  );
};
