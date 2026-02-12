import type { Metadata } from "next";
import { E6MemberDetailContent } from "@/components/e6/e6-member-detail-content";
import { getE6ArtistById } from "@/lib/e6-artists-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const artist = getE6ArtistById(id);
  return {
    title: artist?.name ?? "Artist",
    description: artist
      ? `${artist.name} discography and information on Elephant 6 Recording Co.`
      : "Elephant 6 Recording Company artist details.",
  };
}

export default async function E6MemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <E6MemberDetailContent memberId={id} />;
}
