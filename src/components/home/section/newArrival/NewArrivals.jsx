"use client";

import React from 'react';
import ProductCard from '@/app/products/components/ProductCard';
import SectionHeader from '../common/SectionHeader';
import { HorizontalScroll } from '@/shared/ui/horizontal-scroll';
import { useDevice } from '@/shared/hooks/useDevice';
import { NEW_ARRIVAL_SECTION_CONFIG } from './newArrival-constant';

const NewArrivals = ({ products = [] }) => {
  const { isMobile } = useDevice();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          title={NEW_ARRIVAL_SECTION_CONFIG.header}
          subtitle={NEW_ARRIVAL_SECTION_CONFIG.subHeader}
          viewAllLink={NEW_ARRIVAL_SECTION_CONFIG.viewAllLink}
          viewAllLabel={NEW_ARRIVAL_SECTION_CONFIG.viewAllLabel}
        />

        {isMobile ? (
          <HorizontalScroll
            speed={1}
            gap={16}
            itemWidth="280px"
            loop={true}
            stopOnMouseEnter={true}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id || product._id || product.slug}
                product={product}
              />
            ))}
          </HorizontalScroll>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

export default NewArrivals;