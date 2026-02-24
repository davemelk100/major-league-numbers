import type { Metadata } from "next";
import { SiteSideProjectsContent } from "@/components/music-site/site-side-projects-content";

export const metadata: Metadata = {
  title: "Side Projects",
  description: "Jawbox side projects and related labels.",
};

export default function JawboxSideProjectsPage() {
  return <SiteSideProjectsContent />;
}
