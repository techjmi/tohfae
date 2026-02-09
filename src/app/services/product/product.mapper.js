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

    return {
        id: apiProduct.id,
        slug: apiProduct.slug,
        sku: apiProduct.sku,
        
        basic: {
            name: apiProduct.name || apiProduct.product_name,
            shortDescription: apiProduct.short_description || apiProduct.shortDescription,
            description: apiProduct.description,
            brand: apiProduct.brand || 'Tohfae',
        },

        media: {
            images: apiProduct.images || [],
            thumbnail: apiProduct.thumbnail || apiProduct.images?.[0] || '',
            videos: apiProduct.videos || [],
        },

        category: apiProduct.category,
        tags: apiProduct.tags || [],
        collections: apiProduct.collections || [],

        pricing: {
            currency: apiProduct.currency || 'INR',
            basePrice: apiProduct.base_price || apiProduct.basePrice || apiProduct.price,
            sellingPrice: apiProduct.selling_price || apiProduct.sellingPrice || apiProduct.price,
            mrp: apiProduct.mrp,
            discount: apiProduct.discount || null,
        },

        variants: apiProduct.variants || [],
        
        rating: {
            average: apiProduct.rating || apiProduct.rating_average || 0,
            count: apiProduct.rating_count || apiProduct.ratingCount || 0,
            distribution: apiProduct.rating_distribution || apiProduct.ratingDistribution || {},
        },

        customization: apiProduct.customization || [],
        
        shipping: apiProduct.shipping || {},
        
        seo: apiProduct.seo || {},
        
        status: {
            isActive: apiProduct.is_active ?? apiProduct.isActive ?? true,
            isFeatured: apiProduct.is_featured ?? apiProduct.isFeatured ?? false,
            isPublished: apiProduct.is_published ?? apiProduct.isPublished ?? true,
        },

        createdAt: apiProduct.created_at || apiProduct.createdAt,
        updatedAt: apiProduct.updated_at || apiProduct.updatedAt,
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

