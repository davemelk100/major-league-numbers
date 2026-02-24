import type { Metadata } from "next";
import { GbvSongsContent } from "@/components/amrep/amrep-songs-content";

export const metadata: Metadata = {
  title: "Songs",
  description: "Tracks and song data from the Jawbox catalog.",
};

export default function JawboxSongsPage() {
  return <GbvSongsContent />;
}
