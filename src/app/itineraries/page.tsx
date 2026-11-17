import { PageHero } from '@/components/ui/PageHero';
import { ItineraryExplorer, type ExplorerItinerary } from '@/components/itineraries/ItineraryExplorer';
import { itineraries } from '@/data/itineraries';
import { destinationMap } from '@/data/destinations';
import { toMapPoint } from '@/lib/destinations';
import { getPhoto } from '@/lib/photos';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Sri Lanka Itineraries — 3 to 14 Days',
  description:
    'Day-by-day Sri Lanka itineraries from three days to two weeks, with travel distances, journey times, experiences and a route map for every trip.',
  path: '/itineraries',
  image: 'haputale-liptons-view',
});

const shortName = (name: string) => name.replace(' National Park', '').replace(' Forest Reserve', '');

export default async function ItinerariesPage({ searchParams }: { searchParams: Promise<{ route?: string }> }) {
  const { route } = await searchParams;

  const data: ExplorerItinerary[] = itineraries.map((it) => {
    const seen = new Map<string, number>();
    const stopPhotos = it.stops.map((s) => {
      const d = destinationMap[s.destination];
      const n = seen.get(s.destination) ?? 0;
      seen.set(s.destination, n + 1);
      const options = [d.hero, ...d.gallery];
      return getPhoto(options[n % options.length]);
    });
    const unique = [...new Set(it.stops.map((s) => s.destination))];
    return {
      ...it,
      photo: getPhoto(it.image),
      stopPhotos,
      stopNames: it.stops.map((s) => shortName(destinationMap[s.destination].name)),
      points: unique.map((slug) => toMapPoint(destinationMap[slug])),
      route: it.stops.map((s) => destinationMap[s.destination].coordinates),
    };
  });

  const initial = data.some((d) => d.slug === route) ? route! : '7-days-exploring-sri-lanka';

  return (
    <>
      <PageHero
        photo={getPhoto('haputale-liptons-view')}
        eyebrow="Plan your journey"
        title="Every great journey starts with a line on a map"
        emphasis={[7, 8, 9]}
        intro="Five itineraries, from a long weekend to a fortnight. Choose one, follow it day by day, and watch the route draw itself across the island."
        caption="The view from the top of Haputale"
      />
      <section aria-label="Itinerary explorer" className="bg-ivory py-20 md:py-28">
        <div className="container-x">
          <ItineraryExplorer itineraries={data} initial={initial} />
          <p className="mt-6 max-w-2xl text-sm text-stone">
            Distances and journey times are approximate and assume a private car or the scheduled train. Every route can be
            adapted — add a beach day, swap a safari, or slow it all down.
          </p>
        </div>
      </section>
    </>
  );
}
