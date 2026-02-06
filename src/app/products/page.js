/**
 * Products Page
 *
 * Product listing page with filtering and sorting
 *
 * Features:
 * - Product grid with cards
 * - Category filtering (separate component)
 * - Price range slider (separate component)
 * - Sort by options (price, rating, popularity)
 * - Infinite scrolling or pagination (separate component)
 * - Responsive design
 *
 * Uses:
 * - Product contract for data
 * - Product card component for display
 * - Product banner component for hero section
 * - Custom hooks for filters, sort, search, pagination
 */

import { SEO_CONSTANT, JSON_LD_CONSTANT } from '@/app/features/products/products.constant';
import { buildSeo } from '@/lib/seo/seo';
import JsonLd from '@/shared/ui/jsonld';

/**
 * Generate metadata for SEO
 * Includes Open Graph, Twitter Card, and canonical URL
 */
export const generateMetadata = async () => {
    return buildSeo({
        title: SEO_CONSTANT.title,
        description: SEO_CONSTANT.description,
        keywords: SEO_CONSTANT.keywords,
        canonical: SEO_CONSTANT.canonical,
        image: SEO_CONSTANT.image,
        ogType: SEO_CONSTANT.type,
        author: SEO_CONSTANT.author,
    });
};

/**
 * Products Page Component
 * Server component for better SEO and performance
 */
const ProductsPage = () => {
    return (
        <>
            {/* JSON-LD Structured Data for SEO */}
            <JsonLd data={JSON_LD_CONSTANT} />

            {/* Main Content */}
            <main className="min-h-screen">
                <h1 className="sr-only">
                    Shop Personalized Gifts - Custom T-Shirts, Mugs, Frames, and More
                </h1>

                {/* TODO: Add ProductBanner component */}
                {/* TODO: Add ProductFilters component */}
                {/* TODO: Add ProductGrid component */}
                {/* TODO: Add ProductPagination component */}

                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Browse Our Products
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Discover personalized gifts for every occasion
                    </p>
                </div>
            </main>
        </>
    );
};

export default ProductsPage;
