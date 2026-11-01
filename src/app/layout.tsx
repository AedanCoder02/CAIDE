import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/lib/SmoothScroll";
import { LangProvider } from "@/i18n/LangProvider";
import { detectLocale } from "@/i18n/config";

// Hides the page for a moment when the visitor will get a translation, so the
// English text does not flash first. Removed by LangProvider (or a 2.5s fallback).
const preLang = `(function(){try{var l=(${detectLocale.toString()})();if(l!=="en"){var r=document.documentElement;r.setAttribute("data-i18n","pending");setTimeout(function(){r.removeAttribute("data-i18n")},2500)}}catch(e){}})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CAIDE | Websites, bookings, apps and AI assistants for your business",
  description:
    "CAIDE designs and builds websites, booking systems, apps, automations, and AI chatbots for restaurants, clinics, hotels, spas, salons, workshops, and every kind of business. In your brand or a new one, worldwide.",
};

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
          <LangProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </LangProvider>
        </div>
      </body>
    </html>
  );
}
