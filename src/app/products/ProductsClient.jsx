/**
 * ProductsClient Component
 *
 * Client-side wrapper for products page
 * Manages all state (filters, sort, pagination) and passes to child components
 *
 * Features:
 * - Filter management (category, price, rating)
 * - Sort management (price, rating, date)
 * - Pagination
 * - Empty state handling
 * - Loading state handling
 */
"use client";
import { usePathname } from 'next/navigation';
import { useFilters } from '@/shared/hooks/state/useFilters';
import { useSort } from '@/shared/hooks/state/useSort';
import ProductListHeader from './components/ProductsListHearder';
import ProductCard from './components/ProductCard';
import EmptyState from '@/shared/ui/empty-state';
import Button from '@/shared/ui/button';
import { PRODUCTS_TEXT } from './products.helper';
import { PRODUCTS_PAGE_STYLES, PRODUCTS_GRID_STYLES } from './products.style';

const ProductsClient = ({ products: initialProducts }) => {
  const pathname = usePathname();
  // Filter state
  const {
    filters,
    applyFilter,
    removeFilter,
    resetFilters,
  } = useFilters({});

  // Sort state with products data
  const {
    sortedData: sortedProducts,
    sortBy,
    sortDirection,
    applySort,
  } = useSort(initialProducts, {
    initialSortBy: 'pricing.sellingPrice',
    initialSortDirection: 'asc',
  });

  // Filter products based on selected categories
  const filteredProducts = (sortedProducts || []).filter((product) => {
    // Get all selected category filters
    const selectedCategories = Object.keys(filters).filter(key => filters[key] === true);

    // If no filters selected, show all products
    if (selectedCategories.length === 0) return true;

    // Check if product category matches any selected filter
    return selectedCategories.includes(product?.category);
  });

  const handleSortChange = (value, direction) => {
    applySort(value, direction);
  };

  const handleClearSort = () => {
    applySort('', 'asc'); // Reset to default/no sort
  };

  const handleFilterClick = (_filterType, value) => {
    // For category filters, use the value itself as the key (e.g., 'tshirt', 'mug')
    if (filters[value]) {
      // If already selected, remove it
      removeFilter(value);
    } else {
      // If not selected, add it
      applyFilter(value, true);
    }
  };

  return (
    <div className={PRODUCTS_PAGE_STYLES.CONTAINER}>
      <div className={PRODUCTS_PAGE_STYLES.INNER_CONTAINER}>
        {/* Header with Breadcrumb, Sort, Filter Chips */}
        <ProductListHeader
          pathname={pathname}
          filters={filters}
          onRemoveFilter={removeFilter}
          onClearAllFilters={resetFilters}
          onClearSort={handleClearSort}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          onFilterClick={handleFilterClick}
        />

        {/* Product Grid */}
        <div className={PRODUCTS_GRID_STYLES.CONTAINER}>
          {/* Results Count */}
          <div className={PRODUCTS_GRID_STYLES.RESULTS_COUNT}>
            <p className={PRODUCTS_GRID_STYLES.RESULTS_TEXT}>
              {PRODUCTS_TEXT.SHOWING_RESULTS} <span className={PRODUCTS_GRID_STYLES.RESULTS_NUMBER}>{filteredProducts.length}</span> {PRODUCTS_TEXT.PRODUCTS_TEXT}
            </p>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts?.length > 0 ? (
            <div className={PRODUCTS_GRID_STYLES.GRID}>
              {filteredProducts.map((product) => (
                <ProductCard key={product?.id || product?._id || Math.random()} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <EmptyState
              title={PRODUCTS_TEXT.NO_PRODUCTS_TITLE}
              description={PRODUCTS_TEXT.NO_PRODUCTS_DESCRIPTION}
              action={
                <Button
                  color="primary"
                  variant="filled"
                  onClick={() => {
                    resetFilters();
                    handleClearSort();
                  }}
                >
                  {PRODUCTS_TEXT.CLEAR_FILTERS_BUTTON}
                </Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsClient;

