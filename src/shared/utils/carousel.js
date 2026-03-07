"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Icon } from "@/shared/icons";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carousel.css";

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
  arrowsOutside = false,

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
    <div className={`carousel-container ${arrowsOutside ? 'arrows-outside' : ''}`}>
      <Swiper
        modules={modules}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        navigation={arrows ? {
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        } : false}
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

      {/* Custom Navigation Arrows with Icons */}
      {arrows && (
        <>
          <button className="custom-swiper-button-prev" aria-label="Previous slide">
            <Icon name="chevronLeft" size={40} />
          </button>
          <button className="custom-swiper-button-next" aria-label="Next slide">
            <Icon name="chevronRight" size={40} />
          </button>
        </>
      )}
    </div>
  );
}
