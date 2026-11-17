import { allPhotos } from '@/lib/photos';
import { PhotoImage } from '@/components/ui/PhotoImage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Photo Credits',
  description: 'Every photograph on Ceylora is a real image of Sri Lanka from Wikimedia Commons. Full credits and licences.',
  path: '/credits',
});

export default function CreditsPage() {
  const photos = [...allPhotos].sort((a, b) => a.id.localeCompare(b.id));
  return (
    <>
      <header className="bg-forest pt-36 pb-16 text-ivory md:pt-44">
        <div className="container-x">
          <p className="eyebrow text-gold">Photo credits</p>
          <h1 className="display-lg mt-5 max-w-[18ch]">Real photographs of a real island.</h1>
          <p className="lede mt-6 max-w-2xl text-ivory/75">
            Every image on Ceylora shows the place it describes. All {photos.length} photographs come from Wikimedia
            Commons and are used under their Creative Commons or free licences. Thank you to the photographers below.
          </p>
        </div>
      </header>
      <section className="bg-ivory py-16 md:py-24">
        <ul className="container-x grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <li key={p.id} className="grid grid-cols-[4.5rem_1fr] items-center gap-4 border-b border-forest/10 pb-6">
              <span className="relative block aspect-square overflow-hidden rounded-lg bg-sand">
                <PhotoImage photo={p} sizes="72px" quality={60} blur={false} />
              </span>
              <span className="min-w-0 text-sm">
                <span className="line-clamp-2 text-charcoal/85">{p.alt}</span>
                <a href={p.credit.source} target="_blank" rel="noopener noreferrer" className="mt-1 block truncate text-xs text-tropical hover:underline">
                  {p.credit.author} · {p.credit.license}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
