import apiClient from '../api/client';
import { ENDPOINT } from '../api/endpoint';
import { handleApiError } from '../api/errorHandler';
import { mapAddToCartRequest, mapUpdateCartItemRequest, mapApplyCouponRequest } from './cart.mapper';

export const CartService = {
    getCart: async () => {
        try {
            const response = await apiClient.get(ENDPOINT.CART.CART);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    addToCart: async (productId, variantId = null, quantity = 1, customization = null) => {
        try {
            const requestData = mapAddToCartRequest(productId, variantId, quantity, customization);
            const response = await apiClient.post(ENDPOINT.CART.CART, requestData);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    updateCartItem: async (cartItemId, quantity) => {
        try {
            const requestData = mapUpdateCartItemRequest(cartItemId, quantity);
            const response = await apiClient.put(ENDPOINT.CART.ITEM_BY_ID(cartItemId), requestData);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    removeFromCart: async (cartItemId) => {
        try {
            const response = await apiClient.delete(ENDPOINT.CART.ITEM_BY_ID(cartItemId));
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    clearCart: async () => {
        try {
            const response = await apiClient.delete(ENDPOINT.CART.CART);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    applyCoupon: async (couponCode) => {
        try {
            const requestData = mapApplyCouponRequest(couponCode);
            const response = await apiClient.post(ENDPOINT.CART.COUPON, requestData);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    removeCoupon: async () => {
        try {
            const response = await apiClient.delete(ENDPOINT.CART.COUPON);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    },
};
