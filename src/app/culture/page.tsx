import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/animations/Reveal';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { ParallaxPhoto } from '@/components/animations/ParallaxPhoto';
import { LinkButton } from '@/components/ui/Button';
import { cultureTopics } from '@/data/culture';
import { getPhoto } from '@/lib/photos';
import { pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const metadata = pageMetadata({
  title: 'Culture & Heritage of Sri Lanka',
  description:
    'Cuisine, festivals, Buddhist heritage, architecture, tea, crafts, communities and the island’s famous hospitality — an introduction to Sri Lankan culture.',
  path: '/culture',
  image: 'culture-fire-dancer',
});

const supporting: Record<string, string> = {
  festivals: 'culture-drummers',
  'buddhist-heritage': 'culture-gangaramaya',
  architecture: 'culture-kandalama',
  'arts-and-crafts': 'culture-mask-carving',
  'local-communities': 'stilt-ahangama',
};

export default function CulturePage() {
  return (
    <>
      <PageHero
        photo={getPhoto('culture-fire-dancer')}
        eyebrow="Culture & heritage"
        title="An island that keeps its traditions close"
        emphasis={[5, 6]}
        intro="Two and a half thousand years of kingdoms, faiths and trade routes have left Sri Lanka with a culture that is layered, generous and very much alive."
        caption="Fire dancer, Kandy Esala Perahera"
      />

      <section className="bg-ivory py-24 md:py-32">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <p className="eyebrow text-tropical">Eight threads</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="display-sm text-forest">
              Sinhala and Tamil, Buddhist, Hindu, Muslim and Christian, with Portuguese, Dutch, Malay and British
              threads woven through — Sri Lanka’s culture is a conversation that has been going on for millennia. Here
              are eight ways to join it.
            </p>
            <ul className="mt-10 flex flex-wrap gap-2">
              {cultureTopics.map((t) => (
                <li key={t.slug}>
                  <a
                    href={`#${t.slug}`}
                    className="inline-flex rounded-full border border-forest/15 px-4 py-2 text-xs font-medium text-forest transition-colors hover:bg-forest hover:text-ivory"
                  >
                    {t.kicker}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {cultureTopics.map((t, i) => {
        const photo = getPhoto(t.image);
        const second = supporting[t.slug];
        const number = String(i + 1).padStart(2, '0');

        if (i === 3) {
          // A full-bleed interlude halfway down the page.
          return (
            <section key={t.slug} id={t.slug} aria-labelledby={`${t.slug}-title`} className="relative scroll-mt-20 bg-forest-deep text-ivory">
              <ParallaxPhoto photo={photo} className="h-[85svh] min-h-[560px]" overlay="bg-gradient-to-r from-forest-deep/90 via-forest-deep/50 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="container-x">
                  <Reveal className="max-w-xl">
                    <p className="eyebrow text-gold">
                      {number} · {t.kicker}
                    </p>
                    <h2 id={`${t.slug}-title`} className="display-lg mt-5">
                      {t.title}
                    </h2>
                    {t.body.map((p) => (
                      <p key={p.slice(0, 20)} className="mt-5 leading-relaxed text-ivory/80">
                        {p}
                      </p>
                    ))}
                  </Reveal>
                </div>
              </div>
            </section>
          );
        }

        const flip = i % 2 === 1;
        return (
          <section
            key={t.slug}
            id={t.slug}
            aria-labelledby={`${t.slug}-title`}
            className={cn('scroll-mt-20 py-24 md:py-36', i % 2 === 0 ? 'bg-ivory' : 'bg-sand/40')}
          >
            <div className="container-x grid items-start gap-14 lg:grid-cols-2 lg:gap-24">
              <div className={cn('relative', second ? 'pb-20' : '', flip && 'lg:order-2')}>
                <ImageReveal photo={photo} className={cn('aspect-[4/5] rounded-2xl', second && 'w-[85%]')} sizes="(min-width: 1024px) 45vw, 90vw" />
                {second && (
                  <ImageReveal
                    photo={getPhoto(second)}
                    className={cn(
                      'absolute bottom-0 aspect-[4/3] w-[48%] rounded-2xl border-[6px] shadow-[0_24px_50px_rgb(15_42_34/0.18)]',
                      i % 2 === 0 ? 'right-0 border-ivory' : 'right-0 border-[#f1ebdf]',
                    )}
                    sizes="25vw"
                    delay={0.25}
                  />
                )}
              </div>
              <Reveal className="lg:pt-10">
                <p className="eyebrow text-tropical">
                  {number} · {t.kicker}
                </p>
                <h2 id={`${t.slug}-title`} className="display-lg mt-5 text-forest">
                  {t.title}
                </h2>
                <div className="prose-ceylora mt-8">
                  {t.body.map((p) => (
                    <p key={p.slice(0, 20)}>{p}</p>
                  ))}
                </div>
                <dl className="mt-10 grid gap-6 border-t border-forest/12 pt-6 sm:grid-cols-2">
                  {t.facts.map((f) => (
                    <div key={f.label}>
                      <dt className="text-[11px] tracking-[0.14em] text-stone uppercase">{f.label}</dt>
                      <dd className="mt-1.5 font-display text-xl text-forest">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="bg-forest py-24 text-center text-ivory md:py-32">
        <div className="container-x">
          <Reveal>
            <p className="font-display text-3xl text-gold italic md:text-4xl">Ayubowan.</p>
            <p className="display-md mx-auto mt-6 max-w-3xl">May you live long — and may you come back.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <LinkButton href="/experiences" variant="light">
                Cultural experiences
              </LinkButton>
              <LinkButton href="/journal/a-guide-to-sri-lankan-food" variant="outline-light">
                Read: a guide to Sri Lankan food
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
