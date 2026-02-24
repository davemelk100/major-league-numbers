import type { Metadata } from "next";
import { GbvChatContent } from "@/components/amrep/amrep-chat-content";

export const metadata: Metadata = {
  title: "ChatJawbox",
  description: "Ask questions about Jawbox and its artists.",
};

export default function JawboxAskPage() {
  return <GbvChatContent />;
}
