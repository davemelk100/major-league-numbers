import { tgLocalReleaseImages } from "./touch-go-records-images";

export function getLocalAlbumImage(catalogNumber: number): string | null {
  return tgLocalReleaseImages[catalogNumber] || null;
}
