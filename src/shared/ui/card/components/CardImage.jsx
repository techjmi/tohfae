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
              const badgeColor = typeof badge === 'object' ? badge.color : 'neutral';
              const badgeSize = typeof badge === 'object' ? badge.size : 'sm';

              return (
                <Badge
                  key={index}
                  color={badgeColor}
                  size={badgeSize}
                  radius="md"
                >
                  {badgeLabel}
                </Badge>
              );
            })}
          </div>
        )}

        {/* Wishlist Button */}
        {wishlist && onWishlistClick && (
          <Button
            as="button"
            size="sm"
            variant="ghost"
            onClick={onWishlistClick}
            className="ml-auto p-2! rounded-full! bg-white/90 backdrop-blur-sm shadow-md hover:bg-white min-w-0! h-auto!"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Icon
              name="heart"
              size={18}
              className={classNames(
                'transition-colors',
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
              )}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardImage;

