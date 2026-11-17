import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Photo } from '@/components/ui/Photo';
import { Logo } from './Logo';
import { site } from '@/data/site';
import { destinations } from '@/data/destinations';
import { experiences } from '@/data/experiences';

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Interactive island map', href: '/explore' },
      { label: 'All destinations', href: '/destinations' },
      ...destinations
        .filter((d) => ['sigiriya', 'ella', 'galle', 'yala'].includes(d.slug))
        .map((d) => ({ label: d.name.replace(' National Park', ''), href: `/destinations/${d.slug}` })),
    ],
  },
  {
    title: 'Experiences',
    links: [
      ...experiences.slice(0, 5).map((e) => ({ label: e.title, href: `/experiences#${e.slug}` })),
      { label: 'Culture & heritage', href: '/culture' },
    ],
  },
  {
    title: 'Plan',
    links: [
      { label: 'Itineraries', href: '/itineraries' },
      { label: 'Travel journal', href: '/journal' },
      { label: 'Travel information', href: '/travel-info' },
      { label: 'When to go', href: '/travel-info#seasons' },
      { label: 'Photo credits', href: '/credits' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-forest-deep text-ivory">
      <div className="absolute inset-0 -z-10">
        <Photo id="footer-landscape" sizes="100vw" quality={60} className="opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep via-forest-deep/70 to-forest-deep" />
      </div>

      <div className="container-x pt-28 pb-10 md:pt-40">
        <div className="max-w-4xl">
          <p className="eyebrow text-gold">Sri Lanka · Ceylon · Lanka</p>
          <p className="display-lg mt-6 text-ivory">
            An island that stays with you, <em className="text-gold">long after you leave.</em>
          </p>
          <Link
            href="/itineraries"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ivory px-7 py-4 text-xs font-semibold tracking-[0.14em] text-forest uppercase transition-colors duration-500 hover:bg-gold hover:text-ivory"
          >
            Plan your journey
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-24 grid gap-12 border-t border-ivory/15 pt-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-ivory/65">{site.description}</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-ivory/20 px-4 py-2 text-xs text-ivory/80 transition-colors hover:border-gold hover:text-gold"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow text-ivory/45">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline text-[0.9375rem] text-ivory/85 hover:text-ivory">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-ivory/10 pt-8 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Ceylora. {site.tagline}</p>
          <p>
            Photography from Wikimedia Commons contributors —{' '}
            <Link href="/credits" className="underline underline-offset-4 hover:text-ivory">
              full credits
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
