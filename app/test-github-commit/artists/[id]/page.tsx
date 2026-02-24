import type { Metadata } from "next";
import { TestGithubCommitMemberDetailContent } from "@/components/test-github-commit/test-github-commit-member-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Artist ${id}`,
    description: "Test GitHub Commit artist details.",
  };
}

export default async function TestGithubCommitMemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <TestGithubCommitMemberDetailContent memberId={id} />;
}
