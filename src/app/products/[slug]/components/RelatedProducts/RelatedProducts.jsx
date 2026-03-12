"use client";

import React from 'react';
import ProductCard from '@/app/products/components/ProductCard';
import Carousel from '@/shared/ui/carousel';
import { DEFAULT_TITLE, CAROUSEL_CONFIG, CSS_CLASSES } from './RelatedProducts.constants';
import './RelatedProducts.css';

const RelatedProducts = ({ products = [], title = DEFAULT_TITLE, className = '' }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={`related-products-container ${className}`}>
      <h2 className="related-products-title">{title}</h2>

      <Carousel
        showArrows={products.length > CAROUSEL_CONFIG.MIN_PRODUCTS_FOR_ARROWS}
        showDots={CAROUSEL_CONFIG.DOTS}
        loop={products.length > CAROUSEL_CONFIG.MIN_PRODUCTS_FOR_LOOP}
        autoplay={CAROUSEL_CONFIG.AUTOPLAY}
        slidesToShow={CAROUSEL_CONFIG.SLIDES_PER_VIEW}
        className={CSS_CLASSES.CAROUSEL}
      >
        {products.map((product, index) => (
          <div key={product.id || index} className={CSS_CLASSES.PRODUCT_WRAPPER}>
            <ProductCard product={product} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default RelatedProducts;

