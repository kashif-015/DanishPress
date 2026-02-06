"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { CardCategory, AvailabilityStatus } from "@/types";

interface WhatsAppButtonProps {
  cardId: string;
  cardName: string;
  category: CardCategory;
  availability: AvailabilityStatus;
  variant?: "icon" | "full";
  className?: string;
}

export function WhatsAppButton({
  cardId,
  cardName,
  category,
  availability,
  variant = "full",
  className,
}: WhatsAppButtonProps) {
  const handleClick = async () => {
    // Log the enquiry
    try {
      const supabase = createClient();
      await supabase.from("enquiry_logs").insert({
        card_id: cardId,
        card_name: cardName,
        category,
        availability,
        user_agent: typeof window !== "undefined" ? navigator.userAgent : null,
      });
    } catch (error) {
      console.error("Failed to log enquiry:", error);
    }

    // Open WhatsApp
    const url = getWhatsAppUrl(cardId, cardName, category, availability);
    window.open(url, "_blank");
  };

  if (variant === "icon") {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleClick}
        className={`p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all ${className}`}
      >
        <MessageCircle className="w-5 h-5" />
      </motion.button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      onClick={handleClick}
      className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium shadow-md shadow-green-500/25 hover:shadow-green-500/40 transition-all ${className}`}
    >
      <MessageCircle className="w-4 h-4" />
      <span>Enquire on WhatsApp</span>
    </motion.button>
  );
}
