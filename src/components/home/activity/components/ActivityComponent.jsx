"use client";

import React from 'react';
import ProductCard from '@/app/products/components/ProductCard';
import SectionHeader from '../../section/components/SectionHeader';
import { useDevice } from '@/shared/hooks/useDevice';
import './activityComponent.style.css';

const ActivityComponent = ({
  products = [],
  activityConfig = {},
  className = '',
  containerClassName = '',
  gridClassName = '',
  showHeader = true,
}) => {
  const { isMobile } = useDevice();

  if (!products || products.length === 0) return null;

  const defaultGridClass = isMobile
    ? 'grid grid-cols-2 gap-4'
    : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';

  return (
    <section className={`activity-section ${activityConfig.padding || 'py-12'} ${activityConfig.bgColor || 'bg-white'} ${className}`}>
      <div className={`activity-section-container ${containerClassName}`}>
        {showHeader && (
          <SectionHeader
            title={activityConfig.header || 'Recently Viewed'}
            subtitle={activityConfig.subHeader || 'Continue where you left off'}
            viewAllLink={activityConfig.viewAllLink}
            viewAllLabel={activityConfig.viewAllLabel || 'Clear History'}
            showViewAll={activityConfig.showViewAll || false}
          />
        )}

        <div className={gridClassName || activityConfig.gridClass || defaultGridClass}>
          {products.map((product) => (
            <ProductCard
              key={product.id || product._id || product.slug}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityComponent;