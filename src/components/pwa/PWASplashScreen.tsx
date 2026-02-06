"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function PWASplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if this is a PWA launch
    const isPWA = window.matchMedia("(display-mode: standalone)").matches;
    const hasSeenSplash = sessionStorage.getItem("splashShown");

    if (!isPWA || hasSeenSplash) {
      setShowSplash(false);
      return;
    }

    // Mark splash as shown for this session
    sessionStorage.setItem("splashShown", "true");

    // Trigger load animation
    const loadTimer = setTimeout(() => setIsLoaded(true), 100);
    
    // Hide splash after animation
    const hideTimer = setTimeout(() => setShowSplash(false), 2500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!showSplash) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.2 
          }}
          className="relative"
        >
          <motion.div
            animate={isLoaded ? { 
              boxShadow: ["0 0 0 0 rgba(225, 29, 72, 0.4)", "0 0 0 30px rgba(225, 29, 72, 0)", "0 0 0 0 rgba(225, 29, 72, 0)"]
            } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="Danish Press Logo"
              width={140}
              height={140}
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isLoaded ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <h1 className="text-2xl font-bold text-gray-900">
            Danish Press
          </h1>
          <p className="text-gray-500 mt-2">
            A complete printing solution
          </p>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="absolute bottom-16"
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary-500"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
