'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Photo } from '@/types';
import { PhotoImage } from '@/components/ui/PhotoImage';
import { EASE_CINEMATIC } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface Item {
  slug: string;
  title: string;
  days: number;
  strapline: string;
  stops: string[];
  photo: Photo;
}

/** A list of itineraries; hovering (or focusing) one crossfades its photograph. */
export function ItineraryTeaser({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section aria-labelledby="itineraries-heading" className="bg-sand/40 py-28 md:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="relative hidden aspect-[4/5] overflow-hidden rounded-2xl lg:sticky lg:top-28 lg:block lg:self-start">
          <AnimatePresence initial={false}>
            <motion.div
              key={current.slug}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: EASE_CINEMATIC }}
            >
              <PhotoImage photo={current.photo} sizes="45vw" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-ivory">
            <p className="eyebrow text-sand/80">Route</p>
            <p className="mt-2 font-display text-2xl leading-snug">{current.stops.join(' · ')}</p>
          </div>
        </div>

        <div>
          <p className="eyebrow text-tropical">Trip inspiration</p>
          <h2 id="itineraries-heading" className="display-lg mt-5 text-forest">
            Journeys, <em className="text-gold">day by day.</em>
          </h2>
          <p className="lede mt-6 max-w-lg text-charcoal/70">
            Five routes drawn by people who know the island — from a long weekend in the cultural heart to a fortnight
            that circles the whole coast.
          </p>

          <ul className="mt-12 border-t border-forest/15">
            {items.map((item, i) => (
              <li key={item.slug} className="border-b border-forest/15">
                <Link
                  href={`/itineraries?route=${item.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-6 md:grid-cols-[6rem_1fr_auto] md:py-7"
                >
                  <span
                    className={cn(
                      'font-display text-5xl leading-none transition-colors duration-500 md:text-6xl',
                      active === i ? 'text-gold' : 'text-forest/25',
                    )}
                  >
                    {String(item.days).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block font-display text-2xl leading-tight text-forest md:text-3xl">{item.title}</span>
                    <span className="mt-1 block text-sm text-stone">{item.strapline}</span>
                  </span>
                  <span
                    className={cn(
                      'flex size-11 items-center justify-center rounded-full border transition-all duration-500',
                      active === i ? 'border-forest bg-forest text-ivory' : 'border-forest/20 text-forest',
                    )}
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
