import type { Metadata } from "next";
import { PGASearchContent } from "@/components/pga/pga-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search PGA Tour players.",
};

export default function PGASearchPage() {
  return <PGASearchContent />;
}
