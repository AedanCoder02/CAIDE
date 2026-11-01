"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Particles from "./Particles";
import { useLang } from "@/i18n/LangProvider";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { t: dict, locale } = useLang();
  const t = dict.hero;

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const words = gsap.utils.toArray<HTMLElement>(".hero-niche");
      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.set(words[0], { yPercent: 0, opacity: 1 });
      const cycle = gsap.timeline({ repeat: -1, delay: 2.2 });
      words.forEach((w, i) => {
        const next = words[(i + 1) % words.length];
        cycle
          .to(w, { yPercent: -110, opacity: 0, duration: 0.55, ease: "power3.in" }, i * 2.1)
          .fromTo(next, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: "expo.out" }, i * 2.1 + 0.35);
      });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
      tl.from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.6 })
        .from(".hero-line", { opacity: 0, y: 46, duration: 0.9, stagger: 0.08 }, "-=0.3")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.7 }, "-=0.45")
        .from(".hero-ctas", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
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
    // The niche words change per language, so rebuild the cycle on a switch.
    { scope: rootRef, dependencies: [locale], revertOnUpdate: true }
  );

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden border-b border-line"
    >
      <div className="absolute inset-0 -z-10">
        <HeroScene />
        <Particles colors={["#ffffff", "#a5f3fc", "#c4b5fd"]} density={0.35} speed={0.08} size={[0.4, 1.4]} />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/75 via-bg/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="wrap relative flex flex-1 flex-col justify-center pt-28 pb-16 sm:pt-24">
        <p className="hero-eyebrow inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] sm:text-[11px] sm:tracking-[0.25em] text-fg/80 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-5 shadow-[0_0_10px_#10b981]" />
          {t.eyebrow}<span className="hidden min-[400px]:inline">&nbsp;{t.eyebrowMore}</span>
        </p>

        <h1 className="hero-title mt-6 max-w-5xl text-[10.5vw] font-semibold leading-[0.95] tracking-tight sm:text-[8vw] lg:text-[6.2vw]">
          <span className="hero-line block overflow-hidden">
            <span className="block">
              {t.prefix}
              <span className="grid overflow-hidden align-bottom sm:inline-grid">
                {t.niches.map((n, i) => (
                  <span
                    key={`${locale}-${i}`}
                    className="hero-niche text-shimmer [grid-area:1/1]"
                    aria-hidden={i > 0}
                    style={i > 0 ? { opacity: 0 } : undefined}
                  >
                    {n}
                  </span>
                ))}
              </span>
            </span>
          </span>
          <span className="hero-line block overflow-hidden text-gradient">
            <span className="block">{t.line2}</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block">{t.line3}</span>
          </span>
        </h1>

        <p className="hero-sub mt-7 max-w-xl text-lg text-fg/70 sm:text-xl">
          {t.sub}
        </p>

        <div className="hero-ctas mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-7 py-3.5 text-sm font-semibold text-bg shadow-[0_0_40px_rgba(124,92,255,0.45)] transition-transform duration-300 hover:scale-[1.03]"
          >
            {t.ctaPrimary}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-fg backdrop-blur-sm transition-colors duration-300 hover:border-fg/40"
          >
            {t.ctaSecondary}
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2">
          {t.pillars.map((p) => (
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
            {t.scroll}
          </span>
          <span className="relative h-12 w-px overflow-hidden bg-white/10">
            <span className="hero-scrollcue-dot absolute inset-x-0 top-0 h-4 w-px bg-accent-2 shadow-[0_0_8px_#22d3ee]" />
          </span>
        </div>
      </div>

      <div className="hero-meta wrap flex items-center justify-between border-t border-white/10 py-5 text-xs text-muted">
        <span>Kryptyk / AP Division</span>
        <span className="hidden sm:inline">{t.meta}</span>
        <span>{t.worldwide}</span>
      </div>
    </section>
  );
}
