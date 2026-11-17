import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import { Photo } from '@/components/ui/Photo';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

const covers: Record<string, string> = {
  beaches: 'tangalle-hero',
  mountains: 'nuwara-eliya-hero',
  heritage: 'anuradhapura-hero',
  wildlife: 'udawalawe-hero',
  nature: 'horton-plains-hero',
  adventure: 'ella-hero',
  culture: 'kandy-temple-of-the-tooth',
};

/** Seven ways into the island — an asymmetric mosaic of categories. */
export function CategoryShowcase() {
  return (
    <section aria-labelledby="discover-heading" className="bg-sand/40 py-28 md:py-40">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
          <Reveal>
            <p className="eyebrow text-tropical">Destination discovery</p>
            <h2 id="discover-heading" className="display-lg mt-5 text-forest">
              Seven ways to <em className="text-gold">fall for it.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-charcoal/70 md:ml-auto">
              Start with what you love. Every route into Sri Lanka leads somewhere unexpected — a cave temple on the way
              to the beach, a waterfall on the way to tea.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid auto-rows-[15rem] grid-cols-2 gap-3 md:mt-20 md:auto-rows-[17rem] md:grid-cols-4 md:gap-4">
          {categories.map((c, i) => (
            <Reveal
              as="li"
              key={c.id}
              delay={(i % 4) * 0.06}
              className={cn(
                i === 0 && 'col-span-2 row-span-2',
                i === 3 && 'md:row-span-2',
                i === 6 && 'col-span-2',
              )}
            >
              <Link
                href={`/destinations#${c.id}`}
                className="group relative block h-full overflow-hidden rounded-2xl bg-forest text-ivory"
              >
                <Photo
                  id={covers[c.id]}
                  sizes={i === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
                  className="transition-transform duration-[1.6s] ease-[var(--ease-cinematic)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/15 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-sand/80 uppercase">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className={cn('mt-1 font-display leading-tight', i === 0 ? 'text-3xl md:text-5xl' : 'text-2xl md:text-[1.75rem]')}>
                      {c.title}
                    </h3>
                    {i === 0 && <p className="mt-3 hidden max-w-sm text-sm text-ivory/75 md:block">{c.description}</p>}
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ivory/40 transition-colors duration-500 group-hover:border-ivory group-hover:bg-ivory group-hover:text-forest">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
