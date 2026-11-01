"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Particles from "./Particles";
import SiteLink from "./SiteLink";
import { useT } from "@/i18n/LangProvider";

gsap.registerPlugin(ScrollTrigger);

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
      const footer = footerRef.current;
      if (!footer) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Spotlight that lights up the wordmark: follows the pointer, and
      // drifts on its own when the pointer is elsewhere (or on touch screens).
      const spot = { x: 25, y: 78 };
      const word = footer.querySelector<HTMLElement>(".footer-word");
      const letters = gsap.utils.toArray<HTMLElement>(".footer-letter", footer);
      const apply = () => {
        footer.style.setProperty("--mx", `${spot.x}%`);
        if (!word) return;
        // Spotlight position in each letter's own box (layout offsets ignore the rise transform).
        const x = (spot.x / 100) * footer.clientWidth - word.offsetLeft;
        const y = (spot.y / 100) * footer.clientHeight - (word.offsetParent as HTMLElement).offsetTop - word.offsetTop;
        letters.forEach((l) => {
          l.style.setProperty("--lx", `${x - l.offsetLeft}px`);
          l.style.setProperty("--ly", `${y - l.offsetTop}px`);
        });
      };
      apply();
      const drift = reduced
        ? null
        : gsap
            .timeline({ repeat: -1, yoyo: true, onUpdate: apply })
            .to(spot, { x: 78, y: 70, duration: 5, ease: "sine.inOut" })
            .to(spot, { x: 50, y: 88, duration: 4, ease: "sine.inOut" });
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        drift?.pause();
        const r = footer.getBoundingClientRect();
        gsap.to(spot, {
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
          onUpdate: apply,
        });
      };
      const onLeave = () => drift?.resume();
      footer.addEventListener("pointermove", onMove);
      footer.addEventListener("pointerleave", onLeave);

      if (!reduced) {
        gsap.from(".footer-reveal", {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: footer, start: "top 85%", once: true },
        });
        // Letters rise out of the floor one by one as the footer scrolls in.
        gsap.from(".footer-letter", {
          yPercent: 70,
          rotateX: -60,
          opacity: 0,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: footer, start: "top 90%", end: "bottom bottom", scrub: 0.8 },
        });
      }

      return () => {
        footer.removeEventListener("pointermove", onMove);
        footer.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative flex min-h-[calc(25.7vw+16rem)] flex-col overflow-hidden bg-[#030308] pt-20 lg:min-h-[calc(25.7vw+10rem)]">
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

      <Particles colors={["#ffffff", "#a78bfa"]} density={0.25} speed={0.06} size={[0.4, 1.2]} />

      {/* The wordmark is the floor of the footer: the content sits on top of it. */}
      <div aria-hidden className="footer-stage pointer-events-none absolute inset-x-0 bottom-0 select-none">
        <div className="footer-aura absolute inset-x-[10%] bottom-[8%] h-[60%] rounded-[50%] blur-3xl" />
        <p className="footer-word relative flex justify-center text-[33vw] font-semibold leading-[0.78] tracking-[-0.06em] [perspective:900px]">
          {"CAIDE".split("").map((ch, i) => (
            <span key={i} className="footer-letter relative inline-block origin-bottom">
              <span className="footer-letter-outline">{ch}</span>
              <span className="footer-letter-fill absolute inset-y-0 -left-[0.12em] -right-[0.12em] px-[0.12em]">{ch}</span>
              <span className="footer-letter-lit absolute inset-y-0 -left-[0.12em] -right-[0.12em] px-[0.12em]">{ch}</span>
            </span>
          ))}
        </p>
        <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#030308] to-transparent" />
      </div>

      <div className="wrap relative z-10 flex flex-1 flex-col">
        <div className="footer-content mt-auto grid gap-12 border-b border-white/[0.08] pb-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
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

        <div className="footer-reveal flex flex-col items-center justify-between gap-4 pb-8 pt-8 text-xs text-fg/55 sm:flex-row">
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
