import type { Metadata } from "next";
import { TestGithubCommitAlbumDetailContent } from "@/components/test-github-commit/test-github-commit-album-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Release ${id}`,
    description: "Test GitHub Commit release details.",
  };
}

export default async function TestGithubCommitAlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <TestGithubCommitAlbumDetailContent albumId={id} />;
}
