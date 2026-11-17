import { cn } from '@/lib/utils';

/** Ceylora wordmark: a rising sun over three waves — island, ocean, morning. */
export function Logo({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', tone === 'light' ? 'text-ivory' : 'text-forest', className)}>
      <svg viewBox="0 0 32 32" aria-hidden className="size-7 shrink-0">
        <circle cx="16" cy="15" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M16 4.5v2.5M7.2 8.2l1.8 1.8M24.8 8.2 23 10M4 15h2.5M25.5 15H28" stroke="#C99D62" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M4 21.5c2.4 0 2.4-1.6 4.8-1.6s2.4 1.6 4.8 1.6 2.4-1.6 4.8-1.6 2.4 1.6 4.8 1.6 2.4-1.6 4.8-1.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M6.5 25.8c2 0 2-1.3 4-1.3s2 1.3 4 1.3 2-1.3 4-1.3 2 1.3 4 1.3 2-1.3 4-1.3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".6" />
      </svg>
      <span className="font-display text-[1.65rem] leading-none tracking-[0.02em]">Ceylora</span>
    </span>
  );
}
