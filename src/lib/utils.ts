import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCardId(id: number): string {
  return `DP${id.toString().padStart(3, "0")}`;
}

export function getWhatsAppUrl(
  cardId: string,
  cardName: string,
  category: string,
  availability: string
): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const message = encodeURIComponent(
    `Hi! I'm interested in the following wedding card:\n\n` +
      `📋 Card ID: ${cardId}\n` +
      `💒 Card Name: ${cardName}\n` +
      `🏷️ Category: ${category.charAt(0).toUpperCase() + category.slice(1)} Cards\n` +
      `📦 Availability: ${availability.charAt(0).toUpperCase() + availability.slice(1)}\n\n` +
      `Please share more details about pricing and customization options.`
  );
  return `https://wa.me/${phoneNumber}?text=${message}`;
}

export function getAvailabilityColor(status: string): string {
  switch (status) {
    case "available":
      return "bg-emerald-500";
    case "limited":
      return "bg-amber-500";
    case "unavailable":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export function getAvailabilityText(status: string): string {
  switch (status) {
    case "available":
      return "Available";
    case "limited":
      return "Limited Stock";
    case "unavailable":
      return "Unavailable";
    default:
      return status;
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case "hindu":
      return "bg-orange-500";
    case "muslim":
      return "bg-emerald-600";
    default:
      return "bg-gray-500";
  }
}

export function getCategoryText(category: string): string {
  switch (category) {
    case "hindu":
      return "Hindu";
    case "muslim":
      return "Muslim";
    default:
      return category;
  }
}
