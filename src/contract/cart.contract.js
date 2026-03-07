/* ======================== DATABASE SCHEMA (STORED) ======================== */
/**
 * What is actually stored in the database
 * Minimal data to avoid duplication and sync issues
 */
export const CART_ITEM_DB_SCHEMA = {
  cartItemId: { type: 'string', required: true },
  userId: { type: 'string', required: true },
  productId: { type: 'string', required: true },
  variantId: { type: 'string', optional: true },
  quantity: { type: 'number', required: true, min: 1 },
  customization: { type: 'object', optional: true },
  addedAt: { type: 'date', required: true },
  updatedAt: { type: 'date', required: true },
};

/* ======================== API RESPONSE SCHEMA (ENRICHED) ======================== */
/**
 * What the API returns after enriching with product data
 * This is what the frontend receives
 */
export const CART_ITEM_API_SCHEMA = {
  // Cart item data (from database)
  cartItemId: { type: 'string', required: true },
  productId: { type: 'string', required: true },
  variantId: { type: 'string', optional: true },
  quantity: { type: 'number', required: true, min: 1 },
  customization: { type: 'object', optional: true },
  addedAt: { type: 'date', required: true },

  // Product data (fetched and joined)
  product: {
    type: 'object',
    required: true,
    properties: {
      name: { type: 'string', required: true },
      slug: { type: 'string', required: true },
      category: { type: 'string', required: true },
      thumbnail: { type: 'string', required: true },
      brand: { type: 'string', optional: true },
    }
  },

  // Variant data (if variantId exists)
  variant: {
    type: 'object',
    optional: true,
    properties: {
      sku: { type: 'string', required: true },
      attributes: { type: 'object', required: true }, // { size: 'M', color: 'Black' }
      inStock: { type: 'boolean', required: true },
      stockQuantity: { type: 'number', required: true },
    }
  },

  // Pricing data (from product/variant)
  pricing: {
    type: 'object',
    required: true,
    properties: {
      mrp: { type: 'number', required: true },
      sellingPrice: { type: 'number', required: true },
      discount: { type: 'number', optional: true },
      currency: { type: 'string', required: true, default: 'INR' },
    }
  },

  // Calculated fields
  itemTotal: { type: 'number', required: true }, // sellingPrice * quantity
  itemDiscount: { type: 'number', optional: true }, // (mrp - sellingPrice) * quantity

  // Availability
  isAvailable: { type: 'boolean', required: true },
  maxQuantity: { type: 'number', optional: true },
  stockStatus: { type: 'string', required: true }, // 'in_stock', 'low_stock', 'out_of_stock'
};

/* ======================== CART API RESPONSE SCHEMA ======================== */
/**
 * Complete cart response from API
 * Includes enriched items with product data
 */
export const CART_API_SCHEMA = {
  cartId: { type: 'string', required: true },
  userId: { type: 'string', required: true },
  tenantId: { type: 'string', required: true },

  // Enriched cart items
  items: { type: 'array', required: true, items: CART_ITEM_API_SCHEMA },

  // Cart summary (calculated by backend)
  summary: {
    type: 'object',
    required: true,
    properties: {
      itemCount: { type: 'number', required: true }, // Total items
      totalQuantity: { type: 'number', required: true }, // Sum of all quantities
      subtotal: { type: 'number', required: true }, // Sum of all itemTotal
      totalDiscount: { type: 'number', required: true }, // Sum of all itemDiscount
      deliveryCharges: { type: 'number', required: true },
      couponDiscount: { type: 'number', optional: true, default: 0 },
      estimatedTotal: { type: 'number', required: true }, // Final amount
      currency: { type: 'string', required: true, default: 'INR' },
    }
  },

  // Applied coupon
  appliedCoupon: {
    type: 'object',
    optional: true,
    properties: {
      code: { type: 'string', required: true },
      discountAmount: { type: 'number', required: true },
      discountType: { type: 'string', required: true }, // 'percentage', 'flat'
      discountValue: { type: 'number', required: true },
    }
  },

  // Delivery info
  deliveryInfo: {
    type: 'object',
    optional: true,
    properties: {
      isFreeDelivery: { type: 'boolean', required: true },
      freeDeliveryThreshold: { type: 'number', optional: true },
      amountToFreeDelivery: { type: 'number', optional: true },
    }
  },

  updatedAt: { type: 'date', required: true },
};

