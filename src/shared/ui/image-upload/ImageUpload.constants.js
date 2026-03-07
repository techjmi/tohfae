/**
 * ImageUpload Component Constants
 * UI-specific configuration for image upload component
 *
 * IMPORTANT:
 * - Validation rules come from backend via API
 * - Folder paths must match backend CLOUDINARY_FOLDERS
 * - Backend is the single source of truth for all validation
 * - Backend provides Cloudinary credentials (cloudName, apiKey, signature)
 */

// UI-only configuration
export const UPLOAD_CONFIG = {
  // UI options (not validation - backend validates)
  AUTO_UPLOAD: false, // Auto upload on file select
  SHOW_PREVIEW: true, // Show image preview
  ALLOW_MULTIPLE: false, // Allow multiple file selection

  // Default folder for uploads (must match backend CLOUDINARY_FOLDERS.USERS)
  DEFAULT_FOLDER: 'tohfae/users',
};

// UI configuration
export const UI_CONFIG = {
  // Preview dimensions
  PREVIEW_WIDTH: 200,
  PREVIEW_HEIGHT: 200,
  PREVIEW_OBJECT_FIT: 'cover',
  
  // Upload area
  DROP_ZONE_HEIGHT: 200,
  DROP_ZONE_BORDER_COLOR: '#e5e7eb',
  DROP_ZONE_BORDER_COLOR_ACTIVE: '#f97316',
  DROP_ZONE_BACKGROUND: '#f9fafb',
  DROP_ZONE_BACKGROUND_ACTIVE: '#fff7ed',
  
  // Progress bar
  PROGRESS_BAR_COLOR: '#f97316',
  PROGRESS_BAR_HEIGHT: 8,
  PROGRESS_BAR_RADIUS: 4,
};

// Labels and messages
export const LABELS = {
  // Upload area
  UPLOAD_TITLE: 'Upload Image',
  UPLOAD_DESCRIPTION: 'Click to browse or drag and drop',
  UPLOAD_HINT: 'Supported formats: JPG, PNG, WEBP, GIF (Max 5MB)',
  BROWSE_BUTTON: 'Browse Files',
  UPLOAD_BUTTON: 'Upload',
  REMOVE_BUTTON: 'Remove',
  CHANGE_BUTTON: 'Change Image',
  CANCEL_BUTTON: 'Cancel',
  
  // States
  UPLOADING: 'Uploading...',
  UPLOADED: 'Uploaded successfully',
  PROCESSING: 'Processing...',
  
  // Preview
  PREVIEW_ALT: 'Image preview',
  NO_PREVIEW: 'No image selected',
};

// Error messages
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'File size exceeds 5MB limit',
  INVALID_FORMAT: 'Invalid file format. Please upload JPG, PNG, WEBP, or GIF',
  UPLOAD_FAILED: 'Upload failed. Please try again',
  NETWORK_ERROR: 'Network error. Please check your connection',
  NO_FILE_SELECTED: 'Please select a file to upload',
  SIGNATURE_FAILED: 'Failed to get upload signature. Please try again',
  UNAUTHORIZED: 'You must be logged in to upload images',
  MULTIPLE_FILES_NOT_ALLOWED: 'Only one file can be uploaded at a time',
};

// Upload states
export const UPLOAD_STATES = {
  IDLE: 'idle',
  SELECTING: 'selecting',
  SELECTED: 'selected',
  UPLOADING: 'uploading',
  UPLOADED: 'uploaded',
  ERROR: 'error',
};

// CSS classes
export const CSS_CLASSES = {
  CONTAINER: 'image-upload-container',
  DROP_ZONE: 'image-upload-drop-zone',
  DROP_ZONE_ACTIVE: 'image-upload-drop-zone-active',
  DROP_ZONE_ERROR: 'image-upload-drop-zone-error',
  PREVIEW_CONTAINER: 'image-upload-preview-container',
  PREVIEW_IMAGE: 'image-upload-preview-image',
  PREVIEW_OVERLAY: 'image-upload-preview-overlay',
  PROGRESS_CONTAINER: 'image-upload-progress-container',
  PROGRESS_BAR: 'image-upload-progress-bar',
  PROGRESS_TEXT: 'image-upload-progress-text',
  ERROR_MESSAGE: 'image-upload-error-message',
  HELPER_TEXT: 'image-upload-helper-text',
  BUTTON_GROUP: 'image-upload-button-group',
  ICON_CONTAINER: 'image-upload-icon-container',
  FILE_INFO: 'image-upload-file-info',
};

// Button configurations
export const BUTTON_CONFIG = {
  BROWSE: {
    variant: 'outline',
    color: 'neutral',
    size: 'md',
    radius: 'md',
  },
  UPLOAD: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    radius: 'md',
  },
  REMOVE: {
    variant: 'outline',
    color: 'danger',
    size: 'sm',
    radius: 'md',
  },
  CHANGE: {
    variant: 'outline',
    color: 'neutral',
    size: 'sm',
    radius: 'md',
  },
};

// Icons
export const ICONS = {
  UPLOAD: 'Upload',
  IMAGE: 'Image',
  X: 'X',
  CHECK: 'Check',
  ALERT: 'AlertCircle',
  LOADER: 'Loader',
};

