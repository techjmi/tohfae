"use client";

import Carousel from "../../../shared/ui/carousel";
import HeroSlide from "./HeroSlide";
import "./hero-carousel.css";

/**
 * HeroCarousel Component
 *
 * Displays hero carousel using banner data from API
 *
 * @param {Array} apiBanners - Banners from API
 */
export default function HeroCarousel({ apiBanners = [] }) {
  if (!apiBanners || apiBanners.length === 0) {
    return null;
  }

  return (
    <div className="hero-carousel-wrapper">
      <Carousel
        showArrows
        showDots
        loop
        autoplay
        autoplayDelay={5000}
        className="hero-carousel"
      >
        {apiBanners.map((banner, index) => (
          <HeroSlide
            key={banner.id || index}
            banner={banner}
            priority={index === 0}
          />
        ))}
      </Carousel>
    </div>
  );
}

