/**
 * Wishlist Page Style Constants
 * 
 * Centralized CSS classes for wishlist page components
 */

/**
 * Wishlist Page Container Styles
 */
export const WISHLIST_PAGE_STYLES = {
  CONTAINER: 'min-h-screen bg-gray-50',
  INNER_CONTAINER: 'container mx-auto px-4 py-6',
  HEADER: 'flex items-center justify-between mb-8',
  TITLE: 'text-3xl font-bold text-gray-900',
  SUBTITLE: 'text-sm text-gray-600 mt-1',
};

/**
 * Wishlist Grid Styles
 */
export const WISHLIST_GRID_STYLES = {
  CONTAINER: 'mt-8',
  GRID: 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr',
};

/**
 * Wishlist Card Styles
 */
export const WISHLIST_CARD_STYLES = {
  CONTAINER: 'group overflow-hidden transition-all duration-300 h-full flex flex-col',
  IMAGE_CONTAINER: 'relative',
  REMOVE_BUTTON: 'absolute top-2 right-2 z-10',
  CONTENT: 'p-4 space-y-2 flex-1 flex flex-col',
  ACTIONS: 'mt-auto pt-2',
};

