import type { Metadata } from "next";
import { SiteVideosContent } from "@/components/music-site/site-videos-content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch Guided By Voices music videos and live performances.",
};

export default function GbvVideosPage() {
  return <SiteVideosContent />;
}
