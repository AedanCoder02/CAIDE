export const LOCALES = ["en", "es", "pt-BR", "pt", "fr", "it", "de", "ja", "zh"] as const;

// Public origin for absolute share URLs. Change when a custom domain is added.
export const SITE = "https://aedancoder02.github.io/CAIDE";
export type Locale = (typeof LOCALES)[number];

// Native names for the switcher. Short codes show on the nav button.
export const LOCALE_INFO: Record<Locale, { code: string; name: string; html: string; og: string }> = {
  en: { code: "EN", name: "English", html: "en", og: "en_US" },
  es: { code: "ES", name: "Español (Latinoamérica)", html: "es-419", og: "es_LA" },
  "pt-BR": { code: "BR", name: "Português (Brasil)", html: "pt-BR", og: "pt_BR" },
  pt: { code: "PT", name: "Português (Portugal)", html: "pt-PT", og: "pt_PT" },
  fr: { code: "FR", name: "Français", html: "fr", og: "fr_FR" },
  it: { code: "IT", name: "Italiano", html: "it", og: "it_IT" },
  de: { code: "DE", name: "Deutsch", html: "de", og: "de_DE" },
  ja: { code: "JA", name: "日本語", html: "ja", og: "ja_JP" },
  zh: { code: "ZH", name: "简体中文", html: "zh-CN", og: "zh_CN" },
};

// Picks a locale from the address (/es/ or ?lang=es), then the browser's language list, using the time
// zone only to split Brazilian from European Portuguese. Runs entirely on the
// device: no IP lookup, no network request, nothing stored.
// Self-contained on purpose: it is also inlined as a pre-paint script.
export function detectLocale(): string {
  const supported = ["en", "es", "pt-BR", "pt", "fr", "it", "de", "ja", "zh"];
  try {
    const seg = window.location.pathname.replace(/\/+$/, "").split("/").pop() || "";
    if (supported.indexOf(seg) > -1) return seg;
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

/** The locale named by the URL's last path segment ("/CAIDE/es/" -> "es"), if any. */
export function pathLocale(pathname: string): Locale | null {
  const seg = pathname.replace(/\/+$/, "").split("/").pop() || "";
  return (LOCALES as readonly string[]).includes(seg) ? (seg as Locale) : null;
}

/** The address of the home page in a given language, keeping the deploy's base path. */
export function localeHref(pathname: string, l: Locale): string {
  const base = pathLocale(pathname) ? pathname.replace(/\/+$/, "").replace(/\/[^/]+$/, "") : pathname.replace(/\/+$/, "");
  return `${base}/${l}/`;
}
