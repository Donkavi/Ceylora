import type { ComponentType } from 'react';
import type { CategoryId } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import {
  DarkSplitSection,
  EditorialSection,
  ListSection,
  MinimalCardsSection,
  MosaicSection,
  RailSection,
  TriptychSection,
  type CategoryItem,
} from '@/components/destinations/CategorySections';
import { categories, regionMap } from '@/data/categories';
import { destinations } from '@/data/destinations';
import { getPhoto } from '@/lib/photos';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Destinations — Where to Go in Sri Lanka',
  description:
    'Discover Sri Lanka’s beaches, highlands, ancient cities, national parks, rainforest and cultural heart — twenty-one destinations with real photography.',
  path: '/destinations',
  image: 'sri-pada-shadow',
});

type Section = ComponentType<{ category: (typeof categories)[number]; index: number; items: CategoryItem[] }>;

const LAYOUTS: Record<CategoryId, Section> = {
  beaches: RailSection,
  mountains: EditorialSection,
  heritage: MosaicSection,
  wildlife: DarkSplitSection,
  nature: MinimalCardsSection,
  adventure: TriptychSection,
  culture: ListSection,
};

export default function DestinationsPage() {
  // Each destination may appear in several collections; give each appearance a different photograph.
  const used = new Set<string>(['sri-pada-shadow']);
  const take = (slug: string, hero: string, gallery: string[]) => {
    const id = [hero, ...gallery].find((p) => !used.has(p)) ?? hero;
    used.add(id);
    return getPhoto(id);
  };

  const sections = categories.map((category) => ({
    category,
    items: destinations
      .filter((d) => d.categories.includes(category.id))
      // Places where this is the defining character come first.
      .sort((a, b) => a.categories.indexOf(category.id) - b.categories.indexOf(category.id))
      .map<CategoryItem>((d) => ({
        slug: d.slug,
        name: d.name,
        region: regionMap[d.region].name,
        tagline: d.tagline,
        summary: d.summary,
        photo: take(d.slug, d.hero, d.gallery),
      })),
  }));

  return (
    <>
      <PageHero
        photo={getPhoto('sri-pada-shadow')}
        eyebrow="Destination discovery"
        title="Where will the island take you?"
        emphasis={[4, 5]}
        intro="Twenty-one places across seven ways of travelling — choose a mood, then follow it from coast to cloud forest."
        caption="Dawn shadow of Adam’s Peak"
      >
        <nav aria-label="Destination categories" className="no-scrollbar -mx-[clamp(1.25rem,4vw,3.5rem)] mt-10 flex gap-2 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)]">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="shrink-0 rounded-full border border-ivory/35 px-4 py-2 text-xs font-semibold tracking-wide text-ivory/90 backdrop-blur-sm transition-colors hover:bg-ivory hover:text-forest"
            >
              {c.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {sections.map(({ category, items }, i) => {
        const Layout = LAYOUTS[category.id];
        return <Layout key={category.id} category={category} index={i} items={items} />;
      })}
    </>
  );
}
