/**
 * Search Helper Functions
 * Utility functions for search page
 */

/**
 * Sanitize search query to prevent XSS and injection attacks
 *
 * @param {string} query - Raw search query from user input
 * @returns {string} - Sanitized search query
 *
 * Security features:
 * - Removes HTML tags to prevent XSS
 * - Strips special characters to prevent injection
 * - Limits length to prevent DoS
 * - Validates input type
 */
export const sanitizeSearchQuery = (query) => {
    if (!query || typeof query !== 'string') return '';

    return query
        .trim()
        .replace(/[<>]/g, '')        // Remove < and > to prevent XSS
        .replace(/[^\w\s-]/g, '')    // Only allow alphanumeric, spaces, hyphens
        .slice(0, 100);              // Limit length to prevent abuse
};

/**
 * Extract search query from search params
 * Supports multiple query parameter names (search, q, query)
 *
 * @param {Object} params - Search params object
 * @returns {string} - Sanitized search query
 */
export const getSearchQuery = (params) => {
    const rawSearch = params.search || params.q || params.query || '';
    return sanitizeSearchQuery(rawSearch);
};

/**
 * Build search filters from search params
 *
 * @param {Object} params - Search params object
 * @returns {Object} - Filter object for API
 */
export const buildSearchFilters = (params) => {
    console.log('1234 buildSearchFilters', params);
    const filters = {};

    if (params.category) {
        filters.category = sanitizeSearchQuery(params.category);
    }

    if (params.minPrice) {
        const price = parseInt(params.minPrice, 10);
        if (!isNaN(price) && price >= 0) {
            filters.minPrice = price;
        }
    }

    if (params.maxPrice) {
        const price = parseInt(params.maxPrice, 10);
        if (!isNaN(price) && price >= 0) {
            filters.maxPrice = price;
        }
    }

    if (params.sort) {
        const allowedSorts = ['newest', 'oldest', 'price-asc', 'price-desc', 'popular'];
        if (allowedSorts.includes(params.sort)) {
            filters.sort = params.sort;
        }
    }

    return filters;
};
