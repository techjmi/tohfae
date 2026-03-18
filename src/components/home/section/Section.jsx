import React from 'react';
import { ProductsSection, SECTION_CONFIG, SECTION_TYPES } from './components';

const Section = ({
  newArrivalProducts = [],
  trendingProducts = [],
  featuredProducts = [],
  bestSellerProducts = [],
  dealsProducts = [],
  personalizedProducts = [],
}) => {
  return (
    <div className="space-y-0">
      <ProductsSection
        products={newArrivalProducts}
        sectionConfig={SECTION_CONFIG[SECTION_TYPES.NEW_ARRIVAL]}
      />

      <ProductsSection
        products={trendingProducts}
        sectionConfig={SECTION_CONFIG[SECTION_TYPES.TRENDING]}
      />

      <ProductsSection
        products={featuredProducts}
        sectionConfig={SECTION_CONFIG[SECTION_TYPES.FEATURED]}
      />

      <ProductsSection
        products={bestSellerProducts}
        sectionConfig={SECTION_CONFIG[SECTION_TYPES.BEST_SELLER]}
      />

      <ProductsSection
        products={dealsProducts}
        sectionConfig={SECTION_CONFIG[SECTION_TYPES.DEALS]}
      />

      <ProductsSection
        products={personalizedProducts}
        sectionConfig={SECTION_CONFIG[SECTION_TYPES.PERSONALIZED]}
      />
    </div>
  );
};

export default Section;