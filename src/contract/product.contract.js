// import { PRODUCT_CATEGORY } from "./productCategory.constant";
// productCategory.constant.js
export const PRODUCT_CATEGORY = {
  TSHIRT: "tshirt",
  MUG: "mug",
  CLOTHING: "clothing",
  GIFT: "gift",
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
        "/products/tshirt-1.png",
        "/products/tshirt-2.png",
      ],
      thumbnail: "/products/tshirt-thumb.png",
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
        "/products/mug-1.png",
        "/products/mug-2.png",
      ],
      thumbnail: "/products/mug-thumb.png",
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
];
