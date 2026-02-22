type AlbumTrack = {
  position?: string;
  title: string;
  duration?: string;
};

type AlbumDetailTracklistProps = {
  tracks?: AlbumTrack[];
  variant: "gbv" | "amrep";
  emptyLabel: string;
};

export function AlbumDetailTracklist({
  tracks,
  emptyLabel,
}: AlbumDetailTracklistProps) {
  if (!tracks || tracks.length === 0) {
    return <p className="text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <div className="space-y-1">
      {tracks.map((track, idx) => (
        <div
          key={`${track.title}-${idx}`}
          className="flex items-baseline gap-3 py-1.5"
        >
          <span className="text-sm text-muted-foreground w-6 text-right shrink-0">
            {track.position || idx + 1}
          </span>
          <span className="text-sm">{track.title}</span>
          {track.duration && (
            <span className="text-sm text-muted-foreground ml-auto shrink-0">
              {track.duration}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
