/**
 * ============================================
 * BANNER CONTRACT
 * ============================================
 *
 * Comprehensive banner system contract for dynamic banner management
 *
 * Features:
 * - Multiple banner types (hero, promotional, informational, etc.)
 * - CTA routing with dynamic parameters
 * - Position-based display (start, end, interval)
 * - Display rules (repeat, one-time, scheduled)
 * - Scheduling with start/end dates
 * - Priority and ordering
 * - Responsive images
 * - Analytics tracking
 * - A/B testing support
 *
 * Use Cases:
 * - Hero carousel banners
 * - Promotional banners in product grids
 * - Announcement banners
 * - Category-specific banners
 * - Time-based campaign banners
 */

/* ======================== IMPORTS ======================== */
import { images } from './testing.image.js';
import { Navigation_Url, Dynamic_Navigation_Url } from '@/shared/constant/global-constant';

/* ======================== BANNER TYPES ======================== */
export const BANNER_TYPE = {
  HERO: "hero",                     // Main hero carousel
  PROMOTIONAL: "promotional",       // Promotional/sale banners
  INFORMATIONAL: "informational",   // Info/announcement banners
  CATEGORY: "category",             // Category-specific banners
  PRODUCT: "product",               // Product highlight banners
  SEASONAL: "seasonal",             // Seasonal/holiday banners
  INLINE: "inline",                 // Inline banners (in product grids)
  STICKY: "sticky",                 // Sticky top/bottom banners
  POPUP: "popup",                   // Popup/modal banners
  SIDEBAR: "sidebar",               // Sidebar banners
};

/* ======================== BANNER STATUS ======================== */
export const BANNER_STATUS = {
  ACTIVE: "active",                 // Currently active
  INACTIVE: "inactive",             // Temporarily disabled
  SCHEDULED: "scheduled",           // Scheduled for future
  EXPIRED: "expired",               // Past end date
  DRAFT: "draft",                   // Not published yet
};

/* ======================== DISPLAY POSITIONS ======================== */
export const BANNER_POSITION = {
  TOP: "top",                       // Top of page
  BOTTOM: "bottom",                 // Bottom of page
  MIDDLE: "middle",                 // Middle of content
  SIDEBAR_LEFT: "sidebar_left",     // Left sidebar
  SIDEBAR_RIGHT: "sidebar_right",   // Right sidebar
  INLINE: "inline",                 // Inline with content
  FLOATING: "floating",             // Floating/overlay
  HEADER: "header",                 // Header area
  FOOTER: "footer",                 // Footer area
};

/* ======================== DISPLAY RULES ======================== */
export const BANNER_DISPLAY_RULE = {
  ALWAYS: "always",                 // Always show when active
  ONCE_PER_SESSION: "once_per_session",  // Show once per session
  ONCE_PER_USER: "once_per_user",   // Show once per user (cookie)
  INTERVAL: "interval",             // Show at intervals (e.g., every 6 items)
  SCROLL_TRIGGER: "scroll_trigger", // Show on scroll position
  TIME_DELAY: "time_delay",         // Show after time delay
  REPEAT: "repeat",                 // Repeat in carousel/grid
  ONE_ROUND: "one_round",           // Show once in carousel
};

/* ======================== CTA TYPES ======================== */
export const BANNER_CTA_TYPE = {
  NONE: "none",                     // No CTA
  INTERNAL_LINK: "internal_link",   // Internal route
  EXTERNAL_LINK: "external_link",   // External URL
  PRODUCT_PAGE: "product_page",     // Product details page
  CATEGORY_PAGE: "category_page",   // Category/filter page
  CUSTOM_ACTION: "custom_action",   // Custom JS action
  MODAL: "modal",                   // Open modal
  DOWNLOAD: "download",             // Download file
};

/* ======================== TARGET PAGES ======================== */
export const BANNER_TARGET_PAGE = {
  ALL: "all",                       // All pages
  HOME: "home",                     // Home page only
  PRODUCTS: "products",             // Product listing pages
  PRODUCT_DETAIL: "product_detail", // Product detail pages
  CART: "cart",                     // Cart page
  CHECKOUT: "checkout",             // Checkout page
  CATEGORY: "category",             // Specific category pages
  CUSTOM: "custom",                 // Custom page selection
};

