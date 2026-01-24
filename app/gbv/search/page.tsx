import type { Metadata } from "next";
import { SiteSearchContent } from "@/components/music-site/site-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Guided By Voices albums and members.",
};

export default function GbvSearchPage() {
  return <SiteSearchContent />;
}
