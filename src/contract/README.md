# API Contracts Documentation

This directory contains all API contracts, validation schemas, and data structures for the Tohfae Gift Store application.

## 📁 Contract Files

### 1. **product.contract.js**
Defines product-related contracts including:
- Product categories (T-shirts, Mugs, Frames, Cushions, etc.)
- Product data structure with pricing, inventory, media, and customization options
- Validation functions for products
- API contracts for product endpoints

**Key Exports:**
- `PRODUCT_CATEGORY` - Product category constants
- `PRODUCT_DATA` - Sample product data
- `validateProduct()` - Product validation function
- `GET_PRODUCTS_REQUEST/RESPONSE` - API contracts

### 2. **order.contract.js**
Defines order management contracts including:
- Order status and payment status enums
- Order schema with items, pricing, and shipping details
- Validation functions for orders and addresses
- API contracts for order operations

**Key Exports:**
- `ORDER_STATUS` - Order status constants
- `PAYMENT_STATUS` - Payment status constants
- `ORDER_SCHEMA` - Complete order structure
- `validateOrder()` - Order validation function
- Order API contracts (create, get, cancel, track)

### 3. **design.contract.js**
Defines design/customization contracts for personalized products:
- Design types and status
- Design element schema (text, images, positioning)
- Canvas/artboard settings
- Validation functions for designs
- API contracts for design operations

**Key Exports:**
- `DESIGN_TYPE` - Design type constants
- `DESIGN_SCHEMA` - Complete design structure
- `TEXT_FONT_FAMILY` - Available fonts
- `validateDesign()` - Design validation function
- Design API contracts (create, update, preview)

### 4. **cart.contract.js**
Defines shopping cart contracts:
- Cart item schema with customization support
- Cart summary with pricing calculations
- Coupon application support
- Validation functions for cart operations
- API contracts for cart management

**Key Exports:**
- `CART_SCHEMA` - Complete cart structure
- `validateCart()` - Cart validation function
- Cart API contracts (add, update, remove items, apply coupon)

### 5. **user.contract.js**
Defines user and authentication contracts:
- User roles and status
- User profile schema with addresses
- Authentication provider types
- Validation functions (email, phone, password, address)
- API contracts for auth and user operations

**Key Exports:**
- `USER_ROLE` - User role constants
- `AUTH_PROVIDER` - Authentication provider types
- `validateEmail()`, `validatePhone()`, `validatePassword()` - Validation functions
- Auth and user API contracts (signup, signin, profile, addresses)

## 🚀 Usage

### Import Contracts

```javascript
// Import all contracts
import * from '@/contract';

// Or import specific contracts
import { 
  PRODUCT_CATEGORY, 
  validateProduct,
  GET_PRODUCTS_REQUEST 
} from '@/contract/product.contract';

import { 
  ORDER_STATUS, 
  validateOrder,
  CREATE_ORDER_REQUEST 
} from '@/contract/order.contract';
```

### Validate Data

```javascript
import { validateProduct, validateOrder } from '@/contract';

// Validate a product
const productValidation = validateProduct(productData);
if (!productValidation.isValid) {
  console.error('Validation errors:', productValidation.errors);
}

// Validate an order
const orderValidation = validateOrder(orderData);
if (!orderValidation.isValid) {
  console.error('Validation errors:', orderValidation.errors);
}
```

### Use in API Routes

```javascript
import { CREATE_ORDER_REQUEST, CREATE_ORDER_RESPONSE } from '@/contract';

// In your API route handler
export async function POST(request) {
  const body = await request.json();
  
  // Validate against contract
  const validation = validateOrder(body);
  if (!validation.isValid) {
    return Response.json({
      success: false,
      errors: validation.errors
    }, { status: 400 });
  }
  
  // Process order...
  return Response.json({
    success: true,
    data: { orderId, orderStatus, total }
  });
}
```

## 📋 API Endpoint Summary

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/slug/:slug` - Get product by slug

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:orderId` - Get order details
- `PUT /api/orders/:orderId/cancel` - Cancel order
- `GET /api/orders/:orderId/track` - Track order

### Designs
- `POST /api/designs` - Create/save design
- `GET /api/designs` - Get user's designs
- `GET /api/designs/:designId` - Get design by ID
- `PUT /api/designs/:designId` - Update design
- `DELETE /api/designs/:designId` - Delete design
- `POST /api/designs/:designId/preview` - Generate preview

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:cartItemId` - Update cart item
- `DELETE /api/cart/items/:cartItemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart
- `POST /api/cart/coupon` - Apply coupon
- `DELETE /api/cart/coupon` - Remove coupon

### User & Auth
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/addresses` - Add new address
- `PUT /api/user/addresses/:addressId` - Update address
- `DELETE /api/user/addresses/:addressId` - Delete address

## 🎨 Product Categories

The following product categories are supported:
- **TSHIRT** - Custom printed t-shirts
- **MUG** - Personalized mugs
- **FRAME** - Photo frames with engraving
- **CUSHION** - Custom printed cushions
- **CLOTHING** - General clothing items
- **GIFT** - Gift items
- **KEYCHAIN** - Custom keychains
- **CALENDAR** - Personalized calendars
- **POSTER** - Custom posters
- **CARD** - Greeting cards

## 🔐 Validation

All contracts include validation functions to ensure data integrity:

- **Product Validation**: Validates basic info, pricing, inventory
- **Order Validation**: Validates items, shipping address, payment details
- **Design Validation**: Validates canvas settings, design elements
- **Cart Validation**: Validates cart items, quantities, stock availability
- **User Validation**: Validates email, phone, password strength, addresses

## 📝 Notes

- All monetary values are in the smallest currency unit (paise for INR)
- Dates should be ISO 8601 formatted strings
- All IDs should be unique strings (UUIDs recommended)
- Phone numbers should be 10 digits (Indian format)
- Pincodes should be 6 digits (Indian format)

## 🔄 Future Enhancements

- Add TypeScript type definitions
- Add more product categories
- Add review/rating contracts
- Add wishlist contracts
- Add notification contracts

