/**
 * ProductInfo Component (Molecule)
 * 
 * Product information display:
 * - Category
 * - Product name
 * - Rating with count
 * - Short description
 * 
 * Props:
 * @param {string} category - Product category
 * @param {string} name - Product name
 * @param {number} rating - Average rating (0-5)
 * @param {number} ratingCount - Number of ratings
 * @param {string} shortDescription - Short product description
 * @param {string} className - Additional CSS classes
 * 
 * Usage:
 * <ProductInfo
 *   category="tshirt"
 *   name="Custom Printed T-Shirt"
 *   rating={4.5}
 *   ratingCount={120}
 *   shortDescription="Premium cotton customizable t-shirt"
 * />
 */
import React from 'react';
import { Icon } from '@/shared/icons';

const ProductInfo = ({
  category,
  name,
  rating = 0,
  ratingCount = 0,
  shortDescription,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Category */}
      {category && (
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {category}
        </p>
      )}

      {/* Product Name */}
      <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 min-h-10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {name || 'Product Name'}
      </h3>

      {/* Rating */}
      {rating > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Icon name="heart" size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {rating?.toFixed(1) || '0.0'}
            </span>
          </div>
          {ratingCount > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({ratingCount})
            </span>
          )}
        </div>
      )}

      {/* Short Description */}
      {shortDescription && (
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
          {shortDescription}
        </p>
      )}
    </div>
  );
};

export default ProductInfo;

