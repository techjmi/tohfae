/**
 * Cart Service
 *
 * API methods for cart operations
 *
 * Features:
 * - Get user's cart with enriched product data
 * - Add item to cart
 * - Update cart item quantity
 * - Remove item from cart
 * - Clear cart
 * - Apply/remove coupon
 *
 * Usage:
 * import { CartService } from '@/services/cart/cart.service';
 *
 * const cart = await CartService.getCart();
 * await CartService.addToCart('prod_001', 'var_001', 2);
 */
import apiClient from '../api/client';
import { ENDPOINT } from '../api/endpoint';
import { handleApiError } from '../api/errorHandler';
import { mapCartFromAPI, mapAddToCartRequest, mapUpdateCartItemRequest, mapApplyCouponRequest } from './cart.mapper';
import { API_CONFIG } from '../api/config';
import {
    EXAMPLE_CART_API,
    EXAMPLE_ADD_TO_CART_RESPONSE,
    EXAMPLE_UPDATE_CART_ITEM_RESPONSE,
    EXAMPLE_REMOVE_FROM_CART_RESPONSE,
    EXAMPLE_CLEAR_CART_RESPONSE,
    EXAMPLE_APPLY_COUPON_RESPONSE,
    EXAMPLE_REMOVE_COUPON_RESPONSE,
} from '@/contract/cart.contract';

export const CartService = {
    /**
     * Get user's cart with enriched product data
     * @returns {Promise<Object>} Cart object with enriched items
     */
    getCart: async () => {
        try {
            // Use mock data if enabled
            if (API_CONFIG.USE_MOCK) {
                console.log('🛒 Using mock cart data');
                return Promise.resolve(EXAMPLE_CART_API);
            }

            const response = await apiClient.get(ENDPOINT.CART.CART);
            return mapCartFromAPI(response.data.data || response.data);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    /**
     * Add item to cart
     * @param {string} productId - Product ID
     * @param {string|null} variantId - Variant ID (optional)
     * @param {number} quantity - Quantity to add (default: 1)
     * @param {Object|null} customization - Customization data (optional)
     * @returns {Promise<Object>} Response with success status
     */
    addToCart: async (productId, variantId = null, quantity = 1, customization = null) => {
        try {
            // Use mock data if enabled
            if (API_CONFIG.USE_MOCK) {
                console.log('🛒 Using mock add to cart', { productId, variantId, quantity, customization });
                // Return mock response with dynamic data
                return Promise.resolve({
                    ...EXAMPLE_ADD_TO_CART_RESPONSE,
                    data: {
                        ...EXAMPLE_ADD_TO_CART_RESPONSE.data,
                        // Use actual parameters in mock response
                        productId,
                        variantId,
                        quantity,
                    }
                });
            }

            const requestData = mapAddToCartRequest(productId, variantId, quantity, customization);
            const response = await apiClient.post(ENDPOINT.CART.ITEMS, requestData);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    /**
     * Update cart item quantity
     * @param {string} cartItemId - Cart item ID
     * @param {number} quantity - New quantity
     * @returns {Promise<Object>} Response with updated data
     */
    updateCartItem: async (cartItemId, quantity) => {
        try {
            // Use mock data if enabled
            if (API_CONFIG.USE_MOCK) {
                console.log('🛒 Using mock update cart item', { cartItemId, quantity });
                // Return mock response with dynamic data
                return Promise.resolve({
                    ...EXAMPLE_UPDATE_CART_ITEM_RESPONSE,
                    data: {
                        ...EXAMPLE_UPDATE_CART_ITEM_RESPONSE.data,
                        cartItemId,
                        quantity,
                        itemTotal: 900 * quantity, // Mock calculation
                    }
                });
            }

            const requestData = mapUpdateCartItemRequest(cartItemId, quantity);
            const response = await apiClient.put(ENDPOINT.CART.ITEM_BY_ID(cartItemId), requestData);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    /**
     * Remove item from cart
     * @param {string} cartItemId - Cart item ID
     * @returns {Promise<Object>} Response with success status
     */
    removeFromCart: async (cartItemId) => {
        try {
            // Use mock data if enabled
            if (API_CONFIG.USE_MOCK) {
                console.log('🛒 Using mock remove from cart', { cartItemId });
                return Promise.resolve(EXAMPLE_REMOVE_FROM_CART_RESPONSE);
            }

            const response = await apiClient.delete(ENDPOINT.CART.ITEM_BY_ID(cartItemId));
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    /**
     * Clear entire cart
     * @returns {Promise<Object>} Response with success status
     */
    clearCart: async () => {
        try {
            // Use mock data if enabled
            if (API_CONFIG.USE_MOCK) {
                console.log('🛒 Using mock clear cart');
                return Promise.resolve(EXAMPLE_CLEAR_CART_RESPONSE);
            }

            const response = await apiClient.delete(ENDPOINT.CART.CART);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    /**
     * Apply coupon to cart
     * @param {string} couponCode - Coupon code to apply
     * @returns {Promise<Object>} Response with discount details
     */
    applyCoupon: async (couponCode) => {
        try {
            // Use mock data if enabled
            if (API_CONFIG.USE_MOCK) {
                console.log('🛒 Using mock apply coupon', { couponCode });
                // Return mock response with actual coupon code
                return Promise.resolve({
                    ...EXAMPLE_APPLY_COUPON_RESPONSE,
                    data: {
                        ...EXAMPLE_APPLY_COUPON_RESPONSE.data,
                        couponCode,
                    }
                });
            }

            const requestData = mapApplyCouponRequest(couponCode);
            const response = await apiClient.post(ENDPOINT.CART.COUPON, requestData);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    /**
     * Remove applied coupon from cart
     * @returns {Promise<Object>} Response with success status
     */
    removeCoupon: async () => {
        try {
            // Use mock data if enabled
            if (API_CONFIG.USE_MOCK) {
                console.log('🛒 Using mock remove coupon');
                return Promise.resolve(EXAMPLE_REMOVE_COUPON_RESPONSE);
            }

            const response = await apiClient.delete(ENDPOINT.CART.COUPON);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },
};
