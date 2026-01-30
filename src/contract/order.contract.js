/* ======================== ORDER STATUS ======================== */
export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  FAILED: "failed",
};

/* ======================== PAYMENT STATUS ======================== */
export const PAYMENT_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
};

/* ======================== ORDER ITEM SCHEMA ======================== */
export const ORDER_ITEM_SCHEMA = {
  productId: { type: 'string', required: true },
  productName: { type: 'string', required: true },
  productSlug: { type: 'string', required: true },
  category: { type: 'string', required: true },
  quantity: { type: 'number', required: true, min: 1 },
  price: { type: 'number', required: true, min: 0 },
  thumbnail: { type: 'string', optional: true },
  
  // Customization data for personalized products
  customization: {
    type: 'object',
    optional: true,
    properties: {
      designId: { type: 'string', optional: true },
      uploadedImages: { type: 'array', optional: true },
      text: { type: 'string', optional: true },
      color: { type: 'string', optional: true },
      size: { type: 'string', optional: true },
      options: { type: 'object', optional: true },
    }
  }
};

/* ======================== ORDER SCHEMA ======================== */
export const ORDER_SCHEMA = {
  orderId: { type: 'string', required: true },
  userId: { type: 'string', required: true },
  tenantId: { type: 'string', required: true },
  
  items: { type: 'array', required: true, items: ORDER_ITEM_SCHEMA },
  
  pricing: {
    subtotal: { type: 'number', required: true, min: 0 },
    discount: { type: 'number', optional: true, default: 0 },
    deliveryCharges: { type: 'number', optional: true, default: 0 },
    codCharges: { type: 'number', optional: true, default: 0 },
    tax: { type: 'number', optional: true, default: 0 },
    total: { type: 'number', required: true, min: 0 },
  },
  
  shippingAddress: {
    fullName: { type: 'string', required: true },
    phone: { type: 'string', required: true },
    email: { type: 'string', optional: true },
    addressLine1: { type: 'string', required: true },
    addressLine2: { type: 'string', optional: true },
    city: { type: 'string', required: true },
    state: { type: 'string', required: true },
    pincode: { type: 'string', required: true },
    country: { type: 'string', required: true, default: 'India' },
  },
  
  paymentMethod: { type: 'string', required: true },
  paymentStatus: { type: 'string', required: true, enum: Object.values(PAYMENT_STATUS) },
  orderStatus: { type: 'string', required: true, enum: Object.values(ORDER_STATUS) },
  
  trackingInfo: {
    type: 'object',
    optional: true,
    properties: {
      carrier: { type: 'string', optional: true },
      trackingNumber: { type: 'string', optional: true },
      trackingUrl: { type: 'string', optional: true },
    }
  },
  
  createdAt: { type: 'date', required: true },
  updatedAt: { type: 'date', required: true },
};

/* ======================== VALIDATION FUNCTIONS ======================== */

export const validateOrderItem = (item) => {
  const errors = [];
  
  if (!item?.productId) errors.push('Product ID is required');
  if (!item?.productName) errors.push('Product name is required');
  if (!item?.quantity || item.quantity < 1) errors.push('Quantity must be at least 1');
  if (typeof item?.price !== 'number' || item.price < 0) errors.push('Valid price is required');
  
  return { isValid: errors.length === 0, errors };
};

