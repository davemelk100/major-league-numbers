import type { Metadata } from "next";
import { SiteVideosContent } from "@/components/music-site/site-videos-content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Video highlights from the AmRep catalog.",
};

export default function AmrepVideosPage() {
  return <SiteVideosContent />;
}
