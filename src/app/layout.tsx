import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/lib/SmoothScroll";
import AmbientBackground from "@/components/AmbientBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CAIDE — Web, Automations, Backend, Apps",
  description:
    "CAIDE is a web development studio offering web design, automations, backend engineering, app development, and tech solutions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body id="top" className="min-h-full text-fg">
        <AmbientBackground />
        <div className="relative z-10">
          <div className="noise-overlay" />
          <SmoothScroll>{children}</SmoothScroll>
        </div>
      </body>
    </html>
  );
}
