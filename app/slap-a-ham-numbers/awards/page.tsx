import type { Metadata } from "next";
import { SiteAwardsContent } from "@/components/music-site/site-awards-content";

export const metadata: Metadata = {
  title: "Milestones",
  description: "Milestones and recognition for Slap-A-Ham Numbers.",
};

export default function SlapAHamNumbersAwardsPage() {
  return <SiteAwardsContent />;
}
