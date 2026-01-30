"use client";

import Carousel from "../../shared/utils/carousel";
import Button from "../../shared/ui/button";
import {
  HERO_CAROUSEL_SLIDES,
  CAROUSEL_CONFIG,
  mergeCarouselSlides
} from "../../shared/constant/carousel.constant";

export default function HeroCarousel({ apiSlides = [] }) {
  // Merge API slides with default slides if API slides are provided
  const carouselSlides = mergeCarouselSlides(apiSlides);

  const slides = carouselSlides.map((slide, index) => (
    <div key={index} className="relative h-full w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-200 mb-8 animate-fade-in-delay">
              {slide.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
              <Button
                as="a"
                href={slide.cta.primary.href}
                variant="solid"
                color="primary"
                size="lg"
                radius="md"
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                {slide.cta.primary.text}
              </Button>
              <Button
                as="a"
                href={slide.cta.secondary.href}
                variant="outline"
                color="white"
                size="lg"
                radius="md"
                className="border-white text-white hover:bg-white/10"
              >
                {slide.cta.secondary.text}
              </Button>
            </div>
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

