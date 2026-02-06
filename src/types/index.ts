export type CardCategory = "hindu" | "muslim";

export type AvailabilityStatus = "available" | "limited" | "unavailable";

export interface CardImage {
  id: string;
  card_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export interface Card {
  id: string;
  card_id: string; // Unique display ID like "DP001"
  name: string;
  category: CardCategory;
  availability: AvailabilityStatus;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  images?: CardImage[];
}

export interface CardWithImages extends Card {
  images: CardImage[];
}

export interface EnquiryLog {
  id: string;
  card_id: string;
  card_name: string;
  category: CardCategory;
  availability: AvailabilityStatus;
  clicked_at: string;
  user_agent?: string;
}

export interface AdminUser {
  id: string;
  email: string;
}
