import type { Metadata } from "next";
import { DischordMemberDetailContent } from "@/components/dischord/dischord-member-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Artist ${id}`,
    description: "Dischord Records artist details.",
  };
}

export default async function DischordMemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <DischordMemberDetailContent memberId={id} />;
}
