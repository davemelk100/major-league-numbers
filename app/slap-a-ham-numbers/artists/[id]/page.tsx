import type { Metadata } from "next";
import { SlapAHamNumbersMemberDetailContent } from "@/components/slap-a-ham-numbers/slap-a-ham-numbers-member-detail-content";

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

export default async function SlapAHamNumbersMemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <SlapAHamNumbersMemberDetailContent memberId={id} />;
}