/* ======================== DEVICE TARGETS ======================== */
export const BANNER_DEVICE_TARGET = {
  ALL: "all",                       // All devices
  DESKTOP: "desktop",               // Desktop only
  TABLET: "tablet",                 // Tablet only
  MOBILE: "mobile",                 // Mobile only
  DESKTOP_TABLET: "desktop_tablet", // Desktop + Tablet
  MOBILE_TABLET: "mobile_tablet",   // Mobile + Tablet
};

/* ======================== ANIMATION TYPES ======================== */
export const BANNER_ANIMATION = {
  NONE: "none",
  FADE: "fade",
  SLIDE_LEFT: "slide_left",
  SLIDE_RIGHT: "slide_right",
  SLIDE_UP: "slide_up",
  SLIDE_DOWN: "slide_down",
  ZOOM: "zoom",
  BOUNCE: "bounce",
};

/* ======================== BANNER DATA STRUCTURE ======================== */
/**
 * Banner Schema
 *
 * @typedef {Object} Banner
 * @property {string} id - Unique banner ID
 * @property {string} title - Banner title (for admin/analytics)
 * @property {string} type - Banner type (from BANNER_TYPE)
 * @property {string} status - Banner status (from BANNER_STATUS)
 *
 * @property {Object} content - Banner content
 * @property {string} content.heading - Main heading text
 * @property {string} content.subheading - Subheading text
 * @property {string} content.description - Description text
 * @property {Object} content.image - Image configuration
 * @property {string} content.image.desktop - Desktop image URL
 * @property {string} content.image.tablet - Tablet image URL
 * @property {string} content.image.mobile - Mobile image URL
 * @property {string} content.image.alt - Image alt text
 * @property {string} content.backgroundColor - Background color
 * @property {string} content.textColor - Text color
 *
 * @property {Object} cta - Call to action configuration
 * @property {boolean} cta.enabled - Whether CTA is enabled
 * @property {string} cta.type - CTA type (from BANNER_CTA_TYPE)
 * @property {string} cta.text - CTA button text
 * @property {string} cta.url - CTA URL/route
 * @property {Object} cta.params - URL parameters (for filters, etc.)
 * @property {boolean} cta.openInNewTab - Open link in new tab
 * @property {string} cta.variant - Button variant (solid, outline, ghost)
 * @property {string} cta.color - Button color
 *
 * @property {Object} display - Display configuration
 * @property {string} display.position - Display position (from BANNER_POSITION)
 * @property {string} display.rule - Display rule (from BANNER_DISPLAY_RULE)
 * @property {number} display.interval - Interval for INTERVAL rule (e.g., every 6 items)
 * @property {number} display.startPosition - Start position in grid/list
 * @property {number} display.endPosition - End position in grid/list
 * @property {boolean} display.repeat - Whether to repeat banner
 * @property {number} display.priority - Display priority (higher = shown first)
 * @property {string} display.animation - Animation type (from BANNER_ANIMATION)
 * @property {number} display.animationDuration - Animation duration in ms
 *
 * @property {Object} targeting - Targeting configuration
 * @property {string[]} targeting.pages - Target pages (from BANNER_TARGET_PAGE)
 * @property {string[]} targeting.categories - Target categories (if applicable)
 * @property {string} targeting.device - Target device (from BANNER_DEVICE_TARGET)
 * @property {string[]} targeting.userSegments - Target user segments
 *
 * @property {Object} scheduling - Scheduling configuration
 * @property {string} scheduling.startDate - Start date (ISO 8601)
 * @property {string} scheduling.endDate - End date (ISO 8601)
 * @property {string[]} scheduling.daysOfWeek - Days of week to show (0-6, 0=Sunday)
 * @property {Object} scheduling.timeRange - Time range to show
 * @property {string} scheduling.timeRange.start - Start time (HH:MM)
 * @property {string} scheduling.timeRange.end - End time (HH:MM)
 *
 * @property {Object} analytics - Analytics configuration
 * @property {boolean} analytics.trackImpressions - Track impressions
 * @property {boolean} analytics.trackClicks - Track clicks
 * @property {string} analytics.campaignId - Campaign ID
 * @property {string} analytics.utmSource - UTM source
 * @property {string} analytics.utmMedium - UTM medium
 * @property {string} analytics.utmCampaign - UTM campaign
 *
 * @property {Object} metadata - Additional metadata
 * @property {string} metadata.createdAt - Creation timestamp
 * @property {string} metadata.updatedAt - Last update timestamp
 * @property {string} metadata.createdBy - Creator user ID
 * @property {number} metadata.version - Version number
 * @property {string} metadata.notes - Admin notes
 */

