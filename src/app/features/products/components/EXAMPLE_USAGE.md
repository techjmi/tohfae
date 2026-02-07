# ProductListHeader Component - Usage Guide

## Overview
The `ProductListHeader` component provides a complete header section for product listing pages with breadcrumb navigation, sort controls, and active filter chips.

---

## Features

✅ **Breadcrumb Navigation** - Automatic breadcrumb from pathname  
✅ **Three Sort Dropdowns** - Price, Rating, Arrival  
✅ **Filter Chips** - Display active filters with remove functionality  
✅ **Clear All Button** - Remove all filters at once  
✅ **Responsive Design** - Mobile-friendly layout  
✅ **Dark Mode Support** - Automatic theme adaptation

---

## Basic Usage

```jsx
"use client";

import { usePathname } from 'next/navigation';
import { useFilters } from '@/shared/hooks/state/useFilters';
import { useSort } from '@/shared/hooks/state/useSort';
import ProductListHeader from '@/app/features/products/components/ProductListHeader';

export default function ProductsPage() {
  const pathname = usePathname();
  
  // Filter state
  const {
    filters,
    removeFilter,
    resetFilters,
  } = useFilters({});
  
  // Sort state
  const {
    sortBy,
    sortDirection,
    applySort,
  } = useSort([], {
    initialSortBy: 'pricing.sellingPrice',
    initialSortDirection: 'asc',
  });
  
  // Handle sort change
  const handleSortChange = (value, direction) => {
    applySort(value, direction);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductListHeader
        pathname={pathname}
        filters={filters}
        onRemoveFilter={removeFilter}
        onClearAllFilters={resetFilters}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
      
      {/* Your product grid here */}
    </div>
  );
}
```

---

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `pathname` | string | Yes | - | Current URL pathname for breadcrumbs |
| `filters` | object | No | `{}` | Active filters object |
| `onRemoveFilter` | function | No | - | Callback when filter chip is removed |
| `onClearAllFilters` | function | No | - | Callback to clear all filters |
| `sortBy` | string | No | `''` | Current sort field |
| `sortDirection` | string | No | `'asc'` | Current sort direction |
| `onSortChange` | function | No | - | Callback when sort option is selected |
| `className` | string | No | `''` | Additional CSS classes |

---

## Sort Options

The component includes three pre-configured sort dropdowns:

### 1. Sort by Price
- Price: Low to High (`pricing.sellingPrice`, `asc`)
- Price: High to Low (`pricing.sellingPrice`, `desc`)

### 2. Sort by Rating
- Rating: High to Low (`ratings.average`, `desc`)
- Rating: Low to High (`ratings.average`, `asc`)

### 3. Sort by Arrival
- Newest First (`createdAt`, `desc`)
- Oldest First (`createdAt`, `asc`)

---

## Filter Labels

Customize filter labels by editing the `FILTER_LABELS` object in the component:

```javascript
const FILTER_LABELS = {
  category: 'Category',
  tshirt: 'T-Shirts',
  mug: 'Mugs',
  frame: 'Frames',
  // Add your custom labels here
};
```

---

## Complete Example with Filtering

```jsx
"use client";

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useFilters } from '@/shared/hooks/state/useFilters';
import { useSort } from '@/shared/hooks/state/useSort';
import ProductListHeader from '@/app/features/products/components/ProductListHeader';
import { PRODUCTS } from '@/contract/product.contract';

export default function ProductsPage() {
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
    sortedData: products,
    sortBy,
    sortDirection,
    applySort,
  } = useSort(PRODUCTS, {
    initialSortBy: 'pricing.sellingPrice',
    initialSortDirection: 'asc',
  });
  
  // Handle sort change
  const handleSortChange = (value, direction) => {
    applySort(value, direction);
  };
  
  // Example: Apply filter from sidebar
  const handleCategorySelect = (category) => {
    applyFilter('category', category);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductListHeader
        pathname={pathname}
        filters={filters}
        onRemoveFilter={removeFilter}
        onClearAllFilters={resetFilters}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

---

## Customization

### Change Sort Options

Edit the `SORT_OPTIONS` object in the component:

```javascript
const SORT_OPTIONS = {
  PRICE: [
    { label: 'Price: Low to High', value: 'pricing.sellingPrice', direction: 'asc' },
    { label: 'Price: High to Low', value: 'pricing.sellingPrice', direction: 'desc' },
  ],
  // Add more sort categories
};
```

### Styling

Add custom classes via the `className` prop:

```jsx
<ProductListHeader
  pathname={pathname}
  className="bg-gray-50 p-4 rounded-lg"
  // ... other props
/>
```

