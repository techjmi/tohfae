import {
  BANNER_TYPE,
  getBannersByType,
  buildBannerCTAUrl
} from "../../contract/banner.contract";

/**
 * Hero Carousel Slides Configuration
 *
 * DEPRECATED: This constant is kept for backward compatibility.
 * Use getBannersByType(BANNER_TYPE.HERO) from banner.contract.js instead.
 *
 * The carousel now uses banner contract data which provides:
 * - Full banner management (scheduling, targeting, analytics)
 * - CTA routing with dynamic parameters
 * - Responsive images (desktop, tablet, mobile)
 * - Background and text colors
 * - Priority-based ordering
 *
 * @deprecated Use banner contract data instead
 */
export const HERO_CAROUSEL_SLIDES = [];

/**
 * Carousel Configuration Options
 *
 * Default settings for the hero carousel behavior
 */
export const CAROUSEL_CONFIG = {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  arrows: true,
  dots: true,
  autoplay: true,
  autoplayDelay: 5000,
  height: "400px",
};

/**
 * Transform banner data to carousel slide format
 *
 * Converts banner contract data to the format expected by HeroCarousel component
 *
 * @param {Object} banner - Banner object from banner contract
 * @returns {Object} Carousel slide object
 */
export const transformBannerToSlide = (banner) => {
  return {
    id: banner.id,
    image: banner.content.image.desktop, // Use desktop image for carousel
    mobileImage: banner.content.image.mobile, // Optional mobile image
    title: banner.content.heading,
    subtitle: banner.content.subheading || banner.content.description,
    description: banner.content.description,
    backgroundColor: banner.content.backgroundColor,
    textColor: banner.content.textColor,
    cta: {
      enabled: banner.cta.enabled,
      primary: {
        text: banner.cta.text,
        href: buildBannerCTAUrl(banner.cta),
        variant: banner.cta.variant,
        color: banner.cta.color,
      },
      // Secondary CTA can be added if needed
      secondary: null,
    },
    animation: banner.display.animation,
    animationDuration: banner.display.animationDuration,
  };
};

/**
 * Get hero carousel slides from banner contract
 *
 * Fetches all active HERO type banners and transforms them to carousel format
 *
 * @param {Array<Object>} apiBanners - Optional banners from API (overrides contract data)
 * @returns {Array<Object>} Array of carousel slides
 */
export const getHeroCarouselSlides = (apiBanners = null) => {
  // Use API banners if provided, otherwise use contract data
  const banners = apiBanners || getBannersByType(BANNER_TYPE.HERO);

  // Transform banners to carousel slides
  return banners.map(transformBannerToSlide);
};

/**
 * Merge API slides with default slides
 *
 * @deprecated Use getHeroCarouselSlides() instead
 * @param {Array<Object>} apiSlides - Slides fetched from API
 * @param {boolean} replaceDefault - If true, replace default slides; if false, merge
 * @returns {Array<Object>} Combined slides array
 */
export const mergeCarouselSlides = (apiSlides = [], replaceDefault = false) => {
  // If API slides provided, use them
  if (apiSlides && apiSlides.length > 0) {
    return apiSlides;
  }

  // Otherwise, get slides from banner contract
  return getHeroCarouselSlides();
};

/**
 * Validate carousel slide structure
 *
 * @param {Object} slide - Slide object to validate
 * @returns {boolean} True if valid
 */
export const validateCarouselSlide = (slide) => {
  return (
    slide &&
    typeof slide.image === "string" &&
    typeof slide.title === "string" &&
    typeof slide.subtitle === "string" &&
    slide.cta &&
    slide.cta.primary &&
    typeof slide.cta.primary.text === "string" &&
    typeof slide.cta.primary.href === "string"
  );
};

