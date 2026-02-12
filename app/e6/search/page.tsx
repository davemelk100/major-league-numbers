import type { Metadata } from "next";
import { SiteSearchContent } from "@/components/music-site/site-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Elephant 6 Recording Company artists and releases.",
};

export default function E6SearchPage() {
  return <SiteSearchContent />;
}
