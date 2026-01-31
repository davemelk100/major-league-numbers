export const localMemberImages: Record<number, string> = {
  198683: "/gbv-members/198683.jpg",
  261485: "/gbv-members/261485.jpg",
  276055: "/gbv-members/276055.jpg",
  367510: "/gbv-members/367510.jpg",
  474241: "/gbv-members/474241.jpg",
  552898: "https://i.discogs.com/SZM6FI0f8j3cDaBCYIXZuAgIgKOYI4RZKwChS5jxDvk/rs:fit/g:sm/q:90/h:214/w:320/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTU1Mjg5/OC0xNTE0MzA5NTg1/LTMxMTMuZ2lm.jpeg",
  650225: "/gbv-members/650225.jpg",
  789829: "/gbv-members/789829.jpg",
  5302979: "/gbv-members/5302979.jpg"
};

export const GBV_MEMBER_IMAGE_FALLBACKS: Record<string, string> = {
  "jim pollard": "/gbv-members/jim-pollard.png",
};

export function getLocalMemberImage(memberId?: number | null): string | null {
  if (!memberId) return null;
  return localMemberImages[memberId] || null;
}
