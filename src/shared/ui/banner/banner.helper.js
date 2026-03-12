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

    const totalProducts = products.length;

    // Filter and sort active banners
    // 1. Filter out banners where startPosition > total products
    // 2. Sort by priority (higher priority first)
    const activeBanners = banners
        .filter(banner => {
            const { display } = banner;
            const startPos = display?.startPosition || 1;

            // Skip banners that start beyond available products
            if (startPos > totalProducts) {
                return false;
            }

            // Include banners with inline position or valid display rules
            const rule = display?.rule;
            const position = display?.position;

            return (
                position === 'inline' ||
                rule === BANNER_DISPLAY_RULE.INTERVAL ||
                rule === BANNER_DISPLAY_RULE.ONE_ROUND ||
                (display?.startPosition && display?.interval !== undefined)
            );
        })
        .sort((a, b) => {
            // Sort by priority (higher first)
            const priorityA = a.display?.priority || 0;
            const priorityB = b.display?.priority || 0;
            return priorityB - priorityA;
        });

    if (activeBanners.length === 0) {
        return products.map(product => ({
            type: 'product',
            data: product,
            id: product.id,
        }));
    }

    const result = [];
    const usedBanners = new Set(); // Track banners shown (for non-repeating banners)

    products.forEach((product, index) => {
        const position = index + 1; // 1-based position

        // Add product
        result.push({
            type: 'product',
            data: product,
            id: product.id,
        });

        // Collect all banners that should show at this position
        const bannersAtThisPosition = [];

        activeBanners.forEach((banner) => {
            const { display } = banner;
            const {
                rule,
                interval,
                startPosition,
                endPosition,
                repeat,
            } = display || {};

            // Skip if banner already used and not repeating
            if (usedBanners.has(banner.id)) {
                return;
            }

            // Determine if banner should show at this position
            let shouldShow = false;

            // Modern approach: using startPosition, interval, and repeat
            if (startPosition !== undefined && interval !== undefined) {
                if (repeat) {
                    // Repeating banner: show at startPosition + (interval * n)
                    if (position >= startPosition) {
                        const positionsSinceStart = position - startPosition;
                        if (positionsSinceStart % interval === 0) {
                            if (!endPosition || position <= endPosition) {
                                shouldShow = true;
                            }
                        }
                    }
                } else {
                    // Non-repeating banner: show only once at startPosition
                    if (position === startPosition) {
                        shouldShow = true;
                    }
                }
            }
            // Legacy support for rule-based display
            else if (rule === BANNER_DISPLAY_RULE.INTERVAL && interval) {
                if (position >= (startPosition || interval)) {
                    if (position % interval === 0) {
                        if (!endPosition || position <= endPosition) {
                            shouldShow = true;
                        }
                    }
                }
            } else if (rule === BANNER_DISPLAY_RULE.ONE_ROUND) {
                if (position === (startPosition || interval)) {
                    shouldShow = true;
                }
            }

            if (shouldShow) {
                bannersAtThisPosition.push(banner);
            }
        });

        // Add banners at this position (sorted by priority, already sorted above)
        bannersAtThisPosition.forEach((banner) => {
            result.push({
                type: 'banner',
                data: banner,
                id: `banner-${banner.id}-${position}`,
            });

            // Mark banner as used if not repeating
            const { display } = banner;
            const { repeat, rule } = display || {};

            if (!repeat || rule === BANNER_DISPLAY_RULE.ONE_ROUND) {
                usedBanners.add(banner.id);
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

