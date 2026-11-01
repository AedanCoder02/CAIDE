import type { Metadata } from "next";
import { LOCALES, LOCALE_INFO, SITE, type Locale } from "./config";
import { DICTS } from "./dicts";

const languages = {
  ...Object.fromEntries(LOCALES.map((l) => [LOCALE_INFO[l].html, `${SITE}/${l}/`])),
  "x-default": `${SITE}/`,
};

/** Title, description and share-preview tags for the home page in one language. */
export function homeMetadata(l: Locale, url: string): Metadata {
  const t = DICTS[l].meta;
  const image = { url: `${SITE}/og/${l}.png`, width: 1200, height: 630, alt: t.og.join(" ") };
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      siteName: "CAIDE",
      url,
      title: t.title,
      description: t.description,
      locale: LOCALE_INFO[l].og,
      alternateLocale: LOCALES.filter((x) => x !== l).map((x) => LOCALE_INFO[x].og),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description, images: [image.url] },
  };
}
