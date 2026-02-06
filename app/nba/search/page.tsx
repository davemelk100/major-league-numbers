import type { Metadata } from "next";
import { Suspense } from "react";
import { NBASearchContent } from "@/components/nba/nba-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search NBA players and teams.",
};

export default function NBASearchPage() {
  return (
    <Suspense fallback={<div className="container py-6">Loading...</div>}>
      <NBASearchContent />
    </Suspense>
  );
}
