import type { Metadata } from "next";
import { GbvMemberDetailContent } from "@/components/gbv/gbv-member-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Member ${id}`,
    description: "Guided By Voices band member details from Discogs.",
  };
}

export default async function GbvMemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <GbvMemberDetailContent memberId={id} />;
}
