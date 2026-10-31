"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ITEMS = [
  "Web Development",
  "Automations",
  "Backend & APIs",
  "Integrations",
  "App Development",
  "DevOps",
  "New Builds",
  "Upgrades & Rescues",
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(el, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
  }, []);

  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden bg-[#07061a] py-6">
      <div
        aria-hidden
        className="light-sweep absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        style={{ ["--sweep-color" as string]: "#7c5cff" }}
      />
      <div
        aria-hidden
        className="light-sweep absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-2/40 to-transparent"
        style={{ ["--sweep-color" as string]: "#22d3ee" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#07061a] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#07061a] to-transparent" />

      <div ref={trackRef} className="flex w-max items-center gap-10 whitespace-nowrap">
        {[...row, ...row].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-sm uppercase tracking-[0.25em] text-fg/55"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-accent-2 shadow-[0_0_8px_#22d3ee]" />
          </span>
        ))}
      </div>
    </div>
  );
}
