"use client";
import { usePathname } from 'next/navigation';
import { useFilters } from '@/shared/hooks/state/useFilters';
import { useSort } from '@/shared/hooks/state/useSort';
import ProductListHeader from './components/ProductsListHearder';
import ProductCard from './components/ProductCard';
import { Banner, insertBannersIntoList } from '@/shared/ui/banner';
import EmptyState from '@/shared/ui/empty-state';
import Button from '@/shared/ui/button';
import { PRODUCTS_TEXT } from './products.helper';
import { PRODUCTS_PAGE_STYLES, PRODUCTS_GRID_STYLES } from './products.style';

const ProductsClient = ({ products: initialProducts, banners = [] }) => {
  const pathname = usePathname();
  const {
    filters,
    applyFilter,
    removeFilter,
    resetFilters,
  } = useFilters({});

  const {
    sortedData: sortedProducts,
    sortBy,
    sortDirection,
    applySort,
  } = useSort(initialProducts, {
    initialSortBy: 'pricing.sellingPrice',
    initialSortDirection: 'asc',
  });

  const filteredProducts = (sortedProducts || []).filter((product) => {
    const selectedCategories = Object.keys(filters).filter(key => filters[key] === true);
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(product?.category);
  });

  const itemsWithBanners = insertBannersIntoList(filteredProducts, banners);

  const handleSortChange = (value, direction) => {
    applySort(value, direction);
  };

  const handleClearSort = () => {
    applySort('', 'asc');
  };

  const handleFilterClick = (_filterType, value) => {
    if (filters[value]) {
      removeFilter(value);
    } else {
      applyFilter(value, true);
    }
  };

  return (
    <div className={PRODUCTS_PAGE_STYLES.CONTAINER}>
      <div className={PRODUCTS_PAGE_STYLES.INNER_CONTAINER}>
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

        <div className={PRODUCTS_GRID_STYLES.CONTAINER}>
          <div className={PRODUCTS_GRID_STYLES.RESULTS_COUNT}>
            <p className={PRODUCTS_GRID_STYLES.RESULTS_TEXT}>
              {PRODUCTS_TEXT.SHOWING_RESULTS} <span className={PRODUCTS_GRID_STYLES.RESULTS_NUMBER}>{filteredProducts.length}</span> {PRODUCTS_TEXT.PRODUCTS_TEXT}
            </p>
          </div>

          {filteredProducts?.length > 0 ? (
            <div className={PRODUCTS_GRID_STYLES.GRID}>
              {itemsWithBanners.map((item, index) => {
                if (item.type === 'banner') {
                  return <Banner key={item.id} banner={item.data} />;
                }
                return <ProductCard key={item.id || index} product={item.data} />;
              })}
            </div>
          ) : (
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

