import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Car, Clock, MapPin, Mountain, Navigation } from 'lucide-react';
import { PhotoImage, PhotoCreditLink } from '@/components/ui/PhotoImage';
import { SplitHeading } from '@/components/animations/SplitHeading';
import { Reveal } from '@/components/animations/Reveal';
import { Gallery } from '@/components/destinations/Gallery';
import { SeasonChart } from '@/components/destinations/SeasonChart';
import { MiniMap } from '@/components/map/MiniMap';
import { JsonLd } from '@/components/ui/JsonLd';
import { categoryMap, regionMap } from '@/data/categories';
import { destinations, getDestination } from '@/data/destinations';
import { nearestDestinations, toMapPoint } from '@/lib/destinations';
import { getPhoto } from '@/lib/photos';
import { absoluteUrl, pageMetadata } from '@/lib/seo';
import { estimateDrive, formatCoordinates } from '@/lib/utils';

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return pageMetadata({
    title: `${d.name}, Sri Lanka`,
    description: d.summary,
    path: `/destinations/${d.slug}`,
    image: d.hero,
  });
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const hero = getPhoto(d.hero);
  const gallery = d.gallery.map(getPhoto);
  const region = regionMap[d.region];
  const nearby = nearestDestinations(d, 4);
  const mapPoints = [d, ...nearby.map((n) => n.destination)].map(toMapPoint);
  const index = destinations.findIndex((x) => x.slug === d.slug);
  const next = destinations[(index + 1) % destinations.length];

  const glance = [
    { icon: MapPin, label: 'Region', value: `${region.name}, ${d.province}` },
    { icon: Navigation, label: 'Coordinates', value: formatCoordinates(d.coordinates) },
    ...(d.elevation ? [{ icon: Mountain, label: 'Elevation', value: d.elevation }] : []),
    { icon: Car, label: 'From Colombo', value: `${d.travel.fromColombo.distanceKm} km · ${d.travel.fromColombo.duration}` },
    { icon: Clock, label: 'Stay', value: d.travel.recommendedStay },
  ];

  return (
    <article>
      {/* Hero */}
      <header className="grain relative isolate h-[100svh] min-h-[620px] overflow-hidden bg-forest-deep text-ivory">
        <div className="absolute inset-0 -z-10 motion-safe:animate-hero-zoom">
          <PhotoImage photo={hero} preload sizes="100vw" quality={85} />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/50 via-forest-deep/10 to-forest-deep/90" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-forest-deep/60 via-transparent to-transparent" />
        <div className="container-x flex h-full flex-col justify-end pb-14 md:pb-20">
          <nav aria-label="Breadcrumb" className="animate-[page-in_1s_var(--ease-cinematic)_0.1s_both]">
            <Link href="/destinations" className="inline-flex items-center gap-2 text-xs tracking-[0.16em] text-ivory/75 uppercase hover:text-ivory">
              <ArrowLeft className="size-3.5" /> Destinations <span className="text-ivory/40">/</span> {region.name}
            </Link>
          </nav>
          <SplitHeading as="h1" text={d.name} immediate delay={0.2} className="display-xl mt-6 max-w-[14ch] text-ivory" />
          <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-xl animate-[page-in_1.2s_var(--ease-cinematic)_0.8s_both] font-display text-2xl leading-snug text-ivory/90 italic md:text-3xl">
              {d.tagline}
            </p>
            <div className="flex animate-[page-in_1.2s_var(--ease-cinematic)_1s_both] flex-col gap-1 text-xs tracking-[0.12em] text-ivory/70 uppercase md:text-right">
              <span>
                {d.province} · {region.name}
              </span>
              <span className="tabular-nums">{formatCoordinates(d.coordinates)}</span>
              <PhotoCreditLink photo={hero} className="mt-2 normal-case tracking-normal" />
            </div>
          </div>
        </div>
      </header>

      {/* About */}
      <section aria-labelledby="about-heading" className="bg-ivory py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-[1.6fr_1fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow text-tropical">About {d.name}</p>
              <h2 id="about-heading" className="display-md mt-5 max-w-[22ch] text-forest">
                {d.summary}
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="prose-ceylora mt-10 max-w-2xl first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-gold">
              {d.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>
            <ul className="mt-10 flex flex-wrap gap-2">
              {d.categories.map((c) => (
                <li key={c}>
                  <Link
                    href={`/destinations#${c}`}
                    className="inline-flex rounded-full border border-forest/15 px-4 py-2 text-xs font-medium text-forest transition-colors hover:bg-forest hover:text-ivory"
                  >
                    {categoryMap[c].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <aside aria-label="At a glance" className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="rounded-3xl bg-sand/50 p-8">
              <p className="eyebrow text-stone">At a glance</p>
              <dl className="mt-6 space-y-5">
                {glance.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <Icon className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.75} />
                    <div>
                      <dt className="text-[11px] tracking-[0.14em] text-stone uppercase">{label}</dt>
                      <dd className="mt-1 text-[0.9375rem] text-charcoal">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <Link
                href={`/explore?d=${d.slug}`}
                className="group mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-forest uppercase"
              >
                <span className="link-underline">See it on the island map</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Things to experience */}
      <section aria-labelledby="experience-heading" className="bg-forest py-24 text-ivory md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-gold">Things to experience</p>
            <h2 id="experience-heading" className="display-lg mt-5">
              The best of <em className="text-gold">{d.name.replace(' National Park', '').replace(' Forest Reserve', '')}</em>
            </h2>
            <p className="mt-8 max-w-sm leading-relaxed text-ivory/65">
              {d.attractions.length} experiences chosen by people who know {d.name.replace(' National Park', '').replace(' Forest Reserve', '')} well —
              start with these, then let the place surprise you.
            </p>
          </div>
          <ol className="divide-y divide-ivory/15 border-y border-ivory/15">
            {d.attractions.map((a, i) => (
              <Reveal as="li" key={a.name} delay={i * 0.05} className="grid grid-cols-[3.5rem_1fr] gap-4 py-9">
                <span className="font-display text-4xl text-gold/80 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  {a.kind && <p className="eyebrow text-ivory/45">{a.kind}</p>}
                  <h3 className="mt-2 font-display text-3xl">{a.name}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-ivory/70">{a.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section aria-labelledby="gallery-heading" className="bg-ivory py-24 md:py-36">
          <div className="container-x">
            <Reveal className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-tropical">Photo gallery</p>
                <h2 id="gallery-heading" className="display-lg mt-5 text-forest">
                  {d.name.replace(' National Park', '').replace(' Forest Reserve', '')}, <em className="text-gold">in frames.</em>
                </h2>
              </div>
              <p className="max-w-xs text-sm text-stone">Select any photograph to open the full-screen viewer.</p>
            </Reveal>
            <Gallery photos={gallery} title={d.name} />
          </div>
        </section>
      )}

      {/* Season + travel information */}
      <section aria-labelledby="plan-heading" className="bg-sand/40 py-24 md:py-36">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-tropical">Plan your visit</p>
            <h2 id="plan-heading" className="display-lg mt-5 text-forest">
              When to go, <em className="text-gold">how to get there.</em>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h3 className="font-display text-3xl text-forest">Best time to visit</h3>
              <p className="mt-4 max-w-lg leading-relaxed text-charcoal/75">{d.season.summary}</p>
              <div className="mt-10 text-forest">
                <SeasonChart season={d.season} />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="font-display text-3xl text-forest">Travel information</h3>
              <dl className="mt-6 grid grid-cols-2 gap-6 border-y border-forest/12 py-6">
                <div>
                  <dt className="text-[11px] tracking-[0.14em] text-stone uppercase">From Colombo</dt>
                  <dd className="mt-1 font-display text-2xl text-forest">{d.travel.fromColombo.distanceKm} km</dd>
                  <dd className="text-sm text-charcoal/70">{d.travel.fromColombo.duration}</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.14em] text-stone uppercase">Recommended stay</dt>
                  <dd className="mt-1 font-display text-2xl text-forest">{d.travel.recommendedStay}</dd>
                </div>
              </dl>
              <h4 className="eyebrow mt-8 text-stone">Getting there</h4>
              <ul className="mt-4 space-y-3">
                {d.travel.gettingThere.map((g) => (
                  <li key={g} className="flex gap-3 text-[0.9375rem] leading-relaxed text-charcoal/85">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />
                    {g}
                  </li>
                ))}
              </ul>
              <h4 className="eyebrow mt-8 text-stone">Visitor tips</h4>
              <ul className="mt-4 space-y-3">
                {d.travel.tips.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.9375rem] leading-relaxed text-charcoal/85">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-tropical" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map + nearby */}
      <section aria-labelledby="nearby-heading" className="bg-ivory py-24 md:py-36">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-tropical">On the map</p>
              <h2 id="nearby-heading" className="display-lg mt-5 text-forest">
                Nearby <em className="text-gold">destinations.</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-stone">
              Distances are approximate road distances; drive times allow for hill roads and village traffic.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <MiniMap points={mapPoints} focus={d.slug} />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {nearby.map(({ destination: n, km }, i) => {
                const drive = estimateDrive(km);
                return (
                  <Reveal as="li" key={n.slug} delay={i * 0.06}>
                    <Link href={`/destinations/${n.slug}`} className="group grid grid-cols-[6.5rem_1fr] items-center gap-5">
                      <span className="relative block aspect-[4/3] overflow-hidden rounded-xl">
                        <PhotoImage photo={getPhoto(n.hero)} sizes="120px" className="transition-transform duration-700 group-hover:scale-110" />
                      </span>
                      <span>
                        <span className="block font-display text-2xl text-forest transition-colors group-hover:text-tropical">
                          {n.name}
                        </span>
                        <span className="mt-1 block text-xs text-stone">
                          ~{drive.roadKm} km · about {drive.duration} by road
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Next destination */}
      <Link href={`/destinations/${next.slug}`} className="group relative block h-[60svh] min-h-[420px] overflow-hidden bg-forest-deep text-ivory">
        <PhotoImage
          photo={getPhoto(next.hero)}
          sizes="100vw"
          className="opacity-60 transition-all duration-[1.8s] ease-[var(--ease-cinematic)] group-hover:scale-[1.04] group-hover:opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent" />
        <div className="container-x relative flex h-full flex-col justify-end pb-16">
          <p className="eyebrow text-gold">Next destination</p>
          <p className="display-xl mt-4 flex items-end gap-6">
            {next.name}
            <ArrowUpRight className="mb-3 size-10 transition-transform duration-700 group-hover:-translate-y-1 group-hover:translate-x-1 md:size-16" strokeWidth={1} />
          </p>
        </div>
      </Link>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TouristAttraction',
          name: d.name,
          description: d.summary,
          url: absoluteUrl(`/destinations/${d.slug}`),
          image: absoluteUrl(hero.src),
          geo: { '@type': 'GeoCoordinates', latitude: d.coordinates[0], longitude: d.coordinates[1] },
          address: { '@type': 'PostalAddress', addressRegion: d.province, addressCountry: 'LK' },
          isAccessibleForFree: false,
        }}
      />
    </article>
  );
}
