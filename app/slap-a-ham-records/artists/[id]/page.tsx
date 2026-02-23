import type { Metadata } from "next";
import { SlapAHamRecordsMemberDetailContent } from "@/components/slap-a-ham-records/slap-a-ham-records-member-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Artist ${id}`,
    description: "Slap-A-Ham Numbers artist details.",
  };
}

export default async function SlapAHamRecordsMemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <SlapAHamRecordsMemberDetailContent memberId={id} />;
}
