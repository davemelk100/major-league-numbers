import type { Metadata } from "next";
import { SiteSearchContent } from "@/components/music-site/site-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Touch & Go Records artists and releases.",
};

export default function TouchGoRecordsSearchPage() {
  return <SiteSearchContent />;
}
