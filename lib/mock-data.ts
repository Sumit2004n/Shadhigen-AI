import type {
  EventDetail,
  ShoppingGuideItem,
  TeamMember,
  Vendor,
} from "@/types/wedding";

export const VENDORS: Vendor[] = [
  {
    id: "v1",
    name: "Dilwale Frames Studio",
    category: "Photographer",
    location: "Hauz Khas, Delhi",
    priceRange: { min: 150000, max: 450000 },
    rating: 4.9,
    reviewsCount: 312,
    imageUrl: "gradient:amber",
    tags: ["Cinematic Films", "Drone Coverage", "Same-Day Edit"],
    negotiatedDeal: "Free pre-wedding teaser reel worth ₹35,000",
  },
  {
    id: "v2",
    name: "Shutter Shaadi Co.",
    category: "Photographer",
    location: "Bandra, Mumbai",
    priceRange: { min: 80000, max: 220000 },
    rating: 4.7,
    reviewsCount: 189,
    imageUrl: "gradient:rose",
    tags: ["Candid", "Traditional", "Album Included"],
    negotiatedDeal: "12% off on 3-day full coverage",
  },
  {
    id: "v3",
    name: "Rajwada Caterers",
    category: "Caterer",
    location: "Chandni Chowk, Delhi",
    priceRange: { min: 900, max: 2800 },
    rating: 4.8,
    reviewsCount: 540,
    imageUrl: "gradient:emerald",
    tags: ["Live Chaat Counter", "Awadhi Cuisine", "Jain Menu"],
    negotiatedDeal: "Complimentary dessert counter for 200+ plates",
  },
  {
    id: "v4",
    name: "Zaika-e-Shaadi Kitchens",
    category: "Caterer",
    location: "Jubilee Hills, Hyderabad",
    priceRange: { min: 1400, max: 4200 },
    rating: 4.6,
    reviewsCount: 267,
    imageUrl: "gradient:gold",
    tags: ["Hyderabadi Dum Biryani", "Multi-Cuisine", "Live Grills"],
    negotiatedDeal: "Free mocktail bar upgrade worth ₹60,000",
  },
  {
    id: "v5",
    name: "Phool Bagh Decor",
    category: "Decorator",
    location: "Udaipur, Rajasthan",
    priceRange: { min: 350000, max: 1800000 },
    rating: 4.9,
    reviewsCount: 145,
    imageUrl: "gradient:rose",
    tags: ["Floral Mandap", "Palace Weddings", "LED Dance Floor"],
    negotiatedDeal: "Free vidaai flower shower setup",
  },
  {
    id: "v6",
    name: "Roshni Events & Decor",
    category: "Decorator",
    location: "Koramangala, Bengaluru",
    priceRange: { min: 120000, max: 600000 },
    rating: 4.5,
    reviewsCount: 203,
    imageUrl: "gradient:emerald",
    tags: ["Pastel Themes", "Eco-Friendly", "Photo Booths"],
    negotiatedDeal: "10% off + free haldi backdrop",
  },
  {
    id: "v7",
    name: "Gulaab Glow Artistry",
    category: "Makeup Artist",
    location: "South Extension, Delhi",
    priceRange: { min: 45000, max: 150000 },
    rating: 4.8,
    reviewsCount: 421,
    imageUrl: "gradient:gold",
    tags: ["HD Bridal", "Airbrush", "Hair Styling"],
    negotiatedDeal: "Free engagement-look trial session",
  },
  {
    id: "v8",
    name: "Noor Makeovers",
    category: "Makeup Artist",
    location: "Aundh, Pune",
    priceRange: { min: 25000, max: 80000 },
    rating: 4.6,
    reviewsCount: 158,
    imageUrl: "gradient:amber",
    tags: ["Minimal Glam", "South Indian Bridal", "On-Site Team"],
    negotiatedDeal: "Complimentary mehendi-day touch-up",
  },
];

