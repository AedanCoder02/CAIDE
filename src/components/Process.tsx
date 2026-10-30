"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Scope & architect",
    body: "We map the product, the data, and the automations before a line of code ships — so the backend doesn't need a rewrite in month three.",
  },
  {
    n: "02",
    title: "Design in the browser",
    body: "No static mockups handed off and reinterpreted. We design with real motion, real components, in the stack it'll actually ship on.",
  },
  {
    n: "03",
    title: "Build & automate",
    body: "Frontend, backend, and the automations connecting them get built together, so nothing is held hostage waiting on another team.",
  },
  {
    n: "04",
    title: "Ship & iterate",
    body: "Deployed to Vercel or Railway, instrumented, and handed back to you with the room to keep iterating without us in the room.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || window.innerWidth < 768) return;

      const track = trackRef.current;
      if (!track) return;

      const getDistance = () => track.scrollWidth - track.parentElement!.clientWidth;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getDistance() + window.innerHeight * 0.4}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -self.progress * getDistance() });
          const idx = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length));
          const bars = sectionRef.current?.querySelectorAll<HTMLElement>(".process-bar");
          bars?.forEach((bar, i) => {
            bar.style.opacity = i <= idx ? "1" : "0.25";
          });
        },
      });

      return () => st.kill();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-line bg-bg-elevated/72 px-6 py-28 sm:px-10 md:min-h-screen"
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col md:min-h-[80vh] md:justify-center">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">
              Process
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              How a build actually happens.
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            {STEPS.map((s) => (
              <span
                key={s.n}
                className="process-bar h-1 w-10 rounded-full bg-accent-2 opacity-25 transition-opacity"
              />
            ))}
          </div>
        </div>

        <div className="relative mt-14 md:hidden">
          {STEPS.map((step) => (
            <div key={step.n} className="mb-10 border-l border-line pl-6">
              <span className="font-mono text-sm text-accent-2">{step.n}</span>
              <h3 className="mt-2 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 max-w-lg text-muted">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-16 hidden overflow-hidden md:block">
          <div ref={trackRef} className="flex w-max gap-8">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className="process-card relative flex w-[62vw] max-w-xl flex-shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-line bg-bg-elevated-2/60 p-10 lg:p-12"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-30 blur-3xl"
                  style={{
                    background:
                      i % 2 === 0
                        ? "radial-gradient(circle, rgba(124,92,255,0.6), transparent 70%)"
                        : "radial-gradient(circle, rgba(34,211,238,0.5), transparent 70%)",
                  }}
                />
                <span className="font-mono text-sm text-accent-2">{step.n}</span>
                <div className="mt-6">
                  <h3 className="text-3xl font-semibold tracking-tight lg:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-md text-lg text-muted">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
