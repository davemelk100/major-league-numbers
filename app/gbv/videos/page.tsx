import type { Metadata } from "next";
import { GbvVideosContent } from "@/components/gbv/gbv-videos-content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch Guided By Voices music videos and live performances.",
};

export default function GbvVideosPage() {
  return <GbvVideosContent />;
}
