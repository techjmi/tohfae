/**
 * ProductReviews Component Constants
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
    className: 'text-yellow-400 fill-yellow-400',
  },
  HALF: {
    name: 'starHalf',
    className: 'text-yellow-400 fill-yellow-400',
  },
  EMPTY: {
    name: 'starBorder',
    className: 'text-gray-300',
  },
};

// Rating distribution stars (5 to 1)
export const RATING_STARS = [5, 4, 3, 2, 1];

// Button configuration
export const WRITE_REVIEW_BUTTON = {
  variant: 'outline',
  color: 'primary',
  size: 'lg',
};

// Labels and messages
export const LABELS = {
  TITLE: 'Customer Reviews',
  REVIEWS_COUNT: 'reviews',
  WRITE_REVIEW: 'Write a Review',
  NO_REVIEWS: 'No reviews yet. Be the first to review this product!',
  STAR_SYMBOL: '★',
};

// Default values
export const DEFAULTS = {
  AVERAGE: 0,
  COUNT: 0,
  DISTRIBUTION: {},
};

// Decimal places for average rating display
export const RATING_DECIMAL_PLACES = 1;

