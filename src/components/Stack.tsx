"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Particles from "./Particles";

gsap.registerPlugin(ScrollTrigger);

const ROW_A = [
  { name: "Restaurants", c: "#f59e0b" },
  { name: "Dental & medical clinics", c: "#22d3ee" },
  { name: "Hotels & guesthouses", c: "#ec4899" },
  { name: "Spas & wellness", c: "#10b981" },
  { name: "Hair & beauty salons", c: "#f9a8d4" },
  { name: "Bars & cafés", c: "#f59e0b" },
  { name: "Car workshops", c: "#3b82f6" },
  { name: "Gyms & studios", c: "#7c5cff" },
  { name: "Shops & boutiques", c: "#ec4899" },
  { name: "Real estate", c: "#22d3ee" },
];

const ROW_B = [
  { name: "Online menus", c: "#f59e0b" },
  { name: "Table reservations", c: "#ec4899" },
  { name: "Appointment booking", c: "#22d3ee" },
  { name: "Room booking", c: "#7c5cff" },
  { name: "WhatsApp assistants", c: "#10b981" },
  { name: "Instagram auto-replies", c: "#f9a8d4" },
  { name: "Loyalty apps", c: "#f59e0b" },
  { name: "Online payments", c: "#7c5cff" },
  { name: "Review requests", c: "#10b981" },
  { name: "Automatic invoices", c: "#3b82f6" },
];

function Chip({ name, c }: { name: string; c: string }) {
  return (
    <span
      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-fg/85 backdrop-blur-sm"
      style={{ boxShadow: `inset 0 0 20px ${c}12` }}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: c, boxShadow: `0 0 10px ${c}` }} />
      {name}
    </span>
  );
}

const CATEGORIES = [
  { label: "01 · You tell us", value: "Your business, your customers, and what you picture online. No tech talk needed." },
  { label: "02 · We design it", value: "In your existing brand, or a new identity we create with you. You approve it first." },
  { label: "03 · We build & launch", value: "Built and tested on real phones, then set live, connected to the tools you already use." },
  { label: "04 · We keep it running", value: "Changes, updates, and support when you need them, so it keeps working for you." },
];

export default function Stack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".stack-row-a", { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
      gsap.fromTo(".stack-row-b", { xPercent: -50 }, { xPercent: 0, duration: 46, ease: "none", repeat: -1 });
      gsap.from(".stack-cat", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".stack-cats", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0d0614] py-28 sm:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(236,72,153,0.2), rgba(245,158,11,0.08) 45%, transparent 70%)" }}
      />
      <Particles colors={["#ec4899", "#f59e0b", "#f9a8d4"]} density={0.45} speed={0.14} link={110} size={[0.5, 1.7]} />
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_65%)]" />

      <div className="wrap relative">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-3">Industries</span>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Whatever you run, <span className="text-shimmer">we build for it.</span>
        </h2>
      </div>

      <div className="relative mt-14 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="stack-row-a flex w-max gap-4">
          {[...ROW_A, ...ROW_A, ...ROW_A, ...ROW_A].map((t, i) => (
            <Chip key={`a-${i}`} {...t} />
          ))}
        </div>
        <div className="stack-row-b flex w-max gap-4">
          {[...ROW_B, ...ROW_B, ...ROW_B, ...ROW_B].map((t, i) => (
            <Chip key={`b-${i}`} {...t} />
          ))}
        </div>
      </div>

      <div className="wrap relative mt-16">
        <div className="stack-cats grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <div key={c.label} className="stack-cat bg-[#0d0614] p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-4">{c.label}</span>
              <p className="mt-3 text-sm text-fg/70">{c.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-fg/40">
          Under the hood: the same modern tools trusted by global brands, chosen for speed, security, and easy updates,
          so you never have to think about them.
        </p>
      </div>
    </section>
  );
}
