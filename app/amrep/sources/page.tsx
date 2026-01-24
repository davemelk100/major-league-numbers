import type { Metadata } from "next";
import { SiteSourcesContent } from "@/components/music-site/site-sources-content";

export const metadata: Metadata = {
  title: "Sources",
  description: "Data sources for the Amphetamine Reptile Records site.",
};

export default function AmrepSourcesPage() {
  return <SiteSourcesContent />;
}
