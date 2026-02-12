import type { Metadata } from "next";
import { GbvChatContent } from "@/components/amrep/amrep-chat-content";

export const metadata: Metadata = {
  title: "ChatE6",
  description: "Ask questions about the Elephant 6 Recording Company and its artists.",
};

export default function E6AskPage() {
  return <GbvChatContent />;
}
