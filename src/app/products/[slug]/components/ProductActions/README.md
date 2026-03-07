# ProductActions Component

## Overview

The ProductActions component provides all action buttons and controls for a product detail page. It handles quantity selection, adding items to cart, wishlist management, sharing functionality, and quick purchase options.

## Features

- Quantity selector with increment and decrement buttons
- Add to Cart button with cart icon
- Wishlist toggle button with heart icon
- Share button with social media sharing options
- Buy Now button for quick checkout
- Quantity limits enforcement (minimum 1, maximum 10)
- Visual feedback for wishlist status
- Responsive layout for all screen sizes

## File Structure

```
ProductActions/
├── ProductActions.jsx           # Main component
├── ProductActions.constants.js  # Configuration and constants
├── ProductActions.css           # Component styles
├── index.js                     # Module exports
└── README.md                    # Documentation
```

## Usage

```jsx
import ProductActions from '@/app/products/[slug]/components/ProductActions';

<ProductActions
  product={product}
  selectedVariantId={selectedVariant}
  customizationData={customData}
  quantity={quantity}
  onQuantityChange={setQuantity}
/>
```

## Props

### product (Object, required)
The product data object containing:
- `basic.name` - Product name for sharing
- `basic.id` - Product ID for cart operations

### selectedVariantId (String, optional)
Currently selected variant ID. Used when adding to cart to specify which variant to add.

### customizationData (Object, optional)
Current customization data selected by the user. Passed to cart when adding customized products.

### quantity (Number, optional)
Current quantity selected. Defaults to 1.

### onQuantityChange (Function, optional)
Callback function called when quantity changes. Receives the new quantity value as parameter.

### className (String, optional)
Additional CSS classes to apply to the container.

## Constants

All configuration is centralized in `ProductActions.constants.js`:

### QUANTITY_LIMITS
- `MIN`: Minimum quantity (1)
- `MAX`: Maximum quantity (10)
- `DEFAULT`: Default quantity (1)

### BUTTON_VARIANTS
Configuration for all buttons including variant, size, and color:
- `QUANTITY`: Quantity selector buttons
- `ADD_TO_CART`: Add to cart button
- `WISHLIST`: Wishlist toggle button
- `SHARE`: Share button
- `BUY_NOW`: Buy now button

### MESSAGES
User feedback messages for all actions:
- Cart operations (add, update, error)
- Wishlist operations (add, remove)
- Quantity limits (min, max reached)

## Styling

The component uses a dedicated CSS file (`ProductActions.css`) with the following classes:

- `.product-actions-container`: Main container with flex layout
- `.quantity-selector`: Quantity selector wrapper
- `.quantity-display`: Quantity number display
- `.action-buttons-row`: Row of action buttons
- `.share-container`: Share options container
- `.share-title`: Share section title
- `.heart-icon`: Wishlist heart icon
- `.heart-icon.active`: Active wishlist state

## Shared Components Used

- **Button** from `@/shared/ui/button` - All interactive buttons
- **Icon** from `@/shared/icons` - Icons for buttons (cart, heart, share, add, remove)
- **Share** from `@/shared/ui/share` - Social media sharing component

## Behavior

### Quantity Selection
- Users can increment or decrement quantity using + and - buttons
- Minimum quantity is 1 (decrement button disabled at minimum)
- Maximum quantity is 10 (increment button disabled at maximum)
- Quantity changes trigger the `onQuantityChange` callback

### Add to Cart
- Adds the product with selected quantity, variant, and customization to cart
- Shows success message (console log, can be replaced with toast notification)
- Handles errors gracefully

### Wishlist
- Toggles product in wishlist
- Heart icon changes color when wishlisted (red fill)
- Visual feedback for current wishlist status

### Share
- Clicking share button toggles share options panel
- Supports multiple platforms (Twitter, Facebook, WhatsApp, LinkedIn, etc.)
- Uses current page URL and product name
- Horizontal layout without labels for compact display

### Buy Now
- Quick checkout button
- Bypasses cart and goes directly to checkout
- Includes selected quantity, variant, and customization

## Accessibility

- All buttons have proper `aria-label` attributes
- Disabled states are properly indicated
- Keyboard navigation supported
- Screen reader friendly

## Future Enhancements

- Toast notifications for user actions
- Animation for wishlist toggle
- Loading states for async operations
- Integration with actual cart and wishlist Redux slices
- Stock availability checks before adding to cart

