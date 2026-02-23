import type { Metadata } from "next";
import { GbvChatContent } from "@/components/amrep/amrep-chat-content";

export const metadata: Metadata = {
  title: "ChatSlapAHam",
  description: "Ask questions about Slap-A-Ham Numbers and its artists.",
};

export default function SlapAHamNumbersAskPage() {
  return <GbvChatContent />;
}