export const SHOPPING_GUIDE: ShoppingGuideItem[] = [
  {
    id: "s1",
    shopName: "Asiana Couture",
    hubLocation: "Chandni Chowk, Delhi",
    specialty: "Designer Bridal Lehengas · Zardozi & Dabka Work",
    priceBucket: "Luxury (₹1.5L+)",
    address: "1577, Dariba Kalan Road, Chandni Chowk, Delhi 110006",
    rating: 4.8,
    featuredArticleSnippet:
      "The crown jewel of Chandni Chowk bridal couture — brides travel from London and Dubai for Asiana's hand-embroidered zardozi lehengas and celebrity-grade trousseau styling.",
    image: "gradient:rose",
  },
  {
    id: "s2",
    shopName: "Krazzy Fashion",
    hubLocation: "Chandni Chowk, Delhi",
    specialty: "Pastel Organza & Contemporary Indo-Western",
    priceBucket: "Mid-Range (₹50k-1.5L)",
    address: "2104, First Floor, Katra Babel, Chandni Chowk, Delhi 110006",
    rating: 4.6,
    featuredArticleSnippet:
      "Instagram's favourite Chandni Chowk find — pastel organza lehengas and cocktail gowns that look designer-label at half the price.",
    image: "gradient:emerald",
  },
  {
    id: "s3",
    shopName: "Om Prakash Jawahar Lal",
    hubLocation: "Chandni Chowk, Delhi",
    specialty: "Heritage Banarasi Silks & Classic Red Bridal",
    priceBucket: "Luxury (₹1.5L+)",
    address: "1178, Kucha Mahajani, Chandni Chowk, Delhi 110006",
    rating: 4.9,
    featuredArticleSnippet:
      "A 100-year-old institution since 1923 — the go-to house for timeless red bridal lehengas and pure Banarasi silk that gets passed down generations.",
    image: "gradient:gold",
  },
  {
    id: "s4",
    shopName: "Shree Shivam Sarees",
    hubLocation: "Chandni Chowk, Delhi",
    specialty: "Budget Bridal Sets & Sangeet Wear",
    priceBucket: "Budget (₹20k-50k)",
    address: "455, Katra Neel, Chandni Chowk, Delhi 110006",
    rating: 4.4,
    featuredArticleSnippet:
      "Proof that a dream bridal look doesn't need a luxury budget — full lehenga sets with dupatta and jewelry pairing under ₹50k.",
    image: "gradient:amber",
  },
  {
    id: "s5",
    shopName: "Nazrana Bridal Studio",
    hubLocation: "Chandni Chowk, Delhi",
    specialty: "Velvet Bridal Lehengas & Mirror Work",
    priceBucket: "Mid-Range (₹50k-1.5L)",
    address: "88, Kinari Bazar, Chandni Chowk, Delhi 110006",
    rating: 4.5,
    featuredArticleSnippet:
      "Tucked inside Kinari Bazar's sparkle lane — famous for deep maroon velvet lehengas and mirror-work blouses stitched to measure in 6 days.",
    image: "gradient:rose",
  },
  {
    id: "s6",
    shopName: "Meena Bazaar Flagship",
    hubLocation: "Chandni Chowk, Delhi",
    specialty: "Ready-to-Wear Trousseau & Groom Sherwanis",
    priceBucket: "Budget (₹20k-50k)",
    address: "Metro Gate 5, Chandni Chowk Main Road, Delhi 110006",
    rating: 4.3,
    featuredArticleSnippet:
      "One-stop trousseau shopping for the whole baraat — coordinated family outfits, groom sherwanis and last-minute alterations done same-day.",
    image: "gradient:emerald",
  },
];

export const EVENTS: EventDetail[] = [
  {
    id: "e1",
    name: "Haldi",
    date: "Fri, 20 Nov 2026",
    time: "10:00 AM",
    venue: "Sharma Family Courtyard, Gurgaon",
    dressCode: "Shades of Yellow & Marigold",
    culturalMeaning:
      "A sacred ceremony where turmeric paste is applied to the bride and groom for cleansing, glow and blessings before the wedding.",
  },
  {
    id: "e2",
    name: "Mehendi",
    date: "Fri, 20 Nov 2026",
    time: "4:00 PM",
    venue: "Rosewood Lawns, Gurgaon",
    dressCode: "Greens & Florals",
    culturalMeaning:
      "Intricate henna designs are applied to the bride's hands and feet, symbolising joy, beauty and the deep bond of marriage.",
  },
  {
    id: "e3",
    name: "Sangeet",
    date: "Sat, 21 Nov 2026",
    time: "7:00 PM",
    venue: "The Grand Pavilion, Aerocity",
    dressCode: "Festive Glam / Cocktail",
    culturalMeaning:
      "A night of music and choreographed dances where both families celebrate together — the musical heart of an Indian wedding.",
  },
  {
    id: "e4",
    name: "Pheras",
    date: "Sun, 22 Nov 2026",
    time: "8:30 PM",
    venue: "Lotus Mandap, ITC Maurya, Delhi",
    dressCode: "Traditional Ethnic",
    culturalMeaning:
      "The sacred seven circles around the holy fire — each phera is a vow, binding the couple in dharma, prosperity, love and companionship.",
  },
];

export type ExplainerLanguage = "English" | "हिन्दी" | "Español" | "Français";

export const RITUAL_EXPLAINERS: Record<
  string,
  Record<ExplainerLanguage, string>
