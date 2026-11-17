import Link from 'next/link';
import { CloudRain, CreditCard, HeartPulse, Languages, Plane, Shirt, Sun, Train } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/animations/Reveal';
import { getPhoto } from '@/lib/photos';
import { pageMetadata } from '@/lib/seo';
import { MONTHS, cn } from '@/lib/utils';

export const metadata = pageMetadata({
  title: 'Travel Information — Seasons, Visas & Getting Around',
  description:
    'Practical information for visiting Sri Lanka: when to go for each coast, the two monsoons, entry requirements, getting around by train and road, money, health and etiquette.',
  path: '/travel-info',
  image: 'train-demodara',
});

/** Which parts of the island are at their best in each month (simplified, general guidance). */
const seasons = [
  { region: 'South & west coast', good: [12, 1, 2, 3, 4], note: 'Dry and calm from December to April; the south-west monsoon arrives in May.' },
  { region: 'East coast', good: [5, 6, 7, 8, 9], note: 'Best from May to September, when the rest of the coast is wetter.' },
  { region: 'Cultural Triangle', good: [2, 3, 4, 6, 7, 8, 9], note: 'Dry most of the year; heaviest rain from October to December.' },
  { region: 'Hill country', good: [1, 2, 3, 4, 8], note: 'Clearest from January to April; cool and misty for much of the year.' },
  { region: 'North (Jaffna)', good: [2, 3, 4, 5, 6, 7, 8, 9], note: 'Hot and dry outside the north-east monsoon (roughly November to January).' },
];

const essentials = [
  {
    icon: Plane,
    title: 'Arriving',
    body: 'Most visitors fly into Bandaranaike International Airport near Negombo, about an hour north of Colombo. Most nationalities need an Electronic Travel Authorisation (ETA) before arrival — apply only through the official government portal and check the current rules before you travel.',
  },
  {
    icon: Train,
    title: 'Getting around',
    body: 'A private car with a local driver is the most flexible way to travel. Trains are slow, cheap and beautiful — reserve seats on the hill-country line well ahead. Tuk-tuks cover short hops; use ride-hailing apps or agree the fare first.',
  },
  {
    icon: CreditCard,
    title: 'Money',
    body: 'The currency is the Sri Lankan rupee (LKR). Cards are accepted in hotels and larger restaurants; carry cash for markets, tuk-tuks and rural areas. ATMs are widespread in towns.',
  },
  {
    icon: Shirt,
    title: 'What to wear',
    body: 'Light, breathable clothes for the lowlands and a warm layer for the hills. At temples, cover shoulders and knees, remove shoes and hats, and choose white or light colours if you can.',
  },
  {
    icon: HeartPulse,
    title: 'Health',
    body: 'Drink bottled or filtered water, use mosquito repellent at dawn and dusk, and respect the sun — the UV is strong even on cloudy days. Take out comprehensive travel insurance and check vaccination advice with your doctor before travelling.',
  },
  {
    icon: Languages,
    title: 'Language & etiquette',
    body: 'Sinhala and Tamil are the national languages and English is widely spoken. Never pose with your back to a Buddha image, ask before photographing people, and use your right hand to give and receive.',
  },
];

export default function TravelInfoPage() {
  return (
    <>
      <PageHero
        photo={getPhoto('train-demodara')}
        eyebrow="Travel information"
        title="Everything you need before you go"
        emphasis={[4, 5]}
        intro="Two monsoons, two coasts and one small island — so there is a good place to be in every month of the year."
        caption="Approaching Demodara station"
      />

      <section id="seasons" aria-labelledby="seasons-heading" className="scroll-mt-20 bg-ivory py-24 md:py-36">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <p className="eyebrow text-tropical">When to go</p>
              <h2 id="seasons-heading" className="display-lg mt-5 text-forest">
                Follow the <em className="text-gold">monsoons.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="space-y-5 text-charcoal/75">
              <p className="lede">
                Sri Lanka has two monsoons that arrive on opposite sides of the island at different times of year. The
                south-west monsoon brings rain to the west and south coasts and the hill country from about May to
                September; the north-east monsoon waters the north and east from roughly November to February.
              </p>
              <p className="flex gap-3 text-sm">
                <CloudRain className="mt-0.5 size-4 shrink-0 text-ocean" />
                Even in the wet season, rain often falls as heavy afternoon showers with sunshine in between.
              </p>
              <p className="flex gap-3 text-sm">
                <Sun className="mt-0.5 size-4 shrink-0 text-gold" />
                Lowland temperatures sit around 27–31°C all year; the hill country is much cooler, especially at night.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-sm">
              <caption className="sr-only">Best months by region</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-56 pb-3 text-left text-[11px] font-semibold tracking-[0.14em] text-stone uppercase">
                    Region
                  </th>
                  {MONTHS.map((m) => (
                    <th key={m} scope="col" className="pb-3 text-center text-[11px] font-semibold text-stone">
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {seasons.map((s) => (
                  <tr key={s.region}>
                    <th scope="row" className="pr-4 text-left align-top font-normal">
                      <span className="block font-display text-xl text-forest">{s.region}</span>
                      <span className="mt-1 block text-xs text-stone">{s.note}</span>
                    </th>
                    {MONTHS.map((m, i) => {
                      const good = s.good.includes(i + 1);
                      return (
                        <td key={m} className="px-0.5 align-middle">
                          <span
                            className={cn('block h-9 rounded-md', good ? 'bg-tropical' : 'bg-forest/8')}
                            aria-label={`${m}: ${good ? 'good time to visit' : 'less ideal'}`}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="essentials-heading" className="bg-sand/40 py-24 md:py-36">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-tropical">Essentials</p>
            <h2 id="essentials-heading" className="display-lg mt-5 text-forest">
              Good to know.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {essentials.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={(i % 3) * 0.06} className="border-t border-forest/15 pt-6">
                <Icon className="size-6 text-gold" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-3xl text-forest">{title}</h3>
                <p className="mt-3 leading-relaxed text-charcoal/75">{body}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-16 max-w-3xl text-sm text-stone">
            Entry rules, fees and health advice change — always confirm with official government sources and your own
            country’s travel advice before you go. Ready to plan?{' '}
            <Link href="/itineraries" className="link-underline text-forest">
              Explore our itineraries
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
