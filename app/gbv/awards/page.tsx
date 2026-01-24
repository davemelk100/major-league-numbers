import type { Metadata } from "next";
import { SiteAwardsContent } from "@/components/music-site/site-awards-content";

export const metadata: Metadata = {
  title: "Awards",
  description: "Guided By Voices awards and recognition.",
};

export default function GbvAwardsPage() {
  return <SiteAwardsContent />;
}
