import type { Metadata } from "next";
import { TouchGoRecordsMembersContent } from "@/components/touch-go-records/touch-go-records-members-content";

export const metadata: Metadata = {
  title: "Artists",
  description: "Explore the Touch & Go Records artist roster.",
};

export default function TouchGoRecordsMembersPage() {
  return <TouchGoRecordsMembersContent />;
}