> = {
  Haldi: {
    English:
      "What is Haldi? A sacred ceremony where turmeric paste is applied to the couple for cleansing & blessings — turmeric is considered auspicious and gives a natural glow before the big day.",
    "हिन्दी":
      "हल्दी क्या है? एक पवित्र रस्म जिसमें वर-वधू को हल्दी का लेप लगाया जाता है — शुद्धि, आशीर्वाद और प्राकृतिक निखार के लिए।",
    Español:
      "¿Qué es Haldi? Una ceremonia sagrada donde se aplica pasta de cúrcuma a la pareja para purificación y bendiciones — la cúrcuma se considera auspiciosa.",
    Français:
      "Qu'est-ce que le Haldi ? Une cérémonie sacrée où une pâte de curcuma est appliquée sur le couple pour la purification et les bénédictions.",
  },
  Mehendi: {
    English:
      "What is Mehendi? Intricate henna art is applied to the bride's hands & feet. Folklore says the darker the stain, the deeper the love of her partner!",
    "हिन्दी":
      "मेहंदी क्या है? दुल्हन के हाथों-पैरों पर सुंदर हिना कला बनाई जाती है। कहा जाता है — मेहंदी जितनी गहरी, प्यार उतना गहरा!",
    Español:
      "¿Qué es Mehendi? Arte de henna aplicado en manos y pies de la novia. ¡Se dice que cuanto más oscuro el tinte, más profundo el amor!",
    Français:
      "Qu'est-ce que le Mehendi ? Un art du henné appliqué sur les mains et pieds de la mariée. Plus la teinte est foncée, plus l'amour est profond !",
  },
  Sangeet: {
    English:
      "What is Sangeet? A joyful night of music, dance battles and family performances — both households celebrate the union with choreographed Bollywood numbers.",
    "हिन्दी":
      "संगीत क्या है? गीत-संगीत और नृत्य की शाम, जिसमें दोनों परिवार बॉलीवुड डांस के साथ मिलन का जश्न मनाते हैं।",
    Español:
      "¿Qué es Sangeet? Una noche alegre de música y baile donde ambas familias celebran la unión con coreografías de Bollywood.",
    Français:
      "Qu'est-ce que le Sangeet ? Une soirée joyeuse de musique et de danse où les deux familles célèbrent l'union avec des chorégraphies Bollywood.",
  },
  Pheras: {
    English:
      "What are Pheras? The couple walks seven circles around a sacred fire, each round a vow — of duty, prosperity, love and lifelong companionship.",
    "हिन्दी":
      "फेरे क्या हैं? वर-वधू पवित्र अग्नि के चारों ओर सात फेरे लेते हैं — हर फेरा धर्म, समृद्धि, प्रेम और साथ का वचन है।",
    Español:
      "¿Qué son los Pheras? La pareja da siete vueltas alrededor del fuego sagrado, cada una es un voto de deber, prosperidad y amor eterno.",
    Français:
      "Que sont les Pheras ? Le couple fait sept tours autour du feu sacré, chaque tour étant un vœu de devoir, de prospérité et d'amour éternel.",
  },
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tm1",
    name: "Sumit Neniwal",
    role: "Founder & Product",
    email: "sumit@shaadigen.ai",
    phone: "+91 98765 41001",
    address: "ShaadiGen HQ, 14 Khan Market, New Delhi 110003",
  },
  {
    id: "tm2",
    name: "Aisha Rahman",
    role: "Vendor Partnerships",
    email: "aisha@shaadigen.ai",
    phone: "+91 98765 41002",
    address: "Cowork Floor 3, Connaught Place, New Delhi 110001",
  },
  {
    id: "tm3",
    name: "Rohan Mehta",
    role: "AI Studio Lead",
    email: "rohan@shaadigen.ai",
    phone: "+91 98765 41003",
    address: "Studio 8, Hauz Khas Village, New Delhi 110016",
  },
  {
    id: "tm4",
    name: "Priya Kapoor",
    role: "Guest Experience",
    email: "priya@shaadigen.ai",
    phone: "+91 98765 41004",
    address: "Guest Hub Desk, Bandra West, Mumbai 400050",
  },
];

export const BUDGET_ALLOCATION: { label: string; pct: number; emoji: string }[] =
  [
    { label: "Venue & Stay", pct: 30, emoji: "🏰" },
    { label: "Catering", pct: 25, emoji: "🍽️" },
    { label: "Decor & Florals", pct: 15, emoji: "🌸" },
    { label: "Photography", pct: 10, emoji: "📸" },
    { label: "Bridal Attire & Jewelry", pct: 10, emoji: "👗" },
    { label: "Makeup & Styling", pct: 5, emoji: "💄" },
    { label: "Music & Entertainment", pct: 5, emoji: "🎶" },
  ];
