import type { Metadata } from "next";
import { DischordMembersContent } from "@/components/dischord/dischord-members-content";

export const metadata: Metadata = {
  title: "Artists",
  description: "Explore the Dischord Records artist roster.",
};

export default function DischordMembersPage() {
  return <DischordMembersContent />;
}
