import type { Destination } from '@/types';
import type { MapPoint } from '@/components/map/types';
import { destinations } from '@/data/destinations';
import { regionMap } from '@/data/categories';
import { getPhoto } from '@/lib/photos';
import { distanceKm } from '@/lib/utils';

/** Other destinations ordered by straight-line distance. */
export function nearestDestinations(dest: Destination, count = 4) {
  return destinations
    .filter((d) => d.slug !== dest.slug)
    .map((d) => ({ destination: d, km: distanceKm(dest.coordinates, d.coordinates) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count);
}

export function toMapPoint(d: Destination): MapPoint {
  return {
    slug: d.slug,
    name: d.name,
    region: regionMap[d.region].name,
    coordinates: d.coordinates,
    categories: d.categories,
    tagline: d.tagline,
    summary: d.summary,
    photo: getPhoto(d.hero),
    attractions: d.attractions.map((a) => a.name),
    nearby: nearestDestinations(d, 3).map(({ destination, km }) => ({
      slug: destination.slug,
      name: destination.name,
      distanceKm: Math.round(km),
    })),
  };
}

export function allMapPoints(): MapPoint[] {
  return destinations.map(toMapPoint);
}
