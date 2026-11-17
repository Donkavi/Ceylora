import type { MetadataRoute } from 'next';
import { destinations } from '@/data/destinations';
import { articles } from '@/data/articles';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['/', '/explore', '/destinations', '/experiences', '/culture', '/journal', '/itineraries', '/travel-info', '/credits'];
  return [
    ...pages.map((p) => ({
      url: absoluteUrl(p),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: p === '/' ? 1 : 0.8,
    })),
    ...destinations.map((d) => ({
      url: absoluteUrl(`/destinations/${d.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/journal/${a.slug}`),
      lastModified: new Date(a.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
