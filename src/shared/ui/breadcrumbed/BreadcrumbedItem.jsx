/**
 * BreadcrumbItem Component
 *
 * Individual breadcrumb item with link and separator
 *
 * Features:
 * - Link or text display
 * - Active/inactive states
 * - Separator support
 * - Icon support
 * - Truncation for long labels
 *
 * Props:
 * @param {string} label - Text to display
 * @param {string} href - Link URL (optional, if not provided renders as text)
 * @param {boolean} isLast - Whether this is the last item (no separator)
 * @param {string} icon - Icon name (optional)
 * @param {string} separator - Separator character (default: ">")
 * @param {number} maxLength - Max characters before truncation (default: 30)
 *
 * Usage:
 * <BreadcrumbItem label="Home" href="/" icon="home" />
 * <BreadcrumbItem label="Products" href="/products" />
 * <BreadcrumbItem label="T-Shirts" isLast />
 */

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/shared/icons';
import { truncate } from '@/shared/utils/textformating';
const BreadcrumbItem = ({
  label,
  href,
  isLast = false,
  icon = null,
  separator = null,
  maxLength = 30,
  className = "",
}) => {
  // Truncate label if too long using utility function
  const truncatedLabel = truncate(label, maxLength, '...');

  // Base styles
  const baseStyles = "inline-flex items-center gap-1.5 transition-colors";

  // Link styles (clickable items)
  const linkStyles = "text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400";

  // Active/last item styles (current page)
  const activeStyles = "text-gray-900 dark:text-white font-medium";

  return (
    <li className={`inline-flex items-center ${className}`}>
      {/* Breadcrumb Item */}
      {href && !isLast ? (
        <Link
          href={href}
          className={`${baseStyles} ${linkStyles}`}
        >
          {icon && <Icon name={icon} size={16} />}
          <span>{truncatedLabel}</span>
        </Link>
      ) : (
        <span className={`${baseStyles} ${activeStyles}`}>
          {icon && <Icon name={icon} size={16} />}
          <span>{truncatedLabel}</span>
        </span>
      )}

      {/* Separator */}
      {!isLast && separator}
    </li>
  );
};

export default BreadcrumbItem;