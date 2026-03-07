/**
 * Upload Service
 * Handles file upload operations with Cloudinary
 * 
 * Architecture:
 * - Backend provides validation rules and signature
 * - Frontend only handles UI and direct upload to Cloudinary
 * - No frontend validation - backend validates everything
 */

import { api } from '../api/client';
import { ENDPOINT } from '../api/endpoint';

/**
 * Get upload signature from backend
 * Backend validates user authentication and generates secure signature
 * 
 * @param {string} folder - Cloudinary folder path (e.g., 'tohfae/users')
 * @returns {Promise<Object>} Signature data from backend
 */
export const getUploadSignature = async (folder) => {
  const response = await api.post(ENDPOINT.UPLOAD.SIGNATURE, { folder });
  
  if (!response.data.success || !response.data.data) {
    throw new Error('Failed to get upload signature');
  }

  return response.data.data;
};

/**
 * Upload file to Cloudinary with signed upload
 * 
 * @param {File} file - File to upload
 * @param {Function} onProgress - Progress callback (percent)
 * @param {Object} options - Upload options
 * @param {string} options.folder - Cloudinary folder (default: 'tohfae/users')
 * @returns {Promise<Object>} Upload result { url, publicId, format, width, height, bytes }
 */
export const uploadToCloudinary = async (file, onProgress, options = {}) => {
  const { folder = 'tohfae/users' } = options;

  // Step 1: Get signature from backend (backend validates everything)
  const signatureData = await getUploadSignature(folder);

  // Step 2: Create form data with signature
  const formData = new FormData();
  formData.append('file', file);
  formData.append('signature', signatureData.signature);
  formData.append('timestamp', signatureData.timestamp);
  formData.append('api_key', signatureData.apiKey);
  formData.append('folder', signatureData.folder);

  // Optional transformation params (not included in signature)
  if (signatureData.quality) {
    formData.append('quality', signatureData.quality);
  }
  if (signatureData.fetch_format) {
    formData.append('fetch_format', signatureData.fetch_format);
  }

  // Step 3: Upload to Cloudinary with signature
  const uploadUrl = `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Progress event
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    });

    // Load event (success)
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve({
            url: response.secure_url,
            publicId: response.public_id,
            format: response.format,
            width: response.width,
            height: response.height,
            bytes: response.bytes,
          });
        } catch (error) {
          reject(new Error('Upload failed'));
        }
      } else {
        reject(new Error('Upload failed'));
      }
    });

    // Error event
    xhr.addEventListener('error', () => {
      reject(new Error('Network error'));
    });

    // Abort event
    xhr.addEventListener('abort', () => {
      reject(new Error('Upload cancelled'));
    });

    // Send request
    xhr.open('POST', uploadUrl);
    xhr.send(formData);
  });
};

/**
 * Delete file from Cloudinary
 * 
 * @param {string} publicId - Cloudinary public ID (e.g., 'tohfae/users/image123')
 * @returns {Promise<Object>} Delete result
 */
export const deleteFromCloudinary = async (publicId) => {
  const response = await api.delete(ENDPOINT.UPLOAD.DELETE, {
    data: { publicId }
  });
  
  return response.data;
};

/**
 * Extract public ID from Cloudinary URL
 * 
 * @param {string} url - Cloudinary URL
 * @returns {string} Public ID
 */
export const getPublicIdFromUrl = (url) => {
  if (!url) return '';
  
  const parts = url.split('/');
  const uploadIndex = parts.findIndex(part => part === 'upload');
  
  if (uploadIndex === -1) return '';
  
  // Get everything after 'upload/' and remove file extension
  const pathParts = parts.slice(uploadIndex + 1);
  const publicId = pathParts.join('/').replace(/\.[^/.]+$/, '');
  
  return publicId;
};

