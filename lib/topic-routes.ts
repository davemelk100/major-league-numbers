import { MUSIC_SITES } from "@/lib/music-site";

export const TOPIC_PATHS: Record<string, string> = Object.fromEntries(
  MUSIC_SITES.map((site) => [site.id, site.basePath])
);
