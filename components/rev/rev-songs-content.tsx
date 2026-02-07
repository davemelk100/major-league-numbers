"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  year: number;
}

const revSongs: Song[] = [
  { id: 1, title: "Start Today", artist: "Gorilla Biscuits", album: "Start Today", year: 1989 },
  { id: 2, title: "New Direction", artist: "Gorilla Biscuits", album: "Start Today", year: 1989 },
  { id: 3, title: "Cats and Dogs", artist: "Gorilla Biscuits", album: "Start Today", year: 1989 },
  { id: 4, title: "Break Down the Walls", artist: "Youth of Today", album: "Break Down the Walls", year: 1986 },
  { id: 5, title: "Youth of Today", artist: "Youth of Today", album: "Break Down the Walls", year: 1986 },
  { id: 6, title: "Make a Change", artist: "Youth of Today", album: "We're Not in This Alone", year: 1988 },
  { id: 7, title: "Bringin' It Down", artist: "Judge", album: "Bringin' It Down", year: 1989 },
  { id: 8, title: "New York Crew", artist: "Judge", album: "New York Crew", year: 1988 },
  { id: 9, title: "The Storm", artist: "Judge", album: "Bringin' It Down", year: 1989 },
  { id: 10, title: "Speak Out", artist: "Bold", album: "Speak Out", year: 1988 },
  { id: 11, title: "Nailed to the X", artist: "Bold", album: "Speak Out", year: 1988 },
  { id: 12, title: "True Till Death", artist: "Chain of Strength", album: "The One Thing That Still Holds True", year: 1989 },
  { id: 13, title: "What Holds Us Apart", artist: "Chain of Strength", album: "The One Thing That Still Holds True", year: 1989 },
  { id: 14, title: "Fazer", artist: "Quicksand", album: "Slip", year: 1993 },
  { id: 15, title: "Dine Alone", artist: "Quicksand", album: "Slip", year: 1993 },
  { id: 16, title: "Omission", artist: "Quicksand", album: "Manic Compression", year: 1995 },
  { id: 17, title: "Do You Know Who You Are?", artist: "Texas Is the Reason", album: "Do You Know Who You Are?", year: 1996 },
  { id: 18, title: "The Magic Bullet Theory", artist: "Texas Is the Reason", album: "Do You Know Who You Are?", year: 1996 },
  { id: 19, title: "Back and to the Left", artist: "Texas Is the Reason", album: "Do You Know Who You Are?", year: 1996 },
  { id: 20, title: "No Spiritual Surrender", artist: "Inside Out", album: "No Spiritual Surrender", year: 1990 },
  { id: 21, title: "Burning Fight", artist: "Inside Out", album: "No Spiritual Surrender", year: 1990 },
  { id: 22, title: "You're Only Young Once", artist: "Side By Side", album: "You're Only Young Once", year: 1988 },
  { id: 23, title: "Lower East Side Crew", artist: "Warzone", album: "Lower East Side Crew", year: 1987 },
  { id: 24, title: "Sick of It All", artist: "Sick of It All", album: "Sick of It All", year: 1987 },
  { id: 25, title: "Quest for Certainty", artist: "Shelter", album: "Quest for Certainty", year: 1990 },
  { id: 26, title: "Here We Go", artist: "Shelter", album: "Perfection of Desire", year: 1990 },
  { id: 27, title: "Rochambeau", artist: "Farside", album: "Rochambeau", year: 1992 },
  { id: 28, title: "Can I Say", artist: "Dag Nasty", album: "Can I Say", year: 1986 },
  { id: 29, title: "Set Your Goals", artist: "CIV", album: "Set Your Goals", year: 1995 },
  { id: 30, title: "Can't Wait One Minute More", artist: "CIV", album: "Set Your Goals", year: 1995 },
  { id: 31, title: "The Difference Between", artist: "In My Eyes", album: "The Difference Between", year: 1998 },
  { id: 32, title: "U.S. Songs", artist: "Elliott", album: "U.S. Songs", year: 1998 },
  { id: 33, title: "Calm Americans", artist: "Elliott", album: "False Cathedrals", year: 2000 },
  { id: 34, title: "Call on My Brothers", artist: "Ignite", album: "Call on My Brothers", year: 1995 },
  { id: 35, title: "That Within Blood Ill-Tempered", artist: "Shai Hulud", album: "That Within Blood Ill-Tempered", year: 2003 },
];

export function RevSongsContent() {
  const [search, setSearch] = useState("");

  const filteredSongs = revSongs.filter(
    (song) =>
      search === "" ||
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase()) ||
      song.album.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Notable Songs</h1>

      <div className="mb-6">
        <Input
          placeholder="Search songs, artists, albums..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredSongs.length} of {revSongs.length} songs
      </p>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            {filteredSongs.map((song) => (
              <div key={song.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                <div>
                  <p className="text-sm font-medium">{song.title}</p>
                  <p className="text-xs text-muted-foreground">{song.artist} · {song.album}</p>
                </div>
                <span className="text-xs text-muted-foreground">{song.year}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
