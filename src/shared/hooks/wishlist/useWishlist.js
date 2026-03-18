/**
 * Unified wishlist hook - single source of truth for wishlist operations
 * Uses shared cache to prevent multiple API calls
 */
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/slice/authSlice';
import { WishlistService } from '@/services/wishlist/wishlist.service';
import { GuestWishlistService } from '@/services/wishlist/guest-wishlist-service';

// Shared cache across all hook instances
let cachedWishlist = [];
let isFetching = false;
let fetchPromise = null;
let lastAuthState = null;
let listeners = new Set(); // Track all component instances

// Notify all components when cache updates
const notifyAllComponents = (newWishlist) => {
    cachedWishlist = newWishlist;
    listeners.forEach(listener => listener(newWishlist));
};

export const useWishlist = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [wishlist, setWishlist] = useState(cachedWishlist);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Register this component to receive updates
    useEffect(() => {
        listeners.add(setWishlist);
        return () => listeners.delete(setWishlist);
    }, []);

    const fetchWishlist = useCallback(async () => {
        // If already fetching, wait for that promise
        if (isFetching && fetchPromise) {
            return fetchPromise;
        }

        // If auth state hasn't changed and we have cache, use it
        if (lastAuthState === isAuthenticated && cachedWishlist.length > 0) {
            setWishlist(cachedWishlist);
            return;
        }

        isFetching = true;
        setLoading(true);
        setError(null);

        fetchPromise = (async () => {
            try {
                const data = isAuthenticated
                    ? await WishlistService.getWishlist()
                    : GuestWishlistService.getWishlist();

                lastAuthState = isAuthenticated;
                notifyAllComponents(data); // Update all components
            } catch (err) {
                const errorMessage = err?.message || 'Failed to fetch wishlist';
                setError(errorMessage);
                console.error('Failed to fetch wishlist:', err);
            } finally {
                setLoading(false);
                isFetching = false;
                fetchPromise = null;
            }
        })();

        return fetchPromise;
    }, [isAuthenticated]);

    const toggleWishlist = useCallback(async (product) => {
        if (isAuthenticated) {
            await WishlistService.toggleWishlist(product.slug);
        } else {
            const exists = GuestWishlistService.getWishlist().some(
                item => item.id === product.id || item.slug === product.slug
            );

            if (exists) {
                GuestWishlistService.removeFromWishlist(product.id || product.slug);
            } else {
                GuestWishlistService.addToWishlist(product);
            }
        }

        // Refetch and update all components
        lastAuthState = null; // Force refetch
        await fetchWishlist();
    }, [isAuthenticated, fetchWishlist]);

    const removeFromWishlist = useCallback(async (product) => {
        if (isAuthenticated) {
            await WishlistService.removeFromWishlist(product.slug);
        } else {
            GuestWishlistService.removeFromWishlist(product.id || product.slug);
        }

        // Refetch and update all components
        lastAuthState = null;
        await fetchWishlist();
    }, [isAuthenticated, fetchWishlist]);

    const clearWishlist = useCallback(async () => {
        if (isAuthenticated) {
            await WishlistService.clearWishlist();
        } else {
            GuestWishlistService.clearWishlist();
        }

        // Update all components immediately
        notifyAllComponents([]);
    }, [isAuthenticated]);

    const isInWishlist = useCallback((productId) => {
        return wishlist.some(item =>
            item.id === productId ||
            item._id === productId ||
            item.slug === productId
        );
    }, [wishlist]);

    // Initial fetch on mount and when auth changes
    useEffect(() => {
        fetchWishlist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]); // Only depend on isAuthenticated

    // Listen for storage changes (cross-tab sync for guest users)
    useEffect(() => {
        if (!isAuthenticated) {
            const handleStorageChange = () => {
                const guestWishlist = GuestWishlistService.getWishlist();
                notifyAllComponents(guestWishlist);
            };

            window.addEventListener('storage', handleStorageChange);
            return () => window.removeEventListener('storage', handleStorageChange);
        }
    }, [isAuthenticated]);

    return {
        wishlist,
        loading,
        error,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        refetch: fetchWishlist,
        count: wishlist.length,
        isEmpty: wishlist.length === 0,
    };
};

