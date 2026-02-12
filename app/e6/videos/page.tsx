import type { Metadata } from "next";
import { SiteVideosContent } from "@/components/music-site/site-videos-content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Video highlights from the Elephant 6 Recording Company catalog.",
};

export default function E6VideosPage() {
  return <SiteVideosContent />;
}
