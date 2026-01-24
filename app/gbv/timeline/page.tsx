import type { Metadata } from "next";
import { SiteTimelineContent } from "@/components/music-site/site-timeline-content";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Guided By Voices history and timeline.",
};

export default function GbvTimelinePage() {
  return <SiteTimelineContent />;
}
