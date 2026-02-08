/**
 * ProductImage Component (Molecule)
 * 
 * Product image with overlay badges:
 * - Discount badge
 * - Tag badge (bestseller, trending, etc.)
 * - Stock status badge
 * - Wishlist button
 * 
 * Props:
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {number} discountPercentage - Discount percentage (0 if no discount)
 * @param {string} primaryTag - Primary tag (bestseller, trending, etc.)
 * @param {boolean} inStock - Stock availability
 * @param {boolean} isWishlisted - Wishlist state
 * @param {function} onWishlistClick - Wishlist toggle handler
 * 
 * Usage:
 * <ProductImage
 *   src={product.media.thumbnail}
 *   alt={product.basic.name}
 *   discountPercentage={10}
 *   primaryTag="bestseller"
 *   inStock={true}
 *   isWishlisted={false}
 *   onWishlistClick={handleWishlist}
 * />
 */
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/shared/ui/badge';
import { Icon } from '@/shared/icons';
import Button from '@/shared/ui/button';

const ProductImage = ({
  src,
  alt,
  discountPercentage = 0,
  primaryTag,
  inStock = true,
  isWishlisted = false,
  onWishlistClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const hasDiscount = discountPercentage > 0;

  return (
    <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
      {/* Product Image */}
      <Image
        src={imageError ? '/placeholder-product.jpg' : (src || '/placeholder-product.jpg')}
        alt={alt || 'Product'}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        onError={() => setImageError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Top Badges Row */}
      <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
        {/* Discount Badge */}
        {hasDiscount && (
          <Badge color="danger" size="sm" radius="sm">
            -{discountPercentage}%
          </Badge>
        )}

        {/* Tag Badge */}
        {primaryTag && !hasDiscount && (
          <Badge color="primary" size="xs" radius="sm" className="uppercase">
            {primaryTag?.replace('-', ' ') || primaryTag}
          </Badge>
        )}

        {/* Wishlist Button */}
        {onWishlistClick && (
          <Button
            as="button"
            size="sm"
            variant="ghost"
            onClick={onWishlistClick}
            className="ml-auto p-2! rounded-full! bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-gray-800 min-w-0! h-auto!"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Icon
              name="heart"
              size={18}
              className={`transition-colors ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'
              }`}
            />
          </Button>
        )}
      </div>

      {/* Stock Status Badge */}
      {!inStock && (
        <div className="absolute bottom-2 left-2">
          <Badge color="danger" size="xs" radius="full">
            Out of Stock
          </Badge>
        </div>
      )}
    </div>
  );
};

export default ProductImage;

