# Usage Examples

## Frontend Examples (Next.js)

### 1. Fetching Products

```javascript
// app/products/page.js
import { PRODUCT_CATEGORY } from '@/contract';

export default async function ProductsPage({ searchParams }) {
  const category = searchParams.category || '';
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${category}`
  );
  const data = await response.json();
  
  return (
    <div>
      <h1>Products</h1>
      {data.success && (
        <div>
          {data.data.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### 2. Adding to Cart

```javascript
// components/AddToCartButton.js
'use client';
import { useState } from 'react';

export default function AddToCartButton({ productId, designId }) {
  const [loading, setLoading] = useState(false);
  
  const handleAddToCart = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/cart/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
          customization: designId ? { designId } : undefined
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Added to cart!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <button onClick={handleAddToCart} disabled={loading}>
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
```

### 3. Creating an Order

```javascript
// app/checkout/actions.js
'use server';
import { validateOrder } from '@/contract/order.contract';

export async function createOrder(formData) {
  const orderData = {
    items: formData.items,
    shippingAddress: {
      fullName: formData.fullName,
      phone: formData.phone,
      addressLine1: formData.addressLine1,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      country: 'India'
    },
    paymentMethod: formData.paymentMethod
  };
  
  // Validate before sending
  const validation = validateOrder(orderData);
  if (!validation.isValid) {
    return { success: false, errors: validation.errors };
  }
  
  const response = await fetch(`${process.env.API_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${formData.token}`
    },
    body: JSON.stringify(orderData)
  });
  
  return response.json();
}
```

### 4. Design Editor Integration

```javascript
// components/DesignEditor.js
'use client';
import { useState } from 'react';
import { validateDesign, DESIGN_TYPE } from '@/contract/design.contract';

export default function DesignEditor({ productId, productCategory }) {
  const [canvas, setCanvas] = useState({
    width: 800,
    height: 600,
    backgroundColor: '#ffffff'
  });
  
  const [elements, setElements] = useState([]);
  
  const addTextElement = () => {
    const newElement = {
      id: `elem_${Date.now()}`,
      type: DESIGN_TYPE.TEXT,
      position: { x: 100, y: 100, width: 200, height: 50, rotation: 0 },
      text: {
        content: 'Your Text Here',
        fontSize: 24,
        fontFamily: 'Arial',
        color: '#000000',
        alignment: 'center'
      }
    };
    
    setElements([...elements, newElement]);
  };
  
  const saveDesign = async () => {
    const designData = {
      productId,
      productCategory,
      name: 'My Design',
      canvas,
      elements,
      status: 'saved'
    };
    
    // Validate before saving
    const validation = validateDesign(designData);
    if (!validation.isValid) {
      alert('Design validation failed: ' + validation.errors.join(', '));
      return;
    }
    
    const response = await fetch('/api/designs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(designData)
    });
    
    const data = await response.json();
    if (data.success) {
      alert('Design saved!');
      return data.data.designId;
    }
  };
  
  return (
    <div>
      <div style={{ width: canvas.width, height: canvas.height, backgroundColor: canvas.backgroundColor }}>
        {/* Render design elements */}
      </div>
      <button onClick={addTextElement}>Add Text</button>
      <button onClick={saveDesign}>Save Design</button>
    </div>
  );
}
```

## Backend Examples (Express.js)

### 1. Product Controller

```javascript
// controllers/product.controller.js
const Product = require('../models/Product.model');
const { validateProduct } = require('../../tohfae/src/contract/product.contract');

exports.getProducts = async (req, res) => {
  try {
    const { category, featured, inStock, page = 1, limit = 20, search } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (featured) query['status.isFeatured'] = featured === 'true';
    if (inStock) query['inventory.inStock'] = inStock === 'true';
    if (search) query['basic.name'] = { $regex: search, $options: 'i' };
    
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    
    const totalItems = await Product.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          itemsPerPage: parseInt(limit)
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

### 2. Cart Controller

```javascript
// controllers/cart.controller.js
const Cart = require('../models/Cart.model');
const Product = require('../models/Product.model');
const { validateCartItem } = require('../../tohfae/src/contract/cart.contract');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, customization } = req.body;
    const userId = req.user.id;
    
    // Get product details
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Check stock
    if (!product.inventory.inStock || product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Product out of stock'
      });
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    
    // Create cart item
    const cartItem = {
      cartItemId: `cart_item_${Date.now()}`,
      productId: product.id,
      productName: product.basic.name,
      productSlug: product.slug,
      category: product.category,
      thumbnail: product.media.thumbnail,
      quantity,
      price: product.pricing.sellingPrice,
      mrp: product.pricing.mrp,
      customization,
      inStock: product.inventory.inStock,
      maxQuantity: product.inventory.quantity,
      addedAt: new Date()
    };
    
    // Validate cart item
    const validation = validateCartItem(cartItem);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      });
    }
    
    // Add to cart
    cart.items.push(cartItem);
    
    // Calculate summary
    cart.summary = {
      itemCount: cart.items.length,
      subtotal: cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      discount: 0,
      deliveryCharges: 50,
      estimatedTotal: 0
    };
    cart.summary.estimatedTotal = cart.summary.subtotal + cart.summary.deliveryCharges;
    
    await cart.save();
    
    res.json({
      success: true,
      message: 'Item added to cart',
      data: {
        cartItemId: cartItem.cartItemId,
        itemCount: cart.summary.itemCount,
        estimatedTotal: cart.summary.estimatedTotal
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

These examples show how to use the contracts in both frontend and backend code!

