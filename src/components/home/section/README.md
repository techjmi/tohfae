# Home Page Sections

This folder contains all landing page sections that display different product collections (New Arrivals, Trending, Featured, Best Sellers, Deals).

**Mobile Experience:** Sections use horizontal auto-scroll on mobile devices for a smooth, continuous browsing experience.

## Folder Structure

```
section/
├── common/
│   └── SectionHeader.jsx        # Reusable section header component
├── newArrival/
│   ├── NewArrivals.jsx          # New Arrivals section component
│   ├── newArrival-constant.js   # API params and UI config
│   └── newArrival.css           # Custom styles (animations, tracking, etc.)
├── trending/
│   ├── Trending.jsx
│   └── trending-constant.js
├── featured/
│   ├── Featured.jsx
│   └── featured-constant.js
├── bestSeller/
│   ├── BestSeller.jsx
│   └── best-seller-constant.js
├── dealsSection/
│   ├── Deals.jsx
│   └── deals-constant.js
├── Section.jsx                  # Main wrapper component
└── index.js                     # Exports all sections
```

## How It Works

### Data Flow

```
1. app/page.js (Server Component)
   - Fetches ALL section data in parallel using Promise.all()
   - Better performance (parallel API calls)
   - Server-side rendering for SEO
   ↓
2. Section.jsx (Wrapper Component)
   - Receives all data as props
   - Distributes data to individual sections
   ↓
3. Individual Section Components (NewArrivals, Trending, etc.)
   - Receives products array as props
   - Uses SectionHeader for title/subtitle/link
   - Maps products to ProductCard components
   ↓
4. ProductCard (Shared Component)
   - Displays individual product
   - Handles image, price, rating, etc.
```

### Key Components

**1. page.js** - Fetches all data in parallel
**2. Section.jsx** - Distributes data to sections
**3. SectionHeader** - Reusable header (title, subtitle, "View All" link)
**4. Individual Sections** - Display products in responsive grid
**5. Constants Files** - API parameters and UI configuration

---

## How to Add a New Section

Follow these steps to add a new section (e.g., Trending Products):

### Step 1: Create Constants File

Create `trending/trending-constant.js`:

```javascript
export const TRENDING_API_PARAMS = {
    tags: 'trending',
    limit: 8,
    sort: 'popular'
};

export const TRENDING_SECTION_CONFIG = {
    header: 'Trending Products',
    subHeader: 'Most popular items right now',
    viewAllLabel: 'View All',
    viewAllLink: '/products?tags=trending',
};
```

### Step 2: Create Section Component

Create `trending/Trending.jsx` (copy from NewArrivals.jsx):

```javascript
"use client";

import React from 'react';
import ProductCard from '@/app/products/components/ProductCard';
import SectionHeader from '../common/SectionHeader';
import { HorizontalScroll } from '@/shared/ui/horizontal-scroll';
import { useDevice } from '@/shared/hooks/useDevice';
import { TRENDING_SECTION_CONFIG } from './trending-constant';

const Trending = ({ products = [] }) => {
  const { isMobile } = useDevice();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          title={TRENDING_SECTION_CONFIG.header}
          subtitle={TRENDING_SECTION_CONFIG.subHeader}
          viewAllLink={TRENDING_SECTION_CONFIG.viewAllLink}
          viewAllLabel={TRENDING_SECTION_CONFIG.viewAllLabel}
        />

        {/* Mobile: Horizontal Scroll */}
        {isMobile ? (
          <HorizontalScroll
            speed={1}
            gap={16}
            loop={true}
            stopOnMouseEnter={true}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id || product._id || product.slug}
                product={product}
              />
            ))}
          </HorizontalScroll>
        ) : (
          /* Desktop: Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id || product._id || product.slug}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Trending;
```

### Step 3: Update page.js

Add the new section to the parallel fetch:

