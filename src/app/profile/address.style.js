/**
 * Address Components Style Constants
 * Centralized styling for all address-related components
 */

/**
 * Address List styles
 */
export const ADDRESS_LIST_STYLES = {
  CONTAINER: "mt-6",
  HEADER: {
    CONTAINER: "flex justify-between items-center mb-4",
    TITLE: "text-lg font-semibold"
  },
  LOADING: "text-center py-8 text-gray-500",
  EMPTY_STATE: {
    CONTAINER: "text-center py-8 bg-gray-50 rounded-lg",
    TEXT: "text-gray-500 mb-4"
  },
  GRID: "grid grid-cols-1 md:grid-cols-2 gap-4"
};

/**
 * Address Card styles
 */
export const ADDRESS_CARD_STYLES = {
  CARD: "hover:shadow-md transition-shadow",
  HEADER: {
    CONTAINER: "flex justify-between items-start mb-3",
    LABEL_CONTAINER: "flex items-center gap-2",
    LABEL: "font-semibold text-gray-900 capitalize"
  },
  CONTENT: {
    CONTAINER: "space-y-1 text-sm text-gray-600 mb-4",
    NAME: "font-medium text-gray-900",
    ADDRESS_LINE: ""
  },
  ACTIONS: {
    CONTAINER: "flex flex-wrap gap-2"
  }
};

