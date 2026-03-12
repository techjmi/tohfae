/**
 * Card Helper Functions
 * Utility functions for card component
 */

/**
 * Format price with currency
 * @param {number} price - Price value
 * @param {string} currency - Currency symbol (default: ₹)
 * @returns {string} - Formatted price
 */
export const formatPrice = (price, currency = '₹') => {
  if (typeof price !== 'number') return '';
  return `${currency}${price.toLocaleString('en-IN')}`;
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} discountedPrice - Discounted price
 * @returns {number} - Discount percentage
 */
export const calculateDiscount = (originalPrice, discountedPrice) => {
  if (!originalPrice || !discountedPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Check if card has CTA
 * @param {Object} data - Card data
 * @returns {boolean} - Whether card has CTA
 */
export const hasCardCTA = (data) => {
  return data?.cta?.enabled === true;
};

/**
 * Check if card has price
 * @param {Object} data - Card data
 * @returns {boolean} - Whether card has price
 */
export const hasCardPrice = (data) => {
  return data?.price !== undefined && data?.price !== null;
};

/**
 * Check if card has actions
 * @param {Object} data - Card data
 * @returns {boolean} - Whether card has actions
 */
export const hasCardActions = (data) => {
  return data?.actions && data.actions.length > 0;
};

/**
 * Get responsive image source
 * @param {Object} image - Image object with desktop/tablet/mobile
 * @param {string} deviceType - Device type (desktop, tablet, mobile)
 * @returns {string} - Image source URL
 */
export const getResponsiveImage = (image, deviceType = 'desktop') => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  return image[deviceType] || image.desktop || image.src || '';
};

/**
 * Build CTA URL with parameters
 * @param {Object} cta - CTA object
 * @returns {string} - Complete URL with query parameters
 */
export const buildCTAUrl = (cta) => {
  if (!cta?.enabled || !cta?.url) return '#';

  let url = cta.url;

  // Add query parameters
  if (cta.params && Object.keys(cta.params).length > 0) {
    const params = new URLSearchParams(cta.params);
    url += `?${params.toString()}`;
  }

  return url;
};

