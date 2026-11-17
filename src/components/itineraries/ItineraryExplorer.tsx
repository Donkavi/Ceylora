'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Bus, Car, Route, TrainFront } from 'lucide-react';
import type { Itinerary, LatLng, Photo } from '@/types';
import type { MapPoint } from '@/components/map/types';
import { PhotoImage } from '@/components/ui/PhotoImage';
import { EASE_CINEMATIC } from '@/lib/animations';
import { useMediaQuery } from '@/lib/hooks';
import { cn } from '@/lib/utils';

const IslandMap = dynamic(() => import('@/components/map/IslandMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#0f3a4a]" />,
});

export interface ExplorerItinerary extends Itinerary {
  photo: Photo;
  stopPhotos: Photo[];
  stopNames: string[];
  points: MapPoint[];
  route: LatLng[];
}

function TransferIcon({ mode }: { mode: string }) {
  if (/train/i.test(mode)) return <TrainFront className="size-3.5" />;
  if (/bus/i.test(mode)) return <Bus className="size-3.5" />;
  return <Car className="size-3.5" />;
}

/** Choose a route, then follow it day by day while the map traces every leg. */
export function ItineraryExplorer({ itineraries, initial }: { itineraries: ExplorerItinerary[]; initial: string }) {
  const [slug, setSlug] = useState(initial);
  const [hovered, setHovered] = useState<string | null>(null);
  const desktop = useMediaQuery('(min-width: 1024px)', true);
  const top = useRef<HTMLDivElement>(null);
  const it = itineraries.find((i) => i.slug === slug) ?? itineraries[0];

  const visible = useMemo(() => new Set(it.points.map((p) => p.slug)), [it]);
  const badges = useMemo(() => {
    const b: Record<string, string> = {};
    for (const s of it.stops) b[s.destination] = b[s.destination] ? b[s.destination] : String(s.day);
    return b;
  }, [it]);
  const totalKm = it.stops.reduce((sum, s) => sum + (s.transfer?.distanceKm ?? 0), 0);
  const trainLegs = it.stops.filter((s) => s.transfer && /train/i.test(s.transfer.mode)).length;

  const choose = (next: string) => {
    setSlug(next);
    setHovered(null);
    const url = new URL(window.location.href);
    url.searchParams.set('route', next);
    window.history.replaceState(null, '', url);
    if (top.current && top.current.getBoundingClientRect().top < 0) top.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={top} className="scroll-mt-20">
      {/* Route chooser */}
      <div role="tablist" aria-label="Choose an itinerary" className="no-scrollbar -mx-[clamp(1.25rem,4vw,3.5rem)] flex gap-3 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] pb-2">
        {itineraries.map((i) => {
          const on = i.slug === it.slug;
          return (
            <button
              key={i.slug}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="itinerary-panel"
              onClick={() => choose(i.slug)}
              className={cn(
                'group relative flex shrink-0 items-center gap-4 overflow-hidden rounded-2xl border p-2 pr-5 text-left transition-colors duration-500',
                on ? 'border-forest bg-forest text-ivory' : 'border-forest/15 bg-ivory text-forest hover:border-forest/40',
              )}
            >
              <span className="relative block size-16 overflow-hidden rounded-xl">
                <PhotoImage photo={i.photo} sizes="64px" />
              </span>
              <span>
                <span className={cn('block font-display text-3xl leading-none', on ? 'text-gold' : 'text-forest')}>{i.days}</span>
                <span className={cn('mt-1 block text-[11px] tracking-[0.14em] uppercase', on ? 'text-ivory/70' : 'text-stone')}>days</span>
              </span>
              <span className="hidden max-w-[11rem] text-sm leading-snug sm:block">{i.title.replace(/^\d+ Days? /, '')}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={it.slug}
          id="itinerary-panel"
          role="tabpanel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
          className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
        >
          {/* Overview + day list */}
          <div>
            <p className="eyebrow text-tropical">
              {it.pace} pace · {it.bestFor.join(' · ')}
            </p>
            <h2 className="display-lg mt-4 text-forest">{it.title}</h2>
            <p className="mt-3 font-display text-2xl text-gold italic">{it.strapline}</p>
            <p className="lede mt-6 text-charcoal/75">{it.summary}</p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-forest/12 py-6">
              <div>
                <dt className="text-[11px] tracking-[0.14em] text-stone uppercase">Days</dt>
                <dd className="mt-1 font-display text-3xl text-forest">{it.days}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] text-stone uppercase">Destinations</dt>
                <dd className="mt-1 font-display text-3xl text-forest">{visible.size}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.14em] text-stone uppercase">Travel</dt>
                <dd className="mt-1 font-display text-3xl text-forest">~{totalKm} km</dd>
                {trainLegs > 0 && <dd className="text-xs text-stone">incl. {trainLegs} by rail</dd>}
              </div>
            </dl>

            <ol className="relative mt-12 space-y-0">
              <span aria-hidden className="absolute top-3 bottom-3 left-[1.6rem] w-px bg-forest/15" />
              {it.stops.map((stop, i) => (
                <li
                  key={stop.day}
                  onMouseEnter={() => setHovered(stop.destination)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative grid grid-cols-[3.25rem_1fr] gap-5 pb-12"
                >
                  <span
                    className={cn(
                      'relative z-10 flex size-[3.25rem] items-center justify-center rounded-full border font-display text-xl transition-colors duration-500',
                      hovered === stop.destination ? 'border-gold bg-gold text-ivory' : 'border-forest/20 bg-ivory text-forest',
                    )}
                  >
                    {stop.day}
                  </span>
                  <div>
                    {stop.transfer && (
                      <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1.5 text-[11px] text-charcoal/75">
                        <TransferIcon mode={stop.transfer.mode} />
                        {stop.transfer.from} → {it.stopNames[i]} · {stop.transfer.distanceKm} km · {stop.transfer.duration} ·{' '}
                        {stop.transfer.mode}
                      </p>
                    )}
                    <p className="eyebrow text-stone">
                      Day {stop.day} · {it.stopNames[i]}
                    </p>
                    <h3 className="mt-2 font-display text-3xl leading-tight text-forest">{stop.title}</h3>
                    <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl">
                      <PhotoImage photo={it.stopPhotos[i]} sizes="(min-width: 1024px) 40vw, 90vw" />
                    </div>
                    <p className="mt-5 leading-relaxed text-charcoal/80">{stop.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {stop.experiences.map((x) => (
                        <li key={x} className="rounded-full border border-forest/12 px-3 py-1.5 text-xs text-forest">
                          {x}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/destinations/${stop.destination}`}
                      className="group mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-forest uppercase"
                    >
                      <span className="link-underline">About {it.stopNames[i]}</span>
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Route map */}
          <div className={cn('order-first lg:order-none', desktop && 'lg:sticky lg:top-24 lg:self-start')}>
            <div className="relative h-[60svh] min-h-[380px] overflow-hidden rounded-3xl bg-[#0f3a4a] lg:h-[calc(100svh-8rem)]">
              <IslandMap
                key={it.slug}
                points={it.points}
                visible={visible}
                selected={null}
                highlight={hovered}
                onSelect={(s) => setHovered(s)}
                baseLayer="satellite"
                focusOffset={{ x: 0, y: 0 }}
                fitKey={it.slug}
                initialZoom={7.5}
                initialBounds={it.route}
                route={it.route}
                badges={badges}
                compactTooltips
              />
              <div className="pointer-events-none absolute top-4 left-4 z-[600] inline-flex items-center gap-2 rounded-full bg-forest-deep/70 px-4 py-2 text-xs text-ivory backdrop-blur-md">
                <Route className="size-3.5 text-gold" /> {it.stopNames.filter((n, i, a) => a.indexOf(n) === i).join(' → ')}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
