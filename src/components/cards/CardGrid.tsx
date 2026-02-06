"use client";

import { CardWithImages } from "@/types";
import { CardItem } from "./CardItem";
import { CardSkeleton } from "@/components/ui/Skeleton";

interface CardGridProps {
  cards: CardWithImages[];
  isLoading?: boolean;
}

export function CardGrid({ cards, isLoading = false }: CardGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center">
          <span className="text-4xl">💒</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No cards found
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Try adjusting your filters or check back later for new designs.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <CardItem key={card.id} card={card} index={index} />
      ))}
    </div>
  );
}
