## ProductMainInfo Component

## Overview

The ProductMainInfo component displays the primary product information at the top of the product detail page. It shows the product name, category, rating with reviews, tags/badges, SKU, and brand information. This component provides users with essential product details at a glance.

## Features

- Product category display
- Large, prominent product name
- Star rating visualization with average rating
- Review count display
- Dynamic tag/badge system with color coding
- SKU and brand information
- Responsive layout for all screen sizes
- Ready for API integration for dynamic ratings
- Semantic HTML structure

## File Structure

```
ProductMainInfo/
├── ProductMainInfo.jsx           # Main component
├── ProductMainInfo.constants.js  # Configuration and constants
├── ProductMainInfo.css           # Component styles
├── index.js                      # Module exports
└── README.md                     # Documentation
```

## Usage

```jsx
import ProductMainInfo from '@/app/products/[slug]/components/ProductMainInfo';

<ProductMainInfo product={product} />
```

## Props

### product (Object, required)
The product data object containing:
- `category` (String) - Product category
- `basic.name` (String) - Product name
- `basic.brand` (String) - Product brand
- `rating.average` (Number) - Average rating (0-5)
- `rating.count` (Number) - Total number of reviews
- `sku` (String) - Product SKU
- `tags` (Array) - Array of tag strings

Example:
```javascript
{
  category: 'Electronics',
  basic: {
    name: 'Premium Wireless Headphones',
    brand: 'AudioTech'
  },
  rating: {
    average: 4.5,
    count: 128
  },
  sku: 'AT-WH-001',
  tags: ['bestseller', 'trending', 'new']
}
```

### className (String, optional)
Additional CSS classes to apply to the container.

## Constants

All configuration is centralized in `ProductMainInfo.constants.js`:

### STAR_CONFIG
Star rating configuration:
- `MAX_STARS`: Maximum number of stars (5)
- `HALF_STAR_THRESHOLD`: Threshold for showing half star (0.5)
- `ICON_SIZE`: Star icon size in pixels (20)

### STAR_ICONS
Icon configurations for different star states:
- `FULL`: Full star (yellow filled)
- `HALF`: Half star (yellow filled)
- `EMPTY`: Empty star (gray border)

### TAG_BADGE_COLORS
Badge color mapping for different tags:
- `bestseller`: 'success' (green)
- `trending`: 'primary' (orange)
- `new`: 'primary' (orange)
- `limited-edition`: 'warning' (yellow)
- `sale`: 'danger' (red)
- `default`: 'neutral' (gray)

### BADGE_CONFIG
Badge configuration:
- `SIZE`: 'sm'
- `RADIUS`: 'sm'

### LABELS
Text labels used in the component:
- `SKU`: "SKU:"
- `BRAND`: "Brand:"
- `REVIEW_SINGULAR`: "review"
- `REVIEW_PLURAL`: "reviews"

### DEFAULTS
Default values when data is not available:
- `RATING`: 0
- `RATING_COUNT`: 0
- `CATEGORY`: ''
- `NAME`: 'Product Name'
- `SKU`: ''
- `BRAND`: ''
- `TAGS`: []

### RATING_DECIMAL_PLACES
Number of decimal places for rating display (1)

## Styling

The component uses a dedicated CSS file (`ProductMainInfo.css`) with the following classes:

- `.main-info-container`: Main container with vertical spacing
- `.category-text`: Category text styling (small, uppercase, gray)
- `.product-name`: Large, bold product name
- `.rating-container`: Rating section container
- `.stars-wrapper`: Star icons wrapper
- `.rating-number`: Rating number display
- `.rating-count`: Review count text
- `.tags-container`: Tags/badges container
- `.tag-badge`: Individual tag badge
- `.meta-info-container`: SKU and brand container
- `.meta-info-item`: Individual meta info item
- `.meta-label`: Meta info label (bold)

Responsive styles:
- Mobile (max-width: 640px): Smaller product name and rating text

## Behavior

### Category Display
- Shows product category in uppercase
- Small, gray text above product name
- Hidden if category is not provided

### Product Name
- Large, bold heading (h1)
- Prominent display for SEO and accessibility
- Responsive font size

### Star Rating
- Displays average rating as a number with 1 decimal place
- Shows visual star representation (full, half, empty stars)
- Half star is shown when rating has 0.5 or more decimal value
- Maximum 5 stars displayed
- Only shown if rating is greater than 0

### Review Count
- Shows total number of reviews in parentheses
- Singular "review" for 1 review, plural "reviews" for multiple
- Only shown if rating count is greater than 0

### Tags/Badges
- Displays product tags as colored badges
- Color-coded based on tag type (bestseller, trending, etc.)
- Uppercase text for consistency
- Wraps to multiple lines on small screens
- Hidden if no tags are provided

### SKU and Brand
- Displays SKU and brand in a horizontal layout
- Wraps to multiple lines on small screens
- Each item hidden if data is not provided
- Bold labels for clarity

## Shared Components Used

- **Icon** from `@/shared/icons` - Star rating icons
- **Badge** from `@/shared/ui/badge` - Tag badges

## API Integration Ready

The component is designed to be dynamic and ready for API integration:

1. **rating prop**: Can receive dynamic rating data from API
2. **Star rendering**: Automatically updates based on rating value
3. **Review count**: Dynamically displays based on API data
4. **Tags**: Can be populated from API response

Example future implementation:
```jsx
// Future: Fetch product data from API
const [product, setProduct] = useState(null);

useEffect(() => {
  fetchProduct(productId).then(setProduct);
}, [productId]);

<ProductMainInfo product={product} />
```

## Accessibility

- Semantic HTML with proper heading hierarchy (h1 for product name)
- Clear visual hierarchy
- Color-coded badges with text labels
- Readable font sizes
- Proper spacing for touch targets
- Screen reader friendly structure

## SEO Considerations

- Uses h1 tag for product name (important for SEO)
- Category displayed prominently
- Structured data ready (can be enhanced with JSON-LD)

## Future Enhancements

- Add structured data (JSON-LD) for rich snippets
- Click-through to category page
- Click-through to brand page
- Expandable tag descriptions
- Share product functionality
- Add to wishlist quick action
- Availability status badge
- Stock level indicator
- Product condition badge (new, refurbished, etc.)

