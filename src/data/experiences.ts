import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    slug: 'scenic-train-journeys',
    title: 'Scenic Train Journeys',
    kicker: 'Kandy to Ella',
    description:
      'Seven slow hours through tea country on a railway built by hand in the 19th century — open doors, cool air and a different valley at every bend.',
    story:
      'The hill-country line climbs from Kandy past waterfalls and tunnels to the high tea estates around Nanu Oya, then drops through cloud forest and over the Nine Arch Bridge into Ella. Locals ride it to work and to market; travellers ride it for the view, leaning out of open doorways as vendors pass through with spiced chickpeas and cups of sweet tea. It is not fast, and that is the point.',
    image: 'exp-train',
    locations: ['Kandy', 'Nanu Oya', 'Haputale', 'Ella'],
    duration: 'Half a day to a full day',
    bestSeason: 'January to April for clear views; beautiful in any month',
    relatedDestinations: ['kandy', 'nuwara-eliya', 'haputale', 'ella'],
  },
  {
    slug: 'wildlife-safaris',
    title: 'Wildlife Safaris',
    kicker: 'Leopards, elephants and sloth bears',
    description:
      'Open-jeep safaris at dawn and dusk in some of the finest wildlife parks in Asia, from Yala’s leopards to the elephant herds of Udawalawe.',
    story:
      'Sri Lanka packs an extraordinary density of wildlife into a small island. In Yala, trackers read pug marks in the sand and listen for the alarm calls of langurs; in Wilpattu you may wait an hour by a silent lake for a leopard to come down to drink. At Udawalawe and Minneriya, the elephants are almost a certainty — hundreds of them, in family groups, with calves pressed close to their mothers’ legs.',
    image: 'exp-safari',
    locations: ['Yala', 'Wilpattu', 'Udawalawe', 'Minneriya'],
    duration: 'Half-day or full-day safaris',
    bestSeason: 'February to July for Yala; July to September for the Minneriya Gathering',
    relatedDestinations: ['yala', 'wilpattu', 'udawalawe', 'polonnaruwa'],
  },
  {
    slug: 'surfing',
    title: 'Surfing',
    kicker: 'Two coasts, two seasons',
    description:
      'Warm water and reliable waves for every level — the south coast from December to April and the legendary points of Arugam Bay from April to October.',
    story:
      'Because the monsoons arrive at different times on different coasts, there is a good wave somewhere in Sri Lanka in almost every month. Beginners learn on the soft beach breaks of Weligama and Hiriketiya; experienced surfers chase the long right-handers of Arugam Bay’s Main Point. Afterwards: a coconut on the sand, a curry, and the sun going down over the line-up.',
    image: 'exp-surf',
    locations: ['Arugam Bay', 'Hiriketiya', 'Weligama', 'Mirissa'],
    duration: 'A morning lesson to a week-long surf camp',
    bestSeason: 'South coast December–April; east coast April–October',
    relatedDestinations: ['arugam-bay', 'hiriketiya', 'mirissa'],
  },
  {
    slug: 'whale-watching',
    title: 'Whale Watching',
    kicker: 'The largest animal on Earth',
    description:
      'Just off the south coast, the continental shelf plunges into deep water where blue whales come to feed — often within a short boat ride of Mirissa.',
    story:
      'Boats leave Mirissa harbour as the sky turns pink. Within an hour the land is a low green line behind you, and the crew are watching for a blow — a column of mist that hangs in the air for a few seconds before drifting away. A blue whale’s back seems to go on forever before the tail finally lifts. Spinner dolphins often join the boats on the way back, hundreds of them, leaping in the bow wave.',
    image: 'exp-whales',
    locations: ['Mirissa', 'Trincomalee', 'Kalpitiya'],
    duration: '4–6 hours at sea',
    bestSeason: 'December to April off Mirissa; March to August off Trincomalee',
    relatedDestinations: ['mirissa', 'trincomalee'],
  },
  {
    slug: 'hiking-and-trekking',
    title: 'Hiking and Trekking',
    kicker: 'Summits, ridges and pilgrim paths',
    description:
      'From the night-time pilgrimage up Adam’s Peak to the knife-edge ridge of Little Adam’s Peak and the cliffs of World’s End, the island is made to be walked.',
    story:
      'The most extraordinary walk in Sri Lanka begins at two in the morning. Pilgrims and travellers climb the 5,500-odd steps of Sri Pada, Adam’s Peak, by the light of lanterns strung along the path, reaching the summit in time to see the sun rise over a sea of cloud — and the mountain’s perfect triangular shadow stretch across the hills to the west. Gentler walks wind through tea estates around Ella and Haputale, and across the open grassland of Horton Plains.',
    image: 'exp-hiking',
    locations: ['Adam’s Peak', 'Ella', 'Horton Plains', 'Knuckles Range'],
    duration: 'One hour to a full night',
    bestSeason: 'December to May (pilgrimage season on Adam’s Peak)',
    relatedDestinations: ['ella', 'horton-plains', 'haputale', 'nuwara-eliya'],
  },
  {
    slug: 'tea-plantation-experiences',
    title: 'Tea Plantation Experiences',
    kicker: 'From leaf to cup',
    description:
      'Walk the terraces with the pluckers, follow the leaf through a working factory and taste high-grown tea where it is made.',
    story:
      'Ceylon tea was first planted commercially at Loolkandura in 1867, after a fungus wiped out the island’s coffee. Today the hills are combed with tea for hundreds of kilometres. Visit a factory in the early morning, when the withering lofts are full of fresh leaf and the rolling machines fill the air with a smell like cut grass and honey. Then stay on an old estate bungalow, with a fire in the evening and the cloud coming up the valley.',
    image: 'exp-tea',
    locations: ['Nuwara Eliya', 'Haputale', 'Ella', 'Kandy'],
    duration: 'Two hours to an overnight stay',
    bestSeason: 'Year-round; January to April is driest',
    relatedDestinations: ['nuwara-eliya', 'haputale', 'ella'],
  },
  {
    slug: 'cultural-experiences',
    title: 'Cultural Experiences',
    kicker: 'Drums, dance and devotion',
    description:
      'Kandyan dancers in silver headdresses, temple drummers at dawn and the full-moon festivals that bring whole towns into the streets.',
    story:
      'Culture in Sri Lanka is not kept behind glass. Each full moon, or Poya, is a public holiday when families dress in white and visit their temples with lotus flowers. In Kandy, drummers open the doors of the Temple of the Tooth three times a day. And on any evening you can watch the Kandyan dance — leaps, spins and the thunder of the geta bera drum — performed by troupes who have trained since childhood.',
    image: 'exp-culture',
    locations: ['Kandy', 'Anuradhapura', 'Galle', 'Colombo'],
    duration: 'An evening to several days',
    bestSeason: 'July–August for the Esala Perahera; Vesak in May',
    relatedDestinations: ['kandy', 'anuradhapura', 'galle', 'dambulla'],
  },
  {
    slug: 'waterfall-adventures',
    title: 'Waterfall Adventures',
    kicker: 'Hundreds of cascades',
    description:
      'Sri Lanka has more than a hundred named waterfalls, many falling straight off the edge of the hill country into the plains below.',
    story:
      'Bambarakanda, the tallest, drops 263 metres in a single silver thread. Diyaluma, close to Haputale, is almost as high — and at its top a chain of natural rock pools makes the finest swimming spot in the hills, right at the lip of the fall. Closer to Ella, Ravana Falls tumbles beside the road in wide white steps, at its loudest after the rains.',
    image: 'exp-waterfalls',
    locations: ['Bambarakanda', 'Diyaluma', 'Ravana Falls', 'Horton Plains'],
    duration: 'A short stop to a half-day hike',
    bestSeason: 'Fullest after the rains, from November to January; safest for swimming from February to April',
    relatedDestinations: ['haputale', 'ella', 'horton-plains'],
  },
  {
    slug: 'food-experiences',
    title: 'Food Experiences',
    kicker: 'Rice, curry and coconut',
    description:
      'Cook with a family in their kitchen, eat crab curry by the sea in Galle, and learn why rice and curry is never just one curry.',
    story:
      'A Sri Lankan rice and curry is a table of small dishes: a dhal, a fish or meat curry, two or three vegetables, a sharp sambol of coconut and chilli, and crisp papadums. Every region and every household has its own version. In the north, Jaffna’s cooking is fiery with roasted spices; on the coast, curries are built around the morning’s catch. Take a cookery class, visit a spice garden near Matale, and leave room for kottu, string hoppers and wood-apple juice.',
    image: 'exp-food',
    locations: ['Galle', 'Kandy', 'Jaffna', 'Colombo'],
    duration: 'A meal to a half-day class',
    bestSeason: 'Year-round',
    relatedDestinations: ['galle', 'kandy', 'unawatuna'],
  },
  {
    slug: 'diving-and-snorkelling',
    title: 'Diving and Snorkelling',
    kicker: 'Reefs and wrecks',
    description:
      'Coral gardens and reef sharks at Pigeon Island, turtles off the south coast and centuries of shipwrecks resting on the sea floor.',
    story:
      'The waters around Sri Lanka hide some of the oldest wrecks in the Indian Ocean, from Dutch merchant ships off Galle to the Second World War aircraft carrier HMS Hermes off Batticaloa. For snorkellers, Pigeon Island National Park off Nilaveli is the highlight: shallow coral gardens full of parrotfish, turtles and harmless blacktip reef sharks. On the south coast, Unawatuna and Hikkaduwa have easy reef snorkelling from the beach.',
    image: 'exp-diving',
    locations: ['Pigeon Island', 'Unawatuna', 'Hikkaduwa', 'Trincomalee'],
    duration: 'A morning snorkel to a multi-day dive trip',
    bestSeason: 'South and west December–April; east coast May–September',
    relatedDestinations: ['trincomalee', 'unawatuna', 'pasikudah'],
  },
];

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}
