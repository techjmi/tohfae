/**
 * Wishlist service for authenticated users (API calls)
 */
import apiClient from '../api/client';
import { ENDPOINT } from '../api/endpoint';
import { handleApiError } from '../api/errorHandler';
import { toast } from 'react-toastify';

/**
 * Map wishlist products to flat structure (matches guest wishlist format)
 */
const mapWishlistProducts = (products) => {
    if (!Array.isArray(products)) return [];

    return products.map(product => ({
        id: product._id || product.id,
        slug: product.slug,
        name: product.basic?.name || product.name || product.product_name,
        image: product.media?.thumbnail || product.thumbnail || product.images?.[0] || '',
        price: product.pricing?.sellingPrice || product.selling_price || product.price || 0,
        mrp: product.pricing?.mrp || product.mrp,
        discountLabel: product.pricing?.discount?.label || product.discount_label || null,
    })).filter(Boolean);
};

export const WishlistService = {
    getWishlist: async () => {
        try {
            const response = await apiClient.get(ENDPOINT.WISHLIST.LIST);
            const products = response.data?.data?.products || [];
            return mapWishlistProducts(products);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    toggleWishlist: async (productSlug) => {
        try {
            const response = await apiClient.post(ENDPOINT.WISHLIST.ADD, { productSlug });
            const action = response.data?.data?.action || 'toggled';
            const message = response.data?.message || 'Wishlist updated';

            toast.success(message);

            return {
                success: true,
                action,
                inWishlist: response.data?.data?.inWishlist || false,
                message
            };
        } catch (error) {
            toast.error(error.message || 'Failed to update wishlist');
            throw handleApiError(error);
        }
    },

    mergeWishlist: async (productSlugs) => {
        try {
            const response = await apiClient.post(ENDPOINT.WISHLIST.MERGE, { productSlugs });
            return {
                success: true,
                mergedCount: response.data?.data?.mergedCount || 0,
                totalCount: response.data?.data?.totalCount || 0,
                message: response.data?.message || 'Wishlist merged successfully'
            };
        } catch (error) {
            throw handleApiError(error);
        }
    },

    removeFromWishlist: async (productSlug) => {
        try {
            const response = await apiClient.delete(ENDPOINT.WISHLIST.REMOVE(productSlug));
            const message = response.data?.message || 'Removed from wishlist';

            toast.success(message);

            return {
                success: true,
                message
            };
        } catch (error) {
            toast.error(error.message || 'Failed to remove from wishlist');
            throw handleApiError(error);
        }
    },

    clearWishlist: async () => {
        try {
            const response = await apiClient.delete(ENDPOINT.WISHLIST.CLEAR);
            toast.success(response.data?.message || 'Wishlist cleared');
            return {
                success: true,
                message: response.data?.message || 'Wishlist cleared'
            };
        } catch (error) {
            toast.error(error.message || 'Failed to clear wishlist');
            throw handleApiError(error);
        }
    }
};
