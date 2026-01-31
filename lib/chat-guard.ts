export const MEDIA_GENERATION_BLOCK_RESPONSE =
  "I can't generate, create, or produce any media content — including audio, video, images, or music. I can answer questions about artists, albums, and history instead.";
export const MUSIC_COMPOSE_SHARE_BLOCK_RESPONSE =
  "I can't help with composing music or sharing music. I can answer questions about artists, albums, and music history instead.";
export const IMAGE_CREATION_BLOCK_RESPONSE =
  "I can't help with creating images. I can answer questions about artists, albums, and music history instead.";

const COMPOSE_PATTERN =
  /\b(compose|write|make|create|generate|produce)\b.{0,40}\b(song|music|melody|lyrics|track|beat|tune|jingle|remix|sample)\b/;
const SHARE_PATTERN =
  /\b(share|send|provide|give|upload|download|distribute|stream|play)\b.{0,40}\b(song|music|track|audio|mp3|wav|file|link|recording)\b/;
const REVERSED_SHARE_PATTERN =
  /\b(song|music|track|audio|mp3|wav|file|link|recording)\b.{0,40}\b(share|send|download|stream|play)\b/;

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
  /\b(create|generate|make|draw|design|render|illustrate|produce|synthesize)\b.{0,40}\b(image|picture|photo|artwork|art|logo|cover|poster|graphic|illustration|portrait|thumbnail)\b/;
const IMAGE_CREATE_REVERSED_PATTERN =
  /\b(image|picture|photo|artwork|art|logo|cover|poster|graphic|illustration|portrait|thumbnail)\b.{0,40}\b(create|generate|make|draw|design|render|illustrate|produce|synthesize)\b/;

export function isDisallowedImageRequest(text: string): boolean {
  if (!text) return false;
  const normalized = text.toLowerCase();
  return (
    IMAGE_CREATE_PATTERN.test(normalized) ||
    IMAGE_CREATE_REVERSED_PATTERN.test(normalized)
  );
}

const VIDEO_CREATE_PATTERN =
  /\b(create|generate|make|produce|render|synthesize)\b.{0,40}\b(video|animation|clip|movie|film|footage|motion graphic)\b/;
const VIDEO_CREATE_REVERSED_PATTERN =
  /\b(video|animation|clip|movie|film|footage|motion graphic)\b.{0,40}\b(create|generate|make|produce|render|synthesize)\b/;

const AUDIO_CREATE_PATTERN =
  /\b(create|generate|make|produce|render|synthesize)\b.{0,40}\b(audio|sound|voice|speech|narration|voiceover|podcast|sound effect)\b/;
const AUDIO_CREATE_REVERSED_PATTERN =
  /\b(audio|sound|voice|speech|narration|voiceover|podcast|sound effect)\b.{0,40}\b(create|generate|make|produce|render|synthesize)\b/;

const GENERIC_GENERATIVE_PATTERN =
  /\b(generate|synthesize|produce)\b.{0,20}\b(media|content|output)\b/;

export function isDisallowedVideoRequest(text: string): boolean {
  if (!text) return false;
  const normalized = text.toLowerCase();
  return (
    VIDEO_CREATE_PATTERN.test(normalized) ||
    VIDEO_CREATE_REVERSED_PATTERN.test(normalized)
  );
}

export function isDisallowedAudioRequest(text: string): boolean {
  if (!text) return false;
  const normalized = text.toLowerCase();
  return (
    AUDIO_CREATE_PATTERN.test(normalized) ||
    AUDIO_CREATE_REVERSED_PATTERN.test(normalized)
  );
}

export function isDisallowedMediaRequest(text: string): boolean {
  if (!text) return false;
  const normalized = text.toLowerCase();
  return (
    isDisallowedMusicRequest(text) ||
    isDisallowedImageRequest(text) ||
    isDisallowedVideoRequest(text) ||
    isDisallowedAudioRequest(text) ||
    GENERIC_GENERATIVE_PATTERN.test(normalized)
  );
}
