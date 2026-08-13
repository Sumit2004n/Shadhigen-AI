export type VendorCategory =
  | "Photographer"
  | "Caterer"
  | "Decorator"
  | "Makeup Artist"
  | "Lehenga Retailer";

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  location: string;
  priceRange: { min: number; max: number };
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  tags: string[];
  negotiatedDeal: string;
}

export type PriceBucket =
  | "Budget (₹20k-50k)"
  | "Mid-Range (₹50k-1.5L)"
  | "Luxury (₹1.5L+)";

export interface ShoppingGuideItem {
  id: string;
  shopName: string;
  hubLocation: string;
  specialty: string;
  priceBucket: PriceBucket;
  address: string;
  rating: number;
  featuredArticleSnippet: string;
  image: string;
}

export interface PreWeddingShoot {
  id: string;
  coupleNames: string;
  theme: string;
  generatedImages: string[];
}

export interface CustomSong {
  id: string;
  title: string;
  coupleNames: string;
  genre: string;
  audioUrl: string;
  lyrics: string[];
}

export interface AIInviteCard {
  id: string;
  coupleNames: string;
  eventDate: string;
  venue: string;
  themeColor: string;
  personalizedAudioGreeting: string;
}

export interface EventDetail {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  dressCode: string;
  culturalMeaning: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  address: string;
}
