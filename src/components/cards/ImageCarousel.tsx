"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { CardImage } from "@/types";

import "swiper/css";
import "swiper/css/pagination";

interface ImageCarouselProps {
  images: CardImage[];
  cardName: string;
}

export function ImageCarousel({ images, cardName }: ImageCarouselProps) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/5] bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">No images</span>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{
        clickable: true,
        bulletActiveClass: "swiper-pagination-bullet-active !bg-primary-600",
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: true,
      }}
      loop={images.length > 1}
      className="w-full aspect-[4/5] bg-gray-100"
    >
      {images.map((image, index) => (
        <SwiperSlide key={image.id}>
          <div className="relative w-full h-full">
            <Image
              src={image.image_url}
              alt={`${cardName} - Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              priority={index === 0}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
