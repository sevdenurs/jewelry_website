"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[500px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="w-full h-full"
      >
        {/* 1. Slide */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="/images/photo6.jpg"
              alt=""
                width={1200}
                height={600}
                quality={90}  // kaliteyi arttır
                priority   
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg">
                Lorem İpsum
              </h2>
            </div>
          </div>
        </SwiperSlide>

        {/* 2. Slide */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="/images/photo7.jpg"
              alt="Kolye Koleksiyonu"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg">
                Lorem İpsum
              </h2>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
