/*
 * Best Seller Section Constants
 *
 * All constants related to best seller section
 */
export const BEST_SELLER_API_PARAMS = {
    limit: 10,
    offset: 0,
    sort: 'sales_desc',
    filter: 'best_seller',
};
export const BEST_SELLER_SECTION_CONFIG = {
    header: 'Best Sellers',
    subHeader: 'Check out our most selling products',
    viewAllLabel: 'View All Best Sellers',
    viewAllLink: '/products?filter=best_seller',
};
