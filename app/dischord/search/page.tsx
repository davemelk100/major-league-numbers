import type { Metadata } from "next";
import { SiteSearchContent } from "@/components/music-site/site-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Dischord Records artists and releases.",
};

export default function DischordSearchPage() {
  return <SiteSearchContent />;
}
