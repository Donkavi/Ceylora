'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { Photo } from '@/types';
import { PhotoImage } from '@/components/ui/PhotoImage';
import { EASE_CINEMATIC, inView } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface ImageRevealProps {
  photo: Photo;
  className?: string;
  sizes?: string;
  delay?: number;
  /** Direction the curtain opens towards. */
  from?: 'bottom' | 'left' | 'right';
  imageClassName?: string;
}

const hidden = {
  bottom: 'inset(100% 0% 0% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
};

/** A photograph unveiled by a clip-path curtain while settling from a slight zoom. */
export function ImageReveal({ photo, className, sizes = '50vw', delay = 0, from = 'bottom', imageClassName }: ImageRevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(!className?.includes('absolute') && 'relative', 'overflow-hidden', className)}
      initial={reduce ? false : { clipPath: hidden[from] }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={inView}
      transition={{ duration: 1.5, delay, ease: EASE_CINEMATIC }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.22 }}
        whileInView={{ scale: 1 }}
        viewport={inView}
        transition={{ duration: 2.2, delay, ease: EASE_CINEMATIC }}
      >
        <PhotoImage photo={photo} sizes={sizes} className={imageClassName} />
      </motion.div>
    </motion.div>
  );
}
