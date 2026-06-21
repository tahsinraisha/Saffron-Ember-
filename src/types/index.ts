export type MenuCategory = "starters" | "mains" | "desserts" | "drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  tags?: string[];
  spiceLevel?: 0 | 1 | 2 | 3;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  span?: "tall" | "wide" | "normal";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}
