export const localAlbumImages: Record<number, string> = {
  1: "/images/jawbox/releases/release-1.jpg",
  5: "/images/jawbox/releases/release-5.jpg",
  6: "/images/jawbox/releases/release-6.jpg",
  7: "/images/jawbox/releases/release-7.jpg",
  8: "/images/jawbox/releases/release-8.jpg",
  11: "/images/jawbox/releases/release-11.jpg",
  13: "/images/jawbox/releases/release-13.jpg",
  15: "/images/jawbox/releases/release-15.jpg",
  16: "/images/jawbox/releases/release-16.jpg",
  20: "/images/jawbox/releases/release-20.jpg",
  21: "/images/jawbox/releases/release-21.jpg",
  22: "/images/jawbox/releases/release-22.jpg",
  23: "/images/jawbox/releases/release-23.jpg",
  24: "/images/jawbox/releases/release-24.jpg",
};

export function getLocalAlbumImage(catalogNumber: number): string | null {
  return localAlbumImages[catalogNumber] || null;
}
