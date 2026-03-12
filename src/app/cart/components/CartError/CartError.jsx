/**
 * CartError Component
 *
 * Error state for cart page
 */
"use client";

import Button from '@/shared/ui/button';
import { Icon } from '@/shared/icons';
import { CART_MESSAGES } from '../../cart.constant';

const CartError = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="text-center max-w-md px-4">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
            <Icon name="close" size={48} className="text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {CART_MESSAGES.ERROR_TITLE}
        </h2>

        {/* Error message */}
        <p className="text-gray-600 mb-8">
          {error || 'Failed to load cart'}
        </p>

        {/* Retry Button */}
        <Button
          variant="solid"
          color="primary"
          size="lg"
          onClick={onRetry}
          className="min-w-48"
        >
          {CART_MESSAGES.ERROR_RETRY}
        </Button>
      </div>
    </div>
  );
};

export default CartError;
