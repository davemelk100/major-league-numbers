import type { Metadata } from "next";
import { SlapAHamRecordsAlbumDetailContent } from "@/components/slap-a-ham-records/slap-a-ham-records-album-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Release ${id}`,
    description: "Slap-A-Ham Numbers release details.",
  };
}

export default async function SlapAHamRecordsAlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <SlapAHamRecordsAlbumDetailContent albumId={id} />;
}
