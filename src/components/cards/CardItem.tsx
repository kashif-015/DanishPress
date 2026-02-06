"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CardWithImages } from "@/types";
import { ImageCarousel } from "./ImageCarousel";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { CategoryTag } from "./CategoryTag";
import { WhatsAppButton } from "./WhatsAppButton";
import { Star, Eye } from "lucide-react";

interface CardItemProps {
  card: CardWithImages;
  index?: number;
}

export function CardItem({ card, index = 0 }: CardItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/50 overflow-hidden group hover:shadow-xl hover:border-gray-200 transition-all duration-300"
    >
      <Link href={`/card/${card.id}`} className="block relative">
        <ImageCarousel
          images={card.images || []}
          cardName={card.name}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium text-gray-700 shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform">
            <Eye className="w-4 h-4" />
            View Details
          </div>
        </div>

        {card.is_featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-primary-500/30">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3">
          <AvailabilityBadge status={card.availability} />
        </div>
      </Link>

      <div className="p-3 space-y-2">
        <Link href={`/card/${card.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-primary-500 transition-colors">
            {card.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-gray-400 font-mono bg-gray-50 px-1.5 py-0.5 rounded truncate">
            {card.card_id}
          </p>
          <CategoryTag category={card.category} />
        </div>

        <WhatsAppButton
          cardId={card.card_id}
          cardName={card.name}
          category={card.category}
          availability={card.availability}
        />
      </div>
    </motion.div>
  );
}
