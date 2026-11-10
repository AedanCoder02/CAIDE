import type { MetadataRoute } from "next";
import { LOCALES, LOCALE_INFO, SITE } from "@/i18n/config";

export const dynamic = "force-static";

// Every indexable page. Each home language lists its siblings so search engines
// serve the right language; the legal pages exist in English only.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LOCALES.map((l) => [LOCALE_INFO[l].html, `${SITE}/${l}/`]));
  const home = (url: string) => ({ url, changeFrequency: "monthly" as const, priority: 1, alternates: { languages } });
  return [
    home(`${SITE}/`),
    ...LOCALES.map((l) => home(`${SITE}/${l}/`)),
    ...["privacy", "terms", "cookies", "refunds", "msa", "dpa"].map((p) => ({ url: `${SITE}/${p}/`, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
