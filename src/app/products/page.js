/**
 * Products Page
 *
 * Server-side rendered products listing page
 * Fetches products from API and passes to client component
 *
 * Features:
 * - SSR for better SEO
 * - Rich structured data (JSON-LD)
 * - Comprehensive metadata
 * - Error handling
 */

import { buildSeo } from '@/lib/seo/seo';
import JsonLd from '@/shared/ui/jsonld';
import ProductsClient from './ProductsClient';
import { ProductService } from '@/services/product/product.service';
import { BannerService } from '@/services/banner';
import { PRODUCTS_SEO, PRODUCTS_TEXT } from './products.helper';

/**
 * Generate metadata for SEO
 */
export const generateMetadata = async () => {
  return buildSeo({
    title: PRODUCTS_SEO.title,
    description: PRODUCTS_SEO.description,
    keywords: PRODUCTS_SEO.keywords,
    canonical: PRODUCTS_SEO.canonical,
    image: PRODUCTS_SEO.image,
    ogType: PRODUCTS_SEO.type,
    author: PRODUCTS_SEO.author,
    noindex: PRODUCTS_SEO.noindex,
  });
};

/**
 * Fetch products data on server side
 */
async function getProductsData() {
  try {
    const products = await ProductService.getAll();
    return products || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

/**
 * Fetch banners data on server side
 */
async function getBannersData() {
  try {
    const banners = await BannerService.getActiveBanners({
      page: 'products',
      position: 'inline'
    });
    return banners || [];
  } catch (error) {
    console.error('Failed to fetch banners:', error);
    return [];
  }
}

/**
 * Products Page Component
 */
const ProductsPage = async () => {
  const [products, banners] = await Promise.all([
    getProductsData(),
    getBannersData()
  ]);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <JsonLd data={PRODUCTS_SEO.jsonLd} />

      {/* Main Content */}
      <main className="min-h-screen">
        {/* Hidden heading for accessibility and SEO */}
        <h1 className="sr-only">
          {PRODUCTS_TEXT.PAGE_TITLE} - {PRODUCTS_TEXT.PAGE_SUBTITLE}
        </h1>

        {/* Client-side wrapper with state management */}
        <ProductsClient products={products} banners={banners} />
      </main>
    </>
  );
};

export default ProductsPage;
