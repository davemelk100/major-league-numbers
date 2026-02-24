import type { Metadata } from "next";
import { JawboxMemberDetailContent } from "@/components/jawbox/jawbox-member-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Artist ${id}`,
    description: "Jawbox artist details.",
  };
}

export default async function JawboxMemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <JawboxMemberDetailContent memberId={id} />;
}
