# Payment Methods Guide

## Overview

The product contract now has a proper payment structure that handles:
- COD (Cash on Delivery) availability and extra charges
- Multiple payment methods per product
- Dynamic charge calculation

## Product Pricing Structure

```javascript
pricing: {
  currency: "INR",
  mrp: 1000,
  sellingPrice: 900,
  
  // Delivery settings
  delivery: {
    charges: 50,        // Delivery charge
    freeAbove: 999,     // Free delivery above this amount
  },
  
  // COD settings
  cod: {
    available: true,    // Is COD available for this product?
    extraCharges: 10,   // Extra charges for COD (₹10)
  },
  
  // Available payment methods for this product
  availablePaymentMethods: [
    PAYMENT_METHOD.COD,
    PAYMENT_METHOD.ONLINE,
    PAYMENT_METHOD.EMI,
    PAYMENT_METHOD.NETBANKING,
    PAYMENT_METHOD.WALLET,
    PAYMENT_METHOD.GIFTCARD,
    PAYMENT_METHOD.UPI,
  ],
}
```

## Payment Method Constants

```javascript
export const PAYMENT_METHOD = {
  COD: "cod",
  ONLINE: "online",
  EMI: "emi",
  NETBANKING: "netbanking",
  WALLET: "wallet",
  GIFTCARD: "giftcard",
  UPI: "upi",
};
```

## Helper Functions

### 1. Calculate Total Price

```javascript
import { calculateTotalPrice, PAYMENT_METHOD } from '@/contract/product.contract';

const product = PRODUCT_DATA[0]; // T-shirt
const quantity = 2;

// Calculate for online payment
const onlineTotal = calculateTotalPrice(product, PAYMENT_METHOD.ONLINE, quantity);
// Result: (900 × 2) + 50 (delivery) = ₹1850

// Calculate for COD payment
const codTotal = calculateTotalPrice(product, PAYMENT_METHOD.COD, quantity);
// Result: (900 × 2) + 50 (delivery) + 10 (COD charges) = ₹1860
```

### 2. Check Payment Method Availability

```javascript
import { isPaymentMethodAvailable, PAYMENT_METHOD } from '@/contract/product.contract';

const product = PRODUCT_DATA[1]; // Mug

// Check if EMI is available
const emiAvailable = isPaymentMethodAvailable(product, PAYMENT_METHOD.EMI);
// Result: false (Mug doesn't support EMI)

// Check if UPI is available
const upiAvailable = isPaymentMethodAvailable(product, PAYMENT_METHOD.UPI);
// Result: true
```

### 3. Get COD Charges

```javascript
import { getCodCharges } from '@/contract/product.contract';

const product = PRODUCT_DATA[0];
const codCharges = getCodCharges(product);
// Result: 10
```

### 4. Calculate Delivery Charges

```javascript
import { calculateDeliveryCharges } from '@/contract/product.contract';

const product = PRODUCT_DATA[0];

// For 1 item (₹900 - below ₹999)
const charges1 = calculateDeliveryCharges(product, 1);
// Result: 50

// For 2 items (₹1800 - above ₹999)
const charges2 = calculateDeliveryCharges(product, 2);
// Result: 0 (free delivery)
```

## Frontend Usage Example

```javascript
// components/ProductCheckout.js
'use client';
import { useState } from 'react';
import { 
  calculateTotalPrice, 
  isPaymentMethodAvailable,
  getCodCharges,
  PAYMENT_METHOD 
} from '@/contract/product.contract';

export default function ProductCheckout({ product, quantity }) {
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.ONLINE);
  
  const total = calculateTotalPrice(product, paymentMethod, quantity);
  const codCharges = paymentMethod === PAYMENT_METHOD.COD ? getCodCharges(product) : 0;
  
  return (
    <div>
      <h2>Select Payment Method</h2>
      
      {/* Show only available payment methods */}
      {product.pricing.availablePaymentMethods.map(method => (
        <label key={method}>
          <input
            type="radio"
            value={method}
            checked={paymentMethod === method}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          {method.toUpperCase()}
          {method === PAYMENT_METHOD.COD && product.pricing.cod?.available && (
            <span> (+₹{product.pricing.cod.extraCharges} extra)</span>
          )}
        </label>
      ))}
      
      <div className="price-breakdown">
        <p>Product Price: ₹{product.pricing.sellingPrice} × {quantity}</p>
        <p>Subtotal: ₹{product.pricing.sellingPrice * quantity}</p>
        
        {codCharges > 0 && (
          <p>COD Charges: ₹{codCharges}</p>
        )}
        
        <p>Delivery: ₹{calculateDeliveryCharges(product, quantity)}</p>
        
        <h3>Total: ₹{total}</h3>
      </div>
    </div>
  );
}
```

## Backend Usage Example

```javascript
// controllers/order.controller.js
const { 
  calculateTotalPrice, 
  isPaymentMethodAvailable,
  PAYMENT_METHOD 
} = require('../../tohfae/src/contract/product.contract');

exports.createOrder = async (req, res) => {
  const { items, paymentMethod } = req.body;
  
  let orderTotal = 0;
  
  for (const item of items) {
    const product = await Product.findOne({ id: item.productId });
    
    // Validate payment method is available for this product
    if (!isPaymentMethodAvailable(product, paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: `Payment method ${paymentMethod} not available for ${product.basic.name}`
      });
    }
    
    // Calculate item total with payment method charges
    const itemTotal = calculateTotalPrice(product, paymentMethod, item.quantity);
    orderTotal += itemTotal;
  }
  
  // Create order with calculated total
  const order = new Order({
    items,
    paymentMethod,
    total: orderTotal,
    // ... other fields
  });
  
  await order.save();
  
  res.json({
    success: true,
    data: { orderId: order.id, total: orderTotal }
  });
};
```

## Price Calculation Logic

### For Online Payment:
```
Total = (Selling Price × Quantity) + Delivery Charges
```

### For COD Payment:
```
Total = (Selling Price × Quantity) + Delivery Charges + COD Extra Charges
```

### Delivery Charges:
```
If (Subtotal >= Free Delivery Threshold):
  Delivery Charges = 0
Else:
  Delivery Charges = Product Delivery Charges
```

## Product Examples

### T-Shirt (All payment methods)
- COD: Available (₹10 extra)
- Payment Methods: COD, Online, EMI, Net Banking, Wallet, Gift Card, UPI

### Mug (Limited payment methods)
- COD: Available (₹10 extra)
- Payment Methods: COD, Online, UPI, Wallet

### Frame (Basic payment methods)
- COD: Available (₹10 extra)
- Payment Methods: COD, Online, UPI, Wallet

### Cushion (Minimal payment methods)
- COD: Available (₹10 extra)
- Payment Methods: COD, Online, UPI

## Validation

The contract includes validation for:
- ✅ COD availability (boolean)
- ✅ COD extra charges (number)
- ✅ Payment methods array
- ✅ Valid payment method values

```javascript
import { validateProductPricing } from '@/contract/product.contract';

const validation = validateProductPricing(product.pricing);
if (!validation.isValid) {
  console.error('Pricing errors:', validation.errors);
}
```