/* ======================== VALIDATION FUNCTIONS ======================== */

// Validate cart item from database
export const validateCartItemDB = (item) => {
  const errors = [];

  if (!item?.productId) errors.push('Product ID is required');
  if (!item?.userId) errors.push('User ID is required');
  if (!item?.quantity || item.quantity < 1) errors.push('Quantity must be at least 1');

  return { isValid: errors.length === 0, errors };
};

// Validate enriched cart item from API
export const validateCartItemAPI = (item) => {
  const errors = [];

  if (!item?.productId) errors.push('Product ID is required');
  if (!item?.quantity || item.quantity < 1) errors.push('Quantity must be at least 1');
  if (!item?.product?.name) errors.push('Product name is required');
  if (!item?.pricing?.sellingPrice) errors.push('Product price is required');
  if (typeof item?.isAvailable !== 'boolean') errors.push('Availability status is required');

  if (item?.maxQuantity && item.quantity > item.maxQuantity) {
    errors.push(`Quantity cannot exceed ${item.maxQuantity}`);
  }

  return { isValid: errors.length === 0, errors };
};

// Validate complete cart response
export const validateCart = (cart) => {
  const errors = [];

  if (!cart?.cartId) errors.push('Cart ID is required');
  if (!cart?.userId) errors.push('User ID is required');

  if (!cart?.items || !Array.isArray(cart.items)) {
    errors.push('Cart items must be an array');
  } else {
    cart.items.forEach((item, index) => {
      const itemValidation = validateCartItemAPI(item);
      if (!itemValidation.isValid) {
        errors.push(`Item ${index + 1}: ${itemValidation.errors.join(', ')}`);
      }
    });
  }

  if (!cart?.summary) errors.push('Cart summary is required');

  return { isValid: errors.length === 0, errors };
};

/* ======================== API REQUEST/RESPONSE CONTRACTS ======================== */

/**
 * GET /api/cart - Get user's cart with enriched product data
 * Backend will:
 * 1. Fetch cart items from database (productId, variantId, quantity)
 * 2. Fetch product details for each item
 * 3. Calculate pricing, totals, availability
 * 4. Return enriched cart
 */
export const GET_CART_REQUEST = {
  headers: {
    authorization: { type: 'string', required: true }, // JWT token
  }
};

export const GET_CART_RESPONSE = {
  success: { type: 'boolean', required: true },
  data: CART_API_SCHEMA, // Enriched cart with all product data
  message: { type: 'string', optional: true },
};

/**
 * POST /api/cart/items - Add item to cart
 * Only stores minimal data (productId, variantId, quantity)
 */
export const ADD_TO_CART_REQUEST = {
  body: {
    productId: { type: 'string', required: true },
    variantId: { type: 'string', optional: true },
    quantity: { type: 'number', required: true, min: 1, default: 1 },
    customization: { type: 'object', optional: true },
  }
};

export const ADD_TO_CART_RESPONSE = {
  success: { type: 'boolean', required: true },
  message: { type: 'string', required: true },
  data: {
    cartItemId: { type: 'string', required: true },
    itemCount: { type: 'number', required: true },
    totalQuantity: { type: 'number', required: true },
    estimatedTotal: { type: 'number', required: true },
  }
};

/**
 * PUT /api/cart/items/:cartItemId - Update cart item quantity
 */
export const UPDATE_CART_ITEM_REQUEST = {
  params: {
    cartItemId: { type: 'string', required: true }
  },
  body: {
    quantity: { type: 'number', required: true, min: 1 },
  }
};

export const UPDATE_CART_ITEM_RESPONSE = {
  success: { type: 'boolean', required: true },
  message: { type: 'string', required: true },
  data: {
    cartItemId: { type: 'string', required: true },
    quantity: { type: 'number', required: true },
    itemTotal: { type: 'number', required: true },
    estimatedTotal: { type: 'number', required: true },
  }
};

