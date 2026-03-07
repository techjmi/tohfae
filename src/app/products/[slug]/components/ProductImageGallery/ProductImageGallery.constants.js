/**
 * ProductImageGallery Component Constants
 */

// Gallery configuration
export const GALLERY_CONFIG = {
  MAX_WIDTH: 450,
  HEIGHT: 500,
  ZOOM_SCALE: 1.5,
  ZOOM_TRANSITION: '500ms ease-out',
};

// Carousel configuration
export const CAROUSEL_CONFIG = {
  SLIDES_PER_VIEW: 1,
  SPACE_BETWEEN: 0,
  AUTOPLAY: false,
  ARROWS_OUTSIDE: true,
  MIN_IMAGES_FOR_LOOP: 1,
  MIN_IMAGES_FOR_ARROWS: 1,
  MIN_IMAGES_FOR_DOTS: 1,
};

// Pagination dots configuration
export const PAGINATION_CONFIG = {
  DOT_SIZE: 10,
  ACTIVE_DOT_WIDTH: 24,
  ACTIVE_DOT_COLOR: '#f97316', // Orange theme
  INACTIVE_DOT_COLOR: '#d1d5db',
  BORDER_RADIUS: 5,
};

// Image configuration
export const IMAGE_CONFIG = {
  PLACEHOLDER: '/placeholder-product.jpg',
  SIZES: '(max-width: 768px) 100vw, 50vw',
  OBJECT_FIT: 'cover',
};

// Labels and messages
export const LABELS = {
  NO_IMAGES: 'No images available',
  IMAGE_ALT_PREFIX: 'Image',
  PRODUCT_DEFAULT: 'Product',
};

// CSS class names
export const CSS_CLASSES = {
  GALLERY: 'image-gallery',
  IMAGE_CONTAINER: 'image-container',
  IMAGE: 'gallery-image',
  IMAGE_ZOOMED: 'gallery-image-zoomed',
  EMPTY_STATE: 'empty-state',
  EMPTY_TEXT: 'empty-text',
};

