"use client";

import { Icon } from '@/shared/icons';
import { useCart } from '@/shared/hooks/cart/useCart';
import { CART_LIMITS } from '../../../cart.constant';
import { toast } from 'react-toastify';

const CartItemQuantity = ({ quantity, productId, variantId, cartItemId, onQuantityChanged }) => {
  const { updateQuantity, isLoading } = useCart();

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < CART_LIMITS.MIN_QUANTITY || newQuantity > CART_LIMITS.MAX_QUANTITY) return;
    try {
      const result = await updateQuantity({
        productId,
        variantId,
        quantity: newQuantity,
        cartItemId
      });
      if (result.success) {
        if (onQuantityChanged) onQuantityChanged();
      } else {
        toast.error(result.error || 'Failed to update quantity');
      }
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  return (
    <div className="flex items-center gap-1">
      <span className="text-xs sm:text-sm text-gray-600 mr-1 sm:mr-2">Qty:</span>
      <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= CART_LIMITS.MIN_QUANTITY || isLoading}
          className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="minus" size={14} className="sm:w-4 sm:h-4" />
        </button>
        <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-semibold min-w-10 sm:min-w-12 text-center bg-gray-50">
          {quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= CART_LIMITS.MAX_QUANTITY || isLoading}
          className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="plus" size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItemQuantity;
