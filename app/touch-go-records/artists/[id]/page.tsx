import type { Metadata } from "next";
import { TouchGoRecordsMemberDetailContent } from "@/components/touch-go-records/touch-go-records-member-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Artist ${id}`,
    description: "Touch & Go Records artist details.",
  };
}

export default async function TouchGoRecordsMemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <TouchGoRecordsMemberDetailContent memberId={id} />;
}
