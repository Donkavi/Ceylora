import type { Category, CategoryId, Region, RegionId } from '@/types';

export const categories: Category[] = [
  {
    id: 'beaches',
    label: 'Beaches',
    title: 'Beaches & Coastal Escapes',
    description:
      'Palm-fringed bays on the south coast, surf breaks in the east and reef-sheltered lagoons where the water is calm enough to read by.',
  },
  {
    id: 'mountains',
    label: 'Mountains',
    title: 'Mountains & Highlands',
    description:
      'Tea terraces stitched across the hills, cool mornings above the cloud line and railway journeys that move at the pace of the view.',
  },
  {
    id: 'heritage',
    label: 'Heritage',
    title: 'Ancient Heritage',
    description:
      'Two and a half thousand years of kingdoms — rock fortresses, moonstones, cave temples and stupas taller than cathedrals.',
  },
  {
    id: 'wildlife',
    label: 'Wildlife',
    title: 'Wildlife & Safari',
    description:
      'Leopards on granite outcrops, elephant herds at the water’s edge and blue whales passing within sight of the shore.',
  },
  {
    id: 'nature',
    label: 'Nature',
    title: 'Nature & Waterfalls',
    description:
      'Primary rainforest, high cloud-forest plains and waterfalls that fall in long white ribbons from the edge of the hill country.',
  },
  {
    id: 'adventure',
    label: 'Adventure',
    title: 'Adventure & Experiences',
    description:
      'Dawn hikes, point breaks, dives on coral gardens and the slow thrill of standing in a train doorway as the mountains pass.',
  },
  {
    id: 'culture',
    label: 'Culture',
    title: 'Culture & Traditions',
    description:
      'Temple drummers, colonial ramparts, spice kitchens and the island’s unhurried habit of making every guest feel expected.',
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<CategoryId, Category>;

export const regions: Region[] = [
  {
    id: 'cultural-triangle',
    name: 'Cultural Triangle',
    description: 'The dry-zone heartland of Sri Lanka’s ancient capitals.',
  },
  {
    id: 'hill-country',
    name: 'Hill Country',
    description: 'Cool, green highlands of tea estates, waterfalls and cloud forest.',
  },
  {
    id: 'south-coast',
    name: 'Southern Coast',
    description: 'Golden bays, colonial forts and the island’s whale-watching waters.',
  },
  {
    id: 'east-coast',
    name: 'Eastern Coast',
    description: 'Quiet beaches, coral islands and world-class surf, best from May to September.',
  },
  {
    id: 'wild-interior',
    name: 'Wildlife & Nature',
    description: 'National parks and rainforest reserves where the island is at its wildest.',
  },
];

export const regionMap = Object.fromEntries(regions.map((r) => [r.id, r])) as Record<RegionId, Region>;
