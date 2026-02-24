import type { Metadata } from "next";
import { JawboxAlbumsContent } from "@/components/jawbox/jawbox-albums-content";

export const metadata: Metadata = {
  title: "Releases",
  description: "Browse releases from the Jawbox catalog.",
};

export default function JawboxAlbumsPage() {
  return <JawboxAlbumsContent />;
}
