import type { Metadata } from "next";
import { GbvAlbumsContent } from "@/components/gbv/gbv-albums-content";

export const metadata: Metadata = {
  title: "Albums",
  description: "Complete Guided By Voices discography from Discogs.",
};

export default function GbvAlbumsPage() {
  return <GbvAlbumsContent />;
}
