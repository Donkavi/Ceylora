import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { SplitHeading } from '@/components/animations/SplitHeading';
import { ArticleCard } from '@/components/journal/ArticleCard';
import { articles } from '@/data/articles';
import { getPhoto } from '@/lib/photos';
import { pageMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export const metadata = pageMetadata({
  title: 'Travel Journal — Stories and Guides from Sri Lanka',
  description:
    'Long reads and practical guides: where to go, the hill-country railway, Sigiriya, the south coast’s best beaches, wildlife and Sri Lankan food.',
  path: '/journal',
  image: articles[0]?.cover,
});

export default function JournalPage() {
  const [lead, second, third, ...rest] = articles;
  const staggered = rest.slice(0, 3);
  const compact = rest.slice(3);

  return (
    <>
      <header className="bg-forest pt-36 pb-20 text-ivory md:pt-44 md:pb-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 border-b border-ivory/15 pb-10 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-gold">The Ceylora Journal</p>
              <SplitHeading as="h1" text="Stories from a small island" immediate emphasis={[3, 4]} className="display-xl mt-5 max-w-[12ch]" />
            </div>
            <p className="max-w-sm text-ivory/70">
              Guides, journeys and long reads for travellers who want to understand Sri Lanka, not just see it.
            </p>
          </div>

          <Link href={`/journal/${lead.slug}`} className="group mt-14 grid items-end gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <ImageReveal photo={getPhoto(lead.cover)} className="aspect-[16/10] rounded-2xl" sizes="(min-width: 1024px) 60vw, 100vw" imageClassName="transition-transform duration-[1.8s] ease-[var(--ease-cinematic)] group-hover:scale-[1.04]" />
            <Reveal delay={0.15}>
              <p className="eyebrow text-sand/70">
                Latest · {lead.category} · {lead.readingMinutes} min read
              </p>
              <h2 className="display-md mt-4 transition-colors group-hover:text-sand">{lead.title}</h2>
              <p className="mt-5 leading-relaxed text-ivory/75">{lead.dek}</p>
              <p className="mt-6 flex items-center gap-3 text-xs tracking-[0.14em] text-gold uppercase">
                <span className="link-underline">Read the story</span>
                <ArrowUpRight className="size-4" />
              </p>
              <p className="mt-6 text-xs text-ivory/45">
                {lead.author} · {formatDate(lead.publishedAt)}
              </p>
            </Reveal>
          </Link>
        </div>
      </header>

      <section aria-label="More stories" className="bg-ivory py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-16">
            {[second, third].filter(Boolean).map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.1}>
                <ArticleCard article={a} sizes="(min-width: 768px) 45vw, 100vw" />
              </Reveal>
            ))}
          </div>

          <blockquote className="mx-auto my-24 max-w-4xl text-center md:my-32">
            <p className="display-md text-forest">
              Sri Lanka is small enough to cross in a day, and big enough that you will never <em className="text-gold">quite finish it.</em>
            </p>
          </blockquote>

          <div className="grid gap-14 md:grid-cols-3 md:gap-8">
            {staggered.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08} className={i === 1 ? 'md:mt-24' : ''}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>

          {compact.length > 0 && (
            <div className="mt-24 border-t border-forest/12 pt-12">
              <p className="eyebrow text-stone">Also in the journal</p>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {compact.map((a) => (
                  <Reveal key={a.slug}>
                    <ArticleCard article={a} size="compact" />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
