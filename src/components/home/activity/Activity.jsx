/**
 * Activity Component
 *
 * Parent component for all activity related sections (wrapper of all activity sections)
 * This component will be used in the home page
 */
import React from 'react';
import ActivityComponent from './components/ActivityComponent';
import { ACTIVITY_TYPES, ACTIVITY_CONFIG } from './activity.constant';

const Activity = ({
  recentlyViewedProducts = [],
  recommendedProducts = [],
  topPicksProducts = [],
}) => {
  return (
    <div className="space-y-0">
      <ActivityComponent
        products={recentlyViewedProducts}
        activityConfig={ACTIVITY_CONFIG[ACTIVITY_TYPES.RECENTLY_VIEWED]}
      />

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