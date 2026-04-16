"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  year: string;
  link: string;
  image: string | string[];
}

const projects: Project[] = [
  {
    title: "Coral Cove",
    description: "Oceanfront luxury with private harbor access.",
    year: "2026",
    link: "#",
    image: "/coral-cove.jpg", 
  },
  {
    title: "Mirage",
    description: "A sprawling, ultra-modern desert oasis estate.",
    year: "2025",
    link: "#",
    image: "/mirage.jpg", 
  },
  {
    title: "Opulent Isles",
    description: "Uncompromised privacy on a sanctuary island.",
    year: "2024",
    link: "#",
    image: "/opulent-isles.jpg", 
  },
  {
    title: "Celestial Escape",
    description: "Automated portrait narrative.",
    year: "2025",
    link: "#",
    image: ["/celestial-wide.jpg", "/celestial-tall.jpg"],
  },
];

export function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastHoveredIndex, setLastHoveredIndex] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [subImageIndex, setSubImageIndex] = useState(0);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  useEffect(() => {
    const hoveredProject = projects[hoveredIndex ?? -1];
    const isMultiImageActive = hoveredProject && Array.isArray(hoveredProject.image);

    if (isMultiImageActive) {
      const totalSubImages = hoveredProject.image.length;
      const intervalId = setInterval(() => {
        setSubImageIndex((prevIndex) => (prevIndex + 1) % totalSubImages);
      }, 3000); 
      return () => clearInterval(intervalId);
    } else {
      setSubImageIndex(0);
    }
  }, [hoveredIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setLastHoveredIndex(index);
    setIsVisible(true);
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  }

  const sharedFaderFaderClasses = "w-full h-full object-cover absolute inset-0 transition-all duration-500 ease-out transform-gpu will-change-[opacity,transform] rounded-[1.5rem]";

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full pt-24 pb-48 overflow-hidden">
      
      {/* BACKGROUND (Preserved exactly as requested) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/showcase-bg.jpg" 
          alt="Luxury Poolside" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-90 h-32" />
      </div>

      {/* --- FOREGROUND CONTENT (Now Pure White Theme) --- */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          {/* Changed header to pure white */}
          <h2 
            className="text-white text-5xl md:text-6xl text-center drop-shadow-md font-normal"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Previous Commissions
          </h2>
        </div>

        <div
          // Changed border to crisp white outline (border-white/50)
          className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/50"
          style={{
            left: containerRef.current?.getBoundingClientRect().left ?? 0,
            top: containerRef.current?.getBoundingClientRect().top ?? 0,
            transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 160}px, 0)`,
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
            transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div
            className="relative rounded-[1.5rem] overflow-hidden shadow-2xl aspect-video w-[350px]"
          >
            {projects.map((project, index) => {
              const isMultiImage = Array.isArray(project.image);
              const mainProjectOpacity = hoveredIndex === index ? 1 : 0;
              const filterScaleStyle = {
                scale: hoveredIndex === index ? 1 : 1.1,
                filter: hoveredIndex === index ? "none" : "blur(10px)",
              };

              if (isMultiImage) {
                return (
                  <React.Fragment key={project.title}>
                    {(project.image as string[]).map((subImage: string, subIndex: number) => {
                      const internalSubOpacity = subIndex === subImageIndex ? 1 : 0;
                      return (
                        <img
                          key={`${project.title}-${subIndex}`}
                          src={subImage as string}
                          alt={`${project.title} - image ${subIndex + 1}`}
                          className={sharedFaderFaderClasses}
                          style={{
                            opacity: mainProjectOpacity * internalSubOpacity,
                            ...filterScaleStyle,
                          }}
                        />
                      );
                    })}
                  </React.Fragment>
                );
              } else {
                return (
                  <img
                    key={project.title}
                    src={project.image as string}
                    alt={project.title}
                    className={sharedFaderFaderClasses}
                    style={{
                      opacity: mainProjectOpacity,
                      ...filterScaleStyle,
                    }}
                  />
                );
              }
            })}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent mix-blend-multiply rounded-[1.5rem]" />
          </div>
        </div>

        <div className="space-y-0 relative z-10">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              className="group block"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Changed list item border to clean white (border-white/30) */}
              <div className="relative py-8 border-t border-white/30 transition-all duration-300 ease-out">
                {/* Changed hover state to a subtle white frost instead of dark gradient */}
                <div
                  className={`
                    absolute inset-0 -mx-4 px-4 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-lg
                    transition-all duration-500 ease-out backdrop-blur-[2px]
                    ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                  `}
                />

                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-3">
                      {/* Title remains white, added slight push effect on hover since color doesn't change */}
                      <h3 className="text-white font-light text-2xl md:text-3xl tracking-tight transition-all duration-300 drop-shadow-sm group-hover:translate-x-1">
                        <span className="relative">
                          {project.title}
                        </span>
                      </h3>

                      {/* Arrow changed to pure white */}
                      <ArrowUpRight
                        className={`
                          w-6 h-6 text-white drop-shadow-sm
                          transition-all duration-500 ease-out
                          ${
                            hoveredIndex === index
                              ? "opacity-100 translate-x-1 translate-y-0"
                              : "opacity-0 -translate-x-4 translate-y-4"
                          }
                        `}
                      />
                    </div>

                    <p
                      className={`
                        text-sm md:text-base mt-2 font-light tracking-wide
                        transition-all duration-300 ease-out
                        ${hoveredIndex === index ? "text-white" : "text-white/70"}
                      `}
                    >
                      {project.description}
                    </p>
                  </div>

                  <span
                    className={`
                      text-sm md:text-base font-light tabular-nums
                      transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "text-white" : "text-white/50"}
                    `}
                  >
                    {project.year}
                  </span>
                </div>
              </div>
            </a>
          ))}
          {/* Final closing border changed to white */}
          <div className="border-t border-white/30" />
        </div>
      </div>
    </section>
  );
}