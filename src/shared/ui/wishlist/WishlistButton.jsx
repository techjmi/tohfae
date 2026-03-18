/**
 * WishlistButton Component
 * Simple wishlist button - uses hook for both guest and authenticated users
 */

"use client";
import React, { useState } from 'react';
import './wishlist-button.css';
import { Icon } from '@/shared/icons';
import { useWishlist } from '@/shared/hooks/wishlist';
import Button from '@/shared/ui/button';

const WishlistButton = ({
    product,
    size = 20,
    className = "",
    iconName = null, // "trash" = remove only, null = toggle
    ...props
}) => {
  const { isInWishlist, toggleWishlist, removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);

  const inWishlist = isInWishlist(product?.id || product?.slug);
  const isRemoveOnly = iconName === "trash";

  const handleClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!product?.id && !product?.slug) return;
    if (loading) return;

    try {
      setLoading(true);

      // If trash icon, ONLY remove. Otherwise toggle.
      if (isRemoveOnly) {
        await removeFromWishlist(product);
      } else {
        await toggleWishlist(product);
      }
    } catch (error) {
      console.error('Wishlist error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIconName = () => {
    if (iconName) return iconName;
    return inWishlist ? "heart-filled" : "heart";
  };

  const getIconColor = () => {
    if (iconName === "trash") return "text-red-500";
    return inWishlist ? "text-red-500 fill-red-500" : "text-gray-600";
  };

  return (
    <Button
      variant="ghost"
      className={`wishlist-button ml-auto p-2! rounded-full! bg-white/90 backdrop-blur-sm shadow-md hover:bg-white min-w-0! h-auto! transition-all ${loading ? 'opacity-50' : ''}`}
      aria-label={isRemoveOnly ? 'Remove from wishlist' : (inWishlist ? 'Remove from wishlist' : 'Add to wishlist')}
      size="sm"
      onClick={handleClick}
      disabled={loading}
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