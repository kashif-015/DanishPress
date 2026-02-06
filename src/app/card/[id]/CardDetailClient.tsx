"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Share2, Star, Sparkles, MessageCircle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Zoom } from "swiper/modules";
import Image from "next/image";
import { CardWithImages } from "@/types";
import { AvailabilityBadge, CategoryTag, WhatsAppButton } from "@/components/cards";
import { Button } from "@/components/ui";
import toast from "react-hot-toast";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/zoom";

interface CardDetailClientProps {
  card: CardWithImages;
}

export default function CardDetailClient({ card }: CardDetailClientProps) {
  const router = useRouter();

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: card.name,
      text: `Check out this beautiful wedding card: ${card.name} (${card.card_id})`,
      url: shareUrl,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      // If share was cancelled or failed, try clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      } catch {
        toast.error("Could not share or copy link");
      }
    }
  };

  const features = [
    "Premium quality paper stock",
    "Customizable text and colors",
    "Matching envelope included",
    "Bulk order discounts available"
  ];

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20 pb-safe">
      {/* Image Carousel */}
      <div className="relative">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-20 p-2.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg border border-gray-100 hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </motion.button>

        {/* Share Button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleShare}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg border border-gray-100 hover:scale-105 transition-transform"
        >
          <Share2 className="w-5 h-5 text-gray-700" />
        </motion.button>

        {/* Featured Badge */}
        {card.is_featured && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg shadow-primary-500/30"
          >
            <Star className="w-4 h-4 fill-current" />
            Featured Design
          </motion.div>
        )}

        <Swiper
          modules={[Pagination, Zoom]}
          pagination={{ clickable: true }}
          zoom
          loop={card.images.length > 1}
          className="w-full aspect-[4/5] md:aspect-[3/4] max-h-[70vh]"
        >
          {card.images.map((image, index) => (
            <SwiperSlide key={image.id}>
              <div className="swiper-zoom-container">
                <div className="relative w-full h-full">
                  <Image
                    src={image.image_url}
                    alt={`${card.name} - Image ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority={index === 0}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Card Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative -mt-6 bg-white rounded-t-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.06)]"
      >
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-200 rounded-full" />
        
        <div className="px-4 py-5 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              {card.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-gray-100 rounded font-mono text-xs text-gray-500">
                {card.card_id}
              </span>
              <CategoryTag category={card.category} size="md" />
              <AvailabilityBadge status={card.availability} size="md" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5 p-3 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
              <span className="w-1 h-3 bg-primary-500 rounded-full"></span>
              About this card
            </h3>
            <p className="text-gray-600 leading-relaxed text-xs">
              This beautiful {card.category} wedding invitation card is perfect
              for your special day. Contact us on WhatsApp for pricing,
              customization options, and bulk order discounts.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
              <span className="w-1 h-3 bg-gradient-to-b from-accent-500 to-primary-500 rounded-full"></span>
              What&apos;s Included
            </h3>
            <ul className="space-y-1.5">
              {features.map((feature, index) => (
                <motion.li 
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex items-center gap-2 text-gray-600 text-xs"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="pt-2 space-y-2">
            <WhatsAppButton
              cardId={card.card_id}
              cardName={card.name}
              category={card.category}
              availability={card.availability}
            />
            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              Usually reply within 30 minutes
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => router.back()}
            >
              ← Back to Catalog
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
