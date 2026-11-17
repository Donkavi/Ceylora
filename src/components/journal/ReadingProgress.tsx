'use client';

import { motion, useScroll, useSpring } from 'motion/react';

/** A hairline at the top of the viewport tracking how far through the article you are. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gold" style={{ scaleX }} />;
}
