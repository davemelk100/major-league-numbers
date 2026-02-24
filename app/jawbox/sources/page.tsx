import type { Metadata } from "next";
import { SiteSourcesContent } from "@/components/music-site/site-sources-content";

export const metadata: Metadata = {
  title: "Sources",
  description: "Data sources for the Jawbox site.",
};

export default function JawboxSourcesPage() {
  return <SiteSourcesContent />;
}
