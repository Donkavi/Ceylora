'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import type { Photo } from '@/types';
import { PhotoImage } from '@/components/ui/PhotoImage';
import type { JourneyChapter } from '@/data/journey';
import { ISLAND_PATH, ISLAND_VIEWBOX, projectToIsland } from '@/lib/island';
import { cn } from '@/lib/utils';
import { getLenis } from '@/components/layout/SmoothScroll';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Chapter = JourneyChapter & { photo: Photo };

/**
 * "Enter Sri Lanka" — a pinned, scroll-scrubbed documentary sequence. On desktop
 * each chapter wipes up over the last while the previous frame drifts away; on
 * mobile (and for reduced motion) the chapters simply stack as full-screen frames.
 */
export function JourneyScroll({ chapters: journey }: { chapters: Chapter[] }) {
  const route = journey.map((c) => projectToIsland(c.coordinates));
  const root = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
          mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
        },
        (ctx) => {
          const chapters = gsap.utils.toArray<HTMLElement>('.journey-chapter', section);
          const media = chapters.map((c) => c.querySelector<HTMLElement>('.journey-media'));
          const reveals = chapters.map((c) => c.querySelectorAll<HTMLElement>('.journey-reveal'));

          if (ctx.conditions?.desktop) {
            section.dataset.mode = 'pinned';
            gsap.set(media, { scale: 1.2 });
            gsap.set(media[0], { scale: 1.06 });
            reveals.slice(1).forEach((r) => gsap.set(r, { y: 80, opacity: 0 }));

            const tl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1,
                start: 'top top',
                end: () => `+=${window.innerHeight * (chapters.length - 1) * 1.2}`,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                  const t = self.progress * tl.duration();
                  const idx = Math.min(chapters.length - 1, Math.floor(t + 0.45));
                  setActive((prev) => (prev === idx ? prev : idx));
                },
              },
            });

            for (let i = 1; i < chapters.length; i++) {
              const at = i - 1;
              tl.to(chapters[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, at)
                .to(media[i], { scale: 1.04, duration: 1.3, ease: 'power1.out' }, at)
                .to(media[i - 1], { scale: 1.14, yPercent: -7, duration: 1, ease: 'power1.in' }, at)
                .to(reveals[i - 1], { y: -60, opacity: 0, duration: 0.4, stagger: 0.04, ease: 'power2.in' }, at)
                .to(reveals[i], { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out' }, at + 0.55);
            }
            tl.to(media[chapters.length - 1], { scale: 1, duration: 0.5 });
            timeline.current = tl;

            return () => {
              delete section.dataset.mode;
              timeline.current = null;
            };
          }

          // Mobile: each frame gently settles and its words rise as it arrives.
          chapters.forEach((chapter, i) => {
            gsap.fromTo(
              media[i],
              { scale: 1.18 },
              { scale: 1, ease: 'none', scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true } },
            );
            gsap.from(reveals[i], {
              y: 40,
              opacity: 0,
              stagger: 0.1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: { trigger: chapter, start: 'top 60%' },
            });
          });
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  const goTo = (index: number) => {
    const tl = timeline.current;
    const st = tl?.scrollTrigger;
    if (!tl || !st) return;
    const target = st.start + (index / tl.duration()) * (st.end - st.start) + 2;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <section
      ref={root}
      id="journey"
      aria-label="Enter Sri Lanka — a journey in five chapters"
      className="journey relative overflow-hidden bg-forest-deep text-ivory"
    >
      <div className="journey-stage">
        {journey.map((chapter, i) => (
          <article
            key={chapter.id}
            aria-labelledby={`journey-${chapter.id}`}
            className="journey-chapter relative h-[100svh] min-h-[560px] overflow-hidden will-change-[clip-path]"
          >
            <div className="journey-media absolute inset-0 will-change-transform">
              <PhotoImage photo={chapter.photo} sizes="100vw" quality={75} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/25 to-forest-deep/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/60 via-transparent to-transparent" />

            <div className="container-x relative flex h-full flex-col justify-end pt-28 pb-16 md:pb-24">
              <div className="max-w-2xl">
                <p className="journey-reveal eyebrow flex items-center gap-4 text-gold">
                  <span className="tabular-nums">{chapter.number}</span>
                  <span className="h-px w-10 bg-gold/60" />
                  {chapter.label}
                </p>
                <h2 id={`journey-${chapter.id}`} className="journey-reveal display-lg mt-6 text-ivory">
                  {chapter.heading}
                </h2>
                <p className="journey-reveal lede mt-6 max-w-lg text-ivory/80">{chapter.description}</p>
                <div className="journey-reveal mt-9">
                  <Link
                    href={chapter.href}
                    className="group inline-flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-ivory uppercase"
                  >
                    <span className="link-underline">Explore {chapter.place}</span>
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
              <span
                aria-hidden
                className="journey-chapter-index absolute top-24 right-[clamp(1.25rem,4vw,3.5rem)] font-display text-7xl text-ivory/20"
              >
                {chapter.number}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Pinned-mode interface: chapter index and a small island map tracing the route. */}
      <div className="journey-ui pointer-events-none absolute inset-0 z-10">
        <p className="eyebrow absolute top-28 left-[clamp(1.25rem,4vw,3.5rem)] text-ivory/70">
          Enter Sri Lanka <span className="mx-2 text-gold">—</span> a journey in five chapters
        </p>

        <div className="pointer-events-auto absolute top-1/2 right-[clamp(1.25rem,4vw,3.5rem)] flex -translate-y-1/2 items-center gap-10">
          <ol className="space-y-4 text-right">
            {journey.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={active === i ? 'step' : undefined}
                  className={cn(
                    'group relative ml-auto flex items-center justify-end gap-3 text-[0.6875rem] font-semibold tracking-[0.18em] uppercase transition-colors duration-500',
                    active === i ? 'text-ivory' : 'text-ivory/40 hover:text-ivory/80',
                  )}
                >
                  <span
                    className={cn(
                      'absolute right-[calc(100%+0.75rem)] whitespace-nowrap transition-opacity duration-500',
                      active === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                    )}
                  >
                    {c.place}
                  </span>
                  <span className="tabular-nums">{c.number}</span>
                  <span className="flex w-10 justify-start">
                    <span
                      className={cn(
                        'h-px bg-current transition-all duration-700 ease-[var(--ease-cinematic)]',
                        active === i ? 'w-10 bg-gold' : 'w-4',
                      )}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <svg viewBox={ISLAND_VIEWBOX} className="hidden h-56 w-auto lg:block" aria-hidden>
            <path d={ISLAND_PATH} className="fill-ivory/10 stroke-ivory/40" strokeWidth={1.2} />
            <polyline
              points={route.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              className="stroke-gold/60"
              strokeWidth={1.4}
              strokeDasharray="3 4"
            />
            {route.map((p, i) => (
              <g key={journey[i].id}>
                {active === i && (
                  <circle cx={p.x} cy={p.y} r={14} className="fill-gold/20">
                    <animate attributeName="r" values="7;16;7" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active === i ? 6 : 4}
                  className={cn('transition-all duration-500', active === i ? 'fill-gold' : 'fill-ivory/70')}
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-ivory/10">
          <div
            className="h-full bg-gold transition-[width] duration-700 ease-[var(--ease-cinematic)]"
            style={{ width: `${((active + 1) / journey.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
