/* ======================== CART ITEM SCHEMA ======================== */
export const CART_ITEM_SCHEMA = {
  cartItemId: { type: 'string', required: true },
  productId: { type: 'string', required: true },
  productName: { type: 'string', required: true },
  productSlug: { type: 'string', required: true },
  category: { type: 'string', required: true },
  thumbnail: { type: 'string', optional: true },
  
  quantity: { type: 'number', required: true, min: 1 },
  price: { type: 'number', required: true, min: 0 },
  mrp: { type: 'number', optional: true },
  
  // Customization/design reference
  customization: {
    type: 'object',
    optional: true,
    properties: {
      designId: { type: 'string', optional: true },
      previewUrl: { type: 'string', optional: true },
      options: { type: 'object', optional: true },
    }
  },
  
  // Availability
  inStock: { type: 'boolean', required: true },
  maxQuantity: { type: 'number', optional: true },
  
  addedAt: { type: 'date', required: true },
};

/* ======================== CART SCHEMA ======================== */
export const CART_SCHEMA = {
  cartId: { type: 'string', required: true },
  userId: { type: 'string', required: true },
  tenantId: { type: 'string', required: true },
  
  items: { type: 'array', required: true, items: CART_ITEM_SCHEMA },
  
  summary: {
    itemCount: { type: 'number', required: true },
    subtotal: { type: 'number', required: true },
    discount: { type: 'number', optional: true, default: 0 },
    deliveryCharges: { type: 'number', optional: true, default: 0 },
    estimatedTotal: { type: 'number', required: true },
  },
  
  appliedCoupon: {
    type: 'object',
    optional: true,
    properties: {
      code: { type: 'string' },
      discountAmount: { type: 'number' },
      discountType: { type: 'string' },
    }
  },
  
  updatedAt: { type: 'date', required: true },
};

/* ======================== VALIDATION FUNCTIONS ======================== */

export const validateCartItem = (item) => {
  const errors = [];
  
  if (!item?.productId) errors.push('Product ID is required');
  if (!item?.productName) errors.push('Product name is required');
  if (!item?.quantity || item.quantity < 1) errors.push('Quantity must be at least 1');
  if (typeof item?.price !== 'number' || item.price < 0) errors.push('Valid price is required');
  if (typeof item?.inStock !== 'boolean') errors.push('Stock status is required');
  
  if (item?.maxQuantity && item.quantity > item.maxQuantity) {
    errors.push(`Quantity cannot exceed ${item.maxQuantity}`);
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateCart = (cart) => {
  const errors = [];
  
  if (!cart?.cartId) errors.push('Cart ID is required');
  if (!cart?.userId) errors.push('User ID is required');
  
  if (!cart?.items || !Array.isArray(cart.items)) {
    errors.push('Cart items must be an array');
  } else {
    cart.items.forEach((item, index) => {
      const itemValidation = validateCartItem(item);
      if (!itemValidation.isValid) {
        errors.push(`Item ${index + 1}: ${itemValidation.errors.join(', ')}`);
      }
    });
  }
  
  return { isValid: errors.length === 0, errors };
};

/* ======================== API REQUEST/RESPONSE CONTRACTS ======================== */

/**
 * GET /api/cart - Get user's cart
 */
export const GET_CART_REQUEST = {
  query: {}
};

export const GET_CART_RESPONSE = {
  success: { type: 'boolean' },
  data: { type: 'Cart' }
};

/**
 * POST /api/cart/items - Add item to cart
 */
export const ADD_TO_CART_REQUEST = {
  body: {
    productId: { type: 'string', required: true },
    quantity: { type: 'number', required: true, min: 1 },
    customization: { type: 'object', optional: true },
  }
};

export const ADD_TO_CART_RESPONSE = {
  success: { type: 'boolean' },
  message: { type: 'string' },
  data: {
    cartItemId: { type: 'string' },
    itemCount: { type: 'number' },
    estimatedTotal: { type: 'number' },
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
  success: { type: 'boolean' },
  message: { type: 'string' },
  data: {
    cartItemId: { type: 'string' },
    quantity: { type: 'number' },
    estimatedTotal: { type: 'number' },
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
  success: { type: 'boolean' },
  message: { type: 'string' },
  data: {
    itemCount: { type: 'number' },
    estimatedTotal: { type: 'number' },
  }
};

/**
 * DELETE /api/cart - Clear entire cart
 */
export const CLEAR_CART_REQUEST = {
  body: {}
};

export const CLEAR_CART_RESPONSE = {
  success: { type: 'boolean' },
  message: { type: 'string' }
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
  success: { type: 'boolean' },
  message: { type: 'string' },
  data: {
    couponCode: { type: 'string' },
    discountAmount: { type: 'number' },
    discountType: { type: 'string' },
    estimatedTotal: { type: 'number' },
  }
};

/**
 * DELETE /api/cart/coupon - Remove applied coupon
 */
export const REMOVE_COUPON_REQUEST = {
  body: {}
};

export const REMOVE_COUPON_RESPONSE = {
  success: { type: 'boolean' },
  message: { type: 'string' },
  data: {
    estimatedTotal: { type: 'number' },
  }
};

