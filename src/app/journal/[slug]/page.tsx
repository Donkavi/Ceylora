import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PhotoImage, PhotoCreditLink } from '@/components/ui/PhotoImage';
import { SplitHeading } from '@/components/animations/SplitHeading';
import { Reveal } from '@/components/animations/Reveal';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { ReadingProgress } from '@/components/journal/ReadingProgress';
import { ArticleCard } from '@/components/journal/ArticleCard';
import { JsonLd } from '@/components/ui/JsonLd';
import { articles, getArticle } from '@/data/articles';
import { destinationMap } from '@/data/destinations';
import { regionMap } from '@/data/categories';
import { getPhoto } from '@/lib/photos';
import { absoluteUrl, pageMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { site } from '@/data/site';
import type { ArticleBlock } from '@/types';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.dek, path: `/journal/${a.slug}`, image: a.cover, type: 'article', publishedTime: a.publishedAt });
}

function Block({ block, index }: { block: ArticleBlock; index: number }) {
  switch (block.type) {
    case 'p':
      return (
        <p
          className={
            index === 0
              ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4.6rem] first-letter:leading-[0.8] first-letter:text-gold'
              : undefined
          }
        >
          {block.text}
        </p>
      );
    case 'h2':
      return <h2 className="!mt-16 font-display text-4xl leading-tight text-forest md:text-[2.75rem]">{block.text}</h2>;
    case 'quote':
      return (
        <figure className="!my-16 border-l-2 border-gold pl-8 md:-mx-16 md:pl-12">
          <blockquote className="font-display text-3xl leading-snug text-forest italic md:text-[2.5rem]">“{block.text}”</blockquote>
          {block.cite && <figcaption className="mt-5 text-xs tracking-[0.16em] text-stone uppercase">— {block.cite}</figcaption>}
        </figure>
      );
    case 'image': {
      const photo = getPhoto(block.photo);
      return (
        <figure className="!my-14 md:-mx-24 lg:-mx-40">
          <ImageReveal photo={photo} className="aspect-[16/10] rounded-2xl" sizes="(min-width: 1024px) 70vw, 100vw" />
          <figcaption className="mt-4 flex flex-col gap-1 text-sm text-stone md:flex-row md:items-baseline md:justify-between">
            <span>{block.caption ?? photo.alt}</span>
            <PhotoCreditLink photo={photo} className="shrink-0" />
          </figcaption>
        </figure>
      );
    }
    case 'list':
      return (
        <ol className="!mt-10 space-y-8">
          {block.items.map((item, i) => (
            <li key={item.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-forest/12 pt-6">
              <span className="font-display text-3xl text-gold tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-2xl text-forest">{item.title}</h3>
                <p className="!mt-2">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const cover = getPhoto(article.cover);
  const related = article.relatedDestinations.map((s) => destinationMap[s]).filter(Boolean);
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article>
      <ReadingProgress />
      <header className="grain relative isolate h-[92svh] min-h-[600px] overflow-hidden bg-forest-deep text-ivory">
        <div className="absolute inset-0 -z-10 motion-safe:animate-hero-zoom">
          <PhotoImage photo={cover} preload sizes="100vw" quality={85} />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/50 via-forest-deep/20 to-forest-deep/90" />
        <div className="container-x flex h-full flex-col justify-end pb-16">
          <Link href="/journal" className="inline-flex animate-[page-in_1s_var(--ease-cinematic)_both] items-center gap-2 text-xs tracking-[0.16em] text-ivory/75 uppercase hover:text-ivory">
            <ArrowLeft className="size-3.5" /> Travel journal
          </Link>
          <p className="eyebrow mt-8 animate-[page-in_1s_var(--ease-cinematic)_0.15s_both] text-gold">
            {article.category} · {article.readingMinutes} min read
          </p>
          <SplitHeading as="h1" text={article.title} immediate delay={0.25} stagger={0.05} className="display-lg mt-4 max-w-[20ch]" />
          <p className="lede mt-6 max-w-2xl animate-[page-in_1.2s_var(--ease-cinematic)_0.8s_both] text-ivory/80">{article.dek}</p>
          <div className="mt-8 flex animate-[page-in_1.2s_var(--ease-cinematic)_1s_both] flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ivory/60">
            <span>{article.author}</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <PhotoCreditLink photo={cover} />
          </div>
        </div>
      </header>

      <div className="bg-ivory py-20 md:py-28">
        <div className="container-x">
          <div className="prose-ceylora mx-auto max-w-[42rem] [&>p]:text-[1.125rem] [&>p]:leading-[1.9]">
            {article.body.map((block, i) => (
              <Block key={i} block={block} index={i} />
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="bg-sand/40 py-20 md:py-28">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow text-tropical">Places in this story</p>
              <h2 id="related-heading" className="display-md mt-4 text-forest">
                Go and see for yourself
              </h2>
            </Reveal>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((d, i) => (
                <Reveal as="li" key={d.slug} delay={i * 0.06}>
                  <Link href={`/destinations/${d.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl text-ivory">
                    <PhotoImage photo={getPhoto(d.hero)} sizes="(min-width: 1024px) 25vw, 50vw" className="transition-transform duration-[1.6s] ease-[var(--ease-cinematic)] group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                      <div>
                        <p className="eyebrow text-sand/80">{regionMap[d.region].name}</p>
                        <p className="mt-1 font-display text-3xl">{d.name}</p>
                      </div>
                      <ArrowUpRight className="size-5" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="more-heading" className="bg-ivory py-20 md:py-28">
        <div className="container-x">
          <h2 id="more-heading" className="display-md text-forest">
            Keep reading
          </h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {more.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.dek,
          image: [absoluteUrl(cover.src)],
          datePublished: article.publishedAt,
          author: { '@type': 'Organization', name: article.author },
          publisher: { '@type': 'Organization', name: site.name },
          mainEntityOfPage: absoluteUrl(`/journal/${article.slug}`),
        }}
      />
    </article>
  );
}
