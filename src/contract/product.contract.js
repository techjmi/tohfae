/* ======================== IMPORTS ======================== */
import { images } from './testing.image.js';

/* ======================== PRODUCT CATEGORIES ======================== */
export const PRODUCT_CATEGORY = {
  TSHIRT: "tshirt",
  MUG: "mug",
  CLOTHING: "clothing",
  GIFT: "gift",
  FRAME: "frame",
  CUSHION: "cushion",
  KEYCHAIN: "keychain",
  CALENDAR: "calendar",
  POSTER: "poster",
  CARD: "card",
};

/* ======================== PRODUCT STATUS ======================== */
export const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  OUT_OF_STOCK: "out_of_stock",
  DISCONTINUED: "discontinued",
};

/* ======================== DISCOUNT TYPES ======================== */
export const DISCOUNT_TYPE = {
  PERCENTAGE: "percentage",
  FLAT: "flat",
  BUY_X_GET_Y: "buy_x_get_y",
};

/* ======================== PAYMENT OPTIONS ======================== */
export const PAYMENT_METHOD = {
  COD: "cod",
  ONLINE: "online",
  EMI: "emi",
  NETBANKING: "netbanking",
  WALLET: "wallet",
  GIFTCARD: "giftcard",
  UPI: "upi",
};

/* ======================== CONFIGURATOR TYPES ======================== */
export const CONFIGURATOR_TYPE = {
  TSHIRT: "tshirt",
  MUG: "mug",
  FRAME: "frame",
  CUSHION: "cushion",
  GENERIC: "generic",
};

