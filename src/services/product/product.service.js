/**
 * Product Service
 * 
 * API methods for product-related operations
 * 
 * Features:
 * - Get all products with filters
 * - Get single product by ID or slug
 * - Search products
 * - Filter products
 * - Mock data support for development
 * 
 * Usage:
 * import { ProductService } from '@/app/services/product/product.service';
 * 
 * const products = await ProductService.getAll();
 * const product = await ProductService.getById('123');
 */
import apiClient from '../api/client';
import { ENDPOINT } from '../api/endpoint';
import { handleApiError } from '../api/errorHandler';
import { mapProductFromAPI, mapProductsFromAPI } from './product.mapper';
import { API_CONFIG } from '../api/config';
import { PRODUCT_DATA } from '@/contract/product.contract';

export const ProductService = {
    /**
     * Get all products
     * @param {Object} params - Query parameters
     * @param {string} params.category - Filter by category
     * @param {string} params.search - Search query
     * @param {string} params.sort - Sort by field
     * @param {number} params.page - Page number
     * @param {number} params.limit - Items per page
     * @returns {Promise<Array>} Array of products
     */
    getAll: async (params = {}) => {
        try {
            // Use mock data if enabled
            if (API_CONFIG.USE_MOCK) {
                console.log('🎭 Using mock product data');
                return Promise.resolve(PRODUCT_DATA);
            }

            const response = await apiClient.get(ENDPOINT.PRODUCT.LIST, { params });

            // Handle different response structures
            const products = response.data?.products || response.data?.data || response.data || [];

            return mapProductsFromAPI(products);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    /**
     * Get single product by ID
     * @param {string} id - Product ID
     * @returns {Promise<Object>} Product object
     */
    getById: async (id) => {
        try {
            // Use mock data if enabled
            if (API_CONFIG.USE_MOCK) {
                console.log(`🎭 Using mock product data for ID: ${id}`);
                const product = PRODUCT_DATA.find(p => p.id === id);
                return Promise.resolve(product || null);
            }

            const response = await apiClient.get(ENDPOINT.PRODUCT.DETAILS(id));

            // Handle different response structures
            const product = response.data?.product || response.data?.data || response.data;

            return mapProductFromAPI(product);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    /**
     * Get single product by slug
     * @param {string} slug - Product slug
     * @returns {Promise<Object>} Product object
     */
    getBySlug: async (slug) => {
        try {
            // Use mock data if enabled
            if (API_CONFIG.USE_MOCK) {
                console.log(`🎭 Using mock product data for slug: ${slug}`);
                const product = PRODUCT_DATA.find(p => p.slug === slug);
                return Promise.resolve(product || null);
            }

            const response = await apiClient.get(ENDPOINT.PRODUCT.BY_SLUG(slug));

            // Handle different response structures
            const product = response.data?.product || response.data?.data || response.data;

            return mapProductFromAPI(product);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    /**
     * Search products
     * @param {string} query - Search query
     * @param {Object} filters - Additional filters
     * @returns {Promise<Array>} Array of products
     */
    search: async (query, filters = {}) => {
        try {
            // Use mock data if enabled
            if (API_CONFIG.USE_MOCK) {
                console.log(`🎭 Using mock product data for search: ${query}`);
                const filtered = PRODUCT_DATA.filter(p => 
                    p.basic.name.toLowerCase().includes(query.toLowerCase()) ||
                    p.basic.description.toLowerCase().includes(query.toLowerCase())
                );
                return Promise.resolve(filtered);
            }

            const response = await apiClient.get(ENDPOINT.PRODUCT.LIST, {
                params: { search: query, ...filters }
            });
            return mapProductsFromAPI(response.data.products || response.data);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    /**
     * Filter products by category
     * @param {string} category - Category to filter by
     * @returns {Promise<Array>} Array of products
     */
    filterByCategory: async (category) => {
        try {
            // Use mock data if enabled
            if (API_CONFIG.USE_MOCK) {
                console.log(`🎭 Using mock product data for category: ${category}`);
                const filtered = PRODUCT_DATA.filter(p => p.category === category);
                return Promise.resolve(filtered);
            }

            const response = await apiClient.get(ENDPOINT.PRODUCT.LIST, {
                params: { category }
            });
            return mapProductsFromAPI(response.data.products || response.data);
        } catch (error) {
            throw handleApiError(error);
        }
    },
};

