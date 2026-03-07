/**
 * ProductCard Component (Organism)
 *
 * Composed product card using atomic design principles:
 * - ProductImage molecule (image with badges and wishlist)
 * - ProductInfo molecule (category, name, rating)
 * - ProductPrice molecule (pricing display)
 *
 * This component acts as a composition layer, orchestrating smaller molecules.
 *
 * Props:
 * @param {object} product - Product data object
 * @param {string} className - Additional CSS classes
 *
 * Usage:
 * <ProductCard product={product} />
 */
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardBody } from '@/shared/ui/card';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductPrice from './ProductPrice';

const ProductCard = ({ product, className = "" }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Handle wishlist toggle
  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // TODO: Add API call to update wishlist
  };

  return (
    <Link href={`/products/${product?.slug || '#'}`} className="block">
      <Card
        hoverable
        shadow="sm"
        className={`group overflow-hidden transition-all duration-300 ${className}`}
      >
        <CardBody padding="none">
          {/* Product Image with Badges */}
          <ProductImage
            src={product?.media?.thumbnail}
            alt={product?.basic?.name || 'Product'}
            discountPercentage={product?.pricing?.discount?.percentage || 0}
            primaryTag={product?.tags?.[0]}
            inStock={product?.inventory?.inStock ?? true}
            isWishlisted={isWishlisted}
            onWishlistClick={handleWishlistClick}
          />

          {/* Product Information Section */}
          <div className="p-4 space-y-3">
            {/* Product Info (Category, Name, Rating) */}
            <ProductInfo
              category={product?.category}
              name={product?.basic?.name || 'Product Name'}
              rating={product?.rating?.average}
              ratingCount={product?.rating?.count}
              shortDescription={product?.basic?.shortDescription}
            />

            {/* Product Price */}
            <ProductPrice
              sellingPrice={product?.pricing?.sellingPrice || 0}
              mrp={product?.pricing?.mrp}
              discountPercentage={product?.pricing?.discount?.percentage || 0}
              discountLabel={product?.pricing?.discount?.label}
            />
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ProductCard;
