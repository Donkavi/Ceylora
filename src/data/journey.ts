import type { LatLng } from '@/types';

export interface JourneyChapter {
  id: string;
  number: string;
  label: string;
  place: string;
  coordinates: LatLng;
  heading: string;
  description: string;
  image: string;
  href: string;
}

/** The homepage scroll journey: five chapters across the island. */
export const journey: JourneyChapter[] = [
  {
    id: 'ancient',
    number: '01',
    label: 'The Ancient Kingdom',
    place: 'Sigiriya',
    coordinates: [7.957, 80.7603],
    heading: 'Whispers of an Ancient Kingdom',
    description:
      'Step into a world where history rises above the jungle. Discover the ancient wonders and extraordinary heritage of Sri Lanka.',
    image: 'journey-ancient',
    href: '/destinations/sigiriya',
  },
  {
    id: 'highlands',
    number: '02',
    label: 'The Misty Highlands',
    place: 'Ella',
    coordinates: [6.8667, 81.0466],
    heading: 'Into the Heart of the Highlands',
    description:
      'Journey through emerald tea plantations, mist-covered mountains, and breathtaking landscapes.',
    image: 'journey-highlands',
    href: '/destinations/ella',
  },
  {
    id: 'coast',
    number: '03',
    label: 'The Endless Coastline',
    place: 'Mirissa',
    coordinates: [5.9483, 80.4716],
    heading: 'Where the Ocean Meets Paradise',
    description:
      'Discover golden beaches, turquoise waters, coastal villages, and unforgettable sunsets.',
    image: 'journey-coast',
    href: '/destinations/mirissa',
  },
  {
    id: 'wild',
    number: '04',
    label: 'The Wild Side',
    place: 'Yala National Park',
    coordinates: [6.3725, 81.5169],
    heading: 'A Land Alive with Wildlife',
    description:
      'Explore incredible natural habitats and experience the remarkable wildlife of the island.',
    image: 'journey-wild',
    href: '/destinations/yala',
  },
  {
    id: 'culture',
    number: '05',
    label: 'A Journey Through Culture',
    place: 'Kandy',
    coordinates: [7.2906, 80.6337],
    heading: 'A Culture That Lives Forever',
    description:
      'Discover vibrant traditions, remarkable architecture, authentic food, and the warmth of Sri Lankan hospitality.',
    image: 'journey-culture',
    href: '/destinations/kandy',
  },
];
