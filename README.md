# Ceylora — Sri Lanka. A Little Island, A World of Wonders.

An immersive tourism site for Sri Lanka built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion, GSAP ScrollTrigger, Lenis and React Leaflet.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, Open Graph images and the sitemap use your domain.

## What's where

```
src/
  app/                 Routes: home, explore (map), destinations/[slug], experiences,
                       culture, journal/[slug], itineraries, travel-info, credits,
                       sitemap.ts, robots.ts
  components/
    home/              Hero, pinned scroll journey, map section, rails and teasers
    map/               Leaflet map (client-only, lazy-loaded), explorer UI, panel, mini map
    destinations/      Category layouts, masonry gallery + lightbox, season chart
    itineraries/       Route explorer with map
    journal/           Article cards, reading progress
    animations/        Reveal, SplitHeading, ParallaxPhoto, ImageReveal
    layout/            Navbar, mobile menu, footer, smooth scrolling
    ui/                Photo / PhotoImage, buttons, page hero, JSON-LD
  data/                All content as typed data (destinations, experiences,
                       itineraries, articles, culture, journey) — CMS-ready
  lib/                 photos registry access, SEO helpers, geo utilities, hooks
  types/               Destination, Attraction, Experience, Itinerary, JournalArticle…
```

Content is plain serialisable data behind small accessor functions (`getDestination`, `getArticle`, `getPhoto`…), so a CMS or API can replace `src/data` without touching components.

## Photography

All 175 photographs are real images of the places they describe, sourced from Wikimedia Commons and stored in `public/images`. `src/data/photos.generated.ts` holds each photo's size, alt text, blur placeholder, author, licence and source page; the `/credits` page lists them all. Most are CC BY / CC BY-SA, so keep the credits page (or equivalent attribution) when you deploy.

Photos are referenced by id (e.g. `sigiriya-hero`). A destination's gallery is every photo whose id starts with its slug. A missing id renders a clearly labelled placeholder instead of a misleading image.

To add photos, use the scripts in `scripts/photos/` (Node 20+):

1. `node search.mjs topics.json candidates.json` searches Commons for landscape photos per topic.
2. `node sheets.mjs candidates.json sheets` builds numbered contact sheets for review.
3. Add picks to `selection.json` as `[candidateIndex, photoId, altText]`.
4. `node fetch.mjs selection.json candidates.json ../..` downloads, resizes and regenerates the registry.

## Maps

Tiles come from Esri World Imagery (satellite) and CARTO Voyager (map view), with attribution shown on the map. Check each provider's terms for your traffic level before going live, or swap the URLs in `src/components/map/IslandMap.tsx`. The island outline in the homepage journey comes from the geoBoundaries ADM0 dataset (CC BY 4.0).

## Motion and accessibility

Animations respect `prefers-reduced-motion`: smooth scrolling is disabled, the pinned journey becomes stacked full-screen frames, and decorative motion is removed. Leaflet, GSAP pinning and the lightbox are client-only and loaded when needed.
