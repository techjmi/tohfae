/**
 * Banner Service
 *
 * API methods for banner-related operations (only for client use case)
 *
 * Features:
 * - Get active banners with query params
 * - Map API response to contract format
 *
 * Usage:
 * import { BannerService } from '@/services/banner/banner.service';
 *
 * const banners = await BannerService.getActiveBanners({ page: 'home' });
 */

import apiClient from '@/services/api/client';
import { ENDPOINT } from '@/services/api/endpoint';
import { mapBannersFromAPI } from './banner.mapper';

/**
 * Get active banners from backend
 * @param {Object} params - Query parameters
 * @param {string} params.page - Target page (home, products, category, etc.)
 * @param {string} params.category - Category filter (optional)
 * @param {string} params.type - Banner type filter (optional)
 * @param {string} params.position - Position filter (optional)
 * @returns {Promise<Array>} Array of banners
 */
export const getActiveBanners = async (params = {}) => {
  try {
    const response = await apiClient.get(ENDPOINT.BANNER.ACTIVE, { params });

    // Handle different response structures
    const banners = response.data?.banners || response.data?.data || response.data || [];

    // Map API response to contract format
    return mapBannersFromAPI(banners);
  } catch (error) {
    console.error('Error fetching active banners:', error);
    throw error;
  }
};

export const BannerService = {
  getActiveBanners,
};