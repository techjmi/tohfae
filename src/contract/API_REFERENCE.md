# API Reference - Quick Guide

## 🔐 Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## 📦 Products API

### Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `category` (optional) - Filter by category (tshirt, mug, frame, etc.)
- `featured` (optional) - Filter featured products (true/false)
- `inStock` (optional) - Filter in-stock products (true/false)
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 20, max: 100)
- `sort` (optional) - Sort order (price_asc, price_desc, name_asc, name_desc, newest)
- `search` (optional) - Search by product name

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 100,
      "itemsPerPage": 20
    }
  }
}
```

### Get Product by ID
```http
GET /api/products/:id
```

### Get Product by Slug
```http
GET /api/products/slug/:slug
```

---

## 🛒 Cart API

### Get Cart
```http
GET /api/cart
```
🔒 Requires authentication

### Add to Cart
```http
POST /api/cart/items
```
🔒 Requires authentication

**Body:**
```json
{
  "productId": "prod_tshirt_001",
  "quantity": 2,
  "customization": {
    "designId": "design_123",
    "options": {}
  }
}
```

### Update Cart Item
```http
PUT /api/cart/items/:cartItemId
```
🔒 Requires authentication

**Body:**
```json
{
  "quantity": 3
}
```

### Remove from Cart
```http
DELETE /api/cart/items/:cartItemId
```
🔒 Requires authentication

### Apply Coupon
```http
POST /api/cart/coupon
```
🔒 Requires authentication

**Body:**
```json
{
  "couponCode": "SAVE20"
}
```

### Remove Coupon
```http
DELETE /api/cart/coupon
```
🔒 Requires authentication

---

## 🎨 Design API

### Create Design
```http
POST /api/designs
```
🔒 Requires authentication

**Body:**
```json
{
  "productId": "prod_tshirt_001",
  "productCategory": "tshirt",
  "name": "My Custom Design",
  "canvas": {
    "width": 800,
    "height": 600,
    "backgroundColor": "#ffffff"
  },
  "elements": [
    {
      "id": "elem_1",
      "type": "text",
      "position": { "x": 100, "y": 100, "width": 200, "height": 50 },
      "text": {
        "content": "Hello World",
        "fontSize": 24,
        "color": "#000000"
      }
    }
  ]
}
```

### Get User's Designs
```http
GET /api/designs
```
🔒 Requires authentication

**Query Parameters:**
- `productId` (optional)
- `status` (optional) - draft, saved, submitted
- `page` (optional)
- `limit` (optional)

### Get Design by ID
```http
GET /api/designs/:designId
```
🔒 Requires authentication

### Update Design
```http
PUT /api/designs/:designId
```
🔒 Requires authentication

### Delete Design
```http
DELETE /api/designs/:designId
```
🔒 Requires authentication

### Generate Preview
```http
POST /api/designs/:designId/preview
```
🔒 Requires authentication

---

## 📦 Orders API

### Create Order
```http
POST /api/orders
```
🔒 Requires authentication

**Body:**
```json
{
  "items": [
    {
      "productId": "prod_tshirt_001",
      "productName": "Custom T-Shirt",
      "quantity": 2,
      "price": 900,
      "customization": {
        "designId": "design_123"
      }
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "9876543210",
    "addressLine1": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "country": "India"
  },
  "paymentMethod": "online",
  "couponCode": "SAVE20"
}
```

### Get User's Orders
```http
GET /api/orders
```
🔒 Requires authentication

**Query Parameters:**
- `status` (optional) - pending, confirmed, shipped, delivered, cancelled
- `page` (optional)
- `limit` (optional)

### Get Order Details
```http
GET /api/orders/:orderId
```
🔒 Requires authentication

### Cancel Order
```http
PUT /api/orders/:orderId/cancel
```
🔒 Requires authentication

**Body:**
```json
{
  "reason": "Changed my mind"
}
```

### Track Order
```http
GET /api/orders/:orderId/track
```
🔒 Requires authentication

---

## 👤 User & Auth API

### Sign Up
```http
POST /api/auth/signup
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9876543210"
}
```

### Sign In
```http
POST /api/auth/signin
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

### Sign Out
```http
POST /api/auth/signout
```
🔒 Requires authentication

### Get Profile
```http
GET /api/user/profile
```
🔒 Requires authentication

### Update Profile
```http
PUT /api/user/profile
```
🔒 Requires authentication

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9876543210",
  "dateOfBirth": "1990-01-01"
}
```

### Add Address
```http
POST /api/user/addresses
```
🔒 Requires authentication

**Body:**
```json
{
  "label": "Home",
  "fullName": "John Doe",
  "phone": "9876543210",
  "addressLine1": "123 Main St",
  "addressLine2": "Apt 4B",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "country": "India",
  "isDefault": true
}
```

### Update Address
```http
PUT /api/user/addresses/:addressId
```
🔒 Requires authentication

### Delete Address
```http
DELETE /api/user/addresses/:addressId
```
🔒 Requires authentication

---

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔑 Product Categories

- `tshirt` - Custom T-Shirts
- `mug` - Personalized Mugs
- `frame` - Photo Frames
- `cushion` - Custom Cushions
- `clothing` - Clothing Items
- `gift` - Gift Items
- `keychain` - Keychains
- `calendar` - Calendars
- `poster` - Posters
- `card` - Greeting Cards

---

## 💳 Payment Methods

- `cod` - Cash on Delivery
- `online` - Online Payment (UPI/Card/Wallet)
- `emi` - EMI Options
- `netbanking` - Net Banking
- `wallet` - Digital Wallets
- `giftcard` - Gift Cards
- `upi` - UPI Payment

---

## 📦 Order Status

- `pending` - Order placed, awaiting confirmation
- `confirmed` - Order confirmed
- `processing` - Order being processed
- `shipped` - Order shipped
- `delivered` - Order delivered
- `cancelled` - Order cancelled
- `refunded` - Order refunded
- `failed` - Order failed

---

## 🎨 Design Element Types

- `text` - Text elements
- `image` - Image elements
- `template` - Template-based designs
- `custom` - Custom designs
- `mixed` - Mixed elements

---

## 💡 Tips

1. **Pagination**: Always use pagination for list endpoints to improve performance
2. **Caching**: Consider caching product listings and details
3. **Image Optimization**: Compress and optimize images before upload
4. **Validation**: Always validate data on both client and server side
5. **Error Handling**: Implement proper error handling and user-friendly messages
6. **Security**: Never expose sensitive data in API responses
7. **Rate Limiting**: Implement rate limiting to prevent abuse

---

## 🧪 Testing with cURL

### Get Products
```bash
curl -X GET "http://localhost:8000/api/products?category=tshirt&page=1&limit=10"
```

### Create Order (with auth)
```bash
curl -X POST "http://localhost:8000/api/orders" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [...],
    "shippingAddress": {...},
    "paymentMethod": "online"
  }'
```

### Add to Cart
```bash
curl -X POST "http://localhost:8000/api/cart/items" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod_tshirt_001",
    "quantity": 2
  }'
```

