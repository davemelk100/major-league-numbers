import type { Metadata } from "next";
import { SportsSiteLayout } from "@/components/sports-site/sports-layout";
import { UpdatesBanner } from "@/components/updates-banner";

export const metadata: Metadata = {
  title: {
    default: "PGA Numbers",
    template: "%s | PGA Numbers",
  },
  description:
    "Explore PGA Tour player stats, tournament results, and rankings.",
  keywords: [
    "PGA",
    "golf",
    "statistics",
    "player stats",
    "tournaments",
    "rankings",
    "PGA Tour",
    "FedEx Cup",
    "majors",
  ],
  openGraph: {
    title: "PGA Numbers",
    description: "Explore PGA Tour player stats, tournament results, and rankings.",
    url: "/pga",
    siteName: "Major League Numbers",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PGA Numbers",
    description: "Explore PGA Tour player stats, tournament results, and rankings.",
  },
};

export default function PGALayout({ children }: { children: React.ReactNode }) {
  return (
    <SportsSiteLayout banner={<UpdatesBanner />}>
      {children}
    </SportsSiteLayout>
  );
}
