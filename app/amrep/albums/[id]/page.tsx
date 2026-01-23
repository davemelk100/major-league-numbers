import type { Metadata } from "next";
import { GbvAlbumDetailContent } from "@/components/amrep/amrep-album-detail-content";

export const metadata: Metadata = {
  title: "Release",
};

export default function AmrepAlbumDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <GbvAlbumDetailContent albumId={params.id} />;
}
