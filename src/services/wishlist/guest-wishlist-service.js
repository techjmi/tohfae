/**
 * Guest wishlist service (localStorage)
 */
import { isBrowser } from '@/shared/utils/window';
import { GUEST_WISHLIST_KEY, GUEST_WISHLIST_LIMIT, GUEST_WISHLIST_MSG } from './wishlist.constant';
import { toast } from 'react-toastify';

export const GuestWishlistService = {
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

    addToWishlist: (productData) => {
        if (!isBrowser) return [];
        try {
            const wishlist = GuestWishlistService.getWishlist();

            if (wishlist.some(item => item.id === productData.id)) {
                return wishlist;
            }

            if (wishlist.length >= GUEST_WISHLIST_LIMIT) {
                toast.error(GUEST_WISHLIST_MSG.LIMIT_REACHED);
                return wishlist;
            }

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