/* ======================== SAMPLE BANNER DATA ======================== */
export const BANNER_DATA = [
  // ============================================
  // Banner 1: Hero Carousel - Create Perfect Gift
  // ============================================
  {
    id: "banner_hero_create_gift",
    title: "Create Your Perfect Gift - Hero Banner",
    type: BANNER_TYPE.HERO,
    status: BANNER_STATUS.ACTIVE,

    content: {
      heading: "Create Your Perfect Gift",
      subheading: "Design personalized gifts that tell your unique story",
      description: "From custom t-shirts to personalized mugs - make every moment special",
      image: {
        desktop: images[0].image_1,
        tablet: images[0].image_1,
        mobile: images[0].image_1,
        alt: "Create Your Perfect Gift",
      },
      backgroundColor: null, // Use gradient overlay
      textColor: null, // Use default white
    },

    cta: {
      enabled: true,
      type: BANNER_CTA_TYPE.CATEGORY_PAGE,
      text: "Start Designing",
      url: Dynamic_Navigation_Url.PRODUCT_LIST,
      params: {
        customizable: "true",
      },
      openInNewTab: false,
      variant: "solid",
      color: "primary",
    },

    display: {
      position: BANNER_POSITION.TOP,
      rule: BANNER_DISPLAY_RULE.REPEAT,
      interval: null,
      startPosition: null,
      endPosition: null,
      repeat: true,
      priority: 100,
      animation: BANNER_ANIMATION.FADE,
      animationDuration: 500,
    },

    targeting: {
      pages: [BANNER_TARGET_PAGE.HOME],
      categories: [],
      device: BANNER_DEVICE_TARGET.ALL,
      userSegments: ["all"],
    },

    scheduling: {
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      timeRange: {
        start: "00:00",
        end: "23:59",
      },
    },

    analytics: {
      trackImpressions: true,
      trackClicks: true,
      campaignId: "hero_create_gift_2024",
      utmSource: "website",
      utmMedium: "hero_banner",
      utmCampaign: "create_gift",
    },

    metadata: {
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-01T10:00:00Z",
      createdBy: "admin_001",
      version: 1,
      notes: "Main hero banner for gift creation",
    },
  },

  // ============================================
  // Banner 2: Hero Carousel - Gifts That Inspire
  // ============================================
  {
    id: "banner_hero_inspire",
    title: "Gifts That Inspire - Hero Banner",
    type: BANNER_TYPE.HERO,
    status: BANNER_STATUS.ACTIVE,

    content: {
      heading: "Gifts That Inspire",
      subheading: "From custom mugs to personalized frames - make every moment special",
      description: "Explore our collection of unique personalized gifts",
      image: {
        desktop: images[0].image_2,
        tablet: images[0].image_2,
        mobile: images[0].image_2,
        alt: "Gifts That Inspire",
      },
      backgroundColor: null,
      textColor: null,
    },

    cta: {
      enabled: true,
      type: BANNER_CTA_TYPE.CATEGORY_PAGE,
      text: "Explore Collection",
      url: Dynamic_Navigation_Url.PRODUCT_LIST,
      params: {},
      openInNewTab: false,
      variant: "solid",
      color: "primary",
    },

    display: {
      position: BANNER_POSITION.TOP,
      rule: BANNER_DISPLAY_RULE.REPEAT,
      interval: null,
      startPosition: null,
      endPosition: null,
      repeat: true,
      priority: 95,
      animation: BANNER_ANIMATION.FADE,
      animationDuration: 500,
    },

    targeting: {
      pages: [BANNER_TARGET_PAGE.HOME],
      categories: [],
      device: BANNER_DEVICE_TARGET.ALL,
      userSegments: ["all"],
    },

    scheduling: {
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      timeRange: {
        start: "00:00",
        end: "23:59",
      },
    },

    analytics: {
      trackImpressions: true,
      trackClicks: true,
      campaignId: "hero_inspire_2024",
      utmSource: "website",
      utmMedium: "hero_banner",
      utmCampaign: "inspire",
    },

    metadata: {
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-01T10:00:00Z",
      createdBy: "admin_001",
      version: 1,
      notes: "Second hero banner showcasing product variety",
    },
  },

  // ============================================
  // Banner 3: Hero Carousel - Express Yourself
  // ============================================
  {
    id: "banner_hero_express",
    title: "Express Yourself - Hero Banner",
    type: BANNER_TYPE.HERO,
    status: BANNER_STATUS.ACTIVE,

    content: {
      heading: "Express Yourself",
      subheading: "Turn your ideas into beautiful, memorable gifts",
      description: "Create something truly unique with our customization tools",
      image: {
        desktop: images[0].image_3,
        tablet: images[0].image_3,
        mobile: images[0].image_3,
        alt: "Express Yourself",
      },
      backgroundColor: null,
      textColor: null,
    },

    cta: {
      enabled: true,
      type: BANNER_CTA_TYPE.CATEGORY_PAGE,
      text: "Get Started",
      url: Dynamic_Navigation_Url.PRODUCT_LIST,
      params: {
        customizable: "true",
        featured: "true",
      },
      openInNewTab: false,
      variant: "solid",
      color: "primary",
    },

    display: {
      position: BANNER_POSITION.TOP,
      rule: BANNER_DISPLAY_RULE.REPEAT,
      interval: null,
      startPosition: null,
      endPosition: null,
      repeat: true,
      priority: 90,
      animation: BANNER_ANIMATION.FADE,
      animationDuration: 500,
    },

    targeting: {
      pages: [BANNER_TARGET_PAGE.HOME],
      categories: [],
      device: BANNER_DEVICE_TARGET.ALL,
      userSegments: ["all"],
    },

    scheduling: {
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      timeRange: {
        start: "00:00",
        end: "23:59",
      },
    },

    analytics: {
      trackImpressions: true,
      trackClicks: true,
      campaignId: "hero_express_2024",
      utmSource: "website",
      utmMedium: "hero_banner",
      utmCampaign: "express_yourself",
    },

    metadata: {
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-01T10:00:00Z",
      createdBy: "admin_001",
      version: 1,
      notes: "Third hero banner emphasizing customization",
    },
  },

  // ============================================
  // Banner 2: Inline Banner - New Arrivals
  // ============================================
  {
    id: "banner_inline_new_arrivals",
    title: "New Arrivals - Inline Banner",
    type: BANNER_TYPE.INLINE,
    status: BANNER_STATUS.ACTIVE,

    content: {
      heading: "New Arrivals",
      subheading: "Check out our latest collection",
      description: "Fresh designs added every week!",
      image: {
        desktop: images[0].image_2,
        tablet: images[0].image_2,
        mobile: images[0].image_2,
        alt: "New Arrivals Collection",
      },
      backgroundColor: "#DBEAFE",
      textColor: "#1E40AF",
    },

    cta: {
      enabled: true,
      type: BANNER_CTA_TYPE.CATEGORY_PAGE,
      text: "Explore New Arrivals",
      url: Dynamic_Navigation_Url.PRODUCT_LIST,
      params: {
        filter: "new_arrivals",
        sort: "newest_first",
      },
      openInNewTab: false,
      variant: "outline",
      color: "primary",
    },

    display: {
      position: BANNER_POSITION.INLINE,
      rule: BANNER_DISPLAY_RULE.INTERVAL,
      interval: 6, // Show after every 6 products
      startPosition: 6,
      endPosition: null,
      repeat: true, // Repeat every 6 items
      priority: 80,
      animation: BANNER_ANIMATION.SLIDE_UP,
      animationDuration: 400,
    },

    targeting: {
      pages: [BANNER_TARGET_PAGE.PRODUCTS],
      categories: ["all"],
      device: BANNER_DEVICE_TARGET.ALL,
      userSegments: ["all"],
    },

    scheduling: {
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      timeRange: {
        start: "00:00",
        end: "23:59",
      },
    },

    analytics: {
      trackImpressions: true,
      trackClicks: true,
      campaignId: "new_arrivals_2024",
      utmSource: "website",
      utmMedium: "inline_banner",
      utmCampaign: "new_arrivals",
    },

    metadata: {
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-01T10:00:00Z",
      createdBy: "admin_001",
      version: 1,
      notes: "Inline banner for product grid",
    },
  },

  // ============================================
  // Banner 3: Promotional - Free Shipping
  // ============================================
  {
    id: "banner_promo_free_shipping",
    title: "Free Shipping Promotion",
    type: BANNER_TYPE.PROMOTIONAL,
    status: BANNER_STATUS.ACTIVE,

    content: {
      heading: "Free Shipping on Orders Above ₹999",
      subheading: "No minimum order value",
      description: "Shop now and get free delivery across India!",
      image: {
        desktop: images[0].image_3,
        tablet: images[0].image_3,
        mobile: images[0].image_3,
        alt: "Free Shipping Offer",
      },
      backgroundColor: "#D1FAE5",
      textColor: "#065F46",
    },

    cta: {
      enabled: true,
      type: BANNER_CTA_TYPE.INTERNAL_LINK,
      text: "Start Shopping",
      url: Dynamic_Navigation_Url.PRODUCT_LIST,
      params: {},
      openInNewTab: false,
      variant: "solid",
      color: "success",
    },

    display: {
      position: BANNER_POSITION.TOP,
      rule: BANNER_DISPLAY_RULE.ALWAYS,
      interval: null,
      startPosition: null,
      endPosition: null,
      repeat: false,
      priority: 90,
      animation: BANNER_ANIMATION.SLIDE_DOWN,
      animationDuration: 300,
    },

    targeting: {
      pages: [BANNER_TARGET_PAGE.ALL],
      categories: [],
      device: BANNER_DEVICE_TARGET.ALL,
      userSegments: ["all"],
    },

    scheduling: {
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      timeRange: {
        start: "00:00",
        end: "23:59",
      },
    },

    analytics: {
      trackImpressions: true,
      trackClicks: true,
      campaignId: "free_shipping_2024",
      utmSource: "website",
      utmMedium: "promo_banner",
      utmCampaign: "free_shipping",
    },

    metadata: {
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-01T10:00:00Z",
      createdBy: "admin_001",
      version: 1,
      notes: "Sticky top banner for free shipping",
    },
  },

  // ============================================
  // Banner 4: Category Banner - T-Shirts
  // ============================================
  {
    id: "banner_category_tshirts",
    title: "T-Shirts Category Banner",
    type: BANNER_TYPE.CATEGORY,
    status: BANNER_STATUS.ACTIVE,

    content: {
      heading: "Customize Your T-Shirt",
      subheading: "Add your own design, text, or photo",
      description: "Create unique personalized t-shirts for any occasion",
      image: {
        desktop: images[0].image_1,
        tablet: images[0].image_1,
        mobile: images[0].image_1,
        alt: "Customize Your T-Shirt",
      },
      backgroundColor: "#FEE2E2",
      textColor: "#991B1B",
    },

    cta: {
      enabled: true,
      type: BANNER_CTA_TYPE.CATEGORY_PAGE,
      text: "Design Now",
      url: Dynamic_Navigation_Url.PRODUCT_CATEGORY,
      params: {
        category: "tshirt",
        customizable: "true",
      },
      openInNewTab: false,
      variant: "solid",
      color: "danger",
    },

    display: {
      position: BANNER_POSITION.TOP,
      rule: BANNER_DISPLAY_RULE.ALWAYS,
      interval: null,
      startPosition: null,
      endPosition: null,
      repeat: false,
      priority: 85,
      animation: BANNER_ANIMATION.FADE,
      animationDuration: 500,
    },

    targeting: {
      pages: [BANNER_TARGET_PAGE.CATEGORY],
      categories: ["tshirt"],
      device: BANNER_DEVICE_TARGET.ALL,
      userSegments: ["all"],
    },

    scheduling: {
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-12-31T23:59:59Z",
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      timeRange: {
        start: "00:00",
        end: "23:59",
      },
    },

    analytics: {
      trackImpressions: true,
      trackClicks: true,
      campaignId: "tshirt_category_2024",
      utmSource: "website",
      utmMedium: "category_banner",
      utmCampaign: "tshirt_customization",
    },

    metadata: {
      createdAt: "2024-01-01T10:00:00Z",
      updatedAt: "2024-01-01T10:00:00Z",
      createdBy: "admin_001",
      version: 1,
      notes: "Category-specific banner for t-shirts",
    },
  },

  // ============================================
  // Banner 5: Inline Banner - One Round Only
  // ============================================
  {
    id: "banner_inline_limited_offer",
    title: "Limited Time Offer - One Round",
    type: BANNER_TYPE.INLINE,
    status: BANNER_STATUS.ACTIVE,

    content: {
      heading: "⚡ Flash Sale",
      subheading: "Extra 20% Off - Today Only!",
      description: "Use code: FLASH20 at checkout",
      image: {
        desktop: images[0].image_2,
        tablet: images[0].image_2,
        mobile: images[0].image_2,
        alt: "Flash Sale - Extra 20% Off",
      },
      backgroundColor: "#FEF3C7",
      textColor: "#78350F",
    },

    cta: {
      enabled: true,
      type: BANNER_CTA_TYPE.CATEGORY_PAGE,
      text: "Shop Flash Sale",
      url: Dynamic_Navigation_Url.PRODUCT_LIST,
      params: {
        discount: "flash_sale",
        coupon: "FLASH20",
      },
      openInNewTab: false,
      variant: "solid",
      color: "warning",
    },

    display: {
      position: BANNER_POSITION.INLINE,
      rule: BANNER_DISPLAY_RULE.ONE_ROUND,
      interval: 12, // Show at position 12
      startPosition: 12,
      endPosition: 12,
      repeat: false, // Show only once, not repeated
      priority: 95,
      animation: BANNER_ANIMATION.ZOOM,
      animationDuration: 400,
    },

    targeting: {
      pages: [BANNER_TARGET_PAGE.PRODUCTS],
      categories: ["all"],
      device: BANNER_DEVICE_TARGET.ALL,
      userSegments: ["all"],
    },

    scheduling: {
      startDate: "2024-07-01T00:00:00Z",
      endDate: "2024-07-01T23:59:59Z", // One day only
      daysOfWeek: [1], // Monday only
      timeRange: {
        start: "00:00",
        end: "23:59",
      },
    },

    analytics: {
      trackImpressions: true,
      trackClicks: true,
      campaignId: "flash_sale_july_2024",
      utmSource: "website",
      utmMedium: "inline_banner",
      utmCampaign: "flash_sale",
    },

    metadata: {
      createdAt: "2024-06-25T10:00:00Z",
      updatedAt: "2024-06-25T10:00:00Z",
      createdBy: "admin_001",
      version: 1,
      notes: "One-time flash sale banner, shows once at position 12",
    },
  },
];

