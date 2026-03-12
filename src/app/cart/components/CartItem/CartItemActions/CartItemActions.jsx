/**
 * CartItemActions Component
 *
 * Remove button for cart item
 */
"use client";

import { useState } from 'react';
import { Icon } from '@/shared/icons';

const CartItemActions = ({ cartItemId, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(cartItemId);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <button
      onClick={handleRemove}
      disabled={isRemoving}
      className="flex items-center gap-1.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 border border-red-200 hover:border-red-300"
      title="Remove item"
    >
      <Icon name="trash" size={18} />
      <span className="text-sm font-medium">Remove</span>
    </button>
  );
};

export default CartItemActions;
