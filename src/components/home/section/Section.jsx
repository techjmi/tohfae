/*
 * Section Component
 *
 * Parent component for all home page sections (wrapper)
 * Receives data from page.js and distributes to child sections
 */
import React from 'react';
import { NewArrivals } from './index';

const Section = ({
  newArrivalProducts = [],
  trendingProducts = [],
  featuredProducts = [],
  bestSellerProducts = [],
  dealsProducts = []
}) => {
  return (
    <div className="space-y-0">
      <NewArrivals products={newArrivalProducts} />

      {/* <Trending products={trendingProducts} /> */}
      {/* <Featured products={featuredProducts} /> */}
      {/* <BestSeller products={bestSellerProducts} /> */}
      {/* <Deals products={dealsProducts} /> */}
    </div>
  );
};

export default Section;