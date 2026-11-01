"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Particles from "./Particles";
import ServiceDemo from "./ServiceDemo";
import { useT } from "@/i18n/LangProvider";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  color: string;
  span: string;
  speed: string;
  icon: React.ReactNode;
};

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d={d} />
  </svg>
);

const STYLES: Service[] = [
  {
    color: "#7c5cff",
    span: "",
    speed: "8s",
    icon: icon("M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01"),
  },
  {
    color: "#22d3ee",
    span: "",
    speed: "6s",
    icon: icon("M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM9 14l2 2 4-4"),
  },
  {
    color: "#ec4899",
    span: "",
    speed: "7s",
    icon: icon("M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12zM9 11h.01M12 11h.01M15 11h.01"),
  },
  {
    color: "#10b981",
    span: "",
    speed: "9s",
    icon: icon("M13 2 4 14h7l-1 8 9-12h-7z"),
  },
  {
    color: "#f59e0b",
    span: "",
    speed: "6.5s",
    icon: icon("M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2"),
  },
  {
    color: "#22d3ee",
    span: "",
    speed: "8.5s",
    icon: icon("M6 7h12l-1 13H7zM9 7a3 3 0 0 1 6 0"),
  },
  {
    color: "#a78bfa",
    span: "",
    speed: "7.5s",
    icon: icon("M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"),
  },
  {
    color: "#7c5cff",
    span: "",
    speed: "7s",
    icon: icon("M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"),
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = useT().services;
  const SERVICES = STYLES.map((st, i) => ({ ...st, ...t.items[i] }));

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".service-card", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".services-head", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
      ScrollTrigger.batch(".service-card", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.08 }),
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#06050f] py-20 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:pt-[clamp(4.5rem,9vh,6rem)] lg:pb-[clamp(1.25rem,3.5vh,3rem)]"
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-12rem] h-[30rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(124,92,255,0.35), transparent 70%)" }}
      />

      <Particles colors={["#7c5cff", "#a78bfa", "#22d3ee"]} density={0.5} speed={0.12} size={[0.5, 1.6]} />

      <div className="wrap relative w-full">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="services-head font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t.eyebrow}
            </span>
            <h2 className="services-head mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl lg:text-[clamp(2.25rem,min(5.8vh,3.7vw),4.5rem)] xl:max-w-none">
              {t.h2[0]}{" "}
              <span className="text-shimmer">{t.h2[1]}</span>
            </h2>
          </div>
          <p className="services-head max-w-sm text-fg/60 lg:text-[clamp(0.8rem,1.9vh,1rem)]">
            {t.blurb}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-[clamp(1rem,3vh,2.5rem)] lg:grid-cols-4 lg:gap-[clamp(0.6rem,1.6vh,1rem)]">
          {SERVICES.map((s, i) => (
            <div key={i} className={`service-card translate-y-10 opacity-0 ${s.span}`}>
              <div
                className="svc-tilt beam-border group h-full rounded-2xl"
                style={{ ["--beam-color" as string]: s.color, ["--beam-speed" as string]: s.speed }}
                onPointerMove={(e) => {
                  const el = e.currentTarget;
                  const r = el.getBoundingClientRect();
                  const x = (e.clientX - r.left) / r.width;
                  const y = (e.clientY - r.top) / r.height;
                  el.style.setProperty("--x", `${x * 100}%`);
                  el.style.setProperty("--y", `${y * 100}%`);
                  if (e.pointerType !== "mouse") return;
                  el.dataset.tilting = "";
                  el.style.setProperty("--rx", `${(0.5 - y) * 9}deg`);
                  el.style.setProperty("--ry", `${(x - 0.5) * 11}deg`);
                }}
                onPointerLeave={(e) => {
                  const el = e.currentTarget;
                  delete el.dataset.tilting;
                  el.style.setProperty("--rx", "0deg");
                  el.style.setProperty("--ry", "0deg");
                }}
              >
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl lg:min-h-[16rem] border border-white/[0.07] bg-[#0b0a18]/90 p-6 lg:p-[clamp(0.9rem,2.2vh,1.75rem)]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: s.color }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(320px circle at var(--x,50%) var(--y,50%), ${s.color}2e, transparent 70%)`,
                    }}
                  />
                  <div className="relative flex items-start justify-between gap-3 [transform:translateZ(30px)]">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 transition-transform duration-500 group-hover:scale-110"
                      style={{ color: s.color, boxShadow: `0 0 24px ${s.color}40`, background: `${s.color}14` }}
                    >
                      {s.icon}
                    </div>
                    <ServiceDemo kind={i} color={s.color} />
                  </div>
                  <div className="relative mt-6 lg:mt-2 [transform:translateZ(20px)]">
                    <h3 className="text-xl font-semibold lg:text-[clamp(1rem,2.3vh,1.25rem)]">{s.title}</h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-fg/60 lg:text-[clamp(0.75rem,1.55vh,0.875rem)]">{s.desc}</p>
                    <ul className="mt-4 flex flex-wrap gap-2 lg:mt-[clamp(0.5rem,1vh,1.25rem)] lg:flex-nowrap lg:overflow-hidden lg:[mask-image:linear-gradient(90deg,#000_85%,transparent)] [@media(min-width:1024px)_and_(max-height:640px)]:hidden">
                      {s.tags.map((tag) => (
                        <li
                          key={tag}
                          className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-fg/55"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
