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
  name: string;
  region: string;
  tagline: string;
  photo: Photo;
}

/** Large typographic list; the hovered destination's photograph fades in alongside. */
export function HoverList({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
      <ul className="border-t border-forest/15">
        {items.map((d, i) => (
          <li key={d.slug} className="border-b border-forest/15">
            <Link
              href={`/destinations/${d.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group flex items-center justify-between gap-6 py-6"
            >
              <span>
                <span
                  className={cn(
                    'block font-display text-4xl leading-none transition-all duration-500 md:text-6xl',
                    active === i ? 'translate-x-2 text-forest italic' : 'text-forest/45',
                  )}
                >
                  {d.name}
                </span>
                <span className="mt-2 block text-sm text-stone">{d.region}</span>
              </span>
              <ArrowUpRight className={cn('size-6 shrink-0 transition-all duration-500', active === i ? 'text-gold' : 'text-forest/25')} />
            </Link>
          </li>
        ))}
      </ul>
      <div className="relative hidden aspect-[4/5] overflow-hidden rounded-2xl lg:sticky lg:top-28 lg:block lg:self-start">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.slug}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: EASE_CINEMATIC }}
          >
            <PhotoImage photo={current.photo} sizes="40vw" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 to-transparent" />
        <p className="absolute inset-x-0 bottom-0 p-7 font-display text-2xl leading-snug text-ivory">{current.tagline}</p>
      </div>
    </div>
  );
}
