"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Particles from "./Particles";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Scope & architect",
    body: "We map the product, the data, and the automations before a line of code ships, so the backend doesn't need a rewrite in month three.",
  },
  {
    n: "02",
    title: "Design in the browser",
    body: "No static mockups handed off and reinterpreted. We design with real motion and real components, in the stack it will ship on.",
  },
  {
    n: "03",
    title: "Build & automate",
    body: "Frontend, backend, and the automations connecting them get built together, so nothing is held hostage waiting on another team.",
  },
  {
    n: "04",
    title: "Ship & iterate",
    body: "Deployed, instrumented, and handed back with docs and room to keep iterating, with or without us.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || window.innerWidth < 768) return;

      const track = trackRef.current;
      if (!track) return;

      // Measured once before pinning: recomputing on every refresh fed back into
      // the pin-spacer height and grew it without bound.
      const distance = track.scrollWidth - (track.parentElement?.clientWidth ?? window.innerWidth);

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${distance + window.innerHeight * 0.4}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(track, { x: -self.progress * distance });
          gsap.set(beamRef.current, { scaleX: self.progress });
          const idx = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length));
          sectionRef.current?.querySelectorAll<HTMLElement>(".process-card").forEach((card, i) => {
            card.dataset.active = i === idx ? "true" : "false";
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
      className="relative overflow-hidden bg-[#03101a] py-28 md:min-h-screen"
    >
      <div aria-hidden className="line-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[80rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.18), transparent 70%)" }}
      />

      <Particles colors={["#22d3ee", "#67e8f9", "#ffffff"]} mode="rise" density={0.45} speed={0.35} size={[0.5, 1.8]} />

      <div className="wrap relative flex h-full flex-col md:min-h-[80vh] md:justify-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-2">Process</span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
            How a build actually happens.
          </h2>
        </div>

        <div className="relative mt-14 md:hidden">
          <div aria-hidden className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-2 via-accent to-transparent shadow-[0_0_12px_#22d3ee]" />
          {STEPS.map((step) => (
            <div key={step.n} className="relative mb-10 pl-6">
              <span className="absolute -left-[3px] top-1.5 h-[7px] w-[7px] rounded-full bg-accent-2 shadow-[0_0_10px_#22d3ee]" />
              <span className="font-mono text-sm text-accent-2">{step.n}</span>
              <h3 className="mt-2 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 max-w-lg text-fg/60">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-16 hidden md:block">
          <div className="relative h-px w-full bg-white/10">
            <div
              ref={beamRef}
              className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-accent-2 via-accent to-accent-3 shadow-[0_0_16px_#22d3ee]"
            />
          </div>

          <div className="mt-10 overflow-hidden">
            <div ref={trackRef} className="flex w-max gap-8">
              {STEPS.map((step, i) => (
                <div
                  key={step.n}
                  data-active={i === 0 ? "true" : "false"}
                  className="process-card group relative w-[58vw] max-w-xl flex-shrink-0 2xl:max-w-2xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#061722]/80 p-10 transition-[border-color,box-shadow] duration-500 data-[active=true]:border-accent-2/50 data-[active=true]:shadow-[0_0_60px_-10px_rgba(34,211,238,0.45)] lg:p-12"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-4 -top-10 select-none text-[11rem] font-semibold leading-none text-transparent [-webkit-text-stroke:1px_rgba(34,211,238,0.18)]"
                  >
                    {step.n}
                  </span>
                  <span className="relative font-mono text-sm text-accent-2">{step.n}</span>
                  <h3 className="relative mt-8 text-3xl font-semibold tracking-tight lg:text-4xl">
                    {step.title}
                  </h3>
                  <p className="relative mt-5 max-w-md text-lg text-fg/60">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
