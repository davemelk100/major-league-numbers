import type { Metadata } from "next";
import { GbvChatContent } from "@/components/amrep/amrep-chat-content";

export const metadata: Metadata = {
  title: "Ask TGC",
  description: "Ask questions about Test GitHub Commit and its artists.",
};

export default function TestGithubCommitAskPage() {
  return <GbvChatContent />;
}
