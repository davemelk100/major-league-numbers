import type { Metadata } from "next";
import { TouchGoRecordsAlbumDetailContent } from "@/components/touch-go-records/touch-go-records-album-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Release ${id}`,
    description: "Touch & Go Records release details.",
  };
}

export default async function TouchGoRecordsAlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <TouchGoRecordsAlbumDetailContent albumId={id} />;
}
