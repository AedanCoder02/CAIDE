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
      <p role="alert" className="mt-2 text-xs text-[#fb7185]">
        {errors[k]}
      </p>
    ) : null;

  // Option tile: a square marker for multi-select, a round one for single.
  const opt = (on: boolean, onClick: () => void, text: string, key: number, multi = false) => (
    <button
      key={key}
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`lead-opt group flex items-center gap-2.5 rounded-2xl border px-3 py-3 text-left text-[0.8125rem] leading-snug sm:gap-3 sm:px-4 sm:text-sm transition-[border-color,background-color,color] duration-300 ${
        on ? "border-accent-2/70 bg-accent-2/[0.08] text-fg" : "border-white/[0.09] bg-white/[0.02] text-fg/70 hover:border-white/30 hover:text-fg"
      }`}
    >
      <span
        aria-hidden
        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors duration-300 ${multi ? "rounded-[5px]" : "rounded-full"} ${
          on ? "border-accent-2 bg-accent-2" : "border-white/30"
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full bg-[#07061a] transition-transform duration-300 ${on ? "scale-100" : "scale-0"}`} />
      </span>
      {text}
    </button>
  );
  const field = "lead-field w-full border-0 border-b border-white/15 bg-transparent px-0 py-3 text-base text-fg placeholder:text-fg/25 outline-none transition-colors focus:border-accent-2 sm:text-lg";
  const label = "block text-left font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-fg/45";

  // Enter moves on from any single-line field.
  const onKey = (e: React.KeyboardEvent) => {
    const el = e.target as HTMLElement;
    if (e.key !== "Enter" || el.tagName !== "INPUT" || (el as HTMLInputElement).type === "checkbox") return;
    e.preventDefault();
    if (step < 3) next();
    else submit();
  };

  const fill = (i: number) => (done || i < step ? 1 : i === step ? 0.4 : 0);

  return (
    <div className="lead mx-auto w-full max-w-6xl text-left">
      <div className="lead-shell rounded-[2rem] p-px">
        <div className="grid overflow-hidden rounded-[calc(2rem-1px)] bg-[#07061a] lg:grid-cols-[minmax(0,1fr)_21rem]">
          {/* Steps */}
          <div ref={bodyRef} onKeyDown={onKey} className="relative p-6 sm:p-12">
            <input ref={honeypot} type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            {/* Counter and segmented progress */}
            <div className="flex items-end gap-6">
              <p className="shrink-0 font-semibold leading-none tracking-tight" aria-live="polite">
                <span className="text-gradient text-5xl sm:text-6xl">{done ? "✓" : `0${step + 1}`}</span>
                {!done && <span className="ml-1 font-mono text-sm text-fg/30">/04</span>}
              </p>
              <ol className="flex flex-1 gap-1.5 pb-1.5">
                {t.steps.map((s, i) => (
                  <li key={i} className="flex-1">
                    <button
                      type="button"
                      disabled={done || i >= step}
                      onClick={() => go(i)}
                      aria-label={s}
                      className="block w-full py-2 disabled:cursor-default"
                    >
                      <span className="block h-[3px] overflow-hidden rounded-full bg-white/10">
                        <span className="lead-rail block h-full origin-left rounded-full" style={{ transform: `scaleX(${fill(i)})` }} />
                      </span>
                    </button>
                    <span className={`hidden truncate font-mono text-[0.625rem] uppercase tracking-[0.16em] sm:block ${i === step && !done ? "text-fg/75" : "text-fg/30"}`}>
                      {s}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 min-h-[22rem] sm:mt-12">
              {done ? (
                <div key="done" className="lead-step-in" style={{ ["--dir" as string]: 1 }}>
                  <h3 className="text-3xl font-semibold tracking-tight sm:text-5xl">{status === "sent" ? t.doneTitle : t.mailTitle}</h3>
                  <p className="mt-4 max-w-lg text-fg/65">
                    {status === "sent" ? t.doneSub.replace("{name}", b.name.split(" ")[0]).replace("{email}", b.email) : t.mailSub}
                  </p>
                  <ol className="mt-10 grid gap-3 sm:grid-cols-3">
                    {t.after.map((a, i) => (
                      <li key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                        <span className="font-mono text-[0.625rem] tracking-[0.2em] text-accent-2">0{i + 1}</span>
                        <p className="mt-2 text-sm text-fg/80">{a}</p>
                      </li>
                    ))}
                  </ol>
                  <button type="button" onClick={reset} className="mt-10 text-sm font-semibold text-fg/60 underline-offset-4 hover:text-fg hover:underline">
                    {t.again}
                  </button>
                </div>
              ) : (
                <div key={step} className="lead-step-in" style={{ ["--dir" as string]: dir }}>
                  {step === 0 && (
                    <fieldset>
                      <legend className="text-3xl font-semibold tracking-tight sm:text-5xl">{t.needQ}</legend>
                      <p className="mt-3 text-sm text-fg/45">{t.needHint}</p>
                      <div className="mt-8 grid grid-cols-2 gap-2 sm:gap-2.5 xl:grid-cols-3">
                        {t.needs.map((n, i) => {
                          const on = b.needs.includes(i);
                          return opt(on, () => set("needs", on ? b.needs.filter((x) => x !== i) : [...b.needs, i]), n, i, true);
                        })}
                      </div>
                      {err("needs")}
                    </fieldset>
                  )}

                  {step === 1 && (
                    <fieldset className="space-y-8">
                      <legend className="mb-8 text-3xl font-semibold tracking-tight sm:text-5xl">{t.bizQ}</legend>
                      <div className="grid gap-8 sm:grid-cols-2">
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
                        <div className="mt-3 grid grid-cols-2 gap-2 xl:grid-cols-3">
                          {t.industries.map((n, i) => opt(b.industry === i, () => set("industry", i), n, i))}
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
                    <fieldset className="space-y-8">
                      <legend className="mb-8 text-3xl font-semibold tracking-tight sm:text-5xl">{t.projectQ}</legend>
                      {(
                        [
                          ["timeline", t.timeline, t.timelines],
                          ["brand", t.brand, t.brands],
                          ["budget", t.budget, t.budgets],
                        ] as const
                      ).map(([k, l, opts]) => (
                        <div key={k}>
                          <span className={label}>{l}</span>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {opts.map((n, i) => opt(b[k] === i, () => set(k, i), n, i))}
                          </div>
                          {err(k)}
                        </div>
                      ))}
                      <div>
                        <label htmlFor="lead-idea" className={label}>{t.idea}</label>
                        <textarea id="lead-idea" rows={3} maxLength={2000} className={`${field} resize-none`} value={b.idea} placeholder={t.ideaPh} onChange={(e) => set("idea", e.target.value)} />
                        {err("idea")}
                      </div>
                    </fieldset>
                  )}

                  {step === 3 && (
                    <fieldset className="space-y-8">
                      <legend className="mb-8 text-3xl font-semibold tracking-tight sm:text-5xl">{t.contactQ}</legend>
                      <div className="grid gap-8 sm:grid-cols-2">
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
                          <div className="mt-3 flex flex-wrap gap-2">
                            {t.prefers.map((n, i) => opt(b.prefer === i, () => set("prefer", i), n, i))}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
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

                  <div className="mt-12 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => go(step - 1)}
                      aria-label={t.back}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-fg/70 transition-colors hover:border-white/40 hover:text-fg ${step === 0 ? "hidden" : ""}`}
                    >
                      <span aria-hidden>&larr;</span>
                    </button>
                    <button
                      type="button"
                      onClick={step < 3 ? next : submit}
                      disabled={status === "sending"}
                      className="lead-next group inline-flex h-12 items-center gap-3 rounded-full pl-7 pr-2 text-sm font-semibold text-[#07061a] transition-transform hover:scale-[1.02] disabled:opacity-60"
                    >
                      {step < 3 ? t.next : status === "sending" ? t.sending : t.send}
                      <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full bg-[#07061a] text-fg transition-transform group-hover:translate-x-0.5">
                        &rarr;
                      </span>
                    </button>
                    <span aria-hidden className="ml-2 hidden font-mono text-[0.625rem] uppercase tracking-[0.18em] text-fg/30 lg:inline">
                      Enter &crarr;
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live brief, styled as a receipt */}
          <aside className="relative hidden border-l border-dashed border-white/[0.09] p-8 lg:block">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-fg/45">{t.summary}</span>
              <span className="flex items-center gap-1.5 font-mono text-[0.625rem] text-accent-5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-5" />
                live
              </span>
            </div>
            {summary.length === 0 ? (
              <p className="mt-8 text-sm leading-relaxed text-fg/35">{t.empty}</p>
            ) : (
              <dl className="mt-6 divide-y divide-dashed divide-white/[0.08]">
                {summary.map(([k, v]) => (
                  <div key={k} className="lead-line py-3">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-fg/35">{k}</dt>
                    <dd className="mt-1 line-clamp-3 break-words text-sm text-fg/85">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
