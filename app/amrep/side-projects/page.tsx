import type { Metadata } from "next";
import { SiteSideProjectsContent } from "@/components/music-site/site-side-projects-content";

export const metadata: Metadata = {
  title: "Imprints",
  description: "AmRep imprints, collections, and shop highlights.",
};

export default function AmrepSideProjectsPage() {
  return <SiteSideProjectsContent />;
}
