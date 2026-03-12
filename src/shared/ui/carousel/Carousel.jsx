/**
 * Carousel Component (Shared UI)
 *
 * Generic, reusable carousel component using Embla Carousel
 * - Customizable navigation arrows
 * - Optional pagination dots
 * - Loop support
 * - Autoplay support
 * - Responsive
 * - Clean, predictable CSS
 *
 * Props:
 * @param {React.ReactNode} children - Carousel slides (each child is a slide)
 * @param {boolean} showArrows - Show navigation arrows (default: true)
 * @param {boolean} showDots - Show pagination dots (default: true)
 * @param {boolean} loop - Enable infinite loop (default: true)
 * @param {boolean} autoplay - Enable autoplay (default: false)
 * @param {number} autoplayDelay - Autoplay delay in milliseconds (default: 3000)
 * @param {string} className - Additional CSS classes
 * @param {object} options - Embla carousel options
 *
 * Usage:
 * <Carousel showArrows showDots loop autoplay autoplayDelay={5000}>
 *   <div>Slide 1</div>
 *   <div>Slide 2</div>
 *   <div>Slide 3</div>
 * </Carousel>
 */
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Icon } from '@/shared/icons';
import './Carousel.css';

const Carousel = ({
  children,
  showArrows = true,
  showDots = true,
  loop = true,
  autoplay = false,
  autoplayDelay = 3000,
  slidesToShow = 1,
  className = '',
  options = {},
  ...props
}) => {
  const autoplayPlugin = autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })] : [];

  const emblaOptions = {
    loop,
    align: 'start',
    slidesToScroll: 1,
    ...options
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, autoplayPlugin);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Convert children to array
  const slides = React.Children.toArray(children);

  // Navigation handlers
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  // Update selected index and scroll state
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Setup event listeners
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Don't render if no slides
  if (!slides || slides.length === 0) {
    return null;
  }

  const showNavigation = slides.length > 1;
  const slidesClass = slidesToShow > 1 ? `carousel--slides-${slidesToShow}` : '';

  return (
    <div className={`carousel ${slidesClass} ${className}`} {...props}>
      <div className="carousel__viewport" ref={emblaRef}>
        <div className="carousel__container">
          {slides.map((slide, index) => (
            <div key={index} className="carousel__slide">
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && showNavigation && (
        <>
          <button
            className={`carousel__button carousel__button--prev ${!canScrollPrev && !loop ? 'carousel__button--disabled' : ''}`}
            onClick={scrollPrev}
            disabled={!canScrollPrev && !loop}
            aria-label="Previous slide"
          >
            <Icon name="chevronLeft" size={24} />
          </button>
          <button
            className={`carousel__button carousel__button--next ${!canScrollNext && !loop ? 'carousel__button--disabled' : ''}`}
            onClick={scrollNext}
            disabled={!canScrollNext && !loop}
            aria-label="Next slide"
          >
            <Icon name="chevronRight" size={24} />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {showDots && showNavigation && (
        <div className="carousel__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel__dot ${index === selectedIndex ? 'carousel__dot--active' : ''}`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;

