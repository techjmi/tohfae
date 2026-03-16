/**
 * Product Service
 * Handles all product-related API operations
 */
import apiClient from '../api/client';
import { ENDPOINT } from '../api/endpoint';
import { handleApiError } from '../api/errorHandler';
import { mapProductFromAPI, mapProductsFromAPI } from './product.mapper';

export const ProductService = {
    /**
     * Get all products with filters, search, sort, and pagination
     * @param {Object} params - Query parameters (category, tags, status, search, sort, page, limit)
     */
    getAll: async (params = {}) => {
        try {
            const response = await apiClient.get(ENDPOINT.PRODUCT.LIST, { params });
            const products = response.data?.products || response.data?.data || response.data || [];
            return mapProductsFromAPI(products);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    /**
     * Get single product by ID
     */
    getById: async (id) => {
        try {
            const response = await apiClient.get(ENDPOINT.PRODUCT.DETAILS(id));
            const product = response.data?.product || response.data?.data || response.data;
            return mapProductFromAPI(product);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    /**
     * Get single product by slug
     */
    getBySlug: async (slug) => {
        try {
            const response = await apiClient.get(ENDPOINT.PRODUCT.BY_SLUG(slug));
            const product = response.data?.product || response.data?.data || response.data;
            return mapProductFromAPI(product);
        } catch (error) {
            throw handleApiError(error);
        }
    },
};
