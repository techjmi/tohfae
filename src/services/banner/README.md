## Banner Service

## Overview

The Banner Service provides API methods for fetching active banners from the backend. It handles data fetching, transformation, and mapping to the banner contract format. The service is designed to work with the useFetch hook for state management and supports various query parameters for filtering banners.

## Features

- Fetch active banners from backend API
- Support for multiple query parameters (page, category, type, position)
- Automatic data mapping to contract format
- Error handling
- Works seamlessly with useFetch hook

## File Structure

```
banner/
├── banner.service.js      # API service methods
├── banner.mapper.js       # Data transformation
├── banner.constant.js     # Constants and re-exports
├── index.js               # Module exports
└── README.md              # Documentation
```

## Usage

### Basic Usage with useFetch Hook

```jsx
import { useFetch } from '@/shared/hooks/api/useFetch';
import { getActiveBanners } from '@/services/banner';

function HomePage() {
  // Auto-fetch banners for home page
  const { data: banners, loading, error } = useFetch(
    getActiveBanners,
    { page: 'home' }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {banners?.map(banner => (
        <Card key={banner.id} data={banner} variant="banner" />
      ))}
    </div>
  );
}
```

### Fetch Banners for Specific Category

```jsx
import { useFetch } from '@/shared/hooks/api/useFetch';
import { getActiveBanners } from '@/services/banner';

function ProductsPage({ category }) {
  const { data: banners, loading, error } = useFetch(
    getActiveBanners,
    { 
      page: 'products',
      category: category 
    }
  );

  return (
    <div>
      {banners?.map(banner => (
        <Card key={banner.id} data={banner} variant="banner" />
      ))}
    </div>
  );
}
```

### Filter by Type (Hero Banners)

```jsx
const { data: heroBanners, loading, error } = useFetch(
  getActiveBanners,
  { 
    page: 'home',
    type: 'hero' 
  }
);
```

### Filter by Position (Inline Banners)

```jsx
const { data: inlineBanners, loading, error } = useFetch(
  getActiveBanners,
  { 
    page: 'products',
    position: 'inline' 
  }
);
```

### Manual Refetch

```jsx
const { data: banners, loading, error, refetch } = useFetch(
  getActiveBanners,
  { page: 'home' }
);

const handleRefresh = () => {
  refetch(); // Manually refetch banners
};
```

### Disable Auto-Fetch

```jsx
const { data: banners, loading, error, refetch } = useFetch(
  getActiveBanners,
  { page: 'home' },
  { autoFetch: false } // Don't fetch on mount
);

const handleLoadBanners = () => {
  refetch(); // Fetch when needed
};
```

### With Success and Error Callbacks

```jsx
const { data: banners, loading, error } = useFetch(
  getActiveBanners,
  { page: 'home' },
  {
    onSuccess: (data) => {
      console.log('Banners loaded:', data);
    },
    onError: (error) => {
      console.error('Failed to load banners:', error);
    }
  }
);
```

## API Reference

### getActiveBanners(params)

Fetches active banners from the backend API.

**Parameters:**
- `params` (Object) - Query parameters for filtering
  - `page` (String) - Target page (home, products, category, etc.)
  - `category` (String, optional) - Category filter
  - `type` (String, optional) - Banner type filter (hero, promotional, etc.)
  - `position` (String, optional) - Position filter (top, inline, etc.)

**Returns:**
- `Promise<Array>` - Array of banners in contract format

**Example:**
```javascript
const banners = await getActiveBanners({ page: 'home' });
```

## Query Parameters

### page
Target page for banner display.
- `home` - Home page
- `products` - Product listing pages
- `category` - Category pages
- `all` - All pages

### category
Filter banners by category (optional).
- Example: `tshirt`, `mug`, `frame`

### type
Filter banners by type (optional).
- `hero` - Hero carousel banners
- `promotional` - Promotional banners
- `inline` - Inline banners
- `category` - Category-specific banners

### position
Filter banners by position (optional).
- `top` - Top of page
- `inline` - Inline with content
- `bottom` - Bottom of page

## Data Structure

The service returns banners in the contract format defined in `@/contract/banner.contract.js`.

Each banner object contains:
- `id` - Unique banner ID
- `title` - Banner title
- `type` - Banner type
- `status` - Banner status
- `content` - Content (heading, subheading, image, etc.)
- `cta` - Call to action configuration
- `display` - Display configuration
- `targeting` - Targeting rules
- `scheduling` - Schedule configuration
- `analytics` - Analytics configuration
- `metadata` - Additional metadata

## Integration with Card Component

The banner data structure is designed to work seamlessly with the Card component:

```jsx
<Card
  data={{
    image: banner.content.image.desktop,
    overlay: true,
    overlayOpacity: 0.4,
    heading: banner.content.heading,
    subheading: banner.content.subheading,
    cta: banner.cta,
  }}
  variant="banner"
  image={true}
  header={true}
  footer={true}
  hoverable
/>
```

## Error Handling

The service includes error handling and logging:

```javascript
try {
  const banners = await getActiveBanners({ page: 'home' });
} catch (error) {
  console.error('Error fetching banners:', error);
  // Handle error (show fallback UI, etc.)
}
```

## Constants

All banner-related constants are re-exported from the contract:

```javascript
import { 
  BANNER_TYPE,
  BANNER_STATUS,
  BANNER_POSITION,
  BANNER_TARGET_PAGE 
} from '@/services/banner';
```

