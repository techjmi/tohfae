/**
 * Edit Profile Constants
 * All constants for edit profile page
 */

import { INPUT_TYPE } from '@/shared/ui/from/form.constant';

/**
 * Page Configuration
 */
export const PAGE_CONFIG = {
  TITLE: 'Edit Profile',
  BACK_BUTTON_ARIA_LABEL: 'Go back to profile',
  SUCCESS_REDIRECT_DELAY: 2000, // milliseconds
};

/**
 * SEO Configuration
 */
export const SEO_CONFIG = {
  TITLE: 'Edit Profile | Tohfae',
  DESCRIPTION: 'Update your profile information, change your profile picture, and manage your account settings on Tohfae.',
  KEYWORDS: [
    'edit profile',
    'update profile',
    'profile settings',
    'account settings',
    'change profile picture',
    'update account information',
    'manage profile',
    'tohfae profile'
  ],
  CANONICAL: '/profile/edit',
  NOINDEX: true, // Don't index edit pages
  JSONLD: {
    TYPE: 'WebPage',
    NAME: 'Edit Profile',
    DESCRIPTION: 'Update your profile information and manage your account settings',
  }
};

/**
 * Form Fields for Form Component
 * These are used with the shared Form component
 */

// Grid fields (2-column layout on desktop)
export const GRID_FIELDS = [
  {
    row: 1,
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'Enter your first name',
        type: INPUT_TYPE.TEXT,
        required: true,
      },
      {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Enter your last name',
        type: INPUT_TYPE.TEXT,
        required: false,
      },
    ],
  },
];

// Single column fields
export const SINGLE_FIELDS = [
  {
    name: 'phone',
    label: 'Phone Number',
    placeholder: '+91 9876543210',
    type: INPUT_TYPE.TEL,
    required: false,
  },
  {
    name: 'email',
    label: 'Email Address',
    type: INPUT_TYPE.EMAIL,
    disabled: true,
    helperText: 'Email cannot be changed',
  },
];

/**
 * Section Configuration
 */
export const SECTIONS = {
  PROFILE_PICTURE: {
    title: 'Profile Picture',
    description: 'Upload a profile picture to personalize your account',
  },
  BASIC_INFO: {
    title: 'Basic Information',
    description: 'Update your name and contact information',
  },
};

/**
 * Image Upload Configuration
 * Note: Folder structure must match backend CLOUDINARY_FOLDERS
 */
export const IMAGE_UPLOAD_CONFIG = {
  LABEL: 'Profile Picture',
  HELPER_TEXT: 'Recommended: Square image, at least 400x400px',
  AUTO_UPLOAD: true,
  FOLDER: 'tohfae/users', // Must match backend CLOUDINARY_FOLDERS.USERS
  TRANSFORMATION: {
    width: 400,
    height: 400,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto:best',
  },
};

/**
 * Button Configuration
 */
export const BUTTONS = {
  CANCEL: {
    text: 'Cancel',
    variant: 'outline',
    color: 'neutral',
    size: 'lg',
  },
  SUBMIT: {
    text: 'Save Changes',
    textLoading: 'Saving...',
    variant: 'solid',
    color: 'primary',
    size: 'lg',
  },
};

/**
 * Message Configuration
 */
export const MESSAGES = {
  SUCCESS: 'Profile updated successfully! Redirecting...',
  ERROR: {
    FIRST_NAME_REQUIRED: 'First name is required',
    UPDATE_FAILED: 'Failed to update profile',
    IMAGE_UPLOAD_FAILED: 'Failed to upload image',
  },
};

/**
 * Icon Configuration
 */
export const ICONS = {
  BACK: 'ArrowLeft',
  SUCCESS: 'Check',
  ERROR: 'AlertCircle',
  LOADING: 'Loader',
};

/**
 * CSS Classes
 */
export const CSS_CLASSES = {
  CONTAINER: 'edit-profile-container',
  WRAPPER: 'edit-profile-wrapper',
  HEADER: 'edit-profile-header',
  BACK_BUTTON: 'back-button',
  TITLE: 'edit-profile-title',
  FORM: 'edit-profile-form',
  SECTION: 'form-section',
  SECTION_TITLE: 'section-title',
  SECTION_DESCRIPTION: 'section-description',
  FORM_GRID: 'form-grid',
  SUCCESS_MESSAGE: 'success-message',
  ERROR_MESSAGE: 'error-message',
  FORM_ACTIONS: 'form-actions',
};

/**
 * Helper function to get image upload folder path
 * Returns the folder path that matches backend CLOUDINARY_FOLDERS.USERS
 *
 * @param {string} _userId - User ID (not used in folder path, but kept for future use)
 * @returns {string} Cloudinary folder path
 */
export const getImageUploadFolder = (_userId) => {
  // Backend expects 'tohfae/users' for all user uploads
  // _userId can be used in the future if we need user-specific folders
  return IMAGE_UPLOAD_CONFIG.FOLDER;
};