/* ======================== VALIDATION FUNCTIONS ======================== */

/**
 * Validate banner data structure
 * @param {Object} banner - Banner object to validate
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
export const validateBanner = (banner) => {
  const errors = [];

  // Required fields
  if (!banner.id) errors.push("Banner ID is required");
  if (!banner.title) errors.push("Banner title is required");
  if (!banner.type) errors.push("Banner type is required");
  if (!banner.status) errors.push("Banner status is required");

  // Content validation
  if (!banner.content) {
    errors.push("Banner content is required");
  } else {
    if (!banner.content.heading) errors.push("Content heading is required");
    if (!banner.content.image?.desktop) errors.push("Desktop image is required");
  }

  // CTA validation
  if (banner.cta?.enabled) {
    if (!banner.cta.type) errors.push("CTA type is required when CTA is enabled");
    if (!banner.cta.text) errors.push("CTA text is required when CTA is enabled");
    if (!banner.cta.url) errors.push("CTA URL is required when CTA is enabled");
  }

  // Display validation
  if (!banner.display) {
    errors.push("Display configuration is required");
  } else {
    if (!banner.display.position) errors.push("Display position is required");
    if (!banner.display.rule) errors.push("Display rule is required");
    if (banner.display.rule === BANNER_DISPLAY_RULE.INTERVAL && !banner.display.interval) {
      errors.push("Interval is required for INTERVAL display rule");
    }
  }

  // Scheduling validation
  if (banner.scheduling) {
    if (banner.scheduling.startDate && banner.scheduling.endDate) {
      const start = new Date(banner.scheduling.startDate);
      const end = new Date(banner.scheduling.endDate);
      if (start > end) {
        errors.push("Start date must be before end date");
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Check if banner is currently active based on scheduling
 * @param {Object} banner - Banner object
 * @returns {boolean} - Whether banner should be displayed
 */
