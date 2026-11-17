import type { Photo } from '@/types';
import { photoList } from '@/data/photos.generated';

const registry: Record<string, Photo> = Object.fromEntries(photoList.map((p) => [p.id, p]));

/**
 * A clearly-labelled placeholder, used only if a photograph is missing,
 * so a wrong image is never passed off as a real destination.
 */
const placeholder = (id: string): Photo => ({
  id,
  src: '/images/placeholder.svg',
  width: 1600,
  height: 1000,
  alt: 'Photograph coming soon',
  blur: 'data:image/gif;base64,R0lGODlhAQABAIAAAOnfyAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
  credit: { author: 'Ceylora', license: 'Placeholder', source: '' },
});

export function getPhoto(id: string): Photo {
  return registry[id] ?? placeholder(id);
}

export function hasPhoto(id: string): boolean {
  return id in registry;
}

/** Every photo registered under a destination slug, excluding its hero. */
export function galleryFor(slug: string): string[] {
  return photoList.filter((p) => p.id.startsWith(`${slug}-`) && p.id !== `${slug}-hero`).map((p) => p.id);
}

export const allPhotos = photoList;
