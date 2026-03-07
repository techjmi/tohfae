## ProductPricing Component

## Overview

The ProductPricing component displays comprehensive pricing information for a product, including the selling price, MRP, discount badges, available offers, payment options, and delivery charges. It provides a clear and organized view of all pricing-related details to help customers make informed purchase decisions.

## Features

- Selling price display with currency formatting
- MRP with strikethrough for discounted products
- Discount percentage badge
- Available offers list with icons
- Cash on Delivery (COD) availability and charges
- EMI payment options indicator
- Delivery charges with free delivery threshold
- Responsive layout for all screen sizes
- Localized currency formatting (INR by default)

## File Structure

```
ProductPricing/
├── ProductPricing.jsx           # Main component
├── ProductPricing.constants.js  # Configuration and constants
├── ProductPricing.css           # Component styles
├── index.js                     # Module exports
└── README.md                    # Documentation
```

## Usage

```jsx
import ProductPricing from '@/app/products/[slug]/components/ProductPricing';

<ProductPricing
  pricing={product.pricing}
  offers={product.offers}
/>
```

## Props

### pricing (Object, required)
The pricing data object containing:
- `sellingPrice` (Number) - Current selling price
- `mrp` (Number, optional) - Maximum Retail Price
- `currency` (String, optional) - Currency code (default: 'INR')
- `discount.value` (Number, optional) - Discount percentage
- `cod.available` (Boolean, optional) - COD availability
- `cod.extraCharges` (Number, optional) - Additional COD charges
- `paymentOptions.emi.enabled` (Boolean, optional) - EMI availability
- `delivery.charges` (Number, optional) - Delivery charges
- `delivery.freeAbove` (Number, optional) - Free delivery threshold

### offers (Array, optional)
Array of offer objects, each containing:
- `label` (String) - Offer description
- `tag` (String, optional) - Offer tag/category

### className (String, optional)
Additional CSS classes to apply to the container.

## Constants

All configuration is centralized in `ProductPricing.constants.js`:

### CURRENCY_CONFIG
- `DEFAULT`: Default currency ('INR')
- `LOCALE`: Locale for number formatting ('en-IN')
- `MAX_FRACTION_DIGITS`: Maximum decimal places (0)

### DISCOUNT_BADGE
Configuration for discount badge:
- `variant`: 'success'
- `size`: 'md'

### ICONS
Icon configurations for:
- `OFFER`: Tag icon for offers
- `COD`: Check circle icon for COD
- `EMI`: Credit card icon for EMI
- `DELIVERY`: Truck icon for delivery

### LABELS
All text labels used in the component:
- Available offers, COD, EMI, delivery messages
- Customizable for internationalization

### MIN_DISCOUNT_TO_SHOW
Minimum discount percentage to display the discount badge (0 by default).

## Styling

The component uses a dedicated CSS file (`ProductPricing.css`) with the following classes:

- `.pricing-container`: Main container with top and bottom borders
- `.price-section`: Price display section with flexbox layout
- `.selling-price`: Large, bold selling price
- `.mrp-price`: Strikethrough MRP price
- `.offers-section`: Offers container
- `.offers-title`: Offers section title
- `.offers-list`: List of offers
- `.offer-item`: Individual offer item
- `.payment-options`: Payment options container
- `.payment-option`: Individual payment option
- `.extra-charges`: Extra charges text styling
- `.delivery-info`: Delivery information text

## Shared Components Used

- **Badge** from `@/shared/ui/badge` - Discount percentage badge
- **Icon** from `@/shared/icons` - Icons for offers, COD, EMI, delivery

## Behavior

### Price Display
- Shows selling price prominently in large, bold text
- Displays MRP with strikethrough if discount is available
- Shows discount percentage badge when discount > 0%

### Offers
- Lists all available offers with tag icons
- Each offer shows label and tag
- Falls back to "Special Offer" if tag is not provided

### Payment Options
- Shows COD availability with check icon
- Displays extra COD charges if applicable
- Shows EMI availability with credit card icon

### Delivery Information
- Shows "Free Delivery" if price meets threshold
- Displays delivery charges otherwise
- Shows free delivery threshold if not met

## Accessibility

- Semantic HTML structure
- Clear visual hierarchy
- Color-coded icons for different payment methods
- Readable font sizes and spacing

## Future Enhancements

- Support for multiple currencies
- Internationalization (i18n) support
- Animated price changes
- Tooltip for offer details
- Expandable offer details
- Price comparison with competitors

