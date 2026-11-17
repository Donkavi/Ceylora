'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { mainNav, planCta } from '@/data/site';
import { cn } from '@/lib/utils';
import { EASE_CINEMATIC } from '@/lib/animations';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

/**
 * Transparent over each page's hero, then settles into a soft ivory bar once
 * the visitor scrolls. Hides on the way down and returns on the way up.
 */
export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 60);
    setHidden(y > 420 && y > prev && !open);
  });

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const light = !solid;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
      >
        <div
          className={cn(
            'transition-[background-color,box-shadow,backdrop-filter] duration-700 ease-[var(--ease-cinematic)]',
            solid ? 'bg-ivory/85 shadow-[0_1px_0_rgb(23_61_50/0.08)] backdrop-blur-xl' : 'bg-gradient-to-b from-black/35 to-transparent',
          )}
        >
          <nav aria-label="Main" className="container-x flex h-20 items-center justify-between gap-6 lg:h-24">
            <Link href="/" aria-label="Ceylora home" className="relative z-10">
              <Logo tone={light ? 'light' : 'dark'} />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'relative px-2.5 py-2 text-[0.8125rem] font-medium tracking-[0.04em] whitespace-nowrap transition-colors duration-300 xl:px-3.5',
                      light ? 'text-ivory/85 hover:text-ivory' : 'text-charcoal/75 hover:text-forest',
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="nav-active"
                        className={cn('absolute inset-x-2.5 -bottom-0.5 h-px xl:inset-x-3.5', light ? 'bg-ivory' : 'bg-gold')}
                        transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <Link
                href={planCta.href}
                className={cn(
                  'group hidden items-center gap-2 rounded-full px-5 py-3 text-[0.75rem] font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition-all duration-500 sm:inline-flex',
                  light
                    ? 'border border-ivory/40 text-ivory backdrop-blur-sm hover:bg-ivory hover:text-forest'
                    : 'bg-forest text-ivory hover:bg-gold',
                )}
              >
                {planCta.label}
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className={cn(
                  'flex size-12 items-center justify-center rounded-full transition-colors lg:hidden',
                  light ? 'text-ivory hover:bg-white/10' : 'text-forest hover:bg-forest/5',
                )}
              >
                <span className="flex w-6 flex-col gap-[7px]">
                  <span className="h-px w-full bg-current" />
                  <span className="h-px w-2/3 self-end bg-current" />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} isActive={isActive} />}</AnimatePresence>
    </>
  );
}
