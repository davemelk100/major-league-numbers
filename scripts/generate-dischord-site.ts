/**
 * Generate a full Dischord Records site
 *
 * This script builds a GeneratedSiteData object with real Dischord Records data
 * and calls generateSiteFiles() — the same code path as the admin wizard UI.
 *
 * Usage: npx tsx scripts/generate-dischord-site.ts
 *
 * Requires DISCOGS_USER_TOKEN env var for image downloads.
 */

import { generateSiteFiles } from "../lib/admin/generate-site-files";
import { fetchDiscogsLabelData } from "../lib/admin/fetch-discogs-label";
import type { GeneratedSiteData } from "../lib/admin/schemas";

const SITE_ID = "dischord";

const data: GeneratedSiteData = {
  config: {
    id: SITE_ID,
    name: "Dischord Records",
    shortName: "Dischord",
    chatLabel: "Ask Dischord",
    headerTitle: "Dischord Records",
    headerTextClass: "text-black",
    shellClass: "dischord-shell",
    description:
      "Dischord Records is an independent record label founded in 1980 by Ian MacKaye and Jeff Nelson in Washington, D.C. The label has been a cornerstone of the D.C. hardcore and post-hardcore scenes, releasing music by Minor Threat, Fugazi, Bad Brains, Rites of Spring, and many more. Dischord is known for its DIY ethos, fair pricing, and commitment to artistic integrity.",
    navLabels: {
      discography: "Releases",
      members: "Artists",
      sideProjects: "Side Projects",
    },
    membersSlug: "artists",
    albumsSlug: "releases",
    footerDisclaimer:
      "All Content, Rights, Copyrights, etc. are the property of Dischord Records and associated artists. This is simply a fan site.",
    sources: [
      { label: "Official Website", url: "https://www.dischord.com/" },
      { label: "Discogs", url: "https://www.discogs.com/label/244-Dischord-Records" },
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Dischord_Records" },
      { label: "MusicBrainz", url: "https://musicbrainz.org/" },
      { label: "Cover Art Archive", url: "https://coverartarchive.org/" },
    ],
    imageSources: [
      { label: "Discogs", url: "https://www.discogs.com/" },
      { label: "Cover Art Archive", url: "https://coverartarchive.org/" },
    ],
    discogsLabelId: 244,
    searchPlaceholder: "Search Dischord...",
    seo: {
      title: "Dischord Records",
      description:
        "Explore Dischord Records: artist roster, releases, D.C. hardcore history, and milestones.",
      keywords: [
        "Dischord Records",
        "D.C. hardcore",
        "post-hardcore",
        "punk",
        "Ian MacKaye",
        "Fugazi",
        "Minor Threat",
        "independent label",
        "DIY",
      ],
    },
  },

  artists: [
    { id: 1, name: "Minor Threat", description: "Seminal D.C. hardcore band fronted by Ian MacKaye. Active 1980–1983, they defined the straight edge movement and released some of the most influential hardcore punk recordings ever made." },
    { id: 2, name: "Fugazi", description: "Post-hardcore pioneers formed in 1987 by Ian MacKaye and Guy Picciotto. Known for their fiercely independent ethos, low door prices, and genre-defying music across seven studio albums." },
    { id: 3, name: "Bad Brains", description: "Legendary D.C. band blending hardcore punk with reggae. Formed in 1977, they are widely regarded as one of the most important hardcore punk bands of all time." },
    { id: 4, name: "Rites of Spring", description: "Often credited as the first emo band. Fronted by Guy Picciotto, their self-titled 1985 album brought emotional intensity to the D.C. hardcore scene." },
    { id: 5, name: "Government Issue", description: "D.C. hardcore band led by John Stabb, active 1980–1989. Evolved from raw hardcore to a more melodic, adventurous sound across multiple Dischord releases." },
    { id: 6, name: "Dag Nasty", description: "Melodic hardcore band featuring Brian Baker of Minor Threat. Their 1986 debut Can I Say helped define the melodic hardcore genre." },
    { id: 7, name: "Jawbox", description: "Post-hardcore band active 1989–1997. Known for angular guitar work and dynamic songwriting, they released two albums on Dischord before signing to Atlantic." },
    { id: 8, name: "Shudder to Think", description: "Art-punk band known for complex arrangements and Craig Wedren's distinctive vocals. Released early material on Dischord before moving to Epic Records." },
    { id: 9, name: "Lungfish", description: "Post-hardcore band known for their hypnotic, repetitive style and Daniel Higgs' poetic lyrics. Released numerous albums on Dischord from 1990 through the 2000s." },
    { id: 10, name: "The Evens", description: "Duo of Ian MacKaye and Amy Farina, playing a stripped-down style of punk-influenced indie rock. Released three albums on Dischord." },
    { id: 11, name: "Embrace", description: "Short-lived but influential band fronted by Ian MacKaye between Minor Threat and Fugazi. Their 1987 self-titled album is a key document of the Revolution Summer era." },
    { id: 12, name: "Void", description: "Chaotic hardcore band from Columbia, Maryland. Their split LP with The Faith (Dischord No. 10) is one of the most intense hardcore recordings ever released." },
    { id: 13, name: "Scream", description: "D.C. hardcore band whose lineup included a young Dave Grohl on drums. Active 1981–1990, they brought a hard rock edge to the Dischord sound." },
    { id: 14, name: "Q and Not U", description: "Post-punk band active 2000–2005. Known for their angular, danceable take on post-hardcore, they released three albums on Dischord." },
    { id: 15, name: "Channels", description: "Post-punk band formed from members of Medications and Faraquet. Released their debut on Dischord in 2008, blending art-rock with D.C. punk energy." },
  ],

  releases: [
    { id: 1, catalogNo: "Dischord 12", title: "Out of Step", artist: "Minor Threat", year: 1983, format: "LP", highlight: "Minor Threat's only full-length album — definitive D.C. hardcore" },
    { id: 2, catalogNo: "Dischord 44", title: "Repeater", artist: "Fugazi", year: 1990, format: "LP", highlight: "Fugazi's landmark debut LP, blending punk urgency with musical sophistication" },
    { id: 3, catalogNo: "Dischord 36", title: "13 Songs", artist: "Fugazi", year: 1989, format: "CD", highlight: "Compilation of Fugazi's first two EPs — their most iconic release" },
    { id: 4, catalogNo: "Dischord 60", title: "Steady Diet of Nothing", artist: "Fugazi", year: 1991, format: "LP", highlight: "Darker, more experimental follow-up to Repeater" },
    { id: 5, catalogNo: "Dischord 70", title: "In on the Kill Taker", artist: "Fugazi", year: 1993, format: "LP", highlight: "Raw, intense album recorded with Steve Albini and Ted Niceley" },
    { id: 6, catalogNo: "Dischord 110", title: "End Hits", artist: "Fugazi", year: 1998, format: "LP", highlight: "Experimental late-period Fugazi with expanded sonic palette" },
    { id: 7, catalogNo: "Dischord 125", title: "The Argument", artist: "Fugazi", year: 2001, format: "LP", highlight: "Fugazi's final studio album — their most musically ambitious work" },
    { id: 8, catalogNo: "Dischord 15", title: "End on End", artist: "Rites of Spring", year: 1985, format: "LP", highlight: "Debut album widely considered the birth of emo" },
    { id: 9, catalogNo: "Dischord 29", title: "Joyride", artist: "Government Issue", year: 1987, format: "LP", highlight: "Government Issue's melodic evolution from raw hardcore" },
    { id: 10, catalogNo: "Dischord 22", title: "Can I Say", artist: "Dag Nasty", year: 1986, format: "LP", highlight: "Pioneering melodic hardcore album featuring Shawn Brown on vocals" },
    { id: 11, catalogNo: "Dischord 86", title: "For Your Own Special Sweetheart", artist: "Jawbox", year: 1994, format: "LP", highlight: "Jawbox's Dischord swan song — a post-hardcore masterpiece" },
    { id: 12, catalogNo: "Dischord 83", title: "Pony Express Record", artist: "Shudder to Think", year: 1994, format: "LP", highlight: "Ambitious art-punk that pushed Dischord's boundaries" },
    { id: 13, catalogNo: "Dischord 10", title: "Faith / Void", artist: "Void", year: 1982, format: "LP", highlight: "Legendary split LP — Void's side is sonic chaos incarnate" },
    { id: 14, catalogNo: "Dischord 95", title: "Red Medicine", artist: "Fugazi", year: 1995, format: "LP", highlight: "Adventurous mid-career album with unexpected textures and rhythms" },
    { id: 15, catalogNo: "Dischord 30", title: "Embrace", artist: "Embrace", year: 1987, format: "LP", highlight: "Ian MacKaye's post-Minor Threat band — key Revolution Summer document" },
  ],

  trivia: [
    {
      id: 1,
      question: "What year was Dischord Records founded?",
      options: ["1978", "1980", "1982", "1984"],
      correctAnswer: 1,
      explanation: "Dischord Records was founded in 1980 by Ian MacKaye and Jeff Nelson to release the Teen Idles' single 'Minor Disturbance.'",
      category: "history",
    },
    {
      id: 2,
      question: "Who co-founded Dischord Records with Ian MacKaye?",
      options: ["Guy Picciotto", "Jeff Nelson", "Henry Rollins", "Brian Baker"],
      correctAnswer: 1,
      explanation: "Jeff Nelson, drummer of the Teen Idles and later Minor Threat, co-founded Dischord Records with Ian MacKaye.",
      category: "history",
    },
    {
      id: 3,
      question: "Which Dischord band is credited with pioneering the 'straight edge' movement?",
      options: ["Fugazi", "Bad Brains", "Minor Threat", "Government Issue"],
      correctAnswer: 2,
      explanation: "Minor Threat's song 'Straight Edge' gave name to the movement promoting abstinence from drugs and alcohol.",
      category: "artists",
    },
    {
      id: 4,
      question: "What is the catalog number of the first Dischord release?",
      options: ["Dischord 1", "Dischord 0", "DIS-001", "DC-1"],
      correctAnswer: 0,
      explanation: "The Teen Idles' 'Minor Disturbance' EP was released as Dischord 1 in 1980.",
      category: "releases",
    },
    {
      id: 5,
      question: "Which Fugazi album was their last studio release?",
      options: ["End Hits", "Red Medicine", "The Argument", "Steady Diet of Nothing"],
      correctAnswer: 2,
      explanation: "The Argument, released in 2001, was Fugazi's seventh and final studio album.",
      category: "releases",
    },
    {
      id: 6,
      question: "Which Dischord band featured a young Dave Grohl on drums?",
      options: ["Dag Nasty", "Void", "Scream", "Government Issue"],
      correctAnswer: 2,
      explanation: "Dave Grohl joined Scream as their drummer in 1986, before going on to Nirvana and the Foo Fighters.",
      category: "artists",
    },
    {
      id: 7,
      question: "What is Dischord Records' famously consistent pricing policy?",
      options: [
        "$5 for all releases",
        "$8 CDs / $10 LPs post-paid",
        "Pay what you want",
        "Free digital downloads",
      ],
      correctAnswer: 1,
      explanation: "Dischord has maintained a policy of affordable, fixed pricing — historically around $8 for CDs and $10 for LPs, post-paid (shipping included).",
      category: "facts",
    },
    {
      id: 8,
      question: "Which band is often credited as the first 'emo' band?",
      options: ["Embrace", "Rites of Spring", "Dag Nasty", "Jawbox"],
      correctAnswer: 1,
      explanation: "Rites of Spring, fronted by Guy Picciotto, brought raw emotional expression to hardcore punk and are widely cited as the originators of emo.",
      category: "artists",
    },
    {
      id: 9,
      question: "What was the 'Revolution Summer' in D.C. punk?",
      options: [
        "A 1985 movement toward more artistic, emotional punk",
        "A 1980 punk festival in Washington D.C.",
        "Minor Threat's farewell tour",
        "Fugazi's first national tour",
      ],
      correctAnswer: 0,
      explanation: "Revolution Summer (1985) was a creative movement in the D.C. punk scene that embraced more melodic and emotionally expressive music, led by bands like Rites of Spring and Embrace.",
      category: "history",
    },
    {
      id: 10,
      question: "Where is Dischord Records headquartered?",
      options: ["New York City", "Los Angeles", "Arlington, Virginia", "Baltimore, Maryland"],
      correctAnswer: 2,
      explanation: "Dischord Records has long been based in Arlington, Virginia, just across the Potomac from Washington, D.C. The label originally operated out of the 'Dischord House.'",
      category: "facts",
    },
  ],

  timeline: [
    {
      year: 1980,
      title: "Dischord Records Founded",
      description: "Ian MacKaye and Jeff Nelson found Dischord Records to release the Teen Idles' 'Minor Disturbance' EP. The label is run from MacKaye's parents' house in Arlington, Virginia.",
    },
    {
      year: 1981,
      title: "Minor Threat Formed",
      description: "Ian MacKaye forms Minor Threat, who quickly become the defining band of D.C. hardcore. Their debut EP sells tens of thousands of copies through word of mouth and DIY distribution.",
    },
    {
      year: 1983,
      title: "Out of Step Released",
      description: "Minor Threat release their only full-length album, Out of Step (Dischord 12). The band breaks up later that year, but their legacy is cemented.",
    },
    {
      year: 1985,
      title: "Revolution Summer",
      description: "The D.C. punk scene undergoes a creative renaissance. Rites of Spring, Embrace, and other bands push beyond hardcore's constraints, laying groundwork for emo and post-hardcore.",
    },
    {
      year: 1987,
      title: "Fugazi Formed",
      description: "Ian MacKaye and Guy Picciotto form Fugazi with Joe Lally and Brendan Canty. The band will become Dischord's most iconic act and one of the most important bands in independent music.",
    },
    {
      year: 1990,
      title: "Repeater Released",
      description: "Fugazi release Repeater, their debut full-length album. It becomes one of the best-selling independent releases of its era and establishes the post-hardcore genre.",
    },
    {
      year: 2001,
      title: "The Argument Released",
      description: "Fugazi release The Argument, their final studio album. Widely acclaimed as their most musically ambitious work, it marks the end of an era for the band and the label's most prolific period.",
    },
    {
      year: 2003,
      title: "Fugazi Goes on Indefinite Hiatus",
      description: "Fugazi enter an indefinite hiatus that continues to this day. Dischord continues releasing music by other artists and maintaining its extensive back catalog.",
    },
  ],

  knowledge: [
    {
      id: "dischord-overview",
      title: "Dischord Records Overview",
      text: "Dischord Records is an independent record label founded in 1980 in Washington, D.C. by Ian MacKaye and Jeff Nelson, originally to release the Teen Idles' debut EP. The label has since released over 150 records, primarily by bands from the D.C. area. Dischord is known for its DIY ethos, fair pricing (historically $8 CDs / $10 LPs, post-paid), and refusal to sign contracts with artists — instead operating on handshake agreements. The label has been instrumental in shaping hardcore punk, post-hardcore, and emo, and remains one of the most respected independent labels in music history.",
      sourceLabel: "Dischord Records",
      sourceUrl: "https://www.dischord.com/",
    },
    {
      id: "dc-hardcore-scene",
      title: "The D.C. Hardcore Scene",
      text: "Washington, D.C.'s hardcore punk scene emerged in the early 1980s as one of the most vibrant and influential in the country. Centered around venues like the 9:30 Club and the Wilson Center, and fueled by labels like Dischord, the scene produced bands including Minor Threat, Bad Brains, Government Issue, Void, The Faith, and Scream. The D.C. scene was distinctive for its strong community bonds, all-ages shows, and the straight edge philosophy popularized by Minor Threat. By the mid-1980s, the scene evolved through 'Revolution Summer' into more melodic and emotionally expressive territory, giving birth to emo and post-hardcore.",
      sourceLabel: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Washington,_D.C._hardcore",
    },
    {
      id: "diy-ethos",
      title: "Dischord's DIY Ethos",
      text: "Dischord Records has maintained a fiercely independent, do-it-yourself approach throughout its existence. The label has never signed a distribution deal with a major label, instead handling its own mail-order and working with independent distributors. Dischord operates without contracts — all artist relationships are based on trust and handshake agreements. The label maintains low, fixed pricing and has historically included postage in its prices ('post-paid'). Ian MacKaye has consistently refused to license Dischord music for commercial use in advertisements. The label's operations have been run out of a small number of locations, including the famous 'Dischord House' in Arlington, Virginia.",
      sourceLabel: "Dischord Records",
      sourceUrl: "https://www.dischord.com/",
    },
    {
      id: "revolution-summer",
      title: "Revolution Summer (1985)",
      text: "Revolution Summer was a creative movement within the Washington, D.C. punk scene in 1985. After the initial wave of D.C. hardcore began to stagnate, a group of musicians pushed for more artistic expression and emotional depth. Key bands included Rites of Spring (featuring Guy Picciotto), Embrace (featuring Ian MacKaye), Beefeater, Gray Matter, and Dag Nasty. The movement rejected hardcore's increasingly macho and violent tendencies in favor of introspective lyrics and melodic experimentation. Revolution Summer is widely considered the birth of 'emo' (emotional hardcore) and laid the groundwork for the post-hardcore genre that Fugazi would later perfect.",
      sourceLabel: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Revolution_Summer",
    },
    {
      id: "fugazi-legacy",
      title: "Fugazi's Legacy",
      text: "Fugazi, formed in 1987, became Dischord's most iconic and commercially successful band. The group — Ian MacKaye, Guy Picciotto, Joe Lally, and Brendan Canty — released seven studio albums between 1989 and 2001, all on Dischord. Fugazi was known for their $5 door prices, all-ages shows, refusal to sell merchandise, and their anti-corporate stance. Their music blended hardcore punk, post-punk, reggae, and experimental rock, influencing countless bands across multiple genres. The band went on indefinite hiatus in 2003. Their live recordings have been archived on the Dischord website, with over 800 shows available for streaming.",
      sourceLabel: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Fugazi",
    },
  ],

  recordFacts: {
    "out-of-step": "Minor Threat's Out of Step was recorded in just two days at Inner Ear Studios and has sold over 500,000 copies — all on Dischord.",
    "repeater": "Fugazi's Repeater was the first Dischord release to sell over 200,000 copies, all without major label distribution or traditional advertising.",
    "13-songs": "13 Songs compiles Fugazi's first two EPs and remains the best-selling Dischord release of all time.",
    "faith-void": "The Faith/Void split LP (Dischord 10) is one of the most sought-after hardcore records, with original pressings commanding high prices among collectors.",
    "end-on-end": "Rites of Spring's End on End was originally titled simply 'Rites of Spring' — the reissue added the name 'End on End' to distinguish it from the band name.",
    "can-i-say": "Dag Nasty's Can I Say went through two vocalists — Shawn Brown sang on the original sessions, but Dave Smalley re-recorded vocals for the released version.",
    "the-argument": "The Argument features guest cello by Jerry Busher and vocals from Bridget Cross of Unrest, making it Fugazi's most sonically diverse album.",
    "in-on-the-kill-taker": "In on the Kill Taker was partially recorded by Steve Albini, though the band ultimately finished the album with Ted Niceley.",
    "embrace-lp": "Embrace's self-titled album wasn't released until 1987, well after the band had broken up, making it a posthumous debut.",
    "red-medicine": "Red Medicine was recorded at Inner Ear Studios with Don Zientara, continuing Fugazi's long relationship with the legendary D.C. studio.",
  },
};

