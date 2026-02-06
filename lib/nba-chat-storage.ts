import type { UIMessage } from "ai";

export interface SavedChat {
  id: string;
  title: string;
  messages: UIMessage[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "chatnba-saved-chats";
const MAX_CHATS = 20;

export function getSavedChats(): SavedChat[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const chats = JSON.parse(stored) as SavedChat[];
    return chats.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

export function saveChat(chat: SavedChat): void {
  if (typeof window === "undefined") return;
  try {
    const chats = getSavedChats();
    const existingIndex = chats.findIndex((c) => c.id === chat.id);
    if (existingIndex >= 0) {
      chats[existingIndex] = chat;
    } else {
      chats.unshift(chat);
    }
    const trimmed = chats.slice(0, MAX_CHATS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Storage full or unavailable
  }
}

export function deleteChat(chatId: string): void {
  if (typeof window === "undefined") return;
  try {
    const chats = getSavedChats().filter((c) => c.id !== chatId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  } catch {
    // Ignore
  }
}

export function generateChatId(): string {
  return `nba-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getMessageText(message: UIMessage): string {
  if (message.parts && Array.isArray(message.parts)) {
    return message.parts
      .filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("");
  }
  return "";
}

export function generateChatTitle(messages: UIMessage[]): string {
  const firstUserMessage = messages.find((m) => m.role === "user");
  if (!firstUserMessage) return "New Chat";
  const text = getMessageText(firstUserMessage);
  const truncated = text.slice(0, 50);
  return truncated.length < text.length ? `${truncated}...` : truncated;
}
