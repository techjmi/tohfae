/**
 * StockStatus Component
 * Displays inventory availability for selected variant or product
 */
"use client";

import React from 'react';
import { STOCK_STATUS, LABELS } from '../ProductVariants.constants';

const StockStatus = ({ selectedVariant, product }) => {
  // Show variant-specific inventory if variant is selected
  if (selectedVariant) {
    const isInStock = selectedVariant.inventory?.available > 0;
    
    return (
      <div className="stock-status mt-4">
        {isInStock ? (
          <span className="text-green-600 font-medium">
            {STOCK_STATUS.IN_STOCK_ICON} {selectedVariant.inventory.available} {LABELS.AVAILABLE}
          </span>
        ) : (
          <span className="text-red-600 font-medium">
            {STOCK_STATUS.OUT_OF_STOCK_ICON} {STOCK_STATUS.OUT_OF_STOCK}
          </span>
        )}
      </div>
    );
  }

  // Show product-level inventory when no variant is selected
  const isInStock = product?.inventory?.available > 0;
  
  return (
    <div className="stock-status mt-4">
      {isInStock ? (
        <span className="text-green-600 font-medium">
          {STOCK_STATUS.IN_STOCK_ICON} {product.inventory.available} {LABELS.AVAILABLE}
        </span>
      ) : (
        <span className="text-red-600 font-medium">
          {STOCK_STATUS.OUT_OF_STOCK_ICON} {STOCK_STATUS.OUT_OF_STOCK}
        </span>
      )}
    </div>
  );
};

export default StockStatus;

