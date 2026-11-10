#!/usr/bin/env node
// SEO gate for the static export (out/). Fails on: missing sitemap.xml, robots.txt or llms.txt;
// an indexable page without exactly one H1, a <title>, a meta description, a canonical link or
// og:image; skipped heading levels; images without alt; stray noindex; broken internal links.
// Usage: npm run build:cf && node scripts/seo-check.mjs [outDir]
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = process.argv[2] || "out";
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    statSync(p).isDirectory() ? walk(p) : files.push("/" + relative(OUT, p).split("\\").join("/"));
  }
})(OUT);
const have = new Set(files);
const errors = [];

for (const f of ["/sitemap.xml", "/robots.txt", "/llms.txt"]) if (!have.has(f)) errors.push(`missing ${f}`);

const notFound = (p) => /(^|\/)(404|_not-found)(\/|\.html$)/.test(p);
const pages = files.filter((f) => f.endsWith(".html") && !notFound(f));

for (const page of pages) {
  const h = readFileSync(join(OUT, page), "utf8");
  const fail = (m) => errors.push(`${page}: ${m}`);
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(`${h1} H1 tags (need exactly 1)`);
  const levels = [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  levels.forEach((l, i) => i && l > levels[i - 1] + 1 && fail(`heading jumps h${levels[i - 1]} -> h${l}`));
  if (!/<title>[^<]+<\/title>/.test(h)) fail("no <title>");
  if (!/<meta name="description" content="[^"]+"/.test(h)) fail("no meta description");
  if (!/rel="canonical"/.test(h)) fail("no canonical link");
  if (!/property="og:image"/.test(h)) fail("no og:image");
  if (/<meta name="robots" content="[^"]*noindex/.test(h)) fail("noindex on an indexable page");
  const noAlt = (h.match(/<img(?![^>]*\balt=)[^>]*>/g) || []).length;
  if (noAlt) fail(`${noAlt} image(s) without alt`);
  for (const [, href] of h.matchAll(/href="(\/[^"#?]*)"/g)) {
    if (href.startsWith("/_next") || href.startsWith("//")) continue;
    const c = href.replace(/\/$/, "");
    if (![href, c, `${c}/index.html`, `${c}.html`].some((x) => have.has(x))) fail(`broken link ${href}`);
  }
}

console.log(`Checked ${pages.length} pages.`);
if (errors.length) {
  for (const e of [...new Set(errors)]) console.error(`::error::${e}`);
  process.exit(1);
}
console.log("SEO checks passed.");
