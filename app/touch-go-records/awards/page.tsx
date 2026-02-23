import type { Metadata } from "next";
import { SiteAwardsContent } from "@/components/music-site/site-awards-content";

export const metadata: Metadata = {
  title: "Milestones",
  description: "Milestones and recognition for Touch & Go Records.",
};

export default function TouchGoRecordsAwardsPage() {
  return <SiteAwardsContent />;
}
