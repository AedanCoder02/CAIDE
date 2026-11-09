import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LangProvider } from "@/i18n/LangProvider";

export const metadata: Metadata = { title: "Page not found | CAIDE" };

// Branded 404 (Cloudflare serves out/404.html for any unknown address), so a bad link still lands in the site.
export default function NotFound() {
  return (
    <LangProvider>
      <Nav home={false} />
      <main className="wrap flex min-h-[70vh] flex-col items-start justify-center gap-6 pt-32">
        <p className="font-mono text-xs tracking-[0.2em] text-fg/50">404</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">This page does not exist.</h1>
        <p className="max-w-xl text-lg text-fg/70">The link may be old or mistyped. Everything we do is on the home page.</p>
        <Link href="/" className="rounded-full border border-line px-6 py-3 font-mono text-sm text-fg/80 transition-colors hover:border-fg/40 hover:text-fg">
          Back to CAIDE
        </Link>
      </main>
      <Footer home={false} />
    </LangProvider>
  );
}
