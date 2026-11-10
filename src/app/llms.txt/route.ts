import { LOCALES, LOCALE_INFO, SITE } from "@/i18n/config";
import { DICTS } from "@/i18n/dicts";

export const dynamic = "force-static";

// llms.txt (llmstxt.org): a plain summary for AI assistants that read the site on a
// visitor's behalf. Built from the same English copy as the home page, so it never drifts.
export function GET() {
  const t = DICTS.en;
  const body = [
    "# CAIDE",
    "",
    `> ${t.meta.description}`,
    "",
    t.hero.sub,
    "",
    "## What we build",
    "",
    ...t.services.items.map((s) => `- ${s.title}: ${s.desc}`),
    "",
    "## Pages",
    "",
    `- [Home (English)](${SITE}/en/): services, portfolio, how it works, industries, project brief form`,
    ...LOCALES.filter((l) => l !== "en").map((l) => `- [Home (${LOCALE_INFO[l].name})](${SITE}/${l}/)`),
    "",
    "## Legal",
    "",
    `- [Privacy Policy](${SITE}/privacy/)`,
    `- [Terms of Service](${SITE}/terms/)`,
    `- [Cookie Policy](${SITE}/cookies/)`,
    `- [Refund Policy](${SITE}/refunds/)`,
    `- [Master Services Agreement](${SITE}/msa/)`,
    `- [Data Processing Agreement](${SITE}/dpa/)`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
