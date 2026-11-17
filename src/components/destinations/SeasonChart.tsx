import type { Season } from '@/types';
import { MONTHS, cn } from '@/lib/utils';

/** Twelve months at a glance: ideal, good-with-trade-offs, and quieter months. */
export function SeasonChart({ season, light }: { season: Season; light?: boolean }) {
  return (
    <div>
      <ol className="grid grid-cols-6 gap-1.5 sm:grid-cols-12" aria-label="Month-by-month suitability">
        {MONTHS.map((m, i) => {
          const month = i + 1;
          const level = season.best.includes(month) ? 'best' : season.shoulder.includes(month) ? 'shoulder' : 'off';
          const label = level === 'best' ? 'ideal' : level === 'shoulder' ? 'good' : 'quieter or wetter';
          return (
            <li key={m} className="flex flex-col items-center gap-2" aria-label={`${m}: ${label}`}>
              <span className="relative block h-24 w-full overflow-hidden rounded-full bg-current/5">
                <span
                  className={cn(
                    'absolute inset-x-0 bottom-0 rounded-full',
                    level === 'best' && 'h-full bg-tropical',
                    level === 'shoulder' && 'h-3/5 bg-gold/80',
                    level === 'off' && cn('h-1/4', light ? 'bg-ivory/25' : 'bg-forest/15'),
                  )}
                />
              </span>
              <span className={cn('text-[11px] font-medium', light ? 'text-ivory/70' : 'text-stone')}>{m}</span>
            </li>
          );
        })}
      </ol>
      <ul className={cn('mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs', light ? 'text-ivory/70' : 'text-stone')}>
        <li className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-tropical" /> Ideal
        </li>
        <li className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-gold/80" /> Good
        </li>
        <li className="flex items-center gap-2">
          <span className={cn('size-2.5 rounded-full', light ? 'bg-ivory/25' : 'bg-forest/15')} /> Quieter or wetter
        </li>
      </ul>
    </div>
  );
}
