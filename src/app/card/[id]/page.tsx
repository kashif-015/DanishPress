import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CardDetailClient from "./CardDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: card } = await supabase
    .from("cards")
    .select("name, category, card_id")
    .eq("id", id)
    .single();

  if (!card) {
    return { title: "Card Not Found | DanishPress" };
  }

  return {
    title: `${card.name} | DanishPress`,
    description: `View details of ${card.name} - ${card.category} wedding invitation card. Card ID: ${card.card_id}`,
  };
}

export default async function CardDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: card, error } = await supabase
    .from("cards")
    .select(
      `
      *,
      images:card_images(*)
    `
    )
    .eq("id", id)
    .single();

  if (error || !card) {
    notFound();
  }

  // Sort images by display_order
  const cardWithSortedImages = {
    ...card,
    images: (card.images || []).sort(
      (a: { display_order: number }, b: { display_order: number }) =>
        a.display_order - b.display_order
    ),
  };

  return <CardDetailClient card={cardWithSortedImages} />;
}
