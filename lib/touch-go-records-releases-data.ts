export interface TouchGoRecordsRelease {
  id: number;
  catalogNo?: string;
  title: string;
  artist: string;
  year?: number | null;
  format?: string | null;
  highlight?: string;
}

export const touchgorecordsReleases: TouchGoRecordsRelease[] = [
  // Early hardcore era (1981–1984)
  { id: 1, title: "Touch and Go #1", artist: "Various Artists", catalogNo: "TG1", year: 1981, format: "Zine/7\"", highlight: "The original fanzine that became the label. Included flexi-disc." },
  { id: 2, title: "Process of Elimination EP", artist: "Negative Approach", catalogNo: "TG2", year: 1983, format: "7\"", highlight: "Defining Midwest hardcore. Six tracks of pure fury." },
  { id: 3, title: "Tied Down", artist: "Negative Approach", catalogNo: "TG3", year: 1983, format: "LP", highlight: "Landmark Detroit hardcore album." },
  { id: 4, title: "Conquest for Death", artist: "Necros", catalogNo: "TG4", year: 1983, format: "12\"", highlight: "Corey Rusk's own band. Fast Midwest hardcore." },
  { id: 5, title: "Tangled Up", artist: "Necros", catalogNo: "TG5", year: 1983, format: "LP", highlight: "Full-length showcasing the evolution from hardcore to metal-tinged punk." },
  { id: 93, title: "State of Grace", artist: "State of Grace", catalogNo: "TG6", year: 1983, format: "7\"", highlight: "Early Midwest hardcore. Part of Touch and Go's founding roster." },
  { id: 6, title: "Cries of the Insane", artist: "Die Kreuzen", catalogNo: "TG7", year: 1983, format: "7\"", highlight: "Milwaukee hardcore at its most intense." },
  { id: 94, title: "Vengeance", artist: "Fix", catalogNo: "TG8", year: 1983, format: "7\"", highlight: "Early Touch and Go hardcore." },
  { id: 99, title: "Basement Screams", artist: "Naked Raygun", catalogNo: "TG9", year: 1983, format: "12\" EP", highlight: "Legendary Chicago punk. One of the most influential Midwest punk records." },
  { id: 101, title: "Blood Sausage", artist: "Meatmen", catalogNo: "TG10", year: 1983, format: "7\"", highlight: "Tesco Vee's outrageous punk debut on the label." },
  { id: 102, title: "We're the Meatmen... and You Suck!", artist: "Meatmen", catalogNo: "TG11", year: 1983, format: "LP", highlight: "Full-length of deliberately provocative punk rock." },
  { id: 7, title: "Die Kreuzen", artist: "Die Kreuzen", catalogNo: "TG14", year: 1984, format: "LP", highlight: "Self-titled debut. Among the fastest, most ferocious hardcore records ever made." },
  { id: 103, title: "October File", artist: "Die Kreuzen", catalogNo: "TG27", year: 1986, format: "LP", highlight: "Evolution from hardcore to dark, atmospheric post-punk." },

  // Big Black / Albini era (1985–1989)
  { id: 8, title: "Racer-X", artist: "Big Black", catalogNo: "TG12", year: 1985, format: "12\" EP", highlight: "Big Black's first Touch and Go release. Drum machine-driven industrial punk." },
  { id: 104, title: "Il Duce / Big Money", artist: "Big Black", catalogNo: "TG17", year: 1986, format: "7\"" },
  { id: 9, title: "Atomizer", artist: "Big Black", catalogNo: "TG20", year: 1986, format: "LP", highlight: "Landmark noise rock album. 'Kerosene' became an underground anthem." },
  { id: 10, title: "Headache", artist: "Big Black", catalogNo: "TG24", year: 1987, format: "12\" EP", highlight: "Final Big Black release. Four tracks of concentrated aggression." },
  { id: 11, title: "Songs About Fucking", artist: "Big Black", catalogNo: "TG25", year: 1987, format: "LP", highlight: "Big Black's final album. A definitive noise rock statement." },
  { id: 105, title: "The Hammer Party", artist: "Big Black", catalogNo: "TG32", year: 1988, format: "LP", highlight: "Compilation of early Lungs and Bulldozer EPs." },
  { id: 12, title: "Two Nuns and a Pack Mule", artist: "Rapeman", catalogNo: "TG37", year: 1988, format: "LP", highlight: "Albini, Sims, and Washam. Abrasive noise rock at its peak." },
  { id: 106, title: "Budd", artist: "Rapeman", catalogNo: "TG41", year: 1989, format: "7\"" },

  // Butthole Surfers
  { id: 13, title: "Psychic... Powerless... Another Man's Sac", artist: "Butthole Surfers", catalogNo: "TG18", year: 1984, format: "LP", highlight: "Psychedelic chaos from Texas. One of the label's earliest full-lengths." },
  { id: 107, title: "Cream Corn from the Socket of Davis", artist: "Butthole Surfers", catalogNo: "TG16", year: 1985, format: "12\" EP" },
  { id: 14, title: "Rembrandt Pussyhorse", artist: "Butthole Surfers", catalogNo: "TG22", year: 1986, format: "LP", highlight: "Darker, more experimental follow-up. A noise-psych classic." },
  { id: 15, title: "Locust Abortion Technician", artist: "Butthole Surfers", catalogNo: "TG30", year: 1987, format: "LP", highlight: "Their masterpiece. 'Sweat Loaf' opens one of the wildest albums of the 80s." },
  { id: 16, title: "Hairway to Steven", artist: "Butthole Surfers", catalogNo: "TG38", year: 1988, format: "LP", highlight: "Untitled tracks, unhinged experimentation. Peak Surfers weirdness." },
  { id: 108, title: "Double Live", artist: "Butthole Surfers", catalogNo: "TG45", year: 1989, format: "LP", highlight: "Live album capturing the chaos of their performances." },

  // Scratch Acid / Jesus Lizard
  { id: 17, title: "Scratch Acid EP", artist: "Scratch Acid", catalogNo: "TG21", year: 1984, format: "12\" EP", highlight: "Debut EP. David Yow and David Wm. Sims begin their noise rock journey." },
  { id: 18, title: "Just Keep Eating", artist: "Scratch Acid", catalogNo: "TG23", year: 1986, format: "LP", highlight: "Full-length of unhinged Austin noise rock." },
  { id: 96, title: "Berserker", artist: "Scratch Acid", catalogNo: "TG28", year: 1986, format: "LP", highlight: "Compilation of Scratch Acid material. Essential noise rock." },
  { id: 109, title: "Pure", artist: "The Jesus Lizard", catalogNo: "TG49", year: 1989, format: "12\" EP", highlight: "Debut EP. Raw and unhinged." },
  { id: 19, title: "Head", artist: "The Jesus Lizard", catalogNo: "TG43", year: 1990, format: "LP", highlight: "Debut album produced by Steve Albini. Raw, primal noise rock." },
  { id: 20, title: "Goat", artist: "The Jesus Lizard", catalogNo: "TG52", year: 1991, format: "LP", highlight: "Widely considered their masterpiece. 'Mouth Breather' became an underground classic." },
  { id: 21, title: "Liar", artist: "The Jesus Lizard", catalogNo: "TG64", year: 1992, format: "LP", highlight: "Third album. Tighter and more focused while retaining the menace." },
  { id: 22, title: "Down", artist: "The Jesus Lizard", catalogNo: "TG82", year: 1994, format: "LP", highlight: "Final Touch and Go album before moving to Capitol." },

  // Slint
  { id: 23, title: "Tweez", artist: "Slint", catalogNo: "TG42", year: 1989, format: "LP", highlight: "Debut album. Raw, angular post-hardcore from Louisville." },
  { id: 24, title: "Spiderland", artist: "Slint", catalogNo: "TG55", year: 1991, format: "LP", highlight: "One of the most influential albums ever made. Foundational post-rock document." },

  // Squirrel Bait
  { id: 110, title: "Squirrel Bait", artist: "Squirrel Bait", catalogNo: "TG13", year: 1985, format: "LP", highlight: "Louisville proto-post-hardcore. Members went on to Slint and Bastro." },
  { id: 111, title: "Skag Heaven", artist: "Squirrel Bait", catalogNo: "TG26a", year: 1987, format: "LP", highlight: "Second and final album. More polished but still ferocious." },

  // Killdozer
  { id: 25, title: "Intellectuals Are the Shoeshine Boys of the Ruling Elite", artist: "Killdozer", catalogNo: "TG15", year: 1984, format: "LP", highlight: "Wisconsin sludge-rock debut. Dark humor meets heavy riffs." },
  { id: 26, title: "Snakeboy", artist: "Killdozer", catalogNo: "TG19", year: 1985, format: "LP", highlight: "Sophomore album continuing the Killdozer formula of heaviness and wit." },
  { id: 27, title: "Burl", artist: "Killdozer", catalogNo: "TG26", year: 1986, format: "LP", highlight: "Named after Burl Ives. Cover versions and originals in the Killdozer style." },
  { id: 28, title: "Little Baby Buntin'", artist: "Killdozer", catalogNo: "TG31", year: 1987, format: "LP" },
  { id: 29, title: "Twelve Point Buck", artist: "Killdozer", catalogNo: "TG35", year: 1988, format: "LP", highlight: "Often cited as their best. Crushing and darkly funny." },
  { id: 112, title: "For Ladies Only", artist: "Killdozer", catalogNo: "TG56", year: 1991, format: "LP" },
  { id: 113, title: "Uncompromising War on Art Under the Alarm Clock", artist: "Killdozer", catalogNo: "TG60", year: 1992, format: "LP" },
  { id: 114, title: "God Hears Pleas of the Innocent", artist: "Killdozer", catalogNo: "TG80", year: 1994, format: "LP", highlight: "Final Killdozer album." },

  // Shellac
  { id: 30, title: "The Rude Gesture: A Conditions Compilation", artist: "Shellac", catalogNo: "TG81", year: 1993, format: "7\"", highlight: "Early Shellac single. Albini, Weston, and Trainer's minimalist approach takes shape." },
  { id: 31, title: "At Action Park", artist: "Shellac", catalogNo: "TG88", year: 1994, format: "LP", highlight: "Debut album. 'My Black Ass' and 'The Admiral' — precise, angular, uncompromising." },
  { id: 115, title: "The Bird Is the Most Popular Finger", artist: "Shellac", catalogNo: "TG93", year: 1996, format: "7\"" },
  { id: 32, title: "Terraform", artist: "Shellac", catalogNo: "TG120", year: 1998, format: "LP", highlight: "Second album. Even more refined minimalism." },
  { id: 33, title: "1000 Hurts", artist: "Shellac", catalogNo: "TG157", year: 2000, format: "LP", highlight: "Contains 'Prayer to God,' one of the most intense songs in their catalog." },
  { id: 34, title: "Excellent Italian Greyhound", artist: "Shellac", catalogNo: "TG227", year: 2007, format: "LP", highlight: "Fourth album. Patient, explosive, methodical." },
  { id: 116, title: "Dude Incredible", artist: "Shellac", catalogNo: "TG292", year: 2014, format: "LP", highlight: "Fifth album. 20+ years in, still uncompromising." },
  { id: 117, title: "To All Trains", artist: "Shellac", catalogNo: "TG310", year: 2024, format: "LP", highlight: "Final Shellac album, released posthumously after Steve Albini's death." },

  // Tar
  { id: 35, title: "Roundhouse", artist: "Tar", catalogNo: "TG48", year: 1990, format: "LP", highlight: "Chicago noise rock. Melodic hooks buried under walls of distortion." },
  { id: 36, title: "Jackson", artist: "Tar", catalogNo: "TG65", year: 1991, format: "LP", highlight: "Sophomore album. Tighter songwriting, same heavy attack." },
  { id: 37, title: "Toast", artist: "Tar", catalogNo: "TG85", year: 1993, format: "LP", highlight: "Third and final album. Their most accomplished work." },
  { id: 118, title: "Over and Out", artist: "Tar", catalogNo: "TG91", year: 1994, format: "LP" },

  // Didjits
  { id: 38, title: "Hey Judester", artist: "The Didjits", catalogNo: "TG29", year: 1988, format: "LP", highlight: "High-energy punk from Champaign, Illinois." },
  { id: 39, title: "Hornet Piñata", artist: "The Didjits", catalogNo: "TG39", year: 1990, format: "LP", highlight: "Wild punk rock. One of the most fun bands on the label." },
  { id: 40, title: "Full Nelson Reilly", artist: "The Didjits", catalogNo: "TG57", year: 1991, format: "LP" },

  // Pegboy
  { id: 41, title: "Three Chord Monte", artist: "Pegboy", catalogNo: "TG53", year: 1990, format: "12\" EP", highlight: "Ex-Naked Raygun members deliver powerful melodic punk." },
  { id: 42, title: "Strong Reaction", artist: "Pegboy", catalogNo: "TG59", year: 1991, format: "LP", highlight: "Full-length debut. Chicago punk at its most tuneful and driving." },
  { id: 43, title: "Earwig", artist: "Pegboy", catalogNo: "TG87", year: 1994, format: "LP" },
  { id: 119, title: "Fore", artist: "Pegboy", catalogNo: "TG115", year: 1997, format: "LP" },

  // Girls Against Boys
  { id: 44, title: "Tropic of Scorpio", artist: "Girls Against Boys", catalogNo: "TG73", year: 1992, format: "LP", highlight: "DC post-hardcore with dual bass attack. Sleek and menacing." },
  { id: 45, title: "Venus Luxure No. 1 Baby", artist: "Girls Against Boys", catalogNo: "TG86", year: 1993, format: "LP", highlight: "Their breakthrough. Groove-laden post-hardcore." },
  { id: 46, title: "Cruise Yourself", artist: "Girls Against Boys", catalogNo: "TG98", year: 1994, format: "LP", highlight: "Final Touch and Go album before major label move." },

  // Don Caballero
  { id: 47, title: "For Respect", artist: "Don Caballero", catalogNo: "TG75", year: 1993, format: "LP", highlight: "Pittsburgh math rock debut. Damon Che's drumming is otherworldly." },
  { id: 48, title: "Don Caballero 2", artist: "Don Caballero", catalogNo: "TG97", year: 1995, format: "LP", highlight: "Even more complex polyrhythms and interlocking guitar parts." },
  { id: 49, title: "What Burns Never Returns", artist: "Don Caballero", catalogNo: "TG121", year: 1998, format: "LP", highlight: "Math rock opus. The genre's defining statement." },
  { id: 120, title: "American Don", artist: "Don Caballero", catalogNo: "TG156", year: 2000, format: "LP", highlight: "Their most accessible work. Cleaner production, same complexity." },

  // Louisville scene
  { id: 50, title: "Rusty", artist: "Rodan", catalogNo: "TG84", year: 1994, format: "LP", highlight: "Only album. A noise rock classic from Louisville that spawned many side projects." },
  { id: 51, title: "Tropics and Meridians", artist: "June of 44", catalogNo: "TG103", year: 1996, format: "LP", highlight: "Cinematic post-rock from the Louisville/NYC axis." },
  { id: 121, title: "Four Great Points", artist: "June of 44", catalogNo: "TG116", year: 1998, format: "LP" },
  { id: 122, title: "Anahata", artist: "June of 44", catalogNo: "TG141", year: 1999, format: "LP" },
  { id: 52, title: "Save Everything", artist: "Shipping News", catalogNo: "TG152", year: 2000, format: "LP", highlight: "Post-Slint/Rodan project. Intricate, dynamic compositions." },
  { id: 123, title: "Very Soon, and in Pleasant Company", artist: "Shipping News", catalogNo: "TG162", year: 2001, format: "LP" },
  { id: 124, title: "One Was Johnny", artist: "Shipping News", catalogNo: "TG195", year: 2003, format: "LP" },
  { id: 125, title: "Music for Egon Schiele", artist: "Rachel's", catalogNo: "TG94", year: 1996, format: "LP", highlight: "Chamber rock masterpiece. Lush strings and piano." },
  { id: 126, title: "The Sea and the Bells", artist: "Rachel's", catalogNo: "TG135", year: 1999, format: "LP" },
  { id: 127, title: "Systems/Layers", artist: "Rachel's", catalogNo: "TG177", year: 2003, format: "LP" },
  { id: 128, title: "The For Carnation", artist: "The For Carnation", catalogNo: "TG147", year: 2000, format: "LP", highlight: "Brian McMahan's post-Slint masterwork. Sparse, haunting, and beautiful." },
  { id: 129, title: "There Is No-One What Will Take Care of You", artist: "Palace Brothers", catalogNo: "TG74", year: 1993, format: "LP", highlight: "Will Oldham's debut. Raw, stark alt-country." },
  { id: 130, title: "Days in the Wake", artist: "Palace Brothers", catalogNo: "TG83", year: 1994, format: "LP" },

  // Gastr del Sol / Bastro
  { id: 53, title: "Diablo Guapo", artist: "Bastro", catalogNo: "TG44", year: 1989, format: "LP", highlight: "David Grubbs' noise rock project. Cerebral and abrasive." },
  { id: 131, title: "Sing the Troubled Beast", artist: "Bastro", catalogNo: "TG58", year: 1991, format: "LP" },
  { id: 54, title: "Crookt, Crackt, or Fly", artist: "Gastr del Sol", catalogNo: "TG76", year: 1994, format: "LP", highlight: "Grubbs and O'Rourke's experimental evolution from noise to composition." },
  { id: 55, title: "Upgrade & Afterlife", artist: "Gastr del Sol", catalogNo: "TG101", year: 1996, format: "LP", highlight: "Avant-garde masterpiece. Where post-rock met modern composition." },
  { id: 132, title: "Camoufleur", artist: "Gastr del Sol", catalogNo: "TG117", year: 1998, format: "LP", highlight: "Final album. Delicate, composed, and deeply moving." },

  // Silkworm
  { id: 56, title: "In the West", artist: "Silkworm", catalogNo: "TG71", year: 1994, format: "LP", highlight: "Literate indie rock. Dual-guitar interplay and smart songwriting." },
  { id: 57, title: "Firewater", artist: "Silkworm", catalogNo: "TG96", year: 1996, format: "LP", highlight: "Their most beloved album. Anthemic and devastating in equal measure." },
  { id: 58, title: "Developer", artist: "Silkworm", catalogNo: "TG110", year: 1997, format: "LP" },
  { id: 59, title: "Lifestyle", artist: "Silkworm", catalogNo: "TG126", year: 2000, format: "LP" },
  { id: 133, title: "Italian Platinum", artist: "Silkworm", catalogNo: "TG160", year: 2002, format: "LP" },
  { id: 134, title: "It'll Be Cool", artist: "Silkworm", catalogNo: "TG218", year: 2005, format: "LP", highlight: "Tragically, their last album before drummer Michael Dahlquist's death." },

  // Flour
  { id: 60, title: "Flour", artist: "Flour", catalogNo: "TG34", year: 1988, format: "LP", highlight: "One-man noise project from Minneapolis. Angular, tape-loop experimentation." },
  { id: 61, title: "Luv 713", artist: "Flour", catalogNo: "TG40", year: 1989, format: "LP" },

  // Arcwelder
  { id: 62, title: "Jacket Made in Canada", artist: "Arcwelder", catalogNo: "TG51", year: 1991, format: "LP", highlight: "Minneapolis melodic noise rock. Dense guitar interplay." },
  { id: 63, title: "Pull", artist: "Arcwelder", catalogNo: "TG67", year: 1993, format: "LP" },
  { id: 135, title: "Xerxes", artist: "Arcwelder", catalogNo: "TG90", year: 1994, format: "LP" },
  { id: 136, title: "Entropy", artist: "Arcwelder", catalogNo: "TG108", year: 1996, format: "LP" },

  // Mule
  { id: 64, title: "If I Don't Six", artist: "Mule", catalogNo: "TG63", year: 1992, format: "LP", highlight: "Michigan blues-punk duo. Raw, distorted blues filtered through punk." },
  { id: 137, title: "Wrung", artist: "Mule", catalogNo: "TG77", year: 1993, format: "LP" },

  // 2000s indie era
  { id: 65, title: "Fever to Tell", artist: "Yeah Yeah Yeahs", catalogNo: "TG202", year: 2003, format: "LP", highlight: "Karen O and company's debut full-length. 'Maps' became a defining indie anthem." },
  { id: 138, title: "Yeah Yeah Yeahs EP", artist: "Yeah Yeah Yeahs", catalogNo: "TG185", year: 2001, format: "12\" EP", highlight: "Self-titled debut EP. 'Bang' and 'Art Star' announced their arrival." },
  { id: 139, title: "Machine EP", artist: "Yeah Yeah Yeahs", catalogNo: "TG196", year: 2002, format: "12\" EP" },
  { id: 66, title: "Young Liars EP", artist: "TV on the Radio", catalogNo: "TG199", year: 2003, format: "12\" EP", highlight: "Brooklyn experimental rock. Early EP before their move to 4AD." },
  { id: 140, title: "Desperate Youth, Blood Thirsty Babes", artist: "TV on the Radio", catalogNo: "TG208", year: 2004, format: "LP", highlight: "Full-length debut. Genre-defying art-rock." },
  { id: 141, title: "New Health Rock", artist: "TV on the Radio", catalogNo: "TG212", year: 2004, format: "12\"" },
  { id: 67, title: "Fake Can Be Just as Good", artist: "Blonde Redhead", catalogNo: "TG112", year: 1997, format: "LP", highlight: "NYC art-rock trio's Touch and Go debut." },
  { id: 68, title: "In an Expression of the Inexpressible", artist: "Blonde Redhead", catalogNo: "TG129", year: 1998, format: "LP" },
  { id: 142, title: "Melody of Certain Damaged Lemons", artist: "Blonde Redhead", catalogNo: "TG153", year: 2000, format: "LP", highlight: "Transitional album showing their move toward dreamier textures." },

  // Calexico
  { id: 69, title: "The Black Light", artist: "Calexico", catalogNo: "TG131", year: 1998, format: "LP", highlight: "Southwestern indie rock. Mariachi horns meet desert noir." },
  { id: 70, title: "Hot Rail", artist: "Calexico", catalogNo: "TG155", year: 2000, format: "LP", highlight: "Expanded arrangements and broader sonic palette." },
  { id: 143, title: "Feast of Wire", artist: "Calexico", catalogNo: "TG193", year: 2003, format: "LP", highlight: "Their most acclaimed album. Lush, cinematic border-crossing rock." },
  { id: 144, title: "Garden Ruin", artist: "Calexico", catalogNo: "TG233", year: 2006, format: "LP" },

  // Man or Astro-man?
  { id: 71, title: "Experiment Zero", artist: "Man or Astro-man?", catalogNo: "TG143", year: 1999, format: "LP", highlight: "Sci-fi surf-rock with electronic experimentation." },
  { id: 145, title: "A Spectrum of Infinite Scale", artist: "Man or Astro-man?", catalogNo: "TG168", year: 2000, format: "LP" },
  { id: 146, title: "EEVIAC: Operational Index and Reference Guide", artist: "Man or Astro-man?", catalogNo: "TG136", year: 1997, format: "LP" },

  // The Ex
  { id: 72, title: "Starters Alternators", artist: "The Ex", catalogNo: "TG118", year: 1998, format: "LP", highlight: "Dutch anarcho-punk meets experimental post-punk. Decades of evolution." },
  { id: 147, title: "Dizzy Spells", artist: "The Ex", catalogNo: "TG139", year: 2001, format: "LP" },
  { id: 148, title: "Turn", artist: "The Ex", catalogNo: "TG201", year: 2004, format: "LP" },

  // Pinback
  { id: 73, title: "Blue Screen Life", artist: "Pinback", catalogNo: "TG189", year: 2001, format: "LP", highlight: "Intricate indie pop. Catchy hooks hidden in complex arrangements." },
  { id: 74, title: "Summer in Abaddon", artist: "Pinback", catalogNo: "TG213", year: 2004, format: "LP" },
  { id: 149, title: "Autumn of the Seraphs", artist: "Pinback", catalogNo: "TG240", year: 2007, format: "LP" },

  // Seam
  { id: 75, title: "Headsparks", artist: "Seam", catalogNo: "TG62", year: 1992, format: "LP", highlight: "Sooyoung Park's post-Bitch Magnet project. Atmospheric indie rock." },
  { id: 76, title: "The Problem with Me", artist: "Seam", catalogNo: "TG79", year: 1993, format: "LP" },
  { id: 77, title: "Are You Driving Me Crazy?", artist: "Seam", catalogNo: "TG105", year: 1995, format: "LP" },

  // Bitch Magnet
  { id: 78, title: "Star Booty", artist: "Bitch Magnet", catalogNo: "TG33", year: 1988, format: "12\" EP", highlight: "Post-hardcore noise rock. Influential on math rock and post-rock." },
  { id: 79, title: "Umber", artist: "Bitch Magnet", catalogNo: "TG36", year: 1989, format: "LP" },
  { id: 80, title: "Ben Hur", artist: "Bitch Magnet", catalogNo: "TG50", year: 1990, format: "LP", highlight: "Their magnum opus. Dense, propulsive noise rock." },

  // Dazzling Killmen
  { id: 81, title: "Introduce the Mesmers", artist: "Dazzling Killmen", catalogNo: "TG70", year: 1993, format: "LP", highlight: "St. Louis noise rock at its most dissonant and punishing." },

  // Coctails
  { id: 83, title: "Peel", artist: "Coctails", catalogNo: "TG54", year: 1991, format: "LP", highlight: "Chicago lounge-pop. A playful outlier in the Touch and Go catalog." },
  { id: 150, title: "Long Sound", artist: "Coctails", catalogNo: "TG68", year: 1993, format: "LP" },

  // Oxbow
  { id: 84, title: "Fuckfest", artist: "Oxbow", catalogNo: "TG47", year: 1989, format: "LP", highlight: "San Francisco noise rock. Eugene Robinson's intense vocal performances." },
  { id: 151, title: "King of the Jews", artist: "Oxbow", catalogNo: "TG61", year: 1991, format: "LP" },
  { id: 152, title: "Let Me Be a Woman", artist: "Oxbow", catalogNo: "TG66", year: 1992, format: "LP" },

  // The Mekons
  { id: 85, title: "Retreat from Memphis", artist: "The Mekons", catalogNo: "TG78", year: 1994, format: "LP", highlight: "Long-running UK post-punk/alt-country collective." },
  { id: 86, title: "Pussy, King of the Pirates", artist: "The Mekons", catalogNo: "TG100", year: 1996, format: "LP" },
  { id: 153, title: "Me", artist: "The Mekons", catalogNo: "TG125", year: 1998, format: "LP" },
  { id: 154, title: "Journey to the End of the Night", artist: "The Mekons", catalogNo: "TG148", year: 2000, format: "LP" },

  // The Black Heart Procession
  { id: 87, title: "1", artist: "The Black Heart Procession", catalogNo: "TG130", year: 1998, format: "LP", highlight: "Cinematic, melancholy soundscapes from San Diego." },
  { id: 88, title: "2", artist: "The Black Heart Procession", catalogNo: "TG145", year: 1999, format: "LP" },
  { id: 89, title: "Three", artist: "The Black Heart Procession", catalogNo: "TG175", year: 2001, format: "LP" },
  { id: 155, title: "Amore del Tropico", artist: "The Black Heart Procession", catalogNo: "TG200", year: 2003, format: "LP" },

  // Uzeda
  { id: 90, title: "Waters", artist: "Uzeda", catalogNo: "TG99", year: 1993, format: "LP", highlight: "Italian noise rock from Catania. Angular, Albini-influenced intensity." },
  { id: 156, title: "4", artist: "Uzeda", catalogNo: "TG127", year: 2000, format: "LP" },

  // Enon
  { id: 91, title: "Believo!", artist: "Enon", catalogNo: "TG150", year: 2000, format: "LP", highlight: "John Schmersal's post-Brainiac project. Catchy experimental pop-rock." },
  { id: 92, title: "High Society", artist: "Enon", catalogNo: "TG170", year: 2002, format: "LP" },
  { id: 157, title: "Hocus Pocus", artist: "Enon", catalogNo: "TG210", year: 2003, format: "LP" },

  // Brick Layer Cake
  { id: 95, title: "Brick Layer Cake", artist: "Brick Layer Cake", catalogNo: "TG46", year: 1989, format: "LP", highlight: "Todd Trainer's pre-Shellac project. Heavy, minimal instrumentals." },

  // The Monorchid
  { id: 97, title: "Who Put Out the Fire?", artist: "The Monorchid", catalogNo: "TG107", year: 1997, format: "LP", highlight: "Baltimore noise rock duo. Confrontational and abrasive." },
  { id: 158, title: "Let Them Eat", artist: "The Monorchid", catalogNo: "TG122", year: 1998, format: "LP" },

  // Thingy
  { id: 98, title: "Songs About Angels, Evil and Running Around on Fire", artist: "Thingy", catalogNo: "TG119", year: 1998, format: "LP", highlight: "San Diego art-rock. Angular post-punk with jazz leanings." },

  // Couch
  { id: 100, title: "Profane", artist: "Couch", catalogNo: "TG137", year: 2000, format: "LP", highlight: "Munich post-rock/krautrock. Hypnotic instrumental compositions." },
  { id: 159, title: "Figur 5", artist: "Couch", catalogNo: "TG171", year: 2002, format: "LP" },

  // Karate
  { id: 160, title: "The Bed Is in the Ocean", artist: "Karate", catalogNo: "TG124", year: 1998, format: "LP", highlight: "Boston post-hardcore meets jazz. Elegant guitar work and understated vocals." },
  { id: 161, title: "Unsolved", artist: "Karate", catalogNo: "TG142", year: 2000, format: "LP" },
  { id: 162, title: "Some Boots", artist: "Karate", catalogNo: "TG183", year: 2002, format: "LP" },
  { id: 163, title: "Pockets", artist: "Karate", catalogNo: "TG207", year: 2004, format: "LP" },

  // Bedhead / The New Year
  { id: 164, title: "WhatFunLifeWas", artist: "Bedhead", catalogNo: "TG89", year: 1994, format: "LP", highlight: "Dallas slowcore debut. Whispered vocals over intertwining guitar figures." },
  { id: 165, title: "Beheaded", artist: "Bedhead", catalogNo: "TG106", year: 1996, format: "LP" },
  { id: 166, title: "Transaction de Novo", artist: "Bedhead", catalogNo: "TG123", year: 1998, format: "LP", highlight: "Final album. The culmination of their quiet, restrained aesthetic." },
  { id: 167, title: "Newness Ends", artist: "The New Year", catalogNo: "TG165", year: 2001, format: "LP", highlight: "Post-Bedhead project. Same Kadane brothers precision." },
  { id: 168, title: "The New Year", artist: "The New Year", catalogNo: "TG197", year: 2008, format: "LP" },

  // Brainiac
  { id: 169, title: "Smack Bunny Baby", artist: "Brainiac", catalogNo: "TG69", year: 1993, format: "LP", highlight: "Dayton synth-punk. Manic energy and electronic experimentation." },
  { id: 170, title: "Bonsai Superstar", artist: "Brainiac", catalogNo: "TG95", year: 1994, format: "LP" },
  { id: 171, title: "Hissing Prigs in Static Couture", artist: "Brainiac", catalogNo: "TG109", year: 1996, format: "LP", highlight: "Their masterpiece. Tim Taylor's vision fully realized before his tragic death." },
  { id: 172, title: "Electro-Shock for President", artist: "Brainiac", catalogNo: "TG111", year: 1997, format: "LP" },

  // Laughing Hyenas
  { id: 173, title: "You Can't Pray a Lie", artist: "Laughing Hyenas", catalogNo: "TG72", year: 1989, format: "LP", highlight: "Ann Arbor noise rock. Blues-drenched punk fury." },
  { id: 174, title: "Life of Crime", artist: "Laughing Hyenas", catalogNo: "TG61a", year: 1990, format: "LP" },
  { id: 175, title: "Hard Times", artist: "Laughing Hyenas", catalogNo: "TG83a", year: 1995, format: "LP" },

  // U.S. Maple
  { id: 176, title: "Long Hair in Three Stages", artist: "U.S. Maple", catalogNo: "TG102", year: 1995, format: "LP", highlight: "Chicago deconstructionist noise rock. Willfully obtuse and brilliant." },
  { id: 177, title: "Sang Phat Editor", artist: "U.S. Maple", catalogNo: "TG113", year: 1997, format: "LP" },
  { id: 178, title: "Talker", artist: "U.S. Maple", catalogNo: "TG140", year: 1999, format: "LP" },
  { id: 179, title: "Acre Thrills", artist: "U.S. Maple", catalogNo: "TG158", year: 2001, format: "LP" },

  // Codeine
  { id: 180, title: "Frigid Stars LP", artist: "Codeine", catalogNo: "TG104", year: 1990, format: "LP", highlight: "Slowcore pioneers. Glacially paced and devastating." },
  { id: 181, title: "The White Birch", artist: "Codeine", catalogNo: "TG114", year: 1994, format: "LP", highlight: "Even slower, heavier, more beautiful. A slowcore landmark." },

  // Labradford
  { id: 182, title: "Labradford", artist: "Labradford", catalogNo: "TG128", year: 1996, format: "LP", highlight: "Richmond ambient post-rock. Droning, minimal soundscapes." },
  { id: 183, title: "Mi Media Naranja", artist: "Labradford", catalogNo: "TG133", year: 1997, format: "LP" },
  { id: 184, title: "E Luxo So", artist: "Labradford", catalogNo: "TG138", year: 1999, format: "LP" },
  { id: 185, title: "Fixed::Context", artist: "Labradford", catalogNo: "TG163", year: 2001, format: "LP" },

  // Trans Am
  { id: 186, title: "Trans Am", artist: "Trans Am", catalogNo: "TG104a", year: 1996, format: "LP", highlight: "DC instrumental rock. Krautrock-influenced motorik grooves." },
  { id: 187, title: "Surrender to the Night", artist: "Trans Am", catalogNo: "TG114a", year: 1997, format: "LP" },
  { id: 188, title: "The Surveillance", artist: "Trans Am", catalogNo: "TG132", year: 1998, format: "LP" },
  { id: 189, title: "Futureworld", artist: "Trans Am", catalogNo: "TG146", year: 1999, format: "LP" },
  { id: 190, title: "Red Line", artist: "Trans Am", catalogNo: "TG159", year: 2000, format: "LP" },

  // Sweep the Leg Johnny
  { id: 191, title: "4.9.21.30", artist: "Sweep the Leg Johnny", catalogNo: "TG134", year: 1998, format: "LP", highlight: "Chicago sax-driven noise rock. Jazz meets post-hardcore chaos." },
  { id: 192, title: "Going Down Swingin'", artist: "Sweep the Leg Johnny", catalogNo: "TG151", year: 2000, format: "LP" },
  { id: 193, title: "Sto Cazzo!", artist: "Sweep the Leg Johnny", catalogNo: "TG173", year: 2001, format: "LP" },

  // Dianogah
  { id: 194, title: "As Seen from Above", artist: "Dianogah", catalogNo: "TG149", year: 2000, format: "LP", highlight: "Dual-bass instrumental post-rock from Chicago." },
  { id: 195, title: "Battle Champions", artist: "Dianogah", catalogNo: "TG190", year: 2003, format: "LP" },

  // Nina Nastasia
  { id: 196, title: "Dogs", artist: "Nina Nastasia", catalogNo: "TG164", year: 2000, format: "LP", highlight: "Dark folk songs produced by Steve Albini. Spare and haunting." },
  { id: 197, title: "The Blackened Air", artist: "Nina Nastasia", catalogNo: "TG176", year: 2002, format: "LP" },
  { id: 198, title: "Run to Ruin", artist: "Nina Nastasia", catalogNo: "TG198", year: 2003, format: "LP" },
  { id: 199, title: "On Leaving", artist: "Nina Nastasia", catalogNo: "TG228", year: 2006, format: "LP" },
  { id: 200, title: "You Follow Me", artist: "Nina Nastasia", catalogNo: "TG245", year: 2007, format: "LP" },

  // Volcano Suns
  { id: 201, title: "The Bright Orange Years", artist: "Volcano Suns", catalogNo: "TG16a", year: 1985, format: "LP", highlight: "Boston noise-pop. Peter Prescott's post-Mission of Burma project." },
  { id: 202, title: "All-Night Lotus Party", artist: "Volcano Suns", catalogNo: "TG33a", year: 1988, format: "LP" },

  // Poster Children
  { id: 203, title: "Flower Plower", artist: "Poster Children", catalogNo: "TG66a", year: 1991, format: "LP", highlight: "Champaign indie rock. Genre-spanning post-punk energy." },
  { id: 204, title: "Tool of the Man", artist: "Poster Children", catalogNo: "TG89a", year: 1993, format: "LP" },

  // Colossamite
  { id: 205, title: "Economy of Motion", artist: "Colossamite", catalogNo: "TG144", year: 1998, format: "LP", highlight: "Abrasive, technical noise rock from the Midwest." },
  { id: 206, title: "All Lingo's Clamor", artist: "Colossamite", catalogNo: "TG167", year: 2001, format: "LP" },

  // Out Hud
  { id: 207, title: "S.T.R.E.E.T. D.A.D.", artist: "Out Hud", catalogNo: "TG179", year: 2002, format: "LP", highlight: "Brooklyn dance-punk. Electronic rhythms with live instruments." },
  { id: 208, title: "Let Us Never Speak of It Again", artist: "Out Hud", catalogNo: "TG216", year: 2005, format: "LP" },

  // !!! (Chk Chk Chk)
  { id: 209, title: "!!!", artist: "!!! (Chk Chk Chk)", catalogNo: "TG166", year: 2001, format: "LP", highlight: "Dance-punk debut. Infectious grooves from Sacramento." },

  // Radar Bros.
  { id: 210, title: "The Singing Hatchet", artist: "Radar Bros.", catalogNo: "TG154", year: 2000, format: "LP", highlight: "LA dream-pop. Lush, atmospheric guitar-based songwriting." },
  { id: 211, title: "And the Surrounding Mountains", artist: "Radar Bros.", catalogNo: "TG181", year: 2002, format: "LP" },

  // Euphone
  { id: 212, title: "Hashin' It Out", artist: "Euphone", catalogNo: "TG169", year: 2001, format: "LP", highlight: "Intricate instrumental post-rock with electronics and jazz." },

  // Pit Er Pat
  { id: 213, title: "Shakey", artist: "Pit Er Pat", catalogNo: "TG230", year: 2006, format: "LP", highlight: "Chicago experimental pop. Playful and rhythmic." },

  // Various / compilations
  { id: 214, title: "Hated Uncles 12\"", artist: "Various Artists", year: 1983, format: "12\"", highlight: "Early Touch and Go compilation documenting the Midwest hardcore scene." },
  { id: 215, title: "Dope-Guns-'N-Fucking in the Streets", artist: "Various Artists", catalogNo: "TG Series", year: 1988, format: "7\" series", highlight: "Legendary compilation series showcasing the Touch and Go roster. Multiple volumes released 1988–1998." },
  { id: 216, title: "God's Favorite Dog", artist: "Various Artists", catalogNo: "TG102a", year: 1994, format: "LP", highlight: "Compilation featuring label highlights." },
];

export function getTouchGoRecordsReleaseById(id: number): TouchGoRecordsRelease | undefined {
  return touchgorecordsReleases.find((release) => release.id === id);
}
