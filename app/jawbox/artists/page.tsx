import type { Metadata } from "next";
import { JawboxMembersContent } from "@/components/jawbox/jawbox-members-content";

export const metadata: Metadata = {
  title: "Artists",
  description: "Explore the Jawbox artist roster.",
};

export default function JawboxMembersPage() {
  return <JawboxMembersContent />;
}
