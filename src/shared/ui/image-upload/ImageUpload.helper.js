/**
 * ImageUpload Helper Functions
 * UI utility functions for image upload component
 *
 * Note: Validation is handled by backend
 * This file only contains UI-specific utilities
 */

import { ERROR_MESSAGES } from './ImageUpload.constants';

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Get file extension
 * @param {string} filename - File name
 * @returns {string} - File extension
 */
export const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

/**
 * Create preview URL from file
 * @param {File} file - File to create preview from
 * @returns {string} - Preview URL
 */
export const createPreviewUrl = (file) => {
  if (!file) return null;
  return URL.createObjectURL(file);
};

/**
 * Revoke preview URL
 * @param {string} url - Preview URL to revoke
 */
export const revokePreviewUrl = (url) => {
  if (url && url.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error revoking preview URL:', error);
    }
  }
};

/**
 * Basic file validation (UI-only, backend does real validation)
 * @param {File} file - File to validate
 * @returns {Object} - { valid: boolean, error: string }
 */
export const validateFile = (file) => {
  if (!file) {
    return { valid: false, error: ERROR_MESSAGES.NO_FILE_SELECTED };
  }

  // Basic check - backend will do real validation
  return { valid: true, error: null };
};