/**
 * DELETE /api/cart/items/:cartItemId - Remove item from cart
 */
export const REMOVE_FROM_CART_REQUEST = {
  params: {
    cartItemId: { type: 'string', required: true }
  }
};

export const REMOVE_FROM_CART_RESPONSE = {
  success: { type: 'boolean', required: true },
  message: { type: 'string', required: true },
  data: {
    itemCount: { type: 'number', required: true },
    totalQuantity: { type: 'number', required: true },
    estimatedTotal: { type: 'number', required: true },
  }
};

/**
 * DELETE /api/cart - Clear entire cart
 */
export const CLEAR_CART_REQUEST = {
  body: {}
};

export const CLEAR_CART_RESPONSE = {
  success: { type: 'boolean', required: true },
  message: { type: 'string', required: true }
};

/**
 * POST /api/cart/coupon - Apply coupon code
 */
export const APPLY_COUPON_REQUEST = {
  body: {
    couponCode: { type: 'string', required: true }
  }
};

export const APPLY_COUPON_RESPONSE = {
  success: { type: 'boolean', required: true },
  message: { type: 'string', required: true },
  data: {
    couponCode: { type: 'string', required: true },
    discountAmount: { type: 'number', required: true },
    discountType: { type: 'string', required: true },
    discountValue: { type: 'number', required: true },
    estimatedTotal: { type: 'number', required: true },
  }
};

/**
 * DELETE /api/cart/coupon - Remove applied coupon
 */
export const REMOVE_COUPON_REQUEST = {
  body: {}
};

export const REMOVE_COUPON_RESPONSE = {
  success: { type: 'boolean', required: true },
  message: { type: 'string', required: true },
  data: {
    estimatedTotal: { type: 'number', required: true },
  }
};

/* ======================== HELPER FUNCTIONS ======================== */

/**
 * Calculate item total
 */
export const calculateItemTotal = (sellingPrice, quantity) => {
  return sellingPrice * quantity;
};

/**
 * Calculate item discount
 */
export const calculateItemDiscount = (mrp, sellingPrice, quantity) => {
  return (mrp - sellingPrice) * quantity;
};

/**
 * Calculate cart summary
 */
export const calculateCartSummary = (items, deliveryCharges = 0, couponDiscount = 0) => {
  const itemCount = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
  const totalDiscount = items.reduce((sum, item) => sum + (item.itemDiscount || 0), 0);
  const estimatedTotal = subtotal - couponDiscount + deliveryCharges;

  return {
    itemCount,
    totalQuantity,
    subtotal,
    totalDiscount,
    deliveryCharges,
    couponDiscount,
    estimatedTotal,
    currency: 'INR',
  };
};

/**
 * Check if item is available
 */
export const checkItemAvailability = (product, variant, quantity) => {
  if (!product) return { isAvailable: false, stockStatus: 'out_of_stock' };

  const stockQuantity = variant?.inventory?.stockQuantity || product?.inventory?.stockQuantity || 0;
  const inStock = variant?.inventory?.inStock ?? product?.inventory?.inStock ?? false;

  if (!inStock || stockQuantity === 0) {
    return { isAvailable: false, stockStatus: 'out_of_stock', maxQuantity: 0 };
  }

  if (quantity > stockQuantity) {
    return { isAvailable: false, stockStatus: 'insufficient_stock', maxQuantity: stockQuantity };
  }

  const stockStatus = stockQuantity < 5 ? 'low_stock' : 'in_stock';

  return { isAvailable: true, stockStatus, maxQuantity: stockQuantity };
};

/**
 * Get stock status label
 */
export const getStockStatusLabel = (stockStatus) => {
  const labels = {
    in_stock: 'In Stock',
    low_stock: 'Only few left',
    out_of_stock: 'Out of Stock',
    insufficient_stock: 'Not enough stock',
  };
  return labels[stockStatus] || 'Unknown';
};

/* ======================== EXAMPLE DATA ======================== */

/**
 * Example: What is stored in database
 */
