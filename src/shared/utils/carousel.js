"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel({
  items = [],

  // behavior
  slidesPerView = 1,
  spaceBetween = 20,
  loop = true,

  // controls
  arrows = true,
  dots = true,
  autoplay = false,
  autoplayDelay = 3000,

  // layout
  height = 200,
  className = "",

  // callbacks (optional)
  onSlideChange,
  onSwiper,
}) {
  const modules = [
    ...(arrows ? [Navigation] : []),
    ...(dots ? [Pagination] : []),
    ...(autoplay ? [Autoplay] : []),
  ];

  return (
    <Swiper
      modules={modules}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={loop}
      navigation={arrows}
      pagination={dots ? { clickable: true } : false}
      autoplay={
        autoplay
          ? {
              delay: autoplayDelay,
              disableOnInteraction: false,
            }
          : false
      }
      style={{ height }}
      className={className}
      onSlideChange={onSlideChange}
      onSwiper={onSwiper}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          {typeof item === "function" ? item() : item}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
