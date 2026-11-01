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
    title: "Websites that win customers",
    desc: "A site that looks unmistakably like your business, loads fast on every phone, shows up on Google, and turns visitors into calls, visits, and bookings.",
    tags: ["Design", "Mobile-first", "Google-ready"],
    color: "#7c5cff",
    span: "",
    speed: "8s",
    icon: icon("M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01"),
  },
  {
    title: "Bookings & reservations",
    desc: "Tables, appointments, rooms, or classes booked online 24/7, with deposits, confirmations, and reminders that cut no-shows.",
    tags: ["Restaurants", "Clinics", "Hotels", "Spas"],
    color: "#22d3ee",
    span: "",
    speed: "6s",
    icon: icon("M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM9 14l2 2 4-4"),
  },
  {
    title: "AI assistants & chatbots",
    desc: "An assistant trained on your menu, prices, and policies that answers customers on your site, WhatsApp, or Instagram, day and night.",
    tags: ["WhatsApp", "Instagram", "Web chat"],
    color: "#ec4899",
    span: "",
    speed: "7s",
    icon: icon("M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12zM9 11h.01M12 11h.01M15 11h.01"),
  },
  {
    title: "Automations",
    desc: "Confirmations, reminders, review requests, invoices, and follow-ups that happen on their own, so your team stops copying and pasting.",
    tags: ["Reminders", "Reviews", "Invoices"],
    color: "#10b981",
    span: "",
    speed: "9s",
    icon: icon("M13 2 4 14h7l-1 8 9-12h-7z"),
  },
  {
    title: "Apps for your customers",
    desc: "Loyalty cards, ordering, memberships, or a client portal in an app your customers keep on their phone.",
    tags: ["iOS", "Android", "Loyalty"],
    color: "#f59e0b",
    span: "",
    speed: "6.5s",
    icon: icon("M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2"),
  },
  {
    title: "Online stores & payments",
    desc: "Sell products, gift cards, and vouchers, take deposits, and get paid online, all connected to the tools you already use.",
    tags: ["Shopify", "Stripe", "Gift cards"],
    color: "#22d3ee",
    span: "",
    speed: "8.5s",
    icon: icon("M6 7h12l-1 13H7zM9 7a3 3 0 0 1 6 0"),
  },
  {
    title: "Brand identity",
    desc: "We bring your existing logo, colors, and style to life online, or create a brand-new identity that makes you stand out from day one.",
    tags: ["Logo", "Colors", "Style"],
    color: "#a78bfa",
    span: "",
    speed: "7.5s",
    icon: icon("M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"),
  },
  {
    title: "Redesigns & ongoing care",
    desc: "Already online? We redesign, speed up, and fix what is not working, then keep it secure, updated, and backed up for you.",
    tags: ["Redesign", "Speed", "Care plan"],
    color: "#7c5cff",
    span: "",
    speed: "7s",
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
              What we build for you
            </span>
            <h2 className="services-head mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl xl:max-w-none">
              Everything your business{" "}
              <span className="text-shimmer">needs online.</span>
            </h2>
          </div>
          <p className="services-head max-w-sm text-fg/60">
            One team, start to finish. You tell us what you imagine; we design it in
            your brand or a new one, build it, launch it, and keep it running.
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
