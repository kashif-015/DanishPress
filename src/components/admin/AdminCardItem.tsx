"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Edit2,
  Copy,
  Trash2,
  Star,
  MoreVertical,
  Eye,
} from "lucide-react";
import { CardWithImages } from "@/types";
import { AvailabilityBadge, CategoryTag } from "@/components/cards";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface AdminCardItemProps {
  card: CardWithImages;
  index: number;
  onEdit: (card: CardWithImages) => void;
  onDuplicate: (card: CardWithImages) => void;
  onDelete: (cardId: string) => void;
}

export function AdminCardItem({
  card,
  index,
  onEdit,
  onDuplicate,
  onDelete,
}: AdminCardItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const firstImage = card.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4"
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        {firstImage ? (
          <Image
            src={firstImage.image_url}
            alt={card.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
            📷
          </div>
        )}
        {card.is_featured && (
          <div className="absolute top-1 left-1 bg-amber-500 rounded-full p-0.5">
            <Star className="w-3 h-3 text-white fill-current" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{card.name}</h3>
            <p className="text-sm text-gray-500">{card.card_id}</p>
          </div>

          {/* Actions Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>

            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10 min-w-[160px]"
              >
                <Link
                  href={`/card/${card.id}`}
                  target="_blank"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </Link>
                <button
                  onClick={() => {
                    onEdit(card);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    onDuplicate(card);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Duplicate</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(card.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <CategoryTag category={card.category} />
          <AvailabilityBadge status={card.availability} />
          <span className="text-xs text-gray-500">
            {card.images.length} image{card.images.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
