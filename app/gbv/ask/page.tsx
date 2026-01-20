import type { Metadata } from "next";
import { GbvChatContent } from "@/components/gbv/gbv-chat-content";

export const metadata: Metadata = {
  title: "Chat GBV",
  description: "Ask questions about Guided By Voices.",
};

export default function GbvAskPage() {
  return <GbvChatContent />;
}
