/**
 * Breadcrumbs Component
 *
 * Generates breadcrumb navigation from pathname (controlled component)
 *
 * Features:
 * - Generates breadcrumbs from URL path using getBreadcrumbs utility
 * - Hidden on mobile devices (uses useDevice hook)
 * - Adds "Home" as first item with icon
 * - Capitalizes path segments for labels
 * - Responsive design with truncation
 * - Dark mode support
 *
 * Props:
 * @param {string} pathname - Current URL pathname (required)
 * @param {string} className - Additional CSS classes (optional)
 *
 * Usage:
 * import { usePathname } from 'next/navigation';
 *
 * const pathname = usePathname();
 * <Breadcrumbs pathname={pathname} />
 *
 * Example:
 * pathname: "/products/t-shirts"
 * Output: Home > Products > T Shirts
 */
"use client";
import React from 'react';
import { Icon } from '@/shared/icons';
import { useDevice } from '@/shared/hooks/useDevice';
import { getBreadcrumbs } from '@/shared/utils/breadcrumbed';
import { titleCase } from '@/shared/utils/textformating';
import BreadcrumbItem from './BreadcrumbedItem';

// Separator component with icon
const Separator = () => {
  return (
    <span className="mx-2 text-gray-400 select-none" aria-hidden="true">
      <Icon name="chevronRight" size={16} />
    </span>
  );
};
const Breadcrumbs = ({
  pathname,
  className = "",
}) => {
  const { isMobile } = useDevice();

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  // Get breadcrumbs from pathname
  if(!pathname) {
    return null;
  }
  const breadcrumbItems = getBreadcrumbs(pathname);

  // Don't render if on home page (no breadcrumbs)
  if (!breadcrumbItems || breadcrumbItems.length === 0) {
    return null;
  }

  // Format label: replace hyphens with spaces and capitalize
  const formatLabel = (label) => {
    return titleCase(label.replace(/-/g, ' '));
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`w-full py-3 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-0">
        {/* Home Link */}
        <BreadcrumbItem
          label="Home"
          href="/"
          icon="home"
          isLast={false}
        />

        {/* Dynamic Breadcrumbs from Path */}
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <BreadcrumbItem
              key={item.href || index}
              label={formatLabel(item.label)}
              href={isLast ? undefined : item.href}
              isLast={isLast}
              separator={<Separator />}
            />
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;