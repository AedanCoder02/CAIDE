"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Particles from "./Particles";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  title: string;
  desc: string;
  tags: string[];
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

const SERVICES: Service[] = [
  {
    title: "Web Development",
    desc: "Marketing sites, dashboards, and full web platforms in Next.js and TypeScript. Fast, accessible, animated where it earns it, and built to be maintained after launch.",
    tags: ["Next.js", "React", "TypeScript", "Shopify"],
    color: "#7c5cff",
    span: "lg:col-span-2",
    speed: "8s",
    icon: icon("M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01"),
  },
  {
    title: "Automations",
    desc: "n8n workflows, Telegram bots, and scheduled jobs that remove the manual steps between your tools.",
    tags: ["n8n", "Bots", "Cron", "Webhooks"],
    color: "#22d3ee",
    span: "",
    speed: "6s",
    icon: icon("M13 2 4 14h7l-1 8 9-12h-7z"),
  },
  {
    title: "Backend & APIs",
    desc: "APIs, databases, auth, and queues designed for real traffic, not a demo.",
    tags: ["Node", "Postgres", "REST", "Auth"],
    color: "#10b981",
    span: "",
    speed: "7s",
    icon: icon("M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"),
  },
  {
    title: "Integrations",
    desc: "Connect payments, CRMs, storefronts, messaging, and AI models so your systems talk to each other.",
    tags: ["Stripe", "Shopify", "CRMs", "LLMs"],
    color: "#ec4899",
    span: "",
    speed: "9s",
    icon: icon("M8 12h8M9 7H7a5 5 0 0 0 0 10h2M15 7h2a5 5 0 0 1 0 10h-2"),
  },
  {
    title: "App Development",
    desc: "Web apps and their mobile companions, shipped end to end with the backend behind them.",
    tags: ["PWA", "Mobile", "Realtime"],
    color: "#f59e0b",
    span: "",
    speed: "6.5s",
    icon: icon("M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2"),
  },
  {
    title: "DevOps & Infrastructure",
    desc: "CI/CD, environments, monitoring, and deploys on Vercel, Railway, and Docker.",
    tags: ["CI/CD", "Vercel", "Railway", "Docker"],
    color: "#22d3ee",
    span: "",
    speed: "8.5s",
    icon: icon("M12 2 3 7v10l9 5 9-5V7zM3 7l9 5 9-5M12 12v10"),
  },
  {
    title: "Audits, Refactors & Rescues",
    desc: "Already have a codebase? We audit it, fix what is slow or fragile, migrate what is outdated, and take over stalled projects so they actually ship.",
    tags: ["Code audit", "Performance", "Migration", "Takeover"],
    color: "#7c5cff",
    span: "sm:col-span-2 xl:col-span-1",
    speed: "7.5s",
    icon: icon("M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"),
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      className="relative overflow-hidden bg-[#06050f] py-20 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-24"
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
              What we do
            </span>
            <h2 className="services-head mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl xl:max-w-none">
              The full toolkit of a{" "}
              <span className="text-shimmer">software engineer.</span>
            </h2>
          </div>
          <p className="services-head max-w-sm text-fg/60">
            One team across the whole stack. No handoffs between five agencies,
            no gaps between the frontend, the backend, and the glue that
            connects them.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:mt-10 xl:grid-cols-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className={`service-card beam-border group translate-y-10 rounded-2xl opacity-0 ${s.span}`}
              style={{ ["--beam-color" as string]: s.color, ["--beam-speed" as string]: s.speed }}
              onPointerMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
              }}
            >
              <div className="relative flex h-full min-h-[230px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0a18]/90 p-7 xl:min-h-[250px]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{ background: s.color }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(260px circle at var(--x,50%) var(--y,50%), ${s.color}26, transparent 70%)`,
                  }}
                />
                <div
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10"
                  style={{ color: s.color, boxShadow: `0 0 24px ${s.color}40`, background: `${s.color}14` }}
                >
                  {s.icon}
                </div>
                <div className="relative mt-8">
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-fg/60">{s.desc}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg/55"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
