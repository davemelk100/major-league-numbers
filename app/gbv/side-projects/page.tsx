import type { Metadata } from "next";
import { SiteSideProjectsContent } from "@/components/music-site/site-side-projects-content";

export const metadata: Metadata = {
  title: "Side Projects",
  description: "Robert Pollard side projects and discography highlights.",
};

export default function GbvSideProjectsPage() {
  return <SiteSideProjectsContent />;
}
