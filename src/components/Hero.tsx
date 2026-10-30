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
        .from(".hero-meta", { opacity: 0, duration: 0.8 }, "-=0.3");
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

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-32 pb-16 sm:px-10">
        <p className="hero-eyebrow font-mono text-xs uppercase tracking-[0.3em] text-muted">
          Web &middot; Automations &middot; Backend &middot; Apps
        </p>

        <h1 className="mt-6 text-[13vw] font-semibold leading-[0.95] tracking-tight sm:text-[8vw] lg:text-[6.4vw]">
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

        <p className="hero-sub mt-8 max-w-xl text-lg text-muted sm:text-xl">
          CAIDE is a web development studio for teams who want their stack
          designed, automated, and shipped by people who actually write the
          code &mdash; design, backend, apps, and the automations that tie it
          all together.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
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
      </div>

      <div className="hero-meta mx-auto flex w-full max-w-6xl items-center justify-between border-t border-line px-6 py-5 text-xs text-muted sm:px-10">
        <span>Kryptyk / AP Division</span>
        <span className="hidden sm:inline">Scroll to explore</span>
        <span>Est. 2026</span>
      </div>
    </section>
  );
}
