## Card Component

## Overview

The Card component is a flexible, reusable UI component that supports both data-driven and composition-based rendering patterns. It follows the same hybrid pattern as the Modal component, allowing you to either pass data objects with boolean flags for automatic rendering, or compose custom layouts using sub-components. This makes it perfect for displaying products, banners, blog posts, and any other card-based content.

## Features

- Hybrid rendering pattern (data-driven and composition-based)
- Smart auto-rendering based on variant (product, banner, blog)
- Modular sub-components for flexible composition
- Next.js Image optimization with error handling
- Badge support with multiple variants
- Price display with discount calculation
- Action buttons (cart, wishlist, compare)
- Meta information (rating, reviews, date, author)
- Responsive image handling
- Hover effects and animations
- Customizable styling with variants
- Accessibility support

## File Structure

```
card/
├── components/
│   ├── CardImage.jsx      # Image with badges and overlay
│   ├── CardHeader.jsx     # Title, subtitle, and badge
│   ├── CardBody.jsx       # Description and content area
│   ├── CardFooter.jsx     # Smart footer (CTA, price, actions)
│   ├── CardPrice.jsx      # Price with discount display
│   ├── CardActions.jsx    # Action buttons
│   └── CardMeta.jsx       # Rating, reviews, date, etc.
├── Card.jsx               # Main Card component
├── Card.helpers.js        # Helper functions
├── cardConstant.js        # Style constants
├── card.style.js          # Style utilities
├── index.js               # Module exports
└── README.md              # Documentation
```

## Usage

### Basic Import

```jsx
import { Card } from '@/shared/ui/card';

// Or import sub-components
import { Card, CardImage, CardHeader, CardBody, CardFooter } from '@/shared/ui/card';
```

### Data-Driven Mode (Product Card)

```jsx
<Card
  data={{
    image: '/product.jpg',
    badges: [
      { label: 'Sale', color: 'danger', size: 'sm' },
      { label: 'New', color: 'info', size: 'sm' }
    ],
    title: 'Custom T-Shirt',
    subtitle: 'Clothing',
    description: 'Personalized cotton t-shirt with custom design',
    rating: 4.5,
    reviews: 120,
    price: 499,
    originalPrice: 999,
    discount: 50,
    actions: ['cart', 'wishlist']
  }}
  variant="product"
  image={true}
  header={true}
  body={true}
  footer={true}
  hoverable
/>
```

### Data-Driven Mode (Banner Card)

```jsx
<Card
  data={{
    image: '/banner.jpg',
    overlay: true,
    overlayOpacity: 0.4,
    heading: 'Summer Sale',
    subheading: 'Up to 50% Off',
    cta: {
      enabled: true,
      text: 'Shop Now',
      url: '/products',
      variant: 'solid',
      color: 'primary',
      fullWidth: true
    }
  }}
  variant="banner"
  image={true}
  header={true}
  footer={true}
  hoverable
/>
```

### Composition Mode (Custom Layout)

```jsx
<Card hoverable shadow="md" radius="lg">
  <CardImage 
    src="/image.jpg" 
    badges={['New', { label: 'Sale', color: 'danger' }]}
    overlay={true}
  />
  <CardHeader 
    title="Custom Title" 
    subtitle="Custom Subtitle"
    badge={{ label: 'Featured', color: 'warning' }}
  />
  <CardBody description="Custom description text here" />
  <CardFooter>
    <Button>Custom Action</Button>
  </CardFooter>
</Card>
```

### Hybrid Mode (Mix Both Patterns)

```jsx
<Card
  data={productData}
  variant="product"
  image={true}
  header={<CustomHeader />}
  body={true}
  footer={true}
  hoverable
/>
```

## Props

### Card (Main Component)

#### data (Object, optional)
Data object containing all card information. Structure varies by variant.

#### variant (String, optional)
Card variant that determines auto-rendering behavior.
- `default`: Basic card
- `product`: Product card with price and actions
- `banner`: Banner card with CTA
- `blog`: Blog card with meta and read more

Default: `default`

#### image (Boolean or Component, optional)
Controls image rendering.
- `false`: No image
- `true`: Auto-render from data.image
- `<CardImage />`: Custom image component

