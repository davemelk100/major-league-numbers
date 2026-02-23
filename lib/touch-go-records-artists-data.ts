export interface TouchGoRecordsArtist {
  id: number;
  name: string;
  description?: string;
}

export const touchgorecordsArtists: TouchGoRecordsArtist[] = [
  // Founding era / Albini axis
  { id: 1, name: "Big Black", description: "Steve Albini's abrasive industrial punk trio. Pioneered the drum machine-driven noise rock sound that defined Touch and Go's early identity." },
  { id: 2, name: "Rapeman", description: "Short-lived Steve Albini project with David Wm. Sims (Scratch Acid) and Rey Washam. Two albums of visceral noise rock." },
  { id: 3, name: "Shellac", description: "Steve Albini's long-running minimalist post-punk trio with Bob Weston and Todd Trainer. Known for precise, angular guitar work and dry wit." },

  // Jesus Lizard / Scratch Acid axis
  { id: 4, name: "The Jesus Lizard", description: "Austin-via-Chicago noise rock band fronted by David Yow. Known for explosive live shows and albums like Goat and Liar." },
  { id: 5, name: "Scratch Acid", description: "Austin noise rock pioneers featuring David Yow and David Wm. Sims, precursors to The Jesus Lizard." },

  // Louisville scene
  { id: 6, name: "Slint", description: "Louisville post-rock architects. Spiderland (1991) is widely regarded as one of the most influential albums of the 1990s." },
  { id: 37, name: "Rodan", description: "Louisville noise rock band. Brief but hugely influential, spawning multiple Touch and Go-affiliated projects." },
  { id: 35, name: "Shipping News", description: "Louisville post-rock band featuring members of Slint and Rodan. Intricate, dynamic compositions." },
  { id: 36, name: "June of 44", description: "Louisville/NYC post-rock band. Tense, cinematic instrumentals mixed with spoken word." },
  { id: 51, name: "Rachel's", description: "Louisville chamber rock ensemble. Lush, orchestral compositions bridging classical and post-rock." },
  { id: 52, name: "The For Carnation", description: "Brian McMahan's (Slint) post-rock project. Sparse, atmospheric and deeply personal." },
  { id: 53, name: "Palace Brothers", description: "Will Oldham's early project, later known as Bonnie 'Prince' Billy. Alt-country and lo-fi folk." },
  { id: 54, name: "Squirrel Bait", description: "Louisville proto-post-hardcore band. Brief but influential, members went on to Slint, Bastro, and more." },

  // Early Midwest hardcore
  { id: 39, name: "Negative Approach", description: "Detroit hardcore punk legends. Among the earliest and most important Touch and Go releases." },
  { id: 47, name: "Necros", description: "Midwest hardcore pioneers from Maumee, Ohio. Corey Rusk's band before he ran the label full-time." },
  { id: 45, name: "Die Kreuzen", description: "Milwaukee hardcore/post-punk band. Evolved from blistering hardcore to experimental post-punk." },
  { id: 38, name: "State of Grace", description: "Early Touch and Go hardcore band from the Midwest, part of the label's founding era." },
  { id: 48, name: "Fix", description: "Early Midwest hardcore band. Part of Touch and Go's founding roster." },
  { id: 46, name: "The Mentally Ill", description: "Early Chicago punk band. Part of the original Touch and Go 1981 scene." },
  { id: 55, name: "Meatmen", description: "Tesco Vee's outrageous punk band from Michigan. Provocative and deliberately offensive humor." },
  { id: 56, name: "Spite", description: "Early Midwest hardcore band from the Touch and Go scene." },

  // Texas
  { id: 7, name: "Butthole Surfers", description: "Texas psychedelic noise band. Early releases on Touch and Go before moving to major labels." },
  { id: 57, name: "Crust", description: "Texas noise rock band associated with the Touch and Go sound." },
  { id: 58, name: "Ed Hall", description: "Austin noise rock trio. Unhinged, psychedelic-tinged chaos." },

  // Chicago noise rock / punk
  { id: 8, name: "Killdozer", description: "Wisconsin sludge-rock trio known for dark humor and heavy, grinding riffs across a prolific discography." },
  { id: 9, name: "Tar", description: "Chicago noise rock band led by John Mohr. Melodic yet heavy sound bridging post-hardcore and noise rock." },
  { id: 10, name: "The Didjits", description: "Champaign, IL punk rock band known for frenetic energy and wild live shows. Rick Sims later formed Titanic Love Affair." },
  { id: 11, name: "Pegboy", description: "Chicago melodic punk band featuring former Naked Raygun members. Powerful, tuneful punk rock." },
  { id: 12, name: "Naked Raygun", description: "Legendary Chicago punk band. Some releases distributed through Touch and Go. Hugely influential on Midwest punk." },
  { id: 31, name: "Shorty", description: "Chicago noise rock band featuring members of Pegboy and other local acts." },
  { id: 59, name: "Effigies", description: "Chicago punk/post-punk band. Part of the early 1980s Chicago scene alongside Naked Raygun." },
  { id: 60, name: "Volcano Suns", description: "Boston noise-pop band led by Peter Prescott (Mission of Burma). Energetic and melodic." },

  // Minneapolis
  { id: 13, name: "Flour", description: "Minneapolis one-man project of Peter Davis. Noisy, angular post-punk with tape-loop experimentation." },
  { id: 14, name: "Arcwelder", description: "Minneapolis trio known for melodic noise rock. Dense guitar interplay over driving rhythms." },

  // DC / East Coast post-hardcore
  { id: 15, name: "Girls Against Boys", description: "Washington, D.C. post-hardcore band known for dual-bass attack and sleek, dark sound." },
  { id: 43, name: "The Monorchid", description: "Baltimore noise rock/post-hardcore duo. Confrontational and abrasive." },
  { id: 61, name: "Skull Kontrol", description: "Chris Thomson's post-Monorchid project. Angular, minimal noise rock." },

  // Pittsburgh math rock
  { id: 16, name: "Don Caballero", description: "Pittsburgh math rock pioneers. Complex, polyrhythmic instrumentals that helped define the genre." },

  // Grubbs / O'Rourke axis
  { id: 17, name: "Bastro", description: "David Grubbs-led noise rock project, precursor to Gastr del Sol. Abrasive yet cerebral." },
  { id: 18, name: "Gastr del Sol", description: "David Grubbs and Jim O'Rourke's experimental post-rock project. Evolved from noise to avant-garde composition." },

  // Silkworm
  { id: 19, name: "Silkworm", description: "Long-running indie rock band from Montana/Seattle/Chicago. Literate songwriting and guitar interplay." },
  { id: 62, name: "Bottomless Pit", description: "Tim Midyett's post-Silkworm band. Continued the tradition of smart, guitar-driven rock." },

  // 2000s indie
  { id: 20, name: "Calexico", description: "Tucson band blending indie rock with Southwestern, Latin, and country influences." },
  { id: 21, name: "Man or Astro-man?", description: "Alabama surf-rock revivalists with a sci-fi twist. High-energy performances and prolific output." },
  { id: 25, name: "Yeah Yeah Yeahs", description: "NYC art-punk trio. Fever to Tell (2003) released on Touch and Go before moving to Interscope." },
  { id: 26, name: "TV on the Radio", description: "Brooklyn experimental rock band. Early EPs on Touch and Go before signing to 4AD/Interscope." },
  { id: 27, name: "Pinback", description: "San Diego indie rock duo of Rob Crow and Armistead Burwell Smith IV. Intricate, melodic songcraft." },
  { id: 34, name: "Enon", description: "NYC indie rock project of John Schmersal (Brainiac). Catchy, experimental pop-rock." },

  // International
  { id: 22, name: "The Ex", description: "Dutch anarcho-punk band with a 40+ year career. Experimental, politically charged post-punk." },
  { id: 23, name: "Uzeda", description: "Italian noise rock band from Catania, Sicily. Angular, intense sound influenced by Steve Albini." },
  { id: 28, name: "Couch", description: "Munich post-rock/krautrock band. Hypnotic instrumental compositions." },
  { id: 63, name: "Karate", description: "Boston indie rock band blending post-hardcore with jazz. Elegant, understated guitar work." },
  { id: 64, name: "Bedhead", description: "Dallas slowcore pioneers. Quiet, intertwining guitar melodies and hushed vocals." },
  { id: 65, name: "The New Year", description: "Matt and Bubba Kadane's post-Bedhead project. Continuation of their understated, precise sound." },
  { id: 66, name: "Brainiac", description: "Dayton, Ohio synth-punk band. Tim Taylor's tragically short-lived project mixing punk with electronics." },
  { id: 67, name: "State and Madison", description: "Chicago post-hardcore band on the Touch and Go roster." },
  { id: 68, name: "Dianogah", description: "Chicago dual-bass instrumental band. Creative, bass-driven post-rock." },
  { id: 69, name: "Pit Er Pat", description: "Chicago experimental pop trio. Playful, rhythmic, electronic-tinged indie." },
  { id: 70, name: "Euphone", description: "Ryan Rapsys's instrumental project. Intricate post-rock with electronics and jazz influences." },
  { id: 71, name: "Zwan", description: "Billy Corgan's short-lived post-Smashing Pumpkins band. One album released through Touch and Go-affiliated Djali Zwan." },

  // San Diego
  { id: 50, name: "The Black Heart Procession", description: "San Diego dark indie project of Pall Jenkins. Cinematic, melancholy soundscapes." },
  { id: 41, name: "Thingy", description: "San Diego art-rock band. Quirky, angular post-punk with jazz influences." },

  // Others
  { id: 24, name: "Blonde Redhead", description: "NYC art-rock trio. Early releases on Touch and Go before moving to 4AD." },
  { id: 29, name: "Mule", description: "Michigan blues-punk duo. Raw, distorted takes on blues and punk traditions." },
  { id: 30, name: "Brick Layer Cake", description: "Todd Trainer's pre-Shellac project. Heavy, minimal instrumental rock." },
  { id: 32, name: "Bitch Magnet", description: "Late-80s post-hardcore/noise rock trio. Influential on the math rock and post-rock scenes." },
  { id: 33, name: "Coctails", description: "Chicago lounge-pop group. Playful, eclectic mix of jazz, pop, and experimentation." },
  { id: 40, name: "The Mekons", description: "Long-running Leeds post-punk/alt-country collective. Several albums released through Touch and Go." },
  { id: 42, name: "Seam", description: "Chapel Hill/Chicago indie rock band led by Sooyoung Park (Bitch Magnet). Melodic, atmospheric guitar rock." },
  { id: 44, name: "Oxbow", description: "San Francisco noise rock band. Intense, theatrical performances led by Eugene Robinson." },
  { id: 49, name: "Dazzling Killmen", description: "St. Louis noise rock band. Dissonant, aggressive, and technically complex." },
  { id: 72, name: "Clikatat Ikatowi", description: "DC-area band connected to the Gravity Records / Touch and Go crossover. Chaotic, unhinged hardcore." },
  { id: 73, name: "Mount Shasta", description: "Art-punk band from the Pacific Northwest. Absurdist humor meets noise rock." },
  { id: 74, name: "U.S. Maple", description: "Chicago deconstructionist noise rock. Willfully obtuse, atonal, and confrontational." },
  { id: 75, name: "Laughing Hyenas", description: "Ann Arbor noise rock band featuring Larissa Strickland. Raw, blues-infused punk with unhinged vocals." },
  { id: 76, name: "Slick Rick's Revenge", description: "Short-lived side project from the Chicago noise rock scene." },
  { id: 77, name: "Codeine", description: "NYC slowcore band. Glacially paced, heavy, and deeply melancholic. Hugely influential." },
  { id: 78, name: "Rex", description: "Chicago noise-pop/power-pop band. Catchy hooks with crunchy guitars." },
  { id: 79, name: "Hands On the Wheel", description: "Short-lived Touch and Go side project." },
  { id: 80, name: "Labradford", description: "Richmond, Virginia ambient post-rock. Droning, minimal soundscapes." },
  { id: 81, name: "Sweep the Leg Johnny", description: "Chicago noise rock/jazz hybrid. Saxophone-driven chaos meets post-hardcore intensity." },
  { id: 82, name: "Archers of Loaf", description: "Chapel Hill indie rock band. Influential 90s guitar rock with literate songwriting." },
  { id: 83, name: "The Zincs", description: "Jim Elkington's Chicago indie folk-rock project." },
  { id: 84, name: "Poster Children", description: "Champaign, IL post-punk/indie rock band. Prolific and genre-spanning career." },
  { id: 85, name: "State of Alert (S.O.A.)", description: "Henry Rollins' pre-Black Flag DC hardcore band. Brief but iconic." },
  { id: 86, name: "Brick", description: "Touch and Go-era Midwest hardcore act." },
  { id: 87, name: "Titanic Love Affair", description: "Rick Sims' (The Didjits) later project. Noisy, catchy punk rock." },
  { id: 88, name: "Radar Bros.", description: "LA dream-pop/slowcore band. Lush, atmospheric guitar-based songwriting." },
  { id: 89, name: "Out Hud", description: "Brooklyn dance-punk/post-punk band. Electronic rhythms with live instruments." },
  { id: 90, name: "!!!  (Chk Chk Chk)", description: "Sacramento-via-NYC dance-punk band. Early releases associated with the Touch and Go circle." },
  { id: 91, name: "David Yow", description: "Solo work from the Jesus Lizard / Scratch Acid frontman. Uncompromising and raw." },
  { id: 92, name: "Bob Weston", description: "Shellac bassist and recording engineer. Solo and collaborative experimental work." },
  { id: 93, name: "Nina Nastasia", description: "NYC singer-songwriter. Dark, spare folk with Steve Albini production." },
  { id: 94, name: "Colossamite", description: "Noise rock band from the Midwest. Abrasive, technical, and confrontational." },
  { id: 95, name: "Trans Am", description: "DC instrumental rock band. Genre-hopping from Krautrock to synth-rock to post-punk." },
  { id: 96, name: "Phantom 309", description: "Hard-driving rock act on the Touch and Go roster." },
];

export function getTouchGoRecordsArtistById(id: number): TouchGoRecordsArtist | undefined {
  return touchgorecordsArtists.find((artist) => artist.id === id);
}
