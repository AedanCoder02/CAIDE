"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { StaticImageData } from "next/image";
import Particles from "./Particles";
import { useLang } from "@/i18n/LangProvider";
import type { Locale } from "@/i18n/config";
import kryptykFull from "@/assets/work/kryptyk-full.webp";
import acjFull from "@/assets/work/acj-full.webp";
import acjEn from "@/assets/work/acj-full-en.webp";
import promarFull from "@/assets/work/promar-full.webp";
import promarEn from "@/assets/work/promar-full-en.webp";
import cerebrumFull from "@/assets/work/cerebrum-full.webp";
import ishinFull from "@/assets/work/ishin-full.webp";
import ishinEn from "@/assets/work/ishin-full-en.webp";
import kryptykEs from "@/assets/work/kryptyk-full-es.webp";
import kryptykFr from "@/assets/work/kryptyk-full-fr.webp";
import kryptykDe from "@/assets/work/kryptyk-full-de.webp";
import kryptykJa from "@/assets/work/kryptyk-full-ja.webp";
import kryptykIt from "@/assets/work/kryptyk-full-it.webp";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  name: string;
  url: string;
  color: string;
  // Full-page captures by language. The preview uses the visitor's language
  // when the project has it, otherwise English, or Spanish for Spanish visitors.
  shots: Partial<Record<Locale, StaticImageData>>;
};

const pickShot = (s: Project["shots"], l: Locale) =>
  (s[l] ?? (l === "es" ? s.es ?? s.en : s.en ?? s.es)) as StaticImageData;

const BASE: Project[] = [
  {
    name: "KRYPTYK",
    url: "https://kryptyk.vercel.app/",
    color: "#3cff6b",
    shots: { en: kryptykFull, es: kryptykEs, fr: kryptykFr, de: kryptykDe, ja: kryptykJa, it: kryptykIt },
  },
  {
    name: "ACJ Viajes",
    url: "https://aedancoder02.github.io/acj-viajes/",
    color: "#e0b062",
    shots: { es: acjFull, en: acjEn },
  },
  {
    name: "Promar",
    url: "https://aedancoder02.github.io/promar_web/",
    color: "#6d7cff",
    shots: { es: promarFull, en: promarEn },
  },
  {
    name: "Cerebrum",
    url: "https://cerebrum-eta-weld.vercel.app/",
    color: "#38bdf8",
    shots: { en: cerebrumFull },
  },
  {
    name: "Ishin Academy",
    url: "https://ishinacademy.framer.website/",
    color: "#a78bfa",
    shots: { es: ishinFull, en: ishinEn },
  },
];

