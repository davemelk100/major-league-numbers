import type { Metadata } from "next";
import { GbvSideProjectsContent } from "@/components/gbv/gbv-side-projects-content";

export const metadata: Metadata = {
  title: "Side Projects",
  description: "Robert Pollard side projects and discography highlights.",
};

export default function GbvSideProjectsPage() {
  return <GbvSideProjectsContent />;
}