#### header (Boolean or Component, optional)
Controls header rendering.
- `false`: No header
- `true`: Auto-render from data.title, data.subtitle
- `<CardHeader />`: Custom header component

#### body (Boolean or Component, optional)
Controls body rendering.
- `false`: No body
- `true`: Auto-render from data.description
- `<CardBody />`: Custom body component

#### footer (Boolean or Component, optional)
Controls footer rendering.
- `false`: No footer
- `true`: Auto-render based on variant
- `<CardFooter />`: Custom footer component

#### className (String, optional)
Additional CSS classes to apply to the card container.

#### radius (String, optional)
Border radius variant.
Options: `xs`, `sm`, `md`, `lg`, `xl`, `full`
Default: `md`

#### shadow (String, optional)
Box shadow variant.
Options: `none`, `xs`, `sm`, `md`, `lg`, `xl`
Default: `sm`

#### padding (String, optional)
Internal padding variant.
Options: `none`, `xs`, `sm`, `md`, `lg`, `xl`
Default: `md`

#### background (String, optional)
Background color variant.
Options: `default`, `white`, `gray`, `transparent`
Default: `default`

#### border (String, optional)
Border variant.
Options: `default`, `none`, `light`, `dark`
Default: `default`

#### hoverable (Boolean, optional)
Enable hover effects (shadow and scale).
Default: `false`

#### clickable (Boolean, optional)
Make card clickable with cursor pointer.
Default: `false`

#### onClick (Function, optional)
Click handler function (only works when clickable is true).

#### as (String, optional)
HTML element to render as.
Default: `div`

### CardImage Props

#### src (String, required)
Image source URL.

#### alt (String, optional)
Image alt text for accessibility.
Default: empty string

#### badges (Array, optional)
Array of badges to display on image.
Can be strings or objects with label, color, size.

Example:
```javascript
['Sale', 'New']
// or
[
  { label: 'Sale', color: 'danger', size: 'sm' },
  { label: 'New', color: 'info', size: 'sm' }
]
```

#### overlay (Boolean, optional)
Show dark overlay on image.
Default: `false`

#### overlayOpacity (Number, optional)
Overlay opacity (0 to 1).
Default: `0.3`

#### aspectRatio (String, optional)
Image aspect ratio.
Default: `1/1`

#### objectFit (String, optional)
Image object fit.
Options: `cover`, `contain`, `fill`, `none`
Default: `cover`

#### priority (Boolean, optional)
Next.js Image priority loading.
Default: `false`

#### onClick (Function, optional)
Click handler for image.

### CardHeader Props

#### title (String, required)
Header title text.

#### subtitle (String, optional)
Header subtitle text.

#### badge (String or Object, optional)
Badge to display next to title.
Can be string or object with label, color, size.

#### titleClassName (String, optional)
Additional CSS classes for title.

#### subtitleClassName (String, optional)
Additional CSS classes for subtitle.

### CardBody Props

#### description (String, optional)
Body description text.

#### children (ReactNode, optional)
Custom body content.

### CardFooter Props

#### data (Object, optional)
Data object for auto-rendering.

#### variant (String, optional)
Footer variant (product, banner, blog).

#### children (ReactNode, optional)
Custom footer content.

### CardPrice Props

#### price (Number, required)
Current price.

#### originalPrice (Number, optional)
Original price (for discount display).

#### discount (Number, optional)
Discount percentage (calculated if not provided).

#### currency (String, optional)
Currency symbol.
Default: `₹`

#### showDiscount (Boolean, optional)
Show discount percentage.
Default: `true`

### CardActions Props

#### actions (Array, optional)
Array of action names.
Options: `cart`, `wishlist`, `compare`, `view`, `share`

#### customActions (ReactNode, optional)
Custom action buttons.

#### onActionClick (Function, optional)
Action click handler.

### CardMeta Props

#### rating (Number, optional)
Product rating (0-5).

#### reviews (Number, optional)
Number of reviews.

#### date (String, optional)
Date string.

#### readTime (String, optional)
Read time string.

#### author (String, optional)
Author name.

## Data Object Structure

### Product Variant

```javascript
{
  image: '/product.jpg',
  badges: ['Sale', 'New'],
  title: 'Product Name',
  subtitle: 'Category',
  description: 'Product description',
  rating: 4.5,
  reviews: 120,
  price: 499,
  originalPrice: 999,
  discount: 50,
  actions: ['cart', 'wishlist'],
  onActionClick: (action) => console.log(action)
}
```

