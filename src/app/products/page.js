//Products Page
import { SEO_CONSTANT, JSON_LD_CONSTANT } from '@/app/features/products/products.constant';
import { buildSeo } from '@/lib/seo/seo';
import JsonLd from '@/shared/ui/jsonld';
import ProductsClient from './ProductsClient';
import { PRODUCTS } from '@/app/features/products/products.constant';
// SEO for products page
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

const ProductsPage = () => {
    return (
        <>
            {/* JSON-LD Structured Data for SEO */}
            <JsonLd data={JSON_LD_CONSTANT} />

            {/* Main Content */}
            <main className="min-h-screen">
                {/* Hidden heading for accessibility and SEO */}
                <h1 className="sr-only">
                    Shop Personalized Gifts - Custom T-Shirts, Mugs, Frames, and More
                </h1>

                {/* Client-side wrapper with state management */}
                <ProductsClient products={PRODUCTS} />
            </main>
        </>
    );
};

export default ProductsPage;
