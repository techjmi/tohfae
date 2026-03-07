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
import {
  STAR_CONFIG,
  STAR_ICONS,
  TAG_BADGE_COLORS,
  BADGE_CONFIG,
  LABELS,
  DEFAULTS,
  RATING_DECIMAL_PLACES
} from './ProductMainInfo.constants';
import './ProductMainInfo.css';

const ProductMainInfo = ({ product, className = '', ...props }) => {
  const rating = product?.rating?.average || DEFAULTS.RATING;
  const ratingCount = product?.rating?.count || DEFAULTS.RATING_COUNT;
  const category = product?.category || DEFAULTS.CATEGORY;
  const name = product?.basic?.name || DEFAULTS.NAME;
  const sku = product?.sku || DEFAULTS.SKU;
  const brand = product?.basic?.brand || DEFAULTS.BRAND;
  const tags = product?.tags || DEFAULTS.TAGS;

  // Render star rating - Dynamic, ready for API integration
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= STAR_CONFIG.HALF_STAR_THRESHOLD;

    for (let i = 0; i < STAR_CONFIG.MAX_STARS; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <Icon
            key={i}
            name={STAR_ICONS.FULL.name}
            size={STAR_CONFIG.ICON_SIZE}
            className={STAR_ICONS.FULL.className}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(
          <Icon
            key={i}
            name={STAR_ICONS.HALF.name}
            size={STAR_CONFIG.ICON_SIZE}
            className={STAR_ICONS.HALF.className}
          />
        );
      } else {
        // Empty star
        stars.push(
          <Icon
            key={i}
            name={STAR_ICONS.EMPTY.name}
            size={STAR_CONFIG.ICON_SIZE}
            className={STAR_ICONS.EMPTY.className}
          />
        );
      }
    }
    return stars;
  };

  // Get badge color for tag
  const getBadgeColor = (tag) => {
    return TAG_BADGE_COLORS[tag] || TAG_BADGE_COLORS.default;
  };

  return (
    <div className={`main-info-container ${className}`} {...props}>
      {/* Category */}
      {category && (
        <p className="category-text">
          {category}
        </p>
      )}

      {/* Product Name */}
      <h1 className="product-name">
        {name}
      </h1>

      {/* Rating & Reviews - Dynamic, API ready */}
      {rating > 0 && (
        <div className="rating-container">
          <div className="stars-wrapper">
            {renderStars(rating)}
          </div>
          <span className="rating-number">
            {rating.toFixed(RATING_DECIMAL_PLACES)}
          </span>
          {ratingCount > 0 && (
            <span className="rating-count">
              ({ratingCount} {ratingCount === 1 ? LABELS.REVIEW_SINGULAR : LABELS.REVIEW_PLURAL})
            </span>
          )}
        </div>
      )}

      {/* Tags/Badges */}
      {tags && tags.length > 0 && (
        <div className="tags-container">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              color={getBadgeColor(tag)}
              size={BADGE_CONFIG.SIZE}
              radius={BADGE_CONFIG.RADIUS}
              className="tag-badge"
            >
              {tag.replace('-', ' ')}
            </Badge>
          ))}
        </div>
      )}

      {/* SKU & Brand */}
      <div className="meta-info-container">
        {sku && (
          <div className="meta-info-item">
            <span className="meta-label">{LABELS.SKU}</span> {sku}
          </div>
        )}
        {brand && (
          <div className="meta-info-item">
            <span className="meta-label">{LABELS.BRAND}</span> {brand}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductMainInfo;

