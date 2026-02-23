import type { Metadata } from "next";
import { SiteVideosContent } from "@/components/music-site/site-videos-content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Video highlights from the Dischord Records catalog.",
};

export default function DischordVideosPage() {
  return <SiteVideosContent />;
}
