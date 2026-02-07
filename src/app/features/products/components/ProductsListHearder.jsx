/**
 * ProductListHeader Component
 *
 * Header section for product listing page with:
 * - Breadcrumb navigation
 * - Sort dropdowns (Price, Rating, Arrival)
 * - Active filter chips with remove functionality
 *
 * Props:
 * @param {string} pathname - Current URL pathname for breadcrumbs
 * @param {object} filters - Active filters object { category: 'tshirt', inStock: true }
 * @param {function} onRemoveFilter - Callback when filter chip is removed
 * @param {function} onClearAllFilters - Callback to clear all filters
 * @param {string} sortBy - Current sort field
 * @param {string} sortDirection - Current sort direction (asc/desc)
 * @param {function} onSortChange - Callback when sort option is selected (value, direction)
 *
 * Usage:
 * <ProductListHeader
 *   pathname={pathname}
 *   filters={filters}
 *   onRemoveFilter={removeFilter}
 *   onClearAllFilters={resetFilters}
 *   sortBy={sortBy}
 *   sortDirection={sortDirection}
 *   onSortChange={handleSortChange}
 * />
 */
"use client";

import React from 'react';
import { Breadcrumbs } from '@/shared/ui/breadcrumbed';
import { Chip } from '@/shared/ui/chip';
import { SortDropdown } from '@/shared/ui/sort';
import Button from '@/shared/ui/button';
import { SORT_OPTIONS, getFilterLabel } from '@/app/features/products/products.constant';

const ProductListHeader = ({
  pathname,
  filters = {},
  onRemoveFilter,
  onClearAllFilters,
  sortBy = '',
  sortDirection = 'asc',
  onSortChange,
  className = "",
}) => {
  // Get active filters as array
  const activeFilters = Object.entries(filters).filter(
    ([key, value]) => value !== undefined && value !== null && value !== ''
  );

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs pathname={pathname} />

      {/* Sort Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <SortDropdown
          label="Price"
          options={SORT_OPTIONS.PRICE}
          currentValue={sortBy}
          currentDirection={sortDirection}
          onSelect={onSortChange}
        />

        <SortDropdown
          label="Rating"
          options={SORT_OPTIONS.RATING}
          currentValue={sortBy}
          currentDirection={sortDirection}
          onSelect={onSortChange}
        />

        <SortDropdown
          label="Arrival"
          options={SORT_OPTIONS.ARRIVAL}
          currentValue={sortBy}
          currentDirection={sortDirection}
          onSelect={onSortChange}
        />
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filters:
          </span>

          {activeFilters.map(([key, value]) => (
            <Chip
              key={key}
              label={getFilterLabel(value) || getFilterLabel(key) || value}
              value={value}
              onClose={(e) => {
                e.stopPropagation();
                if (onRemoveFilter) {
                  onRemoveFilter(key);
                }
              }}
            />
          ))}

          {activeFilters.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAllFilters}
              className="text-red-600 hover:text-red-700 dark:text-red-400"
            >
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductListHeader;