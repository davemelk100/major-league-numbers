import type { Metadata } from "next";
import { SiteVideosContent } from "@/components/music-site/site-videos-content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Video highlights from the Touch & Go Records catalog.",
};

export default function TouchGoRecordsVideosPage() {
  return <SiteVideosContent />;
}
