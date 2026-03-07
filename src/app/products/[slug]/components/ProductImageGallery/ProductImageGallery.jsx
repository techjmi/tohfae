/**
 * ProductImageGallery Component (Molecule)
 *
 * Product image gallery with slider/carousel
 * - Main image display with zoom on hover
 * - Thumbnail navigation
 * - Uses existing Carousel component
 * - Styled navigation arrows
 *
 * Props:
 * @param {Array} images - Array of image URLs
 * @param {string} productName - Product name for alt text
 * @param {string} className - Additional CSS classes
 *
 * Usage:
 * <ProductImageGallery
 *   images={product.media.images}
 *   productName={product.basic.name}
 * />
 */
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Carousel from '@/shared/utils/carousel';
import {
  GALLERY_CONFIG,
  CAROUSEL_CONFIG,
  IMAGE_CONFIG,
  LABELS,
  CSS_CLASSES
} from './ProductImageGallery.constants';
import './ProductImageGallery.css';

const ProductImageGallery = ({ images = [], productName = '', className = '', ...props }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div
        className={`${CSS_CLASSES.EMPTY_STATE} ${className}`}
        style={{ height: GALLERY_CONFIG.HEIGHT }}
        {...props}
      >
        <p className={CSS_CLASSES.EMPTY_TEXT}>{LABELS.NO_IMAGES}</p>
      </div>
    );
  }
  // Create carousel items from images - Dynamic, ready for API integration
  const carouselItems = images.map((imageUrl, index) => (
    <div
      key={index}
      className={CSS_CLASSES.IMAGE_CONTAINER}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <Image
        src={imageUrl || IMAGE_CONFIG.PLACEHOLDER}
        alt={`${productName || LABELS.PRODUCT_DEFAULT} - ${LABELS.IMAGE_ALT_PREFIX} ${index + 1}`}
        fill
        className={`${CSS_CLASSES.IMAGE} ${isZoomed ? CSS_CLASSES.IMAGE_ZOOMED : ''}`}
        sizes={IMAGE_CONFIG.SIZES}
        priority={index === 0}
      />
    </div>
  ));

  return (
    <div className={`${CSS_CLASSES.GALLERY} ${className}`} {...props}>
      <Carousel
        items={carouselItems}
        slidesPerView={CAROUSEL_CONFIG.SLIDES_PER_VIEW}
        spaceBetween={CAROUSEL_CONFIG.SPACE_BETWEEN}
        loop={images.length > CAROUSEL_CONFIG.MIN_IMAGES_FOR_LOOP}
        arrows={images.length > CAROUSEL_CONFIG.MIN_IMAGES_FOR_ARROWS}
        dots={images.length > CAROUSEL_CONFIG.MIN_IMAGES_FOR_DOTS}
        autoplay={CAROUSEL_CONFIG.AUTOPLAY}
        height={GALLERY_CONFIG.HEIGHT}
        arrowsOutside={CAROUSEL_CONFIG.ARROWS_OUTSIDE}
        className=""
      />
    </div>
  );
};

export default ProductImageGallery;

