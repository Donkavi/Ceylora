'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Photo } from '@/types';
import { PhotoImage } from '@/components/ui/PhotoImage';
import { SplitHeading } from '@/components/animations/SplitHeading';
import { EASE_CINEMATIC } from '@/lib/animations';

/** Full-screen opening shot: slow cinematic zoom, gentle parallax and an editorial title. */
export function Hero({ photo }: { photo: Photo }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.2, delay, ease: EASE_CINEMATIC },
        };

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-forest-deep text-ivory grain">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imageY }}>
        <div className="absolute inset-0 motion-safe:animate-hero-zoom">
          <PhotoImage photo={photo} preload sizes="100vw" quality={85} className="object-[50%_60%]" />
        </div>
      </motion.div>

      {/* Layered overlays keep the type legible without flattening the photograph. */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/55 via-forest-deep/10 to-forest-deep/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgb(15_42_34/0.55),transparent_60%)]" />

      <motion.div
        className="container-x relative flex h-full flex-col justify-end pb-28 md:justify-center md:pb-0"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p className="eyebrow mb-6 text-sand/90" {...enter(0.2)}>
          Sri Lanka · A little island, a world of wonders
        </motion.p>

        <SplitHeading
          as="h1"
          text="Discover the Soul of Sri Lanka"
          immediate
          delay={0.35}
          stagger={0.09}
          emphasis={[2]}
          className="display-xl max-w-[12ch] text-ivory"
        />

        <motion.p className="lede mt-8 max-w-xl text-ivory/85" {...enter(1.1)}>
          Where ancient wonders meet endless oceans, misty mountains, and unforgettable journeys.
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap items-center gap-4" {...enter(1.3)}>
          <Link
            href="/explore"
            className="group inline-flex items-center gap-3 rounded-full bg-ivory px-7 py-4 text-xs font-semibold tracking-[0.14em] text-forest uppercase transition-colors duration-500 hover:bg-gold hover:text-ivory"
          >
            Explore Sri Lanka
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-3 rounded-full border border-ivory/45 px-7 py-4 text-xs font-semibold tracking-[0.14em] text-ivory uppercase backdrop-blur-sm transition-colors duration-500 hover:border-ivory hover:bg-ivory/10"
          >
            Discover Destinations
          </Link>
        </motion.div>
      </motion.div>

      <motion.a
        href="#journey"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-ivory/80 transition-colors hover:text-ivory"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="eyebrow text-[0.625rem]">Scroll to discover</span>
        <span className="relative block h-12 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-0 bg-ivory motion-safe:animate-scroll-line" />
        </span>
      </motion.a>

      <div className="absolute right-0 bottom-8 hidden pr-[clamp(1.25rem,4vw,3.5rem)] text-right text-[0.6875rem] tracking-[0.12em] text-ivory/60 uppercase md:block">
        <p>Sigiriya at dusk, from Pidurangala</p>
        <p className="mt-1 tabular-nums">7.9570° N · 80.7603° E</p>
      </div>
    </section>
  );
}
