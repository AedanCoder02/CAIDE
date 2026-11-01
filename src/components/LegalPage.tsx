"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Nav from "./Nav";
import { LangProvider, useLang } from "@/i18n/LangProvider";
import { LOCALE_INFO } from "@/i18n/config";
import Footer from "./Footer";
import Particles from "./Particles";
import SiteLink from "./SiteLink";
import ConsentBanner from "./ConsentBanner";

gsap.registerPlugin(ScrollTrigger);

export type LegalSection = { id: string; title: string; body: React.ReactNode };

type Props = {
  doc: "privacy" | "terms" | "cookies";
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  updated: string;
  summary: string[];
  sections: LegalSection[];
};

const DOCS = [
  { key: "privacy", href: "/privacy", label: "Privacy Policy", color: "#7c5cff" },
  { key: "terms", href: "/terms", label: "Terms of Use", color: "#22d3ee" },
  { key: "cookies", href: "/cookies", label: "Cookie Policy", color: "#ec4899" },
] as const;

export default function LegalPage(props: Props) {
  return (
    <LangProvider>
      <LegalBody {...props} />
    </LangProvider>
  );
}

function LegalBody({ doc, eyebrow, title, accent, intro, updated, summary, sections }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { locale, t } = useLang();
  const articleRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(sections[0]?.id);
  const color = DOCS.find((d) => d.key === doc)!.color;

  // Scroll-spy for the table of contents.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  useGSAP(
    () => {
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: articleRef.current, start: "top 30%", end: "bottom 70%", scrub: 0.4 },
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
        .from(".legal-hero-in", { opacity: 0, y: 36, duration: 1, stagger: 0.08 })
        .from(".legal-summary", { opacity: 0, y: 40, scale: 0.98, duration: 1.1 }, "-=0.7");

      // Hide sections up front (not on enter) so they never flash, then reveal.
      gsap.set(".legal-section", { opacity: 0, y: 32 });
      ScrollTrigger.batch(".legal-section", {
        start: "top 92%",
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06, overwrite: true }),
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <Nav home={false} />
      <main lang="en">
        <header className="relative overflow-hidden bg-[#05040d] pt-36 pb-16 sm:pt-44">
          <Particles colors={[color, "#ffffff", "#22d3ee"]} density={0.45} speed={0.1} link={120} size={[0.5, 1.6]} />
          <div
            aria-hidden
            className="legal-aurora pointer-events-none absolute -top-40 left-1/2 h-[42rem] w-[110rem] -translate-x-1/2 blur-3xl"
            style={{ background: `radial-gradient(ellipse at 30% 50%, ${color}55, transparent 55%), radial-gradient(ellipse at 70% 40%, rgba(34,211,238,0.22), transparent 55%)` }}
          />
          <div aria-hidden className="line-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,#000_10%,transparent_65%)]" />

          <div className="wrap relative">
            <nav aria-label="Legal documents" className="legal-hero-in flex flex-wrap gap-2">
              {DOCS.map((d) => {
                const on = d.key === doc;
                return (
                  <SiteLink
                    key={d.key}
                    href={d.href}
                    aria-current={on ? "page" : undefined}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                      on ? "border-white/25 bg-white/[0.08] text-fg" : "border-white/10 text-fg/50 hover:border-white/25 hover:text-fg"
                    }`}
                    style={on ? { boxShadow: `0 0 30px -6px ${d.color}` } : undefined}
                  >
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: d.color }} />
                    {d.label}
                  </SiteLink>
                );
              })}
            </nav>

            {locale !== "en" && (
              <p lang={LOCALE_INFO[locale].html} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-fg/70">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-2 shadow-[0_0_8px_#22d3ee]" />
                {t.legal.englishOnly}
              </p>
            )}
            <p className="legal-hero-in mt-12 font-mono text-xs uppercase tracking-[0.3em]" style={{ color }}>
              {eyebrow}
            </p>
            <h1 className="legal-hero-in mt-4 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-[6.5vw]">
              {title} <span className="text-shimmer">{accent}</span>
            </h1>
            <div className="legal-hero-in mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-2xl text-lg text-fg/65">{intro}</p>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg/40">Last updated · {updated}</p>
            </div>

            <div
              className="legal-summary beam-border mt-14 rounded-[1.75rem]"
              style={{ ["--beam-color" as string]: color, ["--beam-speed" as string]: "9s" }}
            >
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0a0916]/90 p-7 sm:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
                  style={{ background: color }}
                />
                <p className="relative font-mono text-xs uppercase tracking-[0.3em] text-fg/50">The short version</p>
                <ul className="relative mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {summary.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.6875rem] font-semibold"
                        style={{ borderColor: `${color}66`, color, boxShadow: `0 0 16px -4px ${color}` }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-fg/75">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </header>

        <section className="relative overflow-clip bg-[#05040d] pb-28">
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-20rem] top-1/3 h-[40rem] w-[40rem] rounded-full opacity-40 blur-3xl"
            style={{ background: `radial-gradient(circle, ${color}40, transparent 65%)` }}
          />
          <div className="wrap relative grid gap-12 lg:grid-cols-[17.5rem_minmax(0,1fr)] xl:gap-20">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-fg/35">On this page</p>
                <div className="relative mt-5 pl-5">
                  <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
                  <div
                    ref={progressRef}
                    className="absolute left-0 top-0 h-full w-px origin-top scale-y-0"
                    style={{ background: `linear-gradient(${color}, #22d3ee)`, boxShadow: `0 0 10px ${color}` }}
                  />
                  <ol className="space-y-1">
                    {sections.map((s, i) => {
                      const on = s.id === active;
                      return (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className={`flex gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors duration-300 ${
                              on ? "bg-white/[0.05] text-fg" : "text-fg/45 hover:text-fg/80"
                            }`}
                          >
                            <span className="font-mono text-[0.6875rem]" style={{ color: on ? color : undefined }}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {s.title}
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </aside>

            <div ref={articleRef} className="max-w-3xl">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="legal-section scroll-mt-28 border-t border-white/[0.07] py-12 first:border-t-0 first:pt-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm" style={{ color }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.title}</h2>
                  </div>
                  <div className="legal-prose mt-6" style={{ ["--legal-accent" as string]: color }}>
                    {s.body}
                  </div>
                </section>
              ))}

              <div
                className="legal-section beam-border mt-8 rounded-2xl"
                style={{ ["--beam-color" as string]: color, ["--beam-speed" as string]: "7s" }}
              >
                <div className="flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-[#0a0916] p-7 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold">Questions about this document?</p>
                    <p className="mt-1 text-sm text-fg/55">Write to us and a real person will answer.</p>
                  </div>
                  <a
                    href="mailto:hello@caide.dev"
                    className="inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-bg transition-transform duration-300 hover:scale-[1.03]"
                    style={{ background: color, boxShadow: `0 0 30px -4px ${color}` }}
                  >
                    hello@caide.dev
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer home={false} />
      <ConsentBanner />
    </div>
  );
}
