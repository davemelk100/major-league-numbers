import type { Metadata } from "next";
import { RevAlbumDetailContent } from "@/components/rev/rev-album-detail-content";
import { getRevReleaseByCatalogNumber } from "@/lib/rev-discography-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const release = getRevReleaseByCatalogNumber(parseInt(id, 10));
  if (release) {
    return {
      title: `${release.artist} — ${release.title}`,
      description: `${release.artist} - ${release.title} (${release.year}) on Revelation Records.`,
    };
  }
  return {
    title: `Release ${id}`,
    description: "Revelation Records release details.",
  };
}

export default async function RevAlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <RevAlbumDetailContent albumId={id} />;
}
