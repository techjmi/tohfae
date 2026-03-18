/**
 * ProductActions Component (Molecule)
 *
 * Product action buttons:
 * - Add to Cart button
 * - Buy Now button
 * - Add to Wishlist button
 * - Quantity selector
 * - Share button
 *
 * Props:
 * @param {Object} product - Product data object
 * @param {string} selectedVariantId - Currently selected variant ID
 * @param {Object} customizationData - Current customization data
 * @param {number} quantity - Selected quantity
 * @param {Function} onQuantityChange - Callback when quantity changes
 * @param {string} className - Additional CSS classes
 *
 * Usage:
 * <ProductActions
 *   product={product}
 *   selectedVariantId={selectedVariant}
 *   customizationData={customData}
 *   quantity={quantity}
 *   onQuantityChange={setQuantity}
 * />
 */
"use client";

import React, { useState } from 'react';
import Button from '@/shared/ui/button/Button';
import { Icon } from '@/shared/icons';
import Share from '@/shared/ui/share/Share';
import WishlistButton from '@/shared/ui/wishlist/WishlistButton';
import { QUANTITY_LIMITS, BUTTON_VARIANTS, MESSAGES } from './ProductActions.constants';
import './ProductActions.css';
import { AddToCartButton } from '@/shared/ui/cart';
import { toast } from 'react-toastify';

const ProductActions = ({
  product,
  selectedVariantId,
  customizationData = {},
  quantity = QUANTITY_LIMITS.DEFAULT,
  onQuantityChange,
  className = ''
}) => {
  const [showShare, setShowShare] = useState(false);
//check if items added to cart from redux then show go to cart button instead of add to cart
  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(QUANTITY_LIMITS.MIN, Math.min(QUANTITY_LIMITS.MAX, quantity + delta));

    if (newQuantity === QUANTITY_LIMITS.MAX && delta > 0) {
      console.log(MESSAGES.MAX_QUANTITY_REACHED);
    }

    onQuantityChange(newQuantity);
  };
  const handleAddToCartSuccess = () => {
    toast.success(MESSAGES.ADDED_TO_CART);
  };

  const handleAddToCartError = (error) => {
    console.error('Add to cart error:', error);
    toast.error(error || 'Failed to add to cart');
  };

  const handleBuyNow = () => {
    console.log('Buy now:', { product, selectedVariantId, customizationData, quantity });
    // TODO: Implement buy now logic
  };

  return (
    <div className={`product-actions-container ${className}`}>
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-semibold text-gray-700">Quantity:</label>
        <div className="quantity-selector">
          <Button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= QUANTITY_LIMITS.MIN}
            {...BUTTON_VARIANTS.QUANTITY}
            aria-label="Decrease quantity"
          >
            <Icon name="remove" size={18} />
          </Button>
          <span className="quantity-display">
            {quantity}
          </span>
          <Button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= QUANTITY_LIMITS.MAX}
            {...BUTTON_VARIANTS.QUANTITY}
            aria-label="Increase quantity"
          >
            <Icon name="add" size={18} />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-row">
        <AddToCartButton
          productId={product.id}
          variantId={selectedVariantId}
          quantity={quantity}
          customization={customizationData}
          onSuccess={handleAddToCartSuccess}
          onError={handleAddToCartError}
          showGoToCart={true}
          className="flex-1"
          size="lg"
        >
          Add to Cart
        </AddToCartButton>

        {/* Wishlist */}
        <WishlistButton
          product={{
            id: product.id,
            slug: product.slug,
            name: product.basic?.name,
            image: product.media?.thumbnail || product.media?.images?.[0],
            price: product.pricing?.sellingPrice,
            mrp: product.pricing?.mrp,
            discountLabel: product.pricing?.discount?.label,
          }}
          size={24}
          variant="outline"
          color="neutral"
          className="p-3! rounded-lg! bg-transparent! hover:bg-gray-50! shadow-none! border-2 border-gray-300"
        />

        {/* Share */}
        <Button
          onClick={() => setShowShare(!showShare)}
          {...BUTTON_VARIANTS.SHARE}
          aria-label="Share product"
        >
          <Icon name="share" size={24} />
        </Button>
      </div>

      {/* Share Component */}
      {showShare && (
        <div className="share-container">
          <p className="share-title">Share this product:</p>
          <Share
            url={typeof window !== 'undefined' ? window.location.href : ''}
            title={product?.basic?.name}
            text={`Check out ${product?.basic?.name}!`}
            layout="horizontal"
            showLabels={false}
          />
        </div>
      )}

      {/* Buy Now */}
      <Button
        onClick={handleBuyNow}
        {...BUTTON_VARIANTS.BUY_NOW}
        fullWidth
        aria-label="Buy now"
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActions;

