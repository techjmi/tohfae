"use client";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/redux/slice/authSlice';
import {
    selectCartItems,
    selectCartCount,
    selectIsLoading,
    selectError,
    addToCart as addToCartAction,
    removeFromCart as removeFromCartAction,
    updateQuantity as updateQuantityAction,
    clearCart as clearCartAction,
    setLoading,
    setError,
} from '@/redux/slice/cartSlice';
import { CartService } from '@/services/cart/cart.service';
import { GuestCartService } from '@/services/cart/guest-cart.service';

export const useCart = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    // Selectors
    const cartItems = useSelector(selectCartItems);
    const totalQuantity = useSelector(selectCartCount);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    const addToCart = async ({ productId, variantId = null, quantity = 1, customization = null }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            if (!user) {
                GuestCartService.addToCart(productId, variantId, quantity, customization);
            } else {
                await CartService.addToCart(productId, variantId, quantity, customization);
            }

            dispatch(addToCartAction({ productId, variantId, quantity }));
            dispatch(setLoading(false));
            return { success: true };
        } catch (err) {
            const errorMessage = err?.message || 'Failed to add to cart';
            dispatch(setError(errorMessage));
            dispatch(setLoading(false));
            return { success: false, error: errorMessage };
        }
    };

    const removeFromCart = async ({ productId, variantId = null, cartItemId = null }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            let response;
            if (!user) {
                GuestCartService.removeItem(productId, variantId);
            } else {
                if (!cartItemId) {
                    throw new Error('Cart item ID is required for authenticated users');
                }
                response = await CartService.removeFromCart(cartItemId);
            }

            dispatch(removeFromCartAction({ productId, variantId }));
            dispatch(setLoading(false));
            return { success: true, message: response?.message };
        } catch (err) {
            const errorMessage = err?.message || 'Failed to remove from cart';
            dispatch(setError(errorMessage));
            dispatch(setLoading(false));
            return { success: false, error: errorMessage };
        }
    };

    const updateQuantity = async ({ productId, variantId = null, quantity, cartItemId = null }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            if (!user) {
                GuestCartService.updateQuantity(productId, variantId, quantity);
            } else {
                await CartService.updateCartItem(cartItemId, quantity);
            }

            dispatch(updateQuantityAction({ productId, variantId, quantity }));
            dispatch(setLoading(false));
            return { success: true };
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.message || 'Failed to update quantity';
            dispatch(setError(errorMessage));
            dispatch(setLoading(false));
            return { success: false, error: errorMessage };
        }
    };

    const clearCart = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            if (!user) {
                GuestCartService.clearCart();
            } else {
                await CartService.clearCart();
            }

            dispatch(clearCartAction());
            dispatch(setLoading(false));
            return { success: true };
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.message || 'Failed to clear cart';
            dispatch(setError(errorMessage));
            dispatch(setLoading(false));
            return { success: false, error: errorMessage };
        }
    };

    return {
        // State
        cartItems,
        totalQuantity,
        isLoading,
        error,

        // Actions
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };
};