"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const PILLARS = ["Web", "Automations", "Backend", "Integrations", "Apps"];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
      tl.from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.6 })
        .from(".hero-line", { opacity: 0, y: 46, duration: 0.9, stagger: 0.08 }, "-=0.3")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.7 }, "-=0.45")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 }, "-=0.4")
        .from(".hero-pill", { opacity: 0, y: 10, duration: 0.5, stagger: 0.05 }, "-=0.4")
        .from(".hero-meta", { opacity: 0, duration: 0.8 }, "-=0.3");

      gsap.to(".hero-scrollcue-dot", {
        y: 28,
        duration: 1.3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden border-b border-line"
    >
      <div className="absolute inset-0 -z-10">
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/75 via-bg/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-28 pb-16 sm:px-10 sm:pt-24">
        <p className="hero-eyebrow inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-fg/80 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-5 shadow-[0_0_10px_#10b981]" />
          Software engineering studio
        </p>

        <h1 className="mt-6 max-w-5xl text-[13vw] font-semibold leading-[0.92] tracking-tight sm:text-[8vw] lg:text-[6.2vw]">
          <span className="hero-line block overflow-hidden">
            <span className="block">We engineer</span>
          </span>
          <span className="hero-line block overflow-hidden text-gradient">
            <span className="block">the whole stack.</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block">You ship.</span>
          </span>
        </h1>

        <p className="hero-sub mt-7 max-w-xl text-lg text-fg/70 sm:text-xl">
          New products from zero, or the system you already run made faster,
          cleaner, and automated. Web, backend, integrations, apps, and the
          automations that tie them together.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="hero-cta group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-7 py-3.5 text-sm font-semibold text-bg shadow-[0_0_40px_rgba(124,92,255,0.45)] transition-transform duration-300 hover:scale-[1.03]"
          >
            Start a project
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="#approach"
            className="hero-cta inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-fg backdrop-blur-sm transition-colors duration-300 hover:border-fg/40"
          >
            Improve an existing project
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2">
          {PILLARS.map((p) => (
            <li
              key={p}
              className="hero-pill rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-fg/60"
            >
              {p}
            </li>
          ))}
        </ul>

        <div className="pointer-events-none absolute right-6 bottom-6 hidden flex-col items-center gap-3 sm:right-10 md:flex">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="relative h-12 w-px overflow-hidden bg-white/10">
            <span className="hero-scrollcue-dot absolute inset-x-0 top-0 h-4 w-px bg-accent-2 shadow-[0_0_8px_#22d3ee]" />
          </span>
        </div>
      </div>

      <div className="hero-meta mx-auto flex w-full max-w-6xl items-center justify-between border-t border-white/10 px-6 py-5 text-xs text-muted sm:px-10">
        <span>Kryptyk / AP Division</span>
        <span className="hidden sm:inline">New builds &middot; Upgrades &middot; Rescues</span>
        <span>Est. 2026</span>
      </div>
    </section>
  );
}
