"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const beam = (vars: Record<string, string>) => vars as React.CSSProperties;

export default function Cta() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".cta-reveal", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#05030f] px-6 pt-36 pb-48 text-center sm:px-10 sm:pt-44 sm:pb-56"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span
          className="spot-beam left-[8%]"
          style={beam({ "--spot-color": "rgba(124,92,255,0.6)", "--spot-from": "-18deg", "--spot-to": "10deg", "--spot-speed": "8s" })}
        />
        <span
          className="spot-beam left-1/2 -ml-[17rem]"
          style={beam({ "--spot-color": "rgba(34,211,238,0.45)", "--spot-from": "-8deg", "--spot-to": "8deg", "--spot-speed": "11s" })}
        />
        <span
          className="spot-beam right-[8%]"
          style={beam({ "--spot-color": "rgba(236,72,153,0.5)", "--spot-from": "16deg", "--spot-to": "-12deg", "--spot-speed": "9.5s" })}
        />
        <div className="grid-floor" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#05030f] to-transparent" />
        <div
          className="absolute left-1/2 top-1/2 h-[22rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(124,92,255,0.25), transparent 70%)" }}
        />
      </div>

      <div className="relative">
        <p className="cta-reveal font-mono text-xs uppercase tracking-[0.3em] text-accent-2">
          Let&apos;s build
        </p>
        <h2 className="cta-reveal mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-7xl">
          Tell us what&apos;s slow, manual, or{" "}
          <span className="text-shimmer">missing.</span>
        </h2>
        <p className="cta-reveal mx-auto mt-6 max-w-xl text-lg text-fg/65">
          A new product, an integration, an automation, or a codebase that
          needs rescuing. We&apos;ll scope it and tell you honestly if
          it&apos;s a one-week fix or a real build.
        </p>
        <div className="cta-reveal mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:hello@caide.dev?subject=New%20project"
            className="beam-border inline-flex rounded-full"
            style={beam({ "--beam-color": "#22d3ee", "--beam-speed": "3.5s" })}
          >
            <span className="relative inline-flex items-center gap-2 rounded-full bg-fg px-8 py-4 text-sm font-semibold text-bg shadow-[0_0_50px_rgba(124,92,255,0.5)] transition-transform duration-300 hover:scale-[1.03]">
              hello@caide.dev
              <span aria-hidden>&rarr;</span>
            </span>
          </a>
          <a
            href="mailto:hello@caide.dev?subject=Project%20audit"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-fg backdrop-blur-sm transition-colors hover:border-fg/40"
          >
            Request an audit
          </a>
        </div>
      </div>
    </section>
  );
}
