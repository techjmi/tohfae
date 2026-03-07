/**
 * ProductReviews Component (Molecule)
 *
 * Product reviews section:
 * - Overall rating summary
 * - Rating distribution chart
 * - Individual reviews list
 * - Review filters (rating, verified purchase, etc.)
 * - Write review button
 *
 * Props:
 * @param {Object} rating - Product rating object
 * @param {string} productId - Product ID for fetching reviews
 * @param {string} className - Additional CSS classes
 *
 * Usage:
 * <ProductReviews rating={product.rating} productId={product.id} />
 */
"use client";

import React from 'react';
import { Icon } from '@/shared/icons';
import Button from '@/shared/ui/button/Button';
import {
  STAR_CONFIG,
  STAR_ICONS,
  RATING_STARS,
  WRITE_REVIEW_BUTTON,
  LABELS,
  DEFAULTS,
  RATING_DECIMAL_PLACES,
} from './ProductReviews.constants';
import './ProductReviews.css';

const ProductReviews = ({ rating, productId, className = '' }) => {
  if (!rating) return null;

  const average = rating.average || DEFAULTS.AVERAGE;
  const count = rating.count || DEFAULTS.COUNT;
  const distribution = rating.distribution || DEFAULTS.DISTRIBUTION;

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= STAR_CONFIG.HALF_STAR_THRESHOLD;

    for (let i = 1; i <= STAR_CONFIG.MAX_STARS; i++) {
      if (i <= fullStars) {
        stars.push(
          <Icon
            key={i}
            name={STAR_ICONS.FULL.name}
            size={STAR_CONFIG.ICON_SIZE}
            className={STAR_ICONS.FULL.className}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Icon
            key={i}
            name={STAR_ICONS.HALF.name}
            size={STAR_CONFIG.ICON_SIZE}
            className={STAR_ICONS.HALF.className}
          />
        );
      } else {
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

  // Calculate percentage for rating distribution
  const getPercentage = (ratingCount) => {
    if (count === 0) return 0;
    return Math.round((ratingCount / count) * 100);
  };

  // Handle write review button click
  const handleWriteReview = () => {
    // TODO: Implement write review logic (modal, navigation, etc.)
    console.log('Write review for product:', productId);
  };

  return (
    <div className={`reviews-container ${className}`}>
      <h2 className="reviews-title">{LABELS.TITLE}</h2>

      <div className="reviews-grid">
        {/* Rating Summary */}
        <div className="rating-summary">
          <div className="rating-display">
            <span className="rating-number">{average.toFixed(RATING_DECIMAL_PLACES)}</span>
            <div className="rating-details">
              <div className="stars-container">{renderStars(average)}</div>
              <span className="reviews-count">{count} {LABELS.REVIEWS_COUNT}</span>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="distribution-container">
          {RATING_STARS.map((star) => {
            const starCount = distribution[star] || 0;
            const percentage = getPercentage(starCount);

            return (
              <div key={star} className="distribution-row">
                <span className="star-label">{star} {LABELS.STAR_SYMBOL}</span>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="percentage-label">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Write Review Button */}
      <div className="write-review-section">
        <Button {...WRITE_REVIEW_BUTTON} onClick={handleWriteReview}>
          {LABELS.WRITE_REVIEW}
        </Button>
      </div>

      {/* Reviews List Placeholder - API will be added later */}
      <div className="reviews-list-section">
        <p className="no-reviews-message">{LABELS.NO_REVIEWS}</p>
      </div>
    </div>
  );
};

export default ProductReviews;

