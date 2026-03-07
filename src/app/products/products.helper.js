/**
 * Products Page Helper
 * 
 * Contains all configuration, constants, and helper functions for products page
 * Following clean architecture principles
 */

import { Navigation_Url, website_name, main_url, site_image } from '@/shared/constant/global-constant';

/**
 * Products Page SEO Configuration
 * Enhanced with breadcrumbs, FAQ schema, and rich structured data
 */
export const PRODUCTS_SEO = {
  title: `Shop Personalized Gifts - Custom T-Shirts, Mugs & More | ${website_name}`,
  description: `Discover unique personalized gifts at ${website_name}. Custom t-shirts, mugs, frames, cushions, and more. Design your perfect gift with text, images, or logos. Fast delivery across India.`,
  keywords: [
    `${website_name}`,
    'personalized gifts',
    'custom t-shirts',
    'custom mugs',
    'photo frames',
    'custom cushions',
    'gift design',
    'occasion gifts',
    'birthday gifts',
    'anniversary gifts',
    'online gift store',
    'customized gifts India',
    'personalized merchandise',
    'custom printing',
    'gift shop online'
  ],
  canonical: `${main_url}${Navigation_Url.PRODUCTS}`,
  type: 'website',
  author: website_name,
  image: site_image,
  noindex: false, // Products page should be indexed
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      // WebPage Schema
      {
        "@type": "CollectionPage",
        "@id": `${main_url}${Navigation_Url.PRODUCTS}#webpage`,
        "url": `${main_url}${Navigation_Url.PRODUCTS}`,
        "name": `Shop Personalized Gifts | ${website_name}`,
        "description": `Discover unique personalized gifts at ${website_name}. Custom t-shirts, mugs, frames, cushions, and more.`,
        "inLanguage": "en-US",
        "isPartOf": {
          "@id": `${main_url}#website`
        },
        "breadcrumb": {
          "@id": `${main_url}${Navigation_Url.PRODUCTS}#breadcrumb`
        }
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "@id": `${main_url}${Navigation_Url.PRODUCTS}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": main_url
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Products",
            "item": `${main_url}${Navigation_Url.PRODUCTS}`
          }
        ]
      },
      // WebSite Schema
      {
        "@type": "WebSite",
        "@id": `${main_url}#website`,
        "url": main_url,
        "name": website_name,
        "description": "Personalized gift store offering unique and customized gifts for every occasion",
        "publisher": {
          "@id": `${main_url}#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${main_url}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      // Organization Schema
      {
        "@type": "Organization",
        "@id": `${main_url}#organization`,
        "name": website_name,
        "url": main_url,
        "logo": {
          "@type": "ImageObject",
          "url": site_image,
          "width": 1200,
          "height": 630
        },
        "sameAs": []
      },
      // ItemList Schema - Product Collection
      {
        "@type": "ItemList",
        "@id": `${main_url}${Navigation_Url.PRODUCTS}#itemlist`,
        "name": "Personalized Gift Products",
        "description": "Browse our collection of custom t-shirts, mugs, frames, cushions and more personalized gifts",
        "itemListElement": []
      }
    ]
  }
};

/**
 * Product Pagination Constants
 */
export const PRODUCT_PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  DEFAULT_PAGE: 1,
  PAGE_SIZE_OPTIONS: [12, 24, 36, 48],
};

/**
 * Product Sort Options
 * Organized by category for better UX
 */
export const PRODUCT_SORT_OPTIONS = {
  PRICE: [
    { label: 'Price: Low to High', value: 'pricing.sellingPrice', direction: 'asc' },
    { label: 'Price: High to Low', value: 'pricing.sellingPrice', direction: 'desc' },
  ],
  RATING: [
    { label: 'Rating: High to Low', value: 'rating.average', direction: 'desc' },
    { label: 'Rating: Low to High', value: 'rating.average', direction: 'asc' },
  ],
  ARRIVAL: [
    { label: 'Newest First', value: 'createdAt', direction: 'desc' },
    { label: 'Oldest First', value: 'createdAt', direction: 'asc' },
  ],
};

/**
 * Product Filter Chips
 * Category quick filters for products page
 */
export const PRODUCT_FILTER_CHIPS = [
  { label: 'All Products', value: 'all' },
  { label: 'T-Shirts', value: 'tshirt' },
  { label: 'Mugs', value: 'mug' },
  { label: 'Frames', value: 'frame' },
  { label: 'Cushions', value: 'cushion' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Gifts', value: 'gifts' },
  { label: 'Keychains', value: 'keychain' },
  { label: 'Calendars', value: 'calendar' },
  { label: 'Posters', value: 'poster' },
  { label: 'Cards', value: 'card' },
];

/**
 * Product Rating Filters
 */
export const PRODUCT_RATING_FILTERS = [
  { label: '4 Star & Up', value: 4 },
  { label: '3 Star & Up', value: 3 },
  { label: '2 Star & Up', value: 2 },
  { label: '1 Star & Up', value: 1 },
];

/**
 * Product Price Range
 */
export const PRODUCT_PRICE_RANGE = {
  min: 0,
  max: 5000,
  step: 100,
};

/**
 * Helper function to get filter label from value
 * @param {string} value - Filter value
 * @returns {string} Filter label
 */
export const getFilterLabel = (value) => {
  const chip = PRODUCT_FILTER_CHIPS.find(chip => chip.value === value);
  return chip?.label || value;
};

/**
 * Helper function to format price
 * @param {number} price - Price value
 * @param {string} currency - Currency code (default: INR)
 * @returns {string} Formatted price
 */
export const formatPrice = (price, currency = 'INR') => {
  if (!price) return '₹0';

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(price);
};

/**
 * Helper function to calculate discount percentage
 * @param {number} mrp - Maximum Retail Price
 * @param {number} sellingPrice - Selling Price
 * @returns {number} Discount percentage
 */
export const calculateDiscountPercentage = (mrp, sellingPrice) => {
  if (!mrp || !sellingPrice || mrp <= sellingPrice) return 0;
  return Math.round(((mrp - sellingPrice) / mrp) * 100);
};

/**
 * Helper function to check if product is in stock
 * @param {Object} inventory - Product inventory object
 * @returns {boolean} True if in stock
 */
export const isProductInStock = (inventory) => {
  if (!inventory) return false;
  return inventory.inStock && inventory.available > 0;
};

/**
 * Helper function to get stock status label
 * @param {Object} inventory - Product inventory object
 * @returns {string} Stock status label
 */
export const getStockStatusLabel = (inventory) => {
  if (!inventory) return 'Out of Stock';

  if (!inventory.inStock || inventory.available <= 0) {
    return 'Out of Stock';
  }

  if (inventory.available <= inventory.lowStockThreshold) {
    return `Only ${inventory.available} left`;
  }

  return 'In Stock';
};

/**
 * Products Page Text Constants
 */
export const PRODUCTS_TEXT = {
  PAGE_TITLE: 'Shop Personalized Gifts',
  PAGE_SUBTITLE: 'Discover unique customized gifts for every occasion',
  NO_PRODUCTS_TITLE: 'No products found',
  NO_PRODUCTS_DESCRIPTION: 'Try adjusting your filters or search criteria',
  CLEAR_FILTERS_BUTTON: 'Clear all filters',
  SHOWING_RESULTS: 'Showing',
  PRODUCTS_TEXT: 'products',
  SORT_BY: 'Sort by',
  FILTER_BY: 'Filter by',
  APPLY_FILTERS: 'Apply Filters',
  RESET_FILTERS: 'Reset',
};

