import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/lib/SmoothScroll";
import { LOCALE_INFO, SITE, detectLocale } from "@/i18n/config";

// A language address (/es/) is already rendered in that language: just set
// html lang. Otherwise hide the page for a moment when the visitor will get a
// translation, so English does not flash first. Removed by LangProvider (or a 2.5s fallback).
const htmlLangs = JSON.stringify(Object.fromEntries(Object.entries(LOCALE_INFO).map(([k, v]) => [k, v.html])));
const preLang = `(function(){try{var r=document.documentElement,h=${htmlLangs},s=location.pathname.replace(/\\/+$/,"").split("/").pop();if(h[s]){r.lang=h[s];return}var l=(${detectLocale.toString()})();if(l!=="en"){r.setAttribute("data-i18n","pending");setTimeout(function(){r.removeAttribute("data-i18n")},2500)}}catch(e){}})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Page titles, descriptions and share previews come from each page (see i18n/metadata.ts).
export const metadata: Metadata = { metadataBase: new URL(SITE) };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preLang }} />
      </head>
      <body id="top" className="min-h-full bg-bg text-fg">
        <div className="relative z-10">
          <div className="noise-overlay" />
          <SmoothScroll>{children}</SmoothScroll>
        </div>
      </body>
    </html>
  );
}
