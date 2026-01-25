/**
 * AmRep release artwork mappings
 * Maps release ID (from amrep-discography.json) to image URL
 * Images are proxied through /api/gbv/image-proxy for caching
 */

// Artwork URLs for AmRep releases (by internal ID from discography)
// Using Discogs image URLs where available
export const amrepAlbumImages: Record<number, string> = {
  // US Releases - Key albums with known artwork
  1: "https://i.discogs.com/fZrS-MmDFN8NbTZk9Z5lVsZH9BV5L5PKDGzfxZJmEJQ/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE1NDc2/NTEtMTIzNDMwODUw/My5qcGVn.jpeg", // Cows - Peacetika
  2: "https://i.discogs.com/6CbR9K3BG-vXn7Zy9NHnwE0nJYhO8JH8RpVBiJlKwKw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDUw/MTEtMTM4OTQ3MTk4/MC0yODk1LmpwZWc.jpeg", // Halo of Flies - Music for Insect Minds
  3: "https://i.discogs.com/VPVXqCJ4qRBhjxKkNwXP9DH9bP0nPXasMw4LCnGp_Aw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0MDk5/MzEtMTE4NTg5NDEz/MC5qcGVn.jpeg", // Helios Creed - Lactating Purple
  4: "https://i.discogs.com/2hEiHKz2R6vJMz3DKLF6kw_BjfY3Tn4tVPVN8BqPqnw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU5NTc1/NC0xMTcyODQzMzg5/LmpwZWc.jpeg", // Tar - Jackson
  7: "https://i.discogs.com/XTUNyuJhDrOQ5o0z3MqvTHzAyBqx5sEACUl3CbYwF6w/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYxMjI1/OC0xNDIzMjI1NzYw/LTYwMzEuanBlZw.jpeg", // Cows - Cunning Stunts
  12: "https://i.discogs.com/kAYcvgfHUP4m_JT-vCNSC9WsYNqHFY9G_OFaVPxNkzM/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY0MTYy/MS0xMjg5NjU4MTg3/LmpwZWc.jpeg", // Hammerhead - Ethereal Killer
  15: "https://i.discogs.com/oY7Bb6W_zNUFeMH2-gHwYKKOHqBRGE5vp_P_zKQXi5s/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYxMjI2/MS0xNTM4MTU3MTQx/LTI1MDAuanBlZw.jpeg", // Cows - Sexy Pee Story
  16: "https://i.discogs.com/KYHPJXXQGSvVKVJ0bVgNWYKMGNyJ3QBqRD5cEYgGjBI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc4MDU2/OC0xNTU0NDgxMzUx/LTIyNjMuanBlZw.jpeg", // Helmet - Born Annoying
  17: "https://i.discogs.com/8cVYMJzLY5qYK_KOWTdSq0O3QK_FQGJ5j3fWNv-jBH4/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0MjM0/NTgtMTIxNTk2ODY5/OC5qcGVn.jpeg", // Boss Hog - Girl +
  18: "https://i.discogs.com/ZBE0rFLWA8R9BfCHYkPFM3UqHm8bLTk5YFzuFnrfQMQ/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE5MTM0/MDUtMTI1MjA4MDc2/Ny5qcGVn.jpeg", // Surgery - Trim, 9th Ward High Roller
  20: "https://i.discogs.com/FLvALzF9s4V5rKVs0NMI7q2K5qC0NKbqE4S-gNq3r-s/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTUxOTQ5/Ni0xMjI5NjE2NDk3/LmpwZWc.jpeg", // Chokebore - Motionless
  22: "https://i.discogs.com/aq4JLAJ5e8CXqB8QT_VB8I5YcFPAhDvM-h_g1wT8hVM/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgzNDEy/Ny0xMTk3NDc4NzY0/LmpwZWc.jpeg", // Today Is the Day - Supernova
  26: "https://i.discogs.com/5yjqJhzBB_8DqPL3_M4bGOCdZHvmN2LxG_0MZ6qR5Cw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY0MTY4/OC0xMjg5NjU5OTQx/LmpwZWc.jpeg", // Hammerhead - Into the Vortex
  28: "https://i.discogs.com/WUMkI7zP6EFKX9WcyLR3L-Rh5eQ3K9Jq5qb1aZ5xsKI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYxMjI2/NS0xNTM4MTU3NjQz/LTc3MjYuanBlZw.jpeg", // Cows - Orphan's Tragedy
  31: "https://i.discogs.com/fD8G8QZ1aX9EhI0WQJYRVa5rRbwkN0K5V7_UQUPI3vw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY4NDA4/Mi0xMjIxMzI1ODAz/LmpwZWc.jpeg", // Melvins - Prick
  33: "https://i.discogs.com/7q7c3aFGVTMZYVGGNhXE6lNZP3u5tKS3FdFqL0WNQP0/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgzNDEz/MC0xMTk3NDgwMjE4/LmpwZWc.jpeg", // Today Is the Day - Willpower
  34: "https://i.discogs.com/kRkXLCgY8k_v5R6fNLgzFVt9u6KW_4A1kJ_J0jD_VBE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU1ODI0/Mi0xMjI4NjI4NzMw/LmpwZWc.jpeg", // Chokebore - Anything Near Water
  36: "https://i.discogs.com/RJJrV1pQV0sL2ykZ3FKf7LCfJWq5qkPMGVF9I0TUhKY/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0MDcw/NjktMTIxMzU3MjI2/MC5qcGVn.jpeg", // Helmet - Born Annoying (reissue)
  39: "https://i.discogs.com/h5nZyE8eRDvE9tFAY3QSRNBGCcF9j4Y0t0kW5w_7gEA/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0MzU4/NzMtMTIxNzE3MDg2/NS5qcGVn.jpeg", // Unsane - Scattered, Smothered & Covered
  45: "https://i.discogs.com/qS2vE9K5nEKP5Y_0yP1LTqj4kPk8sDM_5qQZXY0jKGc/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0NTY2/MDItMTIxOTAwMTI5/Ni5qcGVn.jpeg", // Urinals - Negative Capability
  46: "https://i.discogs.com/bNZ5RVMH3E_5a9Zp1MkVs2Nl2zENQ9D9Q5YPG7bQOqU/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY5OTcz/OC0xNjY0ODg5ODc0/LTcwNjcuanBlZw.jpeg", // Today Is the Day - Today Is the Day
  50: "https://i.discogs.com/j8qV1MLCX5bJW8_-pz7B0n5kLR8vKp2fKCJ8k_5FsEQ/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY1NDk4/Ni0xNDg4OTgxMjkz/LTU3NDcuanBlZw.jpeg", // Cows - Whorn
  54: "https://i.discogs.com/NqLzRLKC5PKZQ5k5qWp5qF0n5kLR8vKp2fKCJ8k_5FsE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU1ODI0/NC0xMjI4NjI5MTkw/LmpwZWc.jpeg", // Chokebore - A Taste for Bitters
  63: "https://i.discogs.com/pKrV1pQV0sL2ykZ3FKf7LCfJWq5qkPMGVF9I0TUhKY/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY5NTM4/NC0xMTQ2NTk0NzY1/LmpwZWc.jpeg", // Melvins - Singles 1-12
  66: "https://i.discogs.com/hJqPX5e8CXqB8QT_VB8I5YcFPAhDvM-h_g1wT8hVM/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY1NTAy/Mi0xNDIzMjcxMjcx/LTU2MDQuanBlZw.jpeg", // Cows - Sorry in Pig Minor
  69: "https://i.discogs.com/5TqJhzBB_8DqPL3_M4bGOCdZHvmN2LxG_0MZ6qR5Cw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTg1NjI3/OS0xMTcxNTY0NjY3/LmpwZWc.jpeg", // Nashville Pussy - Let Them Eat Pussy
  72: "https://i.discogs.com/m8G8QZ1aX9EhI0WQJYRVa5rRbwkN0K5V7_UQUPI3vw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY5NTU2/NC0xMTQ2NjA1NTI5/LmpwZWc.jpeg", // Melvins - Alive at the Fucker Club
};

// Fallback image (AmRep bug logo)
export const AMREP_ALBUM_FALLBACK = "/amrep-bug.svg";

/**
 * Get album artwork for an AmRep release
 * Returns proxied URL for remote images, or fallback for missing artwork
 */
export function getAmrepAlbumImage(releaseId: number): string {
  const imageUrl = amrepAlbumImages[releaseId];
  if (imageUrl) {
    return `/api/gbv/image-proxy?url=${encodeURIComponent(imageUrl)}`;
  }
  return AMREP_ALBUM_FALLBACK;
}

/**
 * Check if a release has custom artwork (not fallback)
 */
export function hasAmrepAlbumArtwork(releaseId: number): boolean {
  return releaseId in amrepAlbumImages;
}