```javascript
// app/page.js
import { TRENDING_API_PARAMS } from '@/components/home/section/trending/trending-constant';

export default async function Home() {
  const [heroCarouselData, newArrivalProducts, trendingProducts] = await Promise.all([
    getActiveBanners({ page: 'home' }),
    ProductService.getAll(NEW_ARRIVAL_API_PARAMS),
    ProductService.getAll(TRENDING_API_PARAMS), // Add this
  ]);

  return (
    <div className="flex flex-col">
      <HeroCarousel apiBanners={heroCarouselData} />
      <Section
        newArrivalProducts={newArrivalProducts}
        trendingProducts={trendingProducts} // Add this
      />
    </div>
  );
}
```

### Step 4: Update Section.jsx

Add the new section to the wrapper:

```javascript
// Section.jsx
import { NewArrivals, Trending } from './index';

const Section = ({
  newArrivalProducts = [],
  trendingProducts = [] // Add this
}) => {
  return (
    <div className="space-y-0">
      <NewArrivals products={newArrivalProducts} />
      <Trending products={trendingProducts} /> {/* Add this */}
    </div>
  );
};
```

### Step 5: Export from index.js

```javascript
// index.js
export { default as NewArrivals } from './newArrival/NewArrivals';
export { default as Trending } from './trending/Trending'; // Add this
```

---

## API Parameters

Use these parameters when fetching products from the backend:

### By Tags
```javascript
{ tags: 'new-arrival', limit: 8, sort: 'newest' }   // New Arrivals
{ tags: 'trending', limit: 8, sort: 'popular' }     // Trending
{ tags: 'bestseller', limit: 8 }                     // Best Sellers
{ tags: 'featured', limit: 8 }                       // Featured
{ tags: 'sale', limit: 8 }                           // Deals/Sale
```

### By Featured Flag
```javascript
{ featured: true, limit: 8 }
```

### By Category
```javascript
{ category: 'tshirt', limit: 4 }
{ category: 'mug', limit: 4 }
```

### Sorting Options
```javascript
sort: 'newest'      // New arrivals
sort: 'popular'     // Trending
sort: 'price_asc'   // Low to high
sort: 'rating'      // Top rated
```

---

## Available Sections

1. **New Arrivals** - Use `tags: 'new-arrival'`
2. **Trending Products** - Use `tags: 'trending'`
3. **Featured Products** - Use `featured: true` or `tags: 'featured'`
4. **Best Sellers** - Use `tags: 'bestseller'`
5. **Deals/Sale** - Use `tags: 'sale'`

---

## Styling Guidelines

**Background Colors** - Alternate for visual separation:
- Section 1 (New Arrivals): `bg-white`
- Section 2 (Trending): `bg-gray-50`
- Section 3 (Featured): `bg-white`
- Section 4 (Best Sellers): `bg-gray-50`

**Spacing**:
- Section padding: `py-12`
- Container: `container mx-auto px-4`
- Grid gap: `gap-6`

**Responsive Grid**:
```
grid-cols-1           // Mobile (1 column)
sm:grid-cols-2        // Small screens (2 columns)
md:grid-cols-3        // Medium screens (3 columns)
lg:grid-cols-4        // Large screens (4 columns)
```

---

## Reference Implementation

The `newArrival/` folder contains a complete reference implementation that demonstrates the pattern used for all sections.

---

## Technical Details

**Shared Components**:
- `ProductCard` - `@/app/products/components/ProductCard`
- `SectionHeader` - `common/SectionHeader`
- `HorizontalScroll` - `@/shared/ui/horizontal-scroll` (mobile auto-scroll)
- `Icon` - `@/shared/icons`

**Hooks**:
- `useDevice` - `@/shared/hooks/useDevice` (mobile/tablet/desktop detection)

**Performance**:
- Data fetching happens in `page.js` using `Promise.all()` for parallel API calls
- Server-side rendering for better SEO and initial load time
- Mobile horizontal scroll uses Embla Carousel with auto-scroll plugin

**Mobile Experience**:
- Continuous auto-scroll on mobile (not slide-by-slide carousel)
- Smooth, slow motion for better browsing
- User can manually scroll by touch/drag
- Auto-scroll pauses on interaction and resumes after user stops

**Best Practices**:
- Each section returns `null` if no products (prevents empty sections)
- CSS files included for future enhancements (animations, tracking, analytics)
- Consistent naming convention across all sections
- Centralized configuration in constants files
- Responsive design with device-specific layouts

