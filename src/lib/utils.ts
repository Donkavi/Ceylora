import type { LatLng } from '@/types';

/** Joins class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Great-circle distance in kilometres between two coordinates. */
export function distanceKm([lat1, lng1]: LatLng, [lat2, lng2]: LatLng): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Rough road distance and drive time from straight-line distance.
 * Sri Lankan roads wind through hills, so a 1.35 detour factor and an
 * average of ~38 km/h give honest planning numbers.
 */
export function estimateDrive(km: number): { roadKm: number; duration: string } {
  const roadKm = Math.round((km * 1.35) / 5) * 5;
  const hours = roadKm / 38;
  return { roadKm, duration: formatHours(hours) };
}

export function formatHours(hours: number): string {
  if (hours < 1) return `${Math.max(15, Math.round((hours * 60) / 15) * 15)} min`;
  const rounded = Math.round(hours * 2) / 2;
  return `${rounded % 1 === 0 ? rounded : rounded.toFixed(1)} hr${rounded === 1 ? '' : 's'}`;
}

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

/** Formats coordinates as e.g. 7.9570° N, 80.7603° E. */
export function formatCoordinates([lat, lng]: LatLng): string {
  return `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? 'E' : 'W'}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function pad(n: number): string {
  return n.toString().padStart(2, '0');
}
