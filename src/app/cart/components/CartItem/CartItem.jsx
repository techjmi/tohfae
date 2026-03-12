"use client";

import CartItemImage from './CartItemImage';
import CartItemInfo from './CartItemInfo';
import CartItemQuantity from './CartItemQuantity';
import RemoveFromCartButton from '@/shared/ui/cart/RemoveFromCartButton';
import {
  getProductName,
  getProductImage,
  getItemPricing,
  getVariantName,
  isItemAvailable,
  getStockInfo,
} from '../../helpers/cartItemHelper';

const CartItem = ({ item, onQuantityChanged, onRemoveSuccess, onRemoveError }) => {
  const product = {
    _id: item.productId?._id,
    name: getProductName(item),
    slug: item.productId?.slug,
    thumbnail: getProductImage(item),
  };

  const variant = {
    name: getVariantName(item),
  };

  const pricing = getItemPricing(item);
  const stockInfo = getStockInfo(item);
  const available = isItemAvailable(item);

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex gap-3 sm:gap-4">
        <CartItemImage product={product} />
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1">
            <CartItemInfo
              product={product}
              variant={variant}
              customization={item.customization}
              isAvailable={available}
              stockStatus={stockInfo}
            />
            <div className="mt-2 sm:mt-3 flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl font-bold text-gray-900">
                  ₹{pricing.sellingPrice}
                </span>
                {pricing.discount > 0 && (
                  <>
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      ₹{pricing.mrp}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-green-600 bg-green-50 px-1.5 sm:px-2 py-0.5 rounded">
                      {pricing.discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>
            {item.quantity > 1 && (
              <div className="mt-1.5 sm:mt-2">
                <p className="text-xs sm:text-sm text-gray-600">
                  Subtotal: <span className="font-semibold text-gray-900">₹{pricing.subtotal}</span>
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-gray-100">
            <CartItemQuantity
              quantity={item.quantity}
              productId={item.productId?._id}
              variantId={item.variantId}
              cartItemId={item._id}
              onQuantityChanged={onQuantityChanged}
            />

            <RemoveFromCartButton
              productId={item.productId?._id}
              variantId={item.variantId}
              cartItemId={item._id}
              onSuccess={onRemoveSuccess}
              onError={onRemoveError}
              showIcon={true}
              variant="outline"
              color="danger"
              size="sm"
            >
              Remove
            </RemoveFromCartButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
