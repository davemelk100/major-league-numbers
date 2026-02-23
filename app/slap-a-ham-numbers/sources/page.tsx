import type { Metadata } from "next";
import { SiteSourcesContent } from "@/components/music-site/site-sources-content";

export const metadata: Metadata = {
  title: "Sources",
  description: "Data sources for the Slap-A-Ham Numbers site.",
};

export default function SlapAHamNumbersSourcesPage() {
  return <SiteSourcesContent />;
}
