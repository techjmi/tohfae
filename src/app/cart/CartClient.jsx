"use client";

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '@/shared/hooks/cart/useCart';
import { CartService } from '@/services/cart/cart.service';
import { Modal } from '@/shared/ui/modal';
import CartHeader from './components/CartHeader';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import CartEmpty from './components/CartEmpty';
import CartLoading from './components/CartLoading';
import CartError from './components/CartError';
import { CART_STYLES } from './cart.style';
import { CART_MESSAGES } from './cart.constant';

const CartClient = () => {
  const [cartData, setCartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const { clearCart } = useCart();

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await CartService.getCart();
      setCartData(response.data);
    } catch (err) {
      const errorMessage = err.message || 'Failed to load cart';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChanged = async () => {
    await fetchCart();
  };

  const handleRemoveSuccess = async (message) => {
    await fetchCart();
    toast.success(message || CART_MESSAGES.REMOVE_ITEM_SUCCESS);
  };

  const handleRemoveError = (error) => {
    toast.error(error || CART_MESSAGES.REMOVE_ITEM_ERROR);
  };

  const handleClearCart = async () => {
    try {
      const result = await clearCart();
      if (result.success) {
        await fetchCart();
        toast.success(CART_MESSAGES.CLEAR_CART_SUCCESS);
      } else {
        toast.error(result.error || CART_MESSAGES.CLEAR_CART_ERROR);
      }
    } catch (err) {
      toast.error(CART_MESSAGES.CLEAR_CART_ERROR);
    } finally {
      setShowClearModal(false);
    }
  };

  const handleApplyCoupon = async (couponCode) => {
    try {
      const response = await CartService.applyCoupon(couponCode);
      await fetchCart();
      if (response?.message) {
        toast.success(response.message);
      }
    } catch (err) {
      toast.error(err.message || CART_MESSAGES.APPLY_COUPON_ERROR);
      throw err;
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      const response = await CartService.removeCoupon();
      await fetchCart();
      if (response?.message) {
        toast.success(response.message);
      }
    } catch (err) {
      toast.error(err.message || CART_MESSAGES.REMOVE_COUPON_ERROR);
    }
  };

  if (isLoading) return <CartLoading />;
  if (error) return <CartError error={error} onRetry={fetchCart} />;
  if (!cartData || !cartData.items || cartData.items.length === 0) return <CartEmpty />;

  return (
    <div className={CART_STYLES.CONTAINER}>
      <div className={CART_STYLES.WRAPPER}>
        <CartHeader
          itemCount={cartData.summary?.itemCount || 0}
          onClearCart={() => setShowClearModal(true)}
        />

        <div className={CART_STYLES.CONTENT}>
          <div className={CART_STYLES.ITEMS_SECTION}>
            {cartData.items.map((item) => (
              <CartItem
                key={`${item.productId}-${item.variantId || 'default'}`}
                item={item}
                onQuantityChanged={handleQuantityChanged}
                onRemoveSuccess={handleRemoveSuccess}
                onRemoveError={handleRemoveError}
              />
            ))}
          </div>

          <div className={CART_STYLES.SUMMARY_SECTION}>
            <CartSummary
              summary={cartData.summary}
              appliedCoupon={cartData.appliedCoupon}
              deliveryInfo={cartData.deliveryInfo}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        size="sm"
        header={{ title: CART_MESSAGES.CLEAR_CART_TITLE }}
        body={CART_MESSAGES.CLEAR_CART_MESSAGE}
        footer={[
          {
            label: CART_MESSAGES.CLEAR_CART_CANCEL,
            onClick: () => setShowClearModal(false),
            variant: "outline",
            color: "neutral"
          },
          {
            label: CART_MESSAGES.CLEAR_CART_CONFIRM,
            onClick: handleClearCart,
            variant: "solid",
            color: "danger"
          }
        ]}
      />
    </div>
  );
};

export default CartClient;