export default function Portfolio() {
  const { t: dict, locale } = useLang();
  const t = dict.work;
  const PROJECTS = BASE.map((p, i) => ({ ...p, ...t.items[i], image: pickShot(p.shots, locale) }));
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const cards = gsap.utils.toArray<HTMLElement>(".work-card");
      const runs: (gsap.core.Timeline | null)[] = cards.map(() => null);

      // A preview scrolls through its site once each time its card settles in
      // front. It stops as soon as another card covers it.
      const show = (i: number) => {
        setActive(i);
        runs.forEach((tl, j) => {
          if (j !== i && tl) {
            tl.kill();
            runs[j] = null;
          }
        });
        const img = cards[i]?.querySelector<HTMLImageElement>(".work-shot");
        if (reduced || !img || runs[i]) return;
        const start = (tries = 0) => {
          const frame = img.parentElement;
          const dist = frame ? img.offsetHeight - frame.clientHeight : 0;
          if (dist <= 0) {
            if (tries < 30) requestAnimationFrame(() => start(tries + 1));
            return;
          }
          const d = gsap.utils.clamp(5, 12, dist / 160);
          runs[i] = gsap
            .timeline({ delay: 0.4, onComplete: () => (runs[i] = null) })
            .to(img, { y: -dist, duration: d, ease: "power1.inOut" })
            .to(img, { y: 0, duration: d * 0.45, ease: "power2.inOut" }, "+=1.2");
        };
        img.decode().then(() => start(), () => start());
      };

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: desktop ? "top 10%" : "top 55%",
          onEnter: () => show(i),
          onLeaveBack: () => show(Math.max(0, i - 1)),
        });
      });

      if (reduced) return;

      gsap.from(".work-head", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".work-card");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (next) {
            gsap.to(card.querySelector(".work-inner"), {
              scale: 0.9,
              filter: "brightness(0.45) blur(2px)",
              ease: "none",
              scrollTrigger: { trigger: next, start: "top bottom", end: "top 12%", scrub: true },
            });
          }
          gsap.from(card.querySelector(".work-fly"), {
            rotateY: -18,
            rotateX: 10,
            y: 80,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top bottom", end: "top 30%", scrub: true },
          });
          gsap.from(card.querySelectorAll(".work-text"), {
            opacity: 0,
            x: -30,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 85%", end: "top 35%", scrub: true },
          });
        });
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="work" ref={sectionRef} className="relative overflow-clip bg-[#04030b] py-28 sm:py-36">
      <Particles colors={["#7c5cff", "#22d3ee", "#ec4899", "#ffffff"]} density={0.45} speed={0.12} link={130} />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[90rem] -translate-x-1/2 -translate-y-1/3 blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(124,92,255,0.3), rgba(236,72,153,0.12) 45%, transparent 70%)" }}
      />

      <div className="wrap relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="work-head font-mono text-xs uppercase tracking-[0.3em] text-accent-3">{t.eyebrow}</span>
            <h2 className="work-head mt-4 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-[7.5vw]">
              {t.h2[0]} <span className="text-shimmer">{t.h2[1]}</span>
            </h2>
          </div>
          <div className="work-head flex items-end gap-6 lg:pb-4">
            <span className="text-7xl font-semibold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)] sm:text-8xl">
              0{PROJECTS.length}
            </span>
            <p className="max-w-xs pb-2 text-fg/60">
              {t.blurb}
            </p>
          </div>
        </div>

        <div className="mt-20 space-y-10 lg:space-y-0">
          {PROJECTS.map((p, i) => (
            <article
              key={p.name}
              className="work-card lg:sticky lg:top-[9vh] lg:h-[84vh] lg:min-h-[600px] lg:[&:not(:last-child)]:mb-[40vh]"
              data-active={i === active}
              style={{ zIndex: i + 1 }}
            >
              <div
                className="work-inner beam-border h-full rounded-[2rem] will-change-transform"
                style={{ ["--beam-color" as string]: p.color, ["--beam-speed" as string]: "9s" }}
              >
                <div className="relative grid h-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#08070f] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-40 blur-3xl"
                    style={{ background: `radial-gradient(circle, ${p.color}, transparent 65%)` }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-48 right-0 h-[30rem] w-[50rem] opacity-25 blur-3xl"
                    style={{ background: `radial-gradient(ellipse, ${p.color}, transparent 70%)` }}
                  />
                  <Particles colors={[p.color, "#ffffff"]} density={0.35} speed={0.25} mode="rise" size={[0.5, 1.6]} active={i === active} />

                  <div className="relative order-2 flex flex-col justify-between p-7 sm:p-10 lg:order-1 lg:p-14">
                    <div className="work-text flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-fg/50">
                      <span>
                        <span style={{ color: p.color }}>0{i + 1}</span> / 0{PROJECTS.length}
                      </span>
                      <span>{p.kind}</span>
                    </div>

                    <div className="mt-10 lg:mt-0">
                      <h3
                        className="work-text text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl xl:text-7xl"
                        style={{ textShadow: `0 0 60px ${p.color}55` }}
                      >
                        {p.name}
                      </h3>
                      <p className="work-text mt-6 max-w-md text-base leading-relaxed text-fg/65 sm:text-lg">{p.desc}</p>
                      <ul className="work-text mt-6 flex flex-wrap gap-2">
                        {p.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/60"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="work-text mt-10">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex w-fit items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold text-bg transition-transform duration-300 hover:scale-[1.04]"
                        style={{ background: p.color, boxShadow: `0 0 40px ${p.color}66` }}
                      >
                        {t.visit}
                        <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                          &#8599;
                        </span>
                      </a>
                    </div>
                  </div>

                  <div className="relative order-1 flex items-center p-4 pb-0 sm:p-8 sm:pb-0 lg:order-2 lg:p-10 lg:pl-0 [perspective:1600px]">
                    <div className="work-fly w-full lg:h-full [perspective:1600px]">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t.open.replace("{name}", p.name)}
                        className="work-frame group relative block h-[46vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-black transition-transform duration-700 lg:h-full lg:[transform:rotateY(-7deg)_rotateX(3deg)] lg:hover:[transform:rotateY(0deg)_rotateX(0deg)]"
                        style={{ boxShadow: `0 40px 120px -30px ${p.color}80, 0 0 0 1px ${p.color}22` }}
                      >
                        <div className="absolute inset-x-0 top-0 z-10 flex h-10 items-center gap-2 border-b border-white/10 bg-[#0d0d14]/95 px-4 backdrop-blur">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                          <span className="ml-4 flex-1 truncate rounded-md bg-white/[0.06] px-3 py-1 text-center font-mono text-[11px] text-fg/55">
                            {p.name}
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 top-10 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element -- static export with unoptimized images; GSAP scrolls this element */}
                          <img
                            src={p.image.src}
                            width={p.image.width}
                            height={p.image.height}
                            alt={t.alt.replace("{name}", p.name)}
                            decoding="async"
                            className="work-shot block h-auto w-full"
                          />
                        </div>
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
