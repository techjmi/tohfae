/**
 * Product Actions Constants
 */

export const QUANTITY_LIMITS = {
  MIN: 1,
  MAX: 10,
  DEFAULT: 1,
};

export const BUTTON_VARIANTS = {
  ADD_TO_CART: {
    variant: 'solid',
    color: 'primary',
    size: 'lg',
  },
  BUY_NOW: {
    variant: 'outline',
    color: 'primary',
    size: 'lg',
  },
  WISHLIST: {
    variant: 'outline',
    color: 'neutral',
    size: 'lg',
  },
  SHARE: {
    variant: 'outline',
    color: 'neutral',
    size: 'lg',
  },
  QUANTITY: {
    variant: 'ghost',
    color: 'neutral',
    size: 'sm',
  },
};

export const MESSAGES = {
  ADDED_TO_CART: 'Product added to cart',
  ADDED_TO_WISHLIST: 'Added to wishlist',
  REMOVED_FROM_WISHLIST: 'Removed from wishlist',
  MAX_QUANTITY_REACHED: 'Maximum quantity reached',
  MIN_QUANTITY_REACHED: 'Minimum quantity is 1',
};

