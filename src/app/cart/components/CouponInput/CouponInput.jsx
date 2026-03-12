"use client";

import { useState } from 'react';
import Button from '@/shared/ui/button';
import { Icon } from '@/shared/icons';

const CouponInput = ({ appliedCoupon, onApply, onRemove }) => {
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState(null);

  const handleApply = async () => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    setIsApplying(true);
    setError(null);

    try {
      await onApply(couponCode.trim().toUpperCase());
      setCouponCode('');
    } catch (err) {
      setError(err.message || 'Invalid coupon code');
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemove = async () => {
    try {
      await onRemove();
    } catch (err) {
      // Error handled by parent
    }
  };

  if (appliedCoupon) {
    return (
      <div className="border border-green-200 bg-green-50 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="check" size={16} className="text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">
                {appliedCoupon.code}
              </p>
              <p className="text-xs text-green-700">
                Coupon applied successfully
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Have a coupon code?
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => {
            setCouponCode(e.target.value.toUpperCase());
            setError(null);
          }}
          placeholder="Enter code"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={isApplying}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleApply}
          disabled={isApplying || !couponCode.trim()}
        >
          {isApplying ? 'Applying...' : 'Apply'}
        </Button>
      </div>
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default CouponInput;
