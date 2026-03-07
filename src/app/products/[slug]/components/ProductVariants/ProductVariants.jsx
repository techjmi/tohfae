/**
 * ProductVariants Component (Molecule)
 *
 * Product variant selector:
 * - Size selector
 * - Color selector
 * - Other attribute selectors
 * - Stock availability per variant
 * - Price changes based on variant
 *
 * Props:
 * @param {Array} variants - Product variants array
 * @param {Function} onVariantChange - Callback when variant is selected
 * @param {string} selectedVariantId - Currently selected variant ID
 * @param {string} className - Additional CSS classes
 *
 * Usage:
 * <ProductVariants
 *   variants={product.variants}
 *   onVariantChange={handleVariantChange}
 *   selectedVariantId={selectedVariant}
 * />
 */
"use client";

import React from 'react';
import { STOCK_STATUS, LABELS } from './ProductVariants.constants';
import './ProductVariants.css';

const ProductVariants = ({
  variants = [],
  onVariantChange,
  selectedVariantId,
  className = ''
}) => {
  if (!variants || variants.length === 0) return null;

  // Group variants by attribute type (size, color, etc.)
  const variantGroups = {};
  variants.forEach(variant => {
    Object.keys(variant.attributes || {}).forEach(attrKey => {
      if (!variantGroups[attrKey]) {
        variantGroups[attrKey] = new Set();
      }
      variantGroups[attrKey].add(variant.attributes[attrKey]);
    });
  });

  const selectedVariant = variants.find(v => v.id === selectedVariantId);

  return (
    <div className={`variants-container ${className}`}>
      {Object.entries(variantGroups).map(([attrKey, values]) => (
        <div key={attrKey} className="variant-group">
          <label className="variant-label">
            {attrKey}
          </label>
          <div className="variant-options">
            {Array.from(values).map((value) => {
              const variant = variants.find(v => v.attributes?.[attrKey] === value);
              const isSelected = selectedVariant?.attributes?.[attrKey] === value;
              const isAvailable = variant?.inventory?.available > 0;

              const buttonClass = `
                variant-button
                ${isSelected ? 'variant-button-selected' : 'variant-button-unselected'}
                ${!isAvailable ? 'variant-button-unavailable' : ''}
              `.trim();

              return (
                <button
                  key={value}
                  onClick={() => isAvailable && onVariantChange(variant.id)}
                  disabled={!isAvailable}
                  className={buttonClass}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Stock Status */}
      {selectedVariant && (
        <div className="stock-status">
          {selectedVariant.inventory?.available > 0 ? (
            <span className="stock-in-stock">
              {STOCK_STATUS.IN_STOCK_ICON} {STOCK_STATUS.IN_STOCK} ({selectedVariant.inventory.available} {LABELS.AVAILABLE})
            </span>
          ) : (
            <span className="stock-out-of-stock">
              {STOCK_STATUS.OUT_OF_STOCK_ICON} {STOCK_STATUS.OUT_OF_STOCK}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductVariants;

