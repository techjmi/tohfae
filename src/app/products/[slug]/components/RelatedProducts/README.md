## RelatedProducts Component

## Overview

The RelatedProducts component displays a carousel of related or similar products on the product detail page. It uses the shared Carousel component and ProductCard component to create an engaging, scrollable product recommendation section. The component is designed to be dynamic and ready for API integration to fetch related products.

## Features

- Horizontal scrollable carousel of related products
- Uses ProductCard component for consistent product display
- Configurable number of slides per view
- Navigation arrows (shown when more than 4 products)
- Loop functionality for seamless scrolling
- Responsive layout with different slides per view on different screen sizes
- Customizable section title
- Auto-hides when no products are available
- Ready for API integration to fetch related products dynamically

## File Structure

```
RelatedProducts/
├── RelatedProducts.jsx           # Main component
├── RelatedProducts.constants.js  # Configuration and constants
├── RelatedProducts.css           # Component styles
├── index.js                      # Module exports
└── README.md                     # Documentation
```

## Usage

```jsx
import RelatedProducts from '@/app/products/[slug]/components/RelatedProducts';

<RelatedProducts
  products={relatedProducts}
  title="You May Also Like"
/>
```

## Props

### products (Array, required)
Array of product objects to display. Each product should have the structure expected by the ProductCard component.

Example:
```javascript
[
  {
    id: 'prod-1',
    basic: {
      name: 'Product Name',
      slug: 'product-slug',
      images: ['image1.jpg']
    },
    pricing: {
      sellingPrice: 999,
      mrp: 1299,
      discount: { value: 23 }
    },
    rating: {
      average: 4.5,
      count: 120
    }
  },
  // ... more products
]
```

### title (String, optional)
Section title to display above the carousel. Defaults to "Related Products".

Common titles:
- "Related Products"
- "You May Also Like"
- "Similar Products"
- "Recommended For You"

### className (String, optional)
Additional CSS classes to apply to the container.

## Constants

All configuration is centralized in `RelatedProducts.constants.js`:

### DEFAULT_TITLE
Default section title: "Related Products"

### CAROUSEL_CONFIG
Carousel configuration object:
- `SLIDES_PER_VIEW`: Number of products to show at once (4)
- `SPACE_BETWEEN`: Space between slides in pixels (20)
- `HEIGHT`: Carousel height ('auto')
- `AUTOPLAY`: Auto-scroll enabled (false)
- `DOTS`: Show pagination dots (false)
- `MIN_PRODUCTS_FOR_LOOP`: Minimum products needed for loop (4)
- `MIN_PRODUCTS_FOR_ARROWS`: Minimum products needed for arrows (4)

### CAROUSEL_BREAKPOINTS
Responsive breakpoints configuration:
- `MOBILE` (640px): 1 slide per view
- `TABLET` (768px): 2 slides per view
- `DESKTOP` (1024px): 3 slides per view
- `LARGE` (1280px): 4 slides per view

### CSS_CLASSES
CSS class names used in the component:
- `CAROUSEL`: 'related-products-carousel'
- `PRODUCT_WRAPPER`: 'px-2'

### LABELS
Predefined title options:
- `DEFAULT_TITLE`: "Related Products"
- `YOU_MAY_ALSO_LIKE`: "You May Also Like"
- `SIMILAR_PRODUCTS`: "Similar Products"
- `RECOMMENDED_FOR_YOU`: "Recommended For You"

## Styling

The component uses a dedicated CSS file (`RelatedProducts.css`) with the following classes:

- `.related-products-container`: Main container
- `.related-products-title`: Section title styling
- `.related-products-carousel`: Carousel wrapper
- `.product-card-wrapper`: Individual product card wrapper with padding
- `.carousel-item`: Ensures consistent height for carousel items

Responsive styles:
- Mobile (max-width: 640px): Smaller title font size
- Tablet (max-width: 768px): Adjusted carousel margins

## Behavior

### Product Display
- Shows products in a horizontal scrollable carousel
- Each product is rendered using the ProductCard component
- Products maintain consistent height and spacing

### Carousel Navigation
- Navigation arrows appear when there are more than 4 products
- Loop functionality enables seamless infinite scrolling
- Smooth transitions between slides
- Touch/swipe support on mobile devices

### Responsive Behavior
- Desktop (1280px+): Shows 4 products at once
- Laptop (1024px): Shows 3 products at once
- Tablet (768px): Shows 2 products at once
- Mobile (640px): Shows 1 product at once

### Empty State
- Component returns null when no products are provided
- Gracefully handles empty product arrays

## Shared Components Used

- **ProductCard** from `@/app/products/components` - Individual product display
- **Carousel** from `@/shared/utils/carousel` - Carousel functionality

## API Integration Ready

The component is designed to be dynamic and ready for API integration:

1. **products prop**: Can receive data from API calls
2. **Dynamic rendering**: Maps over products array to create carousel items
3. **Flexible data structure**: Works with any product data that matches ProductCard requirements

Example future implementation:
```jsx
// Future: Fetch related products from API
const [relatedProducts, setRelatedProducts] = useState([]);

useEffect(() => {
  fetchRelatedProducts(productId).then(setRelatedProducts);
}, [productId]);

<RelatedProducts
  products={relatedProducts}
  title="You May Also Like"
/>
```

## Accessibility

- Semantic HTML structure
- Keyboard navigation support through Carousel component
- Touch/swipe support for mobile users
- Clear visual hierarchy with title

## Performance Considerations

- Lazy loading of product images through ProductCard
- Efficient carousel rendering
- Conditional rendering (returns null when empty)
- Optimized for smooth scrolling

## Future Enhancements

- Fetch related products from recommendation API
- Personalized recommendations based on user behavior
- A/B testing for different recommendation algorithms
- Track click-through rates on related products
- Add "Add to Cart" quick action on hover
- Skeleton loading state while fetching products
- Error handling for failed API calls
- Infinite scroll for large product sets
- Filter related products by category or tags
- Show "Recently Viewed" products as alternative

