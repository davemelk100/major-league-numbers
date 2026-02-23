import type { Metadata } from "next";
import { DischordAlbumsContent } from "@/components/dischord/dischord-albums-content";

export const metadata: Metadata = {
  title: "Releases",
  description: "Browse releases from the Dischord Records catalog.",
};

export default function DischordAlbumsPage() {
  return <DischordAlbumsContent />;
}
