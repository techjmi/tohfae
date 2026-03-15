/**
 * Guest Wishlist Service
 *
 * Handles guest wishlist operations using local storage
 */
import { isBrowser } from '@/shared/utils/window';
import { GUEST_WISHLIST_KEY, GUEST_WISHLIST_LIMIT, GUEST_WISHLIST_MSG } from './wishlist.constant';
import { toast } from 'react-toastify';

export const GuestWishlistService = {
    /**
     * Get wishlist from localStorage
     * @returns {Array<Object>} Array of wishlist items with product details
     */
    getWishlist: () => {
        if (!isBrowser) return [];
        try {
            const wishlist = localStorage.getItem(GUEST_WISHLIST_KEY);
            return wishlist ? JSON.parse(wishlist) : [];
        } catch (error) {
            console.error('Failed to get guest wishlist:', error);
            return [];
        }
    },

    /**
     * Add product to wishlist
     * @param {Object} productData - Product data to add
     * @param {string} productData.id - Product ID
     * @param {string} productData.slug - Product slug
     * @param {string} productData.name - Product name
     * @param {string} productData.image - Product image URL
     * @param {number} productData.price - Product selling price
     * @param {number} productData.mrp - Product MRP
     * @param {number} productData.discount - Discount percentage
     * @returns {Array<Object>} Updated wishlist
     */
    addToWishlist: (productData) => {
        if (!isBrowser) return [];
        try {
            const wishlist = GuestWishlistService.getWishlist();

            // Check if already in wishlist
            if (wishlist.some(item => item.id === productData.id)) {
                return wishlist;
            }

            // Check limit
            if (wishlist.length >= GUEST_WISHLIST_LIMIT) {
                toast.error(GUEST_WISHLIST_MSG.LIMIT_REACHED);
                return wishlist;
            }

            // Add to wishlist with timestamp
            const wishlistItem = {
                id: productData.id,
                slug: productData.slug,
                name: productData.name,
                image: productData.image,
                price: productData.price,
                mrp: productData.mrp,
                discountLabel: productData.discountLabel || null,
                addedAt: new Date().toISOString()
            };

            wishlist.push(wishlistItem);
            localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
            toast.success(GUEST_WISHLIST_MSG.ADDED_TO_WISHLIST);
            return wishlist;
        } catch (error) {
            console.error('Failed to add to guest wishlist:', error);
            return [];
        }
    },

    /**
     * Remove product from wishlist
     * @param {string} productId - Product ID to remove
     * @returns {Array<Object>} Updated wishlist
     */
    removeFromWishlist: (productId) => {
        if (!isBrowser) return [];
        try {
            const wishlist = GuestWishlistService.getWishlist();
            const updatedWishlist = wishlist.filter(item => item.id !== productId);

            localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(updatedWishlist));
            toast.success(GUEST_WISHLIST_MSG.REMOVED_FROM_WISHLIST);
            return updatedWishlist;
        } catch (error) {
            console.error('Failed to remove from guest wishlist:', error);
            return [];
        }
    },

    /**
     * Clear all items from wishlist
     * @returns {Array<Object>} Empty array
     */
    clearWishlist: () => {
        if (!isBrowser) return [];
        try {
            localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify([]));
            toast.success(GUEST_WISHLIST_MSG.WISHLIST_CLEARED);
            return [];
        } catch (error) {
            console.error('Failed to clear guest wishlist:', error);
            return [];
        }
    },
};