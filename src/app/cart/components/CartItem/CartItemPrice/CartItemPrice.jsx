/**
 * CartItemPrice Component
 *
 * Displays product pricing with discount
 */
"use client";

import { formatPrice } from '@/shared/ui/card/Card.helpers';

const CartItemPrice = ({ pricing }) => {
  return (
    <div>
      <p className="text-lg font-bold text-gray-900">
        {formatPrice(pricing.sellingPrice)}
      </p>
      {pricing.discount > 0 && (
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 line-through">
            {formatPrice(pricing.mrp)}
          </p>
          <p className="text-xs text-green-600 font-medium">
            Save {formatPrice(pricing.discount)}
          </p>
        </div>
      )}
    </div>
  );
};

export default CartItemPrice;
