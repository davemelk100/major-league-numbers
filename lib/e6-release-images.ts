export const localAlbumImages: Record<number, string> = {};

export function getLocalAlbumImage(catalogNumber: number): string | null {
  return localAlbumImages[catalogNumber] || null;
}
