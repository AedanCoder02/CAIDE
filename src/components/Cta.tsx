"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Cta() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-reveal", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const blobs = sectionRef.current?.querySelectorAll<HTMLElement>(".cta-blob");
      if (blobs && !reduced) {
        blobs.forEach((blob, i) => {
          gsap.to(blob, {
            xPercent: gsap.utils.random(-25, 25),
            yPercent: gsap.utils.random(-20, 20),
            scale: gsap.utils.random(0.9, 1.25),
            duration: gsap.utils.random(9, 15),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.5,
          });
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-line bg-bg/70 px-6 py-32 text-center sm:px-10"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span
          className="cta-blob absolute left-1/2 top-1/2 h-[560px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-3xl will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(124,92,255,0.55), rgba(34,211,238,0.22) 45%, transparent 75%)",
          }}
        />
        <span
          className="cta-blob absolute left-[20%] top-[30%] h-72 w-72 rounded-full opacity-30 blur-3xl will-change-transform"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.45), transparent 70%)" }}
        />
        <span
          className="cta-blob absolute right-[15%] bottom-[20%] h-80 w-80 rounded-full opacity-30 blur-3xl will-change-transform"
          style={{ background: "radial-gradient(circle, rgba(124,92,255,0.4), transparent 70%)" }}
        />
      </div>

      <p className="cta-reveal font-mono text-xs uppercase tracking-[0.3em] text-muted">
        Let&apos;s build
      </p>
      <h2 className="cta-reveal mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
        Tell us what&apos;s slow, manual, or missing.
      </h2>
      <p className="cta-reveal mx-auto mt-6 max-w-xl text-lg text-muted">
        We&apos;ll scope the stack, the automations, and the build &mdash; and
        tell you honestly if it&apos;s a one-week fix or a real product.
      </p>
      <div className="cta-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="mailto:hello@caide.dev"
          className="inline-flex items-center gap-2 rounded-full bg-fg px-8 py-4 text-sm font-semibold text-bg transition-transform duration-300 hover:scale-[1.03]"
        >
          hello@caide.dev
        </a>
      </div>
    </section>
  );
}
