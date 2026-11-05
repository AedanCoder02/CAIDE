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

/** Canonical address and share preview for an English-only legal page. */
export function legalMetadata(path: string, title: string, description: string): Metadata {
  const url = `${SITE}/${path}/`;
  const image = { url: `${SITE}/og/en.png`, width: 1200, height: 630 };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "CAIDE", url, title, description, locale: "en_US", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/** Structured data (schema.org) for the home page: who CAIDE is and what the site is. */
export function homeSchema(l: Locale, url: string) {
  const t = DICTS[l].meta;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE}/#org`,
        name: "CAIDE",
        url: `${SITE}/`,
        logo: `${SITE}/apple-icon.png`,
        image: `${SITE}/og/${l}.png`,
        description: t.description,
        areaServed: "Worldwide",
        knowsLanguage: LOCALES.map((x) => LOCALE_INFO[x].html),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#site`,
        name: "CAIDE",
        url: `${SITE}/`,
        inLanguage: LOCALES.map((x) => LOCALE_INFO[x].html),
        publisher: { "@id": `${SITE}/#org` },
      },
      { "@type": "WebPage", url, name: t.title, description: t.description, inLanguage: LOCALE_INFO[l].html, isPartOf: { "@id": `${SITE}/#site` } },
    ],
  };
}

/** JSON-LD as a safe inline string ("<" escaped so the text can never close the script tag). */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
