"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PATHS = [
  {
    kicker: "Path A",
    title: "Start from zero",
    lead: "You have an idea, a spec, or a napkin sketch. We take it to production.",
    points: [
      "Discovery and technical architecture",
      "Design and prototyping in the real stack",
      "Frontend, backend, and data built together",
      "Launch, monitoring, and handover",
    ],
    color: "#7c5cff",
    glow: "rgba(124,92,255,0.45)",
    glow2: "rgba(236,72,153,0.28)",
  },
  {
    kicker: "Path B",
    title: "Level up what you have",
    lead: "You already run something. We make it faster, sturdier, and less manual.",
    points: [
      "Codebase and infrastructure audit",
      "Performance, security, and refactors",
      "Automations bolted onto your existing tools",
      "Takeover of stalled or abandoned projects",
    ],
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
    glow2: "rgba(34,211,238,0.3)",
  },
];

export default function Approach() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".approach-head", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
      gsap.from(".approach-panel", {
        opacity: 0,
        y: 50,
        scale: 0.97,
        duration: 1,
        ease: "expo.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".approach-grid", start: "top 80%", once: true },
      });
      gsap.from(".approach-point", {
        opacity: 0,
        x: -14,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: { trigger: ".approach-grid", start: "top 70%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#04080a] px-6 py-28 sm:px-10 sm:py-36"
    >
      <div aria-hidden className="line-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_15%,transparent_70%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(124,92,255,0.22), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <span className="approach-head font-mono text-xs uppercase tracking-[0.3em] text-accent-5">
            Two ways in
          </span>
          <h2 className="approach-head mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            New project or existing one, same engineers.
          </h2>
        </div>

        <div className="approach-grid relative mt-16 grid gap-6 lg:grid-cols-2">
          {PATHS.map((p) => (
            <div
              key={p.title}
              className="approach-panel beam-border rounded-3xl"
              style={{ ["--beam-color" as string]: p.color, ["--beam-speed" as string]: "10s" }}
            >
              <div className="relative h-full overflow-hidden rounded-3xl border border-white/[0.07] bg-[#080c12]/90 p-8 sm:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[120%] -translate-x-1/2 blur-3xl"
                  style={{ background: `radial-gradient(ellipse, ${p.glow}, transparent 70%)` }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 -right-10 h-56 w-56 rounded-full blur-3xl"
                  style={{ background: p.glow2 }}
                />

                <span className="relative font-mono text-xs uppercase tracking-[0.3em]" style={{ color: p.color }}>
                  {p.kicker}
                </span>
                <h3 className="relative mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{p.title}</h3>
                <p className="relative mt-4 max-w-md text-fg/65">{p.lead}</p>

                <ul className="relative mt-8 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="approach-point flex items-start gap-3 text-fg/85">
                      <span
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: p.color, boxShadow: `0 0 10px ${p.color}` }}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="relative mt-10 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-fg"
                  style={{ color: p.color }}
                >
                  {p.kicker === "Path A" ? "Scope a new build" : "Book an audit"}
                  <span aria-hidden>&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
