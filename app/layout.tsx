import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteNav, SiteFooter } from "@/components/v2/SiteChrome";
import "./globals.css";
import "./v2.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "D8A: the autonomous enterprise",
  description:
    "From business request to governed action, with your team signing off at each step. D8A turns requests into specs, specs into code on your stack, and data into decisions and actions. Join the waitlist.",
  keywords:
    "DataOps, data engineering, AI data platform, data workspace, data team productivity, AI code generation, data pipeline automation",
  openGraph: {
    title: "D8A: the autonomous enterprise",
    description:
      "From business request to governed action, with your team signing off at each step. Join the waitlist.",
    url: "https://d8a.pro",
    siteName: "D8A.pro",
    type: "website",
    images: [
      {
        url: "https://d8a.pro/og-image.png",
        width: 1200,
        height: 630,
        alt: "D8A: the autonomous enterprise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D8A: the autonomous enterprise",
    description:
      "From business request to governed action, with your team signing off at each step.",
    images: ["https://d8a.pro/og-image.png"],
  },
  other: {
    "canonical": "https://d8a.pro",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "D8A.pro",
              applicationCategory: "BusinessApplication",
              description:
                "AI-powered DataOps workspace platform for data engineering teams",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/PreOrder",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-50 focus:rounded-md focus:bg-brand-black focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
