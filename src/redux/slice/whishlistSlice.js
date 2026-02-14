/**
 * Wishlist Slice
 * Manages user's wishlist with product IDs only
 * Full product data is fetched from API when needed
 */

import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        addToWishlist: (state, action) => {
            const productId = action.payload;
            if (!state.items.includes(productId)) {
                state.items.push(productId);
            }
        },

        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(id => id !== productId);
        },

        toggleWishlist: (state, action) => {
            const productId = action.payload;
            const index = state.items.indexOf(productId);
            if (index > -1) {
                state.items.splice(index, 1);
            } else {
                state.items.push(productId);
            }
        },

        clearWishlist: (state) => {
            state.items = [];
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },
    },
});

const persistConfig = {
    key: 'wishlist',
    storage,
    whitelist: ['items'],
}

const persistedReducer = persistReducer(persistConfig, wishlistSlice.reducer);

export const {
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    setLoading,
    setError,
    clearError,
} = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist?.items || [];
export const selectWishlistCount = (state) => state.wishlist?.items?.length || 0;
export const selectIsInWishlist = (productId) => (state) => state.wishlist?.items?.includes(productId) || false;
export const selectIsLoading = (state) => state.wishlist?.isLoading || false;
export const selectError = (state) => state.wishlist?.error;

export const wishlistReducer = persistedReducer;
