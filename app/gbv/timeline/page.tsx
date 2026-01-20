import type { Metadata } from "next";
import { GbvTimelineContent } from "@/components/gbv/gbv-timeline-content";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Guided By Voices history and timeline.",
};

export default function GbvTimelinePage() {
  return <GbvTimelineContent />;
}
