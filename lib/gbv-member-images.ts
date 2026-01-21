export const localMemberImages: Record<number, string> = {
  198683: "/gbv-members/198683.jpg",
  261485: "/gbv-members/261485.jpg",
  276055: "/gbv-members/276055.jpg",
  367510: "/gbv-members/367510.jpg",
  474241: "/gbv-members/474241.jpg",
  552898: "/gbv-members/552898.jpg",
  650225: "/gbv-members/650225.jpg",
  789829: "/gbv-members/789829.jpg",
  5302979: "/gbv-members/5302979.jpg"
};

export function getLocalMemberImage(memberId?: number | null): string | null {
  if (!memberId) return null;
  return localMemberImages[memberId] || null;
}
