export const localAlbumImages: Record<number, string> = {
  1: "/images/slap-a-ham-numbers/releases/release-1.jpg",
  2: "/images/slap-a-ham-numbers/releases/release-2.jpg",
  3: "/images/slap-a-ham-numbers/releases/release-3.jpg",
  4: "/images/slap-a-ham-numbers/releases/release-4.jpg",
  5: "/images/slap-a-ham-numbers/releases/release-5.jpg",
  6: "/images/slap-a-ham-numbers/releases/release-6.jpg",
  8: "/images/slap-a-ham-numbers/releases/release-8.jpg",
  9: "/images/slap-a-ham-numbers/releases/release-9.jpg",
  10: "/images/slap-a-ham-numbers/releases/release-10.jpg",
  11: "/images/slap-a-ham-numbers/releases/release-11.jpg",
  12: "/images/slap-a-ham-numbers/releases/release-12.jpg",
  13: "/images/slap-a-ham-numbers/releases/release-13.jpg",
  14: "/images/slap-a-ham-numbers/releases/release-14.jpg",
  15: "/images/slap-a-ham-numbers/releases/release-15.jpg",
};

export function getLocalAlbumImage(catalogNumber: number): string | null {
  return localAlbumImages[catalogNumber] || null;
}
