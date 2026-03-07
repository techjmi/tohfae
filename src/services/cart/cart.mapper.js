/**
 * Cart Data Mapper
 *
 * Transform API response to contract format and vice versa
 * Handles enriched cart data with product details
 *
 * Features:
 * - Map enriched cart item from API
 * - Map complete cart from API
 * - Map cart item to API request
 * - Handle missing/optional fields
 * - Support for variants and customization
 *
 * Usage:
 * import { mapCartFromAPI, mapCartItemFromAPI, mapAddToCartRequest } from '@/services/cart/cart.mapper';
 *
 * const cart = mapCartFromAPI(apiResponse);
 * const cartItem = mapCartItemFromAPI(apiCartItem);
 */
/**
 * Map enriched cart item from API response to contract format
 * @param {Object} apiItem - Enriched cart item from API
 * @returns {Object} Cart item in contract format
 */
export const mapCartItemFromAPI = (apiItem) => {
    if (!apiItem) return null;

    return {
        // Cart item data
        cartItemId: apiItem.cart_item_id || apiItem.cartItemId,
        productId: apiItem.product_id || apiItem.productId,
        variantId: apiItem.variant_id || apiItem.variantId || null,
        quantity: apiItem.quantity || 1,
        customization: apiItem.customization || null,
        addedAt: apiItem.added_at || apiItem.addedAt,

        // Enriched product data
        product: {
            name: apiItem.product?.name || apiItem.product_name,
            slug: apiItem.product?.slug || apiItem.product_slug,
            category: apiItem.product?.category || apiItem.category,
            thumbnail: apiItem.product?.thumbnail || apiItem.thumbnail,
            brand: apiItem.product?.brand || apiItem.brand || 'Tohfae',
        },

        // Enriched variant data (if exists)
        variant: apiItem.variant ? {
            sku: apiItem.variant.sku,
            attributes: apiItem.variant.attributes || {},
            inStock: apiItem.variant.in_stock ?? apiItem.variant.inStock ?? true,
            stockQuantity: apiItem.variant.stock_quantity ?? apiItem.variant.stockQuantity ?? 0,
        } : null,

        // Pricing data
        pricing: {
            mrp: apiItem.pricing?.mrp || apiItem.mrp,
            sellingPrice: apiItem.pricing?.selling_price || apiItem.pricing?.sellingPrice || apiItem.selling_price,
            discount: apiItem.pricing?.discount || 0,
            currency: apiItem.pricing?.currency || apiItem.currency || 'INR',
        },

        // Calculated fields
        itemTotal: apiItem.item_total || apiItem.itemTotal || 0,
        itemDiscount: apiItem.item_discount || apiItem.itemDiscount || 0,

        // Availability
        isAvailable: apiItem.is_available ?? apiItem.isAvailable ?? true,
        maxQuantity: apiItem.max_quantity || apiItem.maxQuantity || null,
        stockStatus: apiItem.stock_status || apiItem.stockStatus || 'in_stock',
        error: apiItem.error || null,
    };
};

/**
 * Map complete cart from API response to contract format
 * @param {Object} apiCart - Complete cart data from API
 * @returns {Object} Cart in contract format
 */
export const mapCartFromAPI = (apiCart) => {
    if (!apiCart) return null;

    return {
        cartId: apiCart.cart_id || apiCart.cartId,
        userId: apiCart.user_id || apiCart.userId,
        tenantId: apiCart.tenant_id || apiCart.tenantId || 'default',

        // Map enriched cart items
        items: Array.isArray(apiCart.items)
            ? apiCart.items.map(mapCartItemFromAPI).filter(Boolean)
            : [],

        // Cart summary
        summary: {
            itemCount: apiCart.summary?.item_count || apiCart.summary?.itemCount || 0,
            totalQuantity: apiCart.summary?.total_quantity || apiCart.summary?.totalQuantity || 0,
            subtotal: apiCart.summary?.subtotal || 0,
            totalDiscount: apiCart.summary?.total_discount || apiCart.summary?.totalDiscount || 0,
            deliveryCharges: apiCart.summary?.delivery_charges || apiCart.summary?.deliveryCharges || 0,
            couponDiscount: apiCart.summary?.coupon_discount || apiCart.summary?.couponDiscount || 0,
            estimatedTotal: apiCart.summary?.estimated_total || apiCart.summary?.estimatedTotal || 0,
            currency: apiCart.summary?.currency || 'INR',
        },

        // Applied coupon
        appliedCoupon: apiCart.applied_coupon || apiCart.appliedCoupon ? {
            code: apiCart.applied_coupon?.code || apiCart.appliedCoupon?.code,
            discountAmount: apiCart.applied_coupon?.discount_amount || apiCart.appliedCoupon?.discountAmount || 0,
            discountType: apiCart.applied_coupon?.discount_type || apiCart.appliedCoupon?.discountType,
            discountValue: apiCart.applied_coupon?.discount_value || apiCart.appliedCoupon?.discountValue || 0,
        } : null,

        // Delivery info
        deliveryInfo: apiCart.delivery_info || apiCart.deliveryInfo ? {
            isFreeDelivery: apiCart.delivery_info?.is_free_delivery ?? apiCart.deliveryInfo?.isFreeDelivery ?? false,
            freeDeliveryThreshold: apiCart.delivery_info?.free_delivery_threshold || apiCart.deliveryInfo?.freeDeliveryThreshold || null,
            amountToFreeDelivery: apiCart.delivery_info?.amount_to_free_delivery || apiCart.deliveryInfo?.amountToFreeDelivery || null,
        } : null,

        updatedAt: apiCart.updated_at || apiCart.updatedAt,
    };
};

/**
 * Map add to cart request from frontend to API format
 * @param {string} productId - Product ID
 * @param {string|null} variantId - Variant ID (optional)
 * @param {number} quantity - Quantity to add
 * @param {Object|null} customization - Customization data (optional)
 * @returns {Object} Request data for API
 */
export const mapAddToCartRequest = (productId, variantId = null, quantity = 1, customization = null) => {
    return {
        product_id: productId,
        variant_id: variantId,
        quantity: quantity,
        customization: customization,
    };
};

/**
 * Map update cart item request from frontend to API format
 * @param {string} cartItemId - Cart item ID
 * @param {number} quantity - New quantity
 * @returns {Object} Request data for API
 */
export const mapUpdateCartItemRequest = (cartItemId, quantity) => {
    return {
        cart_item_id: cartItemId,
        quantity: quantity,
    };
};

/**
 * Map apply coupon request from frontend to API format
 * @param {string} couponCode - Coupon code to apply
 * @returns {Object} Request data for API
 */
export const mapApplyCouponRequest = (couponCode) => {
    return {
        coupon_code: couponCode,
    };
};
