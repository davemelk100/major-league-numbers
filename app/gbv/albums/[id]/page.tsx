import type { Metadata } from "next";
import { GbvAlbumDetailContent } from "@/components/gbv/gbv-album-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Album ${id}`,
    description: "Guided By Voices album details from Discogs.",
  };
}

export default async function GbvAlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <GbvAlbumDetailContent albumId={id} />;
}
