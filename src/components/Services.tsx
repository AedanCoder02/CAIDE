"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    index: "01",
    title: "Web Design",
    desc: "Interfaces that move, convert, and feel like the product you're actually building — not a template with your logo on it.",
  },
  {
    index: "02",
    title: "Automations",
    desc: "n8n, Telegram bots, and backend glue that removes the manual steps between your tools so your team stops doing them by hand.",
  },
  {
    index: "03",
    title: "Backend Engineering",
    desc: "APIs, databases, and infrastructure on Railway and Vercel built to hold up under real traffic, not just a demo.",
  },
  {
    index: "04",
    title: "App Development",
    desc: "Next.js web apps and the mobile companions that go with them, shipped end to end.",
  },
  {
    index: "05",
    title: "Tech Solutions",
    desc: "Shopify builds, integrations, and the one-off technical problems that don't fit a neat category but still need solving.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.batch(".service-card", {
        start: "top 85%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.1,
          }),
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="border-b border-line bg-bg px-6 py-28 sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-md text-4xl font-semibold tracking-tight sm:text-5xl">
            One studio, every layer of the stack.
          </h2>
          <p className="max-w-sm text-muted">
            We don&apos;t hand you off between five agencies. Design, backend,
            automation, and apps come from the same team that ships them.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="service-card group relative flex min-h-[260px] translate-y-10 flex-col justify-between bg-bg-elevated p-7 opacity-0 transition-colors duration-300 hover:bg-bg-elevated-2 lg:col-span-1 sm:[&:nth-child(5)]:col-span-2 lg:[&:nth-child(5)]:col-span-1"
              onPointerMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
              }}
            >
              <span className="font-mono text-xs text-muted">{service.index}</span>
              <div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.desc}
                </p>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(240px circle at var(--x,50%) var(--y,50%), rgba(124,92,255,0.12), transparent 70%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
