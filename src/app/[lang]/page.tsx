import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import { LangProvider } from "@/i18n/LangProvider";
import { LOCALES, SITE, type Locale } from "@/i18n/config";
import { DICTS } from "@/i18n/dicts";
import { homeMetadata } from "@/i18n/metadata";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const isLocale = (l: string): l is Locale => (LOCALES as readonly string[]).includes(l);

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return homeMetadata(lang, `${SITE}/${lang}/`);
}

export default async function LangHome({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <LangProvider initial={{ locale: lang, t: DICTS[lang] }}>
      <HomePage />
    </LangProvider>
  );
}
