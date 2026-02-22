export const localMemberImages: Record<string, string> = {
  "neutral-milk-hotel": "/images/e6/artists/neutral-milk-hotel.jpg",
  "the-apples-in-stereo": "/images/e6/artists/the-apples-in-stereo.jpg",
  "the-olivia-tremor-control": "/images/e6/artists/the-olivia-tremor-control.jpg",
  "of-montreal": "/images/e6/artists/of-montreal.jpg",
  "elf-power": "/images/e6/artists/elf-power.jpg",
  "beulah": "/images/e6/artists/beulah.jpg",
  "dressy-bessy": "/images/e6/artists/dressy-bessy.jpg",
  "nana-grizol": "/images/e6/artists/nana-grizol.jpg",
  "jeff-mangum": "/images/e6/artists/jeff-mangum.jpg",
  "robert-schneider": "/images/e6/artists/robert-schneider.jpg",
  "kevin-barnes": "/images/e6/artists/kevin-barnes.jpg",
  "julian-koster": "/images/e6/artists/julian-koster.jpg",
  "will-cullen-hart": "/images/e6/artists/will-cullen-hart.jpg",
  "bill-doss": "/images/e6/artists/bill-doss.jpg",
};

export const E6_MEMBER_IMAGE_FALLBACKS: Record<string, string> = {};

export const E6_MEMBER_IMAGE_SKIP: Record<string, true> = {};

export function getLocalMemberImage(memberId?: string | null): string | null {
  if (!memberId) return null;
  return localMemberImages[memberId] || null;
}