export const EXAMPLE_CART_ITEM_DB = {
  cartItemId: 'cart_item_001',
  userId: 'user_123',
  productId: 'prod_tshirt_001',
  variantId: 'var_tshirt_001_s_black',
  quantity: 2,
  customization: {
    text: 'Happy Birthday',
    color: '#FF0000',
  },
  addedAt: new Date('2024-01-15T10:30:00Z'),
  updatedAt: new Date('2024-01-15T10:30:00Z'),
};

/**
 * Example: What API returns (enriched)
 */
export const EXAMPLE_CART_ITEM_API = {
  cartItemId: 'cart_item_001',
  productId: 'prod_tshirt_001',
  variantId: 'var_tshirt_001_s_black',
  quantity: 2,
  customization: {
    text: 'Happy Birthday',
    color: '#FF0000',
  },
  addedAt: new Date('2024-01-15T10:30:00Z'),

  // Enriched product data
  product: {
    name: 'Custom Printed T-Shirt',
    slug: 'custom-tshirt-black',
    category: 'tshirt',
    thumbnail: '/images/tshirt-black.jpg',
    brand: 'Tohfae',
  },

  // Enriched variant data
  variant: {
    sku: 'TSH-BLK-S-001',
    attributes: { size: 'S', color: 'Black' },
    inStock: true,
    stockQuantity: 50,
  },

  // Pricing
  pricing: {
    mrp: 1000,
    sellingPrice: 900,
    discount: 100,
    currency: 'INR',
  },

  // Calculated
  itemTotal: 1800, // 900 * 2
  itemDiscount: 200, // (1000 - 900) * 2

  // Availability
  isAvailable: true,
  maxQuantity: 50,
  stockStatus: 'in_stock',
};

/**
 * Example: Complete cart response
 */
export const EXAMPLE_CART_API = {
  cartId: 'cart_123',
  userId: 'user_123',
  tenantId: 'default',

  items: [EXAMPLE_CART_ITEM_API],

  summary: {
    itemCount: 1,
    totalQuantity: 2,
    subtotal: 1800,
    totalDiscount: 200,
    deliveryCharges: 50,
    couponDiscount: 0,
    estimatedTotal: 1850,
    currency: 'INR',
  },

  appliedCoupon: null,

  deliveryInfo: {
    isFreeDelivery: false,
    freeDeliveryThreshold: 999,
    amountToFreeDelivery: 0, // Already above threshold
  },

  updatedAt: new Date('2024-01-15T10:30:00Z'),
};

/**
 * Example: Add to cart response
 */
export const EXAMPLE_ADD_TO_CART_RESPONSE = {
  success: true,
  message: 'Item added to cart successfully',
  data: {
    cartItemId: 'cart_item_001',
    itemCount: 1,
    totalQuantity: 2,
    estimatedTotal: 1850,
  }
};

/**
 * Example: Update cart item response
 */
export const EXAMPLE_UPDATE_CART_ITEM_RESPONSE = {
  success: true,
  message: 'Cart item updated successfully',
  data: {
    cartItemId: 'cart_item_001',
    quantity: 3,
    itemTotal: 2700,
    estimatedTotal: 2750,
  }
};

/**
 * Example: Remove from cart response
 */
export const EXAMPLE_REMOVE_FROM_CART_RESPONSE = {
  success: true,
  message: 'Item removed from cart successfully',
  data: {
    itemCount: 0,
    totalQuantity: 0,
    estimatedTotal: 0,
  }
};

/**
 * Example: Clear cart response
 */
export const EXAMPLE_CLEAR_CART_RESPONSE = {
  success: true,
  message: 'Cart cleared successfully'
};

/**
 * Example: Apply coupon response
 */
export const EXAMPLE_APPLY_COUPON_RESPONSE = {
  success: true,
  message: 'Coupon applied successfully',
  data: {
    couponCode: 'SAVE10',
    discountAmount: 185,
    discountType: 'percentage',
    discountValue: 10,
    estimatedTotal: 1665,
  }
};

/**
 * Example: Remove coupon response
 */
export const EXAMPLE_REMOVE_COUPON_RESPONSE = {
  success: true,
  message: 'Coupon removed successfully',
  data: {
    estimatedTotal: 1850,
  }
};

