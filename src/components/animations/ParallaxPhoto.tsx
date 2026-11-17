'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import type { Photo } from '@/types';
import { PhotoImage } from '@/components/ui/PhotoImage';
import { cn } from '@/lib/utils';

interface ParallaxPhotoProps {
  photo: Photo;
  className?: string;
  sizes?: string;
  /** Percentage of travel; 10 means the image drifts ±10% of its height. */
  strength?: number;
  preload?: boolean;
  overlay?: string;
  imageClassName?: string;
}

/** A photo that drifts gently against the scroll, inside a clipped frame. */
export function ParallaxPhoto({ photo, className, sizes = '100vw', strength = 8, preload, overlay, imageClassName }: ParallaxPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn(!className?.includes('absolute') && 'relative', 'overflow-hidden', className)}>
      <motion.div className="absolute inset-x-0 -inset-y-[12%]" style={reduce ? undefined : { y }}>
        <PhotoImage photo={photo} sizes={sizes} preload={preload} className={imageClassName} />
      </motion.div>
      {overlay && <div className={cn('pointer-events-none absolute inset-0', overlay)} />}
    </div>
  );
}
