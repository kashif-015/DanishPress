"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Sparkles, Moon, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home, category: null },
  { href: "/?category=hindu", label: "Hindu", icon: Sparkles, category: "hindu" },
  { href: "/?category=muslim", label: "Muslim", icon: Moon, category: "muslim" },
  { href: "/about", label: "About", icon: User, category: null },
];

export function BottomNav() {
  return (
    <Suspense fallback={null}>
      <BottomNavContent />
    </Suspense>
  );
}

function BottomNavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  // Don't show on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div className="mx-3 mb-3">
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent pointer-events-none" />
          <div className="relative flex items-center justify-around py-1.5">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/" && !currentCategory
                  : item.category
                  ? pathname === "/" && currentCategory === item.category
                  : pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative flex flex-col items-center gap-0.5 py-1.5 px-4"
                >
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/15 to-secondary-500/15 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="relative z-10"
                  >
                    <item.icon 
                      className={cn(
                        "w-4 h-4 transition-colors duration-300",
                        isActive 
                          ? "text-primary-500" 
                          : "text-gray-400"
                      )} 
                    />
                  </motion.div>
                  <span
                    className={cn(
                      "text-[10px] font-medium relative z-10 transition-colors duration-300",
                      isActive ? "text-primary-600" : "text-gray-500"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
