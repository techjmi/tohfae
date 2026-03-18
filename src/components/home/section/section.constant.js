// Section Configuration - All home page product sections

export const SECTION_TYPES = {
  NEW_ARRIVAL: 'new-arrival',
  TRENDING: 'trending',
  BEST_SELLER: 'best-seller',
  FEATURED: 'featured',
  DEALS: 'deals',
  PERSONALIZED: 'personalized',
};

// API Parameters for fetching products
export const SECTION_API_PARAMS = {
  [SECTION_TYPES.NEW_ARRIVAL]: {
    tags: 'new-arrival',
    status: 'active',
    limit: 8,
    sort: 'newest',
  },
  
  [SECTION_TYPES.TRENDING]: {
    tags: 'trending',
    status: 'active',
    limit: 8,
    sort: 'popular',
  },
  
  [SECTION_TYPES.BEST_SELLER]: {
    tags: 'best-seller',
    status: 'active',
    limit: 8,
    sort: 'popular',
  },
  
  [SECTION_TYPES.FEATURED]: {
    featured: true,
    status: 'active',
    limit: 8,
    sort: 'newest',
  },
  
  [SECTION_TYPES.DEALS]: {
    tags: 'deals',
    status: 'active',
    limit: 12,
    sort: 'price-asc',
  },
  
  [SECTION_TYPES.PERSONALIZED]: {
    status: 'active',
    limit: 8,
    sort: 'newest',
  },
};

// Default configuration values
export const SECTION_DEFAULTS = {
  header: 'Products',
  subHeader: '',
  viewAllLabel: 'View All',
  viewAllLink: '/products',
  showViewAll: true,
  layout: 'auto',
  scrollSpeed: 1,
  scrollGap: 16,
  scrollItemWidth: '280px',
  scrollLoop: true,
  scrollStopOnMouseEnter: true,
  gridClass: 'products-grid',
  bgColor: 'bg-white',
  padding: 'py-8',
};

// UI Configuration for each section
export const SECTION_CONFIG = {
  [SECTION_TYPES.NEW_ARRIVAL]: {
    header: 'New Arrivals',
    subHeader: 'Check out our latest products',
    viewAllLink: '/products?tags=new-arrival',
    layout: 'auto',
    bgColor: 'bg-white',
    padding: 'py-8',
  },

  [SECTION_TYPES.TRENDING]: {
    header: 'Trending Now',
    subHeader: 'Most popular products this week',
    viewAllLink: '/products?tags=trending',
    layout: 'auto',
    bgColor: 'bg-gray-50',
    padding: 'py-8',
  },

  [SECTION_TYPES.BEST_SELLER]: {
    header: 'Best Sellers',
    subHeader: 'Our customers\' favorites',
    viewAllLink: '/products?tags=best-seller',
    layout: 'grid',
    bgColor: 'bg-white',
    padding: 'py-8',
  },

  [SECTION_TYPES.FEATURED]: {
    header: 'Featured Products',
    subHeader: 'Handpicked just for you',
    viewAllLink: '/products?featured=true',
    layout: 'auto',
    bgColor: 'bg-white',
    padding: 'py-8',
  },

  [SECTION_TYPES.DEALS]: {
    header: 'Hot Deals 🔥',
    subHeader: 'Limited time offers - Grab them before they\'re gone!',
    viewAllLabel: 'View All Deals',
    viewAllLink: '/products?tags=deals',
    layout: 'scroll',
    scrollSpeed: 0.5,
    bgColor: 'bg-orange-50',
    padding: 'py-8',
  },

  [SECTION_TYPES.PERSONALIZED]: {
    header: 'Recommended For You',
    subHeader: 'Based on your browsing history',
    viewAllLink: '/products',
    layout: 'auto',
    bgColor: 'bg-white',
    padding: 'py-8',
  },
};

export const getSectionApiParams = (sectionType) => {
  return SECTION_API_PARAMS[sectionType] || SECTION_API_PARAMS[SECTION_TYPES.NEW_ARRIVAL];
};

export const getSectionConfig = (sectionType) => {
  return SECTION_CONFIG[sectionType] || SECTION_CONFIG[SECTION_TYPES.NEW_ARRIVAL];
};

