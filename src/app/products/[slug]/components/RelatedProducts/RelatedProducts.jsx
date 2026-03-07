/**
 * RelatedProducts Component (Organism)
 *
 * Related/Similar products section:
 * - Shows similar products
 * - Uses ProductCard component
 * - Horizontal scrollable or grid layout
 *
 * Props:
 * @param {Array} products - Array of related products
 * @param {string} title - Section title
 * @param {string} className - Additional CSS classes
 *
 * Usage:
 * <RelatedProducts products={relatedProducts} title="You May Also Like" />
 */
"use client";

import React from 'react';
import ProductCard from '@/app/products/components/ProductCard';
import Carousel from '@/shared/utils/carousel';
import { DEFAULT_TITLE, CAROUSEL_CONFIG, CSS_CLASSES } from './RelatedProducts.constants';
import './RelatedProducts.css';

const RelatedProducts = ({ products = [], title = DEFAULT_TITLE, className = '' }) => {
  if (!products || products.length === 0) {
    return null;
  }

  // Create carousel items from products
  const carouselItems = products.map((product, index) => (
    <div key={product.id || index} className={CSS_CLASSES.PRODUCT_WRAPPER}>
      <ProductCard product={product} />
    </div>
  ));

  return (
    <div className={`related-products-container ${className}`}>
      <h2 className="related-products-title">{title}</h2>

      {/* Carousel for Related Products - Dynamic data from API */}
      <Carousel
        items={carouselItems}
        slidesPerView={CAROUSEL_CONFIG.SLIDES_PER_VIEW}
        spaceBetween={CAROUSEL_CONFIG.SPACE_BETWEEN}
        loop={products.length > CAROUSEL_CONFIG.MIN_PRODUCTS_FOR_LOOP}
        arrows={products.length > CAROUSEL_CONFIG.MIN_PRODUCTS_FOR_ARROWS}
        dots={CAROUSEL_CONFIG.DOTS}
        autoplay={CAROUSEL_CONFIG.AUTOPLAY}
        height={CAROUSEL_CONFIG.HEIGHT}
        className={CSS_CLASSES.CAROUSEL}
      />
    </div>
  );
};

export default RelatedProducts;

