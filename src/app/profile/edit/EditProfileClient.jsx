/**
 * Edit Profile Client Component
 * Client-side component for editing user profile
 * Features:
 * - Profile picture upload with Cloudinary
 * - Edit basic information (name, phone)
 * - Form validation
 * - Toast notifications for success/error
 */

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '@/redux/slice/authSlice';
import { updateProfile, getMyProfile } from '@/services/user/user.service';
import { mapProfileUpdateData } from '@/services/user/user.mapper';
import { Navigation_Url } from '@/shared/constant/global-constant';
import ImageUpload from '@/shared/ui/image-upload';
import Button from '@/shared/ui/button';
import { Input } from '@/shared/ui/from';
import { Icon } from '@/shared/icons';
import UserAvatar from '@/shared/ui/profile/UserAvatar';
import {
  PAGE_CONFIG,
  GRID_FIELDS,
  SINGLE_FIELDS,
  SECTIONS,
  IMAGE_UPLOAD_CONFIG,
  BUTTONS,
  MESSAGES,
  ICONS,
  CSS_CLASSES,
  getImageUploadFolder,
} from './EditProfile.constants';
import './EditProfile.css';

export default function EditProfileClient() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Data state
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    avatar: null,
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await getMyProfile();
        setUserData(data);
        setFormData({
          firstName: data?.firstName || '',
          lastName: data?.lastName || '',
          phone: data?.phone || '',
          avatar: data?.avatar || null,
        });
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load profile';
        toast.error(errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  // Handle avatar change
  const handleAvatarChange = (url) => {
    setFormData((prev) => ({ ...prev, avatar: url }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName.trim()) {
      toast.error(MESSAGES.ERROR.FIRST_NAME_REQUIRED);
      return;
    }

    try {
      setIsSubmitting(true);

      // Map form data to backend format
      const updateData = mapProfileUpdateData(formData);

      // Update profile
      const response = await updateProfile(updateData);

      // Update Redux store
      dispatch(updateUser(response.data));

      // Show success message from backend
      toast.success(response.message || 'Profile updated successfully!');

      // Redirect to profile page after delay
      setTimeout(() => {
        router.push(Navigation_Url.PROFILE);
      }, PAGE_CONFIG.SUCCESS_REDIRECT_DELAY);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || MESSAGES.ERROR.UPDATE_FAILED;
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.push(Navigation_Url.PROFILE);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Error state
  if (error && !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => router.push(Navigation_Url.PROFILE)}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={CSS_CLASSES.CONTAINER}>
      <div className={CSS_CLASSES.WRAPPER}>
        {/* Header */}
        <div className={CSS_CLASSES.HEADER}>
          <button
            onClick={handleCancel}
            className={CSS_CLASSES.BACK_BUTTON}
            aria-label={PAGE_CONFIG.BACK_BUTTON_ARIA_LABEL}
          >
            <Icon name={ICONS.BACK} size={20} />
          </button>
          <h1 className={CSS_CLASSES.TITLE}>{PAGE_CONFIG.TITLE}</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={CSS_CLASSES.FORM}>
          {/* Profile Picture Section */}
          <div className={CSS_CLASSES.SECTION}>
            <h2 className={CSS_CLASSES.SECTION_TITLE}>
              {SECTIONS.PROFILE_PICTURE.title}
            </h2>
            <p className={CSS_CLASSES.SECTION_DESCRIPTION}>
              {SECTIONS.PROFILE_PICTURE.description}
            </p>

            {/* Profile Picture Display */}
            {!showImageUpload ? (
              <div className="profile-picture-display">
                <div className="profile-picture-wrapper">
                  <UserAvatar
                    user={{ ...userData, avatar: formData.avatar }}
                    size="xl"
                    className="profile-avatar"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowImageUpload(true)}
                    className="camera-overlay"
                    aria-label="Change profile picture"
                  >
                    <Icon name="camera" size={24} />
                    <span>Change Photo</span>
                  </Button>
                </div>
                {formData.avatar && (
                  <Button
                    type="button"
                    variant="outline"
                    color="danger"
                    size="sm"
                    onClick={() => setFormData((prev) => ({ ...prev, avatar: null }))}
                  >
                    Remove Photo
                  </Button>
                )}
              </div>
            ) : (
              <div className="image-upload-wrapper">
                <ImageUpload
                  value={formData.avatar}
                  onChange={(url) => {
                    handleAvatarChange(url);
                    setShowImageUpload(false);
                  }}
                  label={IMAGE_UPLOAD_CONFIG.LABEL}
                  helperText={IMAGE_UPLOAD_CONFIG.HELPER_TEXT}
                  folder={getImageUploadFolder(userData?.id)}
                  autoUpload={IMAGE_UPLOAD_CONFIG.AUTO_UPLOAD}
                  transformation={IMAGE_UPLOAD_CONFIG.TRANSFORMATION}
                  onUploadStart={() => {
                    setIsImageUploading(true);
                  }}
                  onUploadComplete={() => {
                    setIsImageUploading(false);
                    toast.success('Image uploaded successfully!');
                  }}
                  onUploadError={(err) => {
                    setIsImageUploading(false);
                    const errorMessage = err.message || MESSAGES.ERROR.IMAGE_UPLOAD_FAILED;
                    setError(errorMessage);
                    toast.error(errorMessage);
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowImageUpload(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Basic Information Section */}
          <div className={CSS_CLASSES.SECTION}>
            <h2 className={CSS_CLASSES.SECTION_TITLE}>
              {SECTIONS.BASIC_INFO.title}
            </h2>
            <p className={CSS_CLASSES.SECTION_DESCRIPTION}>
              {SECTIONS.BASIC_INFO.description}
            </p>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Grid fields - Name row */}
              {GRID_FIELDS.map((gridRow, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gridRow.fields?.map((field) => {
                    const Component = field.type === 'textarea' ? Textarea : Input;
                    return (
                      <Component
                        key={field.name}
                        {...field}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        disabled={field.disabled || isSubmitting}
                      />
                    );
                  })}
                </div>
              ))}

              {/* Single column fields */}
              {SINGLE_FIELDS.map((field) => {
                const Component = field.type === 'textarea' ? Textarea : Input;
                const value = field.name === 'email' ? userData?.email : formData[field.name];
                return (
                  <Component
                    key={field.name}
                    {...field}
                    value={value || ''}
                    onChange={handleInputChange}
                    disabled={field.disabled || isSubmitting}
                  />
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={CSS_CLASSES.FORM_ACTIONS}>
            <Button
              type="button"
              variant={BUTTONS.CANCEL.variant}
              color={BUTTONS.CANCEL.color}
              size={BUTTONS.CANCEL.size}
              onClick={handleCancel}
              disabled={isSubmitting || isImageUploading}
            >
              {BUTTONS.CANCEL.text}
            </Button>
            <Button
              type="submit"
              variant={BUTTONS.SUBMIT.variant}
              color={BUTTONS.SUBMIT.color}
              size={BUTTONS.SUBMIT.size}
              disabled={isSubmitting || isImageUploading}
            >
              {isSubmitting ? (
                <>
                  <Icon name={ICONS.LOADING} size={20} className="animate-spin" />
                  {BUTTONS.SUBMIT.textLoading}
                </>
              ) : (
                BUTTONS.SUBMIT.text
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

