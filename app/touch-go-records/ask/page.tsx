import type { Metadata } from "next";
import { GbvChatContent } from "@/components/amrep/amrep-chat-content";

export const metadata: Metadata = {
  title: "ChatTGR",
  description: "Ask questions about Touch & Go Records and its artists.",
};

export default function TouchGoRecordsAskPage() {
  return <GbvChatContent />;
}
