/*
 * New Arrival Section Constants
 *
 * All constants related to new arrival section
 */
export const NEW_ARRIVAL_API_PARAMS = {
    tags: 'new-arrival',
    status: 'active',  // Only show active/published products
    limit: 8,
    sort: 'newest'
};

export const NEW_ARRIVAL_SECTION_CONFIG = {
    header: 'New Arrivals',
    subHeader: 'Check out our latest products',
    viewAllLabel: 'View All',
    viewAllLink: '/products?tags=new-arrival',
};
