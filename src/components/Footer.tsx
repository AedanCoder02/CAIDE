"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SITEMAP = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".footer-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-bg/85 px-6 pt-20 pb-8 sm:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 border-b border-line pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="footer-reveal">
            <span className="font-mono text-lg font-semibold tracking-[0.2em]">CAIDE</span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              A web development studio for teams who want their stack designed,
              automated, and shipped by people who actually write the code.
            </p>
            <a
              href="mailto:hello@caide.dev"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-fg/40"
            >
              hello@caide.dev
            </a>
          </div>

          <div className="footer-reveal">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Studio
            </span>
            <ul className="mt-5 space-y-3 text-sm">
              {SITEMAP.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-fg/80 transition-colors hover:text-fg">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-reveal">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Studio info
            </span>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li>Kryptyk / AP Division</li>
              <li>Remote &mdash; worldwide</li>
              <li>Est. 2026</li>
            </ul>
          </div>
        </div>

        <div className="footer-reveal mt-8 flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
          <span>&copy; 2026 CAIDE. All rights reserved.</span>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            Back to top
            <span aria-hidden>&uarr;</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
