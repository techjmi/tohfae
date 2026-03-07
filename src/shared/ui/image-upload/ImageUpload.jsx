/**
 * ImageUpload Component
 * 
 * A comprehensive, reusable image upload component with Cloudinary integration.
 * Features:
 * - Drag and drop support
 * - File validation (size, format)
 * - Image preview
 * - Upload progress tracking
 * - Error handling
 * - Cloudinary integration
 * - Customizable UI
 * - Accessible
 * 
 * Props:
 * @param {string} value - Current image URL (controlled)
 * @param {function} onChange - Change handler (url) => void
 * @param {function} onUploadStart - Upload start callback
 * @param {function} onUploadComplete - Upload complete callback (result) => void
 * @param {function} onUploadError - Upload error callback (error) => void
 * @param {function} onRemove - Remove callback
 * @param {boolean} autoUpload - Auto upload on file select (default: false)
 * @param {boolean} showPreview - Show image preview (default: true)
 * @param {boolean} disabled - Disabled state
 * @param {string} folder - Cloudinary folder path (must match backend CLOUDINARY_FOLDERS)
 * @param {Object} transformation - Cloudinary transformation options (optional)
 * @param {string} className - Additional CSS classes
 * @param {string} label - Label text
 * @param {string} helperText - Helper text
 *
 * Note: Backend provides all validation rules, credentials, and file limits
 * 
 * Usage:
 * <ImageUpload
 *   value={imageUrl}
 *   onChange={(url) => setImageUrl(url)}
 *   folder="profile-pictures"
 *   autoUpload={true}
 * />
 */

"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/shared/ui/button';
import { Icon } from '@/shared/icons';
import {
  UPLOAD_CONFIG,
  UI_CONFIG,
  LABELS,
  ERROR_MESSAGES,
  UPLOAD_STATES,
  CSS_CLASSES,
  BUTTON_CONFIG,
  ICONS,
} from './ImageUpload.constants';
import {
  validateFile,
  formatFileSize,
  createPreviewUrl,
  revokePreviewUrl,
} from './ImageUpload.helper';
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getPublicIdFromUrl
} from '@/services/upload/upload.service';
import './ImageUpload.css';

