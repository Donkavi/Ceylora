import Link from 'next/link';
import { MapExplorer } from '@/components/map/MapExplorer';
import { Reveal } from '@/components/animations/Reveal';
import { regions } from '@/data/categories';
import { destinations } from '@/data/destinations';
import { allMapPoints } from '@/lib/destinations';
import { pageMetadata } from '@/lib/seo';
import { formatCoordinates } from '@/lib/utils';

export const metadata = pageMetadata({
  title: 'Explore the Island — Interactive Map of Sri Lanka',
  description:
    'An interactive map of Sri Lanka’s finest destinations — ancient cities, tea country, national parks and beaches — plotted at their real coordinates.',
  path: '/explore',
  image: 'arugam-bay-hero',
});

export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  const { d } = await searchParams;
  const points = allMapPoints();
  const initial = points.some((p) => p.slug === d) ? d! : null;

  return (
    <>
      <h1 className="sr-only">Explore Sri Lanka on an interactive map</h1>
      <MapExplorer points={points} variant="page" title="Explore the Island" initialSelected={initial} />

      <section aria-labelledby="regions-heading" className="bg-ivory py-24 md:py-36">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-tropical">The island by region</p>
            <h2 id="regions-heading" className="display-lg mt-5 text-forest">
              Five landscapes, <em className="text-gold">a day’s drive apart.</em>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {regions.map((region, i) => (
              <Reveal key={region.id} delay={(i % 3) * 0.08} className="border-t border-forest/15 pt-6">
                <p className="font-display text-sm text-gold tabular-nums">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 font-display text-3xl text-forest">{region.name}</h3>
                <p className="mt-2 text-sm text-charcoal/65">{region.description}</p>
                <ul className="mt-5 space-y-2">
                  {destinations
                    .filter((dest) => dest.region === region.id)
                    .map((dest) => (
                      <li key={dest.slug} className="flex items-baseline justify-between gap-4">
                        <Link href={`/destinations/${dest.slug}`} className="link-underline text-charcoal/90 hover:text-forest">
                          {dest.name}
                        </Link>
                        <span className="text-[11px] text-stone tabular-nums">{formatCoordinates(dest.coordinates)}</span>
                      </li>
                    ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
