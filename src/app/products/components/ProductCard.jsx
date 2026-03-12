"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardImage, CardHeader, CardMeta, CardPrice } from '@/shared/ui/card';

const ProductCard = ({ product, className = "" }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const badges = [];
  const discountPercentage = product?.pricing?.discount?.percentage || 0;

  if (discountPercentage > 0) {
    badges.push({
      label: `-${discountPercentage}%`,
      color: 'danger',
      size: 'sm'
    });
  }

  const primaryTag = product?.tags?.[0];
  if (primaryTag && !discountPercentage) {
    badges.push({
      label: primaryTag.replace('-', ' ').toUpperCase(),
      color: 'primary',
      size: 'xs'
    });
  }

  const inStock = product?.inventory?.inStock ?? true;
  if (!inStock) {
    badges.push({
      label: 'Out of Stock',
      color: 'danger',
      size: 'xs'
    });
  }

  return (
    <Link href={`/products/${product?.slug || '#'}`} className="block">
      <Card
        hoverable
        shadow="sm"
        padding="none"
        className={`group overflow-hidden transition-all duration-300 ${className}`}
      >
        <CardImage
          src={product?.media?.thumbnail}
          alt={product?.basic?.name || 'Product'}
          badges={badges}
          aspectRatio="1/1"
          wishlist={true}
          isWishlisted={isWishlisted}
          onWishlistClick={handleWishlistClick}
        />

        <div className="p-4 space-y-2">
          <CardHeader
            title={product?.basic?.name || 'Product Name'}
            subtitle={product?.category}
            titleClassName="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors"
            subtitleClassName="text-xs text-gray-500 uppercase tracking-wide"
          />

          {product?.rating?.average > 0 && (
            <CardMeta
              rating={product.rating.average.toFixed(1)}
              reviews={product.rating.count}
            />
          )}

          <CardPrice
            price={product?.pricing?.sellingPrice || 0}
            originalPrice={product?.pricing?.mrp}
            discount={discountPercentage}
            discountLabel={product?.pricing?.discount?.label}
            currency="₹"
            priceSize="xl"
          />
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
