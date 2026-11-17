import Link from 'next/link';
import type { JournalArticle } from '@/types';
import { Photo } from '@/components/ui/Photo';
import { cn, formatDate } from '@/lib/utils';

interface ArticleCardProps {
  article: JournalArticle;
  size?: 'feature' | 'standard' | 'compact';
  className?: string;
  sizes?: string;
}

/** Magazine-style article card; three sizes keep journal layouts from feeling repetitive. */
export function ArticleCard({ article, size = 'standard', className, sizes }: ArticleCardProps) {
  const feature = size === 'feature';
  const compact = size === 'compact';
  return (
    <article className={cn('group', compact && 'grid grid-cols-[7rem_1fr] items-center gap-5', className)}>
      <Link href={`/journal/${article.slug}`} className="contents">
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl bg-sand',
            feature ? 'aspect-[16/11]' : compact ? 'aspect-square' : 'aspect-[4/3]',
          )}
        >
          <Photo
            id={article.cover}
            sizes={sizes ?? (feature ? '(min-width: 1024px) 60vw, 100vw' : compact ? '112px' : '(min-width: 1024px) 30vw, 100vw')}
            className="transition-transform duration-[1.6s] ease-[var(--ease-cinematic)] group-hover:scale-[1.05]"
          />
        </div>
        <div className={cn(!compact && 'mt-6')}>
          <p className="eyebrow flex items-center gap-3 text-tropical">
            {article.category}
            <span className="h-px w-6 bg-tropical/40" />
            <span className="text-stone">{article.readingMinutes} min read</span>
          </p>
          <h3
            className={cn(
              'mt-3 font-display leading-[1.08] text-forest transition-colors group-hover:text-tropical',
              feature ? 'text-4xl md:text-5xl' : compact ? 'text-xl' : 'text-[1.75rem]',
            )}
          >
            {article.title}
          </h3>
          {!compact && <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-charcoal/70">{article.dek}</p>}
          {feature && <p className="mt-5 text-xs text-stone">{formatDate(article.publishedAt)}</p>}
        </div>
      </Link>
    </article>
  );
}
