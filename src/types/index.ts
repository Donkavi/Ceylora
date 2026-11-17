/**
 * Core content types for Ceylora.
 * Every content collection is plain serialisable data so it can later be
 * replaced by a CMS or API without touching the components that render it.
 */

export type CategoryId =
  | 'beaches'
  | 'mountains'
  | 'heritage'
  | 'wildlife'
  | 'nature'
  | 'adventure'
  | 'culture';

export type RegionId = 'cultural-triangle' | 'hill-country' | 'south-coast' | 'east-coast' | 'wild-interior';

export interface Category {
  id: CategoryId;
  label: string;
  title: string;
  description: string;
}

export interface Region {
  id: RegionId;
  name: string;
  description: string;
}

/** Latitude, longitude in decimal degrees (WGS84). */
export type LatLng = [number, number];

export interface PhotoCredit {
  author: string;
  license: string;
  source: string;
}

export interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Tiny base64 image used as a blurred placeholder while loading. */
  blur: string;
  credit: PhotoCredit;
  /** CSS object-position hint for art direction, e.g. "50% 30%". */
  focus?: string;
}

export interface Attraction {
  name: string;
  description: string;
  kind?: string;
}

export interface Season {
  /** Months (1–12) that are ideal to visit. */
  best: number[];
  /** Months (1–12) that are good but with trade-offs. */
  shoulder: number[];
  summary: string;
}

export interface TravelInfo {
  fromColombo: { distanceKm: number; duration: string };
  recommendedStay: string;
  gettingThere: string[];
  tips: string[];
}

export interface Destination {
  slug: string;
  name: string;
  region: RegionId;
  province: string;
  coordinates: LatLng;
  elevation?: string;
  categories: CategoryId[];
  /** Short, emotional one-liner shown on heroes and cards. */
  tagline: string;
  /** One or two sentences used for previews and metadata. */
  summary: string;
  intro: string[];
  hero: string;
  gallery: string[];
  attractions: Attraction[];
  season: Season;
  travel: TravelInfo;
}

export interface Experience {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  story: string;
  image: string;
  locations: string[];
  duration: string;
  bestSeason: string;
  relatedDestinations: string[];
}

export interface ItineraryStop {
  day: number;
  title: string;
  destination: string;
  description: string;
  experiences: string[];
  /** Travel into this stop from the previous one. Omitted on day one. */
  transfer?: { from: string; distanceKm: number; duration: string; mode: string };
}

export interface Itinerary {
  slug: string;
  title: string;
  days: number;
  strapline: string;
  summary: string;
  pace: 'Unhurried' | 'Balanced' | 'Adventurous';
  bestFor: string[];
  image: string;
  stops: ItineraryStop[];
}

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'image'; photo: string; caption?: string }
  | { type: 'list'; items: { title: string; text: string }[] };

export interface JournalArticle {
  slug: string;
  title: string;
  dek: string;
  category: string;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  cover: string;
  relatedDestinations: string[];
  body: ArticleBlock[];
}

export interface CultureTopic {
  slug: string;
  title: string;
  kicker: string;
  body: string[];
  image: string;
  facts: { label: string; value: string }[];
}
