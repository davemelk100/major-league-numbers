# White-label topics

This project supports multiple branded "topic" sites (e.g. GBV, AmRep) that
share a common shell and can be themed via config + CSS.

## Add a new topic

1. **Add a config entry**
   - Update `lib/music-site.ts` with a new `MusicSiteConfig`.
   - Required fields: `id`, `name`, `shortName`, `basePath`, `shellClass`,
     nav labels, sources, and `seo`.

2. **Add theme styles**
   - Add a `.yourtopic-shell` section in `styles/globals.css`.
   - Follow the existing `.gbv-shell` and `.amrep-shell` patterns for cards,
     text colors, buttons, inputs, and icon filters.

3. **Add routes**
   - Create `app/yourtopic/layout.tsx` using `createSiteMetadata` and
     `getSiteJsonLd` from `lib/music-site.ts`.
   - Create `app/yourtopic/page.tsx` and any sub-pages needed.

4. **Add components**
   - Copy a topic folder under `components/` (e.g. `components/gbv`) and
     update any topic-specific labels, data, and imagery.

5. **Add data + APIs**
   - Add new topic data files under `lib/` and `data/` as needed.
   - Create `/app/api/yourtopic/ask/route.ts` if the topic supports chat.

## Notes

- The `MUSIC_SITES` registry in `lib/music-site.ts` drives path detection,
  metadata, and layout theming.
- `components/layout-wrapper.tsx` automatically recognizes new topics based
  on `MUSIC_SITES`—no additional routing updates are needed.
