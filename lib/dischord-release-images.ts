export const localAlbumImages: Record<number, string> = {
  14: "/images/dischord/releases/release-14.jpg",
  15: "/images/dischord/releases/release-15.jpg",
};

export function getLocalAlbumImage(catalogNumber: number): string | null {
  return localAlbumImages[catalogNumber] || null;
}
