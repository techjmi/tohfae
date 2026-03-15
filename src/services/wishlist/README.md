# Wishlist Service

This service handles guest wishlist operations using browser localStorage.

## Overview

Guest users can add products to their wishlist without logging in. The wishlist is stored locally in the browser and persists across sessions. There is a limit of 20 items for guest users.

## Files

```
services/wishlist/
├── guest-wishlist-service.js  # Guest wishlist operations
├── wishlist.service.js         # Main wishlist service (future: authenticated users)
├── wishlist.constant.js        # Constants and messages
├── index.js                    # Exports
└── README.md
```

## Guest Wishlist Service

The guest wishlist service provides three methods for managing wishlist items.

### Methods

**getWishlist()**

Returns all wishlist items with complete product details.

```javascript
import { GuestWishlistService } from '@/services/wishlist';

const wishlist = GuestWishlistService.getWishlist();
// Returns: [
//   {
//     id: 'product-123',
//     slug: 'custom-t-shirt',
//     name: 'Custom T-Shirt',
//     image: 'https://example.com/image.jpg',
//     price: 499,
//     mrp: 999,
//     discount: 50,
//     addedAt: '2024-01-01T00:00:00.000Z'
//   }
// ]
```

**addToWishlist(productData)**

Adds a product to the wishlist with full product details. Shows success toast on add. Shows error toast if limit is reached.

```javascript
GuestWishlistService.addToWishlist({
  id: 'product-123',
  slug: 'custom-t-shirt',
  name: 'Custom T-Shirt',
  image: 'https://example.com/image.jpg',
  price: 499,
  mrp: 999,
  discount: 50
});
```

**removeFromWishlist(productId)**

Removes a product from the wishlist by ID. Shows success toast on remove.

```javascript
GuestWishlistService.removeFromWishlist('product-123');
```

## Constants

All constants are defined in `wishlist.constant.js`.

**GUEST_WISHLIST_KEY**

The localStorage key used to store the wishlist.

```javascript
'tohfae_guest_wishlist'
```

**GUEST_WISHLIST_LIMIT**

Maximum number of items a guest user can add to wishlist.

```javascript
20
```

**GUEST_WISHLIST_MSG**

Toast messages shown to users.

```javascript
{
  ADDED_TO_WISHLIST: 'Added to wishlist',
  REMOVED_FROM_WISHLIST: 'Removed from wishlist',
  LIMIT_REACHED: 'Wishlist limit reached, Please login to continue.'
}
```

## Usage in Components

### Example 1: Simple Wishlist Button

```javascript
'use client';
import { GuestWishlistService } from '@/services/wishlist';
import { useEffect, useState } from 'react';

export default function WishlistButton({ product }) {
  const [isInWishlist, setIsInWishlist] = useState(() => {
    const wishlist = GuestWishlistService.getWishlist();
    return wishlist.some(item => item.id === product.id);
  });

  const handleToggle = () => {
    if (isInWishlist) {
      GuestWishlistService.removeFromWishlist(product.id);
      setIsInWishlist(false);
    } else {
      GuestWishlistService.addToWishlist({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        mrp: product.mrp,
        discount: product.discount
      });
      setIsInWishlist(true);
    }
  };

  return (
    <button onClick={handleToggle}>
      {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </button>
  );
}
```

### Example 2: Using in Product Card

```javascript
import { WishlistButton } from '@/shared/ui/wishlist';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      <WishlistButton product={product} />
    </div>
  );
}
```

### Example 3: Wishlist Page

```javascript
'use client';
import { GuestWishlistService } from '@/services/wishlist';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(GuestWishlistService.getWishlist());
  }, []);

  const handleRemove = (productId) => {
    const updated = GuestWishlistService.removeFromWishlist(productId);
    setWishlist(updated);
  };

  return (
    <div>
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div>
          {wishlist.map(item => (
            <div key={item.id}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              {item.discount > 0 && <span>-{item.discount}%</span>}
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Technical Details

The service uses `isBrowser` utility from `@/shared/utils/window` to check if code is running in the browser. This prevents errors during server-side rendering.

All methods return an empty array if called on the server or if an error occurs.

Toast notifications are shown using `react-toastify`.

The wishlist stores only product IDs as strings. Full product data should be fetched separately when needed.

## Future Enhancements

The main `wishlist.service.js` will handle both guest and authenticated users. When a user logs in, their guest wishlist will be synced to the backend and merged with their existing wishlist.

