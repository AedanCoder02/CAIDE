"use client";

import { useEffect, useState } from "react";
import SiteLink from "./SiteLink";
import { useT } from "@/i18n/LangProvider";
import { OPEN_EVENT, applyConsent, readConsent, writeConsent, type Consent } from "@/lib/consent";

// Bottom-left consent card. Shown on the first visit (and after 12 months),
// and again from "Cookie settings" in the footer. Rejecting is as easy as accepting.
export default function ConsentBanner() {
  const t = useT().consent;
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(false);
  const [choice, setChoice] = useState<Consent>({ analytics: false, marketing: false });

  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      applyConsent(saved);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- consent lives in localStorage (external), read once after hydration
      setChoice(saved);
    } else {
      const id = window.setTimeout(() => setOpen(true), 1200);
      return () => window.clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    const onOpen = () => {
      setChoice(readConsent() ?? { analytics: false, marketing: false });
      setDetail(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const save = (c: Consent) => {
    writeConsent(c);
    applyConsent(c);
    setChoice(c);
    setOpen(false);
    setDetail(false);
  };

  if (!open) return null;

  const row = (key: "analytics" | "marketing", label: string, desc: string) => (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
      <span>
        <span className="block text-sm font-semibold text-fg">{label}</span>
        <span className="mt-1 block text-xs leading-relaxed text-fg/55">{desc}</span>
      </span>
      <input
        type="checkbox"
        className="consent-switch mt-0.5 shrink-0"
        checked={choice[key]}
        onChange={(e) => setChoice({ ...choice, [key]: e.target.checked })}
      />
    </label>
  );

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="consent-in fixed inset-x-3 bottom-3 z-[60] max-w-md rounded-2xl border border-white/10 bg-[#0b0a18]/95 p-5 text-left shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:left-5 sm:right-auto sm:bottom-5 sm:p-6"
    >
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-5 shadow-[0_0_8px_#10b981]" />
        <h2 id="consent-title" className="text-sm font-semibold">{t.title}</h2>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-fg/65">
        {t.body}{" "}
        <SiteLink href="/cookies" className="underline decoration-white/30 underline-offset-2 hover:text-fg">
          {t.policy}
        </SiteLink>
      </p>

      {detail && (
        <div className="mt-4 space-y-2">
          <div className="flex items-start justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
            <span>
              <span className="block text-sm font-semibold text-fg">{t.essential}</span>
              <span className="mt-1 block text-xs leading-relaxed text-fg/55">{t.essentialDesc}</span>
            </span>
            <input type="checkbox" className="consent-switch mt-0.5 shrink-0" checked disabled aria-label={t.essential} />
          </div>
          {row("analytics", t.analytics, t.analyticsDesc)}
          {row("marketing", t.marketing, t.marketingDesc)}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {detail ? (
          <button
            type="button"
            onClick={() => save(choice)}
            className="rounded-full bg-fg px-4 py-2 text-xs font-semibold text-bg transition-transform hover:scale-[1.03]"
          >
            {t.save}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => save({ analytics: true, marketing: false })}
            className="rounded-full bg-fg px-4 py-2 text-xs font-semibold text-bg transition-transform hover:scale-[1.03]"
          >
            {t.accept}
          </button>
        )}
        <button
          type="button"
          onClick={() => save({ analytics: false, marketing: false })}
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-fg transition-colors hover:border-white/40"
        >
          {t.reject}
        </button>
        {!detail && (
          <button
            type="button"
            onClick={() => setDetail(true)}
            className="rounded-full px-3 py-2 text-xs font-semibold text-fg/60 transition-colors hover:text-fg"
          >
            {t.customize}
          </button>
        )}
      </div>
    </div>
  );
}
