# Products Page Documentation

## Overview

The products page follows clean architecture principles with complete separation of concerns, centralized constants, and reusable components.

## Architecture

```
products/
├── page.js                      # Server component (SSR)
├── ProductsClient.jsx           # Client component (state management)
├── products.helper.js           # Configuration & helper functions
├── products.style.js            # Centralized CSS constants
├── components/                  # Product list components
│   ├── ProductCard.jsx
│   ├── ProductImage.jsx
│   ├── ProductInfo.jsx
│   ├── ProductPrice.jsx
│   └── ProductsListHearder.jsx
└── [slug]/                      # Product detail page
    ├── page.js                  # Server component for detail page
    ├── ProductsDetails.jsx      # Client component for detail page
    └── components/              # Product detail components
        ├── ProductActions.jsx
        ├── ProductCustomization.jsx
        ├── ProductDescription.jsx
        ├── ProductImageGallery.jsx
        ├── ProductMainInfo.jsx
        ├── ProductPricing.jsx
        ├── ProductReviews.jsx
        ├── ProductVariants.jsx
        └── RelatedProducts.jsx
```

## File Structure

### 1. page.js - Server Component

**Purpose:** Server-side rendering, SEO, data fetching

**Features:**
- SSR for better SEO
- Fetches products from API
- Rich structured data (JSON-LD)
- Comprehensive metadata
- Error handling

**Example:**
```javascript
import { ProductService } from '@/services/product/product.service';
import { PRODUCTS_SEO } from './products.helper';

export const generateMetadata = async () => {
  return buildSeo({
    title: PRODUCTS_SEO.title,
    description: PRODUCTS_SEO.description,
    keywords: PRODUCTS_SEO.keywords,
    canonical: PRODUCTS_SEO.canonical,
    noindex: PRODUCTS_SEO.noindex,
  });
};

const ProductsPage = async () => {
  const products = await getProductsData();
  return (
    <>
      <JsonLd data={PRODUCTS_SEO.jsonLd} />
      <ProductsClient products={products} />
    </>
  );
};
```

### 2. ProductsClient.jsx - Client Component

**Purpose:** Client-side state management, filtering, sorting

**Features:**
- Filter management (category, price, rating)
- Sort management (price, rating, date)
- Pagination support
- Empty state handling
- Uses centralized style constants

**State Management:**
- useFilters - Category filters
- useSort - Sort by price, rating, date

### 3. products.helper.js - Configuration & Helpers

**Purpose:** All configuration, constants, and helper functions

**Exports:**
- PRODUCTS_SEO - SEO configuration with JSON-LD
- PRODUCT_PAGINATION - Pagination constants
- PRODUCT_SORT_OPTIONS - Sort options
- PRODUCT_FILTER_CHIPS - Category filters
- PRODUCT_RATING_FILTERS - Rating filters
- PRODUCT_PRICE_RANGE - Price range config
- formatPrice() - Price formatting helper
- calculateDiscountPercentage() - Discount calculation
- isProductInStock() - Stock check helper
- getStockStatusLabel() - Stock status label
- PRODUCTS_TEXT - All UI text constants

### 4. products.style.js - Style Constants

**Purpose:** Centralized CSS classes for all components

**Exports:**
- PRODUCTS_PAGE_STYLES - Page container styles
- PRODUCTS_GRID_STYLES - Grid layout styles
- PRODUCTS_HEADER_STYLES - Header section styles
- FILTER_CHIP_STYLES - Filter chip styles
- SORT_DROPDOWN_STYLES - Sort dropdown styles
- EMPTY_STATE_STYLES - Empty state styles
- LOADING_STATE_STYLES - Loading skeleton styles
- PAGINATION_STYLES - Pagination styles
- FILTER_PANEL_STYLES - Filter panel styles
- PRICE_RANGE_STYLES - Price range slider styles
- RATING_FILTER_STYLES - Rating filter styles
- ACTIVE_FILTERS_STYLES - Active filters display
- PRODUCT_CARD_HOVER - Hover effects

### 5. components/ - Product List Components

**Purpose:** Reusable components for product listing page

**Components:**
- ProductCard.jsx - Individual product card
- ProductImage.jsx - Product image with lazy loading
- ProductInfo.jsx - Product information display
- ProductPrice.jsx - Product pricing display
- ProductsListHearder.jsx - Page header with filters and sort

### 6. [slug]/components/ - Product Detail Components

**Purpose:** Components specific to product detail page

