"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import Particles from "./Particles";
import SiteLink from "./SiteLink";
import { useT } from "@/i18n/LangProvider";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const BUILD_HREFS = ["#services", "#services", "#services", "#services", "#services"];
const STUDIO_HREFS = ["#work", "#systems", "#industries", "#contact"];

export default function Footer({ home = true }: { home?: boolean }) {
  const footerRef = useRef<HTMLDivElement>(null);
  const t = useT().footer;
  const COLUMNS = [
    { title: t.buildTitle, links: t.build.map((label, i) => ({ href: BUILD_HREFS[i], label })) },
    { title: t.studioTitle, links: t.studio.map((label, i) => ({ href: STUDIO_HREFS[i], label })) },
  ];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".footer-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: footerRef.current, start: "top 85%", once: true },
      });
      // The letters rise out of the dark one by one, revealing the aurora inside.
      gsap.from(".footer-letter", {
        yPercent: 105,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".footer-sky", start: "top bottom", end: "bottom bottom", scrub: 0.8 },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-[#030308] pt-20">
      <div
        aria-hidden
        className="light-sweep absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        style={{ ["--sweep-color" as string]: "#ec4899" }}
      />

      <Particles colors={["#ffffff", "#a78bfa"]} density={0.25} speed={0.06} size={[0.4, 1.2]} />

      <div className="wrap relative z-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="footer-reveal">
            <span className="font-mono text-lg font-semibold tracking-[0.2em]">CAIDE</span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg/70">
              {t.blurb}
            </p>
            <a
              href="mailto:hello@caide.dev"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-fg/40"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-5 shadow-[0_0_8px_#10b981]" />
              hello@caide.dev
            </a>
          </div>

          {COLUMNS.map((col, ci) => (
            <div key={ci} className="footer-reveal">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fg/40">{col.title}</span>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <SiteLink href={link.href} home={home} className="text-fg/70 transition-colors hover:text-fg">
                      {link.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* The CAIDE wordmark as a window onto the hero's aurora: the same sky
          that opens the page closes it, flowing inside the letters. */}
      <div className="relative mt-14">
        <div aria-hidden className="footer-sky relative isolate select-none overflow-hidden [mask-image:linear-gradient(transparent,#000_10%,#000_92%,transparent)]">
          <div className="absolute inset-0">
            <HeroScene vignette={0} />
          </div>
          <p className="relative flex justify-center bg-[#030308] pt-[1.5vw] text-[31vw] font-semibold leading-[0.8] tracking-[-0.055em] text-white mix-blend-multiply">
            {"CAIDE".split("").map((ch, i) => (
              <span key={i} className="footer-letter inline-block">
                <span className="footer-glyph inline-block">{ch}</span>
              </span>
            ))}
          </p>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="wrap relative z-10">
        <div className="footer-reveal flex flex-col items-center justify-between gap-4 py-7 text-xs text-fg/55 sm:flex-row">
          <span>{t.rights}</span>
          <nav aria-label="Legal" className="flex items-center gap-5">
            <SiteLink href="/privacy" className="transition-colors hover:text-fg">{t.privacy}</SiteLink>
            <SiteLink href="/terms" className="transition-colors hover:text-fg">{t.terms}</SiteLink>
            <SiteLink href="/cookies" className="transition-colors hover:text-fg">{t.cookies}</SiteLink>
          </nav>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            {t.top}
            <span aria-hidden>&uarr;</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
