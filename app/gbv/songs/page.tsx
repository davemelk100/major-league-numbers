import type { Metadata } from "next";
import { GbvSongsContent } from "@/components/gbv/gbv-songs-content";

export const metadata: Metadata = {
  title: "Songs",
  description: "Guided By Voices songs and tracks.",
};

export default function GbvSongsPage() {
  return <GbvSongsContent />;
}
