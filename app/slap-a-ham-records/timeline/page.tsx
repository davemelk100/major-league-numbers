import type { Metadata } from "next";
import { SiteTimelineContent } from "@/components/music-site/site-timeline-content";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Key milestones in Slap-A-Ham Numbers history.",
};

export default function SlapAHamRecordsTimelinePage() {
  return <SiteTimelineContent />;
}
