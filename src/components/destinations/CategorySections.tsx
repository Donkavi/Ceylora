import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Category, Photo as PhotoT } from '@/types';
import { Reveal } from '@/components/animations/Reveal';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { ParallaxPhoto } from '@/components/animations/ParallaxPhoto';
import { PhotoImage } from '@/components/ui/PhotoImage';
import { cn } from '@/lib/utils';
import { HoverList } from './HoverList';

export interface CategoryItem {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  summary: string;
  photo: PhotoT;
}

interface SectionProps {
  category: Category;
  index: number;
  items: CategoryItem[];
}

const href = (slug: string) => `/destinations/${slug}`;
const shortName = (name: string) => name.replace(' National Park', '').replace(' Forest Reserve', '');

function AlsoIn({ items, light }: { items: CategoryItem[]; light?: boolean }) {
  if (items.length === 0) return null;
  return (
    <p className={cn('container-x mt-10 text-sm', light ? 'text-ivory/60' : 'text-charcoal/70')}>
      Also in this collection:{' '}
      {items.map((m, i) => (
        <span key={m.slug}>
          <Link href={href(m.slug)} className={cn('link-underline', light ? 'text-ivory' : 'text-forest')}>
            {m.name}
          </Link>
          {i < items.length - 1 ? ', ' : ''}
        </span>
      ))}
    </p>
  );
}

function SectionHeader({ category, index, light, className }: { category: Category; index: number; light?: boolean; className?: string }) {
  return (
    <Reveal className={cn('max-w-3xl', className)}>
      <p className={cn('eyebrow flex items-center gap-4', light ? 'text-gold' : 'text-tropical')}>
        <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span>
        <span className={cn('h-px w-10', light ? 'bg-gold/50' : 'bg-tropical/40')} />
        {category.label}
      </p>
      <h2 className={cn('display-lg mt-5', light ? 'text-ivory' : 'text-forest')}>{category.title}</h2>
      <p className={cn('lede mt-6 max-w-2xl', light ? 'text-ivory/75' : 'text-charcoal/70')}>{category.description}</p>
    </Reveal>
  );
}

