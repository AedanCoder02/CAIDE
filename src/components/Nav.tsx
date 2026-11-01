"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SiteLink from "./SiteLink";
import LangSwitcher from "./LangSwitcher";
import { useT } from "@/i18n/LangProvider";

const LINKS = [
  { href: "#services", key: "services" },
  { href: "#work", key: "work" },
  { href: "#systems", key: "how" },
  { href: "#industries", key: "industries" },
] as const;

export default function Nav({ home = true }: { home?: boolean }) {
  const navRef = useRef<HTMLDivElement>(null);
  const t = useT().nav;

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
        <SiteLink href="#top" home={home} className="font-mono text-sm font-semibold tracking-[0.2em]">
          CAIDE
        </SiteLink>
        <ul className="hidden items-center gap-8 text-sm text-muted sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <SiteLink
                href={link.href}
                home={home}
                className="transition-colors duration-200 hover:text-fg"
              >
                {t[link.key]}
              </SiteLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
        <LangSwitcher />
        <SiteLink
          href="#contact"
          home={home}
          className="rounded-full border border-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-fg transition-colors hover:border-fg/40"
        >
          {t.cta}
        </SiteLink>
        </div>
      </nav>
    </div>
  );
}
