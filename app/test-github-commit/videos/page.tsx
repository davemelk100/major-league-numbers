import type { Metadata } from "next";
import { SiteVideosContent } from "@/components/music-site/site-videos-content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Video highlights from the Test GitHub Commit catalog.",
};

export default function TestGithubCommitVideosPage() {
  return <SiteVideosContent />;
}
