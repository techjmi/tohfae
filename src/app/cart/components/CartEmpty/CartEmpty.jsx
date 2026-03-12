"use client";

import { useRouter } from 'next/navigation';
import Button from '@/shared/ui/button';
import { Icon } from '@/shared/icons';
import { CART_MESSAGES } from '../../cart.constant';

const CartEmpty = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="text-center max-w-md px-4">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <Icon name="cart" size={48} className="text-gray-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {CART_MESSAGES.EMPTY_TITLE}
        </h2>
        <p className="text-gray-600 mb-8">
          {CART_MESSAGES.EMPTY_DESCRIPTION}
        </p>
        <Button
          variant="solid"
          color="primary"
          size="lg"
          onClick={() => router.push('/products')}
          className="min-w-48"
        >
          {CART_MESSAGES.EMPTY_CTA}
        </Button>
      </div>
    </div>
  );
};

export default CartEmpty;
