import type { NextConfig } from "next";

// GitHub Pages serves this repo from a /caide subpath and can only serve a
// static export, so the GitHub Actions workflow builds with GITHUB_PAGES=true.
// A Vercel deploy (full SSR/dynamic features) uses the default config below.
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  /* config options here */
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath: "/caide",
        assetPrefix: "/caide",
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