### Banner Variant

```javascript
{
  image: '/banner.jpg',
  overlay: true,
  overlayOpacity: 0.4,
  heading: 'Banner Heading',
  subheading: 'Banner Subheading',
  cta: {
    enabled: true,
    text: 'Shop Now',
    url: '/products',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    fullWidth: true
  }
}
```

### Blog Variant

```javascript
{
  image: '/blog.jpg',
  title: 'Blog Title',
  description: 'Blog excerpt',
  date: '2024-03-11',
  readTime: '5 min',
  author: 'John Doe',
  url: '/blog/post-slug'
}
```

## Helper Functions

All helper functions are exported from `Card.helpers.js`:

### formatPrice(price, currency)
Formats price with currency symbol and locale.

### calculateDiscount(originalPrice, discountedPrice)
Calculates discount percentage.

### hasCardCTA(data)
Checks if card has CTA enabled.

### hasCardPrice(data)
Checks if card has price data.

### hasCardActions(data)
Checks if card has actions.

### getResponsiveImage(image, deviceType)
Gets responsive image source.

### buildCTAUrl(cta)
Builds CTA URL with query parameters.

## Styling

The component uses constants from `cardConstant.js` for consistent styling:

### CARD_RADIUS
Border radius variants (xs, sm, md, lg, xl, full).

### CARD_SHADOW
Box shadow variants (none, xs, sm, md, lg, xl).

### CARD_PADDING
Padding variants (none, xs, sm, md, lg, xl).

### CARD_BACKGROUND
Background color variants (default, white, gray, transparent).

### CARD_BORDER
Border variants (default, none, light, dark).

## Behavior

### Smart Rendering
The Card component automatically renders appropriate content based on the variant:

- **Product variant**: Renders image, title, description, rating, price, and action buttons
- **Banner variant**: Renders image with overlay, heading, subheading, and CTA button
- **Blog variant**: Renders image, title, description, meta info, and read more link

### Image Handling
- Uses Next.js Image component for optimization
- Automatic error handling with placeholder fallback
- Responsive image sizes for different screen sizes
- Priority loading support for above-the-fold images

### Badge Display
- Supports multiple badges on images
- Flexible badge configuration (string or object)
- Uses shared Badge component for consistency

### Price Display
- Automatic discount calculation
- Strike-through original price
- Discount percentage display
- Customizable currency symbol

## Shared Components Used

- **Badge** from `@/shared/ui/badge` - Badge display
- **Button** from `@/shared/ui/button` - Action buttons and CTAs
- **Image** from `next/image` - Optimized image loading
- **Icon** from `@/shared/icons` - Icons for actions and meta

## Accessibility

- Semantic HTML structure
- Descriptive alt text for images
- Keyboard navigation support
- ARIA labels where appropriate
- Proper heading hierarchy
- Focus states for interactive elements

## Performance Considerations

- Next.js Image optimization
- Lazy loading for images
- Responsive image sizes
- GPU-accelerated transitions
- Minimal re-renders with React best practices

## SEO Considerations

- Semantic HTML elements
- Proper image alt text
- Structured data ready
- Fast loading with optimized images
- Mobile-first responsive design

## Migration from Old Pattern

### Before (Old Pattern)
```jsx
<Card>
  <CardHeader title="..." subtitle="..." />
  <CardBody>...</CardBody>
  <CardBottom>...</CardBottom>
</Card>
```

### After (Composition Mode)
```jsx
<Card>
  <CardHeader title="..." subtitle="..." />
  <CardBody>...</CardBody>
  <CardFooter>...</CardFooter>
</Card>
```

### After (Data-Driven Mode)
```jsx
<Card
  data={{ title: '...', subtitle: '...', description: '...' }}
  header={true}
  body={true}
  footer={true}
/>
```

## Future Enhancements

- Skeleton loading states
- Animation variants
- Card flip functionality
- Expandable card content
- Card grid layout helper
- Masonry layout support
- Drag and drop support
- Card sorting and filtering
- Virtual scrolling for large lists
- Card comparison mode
- Print-friendly styles
- Dark mode support
- RTL language support