async function main() {
  console.log("═".repeat(60));
  console.log("  Dischord Records — Full Site Generation");
  console.log("═".repeat(60));
  console.log();

  // When a Discogs token is available, fetch the full label discography
  const discogsToken = process.env.DISCOGS_USER_TOKEN;
  if (discogsToken && data.config.discogsLabelId) {
    console.log("DISCOGS_USER_TOKEN found — fetching full discography...\n");
    try {
      const { artists, releases } = await fetchDiscogsLabelData(
        data.config.discogsLabelId,
        discogsToken,
      );
      data.artists = artists;
      data.releases = releases;
      console.log(`\nFetched ${artists.length} artists, ${releases.length} releases from Discogs.\n`);
    } catch (err) {
      console.warn("Discogs fetch failed, using hardcoded fallback data:", err);
    }
  } else {
    console.log("No DISCOGS_USER_TOKEN — using hardcoded fallback data.\n");
  }

  console.log(`Site ID: ${SITE_ID}`);
  console.log(`Artists: ${data.artists.length}`);
  console.log(`Releases: ${data.releases.length}`);
  console.log(`Trivia: ${data.trivia.length} questions`);
  console.log(`Timeline: ${data.timeline.length} events`);
  console.log(`Knowledge: ${data.knowledge.length} docs`);
  console.log(`Record facts: ${Object.keys(data.recordFacts).length}`);
  console.log(`Discogs label ID: ${data.config.discogsLabelId}`);
  console.log();

  console.log("Generating site files...\n");

  const results = await generateSiteFiles(SITE_ID, "music", data, []);

  // Report results
  const successes = results.filter((r) => r.success);
  const failures = results.filter((r) => !r.success);

  console.log("\n" + "─".repeat(60));
  console.log(`Results: ${successes.length} succeeded, ${failures.length} failed`);
  console.log("─".repeat(60));

  if (failures.length > 0) {
    console.log("\nFailures:");
    for (const f of failures) {
      console.log(`  ✗ ${f.path}: ${f.error}`);
    }
  }

  console.log("\nFiles written:");
  for (const r of successes) {
    console.log(`  ✓ ${r.path}`);
  }

  console.log("\n" + "═".repeat(60));
  console.log("  Done! Site generated at /dischord");
  console.log("  Run `npm run dev` and visit http://localhost:3000/dischord");
  console.log("═".repeat(60));
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
