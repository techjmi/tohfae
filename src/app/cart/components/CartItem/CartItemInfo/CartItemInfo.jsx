"use client";

import Link from 'next/link';

const CartItemInfo = ({ product, variant, customization, isAvailable, stockStatus }) => {
  return (
    <div className="min-w-0">
      <Link href={`/products/${product.slug}`}>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
      </Link>
      {variant?.name && (
        <div className="mt-1 sm:mt-1.5">
          <p className="text-xs sm:text-sm text-gray-600 truncate">
            Variant: <span className="font-medium text-gray-700">{variant.name}</span>
          </p>
        </div>
      )}
      {customization && Object.keys(customization).length > 0 && (
        <div className="mt-1 sm:mt-1.5">
          <p className="text-xs sm:text-sm text-gray-600">
            <span className="font-medium">Customized</span>
          </p>
        </div>
      )}
      <div className="mt-1.5 sm:mt-2">
        {!isAvailable && (
          <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs font-medium bg-red-50 text-red-700">
            Out of Stock
          </span>
        )}
        {isAvailable && !stockStatus.hasEnoughStock && (
          <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs font-medium bg-orange-50 text-orange-700">
            Limited Stock
          </span>
        )}
        {isAvailable && stockStatus.hasEnoughStock && stockStatus.inStock && (
          <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs font-medium bg-green-50 text-green-700">
            In Stock
          </span>
        )}
      </div>
    </div>
  );
};

export default CartItemInfo;
