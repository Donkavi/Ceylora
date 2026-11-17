import { MapExplorer } from '@/components/map/MapExplorer';
import { Reveal } from '@/components/animations/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { allMapPoints } from '@/lib/destinations';

/** The homepage map: twenty-one destinations plotted at their true coordinates. */
export function MapSection() {
  const points = allMapPoints();
  return (
    <section aria-labelledby="map-heading" className="bg-ivory pt-28 pb-24 md:pt-40 md:pb-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 pb-12 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-tropical">Explore the island</p>
            <h2 id="map-heading" className="display-lg mt-5 text-forest">
              Twenty-one places, <em className="text-gold">one small island.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="max-w-sm">
            <p className="text-charcoal/70">
              Hover a marker for a glimpse, choose one to fly in. Filter by what moves you — beaches, mountains,
              wildlife or heritage — and watch the island rearrange itself.
            </p>
            <LinkButton href="/explore" variant="text" className="mt-5">
              Open the full-screen map
            </LinkButton>
          </Reveal>
        </div>
      </div>
      <div className="lg:container-x">
        <MapExplorer points={points} variant="section" title="Explore the Island" />
      </div>
    </section>
  );
}
