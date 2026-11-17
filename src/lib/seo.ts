import type { Metadata } from 'next';
import { site } from '@/data/site';
import { getPhoto } from '@/lib/photos';

interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
}

/** Consistent page metadata with Open Graph and Twitter cards built from a registered photo. */
export function pageMetadata({ title, description, path, image = 'home-hero', type = 'website', publishedTime }: PageMeta): Metadata {
  const photo = getPhoto(image);
  const images = [{ url: photo.src, width: photo.width, height: photo.height, alt: photo.alt }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title: `${title} · ${site.name}`, description, images: [photo.src] },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
