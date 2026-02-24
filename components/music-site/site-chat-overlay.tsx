"use client";

import dynamic from "next/dynamic";
import { X } from "lucide-react";

const GbvChatContent = dynamic(
  () =>
    import("@/components/amrep/amrep-chat-content").then(
      (m) => m.GbvChatContent,
    ),
  { ssr: false },
);

export function SiteChatOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 mx-auto mt-4 flex h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col rounded-t-2xl bg-black shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex-1 overflow-hidden rounded-t-2xl">
          <GbvChatContent />
        </div>
      </div>
    </div>
  );
}