/** Beaches — a swipeable horizontal gallery of tall cards. */
export function RailSection({ category, index, items }: SectionProps) {
  return (
    <section id={category.id} aria-label={category.title} className="scroll-mt-24 overflow-hidden bg-ivory py-24 md:py-36">
      <div className="container-x">
        <SectionHeader category={category} index={index} />
      </div>
      <ul className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] pb-4 md:gap-6">
        {items.map((d, i) => (
          <Reveal as="li" key={d.slug} delay={Math.min(i, 4) * 0.06} className="w-[80vw] shrink-0 snap-start sm:w-[24rem] lg:w-[27rem]">
            <Link href={href(d.slug)} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <PhotoImage
                  photo={d.photo}
                  sizes="(min-width: 1024px) 27rem, 80vw"
                  className="transition-transform duration-[1.6s] ease-[var(--ease-cinematic)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                  <p className="eyebrow text-sand/80">{d.region}</p>
                  <h3 className="mt-1 font-display text-4xl">{d.name}</h3>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal/70">{d.tagline}</p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/** Mountains — one full-bleed parallax photograph with the destinations as a minimal index. */
export function EditorialSection({ category, index, items }: SectionProps) {
  const [lead, ...rest] = items;
  return (
    <section id={category.id} aria-label={category.title} className="scroll-mt-24 bg-ivory pb-24 md:pb-36">
      <div className="relative h-[85svh] min-h-[560px] text-ivory">
        <ParallaxPhoto photo={lead.photo} className="absolute inset-0" strength={10} />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/30 to-forest-deep/40" />
        <div className="container-x relative flex h-full flex-col justify-end pb-16">
          <SectionHeader category={category} index={index} light />
        </div>
      </div>
      <div className="container-x mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="eyebrow text-stone">Featured</p>
          <Link href={href(lead.slug)} className="group mt-3 block">
            <h3 className="font-display text-5xl text-forest transition-colors group-hover:text-tropical">{lead.name}</h3>
            <p className="mt-4 max-w-md text-charcoal/70">{lead.summary}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-forest uppercase">
              <span className="link-underline">Discover {lead.name}</span>
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </Reveal>
        <ul className="border-t border-forest/15">
          {rest.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={i * 0.06} className="border-b border-forest/15">
              <Link href={href(d.slug)} className="group grid grid-cols-[5rem_1fr_auto] items-center gap-5 py-5">
                <span className="relative block aspect-square overflow-hidden rounded-xl">
                  <PhotoImage photo={d.photo} sizes="80px" className="transition-transform duration-700 group-hover:scale-110" />
                </span>
                <span>
                  <span className="block font-display text-2xl text-forest md:text-3xl">{d.name}</span>
                  <span className="mt-0.5 block text-sm text-stone">{d.tagline}</span>
                </span>
                <ArrowUpRight className="size-5 text-forest/40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Heritage — an asymmetrical mosaic: one tall feature, three supporting frames. */
export function MosaicSection({ category, index, items }: SectionProps) {
  const [a, b, c, d, ...more] = items;
  const cell = (item: CategoryItem | undefined, cls: string, sizes: string, delay = 0) =>
    item && (
      <Link href={href(item.slug)} className={cn('group relative block overflow-hidden rounded-2xl text-ivory', cls)}>
        <ImageReveal photo={item.photo} className="absolute inset-0" sizes={sizes} delay={delay} imageClassName="transition-transform duration-[1.6s] ease-[var(--ease-cinematic)] group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="eyebrow text-sand/80">{item.region}</p>
          <h3 className="mt-1 font-display text-3xl md:text-4xl">{item.name}</h3>
        </div>
      </Link>
    );

  return (
    <section id={category.id} aria-label={category.title} className="scroll-mt-24 bg-sand/40 py-24 md:py-36">
      <div className="container-x">
        <SectionHeader category={category} index={index} />
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-[18rem_18rem] md:gap-5">
          {cell(a, 'h-[26rem] md:col-span-3 md:row-span-2 md:h-auto', '(min-width: 768px) 50vw, 100vw')}
          {cell(b, 'h-72 md:col-span-3 md:h-auto', '(min-width: 768px) 50vw, 100vw', 0.1)}
          {cell(c, 'h-72 md:col-span-2 md:h-auto', '(min-width: 768px) 33vw, 100vw', 0.15)}
          {cell(d, 'h-72 md:col-span-1 md:h-auto', '(min-width: 768px) 17vw, 100vw', 0.2)}
        </div>
      </div>
      <AlsoIn items={more} />
    </section>
  );
}

/** Wildlife — dark, full-width photography with alternating text panels. */
export function DarkSplitSection({ category, index, items }: SectionProps) {
  return (
    <section id={category.id} aria-label={category.title} className="scroll-mt-24 bg-forest-deep py-24 text-ivory md:py-36">
      <div className="container-x">
        <SectionHeader category={category} index={index} light />
      </div>
      <div className="mt-16 space-y-5 md:space-y-8">
        {items.slice(0, 4).map((d, i) => (
          <Reveal key={d.slug} y={40}>
            <Link
              href={href(d.slug)}
              className={cn('group container-x grid items-center gap-8 md:grid-cols-[1.4fr_1fr] md:gap-14', i % 2 === 1 && 'md:grid-cols-[1fr_1.4fr]')}
            >
              <div className={cn('relative aspect-[16/10] overflow-hidden rounded-2xl', i % 2 === 1 && 'md:order-2')}>
                <PhotoImage
                  photo={d.photo}
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="transition-transform duration-[1.8s] ease-[var(--ease-cinematic)] group-hover:scale-[1.05]"
                />
              </div>
              <div className={cn(i % 2 === 1 && 'md:order-1 md:text-right')}>
                <p className="font-display text-6xl text-ivory/15 tabular-nums">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 font-display text-4xl md:text-5xl">{d.name}</h3>
                <p className={cn('mt-4 max-w-md text-ivory/70', i % 2 === 1 && 'md:ml-auto')}>{d.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                  <span className="link-underline">Into the wild</span>
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <AlsoIn items={items.slice(4)} light />
    </section>
  );
}

/** Nature — compact numbered cards beside a sticky introduction. */
export function MinimalCardsSection({ category, index, items }: SectionProps) {
  return (
    <section id={category.id} aria-label={category.title} className="scroll-mt-24 bg-ivory py-24 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.6fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader category={category} index={index} />
        </div>
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
          {items.slice(0, 6).map((d, i) => (
            <Reveal as="li" key={d.slug} delay={(i % 2) * 0.08} className={cn(i % 2 === 1 && 'sm:mt-20')}>
              <Link href={href(d.slug)} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <PhotoImage
                    photo={d.photo}
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                    className="transition-transform duration-[1.6s] ease-[var(--ease-cinematic)] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-forest/15 pb-4">
                  <h3 className="font-display text-3xl text-forest">{d.name}</h3>
                  <span className="text-xs text-stone tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-3 text-sm text-charcoal/70">{d.tagline}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
      <AlsoIn items={items.slice(6)} />
    </section>
  );
}

/** Adventure — tall triptych frames with overlaid type that lifts on hover. */
export function TriptychSection({ category, index, items }: SectionProps) {
  return (
    <section id={category.id} aria-label={category.title} className="scroll-mt-24 bg-sand/40 py-24 md:py-36">
      <div className="container-x">
        <SectionHeader category={category} index={index} />
        <ul className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {items.slice(0, 6).map((d, i) => (
            <Reveal as="li" key={d.slug} delay={(i % 3) * 0.08}>
              <Link href={href(d.slug)} className="group relative block h-[26rem] overflow-hidden rounded-2xl text-ivory md:h-[34rem]">
                <PhotoImage
                  photo={d.photo}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="transition-transform duration-[1.8s] ease-[var(--ease-cinematic)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 translate-y-6 p-7 transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:translate-y-0">
                  <p className="eyebrow text-sand/80">{d.region}</p>
                  <h3 className="mt-1 font-display text-4xl">{shortName(d.name)}</h3>
                  <p className="mt-3 text-sm text-ivory/80 opacity-0 transition-opacity duration-700 group-hover:opacity-100">{d.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
      <AlsoIn items={items.slice(6)} />
    </section>
  );
}

/** Culture — an editorial index where hovering a name reveals its photograph. */
export function ListSection({ category, index, items }: SectionProps) {
  return (
    <section id={category.id} aria-label={category.title} className="scroll-mt-24 bg-ivory py-24 md:py-36">
      <div className="container-x">
        <SectionHeader category={category} index={index} />
        <HoverList items={items} />
      </div>
    </section>
  );
}
