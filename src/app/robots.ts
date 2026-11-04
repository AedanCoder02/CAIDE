import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// AI training crawlers may not copy the site. AI search and assistant agents
// (what a prospect's ChatGPT, Claude or Perplexity uses to read us) are allowed,
// so CAIDE can still be found and quoted. The brief API is off limits to all.
// robots.txt is a request, not a wall: enforcement sits in Cloudflare (WAF, rate limit, Turnstile).
const TRAINING_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
  "cohere-ai",
  "cohere-training-data-crawler",
  "Diffbot",
  "Omgilibot",
  "ImagesiftBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: TRAINING_CRAWLERS, disallow: "/" },
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
  };
}
