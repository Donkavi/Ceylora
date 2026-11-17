import type { Transition, Variants } from 'motion/react';

/** Shared easing curves — slow out, gentle settle. */
export const EASE_CINEMATIC: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_SOFT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const transition = (duration = 1.1, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_CINEMATIC,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: transition(1.1, delay) }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({ opacity: 1, transition: transition(1.2, delay) }),
};

/** Word-by-word heading reveal: the parent staggers, each word rises from a mask. */
export const wordContainer: Variants = {
  hidden: {},
  visible: (stagger: number = 0.06) => ({ transition: { staggerChildren: stagger } }),
};

export const wordRise: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: transition(1.15) },
};

/** Image reveal: a clip-path curtain opening upward. */
export const curtain: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: (delay: number = 0) => ({ clipPath: 'inset(0% 0% 0% 0%)', transition: transition(1.4, delay) }),
};

export const staggerChildren = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Default viewport settings for scroll-triggered reveals. */
export const inView = { once: true, margin: '0px 0px -12% 0px' } as const;
