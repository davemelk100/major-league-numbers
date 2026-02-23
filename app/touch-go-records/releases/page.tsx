import type { Metadata } from "next";
import { TouchGoRecordsAlbumsContent } from "@/components/touch-go-records/touch-go-records-albums-content";

export const metadata: Metadata = {
  title: "Releases",
  description: "Browse releases from the Touch & Go Records catalog.",
};

export default function TouchGoRecordsAlbumsPage() {
  return <TouchGoRecordsAlbumsContent />;
}
