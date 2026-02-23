export const localMemberImages: Record<string, string> = {
  "andrew-rieger": "/images/e6/artists/andrew-rieger.jpg",
  "beulah": "/images/e6/artists/beulah.jpg",
  "bill-doss": "/images/e6/artists/bill-doss.jpg",
  "black-swan-network": "/images/e6/artists/black-swan-network.jpg",
  "bryan-poole": "/images/e6/artists/bryan-poole.jpg",
  "chocolate-usa": "/images/e6/artists/chocolate-usa.jpg",
  "circulatory-system": "/images/e6/artists/circulatory-system.jpg",
  "comet": "/images/e6/artists/comet.jpg",
  "derek-almstead": "/images/e6/artists/derek-almstead.jpg",
  "dressy-bessy": "/images/e6/artists/dressy-bessy.jpg",
  "elf-power": "/images/e6/artists/elf-power.jpg",
  "elfin-saddle": "/images/e6/artists/elfin-saddle.jpg",
  "essex-green": "/images/e6/artists/essex-green.jpg",
  "great-lakes": "/images/e6/artists/great-lakes.jpg",
  "half-handed-cloud": "/images/e6/artists/half-handed-cloud.jpg",
  "i-am-the-world-trade-center": "/images/e6/artists/i-am-the-world-trade-center.jpg",
  "japancakes": "/images/e6/artists/japancakes.jpg",
  "jeff-mangum": "/images/e6/artists/jeff-mangum.jpg",
  "julian-koster": "/images/e6/artists/julian-koster.jpg",
  "kevin-barnes": "/images/e6/artists/kevin-barnes.jpg",
  "laminated-cat": "/images/e6/artists/laminated-cat.jpg",
  "laura-carter": "/images/e6/artists/laura-carter.jpg",
  "lil-capn-travis": "/images/e6/artists/lil-capn-travis.jpg",
  "marshmallow-coast": "/images/e6/artists/marshmallow-coast.jpg",
  "nana-grizol": "/images/e6/artists/nana-grizol.jpg",
  "nesey-gallons": "/images/e6/artists/nesey-gallons.jpg",
  "neutral-milk-hotel": "/images/e6/artists/neutral-milk-hotel.jpg",
  "neutral-milk-hotel-tribute": "/images/e6/artists/neutral-milk-hotel-tribute.jpg",
  "of-montreal": "/images/e6/artists/of-montreal.jpg",
  "pipes-you-see-pipes-you-dont": "/images/e6/artists/pipes-you-see-pipes-you-dont.jpg",
  "robert-schneider": "/images/e6/artists/robert-schneider.jpg",
  "secret-square": "/images/e6/artists/secret-square.jpg",
  "summer-hymns": "/images/e6/artists/summer-hymns.jpg",
  "synthetic-flying-machine": "/images/e6/artists/synthetic-flying-machine.jpg",
  "the-apples-in-stereo": "/images/e6/artists/the-apples-in-stereo.jpg",
  "the-gerbils": "/images/e6/artists/the-gerbils.jpg",
  "the-instruments": "/images/e6/artists/the-instruments.jpg",
  "the-marbles": "/images/e6/artists/the-marbles.jpg",
  "the-minders": "/images/e6/artists/the-minders.jpg",
  "the-monarchs": "/images/e6/artists/the-monarchs.jpg",
  "the-music-tapes": "/images/e6/artists/the-music-tapes.jpg",
  "the-olivia-tremor-control": "/images/e6/artists/the-olivia-tremor-control.jpg",
  "the-sunshine-fix": "/images/e6/artists/the-sunshine-fix.jpg",
  "will-cullen-hart": "/images/e6/artists/will-cullen-hart.jpg",
};

export const E6_MEMBER_IMAGE_FALLBACKS: Record<string, string> = {};

export const E6_MEMBER_IMAGE_SKIP: Record<string, true> = {};

export function getLocalMemberImage(memberId?: string | null): string | null {
  if (!memberId) return null;
  return localMemberImages[memberId] || null;
}
