import type React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { GbvHeader } from "@/components/gbv/gbv-header";
import { GbvFooter } from "@/components/gbv/gbv-footer";
import { GbvLeftNav, GbvFooterNav } from "@/components/gbv/gbv-nav";
import { PageLoader } from "@/components/page-loader";

export const metadata: Metadata = {
  title: {
    default: "Guided By Numbers",
    template: "%s | Guided By Numbers",
  },
  description:
    "Explore Guided By Voices discography, albums, songs, and band history.",
  metadataBase: new URL("https://guidedbynumbers.com"),
  alternates: {
    canonical: "/gbv",
  },
  keywords: [
    "Guided By Voices",
    "GBV",
    "Robert Pollard",
    "indie rock",
    "lo-fi",
    "discography",
    "albums",
    "songs",
  ],
  authors: [{ name: "Guided By Numbers" }],
  openGraph: {
    title: "Guided By Numbers",
    description:
      "Explore Guided By Voices discography, albums, songs, and band history.",
    url: "https://guidedbynumbers.com",
    siteName: "Guided By Numbers",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guided By Numbers",
    description:
      "Explore Guided By Voices discography, albums, songs, and band history.",
  },
};

export default function GbvLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GbvLeftNav />
      <div className="sm:ml-20 flex flex-col flex-1">
        <GbvHeader />
        <Suspense fallback={<PageLoader />}>
          <div className="pb-16 sm:pb-0 flex-1">{children}</div>
        </Suspense>
        <GbvFooter />
      </div>
      <GbvFooterNav />
    </>
  );
}
