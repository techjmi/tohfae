export const getProductName = (item) => {
  return item.productId?.basic?.name || 'Unknown Product';
};

export const getProductImage = (item) => {
  const product = item.productId;
  if (item.variantId && product?.variants) {
    const variant = product.variants.find((v) => v.id === item.variantId);
    if (variant?.media?.thumbnail) return variant.media.thumbnail;
    if (variant?.media?.images?.[0]) return variant.media.images[0];
  }
  return product?.media?.images?.[0] || '/placeholder-product.png';
};

export const getItemPrice = (item) => {
  const product = item.productId;
  if (item.variantId && product?.variants) {
    const variant = product.variants.find((v) => v.id === item.variantId);
    if (variant?.pricing?.sellingPrice) return variant.pricing.sellingPrice;
  }
  return product?.pricing?.sellingPrice || 0;
};

export const getItemMRP = (item) => {
  const product = item.productId;
  if (item.variantId && product?.variants) {
    const variant = product.variants.find((v) => v.id === item.variantId);
    if (variant?.pricing?.mrp) return variant.pricing.mrp;
  }
  return product?.pricing?.mrp || 0;
};

export const getItemPricing = (item) => {
  const sellingPrice = getItemPrice(item);
  const mrp = getItemMRP(item);
  const discount = mrp - sellingPrice;
  const discountPercent = mrp > 0 ? Math.round((discount / mrp) * 100) : 0;

  return {
    sellingPrice,
    mrp,
    discount,
    discountPercent,
    subtotal: sellingPrice * (item.quantity || 0),
  };
};

/**
 * Get variant name from cart item
 * @param {Object} item - Cart item with populated productId
 * @returns {string|null} Variant name or null
 */
export const getVariantName = (item) => {
  const product = item.productId;

  if (item.variantId && product?.variants) {
    const variant = product.variants.find((v) => v.id === item.variantId);

    // If variant has attributes, format them as name
    if (variant?.attributes) {
      const attrs = Object.entries(variant.attributes)
        .map(([, value]) => value)
        .join(', ');
      return attrs || null;
    }
  }

  return null;
};

/**
 * Calculate subtotal for cart item
 * @param {Object} item - Cart item with populated productId
 * @returns {number} Subtotal
 */
export const getItemSubtotal = (item) => {
  const price = getItemPrice(item);
  return price * (item.quantity || 0);
};

/**
 * Check if item is available
 * @param {Object} item - Cart item with populated productId
 * @returns {boolean} Is available
 */
export const isItemAvailable = (item) => {
  return item.productId?.status === 'active';
};

/**
 * Get stock info for cart item
 * @param {Object} item - Cart item with populated productId
 * @returns {Object} Stock info
 */
export const getStockInfo = (item) => {
  const product = item.productId;
  
  if (item.variantId && product?.variants) {
    const variant = product.variants.find((v) => v.id === item.variantId);
    if (variant) {
      return {
        inStock: variant.inventory?.inStock || false,
        available: variant.inventory?.available || 0,
        hasEnoughStock: (item.quantity || 0) <= (variant.inventory?.available || 0),
      };
    }
  }
  
  return {
    inStock: product?.inventory?.inStock || false,
    available: product?.inventory?.available || 0,
    hasEnoughStock: (item.quantity || 0) <= (product?.inventory?.available || 0),
  };
};