export const PRODUCT_DATA = [
  /* -------------------------------- T-SHIRT -------------------------------- */
  {
    id: "prod_tshirt_001",
    slug: "custom-tshirt-black",
    tenantId: "default",

    category: PRODUCT_CATEGORY.TSHIRT,

    basic: {
      name: "Custom Printed T-Shirt",
      shortDescription: "Premium cotton customizable t-shirt",
      description:
        "Design your own t-shirt with text, images or logos. Soft and durable fabric.",
      brand: "Tohfae",
    },

    media: {
      images: [
        images[0].image_1,
        images[0].image_2,
      ],
      thumbnail: images[0].image_1,
    },

    pricing: {
      currency: "INR",
      mrp: 1000,
      sellingPrice: 900,

      discount: {
        type: "percentage",
        value: 10,
        label: "10% OFF",
      },

      paymentOptions: {
        cash: { enabled: true, price: 900 },
        emi: {
          enabled: true,
          plans: [
            { months: 3, monthlyAmount: 300, interestRate: 0 },
            { months: 6, monthlyAmount: 160, interestRate: 5 },
          ],
        },
      },

      delivery: {
        charges: 50,
        freeAbove: 999,
      },

      cod: {
        available: true, //can be true or false by deafult it is true
        extraCharges: 10,
      },

      availablePaymentMethods: [
        PAYMENT_METHOD.COD,
        PAYMENT_METHOD.ONLINE,
        PAYMENT_METHOD.EMI,
        PAYMENT_METHOD.NETBANKING,
        PAYMENT_METHOD.WALLET,
        PAYMENT_METHOD.GIFTCARD,
        PAYMENT_METHOD.UPI,
      ],
    },

    offers: [
      {
        id: "deal_15",
        type: "percentage",
        value: 15,
        label: "15% OFF",
        tag: "Deal of the Day",
        applicable: true,
      },
    ],

    inventory: {
      inStock: true,
      quantity: 120,
    },

    specifications: [
      { key: "Fabric", value: "100% Cotton" },
      { key: "Fit", value: "Regular" },
      { key: "Sleeve", value: "Half Sleeve" },
    ],

    configurator: {
      enabled: true,
      type: "tshirt",
      options: [
        {
          key: "color",
          label: "Color",
          values: ["black", "white", "blue"],
        },
        {
          key: "print",
          label: "Print",
          values: ["text", "image", "logo"],
        },
        {
          key: "size",
          label: "Size",
          values: ["S", "M", "L", "XL"],
        },
      ],
    },

    status: {
      isActive: true,
      isFeatured: true,
    },
  },

  /* ---------------------------------- MUG ---------------------------------- */
  {
    id: "prod_mug_001",
    slug: "custom-photo-mug",
    tenantId: "default",

    category: PRODUCT_CATEGORY.MUG,

    basic: {
      name: "Personalized Photo Mug",
      shortDescription: "Custom photo printed ceramic mug",
      description:
        "Add your favorite photo or name and create a personalized mug.",
      brand: "Tohfae",
    },

    media: {
      images: [
        images[0].image_2,
        images[0].image_3,
      ],
      thumbnail: images[0].image_2,
    },

    pricing: {
      currency: "INR",
      mrp: 499,
      sellingPrice: 399,

      discount: {
        type: "flat",
        value: 100,
        label: "₹100 OFF",
      },

      paymentOptions: {
        cash: { enabled: true, price: 399 },
        emi: { enabled: false },
      },

      delivery: {
        charges: 40,
        freeAbove: 599,
      },

      cod: {
        available: true,
        extraCharges: 10,
      },

      availablePaymentMethods: [
        PAYMENT_METHOD.COD,
        PAYMENT_METHOD.ONLINE,
        PAYMENT_METHOD.UPI,
        PAYMENT_METHOD.WALLET,
      ],
    },

    offers: [
      {
        id: "loot_01",
        type: "loot",
        label: "Loot Deal",
        description: "Limited time offer",
        applicable: true,
      },
    ],

    inventory: {
      inStock: true,
      quantity: 80,
    },

    specifications: [
      { key: "Material", value: "Ceramic" },
      { key: "Capacity", value: "325 ml" },
      { key: "Finish", value: "Glossy" },
    ],

    configurator: {
      enabled: true,
      type: "mug",
      options: [
        {
          key: "design",
          label: "Design Type",
          values: ["photo", "text", "couple"],
        },
        {
          key: "photoUpload",
          label: "Upload Photo",
          type: "image",
          required: true,
        },
      ],
    },

    status: {
      isActive: true,
      isFeatured: false,
    },
  },

  /* --------------------------------- FRAME --------------------------------- */
  {
    id: "prod_frame_001",
    slug: "custom-photo-frame",
    tenantId: "default",

    category: PRODUCT_CATEGORY.FRAME,

    basic: {
      name: "Personalized Photo Frame",
      shortDescription: "Wooden photo frame with custom engraving",
      description:
        "Beautiful wooden frame with your favorite photo and custom message engraved.",
      brand: "Tohfae",
    },

    media: {
      images: [
        images[0].image_3,
        images[0].image_1,
      ],
      thumbnail: images[0].image_3,
    },

    pricing: {
      currency: "INR",
      mrp: 799,
      sellingPrice: 649,

      discount: {
        type: "percentage",
        value: 19,
        label: "19% OFF",
      },

      paymentOptions: {
        cash: { enabled: true, price: 649 },
        emi: { enabled: false },
      },

      delivery: {
        charges: 60,
        freeAbove: 999,
      },

      cod: {
        available: true,
        extraCharges: 10,
      },

      availablePaymentMethods: [
        PAYMENT_METHOD.COD,
        PAYMENT_METHOD.ONLINE,
        PAYMENT_METHOD.UPI,
        PAYMENT_METHOD.WALLET,
      ],
    },

    offers: [],

    inventory: {
      inStock: true,
      quantity: 50,
    },

    specifications: [
      { key: "Material", value: "Wood" },
      { key: "Size", value: "8x10 inches" },
      { key: "Finish", value: "Matte" },
    ],

    configurator: {
      enabled: true,
      type: CONFIGURATOR_TYPE.FRAME,
      options: [
        {
          key: "size",
          label: "Frame Size",
          values: ["6x8", "8x10", "10x12"],
        },
        {
          key: "photoUpload",
          label: "Upload Photo",
          type: "image",
          required: true,
        },
        {
          key: "engraving",
          label: "Custom Message",
          type: "text",
          maxLength: 50,
        },
      ],
    },

    status: {
      isActive: true,
      isFeatured: true,
    },
  },

  /* -------------------------------- CUSHION -------------------------------- */
  {
    id: "prod_cushion_001",
    slug: "custom-printed-cushion",
    tenantId: "default",

    category: PRODUCT_CATEGORY.CUSHION,

    basic: {
      name: "Custom Printed Cushion",
      shortDescription: "Soft cushion with personalized print",
      description:
        "Comfortable cushion with your custom design or photo printed on it.",
      brand: "Tohfae",
    },

    media: {
      images: [
        images[0].image_1,
        images[0].image_3,
      ],
      thumbnail: images[0].image_1,
    },

    pricing: {
      currency: "INR",
      mrp: 599,
      sellingPrice: 499,

      discount: {
        type: "flat",
        value: 100,
        label: "₹100 OFF",
      },

      paymentOptions: {
        cash: { enabled: true, price: 499 },
        emi: { enabled: false },
      },

      delivery: {
        charges: 50,
        freeAbove: 799,
      },

      cod: {
        available: true,
        extraCharges: 10,
      },

      availablePaymentMethods: [
        PAYMENT_METHOD.COD,
        PAYMENT_METHOD.ONLINE,
        PAYMENT_METHOD.UPI,
      ],
    },

    offers: [],

    inventory: {
      inStock: true,
      quantity: 100,
    },

    specifications: [
      { key: "Material", value: "Polyester" },
      { key: "Size", value: "16x16 inches" },
      { key: "Filling", value: "Fiber" },
    ],

    configurator: {
      enabled: true,
      type: CONFIGURATOR_TYPE.CUSHION,
      options: [
        {
          key: "design",
          label: "Design Type",
          values: ["photo", "text", "pattern"],
        },
        {
          key: "photoUpload",
          label: "Upload Photo",
          type: "image",
          required: false,
        },
      ],
    },

    status: {
      isActive: true,
      isFeatured: false,
    },
  },
];