export const isBannerActive = (banner) => {
  if (banner.status !== BANNER_STATUS.ACTIVE) return false;

  const now = new Date();

  // Check date range
  if (banner.scheduling?.startDate) {
    const start = new Date(banner.scheduling.startDate);
    if (now < start) return false;
  }

  if (banner.scheduling?.endDate) {
    const end = new Date(banner.scheduling.endDate);
    if (now > end) return false;
  }

  // Check day of week
  if (banner.scheduling?.daysOfWeek?.length > 0) {
    const currentDay = now.getDay();
    if (!banner.scheduling.daysOfWeek.includes(currentDay)) return false;
  }

  // Check time range
  if (banner.scheduling?.timeRange) {
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const { start, end } = banner.scheduling.timeRange;
    if (currentTime < start || currentTime > end) return false;
  }

  return true;
};

/**
 * Filter banners by page and category
 * @param {Array} banners - Array of banner objects
 * @param {string} page - Current page (from BANNER_TARGET_PAGE)
 * @param {string} category - Current category (optional)
 * @returns {Array} - Filtered banners
 */
export const filterBannersByPage = (banners, page, category = null) => {
  return banners.filter(banner => {
    // Check if banner is active
    if (!isBannerActive(banner)) return false;

    // Check page targeting
    const pageMatch = banner.targeting.pages.includes(BANNER_TARGET_PAGE.ALL) ||
                     banner.targeting.pages.includes(page);
    if (!pageMatch) return false;

    // Check category targeting (if applicable)
    if (category && banner.targeting.categories?.length > 0) {
      const categoryMatch = banner.targeting.categories.includes("all") ||
                           banner.targeting.categories.includes(category);
      if (!categoryMatch) return false;
    }

    return true;
  });
};

