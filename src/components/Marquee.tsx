"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ITEMS = [
  "Web Design",
  "Automations",
  "Backend Engineering",
  "App Development",
  "Tech Solutions",
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = trackRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const width = el.scrollWidth / 2;
    gsap.to(el, {
      x: -width,
      duration: 26,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-b border-line bg-bg-elevated py-5">
      <div ref={trackRef} className="flex w-max items-center gap-10 whitespace-nowrap">
        {[...row, ...row].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-sm uppercase tracking-[0.25em] text-muted"
          >
            {item}
            <span className="text-accent">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
