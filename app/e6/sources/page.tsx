import type { Metadata } from "next";
import { SiteSourcesContent } from "@/components/music-site/site-sources-content";

export const metadata: Metadata = {
  title: "Sources",
  description: "Data sources for the Elephant 6 Recording Company site.",
};

export default function E6SourcesPage() {
  return <SiteSourcesContent />;
}
