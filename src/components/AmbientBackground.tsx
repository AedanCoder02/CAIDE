"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const blobs =
      rootRef.current?.querySelectorAll<HTMLElement>(".ambient-blob");
    if (!blobs || reduced) return;

    const ctx = gsap.context(() => {
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          xPercent: gsap.utils.random(-14, 14),
          yPercent: gsap.utils.random(-16, 16),
          scale: gsap.utils.random(0.95, 1.15),
          duration: gsap.utils.random(18, 26),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.7,
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg"
      style={{
        backgroundImage:
          "linear-gradient(165deg, #180c3d 0%, #0d0a28 22%, #0a0e22 45%, #081620 68%, #0f0a26 88%, #130a30 100%)",
      }}
    >
      <div
        className="ambient-blob absolute left-[-10%] top-[-10%] h-[55vmin] w-[55vmin] rounded-full blur-[90px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.38), transparent 70%)",
        }}
      />
      <div
        className="ambient-blob absolute right-[-15%] top-[8%] h-[48vmin] w-[48vmin] rounded-full blur-[100px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.3), transparent 70%)",
        }}
      />
      <div
        className="ambient-blob absolute bottom-[-18%] left-[8%] h-[58vmin] w-[58vmin] rounded-full blur-[110px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.24), transparent 70%)",
        }}
      />
      <div
        className="ambient-blob absolute bottom-[2%] right-[-8%] h-[42vmin] w-[42vmin] rounded-full blur-[90px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.28), transparent 70%)",
        }}
      />
    </div>
  );
}
