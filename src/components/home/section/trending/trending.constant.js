/*
 * Trending Section Constants
 *
 * All constants related to trending section
 */
export const TRENDING_API_PARAMS = {
    limit: 10,
    offset: 0,
    sort: 'popularity',
    filter: 'trending',
};
export const TRENDING_SECTION_CONFIG = {
    header: 'Trending Products',
    subHeader: 'Check out our most popular products',
    viewAllLabel: 'View All Trending Products',
    viewAllLink: '/products?filter=trending',
};
