'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Experience, Photo } from '@/types';
import { PhotoImage } from '@/components/ui/PhotoImage';
import { useMediaQuery } from '@/lib/hooks';
import { cn } from '@/lib/utils';

type Item = Pick<Experience, 'slug' | 'title' | 'kicker' | 'description' | 'duration'> & { photo: Photo };

/**
 * A horizontal gallery of experiences. On large screens a sticky frame lets the
 * cards glide sideways as you scroll down (one-to-one, nothing hijacked); on
 * touch devices it is a native swipe rail.
 */
export function ExperienceRail({ items }: { items: Item[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [travel, setTravel] = useState(0);
  const reduce = useReducedMotion();
  const wide = useMediaQuery('(min-width: 1024px)');
  const sticky = wide && !reduce;
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const raw = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setTravel(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section
      ref={section}
      aria-labelledby="experiences-heading"
      className="relative bg-forest text-ivory"
      style={sticky ? { height: `calc(100svh + ${travel}px)` } : undefined}
    >
      <div className={cn('overflow-hidden py-28 md:py-32', sticky && 'sticky top-0 flex h-[100svh] flex-col justify-center py-0')}>
        <div className="container-x flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-gold">Experiences</p>
            <h2 id="experiences-heading" className="display-lg mt-5 max-w-[16ch]">
              Ten ways to <em className="text-gold">feel the island.</em>
            </h2>
          </div>
          <Link
            href="/experiences"
            className="group inline-flex items-center gap-3 self-start text-xs font-semibold tracking-[0.16em] uppercase md:self-auto"
          >
            <span className="link-underline">All experiences</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className={cn('mt-12 lg:mt-14', !sticky && 'no-scrollbar snap-x snap-mandatory overflow-x-auto')}>
          <motion.ul
            ref={track}
            className="flex w-max gap-4 px-[clamp(1.25rem,4vw,3.5rem)] md:gap-6"
            style={sticky ? { x } : undefined}
          >
            {items.map((item, i) => (
              <li key={item.slug} className="w-[78vw] shrink-0 snap-start sm:w-[22rem] lg:w-[min(26rem,30vw)]">
                <Link href={`/experiences#${item.slug}`} className="group block">
                  <div
                    className={cn(
                      'relative overflow-hidden rounded-2xl',
                      i % 2 === 1 ? 'aspect-[4/5] lg:aspect-[4/4.4]' : 'aspect-[4/5]',
                    )}
                  >
                    <PhotoImage
                      photo={item.photo}
                      sizes="(min-width: 1024px) 26rem, 80vw"
                      className="transition-transform duration-[1.6s] ease-[var(--ease-cinematic)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/10 to-transparent" />
                    <span className="absolute top-5 left-5 font-display text-lg text-ivory/80 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="eyebrow text-sand/80">{item.kicker}</p>
                      <h3 className="mt-2 font-display text-3xl leading-tight">{item.title}</h3>
                    </div>
                  </div>
                  <p className="mt-5 line-clamp-2 max-w-sm text-sm leading-relaxed text-ivory/70">{item.description}</p>
                  <p className="mt-3 text-[11px] tracking-[0.12em] text-gold uppercase">{item.duration}</p>
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
