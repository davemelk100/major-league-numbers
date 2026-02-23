import type { Metadata } from "next";
import { SlapAHamNumbersAlbumDetailContent } from "@/components/slap-a-ham-numbers/slap-a-ham-numbers-album-detail-content";

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

export default async function SlapAHamNumbersAlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <SlapAHamNumbersAlbumDetailContent albumId={id} />;
}
