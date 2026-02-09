/**
 * Banner Helper Functions
 * 
 * Utilities for working with banners in product lists
 */

import { BANNER_DISPLAY_RULE } from '@/contract/banner.contract';

/**
 * Insert banners into a product list based on banner display rules
 * 
 * @param {Array} products - Array of products
 * @param {Array} banners - Array of banner objects from contract
 * @returns {Array} Combined array of products and banners with proper positioning
 * 
 * @example
 * const items = insertBannersIntoList(products, banners);
 * items.forEach(item => {
 *   if (item.type === 'banner') {
 *     return <Banner banner={item.data} />;
 *   }
 *   return <ProductCard product={item.data} />;
 * });
 */
export function insertBannersIntoList(products, banners) {
    if (!products || !banners || banners.length === 0) {
        return products.map(product => ({
            type: 'product',
            data: product,
            id: product.id,
        }));
    }

    // Filter active banners with INLINE or INTERVAL display rules
    const activeBanners = banners.filter(banner => {
        const rule = banner.display?.rule;
        return (
            rule === BANNER_DISPLAY_RULE.INTERVAL ||
            rule === BANNER_DISPLAY_RULE.ONE_ROUND
        );
    });

    if (activeBanners.length === 0) {
        return products.map(product => ({
            type: 'product',
            data: product,
            id: product.id,
        }));
    }

    const result = [];
    const usedBanners = new Set(); // Track banners shown (for ONE_ROUND rule)

    products.forEach((product, index) => {
        const position = index + 1; // 1-based position

        // Add product
        result.push({
            type: 'product',
            data: product,
            id: product.id,
        });

        // Check if any banner should be inserted after this position
        activeBanners.forEach((banner, bannerIndex) => {
            const { display } = banner;
            const {
                rule,
                interval,
                startPosition,
                endPosition,
                repeat,
            } = display;

            // Skip if banner already shown and rule is ONE_ROUND
            if (rule === BANNER_DISPLAY_RULE.ONE_ROUND && usedBanners.has(banner.id)) {
                return;
            }

            // Check if banner should be shown at this position
            let shouldShow = false;

            if (rule === BANNER_DISPLAY_RULE.INTERVAL && interval) {
                // Show at intervals (e.g., every 6 products)
                if (position >= (startPosition || interval)) {
                    if (position % interval === 0) {
                        // Check if within endPosition range
                        if (!endPosition || position <= endPosition) {
                            shouldShow = true;
                        }
                    }
                }
            } else if (rule === BANNER_DISPLAY_RULE.ONE_ROUND) {
                // Show once at specific position
                if (position === (startPosition || interval)) {
                    shouldShow = true;
                }
            }

            if (shouldShow) {
                result.push({
                    type: 'banner',
                    data: banner,
                    id: `banner-${banner.id}-${position}`,
                });

                // Mark banner as used if ONE_ROUND
                if (rule === BANNER_DISPLAY_RULE.ONE_ROUND) {
                    usedBanners.add(banner.id);
                }
            }
        });
    });

    return result;
}

/**
 * Get banners for a specific page
 * 
 * @param {Array} banners - Array of all banners
 * @param {string} page - Page identifier (e.g., 'products', 'home')
 * @returns {Array} Filtered banners for the page
 */
export function getBannersForPage(banners, page) {
    return banners.filter(banner => {
        const targetPages = banner.targeting?.pages || [];
        return targetPages.includes(page) || targetPages.includes('all');
    });
}

/**
 * Check if banner should be displayed based on scheduling
 * 
 * @param {Object} banner - Banner object
 * @returns {boolean} True if banner should be displayed
 */
export function isBannerActive(banner) {
    const now = new Date();
    const { scheduling } = banner;

    if (!scheduling) return true;

    // Check date range
    if (scheduling.startDate && new Date(scheduling.startDate) > now) {
        return false;
    }
    if (scheduling.endDate && new Date(scheduling.endDate) < now) {
        return false;
    }

    // Check day of week
    if (scheduling.daysOfWeek && scheduling.daysOfWeek.length > 0) {
        const currentDay = now.getDay();
        if (!scheduling.daysOfWeek.includes(currentDay)) {
            return false;
        }
    }

    return true;
}

