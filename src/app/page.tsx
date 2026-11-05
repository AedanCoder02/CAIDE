import HomePage from "@/components/HomePage";
import { LangProvider } from "@/i18n/LangProvider";
import { SITE } from "@/i18n/config";
import { homeMetadata, homeSchema, jsonLd } from "@/i18n/metadata";

// The bare address serves English previews and detects the visitor's language on the device.
export const metadata = homeMetadata("en", `${SITE}/`);

export default function Home() {
  return (
    <LangProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(homeSchema("en", `${SITE}/`)) }} />
      <HomePage />
    </LangProvider>
  );
}
