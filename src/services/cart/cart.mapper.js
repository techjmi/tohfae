export const mapAddToCartRequest = (productId, variantId = null, quantity = 1, customization = null) => {
    return {
        productId,
        variantId,
        quantity,
        customization,
    };
};

export const mapUpdateCartItemRequest = (cartItemId, quantity) => {
    return {
        quantity,
    };
};

export const mapApplyCouponRequest = (couponCode) => {
    return {
        coupon_code: couponCode,
    };
};
