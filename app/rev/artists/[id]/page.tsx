import type { Metadata } from "next";
import { RevMemberDetailContent } from "@/components/rev/rev-member-detail-content";
import { getRevArtistById } from "@/lib/rev-artists-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const artist = getRevArtistById(id);
  return {
    title: artist?.name ?? "Band",
    description: artist
      ? `${artist.name} discography and information on Revelation Records.`
      : "Revelation Records band details.",
  };
}

export default async function RevMemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <RevMemberDetailContent memberId={id} />;
}
