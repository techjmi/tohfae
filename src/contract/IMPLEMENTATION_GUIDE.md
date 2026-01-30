# Implementation Guide - Tohfae Gift Store API Contracts

## 🎯 Overview

This guide will help you implement the backend API based on the contracts defined in this directory.

## 📦 What's Been Created

### Contract Files
1. ✅ **product.contract.js** - Product catalog contracts
2. ✅ **order.contract.js** - Order management contracts
3. ✅ **design.contract.js** - Design/customization contracts
4. ✅ **cart.contract.js** - Shopping cart contracts
5. ✅ **user.contract.js** - User & authentication contracts
6. ✅ **index.js** - Central export file
7. ✅ **README.md** - Documentation

## 🚀 Next Steps for Backend Implementation

### Step 1: Set Up Database Models

Based on the contracts, create MongoDB/Mongoose models:

```javascript
// models/Product.model.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  tenantId: { type: String, required: true },
  category: { type: String, required: true },
  basic: {
    name: { type: String, required: true },
    shortDescription: String,
    description: String,
    brand: String,
  },
  media: {
    images: [String],
    thumbnail: String,
  },
  pricing: {
    currency: { type: String, default: 'INR' },
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    discount: {
      type: { type: String },
      value: Number,
      label: String,
    },
    delivery: {
      charges: Number,
      freeAbove: Number,
    },
    isCodAvailable: { type: Boolean, default: true },
    paymentOptionsAvailable: [String],
  },
  inventory: {
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, default: 0 },
  },
  configurator: {
    enabled: { type: Boolean, default: false },
    type: String,
    options: [mongoose.Schema.Types.Mixed],
  },
  status: {
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
```

### Step 2: Create API Routes

Create Express.js routes following the contract specifications:

```javascript
// routes/product.routes.js
const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getProductBySlug } = require('../controllers/product.controller');

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/products/slug/:slug', getProductBySlug);

module.exports = router;
```

### Step 3: Implement Controllers

Create controllers that follow the response contracts:

```javascript
// controllers/product.controller.js
const Product = require('../models/Product.model');
const { validateProduct } = require('../../tohfae/src/contract/product.contract');

exports.getProducts = async (req, res) => {
  try {
    const { category, featured, inStock, page = 1, limit = 20, sort, search } = req.query;
    
    // Build query
    const query = {};
    if (category) query.category = category;
    if (featured !== undefined) query['status.isFeatured'] = featured === 'true';
    if (inStock !== undefined) query['inventory.inStock'] = inStock === 'true';
    if (search) query['basic.name'] = { $regex: search, $options: 'i' };
    
    // Execute query with pagination
    const skip = (page - 1) * limit;
    const products = await Product.find(query).skip(skip).limit(parseInt(limit));
    const totalItems = await Product.countDocuments(query);
    
    // Return response matching contract
    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          itemsPerPage: parseInt(limit),
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

### Step 4: Add Validation Middleware

Use the validation functions from contracts:

```javascript
// middleware/validateRequest.js
const { validateProduct } = require('../../tohfae/src/contract/product.contract');

exports.validateProductMiddleware = (req, res, next) => {
  const validation = validateProduct(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      errors: validation.errors
    });
  }
  
  next();
};
```

### Step 5: Implement Remaining Models

Create models for:
- **Order** (order.contract.js)
- **Design** (design.contract.js)
- **Cart** (cart.contract.js)
- **User** (user.contract.js) - You may already have this

### Step 6: Implement Authentication

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};
```

## 🔧 Environment Variables

Add these to your `.env` file:

```env
# Database
MONGO_URL=mongodb://localhost:27017/tohfae

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Server
PORT=8000
NODE_ENV=development

# Frontend URL
WEB_ORIGIN=http://localhost:3000

# Payment Gateway (if using)
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret

# File Upload (if using cloud storage)
AWS_S3_BUCKET=your-bucket
AWS_ACCESS_KEY=your-key
AWS_SECRET_KEY=your-secret
```

## 📱 Frontend Integration

In your Next.js app, create API service files:

```javascript
// services/api/products.js
import { GET_PRODUCTS_REQUEST } from '@/contract';

export const getProducts = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await fetch(`/api/products?${queryParams}`);
  return response.json();
};

export const getProductBySlug = async (slug) => {
  const response = await fetch(`/api/products/slug/${slug}`);
  return response.json();
};
```

## 🧪 Testing

Create tests for your API endpoints:

```javascript
// tests/product.test.js
const request = require('supertest');
const app = require('../app');

describe('Product API', () => {
  it('should get all products', async () => {
    const response = await request(app)
      .get('/api/products')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.products).toBeInstanceOf(Array);
  });
  
  it('should filter products by category', async () => {
    const response = await request(app)
      .get('/api/products?category=tshirt')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    response.body.data.products.forEach(product => {
      expect(product.category).toBe('tshirt');
    });
  });
});
```

## 📊 Database Seeding

Use the PRODUCT_DATA from product.contract.js to seed your database:

```javascript
// scripts/seedProducts.js
const mongoose = require('mongoose');
const Product = require('../models/Product.model');
const { PRODUCT_DATA } = require('../../tohfae/src/contract/product.contract');

async function seedProducts() {
  await mongoose.connect(process.env.MONGO_URL);
  await Product.deleteMany({});
  await Product.insertMany(PRODUCT_DATA);
  console.log('Products seeded successfully');
  process.exit(0);
}

seedProducts();
```

## 🎨 Design Editor Integration

For the design customization feature, consider using:
- **Fabric.js** - Canvas manipulation library
- **Konva.js** - Alternative canvas library
- **React-Konva** - React wrapper for Konva

## 📦 Recommended Packages

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "multer": "^1.4.5-lts.1",
    "razorpay": "^2.8.6"
  }
}
```

## 🚦 Implementation Priority

1. **Phase 1** - Core Features
   - ✅ Product listing and details
   - ✅ User authentication
   - ✅ Shopping cart
   - ✅ Order placement

2. **Phase 2** - Customization
   - ⏳ Design editor
   - ⏳ Image upload
   - ⏳ Preview generation

3. **Phase 3** - Advanced Features
   - ⏳ Payment integration
   - ⏳ Order tracking
   - ⏳ Admin dashboard
   - ⏳ Analytics

## 📞 Support

For questions or issues with the contracts, refer to the README.md in this directory.

