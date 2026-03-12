const GUEST_CART_KEY = 'tohfae_guest_cart';

export const GuestCartService = {
    getCart: () => {
        if (typeof window === 'undefined') return [];
        try {
            const cart = localStorage.getItem(GUEST_CART_KEY);
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            return [];
        }
    },

    addToCart: (productId, variantId = null, quantity = 1, customization = null) => {
        if (typeof window === 'undefined') return [];
        try {
            const cart = GuestCartService.getCart();
            const existingIndex = cart.findIndex(
                item => item.productId === productId && item.variantId === variantId
            );

            if (existingIndex > -1) {
                cart[existingIndex].quantity += quantity;
                if (customization) {
                    cart[existingIndex].customization = customization;
                }
            } else {
                cart.push({
                    productId,
                    variantId,
                    quantity,
                    customization: customization || {},
                    addedAt: new Date().toISOString(),
                });
            }

            localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
            return cart;
        } catch (error) {
            return [];
        }
    },

    updateQuantity: (productId, variantId = null, quantity) => {
        if (typeof window === 'undefined') return [];
        try {
            const cart = GuestCartService.getCart();
            const itemIndex = cart.findIndex(
                item => item.productId === productId && item.variantId === variantId
            );

            if (itemIndex > -1) {
                if (quantity <= 0) {
                    cart.splice(itemIndex, 1);
                } else {
                    cart[itemIndex].quantity = quantity;
                }
            }

            localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
            return cart;
        } catch (error) {
            return [];
        }
    },

    removeItem: (productId, variantId = null) => {
        if (typeof window === 'undefined') return [];
        try {
            const cart = GuestCartService.getCart();
            const updatedCart = cart.filter(
                item => !(item.productId === productId && item.variantId === variantId)
            );

            localStorage.setItem(GUEST_CART_KEY, JSON.stringify(updatedCart));
            return updatedCart;
        } catch (error) {
            return [];
        }
    },

    clearCart: () => {
        if (typeof window === 'undefined') return [];
        try {
            localStorage.removeItem(GUEST_CART_KEY);
            return [];
        } catch (error) {
            return [];
        }
    },

    getItemCount: () => {
        const cart = GuestCartService.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    },

    hasItem: (productId, variantId = null) => {
        const cart = GuestCartService.getCart();
        return cart.some(
            item => item.productId === productId && item.variantId === variantId
        );
    },
};

