/**
 * RelatedProducts Component Constants
 */

// Default section title
export const DEFAULT_TITLE = 'Related Products';

// Carousel configuration
export const CAROUSEL_CONFIG = {
  SLIDES_PER_VIEW: 4,
  SPACE_BETWEEN: 20,
  HEIGHT: 'auto',
  AUTOPLAY: false,
  DOTS: false,
  MIN_PRODUCTS_FOR_LOOP: 4,
  MIN_PRODUCTS_FOR_ARROWS: 4,
};

// Responsive breakpoints for carousel
export const CAROUSEL_BREAKPOINTS = {
  MOBILE: {
    breakpoint: 640,
    slidesPerView: 1,
  },
  TABLET: {
    breakpoint: 768,
    slidesPerView: 2,
  },
  DESKTOP: {
    breakpoint: 1024,
    slidesPerView: 3,
  },
  LARGE: {
    breakpoint: 1280,
    slidesPerView: 4,
  },
};

// CSS class names
export const CSS_CLASSES = {
  CAROUSEL: 'related-products-carousel',
  PRODUCT_WRAPPER: 'px-2',
};

// Labels
export const LABELS = {
  DEFAULT_TITLE: 'Related Products',
  YOU_MAY_ALSO_LIKE: 'You May Also Like',
  SIMILAR_PRODUCTS: 'Similar Products',
  RECOMMENDED_FOR_YOU: 'Recommended For You',
};

