/**
 * Product Data Mapper
 * 
 * Transform API response to contract format and vice versa
 * 
 * Features:
 * - Map API response to product contract format
 * - Map product contract to API request format
 * - Handle missing/optional fields
 * - Support for single product and array of products
 * 
 * Usage:
 * import { mapProductFromAPI, mapProductsFromAPI } from '@/app/services/product/product.mapper';
 * 
 * const product = mapProductFromAPI(apiResponse);
 * const products = mapProductsFromAPI(apiResponseArray);
 */

/**
 * Map single product from API response to contract format
 * @param {Object} apiProduct - Product data from API
 * @returns {Object} Product in contract format
 */
export const mapProductFromAPI = (apiProduct) => {
    if (!apiProduct) return null;

    // Handle both nested and flat API response structures
    const basic = apiProduct.basic || {
        name: apiProduct.name || apiProduct.product_name,
        shortDescription: apiProduct.short_description || apiProduct.shortDescription,
        description: apiProduct.description,
        brand: apiProduct.brand || 'Tohfae',
    };

    const media = apiProduct.media || {
        images: apiProduct.images || [],
        thumbnail: apiProduct.thumbnail || apiProduct.images?.[0] || '',
        videos: apiProduct.videos || [],
    };

    const pricing = apiProduct.pricing || {
        currency: apiProduct.currency || 'INR',
        basePrice: apiProduct.base_price || apiProduct.basePrice || apiProduct.price,
        sellingPrice: apiProduct.selling_price || apiProduct.sellingPrice || apiProduct.price,
        mrp: apiProduct.mrp,
        discount: apiProduct.discount ? {
            type: apiProduct.discount.type || 'percentage',
            value: apiProduct.discount.value || apiProduct.discount.percentage || apiProduct.discount_percentage || 0,
            label: apiProduct.discount.label || apiProduct.discount_label || null,
            amount: apiProduct.discount.amount || apiProduct.discount_amount || null,
        } : null,
        paymentOptions: apiProduct.paymentOptions || {},
        delivery: apiProduct.delivery || {},
        cod: apiProduct.cod || {},
        availablePaymentMethods: apiProduct.availablePaymentMethods || [],
    };

    const inventory = apiProduct.inventory || {
        inStock: apiProduct.in_stock ?? apiProduct.inStock ?? true,
        quantity: apiProduct.quantity || 0,
        reserved: apiProduct.reserved || 0,
        available: apiProduct.available || 0,
        lowStockThreshold: apiProduct.lowStockThreshold || 10,
        allowBackorder: apiProduct.allowBackorder || false,
    };

    const rating = apiProduct.rating || apiProduct.ratings || {
        average: apiProduct.rating_average || 0,
        count: apiProduct.rating_count || apiProduct.ratingCount || 0,
        distribution: apiProduct.rating_distribution || apiProduct.ratingDistribution || {},
    };

    return {
        id: apiProduct._id || apiProduct.id,
        slug: apiProduct.slug,
        sku: apiProduct.sku,

        basic,
        media,

        category: apiProduct.category,
        tags: apiProduct.tags || [],
        collections: apiProduct.collections || [],
        occasions: apiProduct.occasions || [],
        recipients: apiProduct.recipients || [],

        pricing,
        offers: apiProduct.offers || [],
        inventory,
        variants: apiProduct.variants || [],
        specifications: apiProduct.specifications || [],

        rating,

        customization: apiProduct.customization || {
            enabled: false,
            type: null,
            options: [],
        },

        shipping: apiProduct.shipping || {},
        policies: apiProduct.policies || {},

        seo: apiProduct.seo || {},

        status: apiProduct.status || 'draft',
        isActive: apiProduct.isActive ?? true,
        isFeatured: apiProduct.isFeatured ?? false,
        isPublished: apiProduct.isPublished ?? false,

        createdAt: apiProduct.createdAt || apiProduct.created_at,
        updatedAt: apiProduct.updatedAt || apiProduct.updated_at,
    };
};

/**
 * Map array of products from API response to contract format
 * @param {Array} apiProducts - Array of products from API
 * @returns {Array} Array of products in contract format
 */
export const mapProductsFromAPI = (apiProducts) => {
    if (!Array.isArray(apiProducts)) return [];
    return apiProducts.map(mapProductFromAPI).filter(Boolean);
};

/**
 * Map product from contract format to API request format
 * @param {Object} product - Product in contract format
 * @returns {Object} Product data for API request
 */
export const mapProductToAPI = (product) => {
    return {
        name: product.basic?.name,
        short_description: product.basic?.shortDescription,
        description: product.basic?.description,
        brand: product.basic?.brand,
        category: product.category,
        tags: product.tags,
        price: product.pricing?.sellingPrice,
        mrp: product.pricing?.mrp,
        base_price: product.pricing?.basePrice,
        images: product.media?.images,
        thumbnail: product.media?.thumbnail,
        variants: product.variants,
        customization: product.customization,
        shipping: product.shipping,
        seo: product.seo,
        is_active: product.status?.isActive,
        is_featured: product.status?.isFeatured,
        is_published: product.status?.isPublished,
    };
};

