export const ACTIVITY_TYPES = {
  RECENTLY_VIEWED: 'recently-viewed',
  RECOMMENDED: 'recommended',
  TOP_PICKS: 'top-picks',
};

export const ACTIVITY_API_PARAMS = {
  [ACTIVITY_TYPES.RECENTLY_VIEWED]: {
    limit: 8,
  },

  [ACTIVITY_TYPES.RECOMMENDED]: {
    limit: 8,
  },

  [ACTIVITY_TYPES.TOP_PICKS]: {
    limit: 8,
  },
};

export const ACTIVITY_CONFIG = {
  [ACTIVITY_TYPES.RECENTLY_VIEWED]: {
    header: 'Recently Viewed',
    subHeader: 'Continue where you left off',
    viewAllLabel: 'Clear History',
    viewAllLink: null,
    showViewAll: false,
    gridClass: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6',
    bgColor: 'bg-gray-50',
    padding: 'py-8',
  },

  [ACTIVITY_TYPES.RECOMMENDED]: {
    header: 'Recommended For You',
    subHeader: 'Based on your activity',
    viewAllLabel: 'View All',
    viewAllLink: '/products',
    showViewAll: true,
    gridClass: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6',
    bgColor: 'bg-white',
    padding: 'py-8',
  },

  [ACTIVITY_TYPES.TOP_PICKS]: {
    header: 'Top Picks For You',
    subHeader: 'Handpicked based on your preferences',
    viewAllLabel: 'View All',
    viewAllLink: '/products',
    showViewAll: true,
    gridClass: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6',
    bgColor: 'bg-white',
    padding: 'py-8',
  },
};

export const getActivityConfig = (activityType) => {
  return ACTIVITY_CONFIG[activityType] || ACTIVITY_CONFIG[ACTIVITY_TYPES.RECENTLY_VIEWED];
};

export const getActivityApiParams = (activityType) => {
  return ACTIVITY_API_PARAMS[activityType] || ACTIVITY_API_PARAMS[ACTIVITY_TYPES.RECENTLY_VIEWED];
};
