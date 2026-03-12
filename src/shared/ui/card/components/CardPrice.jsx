/**
 * CardPrice Component
 * Displays price with optional original price and discount
 */
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import { formatPrice, calculateDiscount } from '../Card.helpers';

const CardPrice = ({
  price,
  originalPrice,
  discount,
  discountLabel,
  currency = '₹',
  showDiscount = true,
  priceSize = 'lg',
  className = '',
  ...props
}) => {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = discount || (hasDiscount ? calculateDiscount(originalPrice, price) : 0);

  const priceSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  return (
    <div className={classNames('card-price flex items-center gap-2 flex-wrap', className)} {...props}>
      {/* Current Price */}
      <span className={classNames(priceSizeClasses[priceSize], 'font-bold text-gray-900')}>
        {formatPrice(price, currency)}
      </span>

      {/* Original Price (if discounted) */}
      {hasDiscount && (
        <span className="text-sm text-gray-500 line-through">
          {formatPrice(originalPrice, currency)}
        </span>
      )}

      {/* Discount Label or Percentage */}
      {showDiscount && discountPercentage > 0 && (
        <span className="text-xs font-semibold text-green-600">
          {discountLabel || `Save ${discountPercentage}%`}
        </span>
      )}
    </div>
  );
};

export default CardPrice;

