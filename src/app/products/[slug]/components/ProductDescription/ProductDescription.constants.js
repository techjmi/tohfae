/**
 * ProductDescription Component Constants
 */

// Tab configuration
export const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'shipping', label: 'Shipping & Returns' },
];

// Default tab
export const DEFAULT_TAB = 'description';

// Tab button styles
export const TAB_STYLES = {
  BASE: 'flex-1 px-6 py-4 text-sm font-semibold transition-colors',
  ACTIVE: 'text-orange-600 border-b-2 border-orange-600 bg-orange-50',
  INACTIVE: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
};

// Messages
export const MESSAGES = {
  NO_DESCRIPTION: 'No description available.',
  NO_SPECIFICATIONS: 'No specifications available.',
  SHIPPING_INFO_TITLE: 'Shipping Information',
  RETURN_POLICY_TITLE: 'Return & Replacement Policy',
};

// Labels
export const LABELS = {
  WEIGHT: 'Weight',
  DELIVERY_TIME: 'Delivery Time',
  SHIPPING_CLASS: 'Shipping Class',
  RETURN_WINDOW: 'Return Window',
  REPLACEMENT_WINDOW: 'Replacement Window',
  CANCELLATION_WINDOW: 'Cancellation Window',
  GRAMS: 'grams',
  DAYS: 'days',
};

