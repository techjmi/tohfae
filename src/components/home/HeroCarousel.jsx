"use client";

import Carousel from "../../shared/utils/carousel";
import Button from "../../shared/ui/button";
import {
  CAROUSEL_CONFIG,
  getHeroCarouselSlides
} from "../../shared/constant/carousel.constant";

/**
 * HeroCarousel Component
 *
 * Displays hero carousel using banner contract data
 *
 * Features:
 * - Uses BANNER_TYPE.HERO banners from banner contract
 * - Supports CTA routing with dynamic parameters
 * - Responsive images (desktop/mobile)
 * - Custom background and text colors from banner data
 * - Animation support
 * - API override support
 *
 * @param {Array} apiBanners - Optional banners from API (overrides contract data)
 */
export default function HeroCarousel({ apiBanners = null }) {
  // Get hero carousel slides from banner contract
  const carouselSlides = getHeroCarouselSlides(apiBanners);

  // If no slides available, return null
  if (!carouselSlides || carouselSlides.length === 0) {
    return null;
  }

  const slides = carouselSlides.map((slide, index) => (
    <div
      key={slide.id || index}
      className="relative h-full w-full"
      style={{ backgroundColor: slide.backgroundColor || 'transparent' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay - only if no custom background color */}
        {!slide.backgroundColor && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in"
              style={{ color: slide.textColor || '#ffffff' }}
            >
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg sm:text-xl mb-8 animate-fade-in-delay"
              style={{ color: slide.textColor || '#e5e7eb' }}
            >
              {slide.subtitle}
            </p>

            {/* CTA Buttons */}
            {slide.cta.enabled && (
              <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
                <Button
                  as="a"
                  href={slide.cta.primary.href}
                  variant={slide.cta.primary.variant || "solid"}
                  color={slide.cta.primary.color || "primary"}
                  size="lg"
                  radius="md"
                  className="shadow-lg hover:shadow-xl transition-shadow"
                >
                  {slide.cta.primary.text}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="w-full">
      <Carousel
        items={slides}
        slidesPerView={CAROUSEL_CONFIG.slidesPerView}
        spaceBetween={CAROUSEL_CONFIG.spaceBetween}
        loop={CAROUSEL_CONFIG.loop}
        arrows={CAROUSEL_CONFIG.arrows}
        dots={CAROUSEL_CONFIG.dots}
        autoplay={CAROUSEL_CONFIG.autoplay}
        autoplayDelay={CAROUSEL_CONFIG.autoplayDelay}
        height={CAROUSEL_CONFIG.height}
        className="hero-carousel"
      />
    </div>
  );
}

