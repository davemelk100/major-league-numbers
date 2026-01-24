import type { Metadata } from "next";
import { SiteSourcesContent } from "@/components/music-site/site-sources-content";

export const metadata: Metadata = {
  title: "Sources",
  description: "Data sources and references used for Guided By Data.",
};

export default function GbvSourcesPage() {
  return <SiteSourcesContent />;
}
