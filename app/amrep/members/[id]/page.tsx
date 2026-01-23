import type { Metadata } from "next";
import { GbvMemberDetailContent } from "@/components/amrep/amrep-member-detail-content";

export const metadata: Metadata = {
  title: "Artist",
};

export default function AmrepMemberDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <GbvMemberDetailContent memberId={params.id} />;
}
