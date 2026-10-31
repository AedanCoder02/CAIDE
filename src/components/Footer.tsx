"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const COLUMNS = [
  {
    title: "Services",
    links: [
      { href: "#services", label: "Web Development" },
      { href: "#services", label: "Automations" },
      { href: "#services", label: "Backend & APIs" },
      { href: "#services", label: "Integrations" },
      { href: "#services", label: "Audits & Rescues" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "#approach", label: "How we engage" },
      { href: "#process", label: "Process" },
      { href: "#stack", label: "Toolkit" },
      { href: "#contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".footer-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true },
      });
      gsap.from(".footer-word", {
        yPercent: 40,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".footer-word", start: "top 95%", once: true },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-[#030308] px-6 pt-20 sm:px-10">
      <div
        aria-hidden
        className="light-sweep absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        style={{ ["--sweep-color" as string]: "#ec4899" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10rem] left-1/2 h-[24rem] w-[70rem] -translate-x-1/2 blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(124,92,255,0.3), rgba(34,211,238,0.1) 50%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 border-b border-white/[0.08] pb-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="footer-reveal">
            <span className="font-mono text-lg font-semibold tracking-[0.2em]">CAIDE</span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg/55">
              A software engineering studio. New builds, upgrades, automations,
              integrations, and rescues, by the people who write the code.
            </p>
            <a
              href="mailto:hello@caide.dev"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-fg/40"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-5 shadow-[0_0_8px_#10b981]" />
              hello@caide.dev
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="footer-reveal">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fg/40">{col.title}</span>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-fg/70 transition-colors hover:text-fg">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-reveal mt-8 flex flex-col items-center justify-between gap-4 text-xs text-fg/45 sm:flex-row">
          <span>&copy; 2026 CAIDE. Kryptyk / AP Division.</span>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            Back to top
            <span aria-hidden>&uarr;</span>
          </a>
        </div>
      </div>

      <div aria-hidden className="relative mx-auto mt-10 max-w-7xl select-none overflow-hidden">
        <p className="footer-word text-shimmer translate-y-[18%] text-center text-[27vw] font-semibold leading-none tracking-tighter opacity-80 lg:text-[20rem]">
          CAIDE
        </p>
      </div>
    </footer>
  );
}