/**
 * Get banners for inline display (in product grids)
 * @param {Array} banners - Array of banner objects
 * @param {number} totalItems - Total number of items in grid
 * @returns {Array} - Array of { banner, position } objects
 */
export const getInlineBanners = (banners, totalItems) => {
  const inlineBanners = banners.filter(
    banner => banner.display.position === BANNER_POSITION.INLINE
  );

  const result = [];

  inlineBanners.forEach(banner => {
    const { rule, interval, startPosition, endPosition, repeat } = banner.display;

    if (rule === BANNER_DISPLAY_RULE.INTERVAL && interval) {
      // Show at intervals (e.g., every 6 items)
      let position = startPosition || interval;
      while (position <= totalItems) {
        result.push({ banner, position });
        if (!repeat) break; // Show only once
        position += interval;
      }
    } else if (rule === BANNER_DISPLAY_RULE.ONE_ROUND) {
      // Show once at specific position
      if (startPosition && startPosition <= totalItems) {
        result.push({ banner, position: startPosition });
      }
    }
  });

  // Sort by priority (higher priority first)
  return result.sort((a, b) => b.banner.display.priority - a.banner.display.priority);
};

/**
 * Build CTA URL with parameters
 * @param {Object} cta - CTA object from banner
 * @returns {string} - Complete URL with query parameters
 */
export const buildBannerCTAUrl = (cta) => {
  if (!cta.enabled || !cta.url) return "#";

  let url = cta.url;

  // Add query parameters
  if (cta.params && Object.keys(cta.params).length > 0) {
    const params = new URLSearchParams(cta.params);
    url += `?${params.toString()}`;
  }

  return url;
};

/**
 * Get banner by ID
 * @param {string} bannerId - Banner ID
 * @returns {Object|null} - Banner object or null
 */
export const getBannerById = (bannerId) => {
  return BANNER_DATA.find(banner => banner.id === bannerId) || null;
};

/**
 * Get banners by type
 * @param {string} type - Banner type (from BANNER_TYPE)
 * @returns {Array} - Array of banners
 */
export const getBannersByType = (type) => {
  return BANNER_DATA.filter(banner => banner.type === type && isBannerActive(banner));
};

/**
 * Sort banners by priority
 * @param {Array} banners - Array of banner objects
 * @returns {Array} - Sorted banners (highest priority first)
 */
export const sortBannersByPriority = (banners) => {
  return [...banners].sort((a, b) => b.display.priority - a.display.priority);
};