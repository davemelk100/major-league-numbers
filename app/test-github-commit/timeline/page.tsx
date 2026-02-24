import type { Metadata } from "next";
import { SiteTimelineContent } from "@/components/music-site/site-timeline-content";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Key milestones in Test GitHub Commit history.",
};

export default function TestGithubCommitTimelinePage() {
  return <SiteTimelineContent />;
}
