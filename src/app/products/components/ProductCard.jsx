"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardImage, CardHeader, CardMeta, CardPrice } from '@/shared/ui/card';

const ProductCard = ({ product, className = "" }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const badges = [];
  const discountPercentage = product?.pricing?.discount?.value || 0;
  const discountLabel = product?.pricing?.discount?.label || null;
  // if (discountPercentage > 0) {
  //   badges.push({
  //     label: `-${discountPercentage}%`,
  //     color: 'danger',
  //     size: 'sm'
  //   });
  // }

  const primaryTag = product?.tags?.[0];
  if (primaryTag) {
    badges.push({
      value:null,
      label: primaryTag.replace('-', ' ').toUpperCase(),
      color: 'primary',
      size: 'xs'
    });
  }

  const inStock = product?.inventory?.inStock ?? true;
  if (!inStock) {
    badges.push({
      value:null,
      label: 'Out of Stock',
      color: 'danger',
      size: 'xs'
    });
  }

  return (
    <Link href={`/products/${product?.slug || '#'}`} className="block h-full">
      <Card
        hoverable
        shadow="sm"
        padding="none"
        className={`group overflow-hidden transition-all duration-300 h-full flex flex-col ${className}`}
      >
        <CardImage
          src={product?.media?.thumbnail}
          alt={product?.basic?.name || 'Product'}
          badges={badges}
          aspectRatio="1/1"
          wishlist={true}
          product={{
            id: product?.id,
            slug: product?.slug,
            name: product?.basic?.name,
            image: product?.media?.thumbnail,
            price: product?.pricing?.sellingPrice,
            mrp: product?.pricing?.mrp,
            discountLabel: discountPercentage?discountLabel:null
          }}
        />

        <div className="p-4 space-y-2 flex-1 flex flex-col">
          <CardHeader
            title={product?.basic?.name || 'Product Name'}
            subtitle={product?.category}
            titleClassName="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors"
            subtitleClassName="text-xs text-gray-500 uppercase tracking-wide"
          />

          <div className="flex-1">
            {product?.rating?.average > 0 && (
              <CardMeta
                rating={product.rating.average.toFixed(1)}
                reviews={product.rating.count}
              />
            )}
          </div>

          <CardPrice
            price={product?.pricing?.sellingPrice || 0}
            originalPrice={product?.pricing?.mrp}
            discount={discountPercentage}
            discountLabel={discountLabel}
            currency="₹"
            priceSize="xl"
          />
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
