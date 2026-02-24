import type { Metadata } from "next";
import { SiteTimelineContent } from "@/components/music-site/site-timeline-content";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Key milestones in Jawbox history.",
};

export default function JawboxTimelinePage() {
  return <SiteTimelineContent />;
}
