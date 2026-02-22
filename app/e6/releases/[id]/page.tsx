import type { Metadata } from "next";
import { E6AlbumDetailContent } from "@/components/e6/e6-album-detail-content";
import { getE6ReleaseByCatalogNumber } from "@/lib/e6-discography-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const release = getE6ReleaseByCatalogNumber(parseInt(id, 10));
  if (release) {
    return {
      title: `${release.artist} — ${release.title}`,
      description: `${release.artist} - ${release.title} (${release.year}) on Elephant 6 Recording Co.`,
    };
  }
  return {
    title: `Release ${id}`,
    description: "Elephant 6 Recording Company release details.",
  };
}

export default async function E6AlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <E6AlbumDetailContent albumId={id} />;
}
