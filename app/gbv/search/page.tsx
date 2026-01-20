import type { Metadata } from "next";
import { GbvSearchContent } from "@/components/gbv/gbv-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Guided By Voices albums and members.",
};

export default function GbvSearchPage() {
  return <GbvSearchContent />;
}
