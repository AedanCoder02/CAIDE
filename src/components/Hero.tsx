"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.15,
      });

      if (reduced) {
        gsap.set([".hero-eyebrow", ".hero-line", ".hero-sub", ".hero-cta", ".hero-meta"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      tl.from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.6 })
        .from(
          ".hero-line",
          { opacity: 0, y: 46, duration: 0.9, stagger: 0.08 },
          "-=0.3"
        )
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.7 }, "-=0.45")
        .from(
          ".hero-cta",
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 },
          "-=0.4"
        )
        .from(".hero-meta", { opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".hero-scrollcue", { opacity: 0, y: -10, duration: 0.8 }, "-=0.5");

      if (window.innerWidth >= 768) {
        gsap.to(".hero-scrollcue-dot", {
          y: 16,
          duration: 1.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100vh] flex-col justify-between overflow-hidden border-b border-line"
    >
      <div className="absolute inset-0 -z-10">
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/80" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-28 pb-16 sm:px-10 sm:pt-24">
        <p className="hero-eyebrow font-mono text-xs uppercase tracking-[0.3em] text-muted">
          Web &middot; Automations &middot; Backend &middot; Apps
        </p>

        <h1 className="mt-5 max-w-5xl text-[14vw] font-semibold leading-[0.92] tracking-tight sm:text-[8vw] lg:text-[6.2vw]">
          <span className="hero-line block overflow-hidden">
            <span className="block">We build</span>
          </span>
          <span className="hero-line block overflow-hidden text-gradient">
            <span className="block">systems that</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block">ship themselves.</span>
          </span>
        </h1>

        <p className="hero-sub mt-7 max-w-lg text-lg text-muted sm:text-xl">
          CAIDE is a web development studio for teams who want their stack
          designed, automated, and shipped by people who actually write the
          code &mdash; design, backend, apps, and the automations that tie it
          all together.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="hero-cta group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-7 py-3.5 text-sm font-semibold text-bg transition-transform duration-300 hover:scale-[1.03]"
          >
            Start a project
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="#work"
            className="hero-cta inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-fg transition-colors duration-300 hover:border-fg/40"
          >
            See how we work
          </a>
        </div>

        <div className="hero-scrollcue pointer-events-none absolute right-6 bottom-0 hidden flex-col items-center gap-3 sm:right-10 md:flex">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <span className="hero-scrollcue-dot absolute inset-x-0 top-0 h-3 w-px bg-accent-2" />
          </span>
        </div>
      </div>

      <div className="hero-meta mx-auto flex w-full max-w-6xl items-center justify-between border-t border-line px-6 py-5 text-xs text-muted sm:px-10">
        <span>Kryptyk / AP Division</span>
        <span className="hidden sm:inline">Est. 2026</span>
        <span>CAIDE &reg;</span>
      </div>
    </section>
  );
}
