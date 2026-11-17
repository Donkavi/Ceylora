import { Reveal } from '@/components/animations/Reveal';
import { SplitHeading } from '@/components/animations/SplitHeading';

const facts = [
  { value: '65,610', unit: 'km²', label: 'One island, smaller than Ireland' },
  { value: '1,340', unit: 'km', label: 'Of coastline and coral reef' },
  { value: '8', unit: '', label: 'UNESCO World Heritage Sites' },
  { value: '2,500', unit: 'yrs', label: 'Of recorded history' },
];

/** A quiet editorial pause between the hero and the journey. */
export function IntroStatement() {
  return (
    <section className="bg-ivory py-28 md:py-44">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_2fr]">
          <Reveal>
            <p className="eyebrow text-tropical">The island in a sentence</p>
            <p className="mt-6 max-w-[16rem] text-sm leading-relaxed text-stone">
              Known to ancient sailors as Serendib and Taprobane, and for centuries as Ceylon.
            </p>
          </Reveal>
          <div>
            <SplitHeading
              text="In a single day you can watch the sun rise over tea gardens, stand in a palace built on a rock and fall asleep to the sound of the Indian Ocean."
              className="display-md max-w-[22ch] text-forest"
              stagger={0.025}
              emphasis={[29, 30]}
            />
            <Reveal delay={0.2} className="mt-10 max-w-2xl">
              <p className="lede text-charcoal/75">
                Sri Lanka is small enough to cross in a day and varied enough to fill a lifetime. Ceylora is a guide to
                its places and its people — told through real photographs of the island, an interactive map and the
                stories of those who know it best.
              </p>
            </Reveal>
          </div>
        </div>

        <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-forest/10 pt-12 md:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="font-display text-5xl text-forest md:text-6xl">
                  {f.value}
                  {f.unit && <span className="ml-1 text-2xl text-gold">{f.unit}</span>}
                </span>
                <span className="mt-3 block text-sm text-stone">{f.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
