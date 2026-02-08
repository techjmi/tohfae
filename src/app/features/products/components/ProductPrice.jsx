/**
 * ProductPrice Component (Molecule)
 * 
 * Product pricing display with:
 * - Selling price (main price)
 * - MRP (strikethrough if discount)
 * - Discount label
 * 
 * Props:
 * @param {number} sellingPrice - Current selling price
 * @param {number} mrp - Maximum retail price
 * @param {number} discountPercentage - Discount percentage
 * @param {string} discountLabel - Custom discount label
 * @param {string} currency - Currency code (default: INR)
 * @param {string} className - Additional CSS classes
 * 
 * Usage:
 * <ProductPrice
 *   sellingPrice={499}
 *   mrp={599}
 *   discountPercentage={17}
 *   discountLabel="Save 17%"
 * />
 */
import React from 'react';

const ProductPrice = ({
  sellingPrice,
  mrp,
  discountPercentage = 0,
  discountLabel,
  currency = 'INR',
  className = "",
}) => {
  const hasDiscount = discountPercentage > 0;

  // Format price based on currency
  const formatPrice = (price) => {
    if (!price && price !== 0) return '₹0';

    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0,
      }).format(price);
    } catch (error) {
      return `₹${price}`;
    }
  };

  return (
    <div className={`flex items-baseline gap-2 flex-wrap ${className}`}>
      {/* Selling Price */}
      <span className="text-xl font-bold text-gray-900">
        {formatPrice(sellingPrice)}
      </span>

      {/* MRP (strikethrough if discount) */}
      {hasDiscount && mrp && (
        <>
          <span className="text-sm text-gray-500  line-through">
            {formatPrice(mrp)}
          </span>

          {/* Discount Label */}
          <span className="text-xs font-semibold text-green-600">
            {discountLabel || `Save ${discountPercentage}%`}
          </span>
        </>
      )}
    </div>
  );
};

export default ProductPrice;
