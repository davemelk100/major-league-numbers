import { tgLocalArtistImages } from "./touch-go-records-images";

const remoteArtistImages: Record<number, string> = {
  1: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Big_Black_%281986%29.jpg/500px-Big_Black_%281986%29.jpg",
  3: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Shellac-band.jpg/500px-Shellac-band.jpg",
  4: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Jesus-Lizard_Panorama1.jpg/500px-Jesus-Lizard_Panorama1.jpg",
  6: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Slint-1.jpg/500px-Slint-1.jpg",
  7: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Butthole_Surfers.jpg/500px-Butthole_Surfers.jpg",
  15: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Girls_Against_Boys_at_the_Touch_and_Go_25th_Anniversary_Block_Party.jpg/500px-Girls_Against_Boys_at_the_Touch_and_Go_25th_Anniversary_Block_Party.jpg",
  16: "https://upload.wikimedia.org/wikipedia/commons/8/82/Damon.png",
  20: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Calexico_ZMF_2016_IMGP7499.jpg/500px-Calexico_ZMF_2016_IMGP7499.jpg",
  22: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/The_Ex_W71_2016_07.jpg/500px-The_Ex_W71_2016_07.jpg",
  24: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/BlondeRedhead.jpg/500px-BlondeRedhead.jpg",
  25: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Yeah_Yeah_Yeahs_2K18_Montage.jpg/500px-Yeah_Yeah_Yeahs_2K18_Montage.jpg",
  26: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/TV_on_the_Radio_2008_Treasure_Island_Music_Festival_cropped.jpg/500px-TV_on_the_Radio_2008_Treasure_Island_Music_Festival_cropped.jpg",
  27: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pinback.jpg/500px-Pinback.jpg",
  39: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/MUSIC_Negative_Approach_2.jpg/500px-MUSIC_Negative_Approach_2.jpg",
  40: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Mekons_at_the_Poetry_Foundation_on_13_July_2015.jpg/500px-Mekons_at_the_Poetry_Foundation_on_13_July_2015.jpg",
  77: "https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Codeine_-_Alexandra_Palace_London_260512.jpg/500px-Codeine_-_Alexandra_Palace_London_260512.jpg",
  82: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Archers_of_Loaf_at_the_Middle_East_%286980829060%29.jpg/500px-Archers_of_Loaf_at_the_Middle_East_%286980829060%29.jpg",
  93: "https://upload.wikimedia.org/wikipedia/commons/8/82/Nina_Nastasia_%28crop%29.jpg",
  95: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Transam_11-15-2007.JPG/500px-Transam_11-15-2007.JPG",
};

export function getTouchGoArtistImageUrl(id: number): string | null {
  return tgLocalArtistImages[id] ?? remoteArtistImages[id] ?? null;
}

export const TOUCH_GO_RECORDS_ARTIST_IMAGES: Record<number, string> = {
  ...remoteArtistImages,
  ...tgLocalArtistImages,
};