/* ======================== HELPER FUNCTIONS ======================== */

/**
 * Calculate total price including COD charges if applicable
 */
export const calculateTotalPrice = (product, paymentMethod, quantity = 1) => {
  let total = product.pricing.sellingPrice * quantity;

  // Add COD charges if payment method is COD and COD is available
  if (paymentMethod === PAYMENT_METHOD.COD && product.pricing.cod?.available) {
    total += product.pricing.cod.extraCharges;
  }

  // Add delivery charges if applicable
  if (product.pricing.delivery) {
    const subtotal = product.pricing.sellingPrice * quantity;
    if (subtotal < product.pricing.delivery.freeAbove) {
      total += product.pricing.delivery.charges;
    }
  }

  return total;
};

/**
 * Check if a payment method is available for a product
 */
export const isPaymentMethodAvailable = (product, paymentMethod) => {
  if (!product.pricing.availablePaymentMethods) {
    return false;
  }
  return product.pricing.availablePaymentMethods.includes(paymentMethod);
};

/**
 * Get COD charges for a product
 */
export const getCodCharges = (product) => {
  if (product.pricing.cod?.available) {
    return product.pricing.cod.extraCharges || 0;
  }
  return 0;
};

/**
 * Calculate delivery charges based on order value
 */
export const calculateDeliveryCharges = (product, quantity = 1) => {
  if (!product.pricing.delivery) {
    return 0;
  }

  const subtotal = product.pricing.sellingPrice * quantity;

  if (subtotal >= product.pricing.delivery.freeAbove) {
    return 0;
  }

  return product.pricing.delivery.charges;
};

/* ======================== VALIDATION SCHEMAS ======================== */

/**
 * Validates product basic information
 */
export const validateProductBasic = (basic) => {
  const errors = [];

  if (!basic?.name || typeof basic.name !== 'string' || basic.name.trim().length === 0) {
    errors.push('Product name is required');
  }

  if (basic?.name && basic.name.length > 200) {
    errors.push('Product name must be less than 200 characters');
  }

  if (!basic?.shortDescription || typeof basic.shortDescription !== 'string') {
    errors.push('Short description is required');
  }

  if (basic?.shortDescription && basic.shortDescription.length > 500) {
    errors.push('Short description must be less than 500 characters');
  }

  return { isValid: errors.length === 0, errors };
};

/**
 * Validates product pricing
 */
