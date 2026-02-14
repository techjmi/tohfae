/**
 * Cart Slice
 * Manages shopping cart with product IDs and quantities
 * Persisted to localStorage for guest users
 * Synced to database for logged-in users
 */

import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        // Add item to cart or increase quantity if already exists
        addToCart: (state, action) => {
            const { productId, quantity = 1, variantId = null } = action.payload;
            const existingItem = state.items.find(
                item => item.productId === productId && item.variantId === variantId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ productId, variantId, quantity });
            }
        },

        // Set exact quantity for an item
        updateQuantity: (state, action) => {
            const { productId, variantId = null, quantity } = action.payload;
            const item = state.items.find(
                item => item.productId === productId && item.variantId === variantId
            );

            if (item) {
                if (quantity <= 0) {
                    // Remove item if quantity is 0 or less
                    state.items = state.items.filter(
                        i => !(i.productId === productId && i.variantId === variantId)
                    );
                } else {
                    item.quantity = quantity;
                }
            }
        },

        // Increase quantity by 1
        incrementQuantity: (state, action) => {
            const { productId, variantId = null } = action.payload;
            const item = state.items.find(
                item => item.productId === productId && item.variantId === variantId
            );

            if (item) {
                item.quantity++;
            }
        },

        // Decrease quantity by 1, remove if reaches 0
        decrementQuantity: (state, action) => {
            const { productId, variantId = null } = action.payload;
            const item = state.items.find(
                item => item.productId === productId && item.variantId === variantId
            );

            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    state.items = state.items.filter(
                        i => !(i.productId === productId && i.variantId === variantId)
                    );
                }
            }
        },

        // Remove item from cart completely
        removeFromCart: (state, action) => {
            const { productId, variantId = null } = action.payload;
            state.items = state.items.filter(
                item => !(item.productId === productId && item.variantId === variantId)
            );
        },

        // Clear all items from cart
        clearCart: (state) => {
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
    key: 'cart',
    storage,
    whitelist: ['items'],
}

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

export const {
    addToCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    setLoading,
    setError,
    clearError,
} = cartSlice.actions;

// Get all cart items
export const selectCartItems = (state) => state.cart?.items || [];

// Get total quantity of all items (sum)
export const selectCartCount = (state) => {
    const items = state.cart?.items || [];
    return items.reduce((total, item) => total + item.quantity, 0);
};

// Get number of unique items in cart
export const selectCartItemsCount = (state) => state.cart?.items?.length || 0;

// Check if specific item exists in cart
export const selectIsInCart = (productId, variantId = null) => (state) => {
    const items = state.cart?.items || [];
    return items.some(item => item.productId === productId && item.variantId === variantId);
};

// Get quantity of specific item
export const selectItemQuantity = (productId, variantId = null) => (state) => {
    const items = state.cart?.items || [];
    const item = items.find(item => item.productId === productId && item.variantId === variantId);
    return item?.quantity || 0;
};

export const selectIsLoading = (state) => state.cart?.isLoading || false;
export const selectError = (state) => state.cart?.error;

export const cartReducer = persistedReducer;
