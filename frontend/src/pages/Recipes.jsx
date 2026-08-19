import { useState } from 'react';
import SpiceDoodleLayer from '../components/SpiceDoodles';

const RECIPES_DATA = [
  {
    id: 1,
    title: 'Royal Veg Shahi Pulao',
    category: 'Lunch',
    time: '25 mins',
    servings: '3-4 Persons',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    desc: 'Aromatic long-grain basmati rice infused with Agnitra whole spices, roasted cashews, and fresh saffron.',
    spicesUsed: ['Khadi Mirch', 'Sabut Dhaniya', 'Haldi Powder'],
    ingredients: [
      '2 cups Extra Long Basmati Rice',
      '1 tsp Agnitra Haldi (Turmeric Powder)',
      '2 Agnitra Khadi Mirch (Whole Red Chilli)',
      '1 tsp Agnitra Sabut Dhaniya (Crushed Coriander Seeds)',
      '1/2 cup Mixed Vegetables (Carrots, Peas, Beans)',
      '2 tbsp Pure Desi Ghee',
      'Cashews & Raisins for garnish'
    ],
    steps: [
      'Soak Basmati rice for 20 minutes and drain thoroughly.',
      'Heat 2 tbsp ghee in a heavy-bottomed handi. Add Agnitra Khadi Mirch and Sabut Dhaniya until aromatic.',
      'Add mixed vegetables, Agnitra Haldi powder, and sauté for 3 minutes.',
      'Add soaked rice, 3.5 cups water, salt to taste, and simmer on low heat for 12 minutes.',
      'Garnish with golden fried cashews and serve piping hot with raita!'
    ]
  },
  {
    id: 2,
    title: 'Aroma-Sealed Paneer Butter Masala',
    category: 'Dinner',
    time: '35 mins',
    servings: '4 Persons',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    desc: 'Rich & creamy cottage cheese gravy cooked in cashew-tomato purée and stone-ground Agnitra Lal Mirch.',
    spicesUsed: ['Lal Mirchi', 'Haldi Powder', 'Dhaniya Powder'],
    ingredients: [
      '250g Fresh Malai Paneer (cubed)',
      '1.5 tsp Agnitra Lal Mirchi (Red Chilli Powder)',
      '1 tsp Agnitra Dhaniya (Coriander Powder)',
      '1/2 tsp Agnitra Haldi (Turmeric Powder)',
      '3 Fresh Tomatoes & 10 Cashews (puréed)',
      '2 tbsp Butter & 1 tbsp Kasuri Methi'
    ],
    steps: [
      'Melt butter in a pan, add tomato-cashew purée and cook until oil separates.',
      'Add Agnitra Lal Mirchi, Dhaniya powder, and Haldi. Stir gently on medium flame.',
      'Pour 1/2 cup warm water, add paneer cubes, and simmer for 6 minutes.',
      'Crush Kasuri Methi between palms and sprinkle on top with a dash of fresh cream.'
    ]
  },
  {
    id: 3,
    title: 'Traditional Masala Chai',
    category: 'Breakfast',
    time: '10 mins',
    servings: '2 Cups',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    desc: 'Rejuvenating Indian tea brewed with fresh ginger, tulsi, and crushed Agnitra whole spices.',
    spicesUsed: ['Sabut Dhaniya', 'Khadi Mirch'],
    ingredients: [
      '1.5 cups Water & 1 cup Fresh Milk',
      '2 tsp CTC Tea Leaves',
      '1 inch Fresh Crushed Ginger',
      '1/2 tsp Agnitra Sabut Dhaniya (crushed)',
      '1 Green Cardamom & 1 Clove',
      'Sugar or Jaggery to taste'
    ],
    steps: [
      'Bring water to boil in a saucepan. Add crushed ginger and Agnitra Sabut Dhaniya.',
      'Add tea leaves and simmer for 3 minutes until deep amber.',
      'Pour milk and bring to a rolling boil twice for maximum flavor extraction.',
      'Strain into kulhads or cups and enjoy hot!'
    ]
  },
  {
    id: 4,
    title: 'Desi Tadka Dal Fry',
    category: 'Lunch',
    time: '25 mins',
    servings: '3 Persons',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    desc: 'Golden yellow lentils tempered in cow ghee, garlic, Agnitra Khadi Mirch, and organic Haldi.',
    spicesUsed: ['Haldi Powder', 'Khadi Mirch', 'Dhaniya Powder'],
    ingredients: [
      '1 cup Toor Dal (Pigeon Peas)',
      '1 tsp Agnitra Haldi (Turmeric Powder)',
      '2 Agnitra Khadi Mirch (Red Chilli)',
      '1 tsp Agnitra Dhaniya Powder',
      '2 tbsp Ghee & 5 Garlic Cloves',
      'Fresh Coriander Leaves'
    ],
    steps: [
      'Pressure cook toor dal with Agnitra Haldi, salt, and water for 4 whistles.',
      'Heat ghee in a pan for tadka. Add cumin, garlic, and Agnitra Khadi Mirch.',
      'Pour sizzling tadka over cooked dal, sprinkle Agnitra Dhaniya powder, and cover for 2 mins to lock aroma.',
      'Garnish with fresh coriander and serve with steamed rice.'
    ]
  },
  {
    id: 5,
    title: 'Crispy Samosa Chaat & Chutney',
    category: 'Snacks',
    time: '20 mins',
    servings: '2 Plates',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    desc: 'Crushed potato samosas drizzled with sweet tamarind chutney, curd, and roasted Agnitra Lal Mirch.',
    spicesUsed: ['Lal Mirchi', 'Dhaniya Powder'],
    ingredients: [
      '4 Fresh Crispy Samosas',
      '1 cup Cooked White Chickpea Curry (Chole)',
      '1 tsp Agnitra Lal Mirchi (Red Chilli)',
      '1 tsp Agnitra Dhaniya Powder',
      '1/2 cup Sweet Curd & Tamarind Chutney',
      'Fine Sev & Chopped Onions'
    ],
    steps: [
      'Break 2 samosas into a wide plate. Ladle hot chole curry over them.',
      'Drizzle sweetened curd, green chutney, and sweet tamarind chutney.',
      'Dust with Agnitra Lal Mirchi and Dhaniya powder for instant zing.',
      'Top with fine sev and pomegranate seeds.'
    ]
  },
  {
    id: 6,
    title: 'Special Hyderabadi Dum Biryani',
    category: 'Dinner',
    time: '50 mins',
    servings: '5 Persons',
    difficulty: 'Expert',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    desc: 'Authentic royal dum biryani cooked with Agnitra stone-ground spices and saffron dum layer.',
    spicesUsed: ['Lal Mirchi', 'Haldi Powder', 'Khadi Mirch', 'Sabut Dhaniya'],
    ingredients: [
      '3 cups Saffron Basmati Rice',
      '2 tsp Agnitra Lal Mirchi',
      '1 tsp Agnitra Haldi',
      '3 Agnitra Khadi Mirch',
      '1 tbsp Agnitra Sabut Dhaniya',
      'Fried Onions (Birista) & Ghee'
    ],
    steps: [
      'Parboil basmati rice with whole spices until 70% done.',
      'Layer spicy vegetable/paneer gravy marinated with Agnitra Lal Mirchi & Haldi.',
      'Cover with rice, saffron milk, mint leaves, and fried onions.',
      'Seal the handi edge with dough and cook on dum (slow flame) for 25 minutes.'
    ]
  },

  /* ---------------- BREAKFAST ---------------- */
  {
    id: 7,
    title: 'Kanda Poha with Haldi Tadka',
    category: 'Breakfast',
    time: '15 mins',
    servings: '2 Persons',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80',
    desc: 'Feather-light flattened rice tossed with onions, curry leaves and cold ground Agnitra Haldi for that classic golden colour.',
    spicesUsed: ['Haldi Powder', 'Khadi Mirch'],
    ingredients: [
      '2 cups Thick Poha (flattened rice)',
      '1/2 tsp Agnitra Haldi (Turmeric Powder)',
      '1 Agnitra Khadi Mirch (Whole Red Chilli)',
      '1 large Onion (finely chopped)',
      '1 tsp Mustard Seeds & 10 Curry Leaves',
      '2 tbsp Peanuts, Lemon & Fresh Coriander'
    ],
    steps: [
      'Rinse poha in a colander until just soft, sprinkle salt and sugar, and set aside to fluff up.',
      'Heat oil, crackle mustard seeds, add curry leaves, peanuts and a torn Agnitra Khadi Mirch.',
      'Add onions and sauté until translucent, then stir in Agnitra Haldi for 10 seconds so it blooms without burning.',
      'Fold in the drained poha gently, cover for 2 minutes on low flame, and finish with lemon juice and coriander.'
    ]
  },
  {
    id: 8,
    title: 'Punjabi Aloo Paratha',
    category: 'Breakfast',
    time: '30 mins',
    servings: '3 Persons',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    desc: 'Whole-wheat flatbread stuffed with spiced potato masala, griddled in desi ghee and served with white butter and curd.',
    spicesUsed: ['Lal Mirchi', 'Dhaniya Powder', 'Haldi Powder'],
    ingredients: [
      '3 cups Whole Wheat Atta (kneaded soft)',
      '4 boiled Potatoes (coarsely mashed)',
      '1 tsp Agnitra Lal Mirchi (Red Chilli Powder)',
      '1 tsp Agnitra Dhaniya (Coriander Powder)',
      '1/4 tsp Agnitra Haldi (Turmeric Powder)',
      'Ajwain, Green Chilli, Ginger & Desi Ghee'
    ],
    steps: [
      'Mix mashed potatoes with Agnitra Lal Mirchi, Dhaniya powder, Haldi, grated ginger, ajwain and salt.',
      'Roll a small disc of dough, place a ball of stuffing in the centre, and seal the edges carefully.',
      'Dust with flour and roll out gently to a 7-inch paratha without tearing the seal.',
      'Roast on a hot tawa, smear ghee on both sides, and cook till golden brown spots appear. Serve with curd and pickle.'
    ]
  },
  {
    id: 9,
    title: 'Besan Chilla with Dhaniya',
    category: 'Breakfast',
    time: '15 mins',
    servings: '2 Persons',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    desc: 'High-protein gram flour pancakes flecked with vegetables and cold ground Agnitra Dhaniya — ready in under fifteen minutes.',
    spicesUsed: ['Dhaniya Powder', 'Haldi Powder', 'Lal Mirchi'],
    ingredients: [
      '1 cup Besan (Gram Flour)',
      '1 tsp Agnitra Dhaniya (Coriander Powder)',
      '1/4 tsp Agnitra Haldi (Turmeric Powder)',
      '1/2 tsp Agnitra Lal Mirchi (Red Chilli Powder)',
      '1 small Onion, Tomato & Capsicum (finely chopped)',
      'Fresh Coriander Leaves & Oil for roasting'
    ],
    steps: [
      'Whisk besan with water into a smooth, flowing batter with no lumps.',
      'Stir in Agnitra Dhaniya, Haldi, Lal Mirchi, salt and all the chopped vegetables.',
      'Pour a ladle onto a hot non-stick tawa and spread into a thin round chilla.',
      'Drizzle oil around the edges, flip once golden, and serve hot with green chutney.'
    ]
  },
  {
    id: 10,
    title: 'South Indian Rava Upma',
    category: 'Breakfast',
    time: '20 mins',
    servings: '3 Persons',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    desc: 'Fluffy roasted semolina tempered with curry leaves, cashews and whole Agnitra Khadi Mirch for a gentle warmth.',
    spicesUsed: ['Khadi Mirch', 'Haldi Powder'],
    ingredients: [
      '1 cup Roasted Rava (Semolina)',
      '2 Agnitra Khadi Mirch (Whole Red Chilli)',
      '1/4 tsp Agnitra Haldi (Turmeric Powder)',
      '1 Onion, 1 Carrot & 1/4 cup Green Peas',
      '1 tsp Urad Dal, Mustard Seeds & Curry Leaves',
      '2 tbsp Ghee & Cashew Nuts'
    ],
    steps: [
      'Dry roast rava on low flame until it smells nutty, then keep aside.',
      'Heat ghee, crackle mustard seeds, urad dal, cashews, curry leaves and Agnitra Khadi Mirch.',
      'Add onions and vegetables with Agnitra Haldi, sauté 3 minutes, then pour in 2.5 cups hot water and salt.',
      'Lower the flame and rain in the rava while stirring continuously. Cover 3 minutes and fluff before serving.'
    ]
  },

  /* ---------------- LUNCH ---------------- */
  {
    id: 11,
    title: 'Punjabi Rajma Masala',
    category: 'Lunch',
    time: '40 mins',
    servings: '4 Persons',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    desc: 'Slow-simmered kidney beans in a thick onion-tomato masala built on cold ground Agnitra Dhaniya and Lal Mirchi.',
    spicesUsed: ['Lal Mirchi', 'Dhaniya Powder', 'Haldi Powder'],
    ingredients: [
      '1.5 cups Rajma (soaked overnight)',
      '1.5 tsp Agnitra Dhaniya (Coriander Powder)',
      '1 tsp Agnitra Lal Mirchi (Red Chilli Powder)',
      '1/2 tsp Agnitra Haldi (Turmeric Powder)',
      '2 Onions & 3 Tomatoes (puréed)',
      'Ginger-Garlic Paste, Ghee & Kasuri Methi'
    ],
    steps: [
      'Pressure cook soaked rajma with salt and Agnitra Haldi for 5-6 whistles until completely soft.',
      'Brown the onion paste in ghee, add ginger-garlic, then tomato purée and cook until oil separates.',
      'Add Agnitra Dhaniya and Lal Mirchi, roast the masala for one minute so the cold ground oils release fully.',
      'Tip in the rajma with its stock, mash a few beans to thicken, and simmer 15 minutes. Finish with kasuri methi.'
    ]
  },
  {
    id: 12,
    title: 'Rajasthani Kadhi Pakora',
    category: 'Lunch',
    time: '35 mins',
    servings: '4 Persons',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    desc: 'Tangy curd and besan kadhi crowned with soft onion pakoras and a fiery Agnitra Khadi Mirch tadka.',
    spicesUsed: ['Haldi Powder', 'Khadi Mirch', 'Lal Mirchi'],
    ingredients: [
      '2 cups Sour Curd & 1/2 cup Besan',
      '1 tsp Agnitra Haldi (Turmeric Powder)',
      '2 Agnitra Khadi Mirch (Whole Red Chilli)',
      '1 tsp Agnitra Lal Mirchi (for the tadka)',
      '1 Onion (sliced, for pakoras)',
      'Fenugreek Seeds, Cumin & Ghee'
    ],
    steps: [
      'Whisk curd, besan, Agnitra Haldi, salt and 4 cups water into a lump-free kadhi base.',
      'Simmer on low flame for 25 minutes, stirring often, until it thickens and loses its raw besan taste.',
      'Fry onion-besan pakoras until golden and drop them into the simmering kadhi.',
      'For the tadka, heat ghee, crackle cumin and fenugreek with Agnitra Khadi Mirch, switch off, stir in Agnitra Lal Mirchi and pour over.'
    ]
  },
  {
    id: 13,
    title: 'Amritsari Chole Masala',
    category: 'Lunch',
    time: '40 mins',
    servings: '4 Persons',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    desc: 'Dark, robust chickpea curry where whole Agnitra Sabut Dhaniya is freshly crushed for maximum citrusy aroma.',
    spicesUsed: ['Sabut Dhaniya', 'Lal Mirchi', 'Haldi Powder'],
    ingredients: [
      '2 cups Kabuli Chana (soaked overnight)',
      '1 tbsp Agnitra Sabut Dhaniya (dry roasted & crushed)',
      '1.5 tsp Agnitra Lal Mirchi (Red Chilli Powder)',
      '1/2 tsp Agnitra Haldi (Turmeric Powder)',
      '2 Onions, 3 Tomatoes & 2 Tea Bags',
      'Anardana, Ginger Juliennes & Oil'
    ],
    steps: [
      'Pressure cook chana with salt and two tea bags — the tea gives chole its signature dark colour.',
      'Dry roast Agnitra Sabut Dhaniya on a tawa until fragrant, cool, and crush coarsely.',
      'Sauté onion paste till deep brown, add tomatoes, then the crushed dhaniya, Agnitra Lal Mirchi and Haldi.',
      'Add the chana with stock, mash lightly, and simmer 15 minutes. Top with ginger juliennes and serve with bhature or kulcha.'
    ]
  },
  {
    id: 14,
    title: 'Bhindi Do Pyaza',
    category: 'Lunch',
    time: '25 mins',
    servings: '3 Persons',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    desc: 'Crisp okra stir-fried with double onions and a dry masala of Agnitra Dhaniya, Haldi and Lal Mirchi.',
    spicesUsed: ['Dhaniya Powder', 'Haldi Powder', 'Lal Mirchi'],
    ingredients: [
      '500g Fresh Bhindi (Okra, cut in fingers)',
      '2 tsp Agnitra Dhaniya (Coriander Powder)',
      '1 tsp Agnitra Lal Mirchi (Red Chilli Powder)',
      '1/2 tsp Agnitra Haldi (Turmeric Powder)',
      '3 Onions (thickly sliced)',
      'Amchur Powder, Cumin Seeds & Mustard Oil'
    ],
    steps: [
      'Wash and dry the bhindi completely — any moisture makes it slimy. Cut into 2-inch fingers.',
      'Heat mustard oil till it smokes, add cumin, then the bhindi. Fry uncovered on high flame for 8 minutes.',
      'Add sliced onions and cook until the edges char slightly.',
      'Sprinkle Agnitra Dhaniya, Lal Mirchi, Haldi, salt and amchur. Toss for 3 minutes and serve dry with roti.'
    ]
  },

  /* ---------------- DINNER ---------------- */
  {
    id: 15,
    title: 'Dhaba-Style Dal Makhani',
    category: 'Dinner',
    time: '55 mins',
    servings: '4 Persons',
    difficulty: 'Expert',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    desc: 'Black urad dal simmered for hours with butter, cream and Agnitra Lal Mirchi for that deep restaurant-style finish.',
    spicesUsed: ['Lal Mirchi', 'Haldi Powder', 'Khadi Mirch'],
    ingredients: [
      '1 cup Whole Black Urad Dal & 1/4 cup Rajma',
      '1.5 tsp Agnitra Lal Mirchi (Red Chilli Powder)',
      '1/2 tsp Agnitra Haldi (Turmeric Powder)',
      '2 Agnitra Khadi Mirch (Whole Red Chilli)',
      '3 tbsp White Butter & 1/2 cup Fresh Cream',
      'Ginger-Garlic Paste & Tomato Purée'
    ],
    steps: [
      'Soak urad dal and rajma overnight, then pressure cook with Agnitra Haldi and salt for 7-8 whistles until creamy.',
      'In butter, sauté ginger-garlic paste, tomato purée and Agnitra Lal Mirchi until the fat separates.',
      'Add the cooked dal and simmer uncovered on the lowest flame for 30-40 minutes, mashing occasionally.',
      'Stir in cream and a final knob of butter. Smoke with charcoal and Agnitra Khadi Mirch for an authentic dhungar finish.'
    ]
  },
  {
    id: 16,
    title: 'Kadai Paneer with Sabut Dhaniya',
    category: 'Dinner',
    time: '30 mins',
    servings: '4 Persons',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    desc: 'Semi-dry paneer and capsicum tossed in freshly pounded kadai masala — the recipe that shows off Agnitra Sabut Dhaniya best.',
    spicesUsed: ['Sabut Dhaniya', 'Khadi Mirch', 'Lal Mirchi'],
    ingredients: [
      '300g Paneer (cut in thick fingers)',
      '2 tbsp Agnitra Sabut Dhaniya (whole coriander seeds)',
      '3 Agnitra Khadi Mirch (Whole Red Chilli)',
      '1 tsp Agnitra Lal Mirchi (Red Chilli Powder)',
      '2 Capsicum & 2 Onions (diced in cubes)',
      '3 Tomatoes, Ginger Juliennes & Kasuri Methi'
    ],
    steps: [
      'Dry roast Agnitra Sabut Dhaniya with Agnitra Khadi Mirch, cool, and pound coarsely — this is your fresh kadai masala.',
      'In a kadai, sauté onion and capsicum cubes on high flame for 2 minutes so they stay crunchy. Remove and reserve.',
      'Cook chopped tomatoes with the pounded masala and Agnitra Lal Mirchi until thick and glossy.',
      'Return the vegetables, add paneer and kasuri methi, toss for 3 minutes, and garnish with ginger juliennes.'
    ]
  },
  {
    id: 17,
    title: 'Palak Paneer Heritage Style',
    category: 'Dinner',
    time: '35 mins',
    servings: '4 Persons',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?auto=format&fit=crop&w=800&q=80',
    desc: 'Vibrant green spinach gravy with soft paneer cubes, kept bright by blanching and finished with Agnitra Dhaniya.',
    spicesUsed: ['Dhaniya Powder', 'Haldi Powder', 'Lal Mirchi'],
    ingredients: [
      '2 large bunches Fresh Palak (Spinach)',
      '250g Paneer (cubed)',
      '1 tsp Agnitra Dhaniya (Coriander Powder)',
      '1/2 tsp Agnitra Haldi (Turmeric Powder)',
      '1 tsp Agnitra Lal Mirchi (Red Chilli Powder)',
      'Garlic, Green Chilli, Cream & Butter'
    ],
    steps: [
      'Blanch the palak for 2 minutes, then plunge into ice water — this locks in the bright green colour.',
      'Purée the blanched spinach with green chilli into a smooth paste.',
      'In butter, sauté garlic, add Agnitra Dhaniya, Haldi and Lal Mirchi, and roast the masala for 30 seconds.',
      'Add the purée, simmer just 5 minutes (over-cooking dulls the colour), fold in paneer and swirl in cream.'
    ]
  },
  {
    id: 18,
    title: 'Malai Kofta Shahi Curry',
    category: 'Dinner',
    time: '45 mins',
    servings: '4 Persons',
    difficulty: 'Expert',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    desc: 'Golden paneer-potato dumplings resting in a silky cashew gravy tinted with cold ground Agnitra Haldi and Lal Mirchi.',
    spicesUsed: ['Haldi Powder', 'Lal Mirchi', 'Dhaniya Powder'],
    ingredients: [
      '200g Paneer & 2 boiled Potatoes (for koftas)',
      '1/2 tsp Agnitra Haldi (Turmeric Powder)',
      '1 tsp Agnitra Lal Mirchi (Red Chilli Powder)',
      '1 tsp Agnitra Dhaniya (Coriander Powder)',
      '15 Cashews & 1/4 cup Fresh Cream',
      'Cornflour, Raisins & Oil for frying'
    ],
    steps: [
      'Grate paneer and potatoes, season with salt and a pinch of Agnitra Haldi, bind with cornflour and shape into koftas stuffed with raisins.',
      'Deep fry the koftas on medium heat until evenly golden, then drain on paper.',
      'Blend soaked cashews with onion-tomato base, cook in ghee, and add Agnitra Lal Mirchi and Dhaniya powder.',
      'Finish the gravy with cream, and add the koftas only just before serving so they stay soft outside and firm within.'
    ]
  }
];

