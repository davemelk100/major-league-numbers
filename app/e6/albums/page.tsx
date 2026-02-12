import type { Metadata } from "next";
import { E6AlbumsContent } from "@/components/e6/e6-albums-content";

export const metadata: Metadata = {
  title: "Releases",
  description: "Browse releases from the Elephant 6 Recording Company catalog.",
};

export default function E6AlbumsPage() {
  return <E6AlbumsContent />;
}
