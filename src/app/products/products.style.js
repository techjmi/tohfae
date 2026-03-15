/**
 * Products Page Style Constants
 * 
 * Centralized CSS classes for products page components
 * Following clean architecture principles
 */

/**
 * Products Page Container Styles
 */
export const PRODUCTS_PAGE_STYLES = {
  CONTAINER: 'min-h-screen bg-gray-50',
  INNER_CONTAINER: 'container mx-auto px-4 py-6',
  HEADER_SECTION: 'mb-8',
  CONTENT_SECTION: 'mt-8',

};

/**
 * Products Grid Styles
 */
export const PRODUCTS_GRID_STYLES = {
  CONTAINER: 'mt-8',
  RESULTS_COUNT: 'mb-4',
  RESULTS_TEXT: 'text-sm text-gray-600',
  RESULTS_NUMBER: 'font-semibold',
  GRID: 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr',
  GRID_ITEM: 'transition-all duration-300',
};

/**
 * Products Header Styles
 */
export const PRODUCTS_HEADER_STYLES = {
  CONTAINER: 'space-y-4',
  TITLE_SECTION: 'text-center mb-6',
  TITLE: 'text-3xl font-bold text-gray-900',
  SUBTITLE: 'text-lg text-gray-600 mt-2',
  BREADCRUMB_CONTAINER: 'mb-4',
  FILTER_SECTION: 'flex flex-wrap items-center justify-between gap-4',
  FILTER_CHIPS_CONTAINER: 'flex flex-wrap gap-2',
  SORT_CONTAINER: 'flex items-center gap-2',
};

/**
 * Filter Chip Styles
 */
export const FILTER_CHIP_STYLES = {
  BASE: 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
  ACTIVE: 'bg-primary-600 text-white shadow-md',
  INACTIVE: 'bg-white text-gray-700 border border-gray-300 hover:border-primary-500 hover:text-primary-600',
  DISABLED: 'opacity-50 cursor-not-allowed',
};

/**
 * Sort Dropdown Styles
 */
export const SORT_DROPDOWN_STYLES = {
  CONTAINER: 'relative inline-block',
  LABEL: 'text-sm font-medium text-gray-700 mr-2',
  SELECT: 'px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
  OPTION: 'py-2 px-4 hover:bg-gray-100',
};

/**
 * Empty State Styles
 */
export const EMPTY_STATE_STYLES = {
  CONTAINER: 'flex flex-col items-center justify-center py-16 px-4',
  ICON: 'w-24 h-24 text-gray-400 mb-4',
  TITLE: 'text-2xl font-semibold text-gray-900 mb-2',
  DESCRIPTION: 'text-gray-600 mb-6 text-center max-w-md',
  BUTTON_CONTAINER: 'mt-4',
};

/**
 * Loading State Styles
 */
export const LOADING_STATE_STYLES = {
  CONTAINER: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6',
  SKELETON_CARD: 'bg-white rounded-lg shadow-sm overflow-hidden',
  SKELETON_IMAGE: 'w-full h-64 bg-gray-200 animate-pulse',
  SKELETON_CONTENT: 'p-4 space-y-3',
  SKELETON_LINE: 'h-4 bg-gray-200 rounded animate-pulse',
  SKELETON_LINE_SHORT: 'h-4 bg-gray-200 rounded animate-pulse w-2/3',
};

/**
 * Pagination Styles
 */
export const PAGINATION_STYLES = {
  CONTAINER: 'flex items-center justify-center gap-2 mt-8',
  BUTTON: 'px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors',
  BUTTON_ACTIVE: 'bg-primary-600 text-white border-primary-600',
  BUTTON_INACTIVE: 'bg-white text-gray-700 hover:bg-gray-50',
  BUTTON_DISABLED: 'opacity-50 cursor-not-allowed',
  PAGE_INFO: 'text-sm text-gray-600',
};

/**
 * Filter Panel Styles (for mobile/sidebar)
 */
export const FILTER_PANEL_STYLES = {
  CONTAINER: 'bg-white rounded-lg shadow-sm p-6',
  HEADER: 'flex items-center justify-between mb-4',
  TITLE: 'text-lg font-semibold text-gray-900',
  CLEAR_BUTTON: 'text-sm text-primary-600 hover:text-primary-700 font-medium',
  SECTION: 'mb-6',
  SECTION_TITLE: 'text-sm font-medium text-gray-900 mb-3',
  DIVIDER: 'border-t border-gray-200 my-4',
};

/**
 * Price Range Slider Styles
 */
export const PRICE_RANGE_STYLES = {
  CONTAINER: 'space-y-4',
  SLIDER: 'w-full',
  RANGE_DISPLAY: 'flex items-center justify-between text-sm text-gray-600',
  RANGE_VALUE: 'font-medium text-gray-900',
  INPUT: 'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer',
};

/**
 * Rating Filter Styles
 */
export const RATING_FILTER_STYLES = {
  CONTAINER: 'space-y-2',
  ITEM: 'flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors',
  CHECKBOX: 'w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500',
  LABEL: 'text-sm text-gray-700 flex items-center gap-1',
  STARS: 'flex items-center gap-0.5',
  STAR_ICON: 'w-4 h-4 text-yellow-400',
};

/**
 * Active Filters Display Styles
 */
export const ACTIVE_FILTERS_STYLES = {
  CONTAINER: 'flex flex-wrap items-center gap-2 mb-4',
  LABEL: 'text-sm font-medium text-gray-700',
  CHIP: 'inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm',
  REMOVE_BUTTON: 'ml-1 hover:text-primary-900 transition-colors',
  REMOVE_ICON: 'w-4 h-4',
  CLEAR_ALL: 'text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer',
};

/**
 * Product Card Hover Effects
 */
export const PRODUCT_CARD_HOVER = {
  CONTAINER: 'group hover:shadow-lg transition-shadow duration-300',
  IMAGE: 'group-hover:scale-105 transition-transform duration-300',
  OVERLAY: 'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
};

