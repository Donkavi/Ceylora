'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { mainNav, planCta, site } from '@/data/site';
import { EASE_CINEMATIC } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { getLenis } from './SmoothScroll';

interface MobileMenuProps {
  onClose: () => void;
  isActive: (href: string) => boolean;
}

/** Full-screen menu: a forest-green curtain with large serif links. */
export function MobileMenu({ onClose, isActive }: MobileMenuProps) {
  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const links = [...mainNav, { label: 'Itineraries', href: '/itineraries' }];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[60] flex flex-col bg-forest text-ivory"
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" onClick={onClose} aria-label="Ceylora home">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex size-12 items-center justify-center rounded-full hover:bg-white/10"
        >
          <X className="size-6" strokeWidth={1.25} />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center">
        <ul className="space-y-1">
          {links.map((item, i) => (
            <li key={item.href} className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.06, ease: EASE_CINEMATIC }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-baseline gap-4 py-1.5 font-display text-[2.6rem] leading-tight transition-colors sm:text-6xl',
                    isActive(item.href) ? 'text-gold italic' : 'text-ivory hover:text-gold',
                  )}
                >
                  <span className="font-sans text-xs tracking-[0.2em] text-ivory/40">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        className="container-x flex flex-col gap-6 pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <Link
          href={planCta.href}
          onClick={onClose}
          className="inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-4 text-xs font-semibold tracking-[0.16em] text-forest uppercase"
        >
          {planCta.label}
        </Link>
        <p className="font-display text-lg italic text-ivory/60">{site.tagline}</p>
      </motion.div>
    </motion.div>
  );
}
