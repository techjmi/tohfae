/**
 * ProductMainInfo Component Constants
 */

// Star rating configuration
export const STAR_CONFIG = {
  MAX_STARS: 5,
  HALF_STAR_THRESHOLD: 0.5,
  ICON_SIZE: 20,
};

// Star icon configurations
export const STAR_ICONS = {
  FULL: {
    name: 'star',
    className: 'text-yellow-500 fill-yellow-500',
  },
  HALF: {
    name: 'starHalf',
    className: 'text-yellow-500 fill-yellow-500',
  },
  EMPTY: {
    name: 'starBorder',
    className: 'text-gray-300',
  },
};

// Badge color mapping for tags
export const TAG_BADGE_COLORS = {
  bestseller: 'success',
  trending: 'primary',
  new: 'primary',
  'limited-edition': 'warning',
  sale: 'danger',
  default: 'neutral',
};

// Badge configuration
export const BADGE_CONFIG = {
  SIZE: 'sm',
  RADIUS: 'sm',
};

// Labels
export const LABELS = {
  SKU: 'SKU:',
  BRAND: 'Brand:',
  REVIEW_SINGULAR: 'review',
  REVIEW_PLURAL: 'reviews',
};

// Default values
export const DEFAULTS = {
  RATING: 0,
  RATING_COUNT: 0,
  CATEGORY: '',
  NAME: 'Product Name',
  SKU: '',
  BRAND: '',
  TAGS: [],
};

// Decimal places for rating display
export const RATING_DECIMAL_PLACES = 1;

