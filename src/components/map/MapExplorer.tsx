'use client';

import dynamic from 'next/dynamic';
import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Layers, Map as MapIcon } from 'lucide-react';
import { useMediaQuery, useNearViewport } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { EASE_CINEMATIC } from '@/lib/animations';
import { DestinationPanel } from './DestinationPanel';
import { CATEGORY_COLORS, MAP_FILTERS, type MapFilter, type MapPoint } from './types';
import type { BaseLayer } from './IslandMap';

const IslandMap = dynamic(() => import('./IslandMap'), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0f3a4a]">
      <span className="eyebrow animate-pulse text-ivory/60">Unfolding the island…</span>
    </div>
  );
}

interface MapExplorerProps {
  points: MapPoint[];
  /** "page" fills the viewport and enables wheel zoom; "section" sits inside the homepage. */
  variant?: 'page' | 'section';
  title?: string;
  initialSelected?: string | null;
}

export function MapExplorer({ points, variant = 'section', title = 'Explore the Island', initialSelected = null }: MapExplorerProps) {
  const container = useRef<HTMLDivElement>(null);
  const near = useNearViewport(container, '600px');
  const desktop = useMediaQuery('(min-width: 1024px)', true);
  const [filter, setFilter] = useState<MapFilter>('all');
  const [selected, setSelected] = useState<string | null>(initialSelected);
  const [baseLayer, setBaseLayer] = useState<BaseLayer>('satellite');

  const visible = useMemo(
    () => new Set(points.filter((p) => filter === 'all' || p.categories.includes(filter)).map((p) => p.slug)),
    [points, filter],
  );
  const selectedPoint = points.find((p) => p.slug === selected) ?? null;
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: points.length };
    for (const f of MAP_FILTERS) if (f.id !== 'all') c[f.id] = points.filter((p) => p.categories.includes(f.id as never)).length;
    return c;
  }, [points]);

  const changeFilter = (f: MapFilter) => {
    setFilter(f);
    if (selected && f !== 'all' && !points.find((p) => p.slug === selected)?.categories.includes(f)) setSelected(null);
  };
  const select = useCallback((slug: string) => setSelected(slug), []);

  // Keep the selected destination clear of the overlay panels.
  const focusOffset = desktop ? { x: 220, y: 0 } : { x: 0, y: 150 };
  const isPage = variant === 'page';

  return (
    <div
      ref={container}
      className={cn(
        'relative isolate overflow-hidden bg-[#0f3a4a]',
        isPage ? 'h-[100svh] min-h-[560px]' : 'h-[88svh] min-h-[560px] lg:rounded-[2rem]',
      )}
      {...(isPage ? { 'data-lenis-prevent': true } : {})}
    >
      <div className="absolute inset-0 z-0">
        {near ? (
          <IslandMap
            points={points}
            visible={visible}
            selected={selected}
            onSelect={select}
            baseLayer={baseLayer}
            scrollWheelZoom={isPage}
            focusOffset={focusOffset}
            fitKey={filter}
            initialZoom={desktop ? 7.5 : 7}
          />
        ) : (
          <MapSkeleton />
        )}
      </div>

      {/* Top gradient keeps the overlay UI legible over bright imagery. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] h-56 bg-gradient-to-b from-forest-deep/70 to-transparent" />

      <div className={cn('pointer-events-none absolute inset-x-0 top-0 z-[600]', isPage ? 'pt-24 lg:pt-28' : 'pt-6 lg:pt-8')}>
        <div className="container-x lg:!px-8">
          <div className="pointer-events-auto max-w-xl">
            <p className="eyebrow text-gold">Interactive map</p>
            <h2 className={cn('mt-2 font-display leading-none text-ivory', isPage ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl')}>
              {title}
            </h2>
          </div>

          <div
            role="radiogroup"
            aria-label="Filter destinations by category"
            className="no-scrollbar pointer-events-auto -mx-[clamp(1.25rem,4vw,3.5rem)] mt-5 flex gap-2 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
          >
            {MAP_FILTERS.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => changeFilter(f.id)}
                  className={cn(
                    'relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors duration-300',
                    on ? 'text-forest' : 'bg-forest-deep/45 text-ivory/90 backdrop-blur-md hover:bg-forest-deep/65',
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId={`map-filter-${variant}`}
                      className="absolute inset-0 rounded-full bg-ivory"
                      transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {f.id !== 'all' && <span className="size-2 rounded-full" style={{ background: CATEGORY_COLORS[f.id] }} />}
                    {f.label}
                    <span className={cn('tabular-nums', on ? 'text-stone' : 'text-ivory/50')}>{counts[f.id]}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop index of visible destinations — also a keyboard-friendly alternative to the markers. */}
      {desktop && (
        <nav
          aria-label="Destinations on the map"
          data-lenis-prevent
          className={cn(
            'absolute bottom-6 left-6 z-[600] w-64 overflow-y-auto rounded-3xl bg-forest-deep/55 p-2 text-ivory backdrop-blur-xl [scrollbar-color:rgb(247_245_239/0.25)_transparent] [scrollbar-width:thin]',
            isPage ? 'top-[19rem]' : 'top-[15rem]',
          )}
        >
          <ul>
            <AnimatePresence initial={false}>
              {points
                .filter((p) => visible.has(p.slug))
                .map((p) => (
                  <motion.li
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
                  >
                    <button
                      type="button"
                      onClick={() => select(p.slug)}
                      aria-current={selected === p.slug ? 'true' : undefined}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors',
                        selected === p.slug ? 'bg-ivory text-forest' : 'hover:bg-white/10',
                      )}
                    >
                      <span className="size-2 shrink-0 rounded-full" style={{ background: CATEGORY_COLORS[p.categories[0]] }} />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{p.name}</span>
                        <span className={cn('block text-[11px]', selected === p.slug ? 'text-stone' : 'text-ivory/55')}>{p.region}</span>
                      </span>
                    </button>
                  </motion.li>
                ))}
            </AnimatePresence>
          </ul>
        </nav>
      )}

      <button
        type="button"
        onClick={() => setBaseLayer((b) => (b === 'satellite' ? 'map' : 'satellite'))}
        className={cn(
          'absolute right-4 z-[600] inline-flex items-center gap-2 rounded-full bg-ivory/90 px-4 py-2.5 text-xs font-semibold text-forest shadow-lg backdrop-blur transition-colors hover:bg-ivory md:right-6',
          isPage ? 'top-24 lg:top-28' : 'top-6 lg:top-8',
          selectedPoint && desktop && 'lg:hidden',
        )}
        aria-label={`Switch to ${baseLayer === 'satellite' ? 'map' : 'satellite'} view`}
      >
        {baseLayer === 'satellite' ? <MapIcon className="size-3.5" /> : <Layers className="size-3.5" />}
        {baseLayer === 'satellite' ? 'Map view' : 'Satellite'}
      </button>

      <AnimatePresence mode="wait">
        {selectedPoint && (
          <DestinationPanel
            key={selectedPoint.slug}
            point={selectedPoint}
            mobile={!desktop}
            onClose={() => setSelected(null)}
            onSelect={(slug) => {
              setFilter('all');
              select(slug);
            }}
          />
        )}
      </AnimatePresence>

      {!selectedPoint && (
        <p className="pointer-events-none absolute bottom-6 left-1/2 z-[600] -translate-x-1/2 rounded-full bg-forest-deep/60 px-4 py-2 text-[11px] text-ivory/85 backdrop-blur-md lg:hidden">
          Tap a marker to discover a destination
        </p>
      )}
    </div>
  );
}
