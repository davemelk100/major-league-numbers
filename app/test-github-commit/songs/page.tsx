import type { Metadata } from "next";
import { GbvSongsContent } from "@/components/amrep/amrep-songs-content";

export const metadata: Metadata = {
  title: "Songs",
  description: "Tracks and song data from the Test GitHub Commit catalog.",
};

export default function TestGithubCommitSongsPage() {
  return <GbvSongsContent />;
}
