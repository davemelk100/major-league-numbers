import type { Metadata } from "next";
import { SiteTimelineContent } from "@/components/music-site/site-timeline-content";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Key milestones in Touch & Go Records history.",
};

export default function TouchGoRecordsTimelinePage() {
  return <SiteTimelineContent />;
}
