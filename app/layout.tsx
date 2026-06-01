import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "D8A.pro \u2014 AI-Powered DataOps Workspace for Data Teams",
  description:
    "From data request to production code \u2014 orchestrated by AI, validated by humans. D8A.pro is the workspace where data teams ship faster with AI agents that code, review, and merge. Join the waitlist.",
  keywords:
    "DataOps, data engineering, AI data platform, data workspace, data team productivity, AI code generation, data pipeline automation",
  openGraph: {
    title: "D8A.pro \u2014 AI-Powered DataOps Workspace",
    description:
      "From data request to production code. AI agents that code, review, and merge \u2014 with humans in the loop. Join the waitlist.",
    url: "https://d8a.pro",
    siteName: "D8A.pro",
    type: "website",
    images: [
      {
        url: "https://d8a.pro/og-image.png",
        width: 1200,
        height: 630,
        alt: "D8A.pro \u2014 AI-Powered DataOps Workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D8A.pro \u2014 AI-Powered DataOps Workspace",
    description:
      "From data request to production code. AI agents that code, review, and merge \u2014 with humans in the loop.",
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
    <html lang="en" className={`${inter.variable} h-full`}>
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
      <body className="min-h-full antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-50 focus:rounded-md focus:bg-brand-black focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
