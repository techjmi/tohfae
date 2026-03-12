## ProductVariants Component

## Overview

Interactive interface for selecting product variants (size, color, etc.) with dynamic filtering and stock availability display.

## Features

- Dynamic variant grouping by attribute type
- Bidirectional filtering (size filters colors, color filters sizes)
- Stock availability display
- Disabled state for out-of-stock variants
- Responsive layout
- Modular architecture

## File Structure

```
ProductVariants/
├── components/
│   ├── VariantGroup.jsx          # Renders attribute groups
│   ├── ColorSwatch.jsx           # Color button component
│   ├── AttributeButton.jsx       # Generic attribute button
│   └── StockStatus.jsx           # Stock display
├── ProductVariants.jsx           # Main component
├── ProductVariants.helpers.js    # Business logic functions
├── ProductVariants.constants.js  # Configuration
├── ProductVariants.css           # Styles
├── index.js                      # Exports
└── README.md                     # Documentation
```

## How It Works

When a user selects a size, the component filters variants to show only colors available for that size. Similarly, selecting a color filters available sizes. This bidirectional filtering ensures users only see valid combinations.

### Core Logic

The buildVariantGroups function filters variants based on selected attributes and extracts available options for each attribute type.

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

## Helper Functions

Located in `ProductVariants.helpers.js`:

- **buildVariantGroups** - Filters variants based on selected attributes
- **findMatchingVariant** - Finds variant matching attribute selection
- **isVariantAvailable** - Checks if variant is in stock
- **filterVariantsByAttributes** - Filters variants by criteria
- **getUniqueAttributeValues** - Extracts unique values for attribute

## Components

Located in `components/` folder:

- **VariantGroup** - Renders a group of variant options (size, color, etc.)
- **ColorSwatch** - Circular color button component
- **AttributeButton** - Generic attribute button (size, material, etc.)
- **StockStatus** - Stock availability display

