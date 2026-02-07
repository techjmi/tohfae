/**
 * ProductsClient Component
 * 
 * Client-side wrapper for products page
 * Manages all state (filters, sort, pagination) and passes to child components
 * 
 * Architecture:
 * Page (Server) → ProductsClient (Client) → Header/Grid/Filters (Presentational)
 */
"use client";

import { usePathname } from 'next/navigation';
import { useFilters } from '@/shared/hooks/state/useFilters';
import { useSort } from '@/shared/hooks/state/useSort';
import ProductListHeader from '../features/products/components/ProductsListHearder';
import { PRODUCTS } from '@/app/features/products/products.constant';

const ProductsClient = () => {
  const pathname = usePathname();
  
  // ============================================
  // STATE MANAGEMENT (All in one place)
  // ============================================
  
  // Filter state
  const {
    filters,
    applyFilter,
    removeFilter,
    resetFilters,
  } = useFilters({});
  
  // Sort state with products data
  const {
    sortedData: products,
    sortBy,
    sortDirection,
    applySort,
  } = useSort(PRODUCTS, {
    initialSortBy: 'pricing.sellingPrice',
    initialSortDirection: 'asc',
  });
  
  // ============================================
  // EVENT HANDLERS (Business logic)
  // ============================================

  const handleSortChange = (value, direction) => {
    applySort(value, direction);
  };

  const handleClearSort = () => {
    applySort('', 'asc'); // Reset to default/no sort
  };

  const handleFilterClick = (filterType, value) => {
    // For category filters, use the value itself as the key (e.g., 'tshirt', 'mug')
    // This allows multiple categories to be selected at once
    if (filters[value]) {
      // If already selected, remove it
      removeFilter(value);
    } else {
      // If not selected, add it
      applyFilter(value, true);
    }
  };

  // ============================================
  // RENDER (Presentational components)
  // ============================================

  return (
    <div className="min-h-screen">
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
        
        {/* TODO: Product Grid */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded">
                <h3>{product.name}</h3>
                <p>${product.pricing.sellingPrice}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsClient;

