"use client";

import { useEffect, useRef } from "react";

type Props = {
  colors?: string[];
  /** particles per 10,000 px² of canvas area */
  density?: number;
  /** base drift speed in px per frame at 60fps */
  speed?: number;
  /** draw lines between particles closer than this many px; 0 disables */
  link?: number;
  /** general drift direction: "float" wanders, "rise" drifts upward */
  mode?: "float" | "rise";
  size?: [number, number];
  className?: string;
};

type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; t: number; tw: number };

export default function Particles({
  colors = ["#ffffff"],
  density = 0.6,
  speed = 0.15,
  link = 0,
  mode = "float",
  size = [0.6, 1.8],
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorKey = colors.join("|");
  const [sizeMin, sizeMax] = size;

  useEffect(() => {
    const palette = colorKey.split("|");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let parts: P[] = [];
    let raf = 0;
    let visible = false;

    const spawn = (anywhere: boolean): P => {
      const angle = Math.random() * Math.PI * 2;
      const s = speed * (0.4 + Math.random() * 0.8);
      return {
        x: Math.random() * w,
        y: anywhere || mode === "float" ? Math.random() * h : h + 10,
        vx: mode === "rise" ? (Math.random() - 0.5) * s * 0.6 : Math.cos(angle) * s,
        vy: mode === "rise" ? -s * (0.8 + Math.random()) : Math.sin(angle) * s,
        r: sizeMin + Math.random() * (sizeMax - sizeMin),
        c: palette[Math.floor(Math.random() * palette.length)],
        t: Math.random() * Math.PI * 2,
        tw: 0.01 + Math.random() * 0.03,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobile = w < 768 ? 0.5 : 1;
      const count = Math.min(220, Math.round(((w * h) / 10000) * density * mobile));
      parts = Array.from({ length: count }, () => spawn(true));
      if (reduced) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (link > 0) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < parts.length; i++) {
          for (let j = i + 1; j < parts.length; j++) {
            const a = parts[i];
            const b = parts[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < link * link) {
              ctx.globalAlpha = (1 - Math.sqrt(d2) / link) * 0.22;
              ctx.strokeStyle = a.c;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
      for (const p of parts) {
        const alpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(p.t));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = p.r * 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.t += p.tw;
        if (mode === "rise") {
          if (p.y < -10) parts[i] = spawn(false);
        } else {
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) raf = requestAnimationFrame(step);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [colorKey, density, speed, link, mode, sizeMin, sizeMax]);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
