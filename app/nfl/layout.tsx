import type { Metadata } from "next";
import { SportsSiteLayout } from "@/components/sports-site/sports-layout";
import { UpdatesBanner } from "@/components/updates-banner";

export const metadata: Metadata = {
  title: {
    default: "NFL Numbers",
    template: "%s | NFL Numbers",
  },
  description:
    "Explore NFL player stats, team rosters, and league standings.",
  keywords: [
    "NFL",
    "football",
    "statistics",
    "player stats",
    "team rosters",
    "standings",
    "National Football League",
    "pro football reference",
  ],
};

export default function NFLLayout({ children }: { children: React.ReactNode }) {
  return (
    <SportsSiteLayout banner={<UpdatesBanner />}>
      {children}
    </SportsSiteLayout>
  );
}
