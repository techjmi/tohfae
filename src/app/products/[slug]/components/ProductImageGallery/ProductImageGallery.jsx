"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Carousel from '@/shared/ui/carousel';
import {
  GALLERY_CONFIG,
  IMAGE_CONFIG,
  LABELS,
  CSS_CLASSES
} from './ProductImageGallery.constants';
import './ProductImageGallery.css';

const ProductImageGallery = ({ images = [], productName = '', className = '', ...props }) => {
  const [isZoomed, setIsZoomed] = useState(false);

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

  return (
    <div className={`${CSS_CLASSES.GALLERY} ${className}`} {...props}>
      <Carousel showArrows showDots loop autoplay autoplayDelay={4000}>
        {images.map((imageUrl, index) => (
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
              sizes={IMAGE_CONFIG.SIZES}
              className={`${CSS_CLASSES.IMAGE} ${isZoomed ? CSS_CLASSES.IMAGE_ZOOMED : ''}`}
              priority={index === 0}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductImageGallery;

