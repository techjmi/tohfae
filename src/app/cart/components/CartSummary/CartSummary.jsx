"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/shared/ui/button';
import { formatPrice } from '@/shared/ui/card/Card.helpers';
import CouponInput from '../CouponInput';

const CartSummary = ({
  summary,
  appliedCoupon,
  deliveryInfo,
  onApplyCoupon,
  onRemoveCoupon
}) => {
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    router.push('/checkout');
  };

  if (!summary) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 sticky top-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Subtotal ({summary.itemCount} items)</span>
          <span className="font-semibold text-gray-900">{formatPrice(summary.subtotal)}</span>
        </div>

        {/* Discount */}
        {summary.totalDiscount > 0 && (
          <div className="flex justify-between text-base">
            <span className="text-gray-600">Discount</span>
            <span className="font-semibold text-green-600">-{formatPrice(summary.totalDiscount)}</span>
          </div>
        )}

        {/* Delivery Charges */}
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Delivery Charges</span>
          <span className="font-semibold text-gray-900">
            {summary.deliveryCharges === 0 ? (
              <span className="text-green-600 font-bold">FREE</span>
            ) : (
              formatPrice(summary.deliveryCharges)
            )}
          </span>
        </div>

        {/* Coupon Discount */}
        {summary.couponDiscount > 0 && (
          <div className="flex justify-between text-base">
            <span className="text-gray-600">Coupon Discount</span>
            <span className="font-semibold text-green-600">-{formatPrice(summary.couponDiscount)}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t-2 border-gray-200 pt-4 mt-2">
          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-primary-600">{formatPrice(summary.estimatedTotal)}</span>
          </div>
        </div>
      </div>

      {/* Free Delivery Info */}
      {deliveryInfo && !deliveryInfo.isFreeDelivery && deliveryInfo.amountToFreeDelivery > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-xs text-blue-800">
            Add {formatPrice(deliveryInfo.amountToFreeDelivery)} more to get FREE delivery!
          </p>
        </div>
      )}

      {/* Coupon Input */}
      <div className="mb-4">
        <CouponInput
          appliedCoupon={appliedCoupon}
          onApply={onApplyCoupon}
          onRemove={onRemoveCoupon}
        />
      </div>

      {/* Checkout Button */}
      <Button
        variant="solid"
        color="primary"
        size="lg"
        onClick={handleCheckout}
        disabled={isCheckingOut}
        className="w-full"
      >
        {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
      </Button>

      {/* Security Info */}
      <p className="text-xs text-gray-500 text-center mt-4">
        🔒 Secure checkout with SSL encryption
      </p>
    </div>
  );
};

export default CartSummary;
