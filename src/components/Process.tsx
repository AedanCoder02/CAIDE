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
  const stepRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || window.innerWidth < 768) return;

      const steps = stepRefs.current;
      gsap.set(steps, { autoAlpha: 0, y: 24 });
      gsap.set(steps[0], { autoAlpha: 1, y: 0 });

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${steps.length * 420}`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (steps.length - 1),
          duration: 0.4,
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const idx = Math.min(
            steps.length - 1,
            Math.round(self.progress * (steps.length - 1))
          );
          steps.forEach((el, i) => {
            gsap.to(el, {
              autoAlpha: i === idx ? 1 : 0,
              y: i === idx ? 0 : i < idx ? -24 : 24,
              duration: 0.4,
              ease: "power2.out",
              overwrite: true,
            });
          });
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
      <div className="mx-auto flex h-full max-w-6xl flex-col md:min-h-[70vh] md:justify-center">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            How a build actually happens.
          </h2>
          <div className="hidden gap-2 sm:flex">
            {STEPS.map((s) => (
              <span
                key={s.n}
                className="process-bar h-1 w-10 rounded-full bg-accent-2 opacity-25 transition-opacity"
              />
            ))}
          </div>
        </div>

        <div className="relative mt-14 min-h-[320px] md:hidden">
          {STEPS.map((step) => (
            <div key={step.n} className="mb-10">
              <span className="font-mono text-sm text-accent-2">{step.n}</span>
              <h3 className="mt-2 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 max-w-lg text-muted">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-14 hidden min-h-[260px] md:block">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              ref={(el) => {
                if (el) stepRefs.current[i] = el;
              }}
              className="absolute inset-0"
            >
              <span className="font-mono text-sm text-accent-2">{step.n}</span>
              <h3 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                {step.title}
              </h3>
              <p className="mt-5 max-w-lg text-lg text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
