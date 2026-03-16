/**
 * CardImage Component
 * Handles image display with badges, overlays, responsive images, and wishlist
 * Uses Next.js Image and existing Badge component
 */

"use client";
import React from 'react';
import { classNames } from '@/shared/utils/classNames';
import { Badge } from '@/shared/ui/badge';
import Button from '@/shared/ui/button';
import { Icon } from '@/shared/icons';
import OptimizedImage from '@/shared/ui/image';
import { WishlistButton } from '@/shared/ui/wishlist';

const CardImage = ({
  src,
  images,
  alt = '',
  badges = [],
  overlay = false,
  overlayOpacity = 0.3,
  aspectRatio = '1/1',
  objectFit = 'cover',
  onClick,
  className = '',
  priority = false,
  // Wishlist props
  wishlist = false,
  isWishlisted = false,
  onWishlistClick,
  productId,
  product,
  wishlistIconName = null, // Custom icon name for wishlist button (e.g., "trash")
  ...props
}) => {
  return (
    <div className={classNames('card-image relative overflow-hidden', className)} {...props}>
      <OptimizedImage
        src={src}
        images={images}
        alt={alt}
        aspectRatio={aspectRatio}
        objectFit={objectFit}
        onClick={onClick}
        overlay={overlay}
        overlayOpacity={overlayOpacity}
        priority={priority}
      />

      {/* Top Row: Badges and Wishlist */}
      <div className="absolute top-2 left-2 right-2 flex items-start justify-between z-10">
        {/* Badges */}
        {badges.length > 0 && (
          <div className="flex flex-col gap-1">
            {badges.map((badge, index) => {
              // Support both string and object format
              const badgeLabel = typeof badge === 'string' ? badge : badge.label;
              const badgeValue = typeof badge === 'object' ? badge.value : null;
              const badgeColor = typeof badge === 'object' ? badge.color : 'neutral';
              const badgeSize = typeof badge === 'object' ? badge.size : 'sm';

              return (
                <Badge
                  key={index}
                  color={badgeColor}
                  size={badgeSize}
                  radius="md"
                >
                <span>{badgeLabel}</span>
                <span>{badgeValue}</span>
                </Badge>
              );
            })}
          </div>
        )}

        {/* Wishlist Button */}
        {wishlist && product && (
         <WishlistButton product={product} iconName={wishlistIconName} />
        )}
      </div>
    </div>
  );
};

export default CardImage;

