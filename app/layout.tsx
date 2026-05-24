import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SkipLink from "@/components/SkipLink";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Daily — The AI stack, decoded daily | Tejas Kulkarni",
  description:
    "Daily AI news, free courses, and warm job referrals — curated by Tejas Kulkarni. Free, always. Join 12,000+ readers.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Daily — The AI stack, decoded daily",
    description: "Daily AI news, free courses, and warm job referrals — curated by Tejas Kulkarni.",
    url: "/",
    siteName: "AI Daily",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@tejaskulkarni", // TODO: real handle
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Tejas Kulkarni",
      url: "https://ai-daily.example",
      sameAs: [
        "https://www.instagram.com/", // TODO: real handle
        "https://x.com/", // TODO: real handle
      ],
    },
    {
      "@type": "WebSite",
      name: "AI Daily",
      url: "https://ai-daily.example",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SkipLink />
        <TopNav />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
