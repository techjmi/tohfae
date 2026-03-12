"use client";

import { useState } from 'react';
import Image from 'next/image';
import { classNames } from '@/shared/utils/classNames';
import './optimized-image.css';

/**
 * OptimizedImage Component
 * 
 * Centralized image component with responsive support and Next.js optimization
 * Handles both multi-device images (desktop/tablet/mobile) and single image fallback
 */
export default function OptimizedImage({
  src,
  images,
  alt = '',
  fill = true,
  width,
  height,
  aspectRatio,
  objectFit = 'cover',
  priority = false,
  sizes,
  className = '',
  onClick,
  overlay = false,
  overlayOpacity = 0.3,
  ...props
}) {
  const [imageError, setImageError] = useState(false);

  // Determine image source
  const getImageSrc = () => {
    if (imageError) return '/placeholder.jpg';
    
    // If images object provided, use desktop > tablet > mobile > fallback
    if (images && typeof images === 'object') {
      return images.desktop || images.tablet || images.mobile || '/placeholder.jpg';
    }
    
    // If single src provided
    if (src) return src;
    
    return '/placeholder.jpg';
  };

  const imageSrc = getImageSrc();

  // Build responsive sizes attribute
  const getResponsiveSizes = () => {
    if (sizes) return sizes;
    
    // If multi-device images provided, use specific breakpoints
    if (images && typeof images === 'object') {
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    }
    
    // For single image, use standard responsive sizes
    return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  };

  const responsiveSizes = getResponsiveSizes();

  return (
    <div 
      className={classNames('optimized-image', className)}
      style={aspectRatio && fill ? { aspectRatio } : undefined}
      {...props}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={responsiveSizes}
        priority={priority}
        className={classNames(
          'optimized-image__img',
          onClick && 'optimized-image__img--clickable'
        )}
        style={{ objectFit }}
        onClick={onClick}
        onError={() => setImageError(true)}
      />
      
      {overlay && (
        <div
          className="optimized-image__overlay"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}

