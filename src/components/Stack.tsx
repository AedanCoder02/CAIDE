"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ROW_A = [
  { name: "Next.js", c: "#f3f3f7" },
  { name: "React", c: "#22d3ee" },
  { name: "TypeScript", c: "#3b82f6" },
  { name: "Tailwind", c: "#22d3ee" },
  { name: "GSAP", c: "#10b981" },
  { name: "Three.js", c: "#f3f3f7" },
  { name: "Shopify", c: "#10b981" },
  { name: "React Native", c: "#22d3ee" },
];

const ROW_B = [
  { name: "Node.js", c: "#10b981" },
  { name: "PostgreSQL", c: "#3b82f6" },
  { name: "n8n", c: "#ec4899" },
  { name: "Telegram Bots", c: "#22d3ee" },
  { name: "Stripe", c: "#7c5cff" },
  { name: "LLM APIs", c: "#f59e0b" },
  { name: "Vercel", c: "#f3f3f7" },
  { name: "Railway", c: "#7c5cff" },
  { name: "Docker", c: "#3b82f6" },
  { name: "GitHub Actions", c: "#f3f3f7" },
];

function Chip({ name, c }: { name: string; c: string }) {
  return (
    <span
      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-fg/85 backdrop-blur-sm"
      style={{ boxShadow: `inset 0 0 20px ${c}12` }}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: c, boxShadow: `0 0 10px ${c}` }} />
      {name}
    </span>
  );
}

const CATEGORIES = [
  { label: "Frontend", value: "Next.js, React, TypeScript, motion" },
  { label: "Backend", value: "Node, Postgres, REST, auth, queues" },
  { label: "Automation", value: "n8n, bots, webhooks, schedulers" },
  { label: "Infra", value: "Vercel, Railway, Docker, CI/CD" },
];

export default function Stack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".stack-row-a", { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
      gsap.fromTo(".stack-row-b", { xPercent: -50 }, { xPercent: 0, duration: 46, ease: "none", repeat: -1 });
      gsap.from(".stack-cat", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".stack-cats", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0d0614] py-28 sm:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(236,72,153,0.2), rgba(245,158,11,0.08) 45%, transparent 70%)" }}
      />
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-3">Toolkit</span>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Modern tools, chosen for the job.
        </h2>
      </div>

      <div className="relative mt-14 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="stack-row-a flex w-max gap-4">
          {[...ROW_A, ...ROW_A, ...ROW_A, ...ROW_A].map((t, i) => (
            <Chip key={`a-${i}`} {...t} />
          ))}
        </div>
        <div className="stack-row-b flex w-max gap-4">
          {[...ROW_B, ...ROW_B, ...ROW_B, ...ROW_B].map((t, i) => (
            <Chip key={`b-${i}`} {...t} />
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl px-6 sm:px-10">
        <div className="stack-cats grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <div key={c.label} className="stack-cat bg-[#0d0614] p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-4">{c.label}</span>
              <p className="mt-3 text-sm text-fg/70">{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
