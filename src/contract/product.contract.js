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

/* ======================== CUSTOMIZATION OPTION TYPES ======================== */
export const CUSTOMIZATION_TYPE = {
  SELECT: "select",
  TEXT: "text",
  TEXTAREA: "textarea",
  IMAGE: "image",
  COLOR: "color",
  NUMBER: "number",
};

/* ======================== SHIPPING CLASSES ======================== */
export const SHIPPING_CLASS = {
  STANDARD: "standard",
  EXPRESS: "express",
  FRAGILE: "fragile",
  HEAVY: "heavy",
};

/* ======================== PRODUCT TAGS ======================== */
export const PRODUCT_TAGS = {
  BESTSELLER: "bestseller",
  TRENDING: "trending",
  NEW_ARRIVAL: "new-arrival",
  LIMITED_EDITION: "limited-edition",
  SALE: "sale",
  FEATURED: "featured",
};

export const PRODUCT_DATA = [
  /* -------------------------------- T-SHIRT -------------------------------- */
  {
    id: "prod_tshirt_001",
    slug: "custom-tshirt-black",
    sku: "TSH-001",
    tenantId: "default",

    category: PRODUCT_CATEGORY.TSHIRT,
    tags: [PRODUCT_TAGS.BESTSELLER, PRODUCT_TAGS.TRENDING, PRODUCT_TAGS.FEATURED],
    collections: ["valentines-special", "birthday-gifts"],
    occasions: ["birthday", "anniversary", "valentines"],
    recipients: ["him", "her", "unisex"],

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
      videos: [],
    },

    seo: {
      metaTitle: "Custom Printed T-Shirt | Personalized Gifts | Tohfae",
      metaDescription: "Design your own t-shirt with custom text, images or logos. Premium cotton, soft and durable fabric. Perfect gift for any occasion.",
      keywords: ["custom tshirt", "personalized tshirt", "gift tshirt", "printed tshirt"],
      ogImage: images[0].image_1,
    },

    pricing: {
      currency: "INR",
      basePrice: 900,
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
        available: true,
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

    rating: {
      average: 4.5,
      count: 234,
      distribution: {
        5: 150,
        4: 60,
        3: 15,
        2: 5,
        1: 4,
      },
    },

    variants: [
      {
        id: "var_tshirt_001_s_black",
        sku: "TSH-BLK-S-001",
        attributes: {
          size: "S",
          color: "Black",
        },
        pricing: {
          mrp: 1000,
          sellingPrice: 900,
          additionalCost: 0,
        },
        inventory: {
          inStock: true,
          quantity: 25,
          reserved: 3,
          available: 22,
        },
        media: {
          images: [images[0].image_1],
          thumbnail: images[0].image_1,
        },
      },
      {
        id: "var_tshirt_001_m_black",
        sku: "TSH-BLK-M-001",
        attributes: {
          size: "M",
          color: "Black",
        },
        pricing: {
          mrp: 1000,
          sellingPrice: 900,
          additionalCost: 0,
        },
        inventory: {
          inStock: true,
          quantity: 30,
          reserved: 5,
          available: 25,
        },
        media: {
          images: [images[0].image_1],
          thumbnail: images[0].image_1,
        },
      },
      {
        id: "var_tshirt_001_l_black",
        sku: "TSH-BLK-L-001",
        attributes: {
          size: "L",
          color: "Black",
        },
        pricing: {
          mrp: 1050,
          sellingPrice: 945,
          additionalCost: 50,
        },
        inventory: {
          inStock: true,
          quantity: 20,
          reserved: 2,
          available: 18,
        },
        media: {
          images: [images[0].image_1],
          thumbnail: images[0].image_1,
        },
      },
    ],

    inventory: {
      inStock: true,
      quantity: 120,
      reserved: 15,
      available: 105,
      lowStockThreshold: 10,
      allowBackorder: false,
    },

    specifications: [
      { key: "Fabric", value: "100% Cotton" },
      { key: "Fit", value: "Regular" },
      { key: "Sleeve", value: "Half Sleeve" },
    ],

    customization: {
      enabled: true,
      type: CONFIGURATOR_TYPE.TSHIRT,
      options: [
        {
          id: "opt_tshirt_001",
          key: "printType",
          label: "Print Type",
          type: CUSTOMIZATION_TYPE.SELECT,
          required: true,
          values: [
            { value: "text", label: "Text Only", priceModifier: 0 },
            { value: "image", label: "Image Upload", priceModifier: 100 },
            { value: "logo", label: "Logo Design", priceModifier: 150 },
          ],
        },
        {
          id: "opt_tshirt_002",
          key: "customText",
          label: "Your Text",
          type: CUSTOMIZATION_TYPE.TEXT,
          required: false,
          maxLength: 50,
          priceModifier: 50,
        },
        {
          id: "opt_tshirt_003",
          key: "imageUpload",
          label: "Upload Image",
          type: CUSTOMIZATION_TYPE.IMAGE,
          required: false,
          maxSize: 5,
          allowedFormats: ["jpg", "png", "jpeg"],
          priceModifier: 0,
        },
      ],
    },

    shipping: {
      weight: 200,
      dimensions: {
        length: 30,
        width: 25,
        height: 2,
        unit: "cm",
      },
      shippingClass: SHIPPING_CLASS.STANDARD,
      deliveryTime: {
        min: 3,
        max: 7,
        unit: "days",
      },
    },

    policies: {
      returnable: true,
      returnWindow: 7,
      replaceable: true,
      replaceWindow: 7,
      cancellable: true,
      cancelWindow: 24,
    },

    status: {
      isActive: true,
      isFeatured: true,
      isPublished: true,
    },

    timestamps: {
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-15T14:30:00Z",
      publishedAt: "2024-01-02T09:00:00Z",
    },
  },

  /* ---------------------------------- MUG ---------------------------------- */
  {
    id: "prod_mug_001",
    slug: "custom-photo-mug",
    sku: "MUG-001",
    tenantId: "default",

    category: PRODUCT_CATEGORY.MUG,
    tags: [PRODUCT_TAGS.BESTSELLER, PRODUCT_TAGS.NEW_ARRIVAL],
    collections: ["anniversary-gifts", "mothers-day"],
    occasions: ["anniversary", "mothers-day", "birthday"],
    recipients: ["her", "mom", "couples"],

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
      videos: [],
    },

    seo: {
      metaTitle: "Personalized Photo Mug | Custom Printed Ceramic Mug | Tohfae",
      metaDescription: "Create a personalized mug with your favorite photo or name. High-quality ceramic mug, perfect gift for any occasion.",
      keywords: ["custom mug", "personalized mug", "photo mug", "gift mug"],
      ogImage: images[0].image_2,
    },

    pricing: {
      currency: "INR",
      basePrice: 399,
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

    rating: {
      average: 4.7,
      count: 189,
      distribution: {
        5: 120,
        4: 50,
        3: 12,
        2: 4,
        1: 3,
      },
    },

    variants: [
      {
        id: "var_mug_001_325ml",
        sku: "MUG-WHT-325-001",
        attributes: {
          capacity: "325ml",
          color: "White",
        },
        pricing: {
          mrp: 499,
          sellingPrice: 399,
          additionalCost: 0,
        },
        inventory: {
          inStock: true,
          quantity: 50,
          reserved: 5,
          available: 45,
        },
        media: {
          images: [images[0].image_2],
          thumbnail: images[0].image_2,
        },
      },
      {
        id: "var_mug_001_450ml",
        sku: "MUG-WHT-450-001",
        attributes: {
          capacity: "450ml",
          color: "White",
        },
        pricing: {
          mrp: 599,
          sellingPrice: 499,
          additionalCost: 100,
        },
        inventory: {
          inStock: true,
          quantity: 30,
          reserved: 3,
          available: 27,
        },
        media: {
          images: [images[0].image_2],
          thumbnail: images[0].image_2,
        },
      },
    ],

    inventory: {
      inStock: true,
      quantity: 80,
      reserved: 8,
      available: 72,
      lowStockThreshold: 15,
      allowBackorder: false,
    },

    specifications: [
      { key: "Material", value: "Ceramic" },
      { key: "Capacity", value: "325 ml / 450 ml" },
      { key: "Finish", value: "Glossy" },
    ],

    customization: {
      enabled: true,
      type: CONFIGURATOR_TYPE.MUG,
      options: [
        {
          id: "opt_mug_001",
          key: "designType",
          label: "Design Type",
          type: CUSTOMIZATION_TYPE.SELECT,
          required: true,
          values: [
            { value: "photo", label: "Photo Print", priceModifier: 0 },
            { value: "text", label: "Text Only", priceModifier: -50 },
            { value: "couple", label: "Couple Photo", priceModifier: 50 },
          ],
        },
        {
          id: "opt_mug_002",
          key: "photoUpload",
          label: "Upload Photo",
          type: CUSTOMIZATION_TYPE.IMAGE,
          required: true,
          maxSize: 5,
          allowedFormats: ["jpg", "png", "jpeg"],
          priceModifier: 0,
        },
        {
          id: "opt_mug_003",
          key: "customMessage",
          label: "Custom Message",
          type: CUSTOMIZATION_TYPE.TEXT,
          required: false,
          maxLength: 30,
          priceModifier: 30,
        },
      ],
    },

    shipping: {
      weight: 350,
      dimensions: {
        length: 12,
        width: 12,
        height: 10,
        unit: "cm",
      },
      shippingClass: SHIPPING_CLASS.FRAGILE,
      deliveryTime: {
        min: 4,
        max: 8,
        unit: "days",
      },
    },

    policies: {
      returnable: true,
      returnWindow: 7,
      replaceable: true,
      replaceWindow: 7,
      cancellable: true,
      cancelWindow: 24,
    },

    status: {
      isActive: true,
      isFeatured: false,
      isPublished: true,
    },

    timestamps: {
      createdAt: "2024-01-05T10:00:00Z",
      updatedAt: "2024-01-18T11:20:00Z",
      publishedAt: "2024-01-06T09:00:00Z",
    },
  },

  /* --------------------------------- FRAME --------------------------------- */
  {
    id: "prod_frame_001",
    slug: "custom-photo-frame",
    sku: "FRM-001",
    tenantId: "default",

    category: PRODUCT_CATEGORY.FRAME,
    tags: [PRODUCT_TAGS.FEATURED, PRODUCT_TAGS.TRENDING],
    collections: ["anniversary-gifts", "home-decor"],
    occasions: ["anniversary", "wedding", "birthday"],
    recipients: ["couples", "family", "her", "him"],

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
      videos: [],
    },

    seo: {
      metaTitle: "Personalized Photo Frame | Custom Engraved Wooden Frame | Tohfae",
      metaDescription: "Beautiful wooden photo frame with custom engraving. Perfect gift for anniversaries, weddings, and special occasions.",
      keywords: ["custom frame", "personalized frame", "photo frame", "engraved frame"],
      ogImage: images[0].image_3,
    },

    pricing: {
      currency: "INR",
      basePrice: 649,
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

    rating: {
      average: 4.8,
      count: 156,
      distribution: {
        5: 110,
        4: 35,
        3: 8,
        2: 2,
        1: 1,
      },
    },

    variants: [
      {
        id: "var_frame_001_6x8",
        sku: "FRM-WD-6X8-001",
        attributes: {
          size: "6x8",
          material: "Wood",
        },
        pricing: {
          mrp: 699,
          sellingPrice: 549,
          additionalCost: 0,
        },
        inventory: {
          inStock: true,
          quantity: 20,
          reserved: 2,
          available: 18,
        },
        media: {
          images: [images[0].image_3],
          thumbnail: images[0].image_3,
        },
      },
      {
        id: "var_frame_001_8x10",
        sku: "FRM-WD-8X10-001",
        attributes: {
          size: "8x10",
          material: "Wood",
        },
        pricing: {
          mrp: 799,
          sellingPrice: 649,
          additionalCost: 100,
        },
        inventory: {
          inStock: true,
          quantity: 15,
          reserved: 1,
          available: 14,
        },
        media: {
          images: [images[0].image_3],
          thumbnail: images[0].image_3,
        },
      },
      {
        id: "var_frame_001_10x12",
        sku: "FRM-WD-10X12-001",
        attributes: {
          size: "10x12",
          material: "Wood",
        },
        pricing: {
          mrp: 999,
          sellingPrice: 849,
          additionalCost: 200,
        },
        inventory: {
          inStock: true,
          quantity: 15,
          reserved: 0,
          available: 15,
        },
        media: {
          images: [images[0].image_3],
          thumbnail: images[0].image_3,
        },
      },
    ],

    inventory: {
      inStock: true,
      quantity: 50,
      reserved: 3,
      available: 47,
      lowStockThreshold: 10,
      allowBackorder: false,
    },

    specifications: [
      { key: "Material", value: "Wood" },
      { key: "Size", value: "6x8 / 8x10 / 10x12 inches" },
      { key: "Finish", value: "Matte" },
    ],

    customization: {
      enabled: true,
      type: CONFIGURATOR_TYPE.FRAME,
      options: [
        {
          id: "opt_frame_001",
          key: "photoUpload",
          label: "Upload Photo",
          type: CUSTOMIZATION_TYPE.IMAGE,
          required: true,
          maxSize: 5,
          allowedFormats: ["jpg", "png", "jpeg"],
          priceModifier: 0,
        },
        {
          id: "opt_frame_002",
          key: "engraving",
          label: "Custom Message",
          type: CUSTOMIZATION_TYPE.TEXT,
          required: false,
          maxLength: 50,
          priceModifier: 100,
        },
      ],
    },

    shipping: {
      weight: 500,
      dimensions: {
        length: 25,
        width: 20,
        height: 3,
        unit: "cm",
      },
      shippingClass: SHIPPING_CLASS.FRAGILE,
      deliveryTime: {
        min: 5,
        max: 10,
        unit: "days",
      },
    },

    policies: {
      returnable: true,
      returnWindow: 7,
      replaceable: true,
      replaceWindow: 7,
      cancellable: true,
      cancelWindow: 24,
    },

    status: {
      isActive: true,
      isFeatured: true,
      isPublished: true,
    },

    timestamps: {
      createdAt: "2024-01-03T10:00:00Z",
      updatedAt: "2024-01-20T09:15:00Z",
      publishedAt: "2024-01-04T09:00:00Z",
    },
  },

  /* -------------------------------- CUSHION -------------------------------- */
  {
    id: "prod_cushion_001",
    slug: "custom-printed-cushion",
    sku: "CSH-001",
    tenantId: "default",

    category: PRODUCT_CATEGORY.CUSHION,
    tags: [PRODUCT_TAGS.NEW_ARRIVAL, PRODUCT_TAGS.SALE],
    collections: ["home-decor", "birthday-gifts"],
    occasions: ["birthday", "housewarming", "anniversary"],
    recipients: ["her", "him", "family"],

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
      videos: [],
    },

    seo: {
      metaTitle: "Custom Printed Cushion | Personalized Photo Cushion | Tohfae",
      metaDescription: "Soft and comfortable cushion with your custom design or photo. Perfect for home decor and gifting.",
      keywords: ["custom cushion", "personalized cushion", "photo cushion", "gift cushion"],
      ogImage: images[0].image_1,
    },

    pricing: {
      currency: "INR",
      basePrice: 499,
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

    rating: {
      average: 4.3,
      count: 98,
      distribution: {
        5: 55,
        4: 30,
        3: 10,
        2: 2,
        1: 1,
      },
    },

    variants: [
      {
        id: "var_cushion_001_12x12",
        sku: "CSH-12X12-001",
        attributes: {
          size: "12x12",
          material: "Polyester",
        },
        pricing: {
          mrp: 499,
          sellingPrice: 399,
          additionalCost: 0,
        },
        inventory: {
          inStock: true,
          quantity: 40,
          reserved: 4,
          available: 36,
        },
        media: {
          images: [images[0].image_1],
          thumbnail: images[0].image_1,
        },
      },
      {
        id: "var_cushion_001_16x16",
        sku: "CSH-16X16-001",
        attributes: {
          size: "16x16",
          material: "Polyester",
        },
        pricing: {
          mrp: 599,
          sellingPrice: 499,
          additionalCost: 100,
        },
        inventory: {
          inStock: true,
          quantity: 60,
          reserved: 6,
          available: 54,
        },
        media: {
          images: [images[0].image_1],
          thumbnail: images[0].image_1,
        },
      },
    ],

    inventory: {
      inStock: true,
      quantity: 100,
      reserved: 10,
      available: 90,
      lowStockThreshold: 20,
      allowBackorder: false,
    },

    specifications: [
      { key: "Material", value: "Polyester" },
      { key: "Size", value: "12x12 / 16x16 inches" },
      { key: "Filling", value: "Fiber" },
    ],

    customization: {
      enabled: true,
      type: CONFIGURATOR_TYPE.CUSHION,
      options: [
        {
          id: "opt_cushion_001",
          key: "designType",
          label: "Design Type",
          type: CUSTOMIZATION_TYPE.SELECT,
          required: true,
          values: [
            { value: "photo", label: "Photo Print", priceModifier: 0 },
            { value: "text", label: "Text Only", priceModifier: -50 },
            { value: "pattern", label: "Pattern Design", priceModifier: 30 },
          ],
        },
        {
          id: "opt_cushion_002",
          key: "photoUpload",
          label: "Upload Photo",
          type: CUSTOMIZATION_TYPE.IMAGE,
          required: false,
          maxSize: 5,
          allowedFormats: ["jpg", "png", "jpeg"],
          priceModifier: 0,
        },
        {
          id: "opt_cushion_003",
          key: "customText",
          label: "Custom Text",
          type: CUSTOMIZATION_TYPE.TEXT,
          required: false,
          maxLength: 40,
          priceModifier: 40,
        },
      ],
    },

    shipping: {
      weight: 300,
      dimensions: {
        length: 40,
        width: 40,
        height: 10,
        unit: "cm",
      },
      shippingClass: SHIPPING_CLASS.STANDARD,
      deliveryTime: {
        min: 4,
        max: 8,
        unit: "days",
      },
    },

    policies: {
      returnable: true,
      returnWindow: 7,
      replaceable: true,
      replaceWindow: 7,
      cancellable: true,
      cancelWindow: 24,
    },

    status: {
      isActive: true,
      isFeatured: false,
      isPublished: true,
    },

    timestamps: {
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-22T13:45:00Z",
      publishedAt: "2024-01-11T09:00:00Z",
    },
  },

  /* -------------------------------- CUSHION -------------------------------- */
  {
    id: "prod_cushion_001",
    slug: "custom-photo-cushion",
    sku: "CUSH-001",
    tenantId: "default",

    category: PRODUCT_CATEGORY.CUSHION,
    tags: [PRODUCT_TAGS.BESTSELLER, PRODUCT_TAGS.TRENDING],
    collections: ["home-decor", "anniversary-gifts"],
    occasions: ["anniversary", "housewarming", "birthday"],
    recipients: ["couples", "her", "him"],

    basic: {
      name: "Personalized Photo Cushion",
      shortDescription: "Custom printed cushion with photo",
      description:
        "Add your favorite photo and create a cozy personalized cushion. Soft fabric with vibrant print quality.",
      brand: "Tohfae",
    },

    media: {
      images: [
        images[0].image_1,
        images[0].image_2,
      ],
      thumbnail: images[0].image_1,
      videos: [],
    },

    seo: {
      metaTitle: "Personalized Photo Cushion | Custom Printed Cushion | Tohfae",
      metaDescription: "Create a personalized cushion with your favorite photo. Soft fabric, vibrant print quality. Perfect gift for home decor.",
      keywords: ["custom cushion", "personalized cushion", "photo cushion", "gift cushion"],
      ogImage: images[0].image_1,
    },

    pricing: {
      currency: "INR",
      basePrice: 599,
      mrp: 799,
      sellingPrice: 599,

      discount: {
        type: "percentage",
        value: 25,
        label: "25% OFF",
        percentage: 25,
      },

      paymentOptions: {
        cash: { enabled: true, price: 599 },
        emi: {
          enabled: true,
          plans: [
            { months: 3, monthlyAmount: 200, interestRate: 0 },
          ],
        },
      },

      delivery: {
        charges: 60,
        freeAbove: 999,
      },

      cod: {
        available: true,
        extraCharges: 15,
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
        id: "deal_20",
        type: "percentage",
        value: 20,
        label: "20% OFF",
        tag: "Limited Offer",
        applicable: true,
      },
    ],

    rating: {
      average: 4.7,
      count: 189,
      distribution: {
        5: 120,
        4: 50,
        3: 12,
        2: 4,
        1: 3,
      },
    },

    variants: [
      {
        id: "var_cushion_001_12x12",
        sku: "CUSH-12X12-001",
        attributes: {
          size: "12x12 inch",
          color: "White",
        },
        pricing: {
          mrp: 799,
          sellingPrice: 599,
          additionalCost: 0,
        },
        inventory: {
          inStock: true,
          quantity: 50,
          reserved: 5,
          available: 45,
        },
        media: {
          images: [images[0].image_1],
          thumbnail: images[0].image_1,
        },
      },
      {
        id: "var_cushion_001_16x16",
        sku: "CUSH-16X16-001",
        attributes: {
          size: "16x16 inch",
          color: "White",
        },
        pricing: {
          mrp: 899,
          sellingPrice: 699,
          additionalCost: 100,
        },
        inventory: {
          inStock: true,
          quantity: 40,
          reserved: 3,
          available: 37,
        },
        media: {
          images: [images[0].image_1],
          thumbnail: images[0].image_1,
        },
      },
    ],

    inventory: {
      inStock: true,
      quantity: 90,
      reserved: 8,
      available: 82,
      lowStockThreshold: 15,
      allowBackorder: false,
    },

    specifications: [
      { key: "Material", value: "Polyester" },
      { key: "Fill", value: "Fiber Fill" },
      { key: "Print Type", value: "Sublimation" },
      { key: "Washable", value: "Yes (Cover Only)" },
    ],

    customization: {
      enabled: true,
      type: CONFIGURATOR_TYPE.CUSHION,
      options: [
        {
          id: "opt_cushion_001",
          key: "imageUpload",
          label: "Upload Photo",
          type: CUSTOMIZATION_TYPE.IMAGE,
          required: true,
          maxSize: 10,
          allowedFormats: ["jpg", "png", "jpeg"],
          priceModifier: 0,
        },
        {
          id: "opt_cushion_002",
          key: "customText",
          label: "Add Text (Optional)",
          type: CUSTOMIZATION_TYPE.TEXT,
          required: false,
          maxLength: 30,
          priceModifier: 50,
        },
      ],
    },

    shipping: {
      weight: 400,
      dimensions: {
        length: 40,
        width: 40,
        height: 12,
        unit: "cm",
      },
      shippingClass: SHIPPING_CLASS.STANDARD,
      deliveryTime: {
        min: 4,
        max: 8,
        unit: "days",
      },
    },

    policies: {
      returnable: true,
      returnWindow: 7,
      replaceable: true,
      replaceWindow: 7,
      cancellable: true,
      cancelWindow: 24,
    },

    status: {
      isActive: true,
      isFeatured: true,
      isPublished: true,
    },

    timestamps: {
      createdAt: "2026-01-15T10:00:00Z",
      updatedAt: "2026-02-05T14:30:00Z",
      publishedAt: "2026-01-16T09:00:00Z",
    },
  },

  /* -------------------------------- KEYCHAIN -------------------------------- */
  {
    id: "prod_keychain_001",
    slug: "custom-photo-keychain",
    sku: "KEY-001",
    tenantId: "default",

    category: PRODUCT_CATEGORY.KEYCHAIN,
    tags: [PRODUCT_TAGS.NEW_ARRIVAL, PRODUCT_TAGS.FEATURED],
    collections: ["small-gifts", "birthday-gifts"],
    occasions: ["birthday", "friendship-day", "valentines"],
    recipients: ["him", "her", "friends"],

    basic: {
      name: "Personalized Photo Keychain",
      shortDescription: "Custom photo printed metal keychain",
      description:
        "Carry your memories everywhere with a personalized photo keychain. Durable metal finish with high-quality print.",
      brand: "Tohfae",
    },

    media: {
      images: [
        images[0].image_3,
        images[0].image_1,
      ],
      thumbnail: images[0].image_3,
      videos: [],
    },

    seo: {
      metaTitle: "Personalized Photo Keychain | Custom Metal Keychain | Tohfae",
      metaDescription: "Create a personalized keychain with your favorite photo. Durable metal finish, perfect small gift for any occasion.",
      keywords: ["custom keychain", "personalized keychain", "photo keychain", "gift keychain"],
      ogImage: images[0].image_3,
    },

    pricing: {
      currency: "INR",
      basePrice: 199,
      mrp: 299,
      sellingPrice: 199,

      discount: {
        type: "percentage",
        value: 33,
        label: "33% OFF",
        percentage: 33,
      },

      paymentOptions: {
        cash: { enabled: true, price: 199 },
        emi: { enabled: false },
      },

      delivery: {
        charges: 40,
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
      ],
    },

    offers: [],

    rating: {
      average: 4.3,
      count: 156,
      distribution: {
        5: 90,
        4: 45,
        3: 15,
        2: 4,
        1: 2,
      },
    },

    variants: [
      {
        id: "var_keychain_001_round",
        sku: "KEY-RND-001",
        attributes: {
          shape: "Round",
          material: "Metal",
        },
        pricing: {
          mrp: 299,
          sellingPrice: 199,
          additionalCost: 0,
        },
        inventory: {
          inStock: true,
          quantity: 100,
          reserved: 10,
          available: 90,
        },
        media: {
          images: [images[0].image_3],
          thumbnail: images[0].image_3,
        },
      },
      {
        id: "var_keychain_001_heart",
        sku: "KEY-HRT-001",
        attributes: {
          shape: "Heart",
          material: "Metal",
        },
        pricing: {
          mrp: 349,
          sellingPrice: 249,
          additionalCost: 50,
        },
        inventory: {
          inStock: true,
          quantity: 80,
          reserved: 8,
          available: 72,
        },
        media: {
          images: [images[0].image_3],
          thumbnail: images[0].image_3,
        },
      },
    ],

    inventory: {
      inStock: true,
      quantity: 180,
      reserved: 18,
      available: 162,
      lowStockThreshold: 20,
      allowBackorder: false,
    },

    specifications: [
      { key: "Material", value: "Metal" },
      { key: "Print Type", value: "UV Print" },
      { key: "Size", value: "4x4 cm" },
      { key: "Chain Length", value: "5 cm" },
    ],

    customization: {
      enabled: true,
      type: CONFIGURATOR_TYPE.GENERIC,
      options: [
        {
          id: "opt_keychain_001",
          key: "imageUpload",
          label: "Upload Photo",
          type: CUSTOMIZATION_TYPE.IMAGE,
          required: true,
          maxSize: 5,
          allowedFormats: ["jpg", "png", "jpeg"],
          priceModifier: 0,
        },
      ],
    },

    shipping: {
      weight: 50,
      dimensions: {
        length: 10,
        width: 10,
        height: 2,
        unit: "cm",
      },
      shippingClass: SHIPPING_CLASS.STANDARD,
      deliveryTime: {
        min: 3,
        max: 6,
        unit: "days",
      },
    },

    policies: {
      returnable: false,
      returnWindow: 0,
      replaceable: true,
      replaceWindow: 3,
      cancellable: true,
      cancelWindow: 12,
    },

    status: {
      isActive: true,
      isFeatured: false,
      isPublished: true,
    },

    timestamps: {
      createdAt: "2026-01-20T10:00:00Z",
      updatedAt: "2026-02-06T11:20:00Z",
      publishedAt: "2026-01-21T09:00:00Z",
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