import type { Metadata } from "next";
import { SiteSourcesContent } from "@/components/music-site/site-sources-content";

export const metadata: Metadata = {
  title: "Sources",
  description: "Data sources for the Test GitHub Commit site.",
};

export default function TestGithubCommitSourcesPage() {
  return <SiteSourcesContent />;
}
