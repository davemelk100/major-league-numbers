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

const e6Songs: Song[] = [
  { id: 1, title: "In the Aeroplane Over the Sea", artist: "Neutral Milk Hotel", album: "In the Aeroplane Over the Sea", year: 1998 },
  { id: 2, title: "Holland, 1945", artist: "Neutral Milk Hotel", album: "In the Aeroplane Over the Sea", year: 1998 },
  { id: 3, title: "King of Carrot Flowers, Pt. 1", artist: "Neutral Milk Hotel", album: "In the Aeroplane Over the Sea", year: 1998 },
  { id: 4, title: "Two-Headed Boy", artist: "Neutral Milk Hotel", album: "In the Aeroplane Over the Sea", year: 1998 },
  { id: 5, title: "Song Against Sex", artist: "Neutral Milk Hotel", album: "On Avery Island", year: 1996 },
  { id: 6, title: "Naomi", artist: "Neutral Milk Hotel", album: "On Avery Island", year: 1996 },
  { id: 7, title: "Signal in the Sky", artist: "The Apples in Stereo", album: "Fun Trick Noisemaker", year: 1995 },
  { id: 8, title: "Tidal Wave", artist: "The Apples in Stereo", album: "Fun Trick Noisemaker", year: 1995 },
  { id: 9, title: "Energy", artist: "The Apples in Stereo", album: "New Magnetic Wonder", year: 2007 },
  { id: 10, title: "Jumping Fences", artist: "The Olivia Tremor Control", album: "Dusk at Cubist Castle", year: 1996 },
  { id: 11, title: "Hideaway", artist: "The Olivia Tremor Control", album: "Dusk at Cubist Castle", year: 1996 },
  { id: 12, title: "The Opera House", artist: "The Olivia Tremor Control", album: "Black Foliage", year: 1999 },
  { id: 13, title: "Wraith Pinned to the Mist and Other Games", artist: "of Montreal", album: "The Sunlandic Twins", year: 2005 },
  { id: 14, title: "Heimdalsgate Like a Promethean Curse", artist: "of Montreal", album: "Hissing Fauna, Are You the Destroyer?", year: 2007 },
  { id: 15, title: "The Past Is a Grotesque Animal", artist: "of Montreal", album: "Hissing Fauna, Are You the Destroyer?", year: 2007 },
  { id: 16, title: "Suffer for Fashion", artist: "of Montreal", album: "Hissing Fauna, Are You the Destroyer?", year: 2007 },
  { id: 17, title: "Id Engager", artist: "of Montreal", album: "Skeletal Lamping", year: 2008 },
  { id: 18, title: "When the Red King Comes", artist: "Elf Power", album: "When the Red King Comes", year: 1997 },
  { id: 19, title: "Let the Serpent Sleep", artist: "Elf Power", album: "A Dream in Sound", year: 1999 },
  { id: 20, title: "The First Imaginary Symphony for Nomad", artist: "The Music Tapes", album: "First Imaginary Symphony for Nomad", year: 1999 },
  { id: 21, title: "A Score for Two (If) Travellers", artist: "Circulatory System", album: "Circulatory System", year: 2001 },
  { id: 22, title: "Popular Mechanics for Lovers", artist: "Beulah", album: "When Your Heartstrings Break", year: 1999 },
  { id: 23, title: "Emma Blowgun's Last Stand", artist: "Beulah", album: "The Coast Is Never Clear", year: 2001 },
  { id: 24, title: "Little Sparkee", artist: "Dressy Bessy", album: "Pink Hearts Yellow Moons", year: 1999 },
  { id: 25, title: "Are You Sleepy?", artist: "The Gerbils", album: "Are You Sleepy?", year: 1997 },
  { id: 26, title: "Everything Is", artist: "Neutral Milk Hotel", album: "Everything Is", year: 1994 },
  { id: 27, title: "Cherry Peel", artist: "of Montreal", album: "Cherry Peel", year: 1997 },
  { id: 28, title: "Disconnection", artist: "of Montreal", album: "Satanic Panic in the Attic", year: 2004 },
  { id: 29, title: "Ghost", artist: "Neutral Milk Hotel", album: "In the Aeroplane Over the Sea", year: 1998 },
  { id: 30, title: "Oh Comely", artist: "Neutral Milk Hotel", album: "In the Aeroplane Over the Sea", year: 1998 },
  { id: 31, title: "Communist Daughter", artist: "Neutral Milk Hotel", album: "In the Aeroplane Over the Sea", year: 1998 },
  { id: 32, title: "Lycanthropy", artist: "of Montreal", album: "Hissing Fauna, Are You the Destroyer?", year: 2007 },
  { id: 33, title: "I Was a Landscape in Your Dream", artist: "The Olivia Tremor Control", album: "Dusk at Cubist Castle", year: 1996 },
  { id: 34, title: "Love It Love It", artist: "Nana Grizol", album: "Love It Love It", year: 2008 },
  { id: 35, title: "Hooray for Tuesday", artist: "The Minders", album: "Hooray for Tuesday", year: 1998 },
];

export function E6SongsContent() {
  const [search, setSearch] = useState("");

  const filteredSongs = e6Songs.filter(
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
        Showing {filteredSongs.length} of {e6Songs.length} songs
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
