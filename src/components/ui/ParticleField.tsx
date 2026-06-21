"use client";

import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  opacity: number;
  hue: number;
}

export default function ParticleField({ count = 38 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    const embers: Ember[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * height * 0.5,
      r: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.5 + 0.15,
      drift: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
      hue: Math.random() > 0.5 ? 38 : 16, // gold-ish vs ember-red
    }));

    let raf: number;
    function tick() {
      ctx!.clearRect(0, 0, width, height);
      for (const e of embers) {
        e.y -= e.speed;
        e.x += e.drift;
        if (e.y < -10) {
          e.y = height + 10;
          e.x = Math.random() * width;
        }
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${e.hue}, 75%, 62%, ${e.opacity})`;
        ctx!.shadowColor = `hsla(${e.hue}, 85%, 55%, 0.9)`;
        ctx!.shadowBlur = 6;
        ctx!.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
