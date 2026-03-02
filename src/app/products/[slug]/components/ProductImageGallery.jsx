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
import { CAROUSEL_CONFIG } from '@/shared/constant/carousel.constant';
import styles from './ProductImageGallery.module.css';
const height = 250;

const ProductImageGallery = ({ images = [], productName = '', className = '', ...props }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div
        className={`${styles.emptyState} ${className}`}
        style={{ height: CAROUSEL_CONFIG.height }}
        {...props}
      >
        <p className={styles.emptyText}>No images available</p>
      </div>
    );
  }
  // Create carousel items from images
  const carouselItems = images.map((imageUrl, index) => (
    <div
      key={index}
      className={styles.imageContainer}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <Image
        src={imageUrl || '/placeholder-product.jpg'}
        alt={`${productName || 'Product'} - Image ${index + 1}`}
        fill
        className={`${styles.image} ${isZoomed ? styles.zoomed : ''}`}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={index === 0}
      />
    </div>
  ));

  return (
    <div className={`${styles.gallery} ${className}`} {...props}>
      <Carousel
        items={carouselItems}
        slidesPerView={1}
        spaceBetween={0}
        loop={images.length > 1}
        arrows={images.length > 1}
        dots={images.length > 1}
        autoplay={false}
        height={height}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};

export default ProductImageGallery;

