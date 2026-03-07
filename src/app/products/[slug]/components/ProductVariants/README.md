## ProductVariants Component

## Overview

The ProductVariants component provides an interactive interface for selecting product variants such as size, color, and other attributes. It displays available options, handles variant selection, shows stock availability, and provides visual feedback for the selected variant.

## Features

- Dynamic variant grouping by attribute type (size, color, etc.)
- Interactive variant selection buttons
- Visual indication of selected variant (orange theme)
- Stock availability display per variant
- Disabled state for out-of-stock variants
- Strikethrough styling for unavailable options
- Real-time stock count display
- Responsive layout for all screen sizes

## File Structure

```
ProductVariants/
├── ProductVariants.jsx           # Main component
├── ProductVariants.constants.js  # Configuration and constants
├── ProductVariants.css           # Component styles
├── index.js                      # Module exports
└── README.md                     # Documentation
```

## Usage

```jsx
import ProductVariants from '@/app/products/[slug]/components/ProductVariants';

<ProductVariants
  variants={product.variants}
  onVariantChange={handleVariantChange}
  selectedVariantId={selectedVariant}
/>
```

## Props

### variants (Array, required)
Array of variant objects, each containing:
- `id` (String) - Unique variant identifier
- `attributes` (Object) - Variant attributes (e.g., { size: 'M', color: 'Red' })
- `inventory.available` (Number) - Available stock count

Example:
```javascript
[
  {
    id: 'var-1',
    attributes: { size: 'M', color: 'Red' },
    inventory: { available: 10 }
  },
  {
    id: 'var-2',
    attributes: { size: 'L', color: 'Blue' },
    inventory: { available: 0 }
  }
]
```

### onVariantChange (Function, required)
Callback function called when a variant is selected. Receives the variant ID as parameter.

### selectedVariantId (String, optional)
Currently selected variant ID. Used to highlight the active selection.

### className (String, optional)
Additional CSS classes to apply to the container.

## Constants

All configuration is centralized in `ProductVariants.constants.js`:

### VARIANT_BUTTON_STYLES
Button styling classes for different states:
- `BASE`: Base button styles
- `SELECTED`: Selected variant styles (orange theme)
- `UNSELECTED`: Unselected variant styles
- `UNAVAILABLE`: Out-of-stock variant styles

### STOCK_STATUS
Stock status messages and icons:
- `IN_STOCK`: "In Stock" label
- `OUT_OF_STOCK`: "Out of Stock" label
- `IN_STOCK_ICON`: Check mark icon (✓)
- `OUT_OF_STOCK_ICON`: Cross icon (✗)

### STOCK_COLORS
Color classes for stock status:
- `IN_STOCK`: Green color for available stock
- `OUT_OF_STOCK`: Red color for out of stock

### LABELS
Text labels used in the component:
- `AVAILABLE`: "available" label for stock count

## Styling

The component uses a dedicated CSS file (`ProductVariants.css`) with the following classes:

- `.variants-container`: Main container with flex layout
- `.variant-group`: Individual attribute group container
- `.variant-label`: Label for each attribute type
- `.variant-options`: Container for variant buttons
- `.variant-button`: Base button styling
- `.variant-button-selected`: Selected variant styling (orange theme)
- `.variant-button-unselected`: Unselected variant styling
- `.variant-button-unavailable`: Out-of-stock variant styling
- `.stock-status`: Stock status container
- `.stock-in-stock`: In-stock status styling (green)
- `.stock-out-of-stock`: Out-of-stock status styling (red)

## Behavior

### Variant Grouping
- Automatically groups variants by attribute type (size, color, etc.)
- Each attribute type is displayed as a separate section
- Attribute labels are capitalized automatically

### Variant Selection
- Clicking a variant button triggers the `onVariantChange` callback
- Selected variant is highlighted with orange border and background
- Only available variants can be selected
- Out-of-stock variants are disabled and styled with strikethrough

### Stock Display
- Shows stock status for the currently selected variant
- Displays available stock count for in-stock items
- Shows "Out of Stock" message for unavailable items
- Uses color coding (green for in-stock, red for out-of-stock)

## Accessibility

- Semantic HTML with proper button elements
- Disabled state for unavailable variants
- Clear visual feedback for selection
- Keyboard navigation supported
- Screen reader friendly labels

## Future Enhancements

- Color swatches for color variants
- Image previews for variants
- Variant-specific pricing display
- Tooltip for variant details
- Animation for selection changes
- Low stock warnings
- Notify me when back in stock feature

