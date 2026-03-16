/*
 * SectionHeader Component
 *
 * Reusable header for all landing page sections
 * Displays title, subtitle, and "View All" link with icon
 */

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/shared/icons';

const SectionHeader = ({ 
  title, 
  subtitle, 
  viewAllLink, 
  viewAllLabel = 'View All',
  showViewAll = true,
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-between mb-8 ${className}`}>
      {/* Title and Subtitle */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {/* View All Link */}
      {showViewAll && viewAllLink && (
        <Link 
          href={viewAllLink}
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 transition-colors"
        >
          {viewAllLabel}
          <Icon name="chevronRight" size={20} />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;

