import type { Metadata } from "next";
import { DischordAlbumDetailContent } from "@/components/dischord/dischord-album-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Release ${id}`,
    description: "Dischord Records release details.",
  };
}

export default async function DischordAlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <DischordAlbumDetailContent albumId={id} />;
}