**Components:**
- ProductActions.jsx - Add to cart, wishlist actions
- ProductCustomization.jsx - Product customization options
- ProductDescription.jsx - Product description and details
- ProductImageGallery.jsx - Image gallery with zoom
- ProductMainInfo.jsx - Main product information
- ProductPricing.jsx - Detailed pricing information
- ProductReviews.jsx - Customer reviews and ratings
- ProductVariants.jsx - Product variants (size, color, etc.)
- RelatedProducts.jsx - Related products carousel

## SEO Configuration

### Metadata
- Rich title with keywords
- Comprehensive description (160 chars)
- 15+ targeted keywords
- Canonical URL
- Open Graph tags
- Twitter Card tags
- noindex: false (products should be indexed)

### JSON-LD Structured Data
- CollectionPage schema
- BreadcrumbList schema
- WebSite schema
- Organization schema
- ItemList schema

## Data Flow

```
1. Server (page.js)
   ↓
   Fetch products from API (ProductService.getAll())
   ↓
   Pass to ProductsClient
   ↓
2. Client (ProductsClient.jsx)
   ↓
   Apply filters & sort
   ↓
   Render ProductCard components
```

## API Integration

### Product Service
```javascript
import { ProductService } from '@/services/product/product.service';

// Get all products
const products = await ProductService.getAll();

// Get with filters
const filtered = await ProductService.getAll({
  category: 'tshirt',
  sort: 'price_asc',
  page: 1,
  limit: 12
});
```

### Product Mapper
The product mapper transforms API response to frontend format:

**API Response:**
```json
{
  "sku": "TSH-001",
  "category": "tshirt",
  "basic": { "name": "Custom T-Shirt", ... },
  "media": { "images": [...], ... },
  "pricing": { "sellingPrice": 900, ... },
  "inventory": { "inStock": true, ... }
}
```

**Mapped Format:**
```javascript
{
  id: "...",
  slug: "...",
  basic: { name, shortDescription, description, brand },
  media: { images, thumbnail, videos },
  pricing: { sellingPrice, mrp, discount, ... },
  inventory: { inStock, quantity, available, ... },
  rating: { average, count, distribution }
}
```

## Helper Functions

### Price Formatting
```javascript
import { formatPrice } from './products.helper';

formatPrice(900); // "₹900"
formatPrice(1500, 'USD'); // "$1,500"
```

### Discount Calculation
```javascript
import { calculateDiscountPercentage } from './products.helper';

calculateDiscountPercentage(1000, 900); // 10
```

### Stock Status
```javascript
import { isProductInStock, getStockStatusLabel } from './products.helper';

isProductInStock(inventory); // true/false
getStockStatusLabel(inventory); // "In Stock" | "Only 5 left" | "Out of Stock"
```

## Usage Examples

### Adding New Filter
1. Add filter option to `PRODUCT_FILTER_CHIPS` in `products.helper.js`
2. Update filter logic in `ProductsClient.jsx`
3. Use `FILTER_CHIP_STYLES` for styling

### Adding New Sort Option
1. Add sort option to `PRODUCT_SORT_OPTIONS` in `products.helper.js`
2. Update sort logic in `ProductsClient.jsx`
3. Use `SORT_DROPDOWN_STYLES` for styling

### Customizing Styles
All styles are in `products.style.js`. Update constants instead of inline CSS.

## Best Practices

1. Always use constants - Never hardcode text or styles
2. Use helper functions - For price, discount, stock calculations
3. Follow naming conventions - PRODUCTS_* for constants
4. Server-side data fetching - Use SSR for better SEO
5. Error handling - Always handle API errors gracefully
6. Accessibility - Use semantic HTML and ARIA labels
7. SEO optimization - Rich metadata and structured data

## Testing

### Test Product Data
Use the provided test data structure:
```bash
POST http://localhost:8000/api/products
Content-Type: application/json

{
  "sku": "TSH-001",
  "category": "tshirt",
  "basic": { ... },
  "media": { ... },
  "pricing": { ... },
  "inventory": { ... }
}
```

## Maintenance

### Adding New Product Fields
1. Update product mapper in `product.mapper.js`
2. Update ProductCard component if needed
3. Update helper functions if needed
4. Update documentation

### Updating SEO
1. Update `PRODUCTS_SEO` in `products.helper.js`
2. Test with Google Rich Results Test
3. Validate JSON-LD with Schema.org validator

## Related Files

- `/services/product/product.service.js` - Product API service
- `/services/product/product.mapper.js` - Data transformation
- `/app/features/products/components/ProductCard.jsx` - Product card component
- `/shared/hooks/state/useFilters.js` - Filter hook
- `/shared/hooks/state/useSort.js` - Sort hook

## Support

For questions or issues, refer to:
- Product service documentation
- Component usage guidelines
- Clean architecture principles

