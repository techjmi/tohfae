import React from 'react';
import Link from 'next/link';
import { Icon } from '@/shared/icons';
import './productsSection.style.css';

const SectionHeader = ({
  title,
  subtitle,
  viewAllLink,
  viewAllLabel = 'View All',
  showViewAll = true,
  className = ''
}) => {
  return (
    <div className={`section-header-wrapper ${className}`}>
      <div className="section-header-content">
        <h2 className="section-header-title">{title}</h2>
        {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
      </div>

      {showViewAll && viewAllLink && (
        <Link href={viewAllLink} className="section-view-all">
          {viewAllLabel}
          <Icon name="chevronRight" size={18} />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;

