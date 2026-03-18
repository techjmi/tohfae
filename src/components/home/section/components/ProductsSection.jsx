"use client";

import React from 'react';
import ProductCard from '@/app/products/components/ProductCard';
import SectionHeader from './SectionHeader';
import { HorizontalScroll } from '@/shared/ui/horizontal-scroll';
import { useDevice } from '@/shared/hooks/useDevice';
import { SECTION_DEFAULTS } from '../section.constant';
import './productsSection.style.css';

const ProductsSection = ({
  products = [],
  sectionConfig = {},
  layout,
  className = '',
  containerClassName = '',
  gridClassName = '',
  showHeader = true,
}) => {
  const { isMobile } = useDevice();

  if (!products || products.length === 0) return null;

  const config = { ...SECTION_DEFAULTS, ...sectionConfig };
  const finalLayout = layout || config.layout;
  const shouldScroll = finalLayout === 'scroll' || (finalLayout === 'auto' && isMobile);

  const {
    header,
    subHeader,
    viewAllLabel,
    viewAllLink,
    showViewAll,
    scrollSpeed,
    scrollGap,
    scrollItemWidth,
    scrollLoop,
    scrollStopOnMouseEnter,
    gridClass,
    bgColor,
    padding,
  } = config;

  return (
    <section className={`products-section ${padding} ${bgColor} ${className}`}>
      <div className={`products-section-container ${containerClassName}`}>
        {/* Section Header */}
        {showHeader && (
          <SectionHeader
            title={header}
            subtitle={subHeader}
            viewAllLink={viewAllLink}
            viewAllLabel={viewAllLabel}
            showViewAll={showViewAll}
          />
        )}

        {/* Products Display */}
        {shouldScroll ? (
          // Horizontal Scroll Layout (Mobile or forced scroll)
          <div className="products-scroll-container">
            <HorizontalScroll
              speed={scrollSpeed}
              gap={scrollGap}
              itemWidth={scrollItemWidth}
              loop={scrollLoop}
              stopOnMouseEnter={scrollStopOnMouseEnter}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id || product._id || product.slug}
                  product={product}
                />
              ))}
            </HorizontalScroll>
          </div>
        ) : (
          // Grid Layout (Desktop or forced grid)
          <div className={gridClassName || gridClass}>
            {products.map((product) => (
              <ProductCard
                key={product.id || product._id || product.slug}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;