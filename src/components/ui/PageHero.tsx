import type { ReactNode } from 'react';
import type { Photo } from '@/types';
import { PhotoImage } from './PhotoImage';
import { SplitHeading } from '@/components/animations/SplitHeading';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  photo: Photo;
  eyebrow: string;
  title: string;
  intro?: string;
  emphasis?: number[];
  children?: ReactNode;
  height?: 'full' | 'tall';
  caption?: string;
}

/** Shared full-bleed page opener with the slow cinematic zoom. */
export function PageHero({ photo, eyebrow, title, intro, emphasis, children, height = 'tall', caption }: PageHeroProps) {
  return (
    <section
      className={cn(
        'grain relative isolate overflow-hidden bg-forest-deep text-ivory',
        height === 'full' ? 'h-[100svh] min-h-[620px]' : 'h-[82svh] min-h-[560px]',
      )}
    >
      <div className="absolute inset-0 -z-10 motion-safe:animate-hero-zoom">
        <PhotoImage photo={photo} preload sizes="100vw" quality={85} />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/55 via-forest-deep/15 to-forest-deep/85" />
      <div className="container-x flex h-full flex-col justify-end pb-16 md:pb-20">
        <p className="eyebrow animate-[page-in_1.2s_var(--ease-cinematic)_0.2s_both] text-sand/90">{eyebrow}</p>
        <SplitHeading as="h1" text={title} immediate delay={0.3} emphasis={emphasis} className="display-xl mt-5 max-w-[16ch] text-ivory" />
        {intro && (
          <p className="lede mt-7 max-w-2xl animate-[page-in_1.2s_var(--ease-cinematic)_0.9s_both] text-ivory/80">{intro}</p>
        )}
        {children}
      </div>
      {caption && (
        <p className="absolute right-[clamp(1.25rem,4vw,3.5rem)] bottom-6 hidden text-[10px] tracking-[0.14em] text-ivory/50 uppercase md:block">
          {caption}
        </p>
      )}
    </section>
  );
}
