export const site = {
  name: 'Ceylora',
  tagline: 'Sri Lanka. A Little Island, A World of Wonders.',
  footerLine: 'An island that stays with you, long after you leave.',
  description:
    'Ceylora is an immersive guide to Sri Lanka — ancient kingdoms, misty tea country, wild national parks and golden coastlines, told through real photography and an interactive island map.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ceylora.travel',
  locale: 'en_GB',
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
    { label: 'Pinterest', href: 'https://pinterest.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
  ],
} as const;

export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/explore' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Culture', href: '/culture' },
  { label: 'Travel Journal', href: '/journal' },
] as const;

export const planCta = { label: 'Plan Your Journey', href: '/itineraries' } as const;
