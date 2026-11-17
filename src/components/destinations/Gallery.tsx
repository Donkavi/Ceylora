'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import type { Photo } from '@/types';
import { PhotoImage, PhotoCreditLink } from '@/components/ui/PhotoImage';
import { EASE_CINEMATIC } from '@/lib/animations';
import { getLenis } from '@/components/layout/SmoothScroll';

/** Masonry gallery with a full-screen, keyboard- and swipe-friendly lightbox. */
export function Gallery({ photos, title }: { photos: Photo[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      setIndex((i) => (i === null ? i : (i + step + photos.length) % photos.length));
    },
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, go]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {photos.map((photo, i) => (
          <motion.li
            key={photo.id}
            className="break-inside-avoid"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1, delay: (i % 3) * 0.08, ease: EASE_CINEMATIC }}
          >
            <button
              type="button"
              onClick={() => {
                setDirection(0);
                setIndex(i);
              }}
              className="group relative block w-full overflow-hidden rounded-2xl"
              aria-label={`Open photo: ${photo.alt}`}
            >
              <PhotoImage
                photo={photo}
                intrinsic
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="h-auto w-full transition-transform duration-[1.4s] ease-[var(--ease-cinematic)] group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-forest-deep/0 transition-colors duration-500 group-hover:bg-forest-deep/20" />
              <span className="absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-full bg-ivory/90 text-forest opacity-0 transition-all duration-500 group-hover:opacity-100">
                <Expand className="size-4" />
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
            className="fixed inset-0 z-[80] flex flex-col bg-[#0b1c17]/97 text-ivory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between px-5 py-4 md:px-8">
              <p className="text-xs tracking-[0.2em] text-ivory/60 uppercase tabular-nums">
                {title} · {index + 1} / {photos.length}
              </p>
              <button
                type="button"
                onClick={() => setIndex(null)}
                aria-label="Close gallery"
                className="flex size-11 items-center justify-center rounded-full hover:bg-white/10"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  className="absolute inset-0 px-4 md:px-24"
                  initial={{ opacity: 0, x: direction * 80, scale: direction === 0 ? 0.96 : 1 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction * -80 }}
                  transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) go(1);
                    else if (info.offset.x > 80) go(-1);
                  }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      sizes="100vw"
                      quality={85}
                      placeholder="blur"
                      blurDataURL={current.blur}
                      className="pointer-events-none object-contain select-none"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className="absolute top-1/2 left-3 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:bg-ivory hover:text-forest md:flex"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photo"
                className="absolute top-1/2 right-3 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:bg-ivory hover:text-forest md:flex"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1 px-5 py-5 text-center md:px-8">
              <p className="font-display text-lg text-ivory/90">{current.alt}</p>
              <PhotoCreditLink photo={current} className="text-ivory/60" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
