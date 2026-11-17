import Link from 'next/link';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { ParallaxPhoto } from '@/components/animations/ParallaxPhoto';
import { Reveal } from '@/components/animations/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { cultureTopics } from '@/data/culture';
import { getPhoto } from '@/lib/photos';

/** Editorial spread on culture: an overlapping pair of images and a short essay. */
export function CultureFeature() {
  const topics = cultureTopics.slice(0, 6);
  return (
    <section aria-labelledby="culture-heading" className="bg-ivory py-28 md:py-44">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        <div className="relative pb-16 lg:pb-24">
          <ParallaxPhoto
            photo={getPhoto('culture-perahera')}
            className="aspect-[4/5] w-[82%] rounded-2xl"
            sizes="(min-width: 1024px) 40vw, 80vw"
            strength={7}
          />
          <ImageReveal
            photo={getPhoto('culture-stilt-fishermen')}
            className="absolute right-0 bottom-0 aspect-[4/3] w-[52%] rounded-2xl border-[6px] border-ivory shadow-[0_30px_60px_rgb(15_42_34/0.2)]"
            sizes="(min-width: 1024px) 25vw, 50vw"
            delay={0.2}
          />
        </div>

        <div>
          <Reveal>
            <p className="eyebrow text-tropical">Culture &amp; heritage</p>
            <h2 id="culture-heading" className="display-lg mt-5 text-forest">
              A culture that <em className="text-gold">lives forever.</em>
            </h2>
            <p className="lede mt-8 text-charcoal/75">
              Drummers open the temple doors at dawn. Fishermen sit on their stilts at dusk. In between, someone will
              insist you stay for lunch. Sri Lanka’s heritage is not behind glass — it is the rhythm of an ordinary day.
            </p>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 border-t border-forest/10">
            {topics.map((t, i) => (
              <Reveal as="li" key={t.slug} delay={i * 0.05} className="border-b border-forest/10">
                <Link href={`/culture#${t.slug}`} className="group flex items-baseline justify-between gap-3 py-4">
                  <span className="text-[0.9375rem] text-charcoal/85 transition-colors group-hover:text-forest">{t.kicker}</span>
                  <span className="text-xs text-gold transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="mt-10">
            <LinkButton href="/culture">Discover the culture</LinkButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
