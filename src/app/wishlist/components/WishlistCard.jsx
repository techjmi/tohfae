/**
 * Wishlist card component
 */
"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardImage, CardHeader, CardPrice } from '@/shared/ui/card';
import AddToCartButton from '@/shared/ui/cart/AddToCartButton';

const WishlistCard = ({ item, className = "" }) => {
  const badges = [];

  if (item.discountLabel) {
    badges.push({
      value:null,
      label: item.discountLabel,
      color: 'danger',
      size: 'sm'
    });
  }

  return (
    <Link href={`/products/${item.slug || '#'}`} className="block h-full">
      <Card
        hoverable
        shadow="sm"
        padding="none"
        className={`group overflow-hidden transition-all duration-300 h-full flex flex-col ${className}`}
      >
        <CardImage
          src={item.image}
          alt={item.name || 'Product'}
          badges={badges}
          aspectRatio="1/1"
          wishlist={true}
          wishlistIconName="trash"
          product={item}
        />

        <div className="p-4 space-y-3 flex-1 flex flex-col">
          <CardHeader
            title={item.name || 'Product Name'}
            titleClassName="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors"
          />

          <div className="flex-1" />

          <CardPrice
            price={item.price || 0}
            originalPrice={item.mrp}
            discount={item.discount}
            currency="₹"
            priceSize="xl"
          />

          {/* Add to Cart Button */}
          <AddToCartButton
            productId={item.id}
            variant="outline"
            color="primary"
            size="sm"
            className="flex justify-between gap-5 stretch"
          >
            Add to Cart
          </AddToCartButton>
        </div>
      </Card>
    </Link>
  );
};

export default WishlistCard;
