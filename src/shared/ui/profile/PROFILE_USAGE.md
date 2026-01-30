# Profile Components Usage Guide

## Overview

The profile system consists of 3 main components:
1. **UserAvatar** - Reusable avatar (can be used anywhere)
2. **UserProfile** - Avatar + user info (navbar or profile sections)
3. **ProfileBody** - Full profile details (profile pages)

---

## 1. UserAvatar (Most Reusable)

### Basic Usage
```jsx
import { UserAvatar } from '@/shared/ui/profile';

<UserAvatar 
  user={user} 
  size="md" 
  showStatus={true} 
/>
```

### Props
- `user` - User object with name, avatar, etc.
- `size` - "xs" | "sm" | "md" | "lg" | "xl"
- `showStatus` - Show online/offline indicator
- `status` - "online" | "offline" | "away" | "busy"
- `onClick` - Click handler
- `className` - Custom CSS classes

### Examples
```jsx
// Small avatar in comment
<UserAvatar user={user} size="sm" />

// Large avatar with status
<UserAvatar user={user} size="lg" showStatus={true} status="online" />

// Clickable avatar
<UserAvatar user={user} onClick={handleClick} />
```

---

## 2. UserProfile (Navbar + Profile Sections)

### Mode 1: Compact (For Navbar with Dropdown)
```jsx
import { UserProfile } from '@/shared/ui/profile';

// In your Header/Navbar component
<UserProfile 
  user={user}
  mode="compact"
  showDropdown={true}
  size="md"
  showStatus={true}
  onMenuItemClick={handleMenuClick}
/>
```

### Mode 2: Full (For Profile Sections)
```jsx
<UserProfile 
  user={user}
  mode="full"
  orientation="horizontal"
  size="lg"
  showEmail={true}
  showPhone={true}
  showStatus={true}
/>
```

### Props
- `user` - User object
- `mode` - "compact" | "full"
- `orientation` - "horizontal" | "vertical"
- `size` - Avatar size
- `showStatus` - Show status indicator
- `showEmail` - Show email (full mode)
- `showPhone` - Show phone (full mode)
- `showDropdown` - Show dropdown menu (compact mode)
- `dropdownMenu` - Custom menu items array
- `onMenuItemClick` - Menu item click handler

### Custom Dropdown Menu
```jsx
const customMenu = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Settings", href: "/settings", icon: "settings" },
  { type: "divider" },
  { label: "Logout", href: "/logout", icon: "logout", variant: "danger" },
];

<UserProfile 
  user={user}
  mode="compact"
  showDropdown={true}
  dropdownMenu={customMenu}
/>
```

---

## 3. ProfileBody (Full Profile Page)

### Basic Usage
```jsx
import { ProfileBody } from '@/shared/ui/profile';

<ProfileBody 
  user={user}
  editable={true}
  showEmail={true}
  showPhone={true}
  showAddress={true}
  showBio={true}
  onEdit={handleEdit}
/>
```

### With Custom Content
```jsx
<ProfileBody user={user} editable={true} onEdit={handleEdit}>
  {/* Custom sections */}
  <div className="mt-4">
    <h3 className="font-semibold mb-2">Recent Orders</h3>
    <OrderList orders={userOrders} />
  </div>
  
  <div className="mt-4">
    <h3 className="font-semibold mb-2">Wishlist</h3>
    <WishlistItems items={wishlist} />
  </div>
</ProfileBody>
```

### Props
- `user` - User object
- `editable` - Show edit button
- `showEmail` - Show email section
- `showPhone` - Show phone section
- `showAddress` - Show address section
- `showBio` - Show bio/about section
- `onEdit` - Edit button click handler
- `children` - Custom content sections

---

## Complete Example: Header with Profile Dropdown

```jsx
// components/layout/header/Header.jsx
"use client";

import { UserProfile } from '@/shared/ui/profile';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/john.jpg",
    status: "online",
  };

  const handleMenuClick = (item) => {
    if (item.href === '/logout') {
      // Handle logout
      console.log('Logging out...');
    } else {
      router.push(item.href);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="logo">Tohfae</div>
        
        <nav className="flex items-center gap-6">
          <a href="/products">Products</a>
          <a href="/about">About</a>
          
          {/* Profile with Dropdown */}
          <UserProfile 
            user={user}
            mode="compact"
            showDropdown={true}
            showStatus={true}
            size="md"
            onMenuItemClick={handleMenuClick}
          />
        </nav>
      </div>
    </header>
  );
}
```

---

## Complete Example: Profile Page

```jsx
// app/profile/page.js
import { ProfileBody } from '@/shared/ui/profile';

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "+91 9876543210",
    avatar: "/avatars/john.jpg",
    role: "Premium Member",
    status: "online",
    bio: "Gift enthusiast and design lover. Creating memories one gift at a time.",
    address: {
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
  };

  const handleEdit = () => {
    console.log('Edit profile clicked');
    // Navigate to edit page or open modal
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileBody 
        user={user}
        editable={true}
        showEmail={true}
        showPhone={true}
        showAddress={true}
        showBio={true}
        onEdit={handleEdit}
      >
        {/* Custom sections */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-gray-600">Orders</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-gray-600">Designs</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-gray-600">Wishlist</p>
            </div>
          </div>
        </div>
      </ProfileBody>
    </div>
  );
}
```

---

## User Object Structure

```javascript
const user = {
  // Required
  name: "John Doe",
  
  // Optional
  username: "johndoe",
  email: "john@example.com",
  phone: "+91 9876543210",
  avatar: "/path/to/avatar.jpg",
  profilePicture: "/path/to/picture.jpg", // Alternative to avatar
  image: "/path/to/image.jpg", // Alternative to avatar
  role: "Premium Member",
  status: "online", // "online" | "offline" | "away" | "busy"
  bio: "User bio text...",
  address: {
    street: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India",
  },
};
```

---

## Summary

✅ **UserAvatar** - Use anywhere you need just an avatar  
✅ **UserProfile (compact)** - Use in navbar with dropdown  
✅ **UserProfile (full)** - Use in profile sections with details  
✅ **ProfileBody** - Use in full profile pages  

All components work together and use your existing Dropdown component! 🎉

