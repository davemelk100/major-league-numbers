const ROCKATHON_GBV_URL = "https://www.rockathonrecords.com/guided-by-voices";

// Albums available for purchase on Rockathon Records, keyed by normalized title
const ROCKATHON_TITLES = new Set([
  "thick rich and delicious",
  "universe room",
  "strut of kings",
  "nowhere to go but up",
  "welshpool frillies",
  "la la land",
  "scalping the guru",
  "tremblers and goggles by rank",
  "crystal nuns cathedral",
  "it's not them. it couldn't be them. it is them!",
  "earth man blues",
  "styles we paid for",
  "mirrored aztec",
  "surrender your poppy field",
  "sweating the plague",
  "warp and woof",
  "zeppelin over china",
  "space gun",
  "how do you spell heaven",
  "august by cake",
  "please be honest",
  "cool planet",
  "english little league",
  "down by the racetrack",
  "the bears for lunch",
  "class clown spots a ufo",
  "let's go eat the factory",
]);

export function getRockathonUrl(title: string): string | null {
  const normalized = title.toLowerCase().trim();
  if (ROCKATHON_TITLES.has(normalized)) {
    return ROCKATHON_GBV_URL;
  }
  return null;
}
