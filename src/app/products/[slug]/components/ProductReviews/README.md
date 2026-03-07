## ProductReviews Component

## Overview

The ProductReviews component displays customer reviews and ratings for a product. It shows an overall rating summary, rating distribution chart, and a placeholder for individual reviews. The component is designed to be dynamic and ready for API integration to fetch and display actual customer reviews.

## Features

- Overall rating display with star visualization
- Total review count
- Rating distribution chart (5-star to 1-star breakdown)
- Percentage-based progress bars for each rating level
- Write review button for customer engagement
- Star rating system with full, half, and empty stars
- Responsive grid layout for rating summary and distribution
- Ready for API integration to fetch reviews dynamically
- Placeholder for individual review items

## File Structure

```
ProductReviews/
├── ProductReviews.jsx           # Main component
├── ProductReviews.constants.js  # Configuration and constants
├── ProductReviews.css           # Component styles
├── index.js                     # Module exports
└── README.md                    # Documentation
```

## Usage

```jsx
import ProductReviews from '@/app/products/[slug]/components/ProductReviews';

<ProductReviews
  rating={product.rating}
  productId={product.id}
/>
```

## Props

### rating (Object, required)
The rating data object containing:
- `average` (Number) - Average rating (0-5)
- `count` (Number) - Total number of reviews
- `distribution` (Object) - Rating distribution by star level
  - Keys: 1, 2, 3, 4, 5 (star levels)
  - Values: Number of reviews for each star level

Example:
```javascript
{
  average: 4.5,
  count: 128,
  distribution: {
    5: 80,
    4: 30,
    3: 10,
    2: 5,
    1: 3
  }
}
```

### productId (String, required)
Product ID for fetching reviews. This will be used when the reviews API is integrated.

### className (String, optional)
Additional CSS classes to apply to the container.

## Constants

All configuration is centralized in `ProductReviews.constants.js`:

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

### RATING_STARS
Array of star levels for distribution display: [5, 4, 3, 2, 1]

### WRITE_REVIEW_BUTTON
Button configuration:
- `variant`: 'outline'
- `color`: 'primary'
- `size`: 'lg'

### LABELS
All text labels used in the component:
- `TITLE`: "Customer Reviews"
- `REVIEWS_COUNT`: "reviews"
- `WRITE_REVIEW`: "Write a Review"
- `NO_REVIEWS`: "No reviews yet. Be the first to review this product!"
- `STAR_SYMBOL`: "★"

### DEFAULTS
Default values when data is not available:
- `AVERAGE`: 0
- `COUNT`: 0
- `DISTRIBUTION`: {}

### RATING_DECIMAL_PLACES
Number of decimal places for average rating display (1)

## Styling

The component uses a dedicated CSS file (`ProductReviews.css`) with the following classes:

- `.reviews-container`: Main container with border and padding
- `.reviews-title`: Section title
- `.reviews-grid`: Responsive grid for summary and distribution
- `.rating-summary`: Rating summary section
- `.rating-display`: Rating number and stars display
- `.rating-number`: Large rating number
- `.rating-details`: Stars and count container
- `.stars-container`: Star icons container
- `.reviews-count`: Review count text
- `.distribution-container`: Rating distribution section
- `.distribution-row`: Individual rating level row
- `.star-label`: Star level label
- `.progress-bar-container`: Progress bar background
- `.progress-bar`: Progress bar fill (yellow)
- `.percentage-label`: Percentage text
- `.write-review-section`: Write review button section
- `.reviews-list-section`: Reviews list container
- `.no-reviews-message`: No reviews placeholder message

Future styles for individual reviews:
- `.review-item`: Individual review container
- `.review-header`: Review header with name and date
- `.reviewer-name`: Reviewer name
- `.review-date`: Review date
- `.review-text`: Review content text

## Behavior

### Star Rating Display
- Displays average rating as a number with 1 decimal place
- Shows visual star representation (full, half, empty stars)
- Half star is shown when rating has 0.5 or more decimal value
- Maximum 5 stars displayed

### Rating Distribution
- Shows breakdown of ratings from 5 stars to 1 star
- Progress bars indicate percentage of each rating level
- Percentage calculated based on total review count
- Yellow progress bars for visual consistency

### Write Review Button
- Prominent button for users to write reviews
- Uses primary color with outline variant
- Large size for better visibility
- Ready for click handler integration

### Reviews List
- Currently shows placeholder message
- Designed to be replaced with actual review items when API is integrated
- Includes CSS styles for future review items

## API Integration Ready

The component is designed to be dynamic and ready for API integration:

1. **productId prop**: Can be used to fetch reviews from API
2. **Reviews list section**: Placeholder ready to be replaced with mapped review items
3. **Review item styles**: Pre-defined CSS classes for individual reviews
4. **Write review button**: Ready for modal or navigation integration

Example future implementation:
```jsx
// Future: Fetch reviews from API
const [reviews, setReviews] = useState([]);

useEffect(() => {
  fetchReviews(productId).then(setReviews);
}, [productId]);

// Future: Map reviews in the reviews list section
{reviews.map(review => (
  <div key={review.id} className="review-item">
    {/* Review content */}
  </div>
))}
```

## Accessibility

- Semantic HTML structure
- Clear visual hierarchy
- Color-coded rating system (yellow for stars)
- Readable font sizes
- Proper spacing for touch targets

## Future Enhancements

- Fetch and display actual customer reviews from API
- Pagination for large number of reviews
- Review filtering (by rating, verified purchase, etc.)
- Review sorting (most recent, most helpful, etc.)
- Review images/photos
- Helpful/not helpful voting
- Review reply functionality
- Verified purchase badge
- Review moderation
- Write review modal/form
- Review submission API integration

