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
import { SORT_OPTIONS, FILTER_CHIPS, getFilterLabel } from '@/app/features/products/products.constant';

const ProductListHeader = ({
  pathname,
  filters = {},
  onRemoveFilter,
  onClearAllFilters,
  onClearSort,
  sortBy = '',
  sortDirection = 'asc',
  onSortChange,
  onFilterClick,
  className = "",
}) => {
  // Get active filters as array
  const activeFilters = Object.entries(filters).filter(
    ([key, value]) => value !== undefined && value !== null && value !== ''
  );

  // Check if sort is applied (not default)
  const isSortApplied = sortBy && sortBy !== '';

  // Check if we should show clear button (either filters or sort applied)
  const showClearButton = activeFilters.length > 0 || isSortApplied;

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs pathname={pathname} />

      {/* Category Filter Chips (Clickable) */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Categories:
        </span>
        {FILTER_CHIPS.map((chip) => {
          const isSelected = filters[chip.value] === true;
          return (
            <Chip
              key={chip.value}
              label={chip.label}
              value={chip.value}
              onClick={() => onFilterClick && onFilterClick('category', chip.value)}
              className={`cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'hover:bg-primary-100 dark:hover:bg-primary-900'
              }`}
            />
          );
        })}
      </div>

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

        {/* Clear Sort Button */}
        {isSortApplied && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSort}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Clear Sort
          </Button>
        )}
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Active Filters:
          </span>

          {activeFilters.map(([filterKey]) => {
            // Get the label - filterKey is the category value (e.g., 'tshirt', 'mug')
            const label = getFilterLabel(filterKey) || filterKey;
            return (
              <Chip
                key={filterKey}
                label={label}
                value={filterKey}
                onClose={(e) => {
                  e.stopPropagation();
                  if (onRemoveFilter) {
                    onRemoveFilter(filterKey);
                  }
                }}
              />
            );
          })}

          {showClearButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (onClearAllFilters) onClearAllFilters();
                if (onClearSort) onClearSort();
              }}
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