export const validateShippingAddress = (address) => {
  const errors = [];
  
  if (!address?.fullName?.trim()) errors.push('Full name is required');
  if (!address?.phone?.trim()) errors.push('Phone number is required');
  if (!address?.addressLine1?.trim()) errors.push('Address is required');
  if (!address?.city?.trim()) errors.push('City is required');
  if (!address?.state?.trim()) errors.push('State is required');
  if (!address?.pincode?.trim()) errors.push('Pincode is required');
  
  // Validate phone number format (basic)
  if (address?.phone && !/^\d{10}$/.test(address.phone.replace(/\D/g, ''))) {
    errors.push('Invalid phone number format');
  }
  
  // Validate pincode format (basic)
  if (address?.pincode && !/^\d{6}$/.test(address.pincode.replace(/\D/g, ''))) {
    errors.push('Invalid pincode format');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateOrder = (order) => {
  const errors = [];
  
  if (!order?.items || !Array.isArray(order.items) || order.items.length === 0) {
    errors.push('Order must have at least one item');
  } else {
    order.items.forEach((item, index) => {
      const itemValidation = validateOrderItem(item);
      if (!itemValidation.isValid) {
        errors.push(`Item ${index + 1}: ${itemValidation.errors.join(', ')}`);
      }
    });
  }
  
  const addressValidation = validateShippingAddress(order?.shippingAddress);
  errors.push(...addressValidation.errors);
  
  if (!order?.paymentMethod) errors.push('Payment method is required');
  if (typeof order?.pricing?.total !== 'number' || order.pricing.total <= 0) {
    errors.push('Valid order total is required');
  }
  
  return { isValid: errors.length === 0, errors };
};

/* ======================== API REQUEST/RESPONSE CONTRACTS ======================== */

/**
 * POST /api/orders - Create new order
 */
export const CREATE_ORDER_REQUEST = {
  body: {
    items: { type: 'array', required: true, items: ORDER_ITEM_SCHEMA },
    shippingAddress: { type: 'object', required: true },
    paymentMethod: { type: 'string', required: true },
    couponCode: { type: 'string', optional: true },
  }
};

export const CREATE_ORDER_RESPONSE = {
  success: { type: 'boolean' },
  data: {
    orderId: { type: 'string' },
    orderStatus: { type: 'string' },
    paymentStatus: { type: 'string' },
    total: { type: 'number' },
    paymentUrl: { type: 'string', optional: true }, // For online payments
  }
};

/**
 * GET /api/orders - Get user's orders
 */
export const GET_ORDERS_REQUEST = {
  query: {
    status: { type: 'string', optional: true, enum: Object.values(ORDER_STATUS) },
    page: { type: 'number', optional: true, default: 1 },
    limit: { type: 'number', optional: true, default: 10 },
  }
};

export const GET_ORDERS_RESPONSE = {
  success: { type: 'boolean' },
  data: {
    orders: { type: 'array', items: 'Order' },
    pagination: {
      currentPage: { type: 'number' },
      totalPages: { type: 'number' },
      totalItems: { type: 'number' },
    }
  }
};

/**
 * GET /api/orders/:orderId - Get order details
 */
export const GET_ORDER_BY_ID_REQUEST = {
  params: {
    orderId: { type: 'string', required: true }
  }
};

export const GET_ORDER_BY_ID_RESPONSE = {
  success: { type: 'boolean' },
  data: { type: 'Order' }
};

/**
 * PUT /api/orders/:orderId/cancel - Cancel order
 */
export const CANCEL_ORDER_REQUEST = {
  params: {
    orderId: { type: 'string', required: true }
  },
  body: {
    reason: { type: 'string', optional: true }
  }
};

export const CANCEL_ORDER_RESPONSE = {
  success: { type: 'boolean' },
  message: { type: 'string' },
  data: {
    orderId: { type: 'string' },
    orderStatus: { type: 'string' },
  }
};

/**
 * GET /api/orders/:orderId/track - Track order
 */
export const TRACK_ORDER_REQUEST = {
  params: {
    orderId: { type: 'string', required: true }
  }
};

export const TRACK_ORDER_RESPONSE = {
  success: { type: 'boolean' },
  data: {
    orderId: { type: 'string' },
    orderStatus: { type: 'string' },
    trackingInfo: { type: 'object', optional: true },
    statusHistory: {
      type: 'array',
      items: {
        status: { type: 'string' },
        timestamp: { type: 'date' },
        message: { type: 'string', optional: true },
      }
    }
  }
};

