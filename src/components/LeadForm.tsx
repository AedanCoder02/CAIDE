"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SiteLink from "./SiteLink";
import { useLang } from "@/i18n/LangProvider";

// Where briefs are sent. On Cloudflare Pages this is the /api/lead function in
// /functions. Without an endpoint (e.g. GitHub Pages) the brief opens in the
// visitor's email app instead, so no enquiry is ever lost.
const ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const INBOX = "hello@caide.dev";

type Brief = {
  needs: number[];
  business: string;
  industry: number;
  site: string;
  location: string;
  brand: number;
  timeline: number;
  budget: number;
  idea: string;
  name: string;
  email: string;
  phone: string;
  prefer: number;
  consent: boolean;
  updates: boolean;
};

const EMPTY: Brief = {
  needs: [],
  business: "",
  industry: -1,
  site: "",
  location: "",
  brand: -1,
  timeline: -1,
  budget: -1,
  idea: "",
  name: "",
  email: "",
  phone: "",
  prefer: 0,
  consent: false,
  updates: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id?: string) => void };
  }
}

export default function LeadForm() {
  const { t: dict, locale } = useLang();
  const t = dict.lead;
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [b, setB] = useState<Brief>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailed" | "error">("idle");
  const [token, setToken] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const tsRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Brief>(k: K, v: Brief[K]) => {
    setB((prev) => ({ ...prev, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  // Bot check (Cloudflare Turnstile), loaded only on the last step and only
  // when a site key is configured.
  useEffect(() => {
    if (step !== 3 || !TURNSTILE_KEY || !ENDPOINT || !tsRef.current) return;
    const el = tsRef.current;
    const render = () => {
      if (window.turnstile && !el.dataset.done) {
        el.dataset.done = "1";
        window.turnstile.render(el, { sitekey: TURNSTILE_KEY, theme: "dark", callback: (tk: string) => setToken(tk) });
      }
    };
    if (window.turnstile) return render();
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = render;
    document.head.appendChild(s);
  }, [step]);

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0 && b.needs.length === 0) e.needs = t.pickOne;
    if (s === 1) {
      if (!b.business.trim()) e.business = t.required;
      if (b.industry < 0) e.industry = t.pickOne;
      if (!b.location.trim()) e.location = t.required;
    }
    if (s === 2) {
      if (b.timeline < 0) e.timeline = t.pickOne;
      if (!b.idea.trim()) e.idea = t.required;
    }
    if (s === 3) {
      if (!b.name.trim()) e.name = t.required;
      if (!EMAIL_RE.test(b.email.trim())) e.email = t.invalidEmail;
      if (!b.consent) e.consent = t.consentRequired;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
    bodyRef.current?.scrollTo({ top: 0 });
  };
  const next = () => validate(step) && go(step + 1);

  // Readable labels, used for the live summary, the email fallback and the API.
  const labels = useMemo(
    () => ({
      needs: b.needs.map((i) => t.needs[i]),
      industry: t.industries[b.industry] ?? "",
      brand: t.brands[b.brand] ?? "",
      timeline: t.timelines[b.timeline] ?? "",
      budget: t.budgets[b.budget] ?? "",
      prefer: t.prefers[b.prefer] ?? "",
    }),
    [b, t]
  );

  const summary: [string, string][] = [
    [t.steps[0], labels.needs.join(", ")],
    [t.bizName, b.business],
    [t.industry, labels.industry],
    [t.location, b.location],
    [t.brand, labels.brand],
    [t.timeline, labels.timeline],
    [t.budget, labels.budget],
    [t.idea, b.idea],
    [t.name, b.name],
    [t.email, b.email],
  ].filter(([, v]) => v) as [string, string][];

  const submit = async () => {
    if (!validate(3)) return;
    if (honeypot.current?.value) return setStatus("sent"); // bots get a fake success
    const payload = {
      ...labels,
      business: b.business.trim(),
      site: b.site.trim(),
      location: b.location.trim(),
      idea: b.idea.trim(),
      name: b.name.trim(),
      email: b.email.trim(),
      phone: b.phone.trim(),
      updates: b.updates,
      consent: b.consent,
      locale,
      page: window.location.pathname,
      turnstile: token,
    };

    const mailFallback = () => {
      const body = summary.map(([k, v]) => `${k}: ${v}`).concat(b.phone ? [`${t.phone}: ${b.phone}`, `${t.prefer}: ${labels.prefer}`] : []).join("\n");
      window.location.href = `mailto:${INBOX}?subject=${encodeURIComponent(`Brief · ${payload.business}`)}&body=${encodeURIComponent(body)}`;
      setStatus("mailed");
    };
    if (!ENDPOINT) return mailFallback();

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // 503: the endpoint has no inbox or database yet, so hand off to email.
      if (res.status === 503) return mailFallback();
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
      if (TURNSTILE_KEY) window.turnstile?.reset();
    }
  };

  const reset = () => {
    setB(EMPTY);
    setStep(0);
    setStatus("idle");
    setErrors({});
  };

  const done = status === "sent" || status === "mailed";
  const err = (k: string) =>
    errors[k] ? (
      <p role="alert" className="mt-1.5 text-xs text-[#fb7185]">
        {errors[k]}
      </p>
    ) : null;

  const chip = (on: boolean) =>
    `lead-chip rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
      on ? "border-transparent bg-fg text-bg shadow-[0_0_24px_rgba(124,92,255,0.45)]" : "border-white/12 bg-white/[0.03] text-fg/75 hover:border-white/35 hover:text-fg"
    }`;
  const field = "lead-field w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-fg placeholder:text-fg/30 outline-none transition-[border-color,box-shadow] focus:border-accent-2/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]";
  const label = "mb-2 block text-left font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-fg/50";

  return (
    <div className="lead mx-auto w-full max-w-6xl text-left">
      <div className="beam-border rounded-[1.75rem]" style={{ ["--beam-color" as string]: "#22d3ee", ["--beam-speed" as string]: "8s" }}>
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0916]/85 shadow-[0_40px_120px_-40px_rgba(124,92,255,0.6)] backdrop-blur-xl">
          {/* Window bar */}
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-fg/40">{t.window}</span>
            <span className="font-mono text-[0.6875rem] text-fg/40">{done ? "✓" : `${step + 1}/4`}</span>
          </div>

          {/* Progress rail */}
          <div className="px-6 pt-6 sm:px-10">
            <div className="relative">
            {/* Track runs between the first and last dot centers. */}
            <div className="absolute left-[12.5%] right-[12.5%] top-[0.4375rem] h-px bg-white/10" />
            <div
              className="lead-rail absolute left-[12.5%] right-[12.5%] top-[0.4375rem] h-px origin-left"
              style={{ transform: `scaleX(${done ? 1 : step / 3})` }}
            />
            <ol className="relative grid grid-cols-4">
              {t.steps.map((s, i) => {
                const reached = done || i <= step;
                return (
                  <li key={i} className="flex flex-col items-center gap-2">
                    <button
                      type="button"
                      disabled={done || i > step}
                      onClick={() => go(i)}
                      aria-label={s}
                      className={`h-3.5 w-3.5 rounded-full border transition-all duration-500 ${
                        reached ? "scale-110 border-transparent bg-accent-2 shadow-[0_0_14px_#22d3ee]" : "border-white/25 bg-[#0a0916]"
                      }`}
                    />
                    <span className={`hidden text-center font-mono text-[0.625rem] uppercase tracking-[0.18em] sm:block ${reached ? "text-fg/80" : "text-fg/35"}`}>
                      {s}
                    </span>
                  </li>
                );
              })}
            </ol>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
            {/* Steps */}
            <div ref={bodyRef} className="relative min-h-[26rem] p-6 sm:p-10">
              <input ref={honeypot} type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

              {done ? (
                <div key="done" className="lead-step-in" style={{ ["--dir" as string]: 1 }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-5/15 text-xl text-accent-5 shadow-[0_0_30px_rgba(16,185,129,0.4)]">✓</div>
                  <h3 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{status === "sent" ? t.doneTitle : t.mailTitle}</h3>
                  <p className="mt-3 max-w-lg text-fg/65">
                    {status === "sent" ? t.doneSub.replace("{name}", b.name.split(" ")[0]).replace("{email}", b.email) : t.mailSub}
                  </p>
                  <ol className="mt-8 grid gap-3 sm:grid-cols-3">
                    {t.after.map((a, i) => (
                      <li key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                        <span className="font-mono text-[0.625rem] tracking-[0.2em] text-accent-2">0{i + 1}</span>
                        <p className="mt-2 text-sm text-fg/80">{a}</p>
                      </li>
                    ))}
                  </ol>
                  <button type="button" onClick={reset} className="mt-8 text-sm font-semibold text-fg/60 underline-offset-4 hover:text-fg hover:underline">
                    {t.again}
                  </button>
                </div>
              ) : (
                <div key={step} className="lead-step-in" style={{ ["--dir" as string]: dir }}>
                  {step === 0 && (
                    <fieldset>
                      <legend className="text-2xl font-semibold tracking-tight sm:text-3xl">{t.needQ}</legend>
                      <p className="mt-2 text-sm text-fg/50">{t.needHint}</p>
                      <div className="mt-6 flex flex-wrap gap-2.5">
                        {t.needs.map((n, i) => {
                          const on = b.needs.includes(i);
                          return (
                            <button
                              key={i}
                              type="button"
                              aria-pressed={on}
                              onClick={() => set("needs", on ? b.needs.filter((x) => x !== i) : [...b.needs, i])}
                              className={chip(on)}
                            >
                              {n}
                            </button>
                          );
                        })}
                      </div>
                      {err("needs")}
                    </fieldset>
                  )}

                  {step === 1 && (
                    <fieldset className="space-y-5">
                      <legend className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">{t.bizQ}</legend>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="lead-biz" className={label}>{t.bizName}</label>
                          <input id="lead-biz" className={field} value={b.business} maxLength={120} placeholder={t.bizNamePh} onChange={(e) => set("business", e.target.value)} autoComplete="organization" />
                          {err("business")}
                        </div>
                        <div>
                          <label htmlFor="lead-loc" className={label}>{t.location}</label>
                          <input id="lead-loc" className={field} value={b.location} maxLength={120} placeholder={t.locationPh} onChange={(e) => set("location", e.target.value)} autoComplete="address-level2" />
                          {err("location")}
                        </div>
                      </div>
                      <div>
                        <span className={label}>{t.industry}</span>
                        <div className="flex flex-wrap gap-2">
                          {t.industries.map((n, i) => (
                            <button key={i} type="button" aria-pressed={b.industry === i} onClick={() => set("industry", i)} className={chip(b.industry === i)}>
                              {n}
                            </button>
                          ))}
                        </div>
                        {err("industry")}
                      </div>
                      <div>
                        <label htmlFor="lead-site" className={label}>{t.site}</label>
                        <input id="lead-site" className={field} value={b.site} maxLength={200} placeholder="https://" onChange={(e) => set("site", e.target.value)} inputMode="url" />
                      </div>
                    </fieldset>
                  )}

                  {step === 2 && (
                    <fieldset className="space-y-5">
                      <legend className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">{t.projectQ}</legend>
                      {(
                        [
                          ["timeline", t.timeline, t.timelines],
                          ["brand", t.brand, t.brands],
                          ["budget", t.budget, t.budgets],
                        ] as const
                      ).map(([k, l, opts]) => (
                        <div key={k}>
                          <span className={label}>{l}</span>
                          <div className="flex flex-wrap gap-2">
                            {opts.map((n, i) => (
                              <button key={i} type="button" aria-pressed={b[k] === i} onClick={() => set(k, i)} className={chip(b[k] === i)}>
                                {n}
                              </button>
                            ))}
                          </div>
                          {err(k)}
                        </div>
                      ))}
                      <div>
                        <label htmlFor="lead-idea" className={label}>{t.idea}</label>
                        <textarea id="lead-idea" rows={4} maxLength={2000} className={`${field} resize-none`} value={b.idea} placeholder={t.ideaPh} onChange={(e) => set("idea", e.target.value)} />
                        {err("idea")}
                      </div>
                    </fieldset>
                  )}

                  {step === 3 && (
                    <fieldset className="space-y-5">
                      <legend className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">{t.contactQ}</legend>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="lead-name" className={label}>{t.name}</label>
                          <input id="lead-name" className={field} value={b.name} maxLength={120} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                          {err("name")}
                        </div>
                        <div>
                          <label htmlFor="lead-email" className={label}>{t.email}</label>
                          <input id="lead-email" type="email" className={field} value={b.email} maxLength={200} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                          {err("email")}
                        </div>
                        <div>
                          <label htmlFor="lead-phone" className={label}>{t.phone}</label>
                          <input id="lead-phone" type="tel" className={field} value={b.phone} maxLength={40} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
                        </div>
                        <div>
                          <span className={label}>{t.prefer}</span>
                          <div className="flex flex-wrap gap-2">
                            {t.prefers.map((n, i) => (
                              <button key={i} type="button" aria-pressed={b.prefer === i} onClick={() => set("prefer", i)} className={chip(b.prefer === i)}>
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3 pt-1">
                        <label className="flex cursor-pointer items-start gap-3 text-sm text-fg/75">
                          <input type="checkbox" className="lead-check mt-0.5" checked={b.consent} onChange={(e) => set("consent", e.target.checked)} />
                          <span>
                            {t.consent}{" "}
                            <SiteLink href="/privacy" target="_blank" className="text-fg underline decoration-accent-2/60 underline-offset-2">
                              {t.privacyLink}
                            </SiteLink>
                            .
                          </span>
                        </label>
                        {err("consent")}
                        <label className="flex cursor-pointer items-start gap-3 text-sm text-fg/55">
                          <input type="checkbox" className="lead-check mt-0.5" checked={b.updates} onChange={(e) => set("updates", e.target.checked)} />
                          <span>{t.updates}</span>
                        </label>
                      </div>
                      {TURNSTILE_KEY && ENDPOINT && <div ref={tsRef} className="min-h-[65px]" />}
                      {status === "error" && (
                        <p role="alert" className="rounded-xl border border-[#fb7185]/30 bg-[#fb7185]/10 p-3 text-sm text-[#fecdd3]">
                          {t.error}
                        </p>
                      )}
                    </fieldset>
                  )}

                  <div className="mt-10 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => go(step - 1)}
                      className={`text-sm font-semibold text-fg/55 transition-colors hover:text-fg ${step === 0 ? "invisible" : ""}`}
                    >
                      &larr; {t.back}
                    </button>
                    {step < 3 ? (
                      <button type="button" onClick={next} className="lead-next group inline-flex items-center gap-2 rounded-full bg-fg px-7 py-3.5 text-sm font-semibold text-bg shadow-[0_0_40px_rgba(124,92,255,0.45)] transition-transform hover:scale-[1.03]">
                        {t.next}
                        <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={submit}
                        disabled={status === "sending"}
                        className="lead-next group inline-flex items-center gap-2 rounded-full bg-fg px-7 py-3.5 text-sm font-semibold text-bg shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-transform hover:scale-[1.03] disabled:opacity-60"
                      >
                        {status === "sending" ? t.sending : t.send}
                        <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Live brief */}
            <aside className="relative hidden border-l border-white/[0.07] bg-white/[0.015] p-8 lg:block">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-fg/45">{t.summary}</span>
                <span className="flex items-center gap-1.5 font-mono text-[0.625rem] text-accent-5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-5" />
                  live
                </span>
              </div>
              {summary.length === 0 ? (
                <p className="mt-6 text-sm leading-relaxed text-fg/35">{t.empty}</p>
              ) : (
                <dl className="mt-6 space-y-4">
                  {summary.map(([k, v]) => (
                    <div key={k} className="lead-line">
                      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-fg/35">{k}</dt>
                      <dd className="mt-1 line-clamp-3 break-words text-sm text-fg/85">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
