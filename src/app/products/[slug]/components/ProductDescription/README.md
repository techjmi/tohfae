## ProductDescription Component

## Overview

The ProductDescription component provides a tabbed interface for displaying detailed product information including description, specifications, and shipping and returns policies. It offers an organized way to present comprehensive product details without overwhelming the user.

## Features

- Tabbed navigation for different information sections
- Three main tabs: Description, Specifications, Shipping and Returns
- Active tab highlighting with orange theme
- Smooth tab transitions
- Responsive layout for all screen sizes
- Graceful handling of missing data
- Clean, organized information display

## File Structure

```
ProductDescription/
├── ProductDescription.jsx           # Main component
├── ProductDescription.constants.js  # Configuration and constants
├── ProductDescription.css           # Component styles
├── index.js                         # Module exports
└── README.md                        # Documentation
```

## Usage

```jsx
import ProductDescription from '@/app/products/[slug]/components/ProductDescription';

<ProductDescription product={product} />
```

## Props

### product (Object, required)
The product data object containing:
- `basic.description` (String) - Product description text
- `specifications` (Array) - Array of specification objects
  - Each spec has `key` and `value` properties
- `shipping` (Object) - Shipping information
  - `weight` (Number) - Product weight in grams
  - `deliveryTime` (Object) - Delivery time range
    - `min` (Number) - Minimum delivery time
    - `max` (Number) - Maximum delivery time
    - `unit` (String) - Time unit (e.g., 'days')
  - `shippingClass` (String) - Shipping class/method
- `policies` (Object) - Return and replacement policies
  - `returnWindow` (Number) - Return window in days
  - `replacementWindow` (Number) - Replacement window in days
  - `cancellationWindow` (Number) - Cancellation window in days

### className (String, optional)
Additional CSS classes to apply to the container.

## Constants

All configuration is centralized in `ProductDescription.constants.js`:

### TABS
Array of tab configurations:
- `id`: Tab identifier
- `label`: Tab display label

Default tabs:
1. Description
2. Specifications
3. Shipping & Returns

### DEFAULT_TAB
Default active tab ('description')

### TAB_STYLES
Tab button styling classes:
- `BASE`: Base button styles
- `ACTIVE`: Active tab styles (orange theme)
- `INACTIVE`: Inactive tab styles with hover effects

### MESSAGES
User-facing messages:
- `NO_DESCRIPTION`: Message when description is not available
- `NO_SPECIFICATIONS`: Message when specifications are not available
- `SHIPPING_INFO_TITLE`: Shipping section title
- `RETURN_POLICY_TITLE`: Return policy section title

### LABELS
Text labels for various fields:
- Weight, Delivery Time, Shipping Class
- Return Window, Replacement Window, Cancellation Window
- Units (grams, days)

## Styling

The component uses a dedicated CSS file (`ProductDescription.css`) with the following classes:

- `.description-container`: Main container with border and rounded corners
- `.tab-navigation`: Tab navigation bar
- `.tab-button`: Individual tab button
- `.tab-button-active`: Active tab styling (orange theme)
- `.tab-button-inactive`: Inactive tab styling with hover effects
- `.tab-content`: Content area for all tabs
- `.description-text`: Description text styling
- `.specifications-list`: Specifications list container
- `.specification-item`: Individual specification row
- `.specification-key`: Specification label (left column)
- `.specification-value`: Specification value (right column)
- `.shipping-section`: Shipping and returns section
- `.shipping-group`: Individual shipping/policy group
- `.shipping-title`: Section title
- `.shipping-list`: List of shipping/policy items
- `.no-data-message`: Message for missing data

## Behavior

### Tab Navigation
- Clicking a tab switches the displayed content
- Active tab is highlighted with orange border and background
- Inactive tabs show hover effects
- Tab state is managed internally with useState

### Description Tab
- Displays product description text
- Shows fallback message if description is not available
- Supports long-form text content

### Specifications Tab
- Displays specifications in a two-column layout
- Left column shows specification names
- Right column shows specification values
- Shows fallback message if no specifications are available
- Each specification row has a subtle bottom border

### Shipping and Returns Tab
- Displays shipping information (weight, delivery time, shipping class)
- Shows return and replacement policies
- Displays policy windows in days
- Organized into separate sections with titles
- Bullet-point list format for easy reading

## Accessibility

- Semantic HTML with proper button elements for tabs
- Clear visual feedback for active tab
- Keyboard navigation supported
- Logical tab order
- Screen reader friendly structure

## Future Enhancements

- Expandable/collapsible sections
- Print-friendly view
- Share specific tab content
- Anchor links to specific tabs
- Animation for tab transitions
- Rich text support for descriptions
- Image support in descriptions
- Video embedding in description tab
- Customer Q&A tab
- Care instructions tab

