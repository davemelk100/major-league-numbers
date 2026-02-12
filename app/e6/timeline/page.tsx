import type { Metadata } from "next";
import { SiteTimelineContent } from "@/components/music-site/site-timeline-content";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Key milestones in Elephant 6 Recording Company history.",
};

export default function E6TimelinePage() {
  return <SiteTimelineContent />;
}
