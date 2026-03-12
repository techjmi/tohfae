# Banner Component

Generic banner component built using the Card component. Same size as Card - perfect for product grids, category pages, and inline placements.

## Features

- Card-based: Uses shared Card component for consistency
- Multiple Layouts: Horizontal, vertical, image-only
- Flexible CTAs: URL links, drawer triggers, modal triggers, custom actions
- Responsive Images: Uses OptimizedImage for multi-device support
- Custom Styling: Background colors, text colors
- Closeable: Optional close button
- Generic: Works anywhere Cards work

---

## Usage

### Basic Banner
```jsx
import { Banner } from '@/shared/ui/banner';

<Banner banner={bannerData} />
```

### With Custom CTA Handler (Drawer/Modal)
```jsx
const handleBannerClick = (banner, cta) => {
  // Open drawer, modal, or custom action
  openDrawer(banner.content);
};

<Banner 
  banner={bannerData} 
  onCtaClick={handleBannerClick}
/>
```

### Different Layouts
```jsx
// Horizontal (default) - Image on left, content on right
<Banner banner={bannerData} layout="horizontal" />

// Vertical - Image on top, content below
<Banner banner={bannerData} layout="vertical" />

// Image Only - Just the image with overlay text
<Banner banner={bannerData} layout="image-only" />
```

### Closeable Banner
```jsx
<Banner 
  banner={bannerData} 
  closeable={true}
  onClose={() => console.log('Banner closed')}
/>
```

### Without Image
```jsx
<Banner banner={bannerData} showImage={false} />
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `banner` | Object | required | Banner data from banner contract |
| `layout` | string | 'horizontal' | Layout type: 'horizontal', 'vertical', 'image-only' |
| `showImage` | boolean | true | Show/hide banner image |
| `closeable` | boolean | false | Show close button |
| `onClose` | function | - | Close handler callback |
| `onCtaClick` | function | - | Custom CTA click handler (for drawer/modal) |
| `className` | string | '' | Additional CSS classes |

---

## Banner Data Structure

```javascript
const banner = {
  id: 'banner-1',
  title: 'Flash Sale Banner',
  type: 'promotional',
  
  content: {
    heading: '50% Off All Mugs!',
    subheading: 'Limited time offer',
    description: 'Get amazing discounts on all mug products',
    image: {
      desktop: 'https://...desktop.jpg',
      tablet: 'https://...tablet.jpg',
      mobile: 'https://...mobile.jpg',
      alt: 'Mug sale banner'
    },
    backgroundColor: '#FF6B6B',
    textColor: '#FFFFFF'
  },
  
  cta: {
    enabled: true,
    type: 'category_page',  // or 'internal_link', 'modal', 'custom_action'
    text: 'Shop Now',
    url: '/products?category=mugs',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    openInNewTab: false
  }
};
```

---

## CTA Types

### 1. URL Link (Internal/External)
```javascript
cta: {
  enabled: true,
  type: 'internal_link',  // or 'external_link'
  text: 'Shop Now',
  url: '/products',
  openInNewTab: false
}
```

### 2. Drawer Trigger
```javascript
cta: {
  enabled: true,
  type: 'custom_action',
  text: 'View Details'
}

// In component:
<Banner 
  banner={banner}
  onCtaClick={(banner, cta) => openDrawer(banner.content)}
/>
```

### 3. Modal Trigger
```javascript
cta: {
  enabled: true,
  type: 'modal',
  text: 'Learn More'
}

// In component:
<Banner 
  banner={banner}
  onCtaClick={(banner, cta) => openModal(banner.content)}
/>
```

### 4. Product/Category Page
```javascript
cta: {
  enabled: true,
  type: 'category_page',  // or 'product_page'
  text: 'Explore',
  url: '/products',
  params: { category: 'mugs' }
}
```

---

## Examples

### In Product Grid
```jsx
import { Banner } from '@/shared/ui/banner';
import ProductCard from '@/app/products/components/ProductCard';

{items.map((item) => {
  if (item.type === 'banner') {
    return <Banner key={item.id} banner={item.data} />;
  }
  return <ProductCard key={item.id} product={item.data} />;
})}
```


