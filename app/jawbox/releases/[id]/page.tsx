import type { Metadata } from "next";
import { JawboxAlbumDetailContent } from "@/components/jawbox/jawbox-album-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Release ${id}`,
    description: "Jawbox release details.",
  };
}

export default async function JawboxAlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <JawboxAlbumDetailContent albumId={id} />;
}
