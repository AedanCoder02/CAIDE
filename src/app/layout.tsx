import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/lib/SmoothScroll";

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body id="top" className="min-h-full bg-bg text-fg">
        <div className="relative z-10">
          <div className="noise-overlay" />
          <SmoothScroll>{children}</SmoothScroll>
        </div>
      </body>
    </html>
  );
}
