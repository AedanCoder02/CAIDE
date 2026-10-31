"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#stack", label: "Toolkit" },
];

export default function Nav() {
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "expo.out",
        delay: 0.1,
      });
    },
    { scope: navRef }
  );

  return (
    <div
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-md"
    >
      <nav className="wrap flex items-center justify-between py-4">
        <a href="#top" className="font-mono text-sm font-semibold tracking-[0.2em]">
          CAIDE
        </a>
        <ul className="hidden items-center gap-8 text-sm text-muted sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-200 hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full border border-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-fg transition-colors hover:border-fg/40"
        >
          Get in touch
        </a>
      </nav>
    </div>
  );
}
