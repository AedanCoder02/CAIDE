export const LOCALES = ["en", "es", "pt-BR", "pt", "fr", "it", "de", "ja", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

// Native names for the switcher. Short codes show on the nav button.
export const LOCALE_INFO: Record<Locale, { code: string; name: string; html: string }> = {
  en: { code: "EN", name: "English", html: "en" },
  es: { code: "ES", name: "Español (Latinoamérica)", html: "es-419" },
  "pt-BR": { code: "BR", name: "Português (Brasil)", html: "pt-BR" },
  pt: { code: "PT", name: "Português (Portugal)", html: "pt-PT" },
  fr: { code: "FR", name: "Français", html: "fr" },
  it: { code: "IT", name: "Italiano", html: "it" },
  de: { code: "DE", name: "Deutsch", html: "de" },
  ja: { code: "JA", name: "日本語", html: "ja" },
  zh: { code: "ZH", name: "简体中文", html: "zh-CN" },
};

// Picks a locale from ?lang=, then the browser's language list, using the time
// zone only to split Brazilian from European Portuguese. Runs entirely on the
// device: no IP lookup, no network request, nothing stored.
// Self-contained on purpose: it is also inlined as a pre-paint script.
export function detectLocale(): string {
  const supported = ["en", "es", "pt-BR", "pt", "fr", "it", "de", "ja", "zh"];
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q && supported.indexOf(q) > -1) return q;
  } catch {}
  let tz = "";
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {}
  const langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"]) as readonly string[];
  for (let i = 0; i < langs.length; i++) {
    const l = (langs[i] || "").toLowerCase();
    const base = l.split("-")[0];
    if (base === "en") return "en";
    if (base === "pt") {
      if (l === "pt-br") return "pt-BR";
      if (l === "pt-pt" || l === "pt-ao" || l === "pt-mz") return "pt";
      return tz.indexOf("America/") === 0 ? "pt-BR" : "pt";
    }
    if (base === "es" || base === "fr" || base === "it" || base === "de" || base === "ja" || base === "zh") return base;
  }
  return "en";
}
