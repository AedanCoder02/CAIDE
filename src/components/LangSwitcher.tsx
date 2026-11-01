"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LangProvider";
import { LOCALES, LOCALE_INFO } from "@/i18n/config";

export default function LangSwitcher() {
  const { locale, setLocale, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.nav.language}: ${LOCALE_INFO[locale].name}`}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2 font-mono text-xs font-semibold tracking-wide text-fg/80 transition-colors hover:border-fg/40 hover:text-fg"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-3.5 w-3.5" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </svg>
        {LOCALE_INFO[locale].code}
      </button>
      <ul
        role="listbox"
        aria-label={t.nav.language}
        className={`absolute right-0 top-full mt-3 w-60 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-[#0b0a18]/95 p-1.5 shadow-[0_30px_80px_-20px_rgba(124,92,255,0.45)] backdrop-blur-xl transition-[opacity,transform] duration-200 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {LOCALES.map((l) => {
          const on = l === locale;
          return (
            <li key={l} role="option" aria-selected={on}>
              <button
                type="button"
                tabIndex={open ? 0 : -1}
                lang={LOCALE_INFO[l].html}
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  on ? "bg-white/[0.07] text-fg" : "text-fg/65 hover:bg-white/[0.04] hover:text-fg"
                }`}
              >
                <span>{LOCALE_INFO[l].name}</span>
                <span className="flex items-center gap-2 font-mono text-[10px] text-fg/40">
                  {LOCALE_INFO[l].code}
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${on ? "bg-accent-2 shadow-[0_0_8px_#22d3ee]" : "bg-transparent"}`}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
