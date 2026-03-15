/**
 * WishlistButton Component
 *
 * Toggles product in wishlist for guest users
 * Uses localStorage for storage
 *
 * Props:
 * @param {Object} product - Product object with id, name, image, price, mrp, discount
 *
 * Usage:
 * <WishlistButton product={productData} />
 */

"use client";
import React, { useState } from 'react';
import './wishlist-button.css';
import { Icon } from '@/shared/icons';
import { GuestWishlistService } from '@/services/wishlist';
import Button from '@/shared/ui/button';

const WishlistButton = ({
    product,
    size = 20,
    className = "",
    productId,
    iconName = null, // Custom icon name (e.g., "trash" for wishlist page)
    ...props
}) => {
  const [isInWishlist, setIsInWishlist] = useState(() => {
    const wishlist = GuestWishlistService.getWishlist();
    return wishlist.some(item => item.id === product?.id);
  });

  const handleToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!product?.id) return;

    if (isInWishlist) {
      GuestWishlistService.removeFromWishlist(product.id);
      setIsInWishlist(false);
    } else {
      GuestWishlistService.addToWishlist(product);
      setIsInWishlist(true);
    }

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  // Determine which icon to show
  const getIconName = () => {
    if (iconName) return iconName; // Use custom icon if provided
    return isInWishlist ? "heart-filled" : "heart";
  };

  const getIconColor = () => {
    if (iconName === "trash") return "text-red-500";
    return isInWishlist ? "text-red-500 fill-red-500" : "text-gray-600";
  };

  return (
    <Button
      variant="ghost"
      className="wishlist-button ml-auto p-2! rounded-full! bg-white/90 backdrop-blur-sm shadow-md hover:bg-white min-w-0! h-auto! transition-all"
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      size="sm"
      onClick={handleToggle}
      {...props}
    >
      <Icon
        name={getIconName()}
        size={size}
        className={getIconColor()}
      />
    </Button>
  )
}

export default WishlistButton