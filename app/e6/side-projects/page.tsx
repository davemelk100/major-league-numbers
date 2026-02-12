import type { Metadata } from "next";
import { SiteSideProjectsContent } from "@/components/music-site/site-side-projects-content";

export const metadata: Metadata = {
  title: "Related Labels",
  description: "Labels and projects related to the Elephant 6 Recording Company.",
};

export default function E6SideProjectsPage() {
  return <SiteSideProjectsContent />;
}
