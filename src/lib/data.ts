import type { GalleryImage, MenuItem, Testimonial, TimelineEntry } from "@/types";

export const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: "burrata-heirloom",
    name: "Burrata & Heirloom Tomatoes",
    description:
      "Cream-fed burrata, slow-roasted heirloom tomatoes, basil oil, aged balsamic, charred sourdough crumb.",
    price: 18,
    category: "starters",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    tags: ["vegetarian"],
    spiceLevel: 0,
  },
  {
    id: "truffle-mushroom-soup",
    name: "Truffle Mushroom Soup",
    description:
      "Wild mushroom velouté finished tableside with black truffle shavings and a thread of brown butter.",
    price: 16,
    category: "starters",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    tags: ["vegetarian", "signature"],
    spiceLevel: 0,
  },
  {
    id: "crispy-calamari",
    name: "Crispy Calamari",
    description:
      "Semolina-dusted calamari, charred lemon, saffron aioli, a whisper of Calabrian chili.",
    price: 19,
    category: "starters",
    image: "https://images.unsplash.com/photo-1625944525533-473f1b3d54e7",
    spiceLevel: 1,
  },

  // Mains
  {
    id: "wagyu-ribeye",
    name: "Wagyu Ribeye Steak",
    description:
      "Live-fire grilled A5 wagyu, smoked bone marrow butter, charred shallot, ember-roasted jus.",
    price: 68,
    category: "mains",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
    tags: ["signature", "for two"],
    spiceLevel: 0,
  },
  {
    id: "atlantic-salmon",
    name: "Grilled Atlantic Salmon",
    description:
      "Cedar-smoked salmon, citrus-saffron beurre blanc, charred fennel, sea fennel oil.",
    price: 42,
    category: "mains",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
    spiceLevel: 0,
  },
  {
    id: "truffle-pasta",
    name: "Truffle Pasta",
    description:
      "Hand-cut tagliolini, black truffle, aged parmesan, brown butter, cracked pepper.",
    price: 36,
    category: "mains",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    tags: ["vegetarian"],
    spiceLevel: 0,
  },
  {
    id: "gourmet-burger",
    name: "Gourmet Burger",
    description:
      "Dry-aged beef, smoked cheddar, ember-charred onion, saffron aioli, brioche bun.",
    price: 28,
    category: "mains",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    spiceLevel: 1,
  },

  // Desserts
  {
    id: "chocolate-lava-cake",
    name: "Chocolate Lava Cake",
    description: "Valrhona dark chocolate, molten saffron-honey core, smoked sea salt.",
    price: 14,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    tags: ["signature"],
    spiceLevel: 0,
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    description: "Espresso-soaked savoiardi, mascarpone cream, cocoa dust, marsala.",
    price: 12,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
    spiceLevel: 0,
  },
  {
    id: "cheesecake",
    name: "Cheesecake",
    description: "Vanilla bean cheesecake, charred fig compote, almond crumble.",
    price: 13,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad",
    spiceLevel: 0,
  },

  // Drinks
  {
    id: "signature-mocktail",
    name: "Signature Mocktail",
    description: "Saffron-infused citrus, rosemary smoke, soda, dehydrated orange.",
    price: 10,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd",
    tags: ["signature"],
    spiceLevel: 0,
  },
  {
    id: "citrus-juice",
    name: "Fresh Citrus Juice",
    description: "Hand-pressed blood orange, grapefruit and lime, mint.",
    price: 8,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b",
    spiceLevel: 0,
  },
  {
    id: "premium-coffee",
    name: "Premium Coffee",
    description: "Single-origin pour-over, roasted in-house, served tableside.",
    price: 7,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    spiceLevel: 0,
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    alt: "Dim, candlelit dining room at Saffron & Ember",
    caption: "The main room, after dark",
    span: "wide",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947",
    alt: "Signature plated dish with garnish",
    caption: "The signature plate",
    span: "tall",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    alt: "Fine dining interior with warm lighting",
    caption: "Fine dining interior",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1583394293214-28ded15ee548",
    alt: "Portrait of the executive chef",
    caption: "Chef Dev Kapoor, at pass",
    span: "tall",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    alt: "Dessert showcase",
    caption: "The dessert trolley",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3",
    alt: "Wine collection in the cellar",
    caption: "The cellar",
    span: "wide",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    alt: "Restaurant interior seating",
    caption: "The west room",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
    alt: "Wagyu ribeye, fire-grilled",
    caption: "Live fire, every night",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Eleanor Voss",
    role: "The Gourmet Observer",
    quote:
      "A restaurant that understands restraint. Every plate at Saffron & Ember arrives having already made its case — no garnish wasted, no flavor competing for attention it hasn't earned.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Marcus Webb",
    role: "Resident, Three Years Running",
    quote:
      "I've brought every important dinner of my life here. The wagyu ribeye alone is worth the drive, but it's the room — low light, low noise, total attention — that keeps me coming back.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Priya Anand",
    role: "Culinary Society Quarterly",
    quote:
      "Chef Kapoor treats saffron the way other kitchens treat salt — present in nearly everything, never overpowering anything. It's a quiet kind of mastery.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Julian Ferro",
    role: "First-Time Guest",
    quote:
      "I expected a meal. I left with a memory of the smoke on the ribeye, the hush of the dining room, and a dessert course that somehow made dessert feel architectural.",
    rating: 5,
  },
];

export const CHEF_TIMELINE: TimelineEntry[] = [
  {
    year: "2009",
    title: "Le Cordon Bleu, Lyon",
    description: "Graduated top of cohort, specializing in classical French technique.",
  },
  {
    year: "2012",
    title: "Sous Chef, Embered — Copenhagen",
    description: "Trained under live-fire pioneers, mastering wood and coal as primary seasoning.",
  },
  {
    year: "2016",
    title: "Smoke & Spice Route — Mumbai",
    description: "Opened a sold-out pop-up tracing the saffron trade from Kashmir to the coast.",
  },
  {
    year: "2019",
    title: "Saffron & Ember Opens",
    description: "Founded the restaurant on a single idea: fire as technique, saffron as thread.",
  },
  {
    year: "2022",
    title: "Awarded One Michelin Star",
    description: "Recognized for a menu that refuses to separate comfort from craft.",
  },
  {
    year: "2024",
    title: "World's 50 Best — Discovery List",
    description: "Named among the most distinctive new fine dining voices in the region.",
  },
];
