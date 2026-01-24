export const MUSIC_COMPOSE_SHARE_BLOCK_RESPONSE =
  "I can't help with composing music or sharing music. I can answer questions about artists, albums, and music history instead.";
export const IMAGE_CREATION_BLOCK_RESPONSE =
  "I can't help with creating images. I can answer questions about artists, albums, and music history instead.";

const COMPOSE_PATTERN =
  /\b(compose|write|make|create|generate)\b.{0,40}\b(song|music|melody|lyrics|track|beat)\b/;
const SHARE_PATTERN =
  /\b(share|send|provide|give|upload|download|distribute|stream)\b.{0,40}\b(song|music|track|audio|mp3|wav|file|link)\b/;
const REVERSED_SHARE_PATTERN =
  /\b(song|music|track|audio|mp3|wav|file|link)\b.{0,40}\b(share|send|download|stream)\b/;

export function isDisallowedMusicRequest(text: string): boolean {
  if (!text) return false;
  const normalized = text.toLowerCase();
  return (
    COMPOSE_PATTERN.test(normalized) ||
    SHARE_PATTERN.test(normalized) ||
    REVERSED_SHARE_PATTERN.test(normalized)
  );
}

const IMAGE_CREATE_PATTERN =
  /\b(create|generate|make|draw|design|render|illustrate)\b.{0,40}\b(image|picture|photo|artwork|art|logo|cover|poster)\b/;
const IMAGE_CREATE_REVERSED_PATTERN =
  /\b(image|picture|photo|artwork|art|logo|cover|poster)\b.{0,40}\b(create|generate|make|draw|design|render|illustrate)\b/;

export function isDisallowedImageRequest(text: string): boolean {
  if (!text) return false;
  const normalized = text.toLowerCase();
  return (
    IMAGE_CREATE_PATTERN.test(normalized) ||
    IMAGE_CREATE_REVERSED_PATTERN.test(normalized)
  );
}
