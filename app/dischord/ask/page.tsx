import type { Metadata } from "next";
import { GbvChatContent } from "@/components/amrep/amrep-chat-content";

export const metadata: Metadata = {
  title: "Ask Dischord",
  description: "Ask questions about Dischord Records and its artists.",
};

export default function DischordAskPage() {
  return <GbvChatContent />;
}
