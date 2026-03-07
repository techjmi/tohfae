/**
 * User Service
 * Handles user-related API calls
 */

import apiClient from '../api/client';
import { ENDPOINT } from '../api/endpoint';
import { mapUserResponse } from './user.mapper';

/**
 * Get current user profile
 * GET /api/users/me
 */
export const getMyProfile = async () => {
  const response = await apiClient.get(ENDPOINT.USER.ME);
  return mapUserResponse(response.data);
};

/**
 * Update user profile
 * PUT /api/users/me
 * Returns: { success, message, data: mappedUser }
 */
export const updateProfile = async (profileData) => {
  const response = await apiClient.put(ENDPOINT.USER.ME, profileData);
  return {
    ...response.data,
    data: mapUserResponse(response.data),
  };
};

/**
 * Change password
 * PUT /api/users/me/password
 */
export const changePassword = async (currentPassword, newPassword) => {
  const response = await apiClient.put(ENDPOINT.USER.CHANGE_PASSWORD, {
    currentPassword,
    newPassword
  });
  return response.data;
};

/**
 * Add address
 * POST /api/users/me/addresses
 */
export const addAddress = async (addressData) => {
  const response = await apiClient.post(ENDPOINT.USER.ADDRESSES, addressData);
  return response.data;
};

/**
 * Update address
 * PUT /api/users/me/addresses/:addressId
 */
export const updateAddress = async (addressId, addressData) => {
  const response = await apiClient.put(
    `${ENDPOINT.USER.ADDRESSES}/${addressId}`,
    addressData
  );
  return response.data;
};

/**
 * Delete address
 * DELETE /api/users/me/addresses/:addressId
 */
export const deleteAddress = async (addressId) => {
  const response = await apiClient.delete(
    `${ENDPOINT.USER.ADDRESSES}/${addressId}`
  );
  return response.data;
};

