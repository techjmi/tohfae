/**
 * Search Page
 *
 * Server-side rendered search page
 * Fetches search results from API and passes to client component
 *
 * Features:
 * - SSR for better SEO
 * - Rich structured data (JSON-LD)
 * - Comprehensive metadata
 * - Error handling
 */
import { buildSeo } from '@/lib/seo/seo';
import { SEARCH_PAGE_SEO } from './search.constant';
import { SearchClient } from './SearchClient';
import { ProductService } from '@/services/product/product.service';
import { getSearchQuery, buildSearchFilters } from './search.helper';

export const generateMetadata = async () => {
    return buildSeo({
        title: SEARCH_PAGE_SEO.title,
        description: SEARCH_PAGE_SEO.description,
        keywords: SEARCH_PAGE_SEO.keywords,
        canonical: SEARCH_PAGE_SEO.canonical,
        image: SEARCH_PAGE_SEO.image,
        ogType: SEARCH_PAGE_SEO.type,
        author: SEARCH_PAGE_SEO.author,
    });
}
/**
 * seach page api call
 */
const getSearchData = async () => {
    try {
        const response = await ProductService.getAll();
        return response;
    } catch (error) {
        console.error('Failed to fetch search data:', error);
        return [];
    }
}
const page = async ({searchParams}) => {
    const params = await searchParams;
    const search = getSearchQuery(params);
    const filters = buildSearchFilters(search);
    console.log('1234search', search);

    const initialProducts = await getSearchData({ filters });
    console.log('1234initialProducts search page', initialProducts);
    return(
        <div>
            <SearchClient initialProducts={initialProducts} searchQuery={search} />
            
        </div>
    )
}
export default page;