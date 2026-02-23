import type { Metadata } from "next";
import { SlapAHamRecordsAlbumsContent } from "@/components/slap-a-ham-records/slap-a-ham-records-albums-content";

export const metadata: Metadata = {
  title: "Releases",
  description: "Browse releases from the Slap-A-Ham Numbers catalog.",
};

export default function SlapAHamRecordsAlbumsPage() {
  return <SlapAHamRecordsAlbumsContent />;
}
