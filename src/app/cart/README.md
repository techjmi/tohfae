# Shopping Cart

This is the shopping cart implementation for the application. It supports both guest users and authenticated users with backend-driven price calculations.

## Structure

### Frontend Files

```
app/cart/
├── CartClient.jsx
├── page.js
├── cart.constant.js
├── cart.style.js
├── components/
│   ├── CartHeader/
│   ├── CartItem/
│   ├── CartSummary/
│   ├── CartEmpty/
│   ├── CartLoading/
│   └── CartError/
└── helpers/
    └── cartItemHelper.js

shared/hooks/cart/
└── useCart.js

shared/ui/cart/
├── AddToCartButton.jsx
└── RemoveFromCartButton.jsx

services/cart/
├── cart.service.js
├── cart.mapper.js
└── guest-cart.service.js
```

### Backend Files

```
modules/cart/
├── cart.controller.js
├── cart.service.js
├── cart.routes.js
├── cart.validation.js
└── cart.model.js
```

## How It Works

### Guest Users
Guest users have their cart stored in localStorage. When they add items, the data is saved locally and persists across sessions. On login, the guest cart is merged with their user cart on the backend.

### Authenticated Users
Authenticated users have their cart stored in the database. All operations go through the backend API which handles validation, price calculation, and data persistence.

### Price Calculation
All prices are calculated on the backend. The frontend never calculates totals, discounts, or delivery charges. This prevents price manipulation and ensures accuracy.

## Main Components

### useCart Hook
This is the central hook for all cart operations. It automatically detects whether the user is authenticated or a guest and routes to the appropriate service.

Available methods:
- addToCart
- updateQuantity
- removeFromCart
- clearCart

### CartClient
The main cart page component. It fetches cart data, manages loading and error states, and handles user actions like clearing the cart or applying coupons.

### AddToCartButton
A reusable button component for adding products to cart. It handles loading states and provides callbacks for success and error cases.

### RemoveFromCartButton
A reusable button component for removing items from cart. It shows loading state and triggers callbacks on completion.

## API Endpoints

```
GET    /api/cart              Get cart with items and summary
POST   /api/cart              Add item to cart
PUT    /api/cart/:itemId      Update item quantity
DELETE /api/cart/:itemId      Remove item from cart
DELETE /api/cart              Clear entire cart
POST   /api/cart/coupon       Apply coupon code
DELETE /api/cart/coupon       Remove coupon code
```

## Data Flow

When a user adds an item to cart, the AddToCartButton calls the useCart hook. For guests, this updates localStorage. For authenticated users, it makes an API call to the backend. The backend validates the product, calculates prices, and saves to the database. The response includes updated cart data with the summary object containing all totals. The frontend updates Redux state and re-renders the UI.

When updating quantity, the same pattern applies. The backend recalculates all prices and returns fresh data. The cart page refreshes to show updated totals.

## Important Details

### Cart Item IDs
For authenticated users, use the cartItemId field (the database _id) when updating or removing items. For guest users, use the combination of productId and variantId.

### Product Data Structure
The backend Product model uses nested objects. Product name is in basic.name, price is in pricing.sellingPrice, and images are in media.images.

### Helper Functions
The cartItemHelper.js file provides utilities to extract data from populated cart items. These functions handle the nested product structure and variant data.

## Security

All cart routes require authentication. User carts are isolated by userId from the JWT token. Input validation uses Zod schemas. Prices are calculated only on the backend. Stock and product status are validated before operations.

## Configuration

Messages and UI text are in cart.constant.js under CART_MESSAGES. Quantity limits are in CART_LIMITS. Tailwind classes are organized in cart.style.js.

## Notes

Guest cart is stored in localStorage with the key tohfae_guest_cart. Cart items use soft delete with a status field. The Modal component comes from the shared UI library. Toast notifications use react-toastify.

