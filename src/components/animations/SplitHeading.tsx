'use client';

import { motion, useReducedMotion } from 'motion/react';
import { inView, wordContainer, wordRise } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface SplitHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  /** Animate immediately on mount rather than when scrolled into view. */
  immediate?: boolean;
  delay?: number;
  stagger?: number;
  /** Words (by index) rendered in italic gold for emphasis. */
  emphasis?: number[];
}

/** An editorial heading whose words rise one by one from behind a mask. */
export function SplitHeading({
  text,
  as = 'h2',
  className,
  immediate,
  delay = 0,
  stagger = 0.07,
  emphasis = [],
}: SplitHeadingProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(' ');

  return (
    <Tag
      aria-label={text}
      className={className}
      initial={reduce ? false : 'hidden'}
      {...(immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: inView })}
      variants={wordContainer}
      custom={stagger}
      transition={{ delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
          <motion.span
            className={cn('inline-block will-change-transform', emphasis.includes(i) && 'italic text-gold')}
            variants={wordRise}
            transition={{ delay: delay + i * stagger, duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
