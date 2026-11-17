import type { JournalArticle } from '@/types';

/**
 * Long-form travel-journal articles. Newest first by `publishedAt`.
 * Every `cover` and inline `image` refers to a photo ID in the photo registry.
 */
export const articles: JournalArticle[] = [
  // ───────────────────────────── Inspiration ─────────────────────────────
  {
    slug: 'ten-places-you-must-visit',
    title: '10 Places You Must Visit in Sri Lanka',
    dek: 'Ancient capitals, a railway into the clouds and a fort on the sea: the ten places we would send a first-time traveller, and the reasons each one earns its place.',
    category: 'Inspiration',
    author: 'Ceylora Editors',
    publishedAt: '2026-11-06',
    readingMinutes: 4,
    cover: 'sigiriya-aerial',
    relatedDestinations: ['sigiriya', 'kandy', 'ella', 'galle'],
    body: [
      {
        type: 'p',
        text: 'Ask ten Sri Lankans for the one place you cannot miss and you will get ten answers, most of them delivered with a hand on your arm and a phone already open to a cousin’s photographs. The island is small enough to drive across in a day, yet it holds eight UNESCO World Heritage Sites, cloud forest and dry thorn scrub, two monsoons that take turns with the coasts, and a railway that climbs from coconut palms to cool tea country between breakfast and dusk.',
      },
      {
        type: 'p',
        text: 'This list is our answer for a first visit of two or three weeks. It is not a ranking. It is a route, roughly, from the ancient cities of the north-central plains, up through the hills and down to the sea, with one detour into the rainforest and one to the east.',
      },
      { type: 'h2', text: 'How we chose' },
      {
        type: 'p',
        text: 'Every place here earns its spot on more than looks. Each tells you something about the island that nowhere else does, be it the ambition of a fifth-century king, the patience of a tea plucker or the way a leopard owns a granite boulder at dusk. We have left out places that are lovely but interchangeable, and we have favoured those that reward an early start, because in Sri Lanka almost everything does.',
      },
      {
        type: 'image',
        photo: 'dambulla-buddhas',
        caption: 'Gilded Buddhas in the cave temple at Dambulla, twenty minutes from Sigiriya.',
      },
      { type: 'h2', text: 'The ten' },
      {
        type: 'list',
        items: [
          {
            title: 'Sigiriya',
            text: 'King Kashyapa built his palace on top of this granite column in the late fifth century CE, and the climb still follows his route: through the water gardens, past the frescoes and the Mirror Wall, and up between a pair of colossal lion’s paws. Be at the gate when it opens; by ten the rock is hot and crowded.',
          },
          {
            title: 'Anuradhapura and Polonnaruwa',
            text: 'The island’s two great ancient capitals lie a couple of hours apart. Anuradhapura is a living pilgrimage city of white and brick-red stupas; Polonnaruwa, its medieval successor, is compact enough to explore by bicycle, and its Gal Vihara Buddhas are among the finest rock carvings in Asia.',
          },
          {
            title: 'Dambulla',
            text: 'Five caves beneath a single overhang, painted from floor to ceiling and filled with more than 150 Buddha images. Go late in the afternoon, when the light softens and the coaches have moved on, and take the climb slowly; the rock holds the heat.',
          },
          {
            title: 'Kandy',
            text: 'The last royal capital wraps around a lake in a bowl of forested hills. Time a visit to the Temple of the Sacred Tooth Relic for the evening puja, when the drums sound and the inner shrine is opened, and keep a morning for the royal palms of the botanical gardens at Peradeniya.',
          },
          {
            title: 'Ella',
            text: 'A village at the lip of a gap in the mountains, with easy walks to Little Adam’s Peak and harder ones to Ella Rock, and the Nine Arch Bridge a short stroll along the tracks. The most celebrated stretch of the hill-country railway runs right through its little station.',
          },
          {
            title: 'Horton Plains',
            text: 'A high, cold plateau of grassland and cloud forest that ends abruptly at World’s End, a cliff dropping about 870 metres to the lowlands. Walk the loop at dawn; by mid-morning the view is usually full of cloud.',
          },
          {
            title: 'Sinharaja',
            text: 'The country’s last large tract of lowland rainforest, a World Heritage Site and a refuge for endemic birds that move through the canopy in mixed flocks. Hire one of the local guides at the entrance and wear leech socks.',
          },
          {
            title: 'Galle Fort',
            text: 'The Dutch began the ramparts that stand today in 1663, and the fort they enclose is still a working town of churches, mosques, courthouses and family homes. Walk the walls at sunset, when half the town seems to come out to watch.',
          },
          {
            title: 'Yala',
            text: 'Few parks anywhere offer better odds of a wild leopard, and the scrub and lagoons also hold elephants, sloth bears, crocodiles and a great many birds. Book an early-morning safari, and note that the main block usually closes from September to mid-October.',
          },
          {
            title: 'Trincomalee',
            text: 'A deep natural harbour on the north-east coast, with the clifftop Koneswaram temple, the white sand of Nilaveli and coral around Pigeon Island. The sea here is calmest from roughly May to September, just when the south-west coast is at its roughest.',
          },
        ],
      },
      {
        type: 'image',
        photo: 'polonnaruwa-gal-vihara',
        caption: 'The seated Buddha of Gal Vihara, carved into granite at Polonnaruwa.',
      },
      { type: 'h2', text: 'Stitching them together' },
      {
        type: 'p',
        text: 'Distances look short on the map and take longer on the road. Allow for an average of perhaps forty or fifty kilometres an hour with a driver, less in the hills, and resist the urge to see two major sites in a single day. A classic loop runs north from the airport to the Cultural Triangle, south to Kandy, by train into the hills, then down to Yala and west along the coast to Galle. Trincomalee fits best between May and September, when the eastern sea lies flat.',
      },
      {
        type: 'quote',
        text: '“Don’t try to see it all in one go. Leave something for next time. The island will still be here, and so will we.”',
        cite: 'A driver from Kandy',
      },
      {
        type: 'image',
        photo: 'galle-street',
        caption: 'A lane of colonial houses inside the walls of Galle Fort.',
      },
      {
        type: 'p',
        text: 'Pack for two climates: light cotton for the plains and the coast, a fleece and a rain shell for the hills, where nights in Nuwara Eliya and on Horton Plains can be properly cold. Carry a scarf or sarong to cover shoulders and knees at temples, where shoes come off at the gate and the stone can scorch at midday. And keep a little slack in the plan. The days you remember will be the ones that went sideways: an unscheduled stop for king coconut, a wedding procession blocking the road, a young monk who wants to practise his English.',
      },
    ],
  },

  // ───────────────────────────── Coast ─────────────────────────────
  {
    slug: 'best-beaches-in-southern-sri-lanka',
    title: 'Best Beaches in Southern Sri Lanka',
    dek: 'From Unawatuna’s sheltered bay to the long, empty sands beyond Tangalle, the south coast changes character every few kilometres. Our pick of where to swim, surf and do very little at all.',
    category: 'Coast',
    author: 'Ceylora Editors',
    publishedAt: '2026-10-22',
    readingMinutes: 4,
    cover: 'tangalle-goyambokka',
    relatedDestinations: ['unawatuna', 'mirissa', 'hiriketiya', 'tangalle'],
    body: [
      {
        type: 'p',
        text: 'The south coast of Sri Lanka runs east from Galle towards the scrubland of Yala, and no two stretches of it feel alike. There are coves you can swim across, surf breaks with their own economies of wooden shacks and board rentals, fishing beaches where outrigger canoes are dragged up the sand at first light, and long, empty strands where the only other footprints belong to a monitor lizard.',
      },
      {
        type: 'p',
        text: 'The season is the thing to get right. From roughly December to April the sea calms, the water clears and the coast is at its best. From May to September the same shore takes the full force of the south-west monsoon: beaches shrink, red flags go up and swimming in many places becomes genuinely dangerous. Come then, and head for the east coast instead.',
      },
      { type: 'h2', text: 'Unawatuna and Jungle Beach' },
      {
        type: 'p',
        text: 'A short tuk-tuk ride from Galle Fort, Unawatuna is the south’s most sociable beach, a crescent bay sheltered by a reef and a headland, with calm water through most of the season and a strip of seafood restaurants along the sand. It is busy, but the swimming is easy and the snorkelling off the reef can be rewarding, with parrotfish and angelfish in a few metres of water. For something quieter, walk or ride over the Rumassala headland to Jungle Beach, a small cove below the white Japanese Peace Pagoda, where the water is clear and the forest comes right down to the shore.',
      },
      {
        type: 'p',
        text: 'Galle itself is no beach town, but the fort makes the ideal base for this western end of the coast. Stay inside the walls, take a tuk-tuk out to the sand each morning, and come back for the evening walk along the ramparts, when families gather on the grass, boys dive from the bastions and the lighthouse comes on above the palms.',
      },
      {
        type: 'image',
        photo: 'unawatuna-jungle-beach',
        caption: 'Jungle Beach, below the Peace Pagoda on the Rumassala headland.',
      },
      { type: 'h2', text: 'Mirissa and the whale coast' },
      {
        type: 'p',
        text: 'Heading east, the road passes the stilt fishermen of Koggala and Ahangama, perched on poles above the surf, some of whom now fish more for photographers than for fish. Weligama’s long, gentle bay is where most people learn to surf. Then comes Mirissa, curving around a palm-backed bay with a rocky islet at one end, the liveliest evenings on the coast and a sunset viewpoint on the low rise of Coconut Tree Hill.',
      },
      {
        type: 'p',
        text: 'Mirissa is also the departure point for whale-watching. From roughly December to April, blue whales feed in the deep water offshore, often with spinner dolphins and sometimes sperm whales. Choose an operator that follows the national guidelines on distance and speed, go out early when the sea is flattest, and take something for seasickness the night before.',
      },
      {
        type: 'image',
        photo: 'mirissa-aerial',
        caption: 'Mirissa’s crescent bay and headland from above.',
      },
      { type: 'h2', text: 'Hiriketiya: a horseshoe for surfers' },
      {
        type: 'p',
        text: 'Hiriketiya, near Dikwella, is a small horseshoe bay ringed with palms, with a gentle beach break for beginners on one side and a reef break for those who know what they are doing on the other. In a few short years it has grown a scene of boutique guesthouses and smoothie bowls, but the bay itself is unchanged and the water warm. When you have had enough of the waves, drive five minutes to Wewurukannala Vihara, where an enormous seated Buddha rises over the temple roofs.',
      },
      {
        type: 'p',
        text: 'Boards and lessons are easy to arrange on the beach. Go out early, before the afternoon wind picks up and ruffles the faces of the waves, and if you are new to it, stay on the sandy side of the bay and leave the reef to the regulars.',
      },
      { type: 'h2', text: 'Tangalle and the empty east' },
      {
        type: 'p',
        text: 'Tangalle is where the coast opens out. West of town, Goyambokka is a sheltered cove between rocky points and the easiest place to swim. To the east, beaches such as Marakolliya run on for kilometres, backed by lagoons and lines of cabanas. Here the shelf drops steeply and the surf can be strong, so walk and watch rather than swim unless people who live there tell you it is safe.',
      },
      {
        type: 'p',
        text: 'At Rekawa, a little further east, a community conservation project leads small groups onto the beach at night to watch green turtles haul themselves up the sand to nest. Go with the rangers, keep torches and phone screens off, and stay well back while the turtle digs.',
      },
      {
        type: 'image',
        photo: 'tangalle-marakolliya',
        caption: 'Cabanas beneath the palms at Marakolliya, east of Tangalle.',
      },
      {
        type: 'quote',
        text: '“Watch the sea before you go in. The calm patch between the breaking waves, that is the one that pulls you out.”',
        cite: 'A fisherman at Tangalle',
      },
      {
        type: 'p',
        text: 'Getting between beaches is simple. The Southern Expressway runs from the edge of Colombo past Galle and Matara, so you can land at the airport in the morning and be by the sea in the afternoon. The old coast road is slower, lined with fruit stalls, fishing harbours and churches, and is the one to take from beach to beach. The coastal railway, meanwhile, runs south from Colombo to Galle and Matara with the surf at times just metres from the carriage windows.',
      },
      {
        type: 'p',
        text: 'Wherever you stay, swim where local families swim, ask about currents and respect the red flags. Cover up when you leave the beach, carry small notes for king coconuts and bring reef-safe sunscreen. Above all, slow down. The south coast rewards the traveller who stays a week in one place, learns the names of the boatmen and the hour of the morning fish auction, and goes nowhere in particular.',
      },
    ],
  },

  // ───────────────────────────── Journeys ─────────────────────────────
  {
    slug: 'scenic-journey-through-the-hill-country',
    title: 'A Scenic Journey Through the Hill Country',
    dek: 'From Kandy to Ella by road and rail, by way of waterfalls, tea estates and a plateau at the top of the island. Five days, several climates and a great deal of tea.',
    category: 'Journeys',
    author: 'Ceylora Editors',
    publishedAt: '2026-09-24',
    readingMinutes: 4,
    cover: 'train-viaduct',
    relatedDestinations: ['kandy', 'nuwara-eliya', 'horton-plains', 'haputale'],
    body: [
      {
        type: 'p',
        text: 'The hill country of Sri Lanka begins almost politely. Leave Kandy heading south and the road follows the Mahaweli river for a while, through spice gardens and paddy and past stalls stacked with rambutan and jackfruit. Then it begins to climb, and it does not really stop until it reaches Nuwara Eliya, nearly 1,900 metres up, where you will want a jumper.',
      },
      {
        type: 'p',
        text: 'This is a journey best taken slowly, over five days or more, mixing car and train. Our route runs from Kandy over the Ramboda Pass to Nuwara Eliya, onto the high plateau of Horton Plains, along the ridge to Haputale and finally down into Ella, with the railway carrying you over the most dramatic stretch.',
      },
      { type: 'h2', text: 'Kandy to Nuwara Eliya: waterfalls and the first tea' },
      {
        type: 'p',
        text: 'Allow a full day for a drive that takes about three hours without stopping. Leave Kandy early, after a turn through the Royal Botanical Gardens at Peradeniya, and you will reach the tea country by mid-morning. Above Pussellawa the bushes begin, clipped to waist height and planted in contour lines that make the hills look combed. At Ramboda the road switchbacks past a run of waterfalls, and more than one tea factory will offer a tour and a cup. Ask to see the withering lofts, where the fresh leaf is spread on long troughs to dry under fans and the air smells of cut grass and something close to apples.',
      },
      {
        type: 'image',
        photo: 'nuwara-eliya-plucker',
        caption: 'Plucking leaf by hand on an estate outside Nuwara Eliya.',
      },
      {
        type: 'p',
        text: 'Nuwara Eliya itself is a curious place, a British hill station of red-brick post office, mock-Tudor hotels and a racecourse, set among market gardens of leeks and carrots. Stay somewhere with a fire. Mornings around Gregory Lake are clear and cold; afternoons are often grey.',
      },
      { type: 'h2', text: 'Horton Plains at dawn' },
      {
        type: 'p',
        text: 'The reason to sleep in Nuwara Eliya is the early start. Drivers leave around five for the hour’s journey to Horton Plains, a rolling plateau of tussock grass and stunted cloud forest that forms part of the Central Highlands World Heritage Site. The nine-kilometre loop walk passes Baker’s Falls and reaches World’s End, where the southern edge of the plateau drops about 870 metres. On a clear morning the lowland forest and tea estates lie spread out far below, sometimes all the way to the sea. By mid-morning the cloud usually rises up the face and the view is gone, so be on the trail by half past six, with a warm layer and a rain shell.',
      },
      {
        type: 'p',
        text: 'The plateau has its own climate and its own cast. Sambar deer graze the grassland in the half-light, purple-faced langurs move through the mossy trees, and the frost on the tussocks can still be crunching underfoot as the sun comes up. Plastic is banned in the park and bags are checked at the gate, so decant breakfast into a box the night before.',
      },
      {
        type: 'image',
        photo: 'horton-plains-worlds-end',
        caption: 'World’s End, where the plateau gives way to the lowlands far below.',
      },
      { type: 'h2', text: 'By rail to Haputale' },
      {
        type: 'p',
        text: 'From Nanu Oya, the station for Nuwara Eliya, or from Ohiya at the edge of the plains, the train carries you on to Haputale through some of the finest scenery on the line: over the highest stretch of the network and through tunnels and cuttings along the top of the range. Sit by an open window, keep a firm hold if you stand in the doorway, and watch the country change from eucalyptus and grassland back to tea as the line begins to fall.',
      },
      {
        type: 'p',
        text: 'Haputale clings to a ridge with the plains on one side and the hills on the other, and its great sight is Lipton’s Seat, the viewpoint above the Dambatenne estate where Sir Thomas Lipton is said to have stood to survey his tea. Take a tuk-tuk up before dawn and walk back down through the estate as the pluckers arrive, baskets slung on their backs. Nearby, Adisham, a Tudor-style country house that is now a Benedictine monastery, opens to visitors at weekends and sells jams made from its gardens.',
      },
      {
        type: 'p',
        text: 'If you have an extra afternoon, drive down off the ridge to Diyaluma Falls, which drops some 220 metres from a sheer escarpment. A steep path climbs to a chain of natural rock pools at the top, where you can swim in cold, clear water with the plains spread out beyond the lip of the falls.',
      },
      {
        type: 'quote',
        text: '“The best tea grows where it is hardest to live. Cold nights, steep land, slow leaves. That is the taste.”',
        cite: 'A tea planter near Haputale',
      },
      {
        type: 'image',
        photo: 'haputale-liptons-seat',
        caption: 'Tea terraces and lone shade trees on the slopes below Lipton’s Seat.',
      },
      { type: 'h2', text: 'Down to Ella' },
      {
        type: 'p',
        text: 'The last stretch, from Haputale to Ella, is short, about an hour by train, and it carries you through the tea hills around Bandarawela to the small station at Ella, with the gap opening ahead and the Nine Arch Bridge waiting a short walk down the line. Spend at least two nights. You will have earned a slow morning.',
      },
      {
        type: 'p',
        text: 'The hill country is cool and changeable, so pack layers, a waterproof and closed shoes. January to April gives the clearest views. The western slopes around Nuwara Eliya and Horton Plains are wettest during the south-west monsoon, from May to September, while Haputale and Ella, on the drier eastern side, often stay pleasant then. The easiest way to do it all is with a car and driver for the road sections, meeting you at the station at the end of each train ride with your luggage already aboard.',
      },
    ],
  },

  // ───────────────────────────── Destination Guide ─────────────────────────────
  {
    slug: 'ultimate-guide-to-ella',
    title: 'The Ultimate Guide to Exploring Ella',
    dek: 'A one-street village at the lip of a mountain gap has become the hill country’s favourite stop. How to walk it, ride into it and find its quieter corners.',
    category: 'Destination Guide',
    author: 'Ceylora Editors',
    publishedAt: '2026-08-13',
    readingMinutes: 4,
    cover: 'ella-little-adams',
    relatedDestinations: ['ella', 'haputale', 'nuwara-eliya'],
    body: [
      {
        type: 'p',
        text: 'Ella sits at just over a thousand metres, on a saddle where the hills of Uva part to form the Ella Gap, a deep green notch through which, on a clear day, you can see all the way down to the southern plains. Not so long ago it was a railway halt with a handful of guesthouses. Today its main street is lined with cafés, yoga studios and tuk-tuk drivers holding laminated maps, and yet the walks that brought travellers here in the first place still begin minutes from the door.',
      },
      {
        type: 'p',
        text: 'The trick is to treat Ella as a base rather than a destination. Sleep a little outside the village, on the slopes among the tea, and you will wake to birdsong and the horn of the first train instead of late music from the bars.',
      },
      {
        type: 'p',
        text: 'Three nights is about right: one day for the walks, one for the bridge and the waterfalls, and one for doing very little at all, which Ella does better than almost anywhere in the hills.',
      },
      { type: 'h2', text: 'Getting there' },
      {
        type: 'p',
        text: 'Most travellers arrive by train from Kandy or Nanu Oya, and they are right to. The journey from Kandy takes around seven hours and spends much of it winding through tea estates, tunnels and cloud. Reserved seats go quickly, so book as early as you can, or accept the scrum of the unreserved carriages. By road, Ella is a little over two hours from Nuwara Eliya, and a few hours from both the safari country around Yala and the beaches of the south coast, which makes it the natural bridge between the mountains and the sea.',
      },
      { type: 'h2', text: 'The walks' },
      {
        type: 'p',
        text: 'Little Adam’s Peak is the gentle one: about forty-five minutes from the village along an estate road, then up a flight of steps to a grassy ridge with the gap on one side and tea-covered hills on the other. Go at sunrise and you may find yourself standing above a sea of cloud. Ella Rock is a proper hike, three to four hours there and back, partly along the railway line and then steeply up through eucalyptus and scrub. The path is poorly marked and plenty of people will offer to lead you; a guide arranged through your guesthouse is worth it, and so is starting before seven, as the summit often clouds over by late morning.',
      },
      {
        type: 'image',
        photo: 'ella-rock',
        caption: 'Ella Rock wrapped in cloud. Start early to reach the top before it closes in.',
      },
      {
        type: 'p',
        text: 'The Nine Arch Bridge is a walk of half an hour or so from the village, through tea and along the tracks. Completed in 1921 near Demodara, it carries the line across a ravine on nine tall arches of stone and brick, and is often said to have been built without a single piece of steel. Arrive early and you may share it with only a family of monkeys. Ask locally when the next train is due, step well back when it comes, and never walk across the viaduct as a train approaches.',
      },
      {
        type: 'image',
        photo: 'ella-nine-arch',
        caption: 'The Nine Arch Bridge curving through the jungle near Demodara.',
      },
      { type: 'h2', text: 'Waterfalls, tea and a long view' },
      {
        type: 'p',
        text: 'Ravana Falls, about six kilometres down the road to Wellawaya, tumbles in tiers beside the highway and is at its fullest after the rains. Like the cave in the hills above the village, it is tied by legend to Ravana, the demon king of the Ramayana. Tea factories around the edge of Ella run short tours where you can follow a leaf from withering trough to tasting cup. And for the longest view in the region, catch an early train or tuk-tuk to Haputale and head up to Lipton’s Seat before the morning cloud rises.',
      },
      {
        type: 'image',
        photo: 'ella-ravana-falls',
        caption: 'Ravana Falls, a short tuk-tuk ride down the Wellawaya road.',
      },
      {
        type: 'p',
        text: 'With a spare day, ride the train a few stops further down the line towards Badulla. Beyond the Nine Arch Bridge it curls around a hill and passes beneath its own track at Demodara, and from Badulla a short drive and a walk down a forest path bring you to Dunhinda Falls, spreading like a veil over a dark rock face. Come back by road in the late afternoon, when the light turns gold on the tea.',
      },
      { type: 'h2', text: 'Where to eat and stay' },
      {
        type: 'p',
        text: 'The main street does honest rice and curry at lunchtime and a passable version of everything else at dinner. The better meals are often at guesthouses, where a home cook will lay out six or seven curries if you ask in the morning. For views, stay along the Passara road or on the slopes towards Little Adam’s Peak, and book well ahead for the busy months from December to April.',
      },
      {
        type: 'quote',
        text: '“People come for the bridge and the photograph. The ones who stay a third day, they start to notice the birds.”',
        cite: 'A guesthouse owner in Ella',
      },
      {
        type: 'p',
        text: 'Ella sits on the drier, eastern side of the hills and is pleasant for much of the year, with the clearest mornings from January to April. Afternoons can bring cloud and a shower in any month, so plan walks for the early hours, carry a light rain jacket and wear shoes with grip. Then leave the late afternoon for a pot of tea on a veranda and the long view through the gap.',
      },
    ],
  },

  // ───────────────────────────── Wildlife ─────────────────────────────
  {
    slug: 'discovering-sri-lankas-wildlife',
    title: 'Discovering Sri Lanka’s Wildlife',
    dek: 'Leopards on granite boulders, elephants in their hundreds and the largest animal that has ever lived, all around one island. A guide to where, and when, to look.',
    category: 'Wildlife',
    author: 'Ceylora Editors',
    publishedAt: '2026-06-18',
    readingMinutes: 4,
    cover: 'leopard-wilpattu',
    relatedDestinations: ['yala', 'wilpattu', 'udawalawe', 'sinharaja'],
    body: [
      {
        type: 'p',
        text: 'There are not many places where you can watch a leopard at breakfast, an elephant herd by lunch and, a few days later, a blue whale surfacing ahead of your boat. Sri Lanka packs an extraordinary range of habitats into a small island, from dry thorn scrub and monsoon forest to montane grassland and some of the last lowland rainforest in South Asia, and with them a roll call of animals, many of which are found nowhere else.',
      },
      { type: 'h2', text: 'Leopards of Yala and Wilpattu' },
      {
        type: 'p',
        text: 'The Sri Lankan leopard is a subspecies of its own, and on an island with no tigers or lions it sits at the top of the food chain. That confidence shows. Leopards here are often seen by day, draped over boulders or padding along sandy tracks. Yala, in the dry south-east, offers some of the best odds of a sighting anywhere, particularly in Block 1, which usually closes from September to mid-October at the height of the dry season. Its popularity is also its problem: jeeps can gather in dozens around a single cat. Go out at first light, choose a driver who keeps a respectful distance, and consider the quieter outer blocks.',
      },
      {
        type: 'p',
        text: 'Wilpattu, in the north-west, is the largest national park in the country and feels like a different world: dense forest broken by villus, shallow natural lakes ringed with grass, where leopards, sloth bears and spotted deer come down to drink. Sightings are fewer, but so are jeeps, and the patience it demands is part of the pleasure.',
      },
      {
        type: 'image',
        photo: 'yala-sloth-bear',
        caption: 'A sloth bear on a sandy track in Yala. They are seen most often when the palu trees fruit, around the middle of the year.',
      },
      { type: 'h2', text: 'Elephants: Udawalawe and the Gathering' },
      {
        type: 'p',
        text: 'Sri Lanka has one of the highest densities of wild Asian elephants anywhere, and Udawalawe is the most reliable place to see them, in open grassland around a large reservoir where herds of mothers and calves graze within sight of the jeeps. Nearby, the Elephant Transit Home raises orphaned calves before returning them to the wild, and visitors can watch feeding time from a viewing platform.',
      },
      {
        type: 'p',
        text: 'In the dry months from July to September, the herds of the north-central plains drift towards the ancient reservoir at Minneriya, built in the third century, as other water sources dry up. Fresh grass sprouts on the exposed bed and the elephants gather on it in their hundreds, an event known simply as the Gathering. An afternoon safari, when the herds emerge from the forest towards the water, is one of the great wildlife spectacles in Asia.',
      },
      {
        type: 'p',
        text: 'Look closely at the bulls and you will notice that most of them have no tusks. Only a small minority of Sri Lankan males carry them, which makes a tusker a rare and much-admired sight, and the reason you will hear drivers radio each other with some excitement when one appears.',
      },
      {
        type: 'image',
        photo: 'polonnaruwa-minneriya',
        caption: 'Elephants moving through the golden grass at Minneriya.',
      },
      { type: 'h2', text: 'Whales off the south coast' },
      {
        type: 'p',
        text: 'The continental shelf off Sri Lanka’s southern tip is unusually narrow, and deep water lies close to the coast. From roughly December to April, boats leave Mirissa at dawn to find blue whales feeding there, along with spinner dolphins in pods that can run into the hundreds, and sometimes sperm whales. Off Trincomalee, on the east coast, the season shifts to the middle of the year. Choose an operator that follows the national code on distance and speed, and take something for seasickness the night before.',
      },
      {
        type: 'image',
        photo: 'mirissa-blue-whale',
        caption: 'A blue whale surfacing to breathe in the deep water off the south coast.',
      },
      { type: 'h2', text: 'Rainforest and birds' },
      {
        type: 'p',
        text: 'Birders come for the endemics, more than thirty species found only in Sri Lanka. Many of them live in Sinharaja, the island’s last large tract of lowland rainforest and a World Heritage Site, where mixed flocks of babblers, drongos, blue magpies and others move through the canopy together. Walk with one of the guides from the villages at the forest edge, who can name a green-billed coucal from a single call, and wear leech socks. At the other end of the scale, the lagoons of Bundala on the south-east coast fill with migrant waterbirds during the northern winter.',
      },
      {
        type: 'p',
        text: 'Up in the hills, Horton Plains has a cast of its own: sambar grazing the grassland at dawn, purple-faced langurs in the cloud forest and the shy Sri Lanka whistling thrush along the streams. Even in the garden of a guesthouse at the forest edge you may find the national bird, the Sri Lanka junglefowl, scratching at the leaf litter, or a giant squirrel crashing through the canopy overhead.',
      },
      {
        type: 'quote',
        text: '“You don’t find the leopard. You hear the langur shouting, the deer stamping, the birds going quiet. Then the leopard finds you.”',
        cite: 'A tracker at Yala',
      },
      {
        type: 'p',
        text: 'A few principles apply everywhere. Go early, when the animals are active and the light is soft. Wear muted colours, bring binoculars and a scarf against the dust, and ask your driver to switch off the engine at sightings. Never feed animals, and never push to get closer than is comfortable for them. The best safaris are often the slow ones, where nothing much happens for an hour and then everything does.',
      },
    ],
  },

  // ───────────────────────────── Food & Culture ─────────────────────────────
  {
    slug: 'a-guide-to-sri-lankan-food',
    title: 'A Guide to Sri Lankan Food',
    dek: 'Rice and curry is only the beginning. From hoppers at breakfast to crab curry by the harbour, here is how to eat your way around the island.',
    category: 'Food & Culture',
    author: 'Ceylora Editors',
    publishedAt: '2026-05-07',
    readingMinutes: 4,
    cover: 'food-crab',
    relatedDestinations: ['galle', 'kandy', 'nuwara-eliya'],
    body: [
      {
        type: 'p',
        text: 'The first thing to understand about Sri Lankan food is that “rice and curry” means a meal, not a dish. Order it at lunchtime in a roadside canteen and a mound of rice arrives surrounded by five, six, sometimes ten small bowls: a dal, a fish or chicken curry, something made from green jackfruit, beetroot or pumpkin, a mallung of finely shredded greens, a sambol, a pickle and a papadum. Every household roasts and grinds its own blend of spices, and no two lunches are ever quite alike.',
      },
      { type: 'h2', text: 'Rice and curry, properly' },
      {
        type: 'p',
        text: 'The best rice and curry is eaten at lunch, when it has been cooked that morning; by evening, many canteens have moved on to short eats and fried rice. Eat with your right hand if you want to join in, mixing a little of each curry into the rice with your fingertips. Look out for pol sambol, freshly grated coconut pounded with chilli, red onion, lime and Maldive fish, which turns up at almost every meal and is good enough to eat on its own. Curries range from mild, coconut-milk ‘white’ curries to dark ‘black’ curries made with deeply roasted spices, and the heat is real; ask for less chilli early, and kindly.',
      },
      {
        type: 'image',
        photo: 'food-rice-curry',
        caption: 'A lunchtime rice and curry, with vegetable curries and papadum.',
      },
      {
        type: 'p',
        text: 'In the late afternoon, bakeries and tea shops lay out short eats: fish buns, vegetable rotis, crumbed cutlets and patties, piled on a plate and set on your table. You eat what you like and pay for what you have eaten. In Colombo, look too for lamprais, a legacy of the Dutch Burgher community, in which rice cooked in stock, a mixed-meat curry, frikkadel meatballs and sweet onion sambol are wrapped together in a banana leaf and baked until the flavours run into one another.',
      },
      { type: 'h2', text: 'Hoppers, string hoppers and kottu' },
      {
        type: 'p',
        text: 'Hoppers, or appa, are the island’s great breakfast and supper: a batter of fermented rice flour and coconut milk swirled in a small, deep pan until it sets into a bowl, lacy and crisp at the rim and soft in the middle. Crack an egg into the bottom for an egg hopper and eat it with lunu miris, a fiery relish of chilli, red onion, lime and salt. String hoppers are something else again, little nests of steamed rice noodles eaten with dal and coconut sambol. After dark, follow the clatter of metal blades on a hot griddle to find kottu, chopped roti fried with vegetables, egg and curry gravy, the island’s favourite late-night food.',
      },
      { type: 'h2', text: 'The coast and the north' },
      {
        type: 'p',
        text: 'On the coast, the catch decides the menu. On some beaches, teams still haul in seine nets by hand, and the fish markets of Galle, Mirissa and Negombo are worth an early visit. In the south, look for ambul thiyal, a sour, almost dry tuna curry cooked with goraka, a tart dried fruit that also helps preserve it, a method that long predates refrigeration. Crab curry is the coast’s great feast, simmered in a thick gravy of roasted spices and eaten slowly with bread or rice and a stack of napkins. Many swear the finest comes from Jaffna, in the Tamil north, where it is cooked with tamarind, drumstick leaves and the region’s own fiery curry powder.',
      },
      {
        type: 'image',
        photo: 'culture-fishermen-nets',
        caption: 'Hauling a beach-seine net, where many a coastal curry begins.',
      },
      { type: 'h2', text: 'Sweet things, tea and toddy' },
      {
        type: 'p',
        text: 'Sri Lankan desserts are few but memorable. Buffalo curd, set in clay pots, is sold along the roads of the south and eaten with kithul treacle, a dark syrup tapped from the flower of the fishtail palm. Watalappan, a steamed custard of coconut milk, jaggery and cardamom, came with the island’s Malay community. Kiribath, rice cooked in coconut milk and cut into diamonds, marks auspicious moments, from the first morning of the month to the Sinhala and Tamil New Year in April.',
      },
      {
        type: 'p',
        text: 'And then there is tea, grown here since the 1860s and still plucked by hand on the hill estates. Drink it the local way, strong and milky with plenty of sugar, or visit a factory and taste the difference between a bright, brisk high-grown tea and a malty low-grown one from the south. In the villages, coconut toddy is sold fresh in the evenings, and arrack, distilled from it, is the island’s spirit of choice.',
      },
      {
        type: 'image',
        photo: 'tea-pluckers',
        caption: 'Tea pluckers at work on an estate near Nuwara Eliya.',
      },
      {
        type: 'quote',
        text: '“Curry is not one recipe. It is what my mother did, and her mother, and what was cheap at the market this morning.”',
        cite: 'A home cook in Galle',
      },
      {
        type: 'p',
        text: 'A word on manners. Food is offered generously and refusing outright can seem cold, so take a little and leave a little. Wash your hands before and after eating, use the right hand for food, and do not be surprised when a host keeps topping up your plate long after you have stopped; a polite hand held over it is the signal that you have had enough.',
      },
      {
        type: 'p',
        text: 'Eat where it is busy, and eat what is fresh. Lunch is the moment for rice and curry, evening for hoppers and kottu. King coconut, the orange thambili sold from roadside carts, is the best cure for both heat and chilli. If you can, book a cookery class in a home kitchen, where you will grate coconut by hand on a low stool fitted with a serrated blade, and learn that the real secret of most curries is patience.',
      },
    ],
  },

  // ───────────────────────────── Heritage ─────────────────────────────
  {
    slug: 'exploring-the-ancient-city-of-sigiriya',
    title: 'Exploring the Ancient City of Sigiriya',
    dek: 'Sigiriya is more than a rock with a view. It was a royal city of gardens, moats and painted walls, and it rewards the traveller who reads it slowly before climbing it early.',
    category: 'Heritage',
    author: 'Ceylora Editors',
    publishedAt: '2026-04-09',
    readingMinutes: 4,
    cover: 'sigiriya-rockface',
    relatedDestinations: ['sigiriya', 'dambulla', 'polonnaruwa'],
    body: [
      {
        type: 'p',
        text: 'From the road, Sigiriya appears suddenly: a dark, sheer-sided block of rock about 200 metres high, rising out of flat forest as if it had been dropped there. Most visitors come to climb it, and they are right to. But the rock is only the centrepiece of a planned royal city, and the hours spent wandering the gardens and moats at its foot are as rewarding as the summit.',
      },
      { type: 'h2', text: 'A king and his rock' },
      {
        type: 'p',
        text: 'The story, as the Culavamsa chronicle tells it, is a dark one. In the late fifth century CE, Kashyapa, a son of King Dhatusena by a consort of lesser rank, seized the throne and, according to the chronicle, had his father walled up alive. Fearing the return of his half-brother Moggallana, the rightful heir, who had fled to India, Kashyapa moved his capital from Anuradhapura to this granite outcrop and built a palace on its summit. Some eighteen years later Moggallana came back with an army. Kashyapa rode out to meet him, and when the battle turned, he took his own life. The rock was given to the monks, and it remained a monastery for centuries before the forest closed over it.',
      },
      {
        type: 'p',
        text: 'The monks, in truth, were here first. Rock shelters around the base of Sigiriya and neighbouring Pidurangala carry inscriptions in early Brahmi script recording gifts of caves to the Buddhist community centuries before Kashyapa was born. His palace was a brief and brilliant interruption in a much longer religious story, which is part of what makes the site so absorbing. It was inscribed as a UNESCO World Heritage Site in 1982.',
      },
      { type: 'h2', text: 'Reading the gardens' },
      {
        type: 'p',
        text: 'Enter from the west and you cross a moat into the water gardens, laid out in strict symmetry along an axis that runs straight towards the rock. Pools, causeways and fountains fed by underground conduits survive here, and after heavy rain some of the fountains still bubble, more than fifteen centuries on. They are among the oldest surviving landscaped gardens in the world. Beyond them, the boulder gardens are wilder, a maze of huge rocks linked by paths and stairways, with the grooves cut for vanished timber buildings still visible on their tops. Then come the terraced gardens, and the first of the steps.',
      },
      {
        type: 'image',
        photo: 'sigiriya-water-gardens',
        caption: 'The royal water gardens, laid out on a straight axis towards the rock.',
      },
      { type: 'h2', text: 'The climb' },
      {
        type: 'p',
        text: 'The ascent is not technically difficult, but it is steep, exposed and hot by mid-morning. Partway up, a spiral staircase leads to a sheltered pocket of the western face where the famous frescoes survive: women, bare-shouldered and garlanded, holding flowers and rising from clouds. Scholars still argue over whether they are celestial nymphs, queens or attendants. Below them runs the Mirror Wall, once polished to a high gloss and covered in verses scratched by visitors between roughly the eighth and tenth centuries, a precious record of early Sinhala poetry. Many of the verses are addressed to the painted women above.',
      },
      {
        type: 'p',
        text: 'It is worth pausing here. The paintings may once have spread across much of the western face, and only a couple of dozen figures survive, their ochres and greens remarkably fresh after fifteen hundred years. Photography is not permitted at the frescoes, which only makes the few minutes in front of them more concentrated.',
      },
      {
        type: 'p',
        text: 'On a terrace near the top sit two giant carved paws, all that remains of the lion whose open mouth once formed the gateway to the palace. The final stretch is a metal stairway fixed to the rock. The summit is broader than you expect, a field of foundations, cisterns and terraces with a rock-cut pool that still holds water and the whole of the central plains laid out below. Look down and you can trace the geometry of the gardens you walked through an hour before.',
      },
      {
        type: 'quote',
        text: '“Everybody looks up at the rock. I tell them, look down also. The king was a builder of water before he was a builder of palaces.”',
        cite: 'A guide at Sigiriya',
      },
      { type: 'h2', text: 'When to go, and what to bring' },
      {
        type: 'p',
        text: 'Be at the gate when it opens, ideally on a weekday. By ten the stone is hot and the stairways are crowded, and there is little shade above the frescoes. Carry water, a hat and sunscreen, wear shoes with grip, and keep your voice down on the upper stairway, where hornet nests are flagged with warning signs. Allow three to four hours, and leave time for the museum near the entrance, which makes sense of much of what you will see.',
      },
      {
        type: 'p',
        text: 'Later in the day, climb neighbouring Pidurangala, a shorter, rougher scramble past a reclining Buddha to a boulder-top summit that faces Sigiriya itself. As the sun drops, the big rock turns the colour of copper, and you begin to understand why a king might choose it.',
      },
      { type: 'h2', text: 'Beyond the rock' },
      {
        type: 'p',
        text: 'Sigiriya makes an ideal base for the Cultural Triangle. The cave temple at Dambulla is twenty minutes away, its five painted sanctuaries cool even at midday. Polonnaruwa, with its great stone Buddhas and the circular Vatadage, is a little over an hour’s drive east. And from July to September, the elephants of the dry zone gather on the receding shores of the Minneriya reservoir, close enough for an afternoon safari after a morning on the rock.',
      },
      {
        type: 'image',
        photo: 'dambulla-colonnade',
        caption: 'The white colonnade of the Dambulla cave temple, beneath its overhanging rock.',
      },
    ],
  },

  // ───────────────────────────── Journeys ─────────────────────────────
  {
    slug: 'the-most-beautiful-train-journey-in-the-world',
    title: 'The Most Beautiful Train Journey in the World',
    dek: 'Seven hours of tea estates, tunnels and mountain stations, and a ridge-top run through the clouds. On the hill-country line from Kandy to Ella, the view is the whole point.',
    category: 'Journeys',
    author: 'Ceylora Editors',
    publishedAt: '2026-03-19',
    readingMinutes: 4,
    cover: 'train-to-ella',
    relatedDestinations: ['kandy', 'nuwara-eliya', 'haputale', 'ella'],
    body: [
      {
        type: 'p',
        text: 'There is a moment, somewhere beyond Ohiya, when the train comes out of a tunnel onto the edge of the hills and the whole of the south falls away beneath you. The line clings to the ridge. On one side, tea climbs into the cloud; on the other, the land drops into blue haze towards plains you may have crossed by car a week before. Passengers who have been dozing for an hour are suddenly crowding the doorways. Nobody says very much.',
      },
      {
        type: 'p',
        text: 'The ride from Kandy to Ella, on the main line that climbs from Colombo to Badulla, is often called the most beautiful train journey in the world. It is a big claim, but after seven hours of tea estates, waterfalls, mountain stations and mist, few people who ride it are inclined to argue.',
      },
      { type: 'h2', text: 'A line built for tea' },
      {
        type: 'p',
        text: 'The British built the railway in stages from the 1860s into the twentieth century, to carry coffee and then tea from the hills to the port at Colombo. It pushes through some of the most difficult terrain on the island, on gradients steep enough that the train often slows to little more than walking pace, to reach its summit near Pattipola, the highest station on the network at close to 1,900 metres. From there it descends in curves and loops to Ella and beyond. Past Ella it crosses the Nine Arch Bridge, completed in 1921, and at Demodara it famously curls around a hill and passes beneath its own track.',
      },
      { type: 'h2', text: 'Kandy to Nanu Oya' },
      {
        type: 'p',
        text: 'The first hours from Kandy are green and humid. The line runs through paddy and spice gardens, past Gampola and Nawalapitiya, and climbs in earnest towards Hatton, the railhead for Adam’s Peak. The sacred mountain, 2,243 metres high, is an hour or two away by road, and in its pilgrimage season, from December to May, the carriages fill with families heading for the night climb to the summit. After Hatton the tea takes over, bushes clipped flat in rows that ride over every slope, with white-walled factories and the line houses where estate workers live. At Nanu Oya, the stop for Nuwara Eliya, many passengers step down and new ones climb aboard with walking boots and flasks.',
      },
      {
        type: 'image',
        photo: 'nuwara-eliya-tea-estate',
        caption: 'Tea near Nanu Oya, the station for Nuwara Eliya.',
      },
      {
        type: 'p',
        text: 'The carriages are half the experience. Schoolchildren in white uniforms ride a stop or two and stare politely; monks in saffron take the seats that are always somehow kept free for them; a grandmother unwraps rice and curry from a banana leaf and insists you try some. Vendors swing through with baskets of vadai and paper cones of spiced chickpeas, calling their wares in a sing-song that carries the length of the train. At every station, hands reach out of the windows to buy from the platform.',
      },
      { type: 'h2', text: 'Over the top' },
      {
        type: 'p',
        text: 'Beyond Nanu Oya the scenery changes again. At the highest points the tea gives way to eucalyptus, pine and open grassland, the air turns cold, and the line crests near Pattipola before running down to Ohiya, where walkers alight for Horton Plains. Then comes the ridge: a string of tunnels, and a long, ledge-like run past Idalgashinna towards Haputale with the land falling away to the south. If you stand in a doorway for only one stretch of the journey, make it this one.',
      },
      {
        type: 'image',
        photo: 'haputale-railway',
        caption: 'The Badulla line running along the Haputale ridge.',
      },
      {
        type: 'p',
        text: 'From Haputale the train descends through Bandarawela and the drier hills of Uva to Ella and its small, tidy station. Many travellers end their journey here. If you can, stay aboard as far as Demodara, or walk out along the line to the Nine Arch Bridge and watch the next train come round the bend and across it, a slow parade of carriages and waving arms.',
      },
      {
        type: 'image',
        photo: 'train-demodara',
        caption: 'A train crossing the iron bridge into Demodara station, a few kilometres beyond Ella.',
      },
      { type: 'h2', text: 'How to ride it' },
      {
        type: 'p',
        text: 'Trains run daily in both directions, and the classic advice is to travel from Kandy towards Ella, so that the views build as you climb. There are three classes. First class, where it is offered, is either an air-conditioned carriage with sealed windows or an observation saloon at the end of the train; second and third class have open windows and doorways, which is where the photographs are taken. Reserved seats are released some weeks ahead and sell out quickly in high season, so book early, through your hotel or an agent if needed. Unreserved tickets can be bought on the day, but expect to stand for a while.',
      },
      {
        type: 'quote',
        text: '“Every day the same line, and every day different. The cloud decides what you see.”',
        cite: 'A railway guard on the Badulla line',
      },
      {
        type: 'p',
        text: 'Bring water and a few snacks, though you will rarely go hungry, and a light jacket for the cold stretch over the top. Sit on whichever side has a free window; the best of the view switches from left to right with every bend. If you stand in the doorways, keep a firm grip and pull your head in at tunnels and bridges. And give up any idea of keeping to time. The train will probably be late, and it will not matter in the least.',
      },
    ],
  },
];

export function getArticle(slug: string): JournalArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
