/**
 * Search Page Constants
 *
 * Constants for search page
 */
import { Navigation_Url, website_name, main_url, site_image } from '@/shared/constant/global-constant';
export const SEARCH_PAGE_CONFIG = {
    title: 'Search Results for',
    description: 'Search for products, categories, design, customization...',
    noResult: 'No Result Found',
    labels: {
        search: 'Search',
    },
    searchTerm: 'Search Term',
};
 export const SEARCH_PAGE_SEO = {
    title: `Search Results for ${SEARCH_PAGE_CONFIG.searchTerm} | ${website_name}`,
    description: `Search for products, categories, design, customization...`,
    keywords: [`${website_name}`, 'search', 'products', 'categories', 'design', 'customization'],
    canonical: `${main_url}${Navigation_Url.SEARCH}`,
    type: 'website',
    author: website_name,
    image: site_image,
};