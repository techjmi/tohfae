/**
 * ProductMainInfo Component (Molecule)
 *
 * Main product information section:
 * - Product name
 * - Category
 * - Rating with reviews
 * - SKU
 * - Brand
 * - Tags/Badges
 *
 * Props:
 * @param {Object} product - Product data object
 * @param {string} className - Additional CSS classes
 *
 * Usage:
 * <ProductMainInfo product={product} />
 */
"use client";

import React from 'react';
import { Icon } from '@/shared/icons';
import Badge from '@/shared/ui/badge/Badge';

const ProductMainInfo = ({ product, className = '', ...props }) => {
  const rating = product?.rating?.average || 0;
  const ratingCount = product?.rating?.count || 0;
  const category = product?.category || '';
  const name = product?.basic?.name || 'Product Name';
  const sku = product?.sku || '';
  const brand = product?.basic?.brand || '';
  const tags = product?.tags || [];

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <Icon
            key={i}
            name="star"
            size={20}
            className="text-yellow-500 fill-yellow-500"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(
          <Icon
            key={i}
            name="starHalf"
            size={20}
            className="text-yellow-500 fill-yellow-500"
          />
        );
      } else {
        // Empty star
        stars.push(
          <Icon
            key={i}
            name="starBorder"
            size={20}
            className="text-gray-300"
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {/* Category */}
      {category && (
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          {category}
        </p>
      )}

      {/* Product Name */}
      <h1 className="text-3xl font-bold text-gray-900">
        {name}
      </h1>

      {/* Rating & Reviews */}
      {rating > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {renderStars(rating)}
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {rating.toFixed(1)}
          </span>
          {ratingCount > 0 && (
            <span className="text-sm text-gray-500">
              ({ratingCount} {ratingCount === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </div>
      )}

      {/* Tags/Badges */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              color={tag === 'bestseller' ? 'success' : tag === 'trending' ? 'primary' : 'neutral'}
              size="sm"
              radius="sm"
              className="uppercase"
            >
              {tag.replace('-', ' ')}
            </Badge>
          ))}
        </div>
      )}

      {/* SKU & Brand */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        {sku && (
          <div>
            <span className="font-medium">SKU:</span> {sku}
          </div>
        )}
        {brand && (
          <div>
            <span className="font-medium">Brand:</span> {brand}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductMainInfo;

