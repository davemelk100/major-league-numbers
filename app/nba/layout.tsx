import type { Metadata } from "next";
import { SportsSiteLayout } from "@/components/sports-site/sports-layout";


export const metadata: Metadata = {
  title: {
    default: "NBA Numbers",
    template: "%s | NBA Numbers",
  },
  description:
    "Explore NBA player stats, team rosters, and league standings.",
  keywords: [
    "NBA",
    "basketball",
    "statistics",
    "player stats",
    "team rosters",
    "standings",
    "National Basketball Association",
    "basketball reference",
  ],
  openGraph: {
    title: "NBA Numbers",
    description: "Explore NBA player stats, team rosters, and league standings.",
    url: "/nba",
    siteName: "Major League Numbers",
    images: [
      {
        url: "/og-nba.png",
        width: 1200,
        height: 630,
        alt: "NBA Numbers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NBA Numbers",
    description: "Explore NBA player stats, team rosters, and league standings.",
    images: ["/og-nba.png"],
  },
};

export default function NBALayout({ children }: { children: React.ReactNode }) {
  return (
    <SportsSiteLayout>
      {children}
    </SportsSiteLayout>
  );
}
