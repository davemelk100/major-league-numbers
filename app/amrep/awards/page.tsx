import type { Metadata } from "next";
import { SiteAwardsContent } from "@/components/music-site/site-awards-content";

export const metadata: Metadata = {
  title: "Milestones",
  description: "Milestones and recognition for Amphetamine Reptile Records.",
};

export default function AmrepAwardsPage() {
  return <SiteAwardsContent />;
}
