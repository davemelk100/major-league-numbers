import type { Metadata } from "next";
import { SiteSearchContent } from "@/components/music-site/site-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Slap-A-Ham Numbers artists and releases.",
};

export default function SlapAHamRecordsSearchPage() {
  return <SiteSearchContent />;
}