export const validateProductPricing = (pricing) => {
  const errors = [];

  if (!pricing?.currency || typeof pricing.currency !== 'string') {
    errors.push('Currency is required');
  }

  if (typeof pricing?.mrp !== 'number' || pricing.mrp <= 0) {
    errors.push('MRP must be a positive number');
  }

  if (typeof pricing?.sellingPrice !== 'number' || pricing.sellingPrice <= 0) {
    errors.push('Selling price must be a positive number');
  }

  if (pricing?.mrp && pricing?.sellingPrice && pricing.sellingPrice > pricing.mrp) {
    errors.push('Selling price cannot be greater than MRP');
  }

  // Validate COD settings
  if (pricing?.cod) {
    if (typeof pricing.cod.available !== 'boolean') {
      errors.push('COD availability must be a boolean');
    }
    if (pricing.cod.available && typeof pricing.cod.extraCharges !== 'number') {
      errors.push('COD extra charges must be a number');
    }
  }

  // Validate payment methods
  if (pricing?.availablePaymentMethods) {
    if (!Array.isArray(pricing.availablePaymentMethods)) {
      errors.push('Available payment methods must be an array');
    } else {
      const validMethods = Object.values(PAYMENT_METHOD);
      pricing.availablePaymentMethods.forEach(method => {
        if (!validMethods.includes(method)) {
          errors.push(`Invalid payment method: ${method}`);
        }
      });
    }
  }

  return { isValid: errors.length === 0, errors };
};

/**
 * Validates product inventory
 */
export const validateProductInventory = (inventory) => {
  const errors = [];

  if (typeof inventory?.inStock !== 'boolean') {
    errors.push('inStock must be a boolean');
  }

  if (typeof inventory?.quantity !== 'number' || inventory.quantity < 0) {
    errors.push('Quantity must be a non-negative number');
  }

  return { isValid: errors.length === 0, errors };
};

/**
 * Validates complete product object
 */
export const validateProduct = (product) => {
  const errors = [];

  if (!product?.id || typeof product.id !== 'string') {
    errors.push('Product ID is required');
  }

  if (!product?.slug || typeof product.slug !== 'string') {
    errors.push('Product slug is required');
  }

  if (!product?.category || !Object.values(PRODUCT_CATEGORY).includes(product.category)) {
    errors.push('Valid product category is required');
  }

  const basicValidation = validateProductBasic(product?.basic);
  const pricingValidation = validateProductPricing(product?.pricing);
  const inventoryValidation = validateProductInventory(product?.inventory);

  errors.push(...basicValidation.errors);
  errors.push(...pricingValidation.errors);
  errors.push(...inventoryValidation.errors);

  return { isValid: errors.length === 0, errors };
};

/* ======================== API REQUEST/RESPONSE CONTRACTS ======================== */

/**
 * GET /api/products - Get all products
 * Query params: category, featured, inStock, page, limit, sort
 */
export const GET_PRODUCTS_REQUEST = {
  query: {
    category: { type: 'string', optional: true, enum: Object.values(PRODUCT_CATEGORY) },
    featured: { type: 'boolean', optional: true },
    inStock: { type: 'boolean', optional: true },
    page: { type: 'number', optional: true, default: 1, min: 1 },
    limit: { type: 'number', optional: true, default: 20, min: 1, max: 100 },
    sort: { type: 'string', optional: true, enum: ['price_asc', 'price_desc', 'name_asc', 'name_desc', 'newest'] },
    search: { type: 'string', optional: true },
  }
};

export const GET_PRODUCTS_RESPONSE = {
  success: { type: 'boolean' },
  data: {
    products: { type: 'array', items: 'Product' },
    pagination: {
      currentPage: { type: 'number' },
      totalPages: { type: 'number' },
      totalItems: { type: 'number' },
      itemsPerPage: { type: 'number' },
    }
  }
};

/**
 * GET /api/products/:id - Get product by ID
 */
export const GET_PRODUCT_BY_ID_REQUEST = {
  params: {
    id: { type: 'string', required: true }
  }
};

export const GET_PRODUCT_BY_ID_RESPONSE = {
  success: { type: 'boolean' },
  data: { type: 'Product' }
};

/**
 * GET /api/products/slug/:slug - Get product by slug
 */
export const GET_PRODUCT_BY_SLUG_REQUEST = {
  params: {
    slug: { type: 'string', required: true }
  }
};

export const GET_PRODUCT_BY_SLUG_RESPONSE = {
  success: { type: 'boolean' },
  data: { type: 'Product' }
};