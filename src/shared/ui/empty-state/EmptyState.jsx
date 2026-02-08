/**
 * EmptyState Component (Molecule)
 * 
 * Generic empty state component for displaying when no data is available.
 * Reusable across the application (products, search, cart, wishlist, etc.)
 * 
 * Props:
 * @param {string} icon - Icon name from Icon component (optional)
 * @param {ReactNode} customIcon - Custom icon/SVG element (optional)
 * @param {string} title - Main heading text
 * @param {string} description - Supporting description text
 * @param {ReactNode} action - Action button or element (optional)
 * @param {string} className - Additional CSS classes
 * 
 * Usage:
 * <EmptyState
 *   icon="cart"
 *   title="No products found"
 *   description="Try adjusting your filters"
 *   action={<Button onClick={handleClear}>Clear filters</Button>}
 * />
 */
import React from 'react';
import { Icon } from '@/shared/icons';

const EmptyState = ({
  icon,
  customIcon,
  title,
  description,
  action,
  className = "",
}) => {
  return (
    <div className={`text-center py-16 ${className}`}>
      {/* Icon Container */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        {customIcon ? (
          customIcon
        ) : icon ? (
          <Icon name={icon} size={32} className="text-gray-400" />
        ) : (
          /* Default Box Icon */
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        )}
      </div>

      {/* Title */}
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {description}
        </p>
      )}

      {/* Action Button/Element */}
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
};

export default EmptyState;

