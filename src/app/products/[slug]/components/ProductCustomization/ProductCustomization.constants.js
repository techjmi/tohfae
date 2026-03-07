/**
 * Product Customization Constants
 * 
 * Centralized constants for ProductCustomization component
 */

export const CUSTOMIZATION_TYPES = {
  SELECT: 'select',
  TEXT: 'text',
  TEXTAREA: 'textarea',
  IMAGE: 'image',
  COLOR: 'color',
  NUMBER: 'number',
};

export const FILE_UPLOAD_LIMITS = {
  MAX_SIZE_MB: 5,
  ALLOWED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  ALLOWED_DOCUMENT_FORMATS: ['pdf', 'doc', 'docx'],
};

export const TEXT_LIMITS = {
  DEFAULT_MAX_LENGTH: 100,
  TEXTAREA_MAX_LENGTH: 500,
  MIN_LENGTH: 1,
};

export const MESSAGES = {
  LOGIN_REQUIRED: 'Please login to customize this product',
  LOGIN_BUTTON: 'Login to Customize',
  CUSTOMIZATION_TITLE: 'Customize Your Product',
  FILE_SIZE_ERROR: 'File size exceeds maximum limit',
  FILE_FORMAT_ERROR: 'Invalid file format',
  REQUIRED_FIELD: 'This field is required',
  MAX_LENGTH_EXCEEDED: 'Maximum character limit exceeded',
};

export const INPUT_VARIANTS = {
  SELECT: {
    variant: 'outline',
    size: 'md',
  },
  TEXT: {
    variant: 'outline',
    size: 'md',
  },
  TEXTAREA: {
    variant: 'outline',
    size: 'md',
  },
  FILE: {
    variant: 'outline',
    size: 'md',
  },
};

export const CURRENCY_SYMBOL = '₹';

export const PRICE_MODIFIER_COLORS = {
  POSITIVE: 'text-green-600',
  NEGATIVE: 'text-red-600',
  NEUTRAL: 'text-gray-600',
};

