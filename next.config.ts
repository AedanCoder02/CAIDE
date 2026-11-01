import type { NextConfig } from "next";

// GitHub Pages serves this repo from a /CAIDE subpath (exact case — the repo's
// canonical name is uppercase, and GitHub Pages paths are case-sensitive) and
// can only serve a static export, so the GitHub Actions workflow builds with
// GITHUB_PAGES=true. A Vercel deploy (full SSR/dynamic features) uses the
// default config below.
const isGithubPages = process.env.GITHUB_PAGES === "true";
// Cloudflare (Workers static assets, see wrangler.jsonc) serves the same static
// export from the domain root, so it needs no basePath.
const isCloudflare = process.env.CLOUDFLARE === "true";

const nextConfig: NextConfig = {
  /* config options here */
  ...(isGithubPages || isCloudflare
    ? {
        output: "export" as const,
        ...(isGithubPages ? { basePath: "/CAIDE", assetPrefix: "/CAIDE" } : {}),
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        cacheComponents: true,
        partialPrefetching: true,
      }),
  transpilePackages: ["three"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
