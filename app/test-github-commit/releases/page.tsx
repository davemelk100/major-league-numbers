import type { Metadata } from "next";
import { TestGithubCommitAlbumsContent } from "@/components/test-github-commit/test-github-commit-albums-content";

export const metadata: Metadata = {
  title: "Releases",
  description: "Browse releases from the Test GitHub Commit catalog.",
};

export default function TestGithubCommitAlbumsPage() {
  return <TestGithubCommitAlbumsContent />;
}
