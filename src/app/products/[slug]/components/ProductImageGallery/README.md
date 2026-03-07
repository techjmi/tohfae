## ProductImageGallery Component

## Overview

The ProductImageGallery component displays product images in an interactive carousel with zoom functionality. It provides a smooth browsing experience for viewing multiple product images with navigation arrows, pagination dots, and hover-to-zoom effects. The component is designed to be dynamic and ready for API integration.

## Features

- Carousel-based image gallery
- Hover-to-zoom effect on images
- Navigation arrows for multiple images
- Pagination dots with orange active state
- Responsive image loading with Next.js Image component
- Priority loading for first image
- Empty state for products without images
- Smooth transitions and animations
- Touch/swipe support on mobile devices
- Optimized image sizes for different screen sizes

## File Structure

```
ProductImageGallery/
├── ProductImageGallery.jsx           # Main component
├── ProductImageGallery.constants.js  # Configuration and constants
├── ProductImageGallery.css           # Component styles
├── index.js                          # Module exports
└── README.md                         # Documentation
```

## Usage

```jsx
import ProductImageGallery from '@/app/products/[slug]/components/ProductImageGallery';

<ProductImageGallery
  images={product.media.images}
  productName={product.basic.name}
/>
```

## Props

### images (Array, required)
Array of image URL strings to display in the gallery.

Example:
```javascript
[
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
]
```

### productName (String, optional)
Product name used for image alt text (important for SEO and accessibility).

### className (String, optional)
Additional CSS classes to apply to the container.

## Constants

All configuration is centralized in `ProductImageGallery.constants.js`:

### GALLERY_CONFIG
Gallery configuration:
- `MAX_WIDTH`: Maximum gallery width in pixels (450)
- `HEIGHT`: Gallery height in pixels (500)
- `ZOOM_SCALE`: Zoom scale factor (1.5)
- `ZOOM_TRANSITION`: Zoom transition timing ('500ms ease-out')

### CAROUSEL_CONFIG
Carousel configuration:
- `SLIDES_PER_VIEW`: Number of images to show at once (1)
- `SPACE_BETWEEN`: Space between slides (0)
- `AUTOPLAY`: Auto-scroll enabled (false)
- `ARROWS_OUTSIDE`: Show arrows outside carousel (true)
- `MIN_IMAGES_FOR_LOOP`: Minimum images needed for loop (1)
- `MIN_IMAGES_FOR_ARROWS`: Minimum images needed for arrows (1)
- `MIN_IMAGES_FOR_DOTS`: Minimum images needed for dots (1)

### PAGINATION_CONFIG
Pagination dots configuration:
- `DOT_SIZE`: Inactive dot size (10px)
- `ACTIVE_DOT_WIDTH`: Active dot width (24px)
- `ACTIVE_DOT_COLOR`: Active dot color ('#f97316' - orange)
- `INACTIVE_DOT_COLOR`: Inactive dot color ('#d1d5db' - gray)
- `BORDER_RADIUS`: Active dot border radius (5px)

### IMAGE_CONFIG
Image configuration:
- `PLACEHOLDER`: Placeholder image path ('/placeholder-product.jpg')
- `SIZES`: Responsive image sizes ('(max-width: 768px) 100vw, 50vw')
- `OBJECT_FIT`: Image object fit ('cover')

### LABELS
Text labels and messages:
- `NO_IMAGES`: "No images available"
- `IMAGE_ALT_PREFIX`: "Image"
- `PRODUCT_DEFAULT`: "Product"

### CSS_CLASSES
CSS class names used in the component:
- `GALLERY`: 'image-gallery'
- `IMAGE_CONTAINER`: 'image-container'
- `IMAGE`: 'gallery-image'
- `IMAGE_ZOOMED`: 'gallery-image-zoomed'
- `EMPTY_STATE`: 'empty-state'
- `EMPTY_TEXT`: 'empty-text'

## Styling

The component uses a dedicated CSS file (`ProductImageGallery.css`) with the following classes:

- `.image-gallery`: Main gallery container with max-width
- `.swiper-pagination-bullet`: Pagination dot styling
- `.swiper-pagination-bullet-active`: Active pagination dot (orange theme)
- `.image-container`: Individual image container with zoom cursor
- `.gallery-image`: Image styling with transition
- `.gallery-image-zoomed`: Zoomed image state (1.5x scale)
- `.empty-state`: Empty state container
- `.empty-text`: Empty state text

Responsive styles:
- Tablet (max-width: 768px): Full width gallery, 400px height
- Mobile (max-width: 640px): 300px height

## Behavior

### Image Display
- Shows one image at a time in carousel
- Uses Next.js Image component for optimization
- Priority loading for first image (faster LCP)
- Responsive image sizes for different screen sizes
- Fallback to placeholder if image URL is missing

### Zoom Effect
- Hover over image to zoom in (1.5x scale)
- Smooth transition animation (500ms)
- Cursor changes to zoom-in on hover
- Zoom state managed with React useState

### Navigation
- Navigation arrows appear when multiple images exist
- Pagination dots appear when multiple images exist
- Active dot is orange and elongated
- Inactive dots are gray and circular
- Loop functionality for seamless browsing

### Empty State
- Shows placeholder message when no images provided
- Maintains gallery height for layout consistency
- Gray background with centered text

## Shared Components Used

- **Carousel** from `@/shared/utils/carousel` - Carousel functionality
- **Image** from `next/image` - Optimized image loading

## API Integration Ready

The component is designed to be dynamic and ready for API integration:

1. **images prop**: Can receive image URLs from API
2. **Dynamic rendering**: Maps over images array to create carousel items
3. **Flexible data structure**: Works with any array of image URLs

Example future implementation:
```jsx
// Future: Fetch product images from API
const [product, setProduct] = useState(null);

useEffect(() => {
  fetchProduct(productId).then(setProduct);
}, [productId]);

<ProductImageGallery
  images={product?.media?.images || []}
  productName={product?.basic?.name}
/>
```

## Accessibility

- Descriptive alt text for all images (includes product name and image number)
- Keyboard navigation support through Carousel component
- Touch/swipe support for mobile users
- Semantic HTML structure
- Proper image loading with Next.js Image

## Performance Considerations

- Next.js Image component for automatic optimization
- Priority loading for first image
- Lazy loading for subsequent images
- Responsive image sizes to reduce bandwidth
- Smooth CSS transitions (GPU-accelerated)

## SEO Considerations

- Descriptive alt text for images
- Proper image optimization with Next.js
- Fast loading with priority first image
- Responsive images for mobile-first indexing

## Future Enhancements

- Full-screen lightbox view
- Pinch-to-zoom on mobile
- Image thumbnails below main image
- 360-degree product view
- Video support in gallery
- Image zoom with magnifying glass
- Download image functionality
- Share image functionality
- Image lazy loading with blur placeholder
- Multiple image views (front, back, side, etc.)
- AR/3D product view integration

