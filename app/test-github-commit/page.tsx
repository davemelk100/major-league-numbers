import type { Metadata } from "next";
import { TestGithubCommitDashboardContent } from "@/components/test-github-commit/test-github-commit-dashboard-content";

export const metadata: Metadata = {
  title: "Test GitHub Commit",
  description:
    "Explore Test GitHub Commit: artist roster, releases, label history, and milestones.",
};

export const revalidate = 60;

export default function TestGithubCommitPage() {
  return <TestGithubCommitDashboardContent />;
}
