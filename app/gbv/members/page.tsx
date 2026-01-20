import type { Metadata } from "next";
import { GbvMembersContent } from "@/components/gbv/gbv-members-content";

export const metadata: Metadata = {
  title: "Members",
  description: "All Guided By Voices band members past and present.",
};

export default function GbvMembersPage() {
  return <GbvMembersContent />;
}
