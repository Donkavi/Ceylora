import { Reveal } from '@/components/animations/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { ArticleCard } from '@/components/journal/ArticleCard';
import { articles } from '@/data/articles';

export function JournalTeaser() {
  const [lead, ...rest] = articles;
  return (
    <section aria-labelledby="journal-heading" className="bg-ivory py-28 md:py-40">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow text-tropical">The travel journal</p>
            <h2 id="journal-heading" className="display-lg mt-5 text-forest">
              Stories from <em className="text-gold">the island.</em>
            </h2>
          </Reveal>
          <LinkButton href="/journal" variant="outline">
            Read the journal
          </LinkButton>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal>
            <ArticleCard article={lead} size="feature" />
          </Reveal>
          <div className="flex flex-col gap-10">
            {rest.slice(0, 2).map((a, i) => (
              <Reveal key={a.slug} delay={0.1 + i * 0.1}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
