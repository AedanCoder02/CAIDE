"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Particles from "./Particles";
import { useT } from "@/i18n/LangProvider";
import LeadForm from "./LeadForm";

gsap.registerPlugin(ScrollTrigger);

const beam = (vars: Record<string, string>) => vars as React.CSSProperties;

// Stage lights: position, cone width, base hue, sway range/speed, hue drift and
// brightness breathing speeds. Each beam runs on its own clock so the rig never
// repeats in lockstep.
const BEAMS = [
  { x: "10%", w: "26rem", h: 262, from: "-22deg", to: "6deg", sway: "9s", hue: "13s", breath: "5s", delay: "-2s" },
  { x: "36%", w: "30rem", h: 318, from: "-14deg", to: "12deg", sway: "11s", hue: "17s", breath: "6.5s", delay: "-1s" },
  { x: "64%", w: "22rem", h: 190, from: "12deg", to: "-10deg", sway: "8s", hue: "15s", breath: "4.2s", delay: "-6s" },
  { x: "90%", w: "28rem", h: 328, from: "18deg", to: "-22deg", sway: "10s", hue: "12s", breath: "5.6s", delay: "-3s" },
];

export default function Cta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const dict = useT();
  const t = dict.cta;
  const lead = dict.lead;

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
          className="absolute left-1/2 top-1/2 h-[30rem] w-[56rem] max-w-full -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(closest-side, rgba(5,3,15,0.85), transparent)" }}
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
        <div className="cta-reveal mt-14">
          <LeadForm />
        </div>
        <p className="cta-reveal mt-8 text-sm text-fg/50">
          {lead.or}{" "}
          <a
            href={`mailto:hello@caide.dev?subject=${encodeURIComponent(t.primarySubject)}`}
            className="font-semibold text-fg/80 underline decoration-white/25 underline-offset-4 transition-colors hover:text-fg hover:decoration-accent-2"
          >
            hello@caide.dev
          </a>
        </p>
      </div>
    </section>
  );
}
