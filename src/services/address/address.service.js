/**
 * Address Service
 * Handles all address-related API calls
 */

import apiClient from '../api/client';
import { ENDPOINT } from '../api/endpoint';

/**
 * Get all addresses for current user
 */
export const getMyAddresses = async () => {
  try {
    const response = await apiClient.get(ENDPOINT.USER.ME);
    return response.data.data?.addresses || [];
  } catch (error) {
    console.error('Get addresses error:', error);
    throw error;
  }
};

/**
 * Add new address
 */
export const addAddress = async (addressData) => {
  try {
    const response = await apiClient.post(ENDPOINT.USER.ADDRESSES, addressData);
    return response.data.data || [];
  } catch (error) {
    console.error('Add address error:', error);
    throw error;
  }
};

/**
 * Update existing address
 */
export const updateAddress = async (addressId, addressData) => {
  try {
    const response = await apiClient.put(
      `${ENDPOINT.USER.ADDRESSES}/${addressId}`,
      addressData
    );
    return response.data.data || [];
  } catch (error) {
    console.error('Update address error:', error);
    throw error;
  }
};

/**
 * Delete address
 */
export const deleteAddress = async (addressId) => {
  try {
    const response = await apiClient.delete(
      `${ENDPOINT.USER.ADDRESSES}/${addressId}`
    );
    return response.data.data || [];
  } catch (error) {
    console.error('Delete address error:', error);
    throw error;
  }
};

/**
 * Set address as default
 */
export const setDefaultAddress = async (addressId) => {
  try {
    const response = await apiClient.put(
      `${ENDPOINT.USER.ADDRESSES}/${addressId}`,
      { isDefault: true }
    );
    return response.data.data || [];
  } catch (error) {
    console.error('Set default address error:', error);
    throw error;
  }
};

