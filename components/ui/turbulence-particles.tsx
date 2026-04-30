"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  offset: number;
  alpha: number;
}

export function TurbulenceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Create particles with depth variation for a layered look
    const particles: Particle[] = [];
    const particleCount = window.matchMedia("(max-width: 768px)").matches ? 50 : 90;
    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random(); // 0 = far, 1 = near
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: depth * 1.8 + 0.3, // Bigger = closer
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
        offset: Math.random() * Math.PI * 2,
        alpha: depth * 0.4 + 0.2, // Closer particles are brighter
      });
    }

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.004;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Turbulence: layered sine/cosine waves for organic floating motion
        const turbulenceX =
          Math.sin(time * 1.2 + p.offset) * 0.4 +
          Math.sin(time * 0.7 + p.offset * 2.3) * 0.2;
        const turbulenceY =
          Math.cos(time * 1.1 + p.offset) * 0.4 +
          Math.cos(time * 0.6 + p.offset * 1.7) * 0.2;

        p.x += p.dx + turbulenceX;
        p.y += p.dy + turbulenceY;

        // Wrap around edges seamlessly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Rose Gold glow with per-particle alpha for depth
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(183, 110, 121, ${p.alpha})`;
        ctx.fill();

        // Subtle glow halo on larger (closer) particles
        if (p.r > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(183, 110, 121, ${p.alpha * 0.15})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none opacity-60"
      aria-hidden="true"
    />
  );
}
