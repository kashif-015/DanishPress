"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CardCategory } from "@/types";
import { Sparkles, Heart, Moon } from "lucide-react";

interface FilterTabsProps {
  selectedCategory: CardCategory | "all";
  onCategoryChange: (category: CardCategory | "all") => void;
}

const categories = [
  { 
    id: "all" as const, 
    label: "All Cards", 
    icon: Sparkles,
    gradient: "from-primary-500 to-secondary-500"
  },
  { 
    id: "hindu" as const, 
    label: "Hindu", 
    icon: Heart,
    gradient: "from-orange-500 to-red-500"
  },
  { 
    id: "muslim" as const, 
    label: "Muslim", 
    icon: Moon,
    gradient: "from-emerald-500 to-teal-500"
  },
];

export function FilterTabs({
  selectedCategory,
  onCategoryChange,
}: FilterTabsProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex gap-2 p-1.5 bg-gray-100 rounded-xl">
        {categories.map((category) => {
          const isActive = selectedCategory === category.id;
          const Icon = category.icon;
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300",
                isActive
                  ? "text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterPill"
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r rounded-lg",
                    category.gradient
                  )}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={cn(
                "relative w-4 h-4",
                isActive && "text-white"
              )} />
              <span className="relative hidden sm:inline">{category.label}</span>
              <span className="relative sm:hidden">
                {category.id === "all" ? "All" : category.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
