import type { Metadata } from "next";
import { SiteAwardsContent } from "@/components/music-site/site-awards-content";

export const metadata: Metadata = {
  title: "Milestones",
  description: "Milestones and recognition for the Elephant 6 Recording Company.",
};

export default function E6AwardsPage() {
  return <SiteAwardsContent />;
}
