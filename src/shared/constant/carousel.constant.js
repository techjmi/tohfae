import { images } from "../../contract/testing.image";

/**
 * Hero Carousel Slides Configuration
 * 
 * This constant defines the default slides for the hero carousel.
 * In production, these can be fetched from an API and merged with or replaced by dynamic content.
 * 
 * @constant {Array<Object>} HERO_CAROUSEL_SLIDES
 * @property {string} image - Image URL for the slide background
 * @property {string} title - Main heading text
 * @property {string} subtitle - Supporting text/description
 * @property {Object} cta - Call-to-action buttons configuration
 * @property {Object} cta.primary - Primary CTA button
 * @property {string} cta.primary.text - Button text
 * @property {string} cta.primary.href - Button link
 * @property {Object} cta.secondary - Secondary CTA button
 * @property {string} cta.secondary.text - Button text
 * @property {string} cta.secondary.href - Button link
 */
export const HERO_CAROUSEL_SLIDES = [
  {
    image: images[0].image_1,
    title: "Create Your Perfect Gift",
    subtitle: "Design personalized gifts that tell your unique story",
    cta: {
      primary: { text: "Start Designing", href: "/design" },
      secondary: { text: "Browse Products", href: "/products" },
    },
  },
  {
    image: images[0].image_2,
    title: "Gifts That Inspire",
    subtitle: "From custom mugs to personalized frames - make every moment special",
    cta: {
      primary: { text: "Explore Collection", href: "/products" },
      secondary: { text: "Learn More", href: "/about" },
    },
  },
  {
    image: images[0].image_3,
    title: "Express Yourself",
    subtitle: "Turn your ideas into beautiful, memorable gifts",
    cta: {
      primary: { text: "Get Started", href: "/design" },
      secondary: { text: "View Gallery", href: "/gallery" },
    },
  },
];

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
  height: "600px",
};

/**
 * Merge API slides with default slides
 * 
 * @param {Array<Object>} apiSlides - Slides fetched from API
 * @param {boolean} replaceDefault - If true, replace default slides; if false, merge
 * @returns {Array<Object>} Combined slides array
 */
export const mergeCarouselSlides = (apiSlides = [], replaceDefault = false) => {
  if (replaceDefault && apiSlides.length > 0) {
    return apiSlides;
  }
  
  // Merge API slides with defaults (API slides first)
  return [...apiSlides, ...HERO_CAROUSEL_SLIDES];
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

