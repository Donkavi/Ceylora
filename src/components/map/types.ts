import type { CategoryId, LatLng, Photo } from '@/types';

/** A slim, serialisable view of a destination for the client-side map. */
export interface MapPoint {
  slug: string;
  name: string;
  region: string;
  coordinates: LatLng;
  categories: CategoryId[];
  tagline: string;
  summary: string;
  photo: Photo;
  attractions: string[];
  nearby: { slug: string; name: string; distanceKm: number }[];
}

export type MapFilter = 'all' | CategoryId;

export const CATEGORY_COLORS: Record<CategoryId, string> = {
  beaches: '#397C91',
  mountains: '#47745A',
  heritage: '#C99D62',
  wildlife: '#A2643A',
  nature: '#6E8F4E',
  adventure: '#2E5E6E',
  culture: '#9B4A3C',
};

export const MAP_FILTERS: { id: MapFilter; label: string }[] = [
  { id: 'all', label: 'All destinations' },
  { id: 'beaches', label: 'Beaches' },
  { id: 'mountains', label: 'Mountains' },
  { id: 'wildlife', label: 'Wildlife' },
  { id: 'heritage', label: 'Heritage' },
  { id: 'nature', label: 'Nature' },
  { id: 'adventure', label: 'Adventure' },
];
