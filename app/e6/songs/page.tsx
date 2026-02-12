import type { Metadata } from "next";
import { E6SongsContent } from "@/components/e6/e6-songs-content";

export const metadata: Metadata = {
  title: "Songs",
  description: "Tracks and song data from the Elephant 6 Recording Company catalog.",
};

export default function E6SongsPage() {
  return <E6SongsContent />;
}
