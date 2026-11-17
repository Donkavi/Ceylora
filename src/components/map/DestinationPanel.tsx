'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, MapPin, X } from 'lucide-react';
import { PhotoImage } from '@/components/ui/PhotoImage';
import { EASE_CINEMATIC } from '@/lib/animations';
import { cn, formatCoordinates } from '@/lib/utils';
import { CATEGORY_COLORS, type MapPoint } from './types';

interface DestinationPanelProps {
  point: MapPoint;
  onClose: () => void;
  onSelect: (slug: string) => void;
  mobile: boolean;
}

const LABELS: Record<string, string> = {
  beaches: 'Beaches',
  mountains: 'Mountains',
  heritage: 'Heritage',
  wildlife: 'Wildlife',
  nature: 'Nature',
  adventure: 'Adventure',
  culture: 'Culture',
};

/** An editorial card for the selected destination: side panel on desktop, bottom sheet on mobile. */
export function DestinationPanel({ point, onClose, onSelect, mobile }: DestinationPanelProps) {
  const motionProps = mobile
    ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
    : { initial: { x: '110%', opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: '110%', opacity: 0 } };

  return (
    <motion.aside
      key={point.slug}
      aria-label={`${point.name} details`}
      data-lenis-prevent
      className={cn(
        'pointer-events-auto absolute z-[1000] overflow-y-auto overscroll-contain bg-ivory text-charcoal shadow-[0_30px_80px_rgb(15_42_34/0.35)]',
        mobile
          ? 'inset-x-0 bottom-0 max-h-[62%] rounded-t-[1.75rem] sm:inset-x-auto sm:left-1/2 sm:w-[min(560px,92%)] sm:-translate-x-1/2'
          : 'top-28 right-6 bottom-6 w-[min(420px,40vw)] rounded-[1.75rem]',
      )}
      {...motionProps}
      transition={{ duration: 0.75, ease: EASE_CINEMATIC }}
    >
      <div className={cn('relative overflow-hidden', mobile ? 'h-44' : 'h-64')}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: EASE_CINEMATIC }}
        >
          <PhotoImage photo={point.photo} sizes="(min-width: 1024px) 420px, 100vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent" />
        {mobile && <span className="absolute top-2.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-ivory/80" />}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close destination details"
          className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-ivory/90 text-forest backdrop-blur transition-colors hover:bg-ivory"
        >
          <X className="size-4" />
        </button>
        <div className="absolute right-6 bottom-5 left-6 text-ivory">
          <p className="eyebrow text-sand/90">{point.region}</p>
          <h3 className="mt-1 font-display text-4xl leading-none">{point.name}</h3>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <p className="font-display text-xl leading-snug text-forest italic">{point.tagline}</p>
        <p className="text-sm leading-relaxed text-charcoal/75">{point.summary}</p>

        <ul className="flex flex-wrap gap-2" aria-label="Categories">
          {point.categories.map((c) => (
            <li key={c} className="inline-flex items-center gap-2 rounded-full border border-forest/12 px-3 py-1.5 text-xs text-forest">
              <span className="size-2 rounded-full" style={{ background: CATEGORY_COLORS[c] }} />
              {LABELS[c]}
            </li>
          ))}
        </ul>

        <div>
          <p className="eyebrow text-stone">Things to experience</p>
          <ul className="mt-3 divide-y divide-forest/8 text-sm">
            {point.attractions.map((a) => (
              <li key={a} className="py-2.5 text-charcoal/85">
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-stone">Nearby</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {point.nearby.map((n) => (
              <li key={n.slug}>
                <button
                  type="button"
                  onClick={() => onSelect(n.slug)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-sand/60 px-3 py-1.5 text-xs text-forest transition-colors hover:bg-sand"
                >
                  <MapPin className="size-3" />
                  {n.name.replace(' National Park', '').replace(' Forest Reserve', '')}
                  <span className="text-stone">· {n.distanceKm} km</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-forest/10 pt-5">
          <span className="text-[11px] text-stone tabular-nums">{formatCoordinates(point.coordinates)}</span>
          <Link
            href={`/destinations/${point.slug}`}
            className="group inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-[11px] font-semibold tracking-[0.14em] text-ivory uppercase transition-colors hover:bg-gold"
          >
            Explore destination
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.aside>
  );
}
