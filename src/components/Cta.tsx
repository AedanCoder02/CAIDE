"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Particles from "./Particles";
import { useT } from "@/i18n/LangProvider";

gsap.registerPlugin(ScrollTrigger);

const beam = (vars: Record<string, string>) => vars as React.CSSProperties;

// Stage lights: position, cone width, base hue, sway range/speed, hue drift and
// brightness breathing speeds. Each beam runs on its own clock so the rig never
// repeats in lockstep.
const BEAMS = [
  { x: "4%", w: "26rem", h: 262, from: "-22deg", to: "6deg", sway: "9s", hue: "13s", breath: "5s", delay: "-2s" },
  { x: "20%", w: "18rem", h: 190, from: "-8deg", to: "16deg", sway: "7s", hue: "11s", breath: "3.6s", delay: "-5s" },
  { x: "38%", w: "30rem", h: 318, from: "-14deg", to: "12deg", sway: "11s", hue: "17s", breath: "6.5s", delay: "-1s" },
  { x: "56%", w: "22rem", h: 275, from: "12deg", to: "-10deg", sway: "8s", hue: "15s", breath: "4.2s", delay: "-6s" },
  { x: "72%", w: "28rem", h: 328, from: "18deg", to: "-14deg", sway: "10s", hue: "12s", breath: "5.6s", delay: "-3s" },
  { x: "88%", w: "20rem", h: 200, from: "6deg", to: "-22deg", sway: "7.5s", hue: "14s", breath: "4.8s", delay: "-7s" },
];

export default function Cta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const t = useT().cta;

  // The rig only animates while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
      data-running={running}
      className="relative overflow-hidden bg-[#05030f] pt-36 pb-48 text-center sm:pt-44 sm:pb-56"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Lighting rig: a truss of lamps across the top. */}
        <div className="stage-truss absolute inset-x-0 top-0 h-px" />
        {BEAMS.map((b, i) => (
          <span
            key={i}
            className="stage-beam"
            style={beam({
              left: b.x,
              "--w": b.w,
              "--h0": String(b.h),
              "--from": b.from,
              "--to": b.to,
              "--sway": b.sway,
              "--hue": b.hue,
              "--breath": b.breath,
              animationDelay: b.delay,
            })}
          >
            <span className="stage-halo" />
            <span className="stage-core" />
            <span className="stage-pool" />
            <span className="stage-lamp" />
          </span>
        ))}
        <span className="stage-laser" />
        <span className="stage-laser stage-laser-b" />
        <div className="grid-floor" />
        <Particles colors={["#ffffff", "#c4b5fd", "#22d3ee", "#f472b6"]} mode="rise" density={0.7} speed={0.45} size={[0.6, 2]} />
        <div className="stage-haze absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#05030f] to-transparent" />
        <div
          className="absolute left-1/2 top-1/2 h-[22rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(5,3,15,0.85), transparent 70%)" }}
        />
      </div>

      <div className="wrap relative">
        <p className="cta-reveal font-mono text-xs uppercase tracking-[0.3em] text-accent-2">
          {t.eyebrow}
        </p>
        <h2 className="cta-reveal mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-7xl">
          {t.h2[0]}{" "}
          <span className="text-shimmer">{t.h2[1]}</span>
        </h2>
        <p className="cta-reveal mx-auto mt-6 max-w-xl text-lg text-fg/65">
          {t.sub}
        </p>
        <div className="cta-reveal mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:hello@caide.dev?subject=${encodeURIComponent(t.primarySubject)}`}
            className="beam-border inline-flex rounded-full"
            style={beam({ "--beam-color": "#22d3ee", "--beam-speed": "3.5s" })}
          >
            <span className="relative inline-flex items-center gap-2 rounded-full bg-fg px-8 py-4 text-sm font-semibold text-bg shadow-[0_0_50px_rgba(124,92,255,0.5)] transition-transform duration-300 hover:scale-[1.03]">
              hello@caide.dev
              <span aria-hidden>&rarr;</span>
            </span>
          </a>
          <a
            href={`mailto:hello@caide.dev?subject=${encodeURIComponent(t.secondarySubject)}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-fg backdrop-blur-sm transition-colors hover:border-fg/40"
          >
            {t.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
