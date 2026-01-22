import type { Metadata } from "next";
import { GbvSourcesContent } from "@/components/gbv/gbv-sources-content";

export const metadata: Metadata = {
  title: "Sources",
  description: "Data sources and references used for Guided By Data.",
};

export default function GbvSourcesPage() {
  return <GbvSourcesContent />;
}
