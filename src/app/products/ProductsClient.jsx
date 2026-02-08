/**
 * ProductsClient Component
 *
 * Client-side wrapper for products page
 * Manages all state (filters, sort, pagination) and passes to child components
 */
"use client";
import { usePathname } from 'next/navigation';
import { useFilters } from '@/shared/hooks/state/useFilters';
import { useSort } from '@/shared/hooks/state/useSort';
import ProductListHeader from '../features/products/components/ProductsListHearder';
import ProductCard from '../features/products/components/ProductCard';
import EmptyState from '@/shared/ui/empty-state';
import Button from '@/shared/ui/button';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
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
        <div className="mt-8">
          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold">{filteredProducts.length}</span> products
            </p>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product?.id || Math.random()} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <EmptyState
              title="No products found"
              description="Try adjusting your filters or search criteria"
              action={
                <Button
                  color="primary"
                  variant="filled"
                  onClick={() => {
                    resetFilters();
                    handleClearSort();
                  }}
                >
                  Clear all filters
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

