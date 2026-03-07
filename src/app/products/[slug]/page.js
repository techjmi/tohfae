/*
 * Product Details Page
 *
 * Server-side rendering for product details
 * Fetches product data by slug and displays details
 * SEO metadata generation from product contract data
 */
import { buildSeo } from '@/lib/seo/seo';
import React from 'react';
import { PRODUCT_DATA } from '@/contract/product.contract';
import ProductsDetails from './ProductsDetails';
import { Navigation_Url, website_name } from '@/shared/constant/global-constant';
import { notFound } from 'next/navigation';
import { ProductService } from '@/services/product/product.service';

/**
 * Generate SEO metadata for product details page
 */
export const generateMetadata = async ({ params }) => {
  // API will be added later, for now using static data
  const { slug } = await params;
  const product = await ProductService.getBySlug(slug);

  // If product not found, return default metadata
  if (!product) {
    return buildSeo({
      title: `Product Not Found | ${website_name}`,
      description: 'The product you are looking for could not be found.',
      noindex: true,
    });
  }

  // Build SEO metadata from product data with optional chaining
  return buildSeo({
    title: product?.seo?.metaTitle || product?.basic?.name || 'Product Details',
    description: product?.seo?.metaDescription || product?.basic?.shortDescription || product?.basic?.description || '',
    keywords: product?.seo?.keywords || [],
    canonical: `${Navigation_Url.PRODUCTS}/${product?.slug}`,
    image: product?.seo?.ogImage || product?.media?.thumbnail || product?.media?.images?.[0] || '',
    ogType: 'website',
    author:website_name,
    // Additional product-specific metadata
    openGraph: {
      type: 'website',
      title: product?.basic?.name || '',
      description: product?.basic?.shortDescription || '',
      images: [
        {
          url: product?.media?.thumbnail || product?.media?.images?.[0] || '',
          width: 1200,
          height: 630,
          alt: product?.basic?.name || 'Product Image',
        },
      ],
      siteName: website_name,
    },
    twitter: {
      card: 'summary_large_image',
      title: product?.basic?.name || '',
      description: product?.basic?.shortDescription || '',
      images: [product?.media?.thumbnail || product?.media?.images?.[0] || ''],
    },
    // Product schema for rich snippets
    other: {
      'product:price:amount': product?.pricing?.sellingPrice || 0,
      'product:price:currency': product?.pricing?.currency || 'INR',
      'product:availability': product?.inventory?.inStock ? 'in stock' : 'out of stock',
      'product:brand': product?.basic?.brand || `${website_name}`,
      'product:category': product?.category || '',
    },
  });
};

/**
 * Product Details Page Component
 * Fetches product by slug and passes to client component
 */
const ProductDetailsPage = async ({ params }) => {
  const { slug } = await params;

  // Fetch product from contract (later will be API call)
  const product = await ProductService.getBySlug(slug);

  // If product not found, show 404
  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductsDetails product={product} />
    </>
  );
};

export default ProductDetailsPage;