const ImageUpload = ({
  value = null,
  onChange,
  onUploadStart,
  onUploadComplete,
  onUploadError,
  onRemove,
  autoUpload = UPLOAD_CONFIG.AUTO_UPLOAD,
  showPreview = UPLOAD_CONFIG.SHOW_PREVIEW,
  disabled = false,
  folder = '',
  transformation,
  className = '',
  label,
  helperText,
  ...props
}) => {
  // State
  const [uploadState, setUploadState] = useState(UPLOAD_STATES.IDLE);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(value);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Refs
  const fileInputRef = useRef(null);

  // Update preview when value changes
  useEffect(() => {
    if (value && value !== previewUrl) {
      setPreviewUrl(value);
      setUploadState(UPLOAD_STATES.UPLOADED);
    }
  }, [value]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        revokePreviewUrl(previewUrl);
      }
    };
  }, [previewUrl]);

  // Handle file selection
  const handleFileSelect = async (file) => {
    if (!file || disabled) return;

    // Reset error
    setError(null);

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error);
      setUploadState(UPLOAD_STATES.ERROR);
      return;
    }

    // Set selected file
    setSelectedFile(file);
    setUploadState(UPLOAD_STATES.SELECTED);

    // Create preview
    if (showPreview) {
      // Revoke old preview URL
      if (previewUrl && previewUrl.startsWith('blob:')) {
        revokePreviewUrl(previewUrl);
      }
      const newPreviewUrl = createPreviewUrl(file);
      setPreviewUrl(newPreviewUrl);
    }

    // Auto upload if enabled
    if (autoUpload) {
      await handleUpload(file);
    }
  };

  // Handle file input change
  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle upload
  const handleUpload = async (fileToUpload = selectedFile) => {
    if (!fileToUpload) {
      setError(ERROR_MESSAGES.NO_FILE_SELECTED);
      return;
    }

    try {
      setUploadState(UPLOAD_STATES.UPLOADING);
      setUploadProgress(0);
      setError(null);

      // Call onUploadStart callback
      if (onUploadStart) {
        onUploadStart();
      }

      // Upload to Cloudinary (backend provides all credentials and validation)
      const result = await uploadToCloudinary(
        fileToUpload,
        (percent) => setUploadProgress(percent),
        {
          folder,
          transformation,
        }
      );

      // Update state
      setUploadState(UPLOAD_STATES.UPLOADED);
      setPreviewUrl(result.url);

      // Call callbacks
      if (onChange) {
        onChange(result.url);
      }
      if (onUploadComplete) {
        onUploadComplete(result);
      }
    } catch (err) {
      setUploadState(UPLOAD_STATES.ERROR);
      setError(err.message || ERROR_MESSAGES.UPLOAD_FAILED);

      // Call onUploadError callback
      if (onUploadError) {
        onUploadError(err);
      }
    }
  };

  // Handle remove
  const handleRemove = async () => {
    try {
      // If there's an uploaded image (not just a preview), delete from Cloudinary
      if (value && !value.startsWith('blob:')) {
        const publicId = getPublicIdFromUrl(value);
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
      }

      // Revoke preview URL
      if (previewUrl && previewUrl.startsWith('blob:')) {
        revokePreviewUrl(previewUrl);
      }

      // Reset state
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploadState(UPLOAD_STATES.IDLE);
      setUploadProgress(0);
      setError(null);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Call callbacks
      if (onChange) {
        onChange(null);
      }
      if (onRemove) {
        onRemove();
      }
    } catch (err) {
      console.error('Error removing image:', err);
      // Still reset UI even if delete fails
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploadState(UPLOAD_STATES.IDLE);
      setUploadProgress(0);

      if (onChange) {
        onChange(null);
      }
    }
  };

  // Handle browse button click
  const handleBrowseClick = () => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  };

  // Render upload area
  const renderUploadArea = () => (
    <div
      className={`${CSS_CLASSES.DROP_ZONE} ${isDragging ? CSS_CLASSES.DROP_ZONE_ACTIVE : ''} ${
        error ? CSS_CLASSES.DROP_ZONE_ERROR : ''
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleBrowseClick}
    >
      <div className={CSS_CLASSES.ICON_CONTAINER}>
        <Icon name={ICONS.UPLOAD} size={48} className="text-gray-400" />
      </div>
      <p className="text-lg font-medium text-gray-700">{LABELS.UPLOAD_DESCRIPTION}</p>
      <p className="text-sm text-gray-500 mt-2">{LABELS.UPLOAD_HINT}</p>
      <Button {...BUTTON_CONFIG.BROWSE} className="mt-4">
        {LABELS.BROWSE_BUTTON}
      </Button>
    </div>
  );

  // Render preview
  const renderPreview = () => (
    <div className={CSS_CLASSES.PREVIEW_CONTAINER}>
      <div className="relative">
        <Image
          src={previewUrl}
          alt={LABELS.PREVIEW_ALT}
          width={UI_CONFIG.PREVIEW_WIDTH}
          height={UI_CONFIG.PREVIEW_HEIGHT}
          className={CSS_CLASSES.PREVIEW_IMAGE}
          style={{ objectFit: UI_CONFIG.PREVIEW_OBJECT_FIT }}
        />
        {uploadState === UPLOAD_STATES.UPLOADING && (
          <div className={CSS_CLASSES.PREVIEW_OVERLAY}>
            <Icon name={ICONS.LOADER} size={32} className="text-white animate-spin" />
          </div>
        )}
      </div>

      {/* File info */}
      {selectedFile && (
        <div className={CSS_CLASSES.FILE_INFO}>
          <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
          <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
        </div>
      )}

      {/* Progress bar */}
      {uploadState === UPLOAD_STATES.UPLOADING && (
        <div className={CSS_CLASSES.PROGRESS_CONTAINER}>
          <div className={CSS_CLASSES.PROGRESS_BAR} style={{ width: `${uploadProgress}%` }} />
          <p className={CSS_CLASSES.PROGRESS_TEXT}>{uploadProgress}%</p>
        </div>
      )}

      {/* Action buttons */}
      <div className={CSS_CLASSES.BUTTON_GROUP}>
        {uploadState === UPLOAD_STATES.SELECTED && !autoUpload && (
          <Button {...BUTTON_CONFIG.UPLOAD} onClick={() => handleUpload()}>
            {LABELS.UPLOAD_BUTTON}
          </Button>
        )}
        {uploadState === UPLOAD_STATES.UPLOADED && (
          <Button {...BUTTON_CONFIG.CHANGE} onClick={handleBrowseClick}>
            {LABELS.CHANGE_BUTTON}
          </Button>
        )}
        <Button {...BUTTON_CONFIG.REMOVE} onClick={handleRemove}>
          {LABELS.REMOVE_BUTTON}
        </Button>
      </div>
    </div>
  );

  return (
    <div className={`${CSS_CLASSES.CONTAINER} ${className}`} {...props}>
      {/* Label */}
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Upload area or preview */}
      {!previewUrl || uploadState === UPLOAD_STATES.IDLE ? renderUploadArea() : renderPreview()}

      {/* Error message */}
      {error && (
        <div className={CSS_CLASSES.ERROR_MESSAGE}>
          <Icon name={ICONS.ALERT} size={16} className="text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Helper text */}
      {helperText && !error && <p className={CSS_CLASSES.HELPER_TEXT}>{helperText}</p>}
    </div>
  );
};

export default ImageUpload;

