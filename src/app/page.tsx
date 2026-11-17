import { Hero } from '@/components/home/Hero';
import { IntroStatement } from '@/components/home/IntroStatement';
import { JourneyScroll } from '@/components/home/JourneyScroll';
import { MapSection } from '@/components/home/MapSection';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { ExperienceRail } from '@/components/home/ExperienceRail';
import { CultureFeature } from '@/components/home/CultureFeature';
import { ItineraryTeaser } from '@/components/home/ItineraryTeaser';
import { JournalTeaser } from '@/components/home/JournalTeaser';
import { JsonLd } from '@/components/ui/JsonLd';
import { journey } from '@/data/journey';
import { experiences } from '@/data/experiences';
import { itineraries } from '@/data/itineraries';
import { destinationMap } from '@/data/destinations';
import { getPhoto } from '@/lib/photos';
import { site } from '@/data/site';

export default function HomePage() {
  const chapters = journey.map((c) => ({ ...c, photo: getPhoto(c.image) }));
  const experienceItems = experiences.map(({ slug, title, kicker, description, duration, image }) => ({
    slug,
    title,
    kicker,
    description,
    duration,
    photo: getPhoto(image),
  }));
  const itineraryItems = itineraries.map((it) => ({
    slug: it.slug,
    title: it.title,
    days: it.days,
    strapline: it.strapline,
    stops: [...new Set(it.stops.map((s) => destinationMap[s.destination]?.name.replace(' National Park', '') ?? s.destination))],
    photo: getPhoto(it.image),
  }));

  return (
    <>
      <Hero photo={getPhoto('home-hero')} />
      <IntroStatement />
      <JourneyScroll chapters={chapters} />
      <MapSection />
      <CategoryShowcase />
      <ExperienceRail items={experienceItems} />
      <CultureFeature />
      <ItineraryTeaser items={itineraryItems} />
      <JournalTeaser />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TouristDestination',
          name: 'Sri Lanka',
          description: site.description,
          url: site.url,
          touristType: ['Culture', 'Nature', 'Wildlife', 'Beach', 'Adventure'],
          geo: { '@type': 'GeoCoordinates', latitude: 7.8731, longitude: 80.7718 },
        }}
      />
    </>
  );
}
