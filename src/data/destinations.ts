import type { Destination } from '@/types';
import { galleryFor } from '@/lib/photos';

type DestinationInput = Omit<Destination, 'hero' | 'gallery'>;

/** Hero is always `<slug>-hero`; the gallery is every other photo registered under the slug. */
const withPhotos = (d: DestinationInput): Destination => ({
  ...d,
  hero: `${d.slug}-hero`,
  gallery: galleryFor(d.slug),
});

const DRY_ZONE = {
  best: [2, 3, 4, 6, 7, 8],
  shoulder: [1, 5, 9],
};

const SOUTH_COAST = {
  best: [12, 1, 2, 3, 4],
  shoulder: [11],
};

const EAST_COAST = {
  best: [5, 6, 7, 8, 9],
  shoulder: [4, 10],
};

const raw: DestinationInput[] = [
  // ───────────────────────────── Cultural Triangle ─────────────────────────────
  {
    slug: 'sigiriya',
    name: 'Sigiriya',
    region: 'cultural-triangle',
    province: 'Central Province',
    coordinates: [7.957, 80.7603],
    elevation: '349 m at the summit',
    categories: ['heritage', 'adventure', 'culture'],
    tagline: 'A palace in the sky, built by a king who feared the ground.',
    summary:
      'A 200-metre column of rock rising from the forest, crowned with the ruins of a fifth-century palace and guarded by a pair of colossal stone paws.',
    intro: [
      'In the late fifth century, King Kashyapa moved his capital to the top of a granite monolith that rises sheer out of the dry-zone jungle. He ringed it with moats and pleasure gardens, painted its western face with women carrying flowers, and built a gateway in the form of an enormous crouching lion. Within two decades he was gone, and the rock reverted to a monastery and then to the forest.',
      'What remains is one of the great sites of Asia. The climb takes you past fountains that still work after the rains, along a gallery wall polished so finely that pilgrims wrote poems on it a thousand years ago, and up between the lion’s paws to a summit of terraces and cisterns with the whole of the central plains laid out below.',
      'Go at first light, when the stone is cool and the mist is still lying in the forest — or climb neighbouring Pidurangala for the view of Sigiriya itself, glowing against the sunrise.',
    ],
    attractions: [
      {
        name: 'The Lion Staircase',
        kind: 'Ancient site',
        description:
          'Two giant carved paws are all that survive of the lion gateway, but they are enough to make you stop before the final iron stairway to the summit.',
      },
      {
        name: 'Sigiriya Frescoes & Mirror Wall',
        kind: 'Art',
        description:
          'A sheltered pocket of fifth-century paintings, and below them a glazed wall covered in verses scratched by visitors between the 8th and 10th centuries.',
      },
      {
        name: 'Royal Water Gardens',
        kind: 'Landscape',
        description:
          'Symmetrical pools, causeways and underground conduits — among the oldest landscaped gardens in the world — laid out along the approach to the rock.',
      },
      {
        name: 'Pidurangala Rock',
        kind: 'Viewpoint',
        description:
          'A shorter scramble past a reclining Buddha to a boulder-top summit with the definitive view of Sigiriya at sunrise.',
      },
    ],
    season: {
      ...DRY_ZONE,
      summary:
        'Climbable year-round. February to April is green and clear; June to August is drier and hotter. Heavy showers are most likely from October to December.',
    },
    travel: {
      fromColombo: { distanceKm: 170, duration: '4 hrs by road' },
      recommendedStay: '2 nights',
      gettingThere: [
        'Private driver from Colombo or Kandy (2.5 hrs from Kandy).',
        'Buses run via Dambulla, then a short tuk-tuk ride.',
      ],
      tips: [
        'Tickets open at 7 am — be at the gate early to climb before the heat and the tour buses.',
        'Carry water and a hat; there is little shade above the frescoes.',
        'Keep voices low near the hornet nests flagged on the upper stairway.',
      ],
    },
  },
  {
    slug: 'dambulla',
    name: 'Dambulla',
    region: 'cultural-triangle',
    province: 'Central Province',
    coordinates: [7.8567, 80.6492],
    categories: ['heritage', 'culture'],
    tagline: 'Five caves, a hundred and fifty Buddhas and a ceiling of painted stories.',
    summary:
      'A cave monastery used for more than two thousand years, its five sanctuaries crowded with gilded statues and covered in vivid murals.',
    intro: [
      'Halfway up a vast dark outcrop above the town, a white colonnade has been built into the overhang of the rock. Step through it and you are inside the Royal Cave Temple — five caves that monks have occupied since the first century BCE, when King Valagamba is said to have sheltered here in exile and later rebuilt the caves in gratitude.',
      'Inside, the rock ceiling flows overhead like a painted tent: rows of seated Buddhas, lotus patterns and scenes from the life of the Buddha cover over two thousand square metres of stone. A fourteen-metre reclining Buddha fills the first cave; in another, water drips from a crack in the roof into a vessel and is never known to run dry.',
      'Dambulla also sits at the crossroads of the island, a natural pause between Sigiriya, Kandy and the ancient capitals to the north.',
    ],
    attractions: [
      {
        name: 'Royal Cave Temple',
        kind: 'UNESCO site',
        description:
          'Five caves holding 153 Buddha images and some of the finest surviving temple murals in Sri Lanka. Shoes come off at the gate; shoulders and knees must be covered.',
      },
      {
        name: 'The Climb at Dusk',
        kind: 'Viewpoint',
        description:
          'The rock terrace in front of the caves looks west towards Sigiriya — at sunset its silhouette sits on the horizon.',
      },
      {
        name: 'Ibbankatuwa Megalithic Tombs',
        kind: 'Archaeology',
        description:
          'An Iron Age burial ground just south of town where stone cists date back some 2,700 years.',
      },
      {
        name: 'Nalanda Gedige',
        kind: 'Ancient site',
        description:
          'A small stone shrine beside a reservoir, built in a blend of Hindu and Buddhist styles found nowhere else on the island.',
      },
    ],
    season: {
      ...DRY_ZONE,
      summary:
        'The caves are cool whatever the weather. Visit in the late afternoon for softer light on the rock and fewer visitors.',
    },
    travel: {
      fromColombo: { distanceKm: 150, duration: '3.5 hrs by road' },
      recommendedStay: 'Half a day (stay in Sigiriya)',
      gettingThere: [
        'On the main A9 between Kandy and Anuradhapura, 20 minutes from Sigiriya.',
        'Frequent buses from Colombo, Kandy and Kurunegala.',
      ],
      tips: [
        'Tickets are sold at the bottom of the hill, not at the caves.',
        'Wear socks — the rock terrace becomes very hot by midday.',
      ],
    },
  },
  {
    slug: 'anuradhapura',
    name: 'Anuradhapura',
    region: 'cultural-triangle',
    province: 'North Central Province',
    coordinates: [8.3114, 80.4037],
    categories: ['heritage', 'culture'],
    tagline: 'A sacred city that was a capital for fourteen hundred years.',
    summary:
      'The first great capital of Sri Lanka — a landscape of immense white and brick stupas, ancient reservoirs and the oldest documented tree planted by human hands.',
    intro: [
      'For more than a thousand years, Anuradhapura was one of the great cities of the ancient world. Its kings built reservoirs the size of lakes and stupas that rose higher than anything outside Egypt — and Buddhist pilgrims still come by the thousand, dressed in white, carrying lotus flowers to the shrines.',
      'The ruins are spread across a wide, wooded park, best explored by bicycle. Ruwanwelisaya gleams like a pearl above a wall of stone elephants; Jetavanaramaya, once 122 metres tall, is built of an estimated ninety million bricks. Between them lie bathing ponds, moonstones, monastery foundations and quiet groves where monkeys outnumber visitors.',
      'At the centre of it all is the Sri Maha Bodhi, grown from a cutting of the tree beneath which the Buddha attained enlightenment. It was planted in 288 BCE and has been tended ever since.',
    ],
    attractions: [
      {
        name: 'Sri Maha Bodhi',
        kind: 'Sacred site',
        description:
          'The sacred fig planted in 288 BCE, surrounded by golden railings, prayer flags and the soft chanting of pilgrims.',
      },
      {
        name: 'Ruwanwelisaya',
        kind: 'Stupa',
        description:
          'A brilliant white dome raised by King Dutugemunu in the second century BCE and ringed by a wall of 344 carved elephants.',
      },
      {
        name: 'Jetavanaramaya',
        kind: 'Stupa',
        description:
          'A vast brick stupa that was the third-tallest structure in the ancient world, surpassed only by the two great pyramids of Giza.',
      },
      {
        name: 'Mihintale',
        kind: 'Pilgrimage',
        description:
          'The hill 12 km east where Buddhism was introduced to the island in 247 BCE; climb its 1,840 steps for a sunset over the plains.',
      },
    ],
    season: {
      ...DRY_ZONE,
      summary:
        'Hot and dry from June to September. June’s Poson full moon brings pilgrims and lantern-lit nights to Mihintale. Avoid the midday heat on a bicycle.',
    },
    travel: {
      fromColombo: { distanceKm: 205, duration: '4.5–5 hrs by road' },
      recommendedStay: '1–2 nights',
      gettingThere: [
        'Intercity trains from Colombo Fort take about 4.5 hours.',
        'By road from Sigiriya in roughly 2 hours.',
      ],
      tips: [
        'Rent a bicycle — the sacred city covers more than 40 square kilometres.',
        'White clothing is respectful at the Sri Maha Bodhi and stupas.',
        'Sand at the stupas burns at noon; plan temple visits for early morning.',
      ],
    },
  },
  {
    slug: 'polonnaruwa',
    name: 'Polonnaruwa',
    region: 'cultural-triangle',
    province: 'North Central Province',
    coordinates: [7.9403, 81.0188],
    categories: ['heritage', 'culture'],
    tagline: 'A medieval capital carved in granite, beside an inland sea.',
    summary:
      'The island’s second ancient capital, compact and remarkably preserved, with the four great rock-cut Buddhas of Gal Vihara at its heart.',
    intro: [
      'When Anuradhapura fell in the late tenth century, the kings of Sri Lanka moved their court south-east to Polonnaruwa. Under Parakramabahu I in the twelfth century it became a city of palaces, monasteries and audience halls, watered by a reservoir so vast that it was named the Sea of Parakrama.',
      'Polonnaruwa is smaller and more legible than Anuradhapura: the ruins lie along a single shaded road, and an afternoon by bicycle takes you from the royal palace to the Sacred Quadrangle, where the circular Vatadage still shelters its four seated Buddhas behind carved guardstones and moonstones.',
      'Leave Gal Vihara for the end of the day. Four images carved from a single granite face — seated, standing and reclining — are among the finest sculpture in Asia, and in the low evening light the stone seems almost to breathe.',
    ],
    attractions: [
      {
        name: 'Gal Vihara',
        kind: 'Sculpture',
        description:
          'Four Buddha figures cut from one granite outcrop in the 12th century, including a reclining Buddha fourteen metres long.',
      },
      {
        name: 'The Sacred Quadrangle',
        kind: 'Ancient site',
        description:
          'A walled terrace of relic houses, image halls and the Vatadage, whose moonstone stairways are among the most beautiful on the island.',
      },
      {
        name: 'Parakrama Samudra',
        kind: 'Landscape',
        description:
          'The great twelfth-century reservoir — walk its embankment at sunset as fishermen cast nets and egrets settle.',
      },
      {
        name: 'Minneriya National Park',
        kind: 'Wildlife',
        description:
          'Thirty minutes away, where from July to September hundreds of elephants gather on the shrinking reservoir shores.',
      },
    ],
    season: {
      ...DRY_ZONE,
      summary:
        'Best from February to September. Time a visit for August and you can pair the ruins with the elephant Gathering at Minneriya.',
    },
    travel: {
      fromColombo: { distanceKm: 215, duration: '5 hrs by road' },
      recommendedStay: '1 night, or a day trip from Sigiriya',
      gettingThere: [
        'One hour by road from Sigiriya or Dambulla.',
        'Trains from Colombo to Polonnaruwa take around 6 hours.',
      ],
      tips: [
        'Bicycles can be hired opposite the museum, where tickets are also sold.',
        'Start at the museum: its scale model makes sense of the ruins.',
      ],
    },
  },

  // ───────────────────────────── Hill Country ─────────────────────────────
  {
    slug: 'ella',
    name: 'Ella',
    region: 'hill-country',
    province: 'Uva Province',
    coordinates: [6.8667, 81.0466],
    elevation: '1,041 m',
    categories: ['mountains', 'adventure', 'nature'],
    tagline: 'A village at the edge of the mountains, where the clouds come to rest.',
    summary:
      'A small hill town in a gap between the mountains — tea slopes, easy summits, waterfalls and the most famous stretch of railway in the country.',
    intro: [
      'Ella sits at the point where the hill country falls away towards the southern plains. From the village, a notch in the ridge — the Ella Gap — frames a view that runs, on a clear day, all the way to the coast. Mornings start cool and blue; by afternoon cloud slides up the valleys and settles in the tea.',
      'It is a place to walk. Little Adam’s Peak is an easy hour through tea gardens to a grassy ridge; Ella Rock is longer and wilder, following the railway line before climbing through eucalyptus to a sheer drop. In between, there is the Nine Arch Bridge, a viaduct of brick and stone curving through the jungle, where the blue train appears a few times a day to a small round of applause.',
      'Ella has grown quickly, and its main street is now lined with cafés — but walk ten minutes in any direction and you are back among the tea bushes and the birdsong.',
    ],
    attractions: [
      {
        name: 'Nine Arch Bridge',
        kind: 'Landmark',
        description:
          'A colonial-era viaduct completed in 1921 near Demodara, built of stone, brick and cement without steel. Ask locally for the train times.',
      },
      {
        name: 'Little Adam’s Peak',
        kind: 'Hike',
        description:
          'A gentle 45-minute walk through a tea estate to a ridge with sweeping views across the Ella Gap. Perfect at sunrise.',
      },
      {
        name: 'Ella Rock',
        kind: 'Hike',
        description:
          'A half-day trek along the railway and up through forest to a cliff-top viewpoint. Go with a local guide or a good offline map.',
      },
      {
        name: 'Ravana Falls',
        kind: 'Waterfall',
        description:
          'A wide, tiered waterfall beside the road to Wellawaya, at its fullest after the rains and linked to the legend of the Ramayana.',
      },
    ],
    season: {
      best: [1, 2, 3, 4, 8],
      shoulder: [5, 6, 7, 9, 12],
      summary:
        'January to April brings clear mornings and the best views. Ella lies on the drier eastern side of the hills, so it is pleasant through mid-year too; October and November are the wettest.',
    },
    travel: {
      fromColombo: { distanceKm: 200, duration: '5.5 hrs by road' },
      recommendedStay: '2–3 nights',
      gettingThere: [
        'The train from Kandy (about 7 hours) or Nuwara Eliya’s Nanu Oya station (about 3 hours) is the classic approach.',
        'By road to the south coast or Yala in around 3 hours.',
      ],
      tips: [
        'Reserved seats on the hill-country train sell out weeks ahead — book as soon as you know your dates.',
        'Walk Little Adam’s Peak at dawn, before the day-trippers arrive.',
        'Nights are cool: pack a light jumper.',
      ],
    },
  },
  {
    slug: 'nuwara-eliya',
    name: 'Nuwara Eliya',
    region: 'hill-country',
    province: 'Central Province',
    coordinates: [6.9497, 80.7891],
    elevation: '1,868 m',
    categories: ['mountains', 'nature', 'culture'],
    tagline: 'Tea country’s high town, wrapped in mist and roses.',
    summary:
      'The highest town in Sri Lanka, ringed by tea estates, with colonial bungalows, a lake, flower gardens and a climate that feels like a British spring.',
    intro: [
      'The British arrived in these hills in the 1820s looking for a cool retreat, and built themselves a little piece of home: a racecourse, a golf course, mock-Tudor villas, a red-brick post office and gardens full of roses and foxgloves. They called it “Little England”, and the name has stuck, even as the town around it has grown into a lively Sri Lankan market centre.',
      'The real draw is the landscape. Nuwara Eliya sits in a high bowl beneath Pidurutalagala, the island’s highest mountain, and every slope around it is combed with tea. Estates like Pedro open their factories to visitors, and you can walk out among the pluckers as they work along the rows, or drink a cup of high-grown tea while the mist moves through the valley.',
      'Bring layers — mornings here can be close to freezing in January — and time your visit for April if you want to see the town at its liveliest, when Sri Lankan families arrive for the New Year season.',
    ],
    attractions: [
      {
        name: 'Pedro Tea Estate',
        kind: 'Tea',
        description:
          'A working estate on the edge of town where you can follow the leaf from the withering lofts to the cup.',
      },
      {
        name: 'Gregory Lake',
        kind: 'Landscape',
        description:
          'A lake laid out in 1873, with a lakeside path, pedal boats and mist rising off the water in the early morning.',
      },
      {
        name: 'Hakgala Botanical Garden',
        kind: 'Gardens',
        description:
          'Terraced gardens established in 1861 beneath a dramatic rock face, famous for roses, ferns and cool-climate trees.',
      },
      {
        name: 'Lover’s Leap Waterfall',
        kind: 'Waterfall',
        description:
          'A short walk through tea bushes to a slender fall tumbling off a rock face above town.',
      },
    ],
    season: {
      best: [1, 2, 3, 4],
      shoulder: [5, 8, 12],
      summary:
        'January to April is the dry season, with crisp mornings and blue skies. The south-west monsoon brings mist and rain from May to September.',
    },
    travel: {
      fromColombo: { distanceKm: 165, duration: '4.5–5 hrs by road' },
      recommendedStay: '1–2 nights',
      gettingThere: [
        'Take the hill-country train to Nanu Oya station, 8 km from town.',
        'By road from Kandy in about 3 hours through tea country.',
      ],
      tips: [
        'Bring warm layers — temperatures can drop below 10°C at night.',
        'Combine with Horton Plains, a one-hour drive for a dawn start.',
      ],
    },
  },
  {
    slug: 'haputale',
    name: 'Haputale',
    region: 'hill-country',
    province: 'Uva Province',
    coordinates: [6.7656, 80.951],
    elevation: '1,431 m',
    categories: ['mountains', 'nature'],
    tagline: 'A ridge-top town where the world drops away on both sides.',
    summary:
      'A quiet hill town strung along a knife-edge ridge, with Sir Thomas Lipton’s favourite viewpoint and some of the most spectacular tea country on the island.',
    intro: [
      'Haputale is built along a narrow saddle at the southern edge of the hill country. On one side the land falls away to the plains and, on a clear morning, the glint of the sea; on the other, ridge upon ridge of tea rolls north into the mountains. The railway runs along the spine of the town, and the station has one of the finest views of any in Sri Lanka.',
      'This was Thomas Lipton’s country. The tea magnate bought the Dambatenne estate in 1890 and used to climb to a rocky outcrop above it to look out over his plantations. Lipton’s Seat is still the reason most people come: a dawn drive up a single-track road through the tea, with pickers walking the same road to work.',
      'Haputale is less polished than Ella and all the better for it — a working tea town where the guesthouses are small, the walks are long and the views are enormous.',
    ],
    attractions: [
      {
        name: 'Lipton’s Seat',
        kind: 'Viewpoint',
        description:
          'At around 1,970 metres, one of the great views of the island: seven provinces at sunrise. Arrive before 7 am, before the cloud lifts.',
      },
      {
        name: 'Dambatenne Tea Factory',
        kind: 'Tea',
        description:
          'Built by Lipton in 1890 and still processing leaf; tours walk you through the rolling and drying rooms.',
      },
      {
        name: 'Adisham Bungalow',
        kind: 'Heritage',
        description:
          'A Tudor-style country house from 1931, now a Benedictine monastery with gardens and home-made jams.',
      },
      {
        name: 'Diyaluma Falls',
        kind: 'Waterfall',
        description:
          'The second-highest waterfall in Sri Lanka, falling 220 metres; scramble to the natural pools at the top for a swim.',
      },
    ],
    season: {
      best: [1, 2, 3, 4],
      shoulder: [5, 8, 9, 12],
      summary:
        'Clearest from January to April. Like Ella, Haputale sits on the drier eastern slopes and stays largely pleasant through the middle of the year.',
    },
    travel: {
      fromColombo: { distanceKm: 190, duration: '5.5 hrs by road' },
      recommendedStay: '1–2 nights',
      gettingThere: [
        'On the main railway line, about an hour from Ella and two from Nanu Oya.',
        'Tuk-tuks run to Lipton’s Seat; or walk back down through the estate.',
      ],
      tips: [
        'Go to Lipton’s Seat early — by 9 am the view is usually lost in cloud.',
        'Adisham is open to visitors on weekends and holidays only.',
      ],
    },
  },
  {
    slug: 'horton-plains',
    name: 'Horton Plains',
    region: 'hill-country',
    province: 'Central Province',
    coordinates: [6.802, 80.807],
    elevation: '2,100–2,300 m',
    categories: ['nature', 'mountains', 'wildlife', 'adventure'],
    tagline: 'A windswept plateau at the top of the island, ending in a sheer drop.',
    summary:
      'High grassland and cloud forest on the roof of Sri Lanka, with a dawn walk to World’s End — a cliff that falls 870 metres to the lowlands below.',
    intro: [
      'Horton Plains feels like nowhere else in Sri Lanka. At over two thousand metres, the plateau is a rolling expanse of tussock grass and stunted, lichen-hung forest, crossed by cold streams and grazed by sambar deer. Frost is not unusual at dawn. It is the source of three of the island’s major rivers, and part of a UNESCO World Heritage site.',
      'The classic walk is a nine-kilometre loop that reaches World’s End, where the southern edge of the plateau ends abruptly in a cliff of almost nine hundred metres. On a clear morning you can see across tea estates and lowland forest to the sea. By mid-morning, cloud usually rises up the face and fills the view with white — which is why everyone is on the trail by 6.30.',
      'The loop continues past Baker’s Falls, named for the explorer Samuel Baker, and back across the open grassland. Keep an eye out for the purple-faced langur and the Sri Lanka whistling thrush.',
    ],
    attractions: [
      {
        name: 'World’s End',
        kind: 'Viewpoint',
        description:
          'A precipice dropping about 870 metres, with views to the coast before the mist arrives. There is no railing — take care.',
      },
      {
        name: 'Baker’s Falls',
        kind: 'Waterfall',
        description:
          'A broad, peaty cascade in a mossy gorge, reached by a short detour on the main loop.',
      },
      {
        name: 'Mini World’s End',
        kind: 'Viewpoint',
        description:
          'A smaller precipice a few hundred metres before the main event, overlooking a forested valley and tea estates.',
      },
      {
        name: 'Cloud forest & wildlife',
        kind: 'Nature',
        description:
          'Sambar deer, endemic birds and rhododendron trees — the plateau has its own climate and its own creatures.',
      },
    ],
    season: {
      best: [1, 2, 3, 4],
      shoulder: [5, 8, 12],
      summary:
        'January to March gives the best chance of a cloud-free view at World’s End. Whatever the month, start at dawn.',
    },
    travel: {
      fromColombo: { distanceKm: 180, duration: '5.5 hrs by road' },
      recommendedStay: 'A dawn visit from Nuwara Eliya or Haputale',
      gettingThere: [
        'One hour by road from Nuwara Eliya or Haputale; drivers leave around 5 am.',
        'Ohiya station on the hill-country railway is 11 km from the park entrance.',
      ],
      tips: [
        'Plastic is banned in the park — bags are checked at the gate.',
        'Bring a warm jacket and rain shell; it can be near 5°C at dawn.',
        'Walk the loop clockwise to reach World’s End before the clouds.',
      ],
    },
  },
  {
    slug: 'kandy',
    name: 'Kandy',
    region: 'hill-country',
    province: 'Central Province',
    coordinates: [7.2906, 80.6337],
    elevation: '500 m',
    categories: ['culture', 'heritage', 'nature'],
    tagline: 'The last royal capital, gathered around a lake and a sacred tooth.',
    summary:
      'Sri Lanka’s cultural capital — a lakeside city in a ring of forested hills, home to the Temple of the Sacred Tooth Relic and the island’s grandest festival.',
    intro: [
      'Kandy was the seat of the last Sinhalese kings, and it held out against the Portuguese and the Dutch for nearly three centuries before falling to the British in 1815. The city still feels like a capital of something older: drummers sound the hours at the Temple of the Tooth, monks cross the bridge by the lake, and the hills around are thick with forest.',
      'The Temple of the Sacred Tooth Relic, Sri Dalada Maligawa, holds Sri Lanka’s most revered Buddhist relic. Visit for the evening puja, when the doors of the inner shrine are opened to the beat of drums and the smell of jasmine and frangipani fills the halls.',
      'In July or August, during the Esala Perahera, the city is transformed. For ten nights, processions of dancers, fire-twirlers, whip-crackers and more than a hundred caparisoned elephants move through the streets, led by the casket of the relic itself.',
    ],
    attractions: [
      {
        name: 'Temple of the Sacred Tooth Relic',
        kind: 'Sacred site',
        description:
          'The golden-roofed temple that guards the Buddha’s tooth. Come for the evening drumming and offerings.',
      },
      {
        name: 'Kandy Lake',
        kind: 'Landscape',
        description:
          'An artificial lake built in 1807 by the last king of Kandy; walk its three-kilometre shore at dusk.',
      },
      {
        name: 'Royal Botanical Gardens, Peradeniya',
        kind: 'Gardens',
        description:
          'Sixty hectares of orchids, giant bamboo, a palm avenue and a vast Javan fig tree — begun as a royal pleasure garden.',
      },
      {
        name: 'Kandyan Dance',
        kind: 'Performance',
        description:
          'Nightly performances of the island’s classical dance, with drumming and the famous fire-walking finale.',
      },
    ],
    season: {
      best: [1, 2, 3, 4, 7, 8],
      shoulder: [5, 6, 9, 12],
      summary:
        'January to April is dry and pleasant. July or August brings the Esala Perahera — book well ahead. October and November are the wettest months.',
    },
    travel: {
      fromColombo: { distanceKm: 115, duration: '3–3.5 hrs by road' },
      recommendedStay: '2 nights',
      gettingThere: [
        'The train from Colombo Fort takes around 2.5–3 hours through rice paddies and rubber estates.',
        'The hill-country railway to Ella starts here.',
      ],
      tips: [
        'Dress in white or light colours with shoulders and knees covered for the Temple of the Tooth.',
        'Perahera seats are sold in advance by hotels and local agents — expect high prices.',
      ],
    },
  },

  // ───────────────────────────── Southern Coast ─────────────────────────────
  {
    slug: 'mirissa',
    name: 'Mirissa',
    region: 'south-coast',
    province: 'Southern Province',
    coordinates: [5.9483, 80.4716],
    categories: ['beaches', 'wildlife', 'adventure'],
    tagline: 'A crescent of sand, a hill of palms and whales on the horizon.',
    summary:
      'A curving beach on the south coast with gentle waves, sunset cafés and some of the best blue whale watching in the world just offshore.',
    intro: [
      'Mirissa is a small fishing town wrapped around a perfect half-moon of golden sand. Palms lean over the water, the waves are soft enough for beginners on boards, and at its eastern end a little hump of rock — Parrot Rock — can be reached on foot at low tide for the sunset.',
      'Most people come for the whales. The continental shelf drops away steeply only a few kilometres off the south coast, and blue whales — the largest animals that have ever lived — feed here in numbers between December and April. Boats leave the harbour at dawn; on good days you will see spouts, flukes and pods of spinner dolphins racing the bow.',
      'In the afternoon, walk to Coconut Tree Hill, a grassy headland covered in palms that has become one of the most photographed places on the coast, or find your way to Secret Beach, a tiny cove reached down a jungle path.',
    ],
    attractions: [
      {
        name: 'Blue whale watching',
        kind: 'Wildlife',
        description:
          'Morning boat trips from Mirissa harbour from December to April, with blue whales, sperm whales and spinner dolphins.',
      },
      {
        name: 'Coconut Tree Hill',
        kind: 'Viewpoint',
        description:
          'A red-earth headland covered in tall palms, looking straight out over the Indian Ocean. Best in early morning light.',
      },
      {
        name: 'Parrot Rock',
        kind: 'Viewpoint',
        description:
          'A rocky islet at the end of the beach, reachable at low tide, with a view back along the whole bay.',
      },
      {
        name: 'Secret Beach',
        kind: 'Beach',
        description:
          'A sheltered rock pool and cove on the far side of the headland, quieter than the main beach.',
      },
    ],
    season: {
      ...SOUTH_COAST,
      summary:
        'December to April brings calm seas, sunshine and the whale season. From May to October the south-west monsoon makes the sea rough and some cafés close.',
    },
    travel: {
      fromColombo: { distanceKm: 150, duration: '2.5–3 hrs via the Southern Expressway' },
      recommendedStay: '2–3 nights',
      gettingThere: [
        'The coastal railway to Weligama or Matara, then a short tuk-tuk.',
        'Galle is 45 minutes west by road; Tangalle is an hour east.',
      ],
      tips: [
        'Choose a whale-watching operator that follows responsible distance guidelines.',
        'Take seasickness tablets before the boat leaves — the swell can be strong.',
        'Swim at the western end of the beach where the waves are gentlest.',
      ],
    },
  },
  {
    slug: 'unawatuna',
    name: 'Unawatuna',
    region: 'south-coast',
    province: 'Southern Province',
    coordinates: [6.0094, 80.2496],
    categories: ['beaches', 'adventure'],
    tagline: 'A sheltered bay of calm turquoise water, a tuk-tuk ride from Galle.',
    summary:
      'A reef-protected bay just east of Galle with gentle swimming, coral snorkelling and a jungle-covered headland crowned by a white peace pagoda.',
    intro: [
      'Unawatuna is a bay with a natural breakwater: a reef curves across its mouth, which means the water inside is often calm and clear enough to swim far out. It has been a favourite of travellers since the 1970s, and its beachfront is busy with restaurants and guesthouses — but the snorkelling over the reef is genuinely good, and sea turtles feed on the rocks at its western end.',
      'Behind the bay rises Rumassala, a forested hill that legend says is a fragment of the Himalayas dropped by the monkey god Hanuman as he carried healing herbs to Lanka. At its top, the white Japanese Peace Pagoda looks out over the ocean; below it, Jungle Beach is a small cove reached through the forest.',
      'Unawatuna works well as a base for Galle, fifteen minutes away — fort by day, beach by evening.',
    ],
    attractions: [
      {
        name: 'Unawatuna Bay',
        kind: 'Beach',
        description:
          'A gentle, reef-sheltered bay ideal for swimming and paddleboarding from December to April.',
      },
      {
        name: 'Japanese Peace Pagoda',
        kind: 'Viewpoint',
        description:
          'A gleaming white stupa on the Rumassala headland with ocean views towards Galle Fort.',
      },
      {
        name: 'Jungle Beach',
        kind: 'Beach',
        description:
          'A small, tree-shaded cove on the far side of Rumassala hill, reached by a short forest walk.',
      },
      {
        name: 'Snorkelling with turtles',
        kind: 'Marine life',
        description:
          'Green turtles graze on the reef at the western end of the bay — watch from a respectful distance.',
      },
    ],
    season: {
      ...SOUTH_COAST,
      summary:
        'Calm and sunny from December to April. During the south-west monsoon (May–October) the sea is rough and visibility drops.',
    },
    travel: {
      fromColombo: { distanceKm: 125, duration: '2 hrs via the Southern Expressway' },
      recommendedStay: '2 nights',
      gettingThere: [
        'Ten minutes by tuk-tuk from Galle railway station.',
        'Mirissa is about an hour east along the coast road.',
      ],
      tips: [
        'Do not feed or touch the turtles; they are wild animals.',
        'The quieter beaches at Dalawella and Thalpe are five minutes east.',
      ],
    },
  },
  {
    slug: 'galle',
    name: 'Galle',
    region: 'south-coast',
    province: 'Southern Province',
    coordinates: [6.026, 80.217],
    categories: ['heritage', 'culture', 'beaches'],
    tagline: 'A walled sea-fort where the past is still lived in.',
    summary:
      'A 17th-century Dutch fortress on a rocky headland, its lanes full of old merchant houses, churches, galleries and cafés — and its ramparts made for sunset walks.',
    intro: [
      'The Portuguese built the first fortifications on this headland in the 16th century, but it was the Dutch East India Company that made Galle the fort it is today: massive coral and granite ramparts enclosing a grid of narrow streets, built from 1663 onward. It is the best-preserved European-built fortress in South and South-East Asia, and a UNESCO World Heritage site.',
      'Unlike many forts, Galle is still a living town. Families have lived here for generations; children play cricket on the rampart lawns; muezzins, church bells and temple drums mingle in the morning air. The old Dutch villas, with their deep verandas and courtyards, now hold boutique hotels, jewellers and quiet cafés.',
      'In the late afternoon, everyone drifts to the walls. Walk the circuit from the Clock Tower to the lighthouse and Flag Rock as the sun drops into the sea, and watch local divers leap from the rocks for a few rupees and a cheer.',
    ],
    attractions: [
      {
        name: 'The Ramparts',
        kind: 'Heritage',
        description:
          'A two-kilometre walk along the fort walls between the bastions, best at sunset with the ocean on one side and old roofs on the other.',
      },
      {
        name: 'Galle Lighthouse',
        kind: 'Landmark',
        description:
          'A white lighthouse built in 1939 on the site of the island’s oldest light, standing over a small cove of palms.',
      },
      {
        name: 'Dutch Reformed Church',
        kind: 'Heritage',
        description:
          'A church of 1755 with a floor paved with the tombstones of Dutch colonists and a calm, whitewashed interior.',
      },
      {
        name: 'Pedlar & Church Streets',
        kind: 'Culture',
        description:
          'Lanes of colonial houses filled with galleries, antique shops, boutiques and cafés, perfect for an aimless afternoon.',
      },
    ],
    season: {
      best: [12, 1, 2, 3, 4],
      shoulder: [11, 5],
      summary:
        'The fort is lovely year-round; showers in the monsoon months are short. January brings the Galle Literary Festival; December to April is sunniest.',
    },
    travel: {
      fromColombo: { distanceKm: 120, duration: '1.5–2 hrs via the Southern Expressway' },
      recommendedStay: '2 nights',
      gettingThere: [
        'The coastal train from Colombo runs beside the ocean for much of its 2.5–3 hour route.',
        'Unawatuna is 10 minutes away; Mirissa about 45 minutes.',
      ],
      tips: [
        'Stay inside the fort to enjoy it after the day visitors have left.',
        'Walk the ramparts between 5 and 6.30 pm for the light and the sunset.',
      ],
    },
  },
  {
    slug: 'tangalle',
    name: 'Tangalle',
    region: 'south-coast',
    province: 'Southern Province',
    coordinates: [6.0243, 80.7941],
    categories: ['beaches', 'wildlife', 'nature'],
    tagline: 'Long empty beaches, turtle nights and a monastery in the rocks.',
    summary:
      'A slow, spacious stretch of the south coast with wild golden beaches, sea turtle nesting sites and an ancient rock temple inland.',
    intro: [
      'East of Mirissa, the coast becomes quieter and the beaches grow longer. Tangalle is a fishing town with a busy harbour, but on either side of it lie wide, near-empty bays backed by coconut palms — Goyambokka, Silent Beach, Marakolliya — where the main sound is the surf.',
      'The sea here is powerful, and on most beaches swimming is only safe in sheltered coves. But this is exactly the shore that sea turtles choose. At Rekawa, a community conservation project watches over the beach at night as green and olive ridley turtles haul themselves up the sand to lay their eggs.',
      'Inland, Mulkirigala rises out of the paddy fields — a rock monastery of cave temples and reclining Buddhas reached by hundreds of steps, with a view from the top across a sea of green to the real sea beyond.',
    ],
    attractions: [
      {
        name: 'Rekawa Turtle Watch',
        kind: 'Wildlife',
        description:
          'A community-run night watch where you can see turtles nesting on a protected beach, guided in small groups with red light only.',
      },
      {
        name: 'Goyambokka & Silent Beach',
        kind: 'Beach',
        description:
          'Two sheltered coves just west of town with clear water and few people, framed by rocks and palms.',
      },
      {
        name: 'Mulkirigala Rock Temple',
        kind: 'Heritage',
        description:
          'A cliff-face monastery of painted cave shrines, with sweeping views from the summit stupa.',
      },
      {
        name: 'Hummanaya Blowhole',
        kind: 'Nature',
        description:
          'One of the largest blowholes in the world, sending plumes of spray high into the air when the swell is up.',
      },
    ],
    season: {
      ...SOUTH_COAST,
      summary:
        'December to April for calm seas and sunshine. Turtles nest year-round at Rekawa, with peaks from January to July.',
    },
    travel: {
      fromColombo: { distanceKm: 195, duration: '3–3.5 hrs via the Southern Expressway' },
      recommendedStay: '2–3 nights',
      gettingThere: [
        'One hour east of Mirissa by road.',
        'Yala and Udawalawe are both around 2 hours away.',
      ],
      tips: [
        'Respect red flags — the open-ocean beaches have strong rips.',
        'At turtle sites, never use a flash or a white torch.',
      ],
    },
  },
  {
    slug: 'hiriketiya',
    name: 'Hiriketiya',
    region: 'south-coast',
    province: 'Southern Province',
    coordinates: [5.9636, 80.7085],
    categories: ['beaches', 'adventure'],
    tagline: 'A horseshoe bay with a surf break, a jungle and a slow heartbeat.',
    summary:
      'A tiny, palm-ringed cove near Dikwella with a gentle beach break, a reef point for better surfers and a laid-back village of cafés and yoga shalas.',
    intro: [
      'Hiriketiya is a near-perfect horseshoe of sand enclosed by jungle-covered headlands. The bay faces the sun, the water is warm, and the waves wrap in from the reef on the eastern side, giving surfers a fun left-hander and beginners a soft beach break to learn on.',
      'For years it was a secret shared between surfers and a few fishermen. Today the hillsides hold small guesthouses, a handful of excellent cafés and yoga decks — but the scale is still intimate, and life in the bay moves with the tides.',
      'Nearby, at Dikwella, the Wewurukannala temple holds a seated Buddha some fifty metres tall, and just east the Hummanaya blowhole erupts with sea spray when the swell is running.',
    ],
    attractions: [
      {
        name: 'Hiriketiya Bay',
        kind: 'Beach',
        description:
          'A sheltered cove for swimming, paddling and watching surfers in the late afternoon light.',
      },
      {
        name: 'Surfing the bay',
        kind: 'Adventure',
        description:
          'A beach break for beginners and a reef left for intermediates, with boards and lessons for hire on the sand.',
      },
      {
        name: 'Wewurukannala Vihara',
        kind: 'Temple',
        description:
          'Home to one of the largest seated Buddha statues in Sri Lanka, and a corridor of vivid painted dioramas.',
      },
      {
        name: 'Dikwella Beach',
        kind: 'Beach',
        description:
          'A broad, calm sandy beach just west of the bay, with good swimming in season.',
      },
    ],
    season: {
      ...SOUTH_COAST,
      summary:
        'December to April for the best weather and surf. The bay stays sheltered for longer into the monsoon than most of the coast.',
    },
    travel: {
      fromColombo: { distanceKm: 180, duration: '3 hrs via the Southern Expressway' },
      recommendedStay: '3 nights',
      gettingThere: [
        'Forty minutes east of Mirissa; ten minutes from Dikwella town.',
        'Matara is the nearest railway station.',
      ],
      tips: [
        'Book ahead in January and February — there are only a few places to stay.',
        'Respect the line-up: let local surfers take their waves.',
      ],
    },
  },

  // ───────────────────────────── Eastern Coast ─────────────────────────────
  {
    slug: 'arugam-bay',
    name: 'Arugam Bay',
    region: 'east-coast',
    province: 'Eastern Province',
    coordinates: [6.84, 81.836],
    categories: ['beaches', 'adventure', 'wildlife'],
    tagline: 'The east coast’s legendary point break, and the lagoon life behind it.',
    summary:
      'A sandy bay on the far east coast famous for its right-hand point break, with elephants in the lagoons and leopards in nearby Kumana.',
    intro: [
      'Arugam Bay is the surfing capital of Sri Lanka. From April to October, while the south coast is battered by the monsoon, long right-hand waves peel along the point at the southern end of the bay, and surfers from all over the world arrive to ride them. Around it, a sandy village of cabanas, surf shops and seafood restaurants comes to life.',
      'Away from the water, the landscape is wild and open. Lagoons and paddy fields stretch inland towards the hills; elephants come down to feed at dusk; crocodiles drift in the mangroves of Pottuvil Lagoon. To the south, Kumana National Park is a haven for water birds — and for leopards, with a fraction of the visitors seen at Yala.',
      'Outside surf season, the bay grows very quiet. Many places close between November and March, when the north-east monsoon brings rain to this coast.',
    ],
    attractions: [
      {
        name: 'Main Point',
        kind: 'Surf',
        description:
          'One of Asia’s best right-hand point breaks — long, consistent waves for intermediate and advanced surfers.',
      },
      {
        name: 'Pottuvil Lagoon',
        kind: 'Nature',
        description:
          'A dawn boat ride through mangroves with monitor lizards, crocodiles, kingfishers and the occasional elephant.',
      },
      {
        name: 'Kumana National Park',
        kind: 'Wildlife',
        description:
          'Wetlands and forest famous for nesting birds from April to July, plus elephants, crocodiles and leopards.',
      },
      {
        name: 'Elephant Rock',
        kind: 'Viewpoint',
        description:
          'A short walk over the dunes south of town to a rock with a sweeping view of a wild beach and its surf.',
      },
    ],
    season: {
      best: [5, 6, 7, 8, 9],
      shoulder: [4, 10],
      summary:
        'Surf season runs from April to October, peaking from June to August. From November to March the east coast is wet and many businesses close.',
    },
    travel: {
      fromColombo: { distanceKm: 320, duration: '7–8 hrs by road' },
      recommendedStay: '3–4 nights',
      gettingThere: [
        'By road from Ella in about 3 hours via Monaragala.',
        'Batticaloa, with flights from Colombo, is about 3 hours north.',
      ],
      tips: [
        'Beginners should head to the gentler breaks at Baby Point, Whiskey Point or Peanut Farm.',
        'Drive carefully after dark — elephants cross the roads around the lagoons.',
      ],
    },
  },
  {
    slug: 'trincomalee',
    name: 'Trincomalee',
    region: 'east-coast',
    province: 'Eastern Province',
    coordinates: [8.5874, 81.2152],
    categories: ['beaches', 'wildlife', 'culture', 'adventure'],
    tagline: 'A great natural harbour, a cliff-top temple and coral islands offshore.',
    summary:
      'An ancient port on one of the world’s finest natural harbours, with the clifftop Koneswaram temple, white-sand beaches and snorkelling at Pigeon Island.',
    intro: [
      'Trincomalee has been fought over for centuries, and it is easy to see why. Its harbour is one of the deepest natural anchorages in the world, and every power that came to the Indian Ocean — Chola, Portuguese, Dutch, French, British — wanted it. The old fort still occupies the headland, with deer wandering under its gateways.',
      'At the tip of the headland, Koneswaram temple clings to Swami Rock, a cliff above the ocean that has been sacred to Hindus for well over a thousand years. Come at the hour of the evening puja, when bells ring out over the water and the cliff glows orange in the sunset.',
      'North of town, the beaches at Uppuveli and Nilaveli run for miles. Offshore, Pigeon Island National Park protects a reef where you can snorkel among parrotfish and blacktip reef sharks — and between March and August, blue and sperm whales pass close to the coast.',
    ],
    attractions: [
      {
        name: 'Koneswaram Temple',
        kind: 'Sacred site',
        description:
          'A Hindu temple on Swami Rock, high above the sea, with a long history and a dramatic setting at sunset.',
      },
      {
        name: 'Pigeon Island National Park',
        kind: 'Marine life',
        description:
          'A small island off Nilaveli with coral gardens, turtles and harmless blacktip reef sharks.',
      },
      {
        name: 'Nilaveli Beach',
        kind: 'Beach',
        description:
          'A long white-sand beach with calm, clear water from May to September.',
      },
      {
        name: 'Fort Frederick',
        kind: 'Heritage',
        description:
          'A fortress built by the Portuguese in 1624 and later held by the Dutch and the British, still home to a herd of spotted deer.',
      },
    ],
    season: {
      ...EAST_COAST,
      summary:
        'May to September brings calm seas and sunshine. Whale season is March to August. The north-east monsoon brings rain from November to February.',
    },
    travel: {
      fromColombo: { distanceKm: 260, duration: '6 hrs by road' },
      recommendedStay: '2–3 nights',
      gettingThere: [
        'Around 2.5 hours by road from Sigiriya — an easy beach finish to a Cultural Triangle trip.',
        'An overnight train runs from Colombo.',
      ],
      tips: [
        'Snorkelling at Pigeon Island is best in the morning before the wind rises.',
        'Remove shoes and cover shoulders at Koneswaram.',
      ],
    },
  },
  {
    slug: 'pasikudah',
    name: 'Pasikudah',
    region: 'east-coast',
    province: 'Eastern Province',
    coordinates: [7.9282, 81.5611],
    categories: ['beaches', 'nature'],
    tagline: 'A shallow lagoon of glass-clear water you can walk out into for hundreds of metres.',
    summary:
      'A sheltered bay on the east coast where a reef keeps the water calm and waist-deep far from shore — one of the gentlest swims on the island.',
    intro: [
      'Pasikudah is a beach for doing very little. A coral reef runs across the mouth of the bay, so the sea inside is shallow, warm and almost perfectly still, and you can wade out for what feels like half a kilometre with the water barely above your waist.',
      'Next door, Kalkudah is wilder and emptier, a long arc of sand with fishing boats drawn up beneath the palms. In the early morning you can watch the fishermen haul in their nets by hand, singing as they pull.',
      'Batticaloa, an hour south, is worth an afternoon: a lagoon city with a small Dutch fort, a lighthouse and a legend of singing fish that rise from the water on full-moon nights.',
    ],
    attractions: [
      {
        name: 'Pasikudah Bay',
        kind: 'Beach',
        description:
          'A reef-sheltered lagoon of shallow turquoise water, ideal for families and nervous swimmers.',
      },
      {
        name: 'Kalkudah Beach',
        kind: 'Beach',
        description:
          'A long and peaceful beach next door, with traditional beach-seine fishing in the mornings.',
      },
      {
        name: 'Batticaloa Lagoon & Fort',
        kind: 'Heritage',
        description:
          'A small Dutch fort beside a vast lagoon, and the old lighthouse at the bar mouth.',
      },
      {
        name: 'Snorkelling the reef',
        kind: 'Marine life',
        description:
          'Calm water over the reef edge with reef fish and corals on still mornings.',
      },
    ],
    season: {
      ...EAST_COAST,
      summary:
        'May to September for sunshine and still water. The north-east monsoon brings rain and rough seas from November to February.',
    },
    travel: {
      fromColombo: { distanceKm: 300, duration: '6.5 hrs by road' },
      recommendedStay: '2–3 nights',
      gettingThere: [
        'About 2 hours by road from Polonnaruwa.',
        'Batticaloa airport, with domestic flights, is 45 minutes away.',
      ],
      tips: [
        'Pack reef shoes for wading over the coral patches.',
        'The sun reflects strongly off the shallows — reapply sunscreen often.',
      ],
    },
  },

  // ───────────────────────────── Wildlife & Nature ─────────────────────────────
  {
    slug: 'yala',
    name: 'Yala National Park',
    region: 'wild-interior',
    province: 'Southern & Uva Provinces',
    coordinates: [6.3725, 81.5169],
    categories: ['wildlife', 'nature', 'adventure'],
    tagline: 'Leopards on the rocks, elephants in the scrub, and the ocean at the edge of it all.',
    summary:
      'Sri Lanka’s most famous national park — dry scrub, lagoons and granite outcrops on the south-east coast, with one of the highest leopard densities in the world.',
    intro: [
      'Yala is a landscape of thorn scrub, lagoons, rocky outcrops and long empty beaches, and it is wilder than almost anywhere else on the island. Block 1, the most visited section, has one of the highest densities of leopards anywhere on Earth — and a good chance of seeing one draped across a rock or crossing the track in front of your jeep.',
      'Leopards are only part of the story. Elephants browse in the scrub, sloth bears raid termite mounds and fruiting palu trees in June, mugger crocodiles bask at the waterholes, and the lagoons are full of painted storks, spoonbills and peacocks displaying in the dust.',
      'Inside the park lie the ruins of Sithulpawwa, a rock monastery inhabited by monks for over two thousand years, and a memorial to the 2004 tsunami at Patanangala beach — reminders that this wilderness has long been shared with people.',
    ],
    attractions: [
      {
        name: 'Leopard safari in Block 1',
        kind: 'Wildlife',
        description:
          'Dawn and late-afternoon jeep safaris with the best chances of seeing the Sri Lankan leopard in the wild.',
      },
      {
        name: 'Sithulpawwa Rock Temple',
        kind: 'Heritage',
        description:
          'An ancient monastery on a granite outcrop inside the park, with views over the forest canopy.',
      },
      {
        name: 'Lagoons & birdlife',
        kind: 'Birds',
        description:
          'More than 200 bird species recorded, from painted storks to the endemic Sri Lanka junglefowl.',
      },
      {
        name: 'Kirinda',
        kind: 'Coast',
        description:
          'A temple on a boulder-strewn headland by the sea just outside the park, wonderful at sunset.',
      },
    ],
    season: {
      best: [2, 3, 4, 5, 6, 7],
      shoulder: [1, 8, 11, 12],
      summary:
        'The dry season, February to July, concentrates animals around the waterholes. Block 1 usually closes from September to mid-October.',
    },
    travel: {
      fromColombo: { distanceKm: 290, duration: '5.5 hrs via the Southern Expressway' },
      recommendedStay: '2 nights (two or three safaris)',
      gettingThere: [
        'Tissamaharama is the gateway town, 30 minutes from the main entrance at Palatupana.',
        'About 2.5 hours by road from Ella or 2 hours from Tangalle.',
      ],
      tips: [
        'Book a responsible operator who keeps a respectful distance and does not chase sightings.',
        'Morning safaris leave around 5.30 am; bring a jacket for the open jeep.',
        'Neutral-coloured clothes, binoculars and patience all help.',
      ],
    },
  },
  {
    slug: 'udawalawe',
    name: 'Udawalawe National Park',
    region: 'wild-interior',
    province: 'Sabaragamuwa & Uva Provinces',
    coordinates: [6.4383, 80.8886],
    categories: ['wildlife', 'nature'],
    tagline: 'Open grasslands where the elephants are almost guaranteed.',
    summary:
      'Grassland and scrub around a great reservoir, home to hundreds of wild elephants — the most reliable place in Asia to see them in the wild.',
    intro: [
      'Udawalawe was created in 1972 to protect the animals displaced by a new reservoir, and it has become the best place on the island — perhaps in all of Asia — to watch wild elephants. Herds of females and calves feed in the open grassland and come down to the water through the day, often within metres of the jeeps.',
      'The landscape is open and grassy, broken by dead trees standing in the reservoir and the blue line of the hill country to the north. It is excellent for birds of prey: crested serpent eagles, white-bellied sea eagles and changeable hawk-eagles hunt over the plains.',
      'Next to the park, the Elephant Transit Home raises orphaned calves and releases them back into the wild. Come at feeding time to watch them gallop in for their milk.',
    ],
    attractions: [
      {
        name: 'Elephant safari',
        kind: 'Wildlife',
        description:
          'Jeep safaris with near-certain sightings of herds, often with very young calves.',
      },
      {
        name: 'Elephant Transit Home',
        kind: 'Conservation',
        description:
          'A rehabilitation centre for orphaned elephants, with public feeding sessions several times a day.',
      },
      {
        name: 'Udawalawe Reservoir',
        kind: 'Landscape',
        description:
          'A vast lake where elephants bathe and the hill country forms a backdrop to the north.',
      },
      {
        name: 'Birds of prey',
        kind: 'Birds',
        description:
          'Open country that makes it one of the best parks for raptors and grassland birds.',
      },
    ],
    season: {
      best: [1, 2, 3, 4, 6, 7, 8],
      shoulder: [5, 9, 12],
      summary:
        'Open year-round with excellent sightings in every season. The driest months, from January to April and June to August, are best.',
    },
    travel: {
      fromColombo: { distanceKm: 170, duration: '4 hrs by road' },
      recommendedStay: '1 night, or a stop between the hills and the coast',
      gettingThere: [
        'About 2 hours from Ella or Tangalle — an easy detour between the two.',
        'Embilipitiya is the nearest town.',
      ],
      tips: [
        'An afternoon safari works well — elephants come to the water in the heat of the day.',
        'Never feed elephants at the park fence; it endangers them.',
      ],
    },
  },
  {
    slug: 'wilpattu',
    name: 'Wilpattu National Park',
    region: 'wild-interior',
    province: 'North Western & North Central Provinces',
    coordinates: [8.4333, 80.03],
    categories: ['wildlife', 'nature'],
    tagline: 'The island’s largest park, a quiet country of lakes and leopards.',
    summary:
      'Sri Lanka’s largest and oldest national park — dense forest dotted with natural lakes, where leopards and sloth bears roam with few vehicles in sight.',
    intro: [
      'Wilpattu means “land of lakes”. The park is scattered with villus — shallow, rain-filled natural basins ringed by sand and grass — and these open clearings, set in thick forest, are where the animals come to drink. At more than 1,300 square kilometres, it is the largest national park on the island.',
      'Closed for long years during the civil war, Wilpattu has a different atmosphere from Yala: fewer jeeps, longer drives, and the sense of having a whole wilderness to yourself. Leopards are here in good numbers, along with sloth bears, elephants, spotted deer and wild buffalo.',
      'The park also holds traces of the island’s earliest history. Legend places the landing of Prince Vijaya — the mythical ancestor of the Sinhalese people — on its coast, and ancient burial grounds have been found near its southern edge.',
    ],
    attractions: [
      {
        name: 'Villus (natural lakes)',
        kind: 'Landscape',
        description:
          'Around sixty shallow lakes in forest clearings — the best places to wait quietly for wildlife.',
      },
      {
        name: 'Leopard & sloth bear tracking',
        kind: 'Wildlife',
        description:
          'Full-day safaris give the best chance of seeing these elusive animals without the crowds.',
      },
      {
        name: 'Kudiramalai Point',
        kind: 'Heritage',
        description:
          'A headland on the park’s western coast tied to the legend of Prince Vijaya and Queen Kuveni.',
      },
      {
        name: 'Birdlife',
        kind: 'Birds',
        description:
          'Herons, storks, eagles and migrant waterfowl gather at the villus through the dry season.',
      },
    ],
    season: {
      best: [2, 3, 4, 5, 6, 7, 8, 9],
      shoulder: [1, 10],
      summary:
        'The long dry season from February to October is ideal. The park is wettest during the north-east monsoon in November and December.',
    },
    travel: {
      fromColombo: { distanceKm: 180, duration: '4 hrs by road' },
      recommendedStay: '1–2 nights',
      gettingThere: [
        'The main Hunuwilagama entrance is 45 minutes from Anuradhapura.',
        'Combine with Anuradhapura or the Kalpitiya coast.',
      ],
      tips: [
        'A full-day safari is worth it — distances inside the park are long.',
        'Pack food and water; there are no shops inside.',
      ],
    },
  },
  {
    slug: 'sinharaja',
    name: 'Sinharaja Forest Reserve',
    region: 'wild-interior',
    province: 'Sabaragamuwa & Southern Provinces',
    coordinates: [6.41, 80.48],
    categories: ['nature', 'wildlife', 'adventure'],
    tagline: 'The last great rainforest of the island, humming with life found nowhere else.',
    summary:
      'A UNESCO-listed lowland rainforest, dense, humid and alive with endemic birds, frogs and trees — explored on foot with a local guide.',
    intro: [
      'Sinharaja is the island’s last significant stretch of primary lowland rainforest, and walking into it feels like entering an older Sri Lanka. Tall trees rise straight up into a canopy forty metres overhead; streams run clear over stone; the air is warm, still and full of birdsong.',
      'More than half of the trees here, and many of the birds, frogs and butterflies, are found nowhere else in the world. The forest is famous for its mixed-species bird flocks — noisy, travelling parties that can hold the Sri Lanka blue magpie, red-faced malkoha and orange-billed babbler all at once.',
      'Visits are on foot with a guide from the villages at the forest edge, many of whom have spent a lifetime in the reserve. Expect rain, mud and leeches — and a day you will not forget.',
    ],
    attractions: [
      {
        name: 'Guided rainforest trails',
        kind: 'Hike',
        description:
          'Walks from the Kudawa entrance along forest paths and streams, led by local naturalists.',
      },
      {
        name: 'Mixed-species bird flocks',
        kind: 'Birds',
        description:
          'Among the most studied bird flocks in the world, with many of the island’s endemic species.',
      },
      {
        name: 'Forest waterfalls',
        kind: 'Waterfall',
        description:
          'Cool pools and cascades inside the reserve — a welcome swim after a humid walk.',
      },
      {
        name: 'Sinhagala',
        kind: 'Hike',
        description:
          'A longer trek to a rocky peak inside the reserve with a view across an unbroken canopy.',
      },
    ],
    season: {
      best: [1, 2, 3, 4, 8],
      shoulder: [9, 12],
      summary:
        'Rain is possible on any day. January to early April, and August, tend to be driest. Mornings are best for birds.',
    },
    travel: {
      fromColombo: { distanceKm: 150, duration: '3.5–4 hrs by road' },
      recommendedStay: '1–2 nights at the forest edge',
      gettingThere: [
        'Kudawa (north) via Ratnapura, or Deniyaya (south) via Matara.',
        'About 2.5 hours from Galle or Udawalawe.',
      ],
      tips: [
        'Wear leech socks — they are sold in the villages near the entrance.',
        'Guides are mandatory and their knowledge is the highlight of the visit.',
      ],
    },
  },
];

export const destinations: Destination[] = raw.map(withPhotos);

export const destinationMap: Record<string, Destination> = Object.fromEntries(
  destinations.map((d) => [d.slug, d]),
);

export function getDestination(slug: string): Destination | undefined {
  return destinationMap[slug];
}
