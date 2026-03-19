"use client";

import React, { useState, useEffect } from 'react';
import ActivityComponent from './components/ActivityComponent';
import { ACTIVITY_TYPES, ACTIVITY_CONFIG, ACTIVITY_API_PARAMS } from './activity.constant';
import { ActivityService } from '@/services/activity/activity.service';

const Activity = ({
  recommendedProducts = [],
  topPicksProducts = [],
}) => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        setLoading(true);
        const products = await ActivityService.getRecentlyViewed(
          ACTIVITY_API_PARAMS[ACTIVITY_TYPES.RECENTLY_VIEWED]
        );
        setRecentlyViewedProducts(products);
      } catch (error) {
        console.error('Failed to fetch recently viewed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyViewed();
  }, []);

  return (
    <div className="space-y-0">
      {!loading && (
        <ActivityComponent
          products={recentlyViewedProducts}
          activityConfig={ACTIVITY_CONFIG[ACTIVITY_TYPES.RECENTLY_VIEWED]}
        />
      )}

      <ActivityComponent
        products={recommendedProducts}
        activityConfig={ACTIVITY_CONFIG[ACTIVITY_TYPES.RECOMMENDED]}
      />

      <ActivityComponent
        products={topPicksProducts}
        activityConfig={ACTIVITY_CONFIG[ACTIVITY_TYPES.TOP_PICKS]}
      />
    </div>
  );
};

export default Activity;