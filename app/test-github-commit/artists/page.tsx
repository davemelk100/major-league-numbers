import type { Metadata } from "next";
import { TestGithubCommitMembersContent } from "@/components/test-github-commit/test-github-commit-members-content";

export const metadata: Metadata = {
  title: "Artists",
  description: "Explore the Test GitHub Commit artist roster.",
};

export default function TestGithubCommitMembersPage() {
  return <TestGithubCommitMembersContent />;
}
