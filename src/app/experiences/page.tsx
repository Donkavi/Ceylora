import Link from 'next/link';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/animations/Reveal';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { ParallaxPhoto } from '@/components/animations/ParallaxPhoto';
import { experiences } from '@/data/experiences';
import { destinationMap } from '@/data/destinations';
import { getPhoto } from '@/lib/photos';
import { pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';
import type { Experience } from '@/types';

export const metadata = pageMetadata({
  title: 'Experiences in Sri Lanka',
  description:
    'Scenic train journeys, leopard safaris, surfing, whale watching, dawn hikes, tea estates, festivals, waterfalls, food and diving — the essential Sri Lankan experiences.',
  path: '/experiences',
  image: 'diyaluma-pools',
});

function Meta({ e, light }: { e: Experience; light?: boolean }) {
  const muted = light ? 'text-ivory/55' : 'text-stone';
  return (
    <div className={cn('mt-8 grid gap-5 border-t pt-6 sm:grid-cols-3', light ? 'border-ivory/15' : 'border-forest/12')}>
      {[
        { icon: MapPin, label: 'Where', value: e.locations.join(', ') },
        { icon: Clock, label: 'Duration', value: e.duration },
        { icon: Calendar, label: 'Best season', value: e.bestSeason },
      ].map(({ icon: Icon, label, value }) => (
        <div key={label}>
          <p className={cn('flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase', muted)}>
            <Icon className="size-3.5 text-gold" strokeWidth={1.75} /> {label}
          </p>
          <p className="mt-1.5 text-sm leading-snug">{value}</p>
        </div>
      ))}
    </div>
  );
}

function Related({ e, light }: { e: Experience; light?: boolean }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Related destinations">
      {e.relatedDestinations.map((slug) => {
        const d = destinationMap[slug];
        if (!d) return null;
        return (
          <li key={slug}>
            <Link
              href={`/destinations/${slug}`}
              className={cn(
                'inline-flex rounded-full border px-3.5 py-1.5 text-xs transition-colors',
                light ? 'border-ivory/25 text-ivory/85 hover:bg-ivory hover:text-forest' : 'border-forest/15 text-forest hover:bg-forest hover:text-ivory',
              )}
            >
              {d.name.replace(' National Park', '').replace(' Forest Reserve', '')}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        photo={getPhoto('diyaluma-pools')}
        eyebrow="Experiences in Sri Lanka"
        title="Don’t just see the island. Feel it."
        emphasis={[5, 6]}
        intro="Ten experiences that get under the skin of Sri Lanka — slow trains, dawn summits, leopards, whales, reefs and the rhythm of the temple drums."
        caption="Hikers above Diyaluma Falls"
      />

      <nav aria-label="Experiences" className="sticky top-0 z-30 hidden border-b border-forest/10 bg-ivory/85 backdrop-blur-xl lg:block">
        <ul className="container-x no-scrollbar flex gap-6 overflow-x-auto py-4">
          {experiences.map((e, i) => (
            <li key={e.slug} className="shrink-0">
              <a href={`#${e.slug}`} className="text-xs font-medium tracking-wide text-charcoal/70 transition-colors hover:text-forest">
                <span className="mr-1.5 text-gold tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {e.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {experiences.map((e, i) => {
        const photo = getPhoto(e.image);
        const number = String(i + 1).padStart(2, '0');

        // Every fourth story is a full-bleed cinematic frame; the rest alternate sides.
        if (i % 4 === 0) {
          return (
            <section key={e.slug} id={e.slug} aria-labelledby={`${e.slug}-title`} className="relative scroll-mt-16 bg-forest-deep text-ivory">
              <ParallaxPhoto photo={photo} className="h-[90svh] min-h-[600px]" strength={9} overlay="bg-gradient-to-t from-forest-deep via-forest-deep/40 to-forest-deep/20" />
              <div className="absolute inset-x-0 bottom-0">
                <div className="container-x grid gap-10 pb-16 lg:grid-cols-[1.2fr_1fr] lg:items-end">
                  <Reveal>
                    <p className="eyebrow text-gold">
                      {number} · {e.kicker}
                    </p>
                    <h2 id={`${e.slug}-title`} className="display-xl mt-5">
                      {e.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="lede text-ivory/85">{e.description}</p>
                    <p className="mt-5 hidden leading-relaxed text-ivory/65 md:block">{e.story}</p>
                    <Meta e={e} light />
                    <Related e={e} light />
                  </Reveal>
                </div>
              </div>
            </section>
          );
        }

        const flip = i % 2 === 0;
        return (
          <section
            key={e.slug}
            id={e.slug}
            aria-labelledby={`${e.slug}-title`}
            className={cn('scroll-mt-16 py-24 md:py-32', i % 4 === 2 ? 'bg-sand/40' : 'bg-ivory')}
          >
            <div className={cn('container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20')}>
              <ImageReveal
                photo={photo}
                from={flip ? 'right' : 'left'}
                className={cn('aspect-[4/5] rounded-2xl md:aspect-[5/4] lg:aspect-[4/5]', flip && 'lg:order-2')}
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
              <Reveal>
                <p className="eyebrow text-tropical">
                  {number} · {e.kicker}
                </p>
                <h2 id={`${e.slug}-title`} className="display-lg mt-5 text-forest">
                  {e.title}
                </h2>
                <p className="lede mt-6 text-charcoal/80">{e.description}</p>
                <p className="mt-5 leading-relaxed text-charcoal/65">{e.story}</p>
                <Meta e={e} />
                <Related e={e} />
              </Reveal>
            </div>
          </section>
        );
      })}
    </>
  );
}
