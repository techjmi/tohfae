# Header Component

Server-side and client-side header component with authentication, navigation, and responsive design.

## Overview

The Header component provides a sticky navigation bar with different layouts for desktop and mobile devices. It integrates with Redux for authentication state management and provides user menus, search functionality, and cart access.

## File Structure

```
header/
├── Header.jsx                  # Main header component
├── Navbar.jsx                  # Desktop navigation with auth dropdown
├── UserProfileMenu.jsx         # Logged-in user menu (desktop)
├── MobileMenu.jsx              # Mobile hamburger menu
├── MobileUserMenu.jsx          # Mobile user account menu
├── SearchBar.jsx               # Search input component
├── CartIcon.jsx                # Shopping cart icon with badge
├── SubNavbar.jsx               # Secondary navigation bar
├── header.constant.js          # All constants and configuration
├── header.style.css            # Custom styles
├── index.js                    # Exports
└── README.md                   # This file
```

## Components

### 1. Header.jsx - Main Component

**Purpose:** Root header component with responsive layout

**Features:**
- Sticky positioning with z-index management
- Desktop and mobile layouts
- State management for mobile menus
- Client component (uses useState)

**Desktop Layout:**
- Logo
- SearchBar
- Navbar (with auth dropdown)
- CartIcon

**Mobile Layout:**
- Hamburger menu button
- SearchBar
- MobileUserMenu (avatar when logged in)

### 2. Navbar.jsx - Desktop Navigation

**Purpose:** Desktop navigation with authentication-aware dropdown

**Features:**
- Uses Redux for authentication state
- Shows UserProfileMenu when logged in
- Shows "Hello, sign in" dropdown when not logged in
- Always shows "Returns & Orders" link
- Two-column dropdown layout

**Authentication States:**
- Logged Out: Sign in button with account/lists dropdown
- Logged In: User avatar with profile dropdown

### 3. UserProfileMenu.jsx - Logged-in User Menu

**Purpose:** Desktop dropdown menu for authenticated users

**Features:**
- Uses Redux for user data
- Custom dropdown with Amazon-style layout
- User info header with name and email
- Two-column menu (Your Lists | Your Account)
- Sign out functionality with AuthService
- Proper error handling

**Actions:**
- Switch Accounts
- Sign Out (clears auth and redirects to home)

### 4. MobileMenu.jsx - Mobile Hamburger Menu

**Purpose:** Left-side drawer for mobile navigation

**Features:**
- Uses Redux for authentication state
- Shows "Hello, {name}" when logged in
- Navigation links with icons
- Sign in/out functionality
- Drawer component from shared UI

**Menu Items:**
- Home
- Your Account
- Your Orders
- Your Wish List
- Cart
- Settings

### 5. MobileUserMenu.jsx - Mobile User Account Menu

**Purpose:** Right-side drawer for mobile user account

**Features:**
- Uses Redux for authentication state
- Only shows when logged in
- Avatar button triggers drawer
- User info with avatar
- Two sections: Your Lists and Your Account
- Sign out functionality

### 6. SearchBar.jsx - Search Input

**Purpose:** Product search functionality

**Features:**
- Responsive design
- Search icon
- Placeholder text
- Accepts className prop for styling

### 7. CartIcon.jsx - Shopping Cart

**Purpose:** Display cart with item count badge

**Features:**
- Cart icon with badge
- Item count display
- Responsive sizing
- Link to cart page

## Constants

All constants are centralized in `header.constant.js`:

### HEADER_TEXT
All UI text strings for internationalization readiness:
- GREETING: "Hello, sign in"
- ACCOUNT_LISTS: "Account & Lists"
- RETURNS: "Returns"
- ORDERS: "& Orders"
- SIGN_IN: "Sign in"
- SIGN_OUT: "Sign Out"
- NEW_CUSTOMER: "New customer?"
- START_HERE: "Start here."
- MENU_TITLE: "Menu"
- ACCOUNT_TITLE: "Account"
- HELLO: "Hello"
- SWITCH_ACCOUNTS: "Switch Accounts"
- YOUR_LISTS: "Your Lists"
- YOUR_ACCOUNT: "Your Account"

### USER_MENU_DATA
Dropdown menu configuration:
- yourLists: Array of list-related menu items
- yourAccount: Array of account-related menu items

### MOBILE_MENU_DATA
Mobile navigation items with icons:
- Home, Account, Orders, Wishlist, Cart, Settings

### HEADER_ROUTES
Centralized route constants using Navigation_Url:
- HOME, LOGIN, REGISTER, ORDERS, CART, PROFILE, SWITCH_ACCOUNTS

## Authentication Integration

### Redux State

All components use Redux for authentication:

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectUser, logout } from '@/redux/slice/authSlice';

const isLoggedIn = useSelector(selectIsAuthenticated);
const user = useSelector(selectUser);
```

### Sign Out Flow

```javascript
import { AuthService } from '@/services/auth/auth.service';

const handleSignOut = async () => {
    try {
        await AuthService.signout();  // Clear cookies
        dispatch(logout());            // Clear Redux state
        router.push(HEADER_ROUTES.HOME);
    } catch (error) {
        console.error('Signout error:', error);
    }
};
```

### User Data Structure

```javascript
{
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    // ... other user fields
}
```

## Usage

### Basic Implementation

```javascript
import { Header } from '@/components/layout/header';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}
```

### With Custom Cart Count

```javascript
// In Header.jsx
<CartIcon itemCount={cartItems.length} />
```

## Responsive Behavior

### Desktop (md and above)
- Full navigation bar with logo, search, navbar, and cart
- Dropdown menus for account and lists
- User avatar with profile dropdown when logged in

### Mobile (below md)
- Hamburger menu button (left)
- Search bar (center)
- User avatar button (right, when logged in)
- Two separate drawers: navigation and user account

## Best Practices

1. Always use constants from header.constant.js
2. Never hardcode text strings or routes
3. Use Redux for authentication state
4. Implement proper error handling in sign out
5. Use Navigation_Url for all route references
6. Keep menu data in constants for easy updates
7. Follow the same pattern for desktop and mobile

## Styling

### Custom Styles
Custom styles are in `header.style.css` for specific header needs.

### Tailwind Classes
Most styling uses Tailwind CSS utility classes for consistency.

### Sticky Header
```javascript
className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
```

## Dependencies

### Internal
- @/shared/ui/logo - Logo component
- @/shared/ui/button - Button component
- @/shared/ui/dropdown - Dropdown components
- @/shared/ui/drawer - Drawer components
- @/shared/ui/profile - UserProfile and UserAvatar
- @/shared/icons - Icon component
- @/shared/hooks/useClickOutside - Click outside hook
- @/redux/slice/authSlice - Authentication state
- @/services/auth/auth.service - Authentication service
- @/shared/constant/global-constant - Navigation_Url

### External
- react-redux - State management
- next/navigation - Routing
- next/link - Navigation links

## Future Enhancements

1. Add search functionality implementation
2. Integrate real cart data
3. Add notifications dropdown
4. Implement multi-language support using HEADER_TEXT
5. Add keyboard navigation for accessibility
6. Implement search suggestions/autocomplete

## Notes

- All components are client components (use "use client")
- Authentication state is managed by Redux
- Tokens are stored in httpOnly cookies
- Sign out clears both cookies and Redux state
- Mobile menus use drawer components from shared UI
- Desktop menus use dropdown components from shared UI
- All routes use Navigation_Url constants for consistency