/* Local Agnitra fallbacks so a slow or blocked recipe photo never leaves a broken image */
const SPICE_FALLBACK_IMAGES = {
  'Lal Mirchi': '/images/chilli.jpeg',
  'Haldi Powder': '/images/turmeric.jpeg',
  'Dhaniya Powder': '/images/corainder.jpeg',
  'Khadi Mirch': '/images/khadi_mirch.png',
  'Sabut Dhaniya': '/images/sabut_dhaniya.png'
};

const getRecipeFallbackImage = (recipe) =>
  SPICE_FALLBACK_IMAGES[recipe.spicesUsed && recipe.spicesUsed[0]] || '/images/Agnitra-home.png';

function Recipes({ navigateTo }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeRecipeModal, setActiveRecipeModal] = useState(null);

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  const filteredRecipes = selectedCategory === 'All' 
    ? RECIPES_DATA 
    : RECIPES_DATA.filter(r => r.category === selectedCategory);

  return (
    <div className="recipes-page section doodle-host" style={{ padding: '40px 0 80px 0', background: 'var(--bg-primary)' }}>
      <SpiceDoodleLayer variant="page" doodles={['cinnamon', 'cardamom', 'starAnise', 'garlic', 'chilli', 'bayleaf']} />
      <div className="container">
        
        {/* Page Header */}
        <div className="section-title-wrapper text-center" style={{ marginBottom: '36px' }}>
          <span className="section-subtitle" style={{ color: '#3b6e28', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>Traditional Culinary Inspiration</span>
          <h1 className="main-headline-title" style={{ fontFamily: 'var(--font-title)', fontSize: '2.4rem', color: '#1b2e13', margin: '8px 0' }}>Authentic Spice Recipes</h1>
          <p className="main-headline-sub" style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>Discover delicious home-style Indian dishes made superior with 100% pure Agnitra cold ground spices.</p>
        </div>

        {/* Category Filter Pills */}
        <div className="category-filter-pills" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '50px',
                border: selectedCategory === cat ? 'none' : '1.5px solid #dcd3c1',
                background: selectedCategory === cat ? '#2b3e1b' : '#ffffff',
                color: selectedCategory === cat ? '#ffffff' : '#1b2e13',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="recipes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
          {filteredRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="recipe-card animate-fade-in"
              onClick={() => setActiveRecipeModal(recipe)}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1.5px solid #ede6d8',
                boxShadow: '0 10px 30px rgba(37, 29, 24, 0.06)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}
            >
              <div>
                <div className="recipe-img-box" style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    loading="lazy"
                    onError={(e) => {
                      const fallback = getRecipeFallbackImage(recipe);
                      if (!e.currentTarget.src.endsWith(fallback)) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  <span style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(27, 46, 19, 0.85)', backdropFilter: 'blur(4px)', color: '#ffffff', padding: '4px 12px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase' }}>
                    {recipe.category}
                  </span>
                  <span style={{ position: 'absolute', top: '14px', right: '14px', background: '#ffffff', color: '#1b2e13', padding: '4px 12px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: '800', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    ⏱ {recipe.time}
                  </span>
                </div>

                <div className="recipe-card-content" style={{ padding: '22px' }}>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.3rem', fontWeight: '800', color: '#1b2e13', marginBottom: '8px', lineHeight: '1.3' }}>
                    {recipe.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '16px' }}>
                    {recipe.desc}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {recipe.spicesUsed.map((spice, idx) => (
                      <span key={idx} style={{ background: 'rgba(59, 110, 40, 0.08)', color: '#3b6e28', border: '1px solid #3b6e28', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '700' }}>
                        🌿 {spice}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 22px 22px 22px' }}>
                <button 
                  type="button"
                  className="btn" 
                  style={{ width: '100%', background: '#faf6f0', border: '1.5px solid #dcd3c1', color: '#1b2e13', padding: '10px', borderRadius: '12px', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  View Full Recipe &amp; Steps →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Details Modal Popup */}
      {activeRecipeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div className="animate-fade-in" style={{ background: '#ffffff', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '28px', padding: '32px', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
            
            <button 
              type="button"
              onClick={() => setActiveRecipeModal(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: '#faf6f0', border: 'none', width: '36px', height: '36px', borderRadius: '50%', fontSize: '1.2rem', fontWeight: '800', color: '#1b2e13', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ background: '#3b6e28', color: '#ffffff', padding: '4px 12px', borderRadius: '50px', fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase' }}>
                {activeRecipeModal.category}
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '700' }}>
                ⏱ {activeRecipeModal.time} • 👥 Serves {activeRecipeModal.servings}
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', fontWeight: '800', color: '#1b2e13', marginBottom: '12px' }}>
              {activeRecipeModal.title}
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '24px' }}>
              {activeRecipeModal.desc}
            </p>

            {/* Ingredients List */}
            <div style={{ background: '#faf6f0', borderRadius: '18px', padding: '20px', marginBottom: '24px', border: '1px solid #ede6d8' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: '800', textTransform: 'uppercase', color: '#1b2e13', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🥣 Required Ingredients:
              </h4>
              <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {activeRecipeModal.ingredients.map((ing, i) => (
                  <li key={i} style={{ fontWeight: ing.includes('Agnitra') ? '800' : '500', color: ing.includes('Agnitra') ? '#3b6e28' : 'inherit' }}>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cooking Steps */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: '800', textTransform: 'uppercase', color: '#1b2e13', marginBottom: '14px' }}>
                🍳 Cooking Instructions:
              </h4>
              <ol style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.65' }}>
                {activeRecipeModal.steps.map((step, i) => (
                  <li key={i} style={{ marginBottom: '10px' }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ flex: 1, padding: '14px', background: '#2b3e1b', color: '#ffffff', borderRadius: '12px', fontWeight: '800' }}
                onClick={() => { setActiveRecipeModal(null); navigateTo('shop'); }}
              >
                Buy Agnitra Spices Used →
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Recipes;
