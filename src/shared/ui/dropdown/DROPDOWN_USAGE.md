# Dropdown Components Usage Guide

## Overview

A complete dropdown system with positioning, variants, sizes, and full customization support.

---

## Components

1. **Dropdown** - Main dropdown container with positioning
2. **DropdownContent** - Content wrapper with scrolling support
3. **DropdownItem** - Individual menu items
4. **DropdownDivider** - Section dividers
5. **DropdownHeader** - Section headers

---

## Basic Usage

### Simple Dropdown

```jsx
import { Dropdown, DropdownContent, DropdownItem } from '@/shared/ui/dropdown';

<Dropdown position="bottomRight" variant="default" size="md">
  <DropdownContent>
    <DropdownItem onClick={handleProfile}>My Profile</DropdownItem>
    <DropdownItem onClick={handleSettings}>Settings</DropdownItem>
    <DropdownItem onClick={handleLogout} danger>Logout</DropdownItem>
  </DropdownContent>
</Dropdown>
```

---

## Positions

### Available Positions

- `top`, `topLeft`, `topRight`
- `bottom`, `bottomLeft`, `bottomRight` (most common)
- `left`, `leftTop`, `leftBottom`
- `right`, `rightTop`, `rightBottom`

### Examples

```jsx
// Bottom right (default for profile menus)
<Dropdown position="bottomRight">

// Top center
<Dropdown position="top">

// Left side
<Dropdown position="left">
```

---

## Variants

### Available Variants

- `default` - White background with shadow
- `dark` - Dark background with white text
- `light` - Light gray background
- `transparent` - Transparent with backdrop blur
- `bordered` - White with thick border

### Examples

```jsx
// Default variant
<Dropdown variant="default">

// Dark theme
<Dropdown variant="dark">

// Transparent glassmorphism
<Dropdown variant="transparent">
```

---

## Sizes

### Available Sizes

- `xs` - 120-200px
- `sm` - 160-240px
- `md` - 200-320px (default)
- `lg` - 280-400px
- `xl` - 360-480px
- `full` - Full width

### Examples

```jsx
// Small dropdown
<Dropdown size="sm">

// Large dropdown
<Dropdown size="lg">

// Full width
<Dropdown size="full">
```

---

## Complete Example: Profile Menu

```jsx
"use client";
import { useState } from 'react';
import { 
  Dropdown, 
  DropdownContent, 
  DropdownItem, 
  DropdownDivider,
  DropdownHeader 
} from '@/shared/ui/dropdown';
import { useToggle } from '@/shared/hooks/useToggle';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

export default function ProfileMenu({ user }) {
  const [isOpen, toggleOpen] = useToggle();
  const ref = useClickOutside(() => toggleOpen(false));

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button onClick={() => toggleOpen(!isOpen)}>
        <img src={user.avatar} alt="Profile" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <Dropdown 
          position="bottomRight" 
          variant="default" 
          size="md"
        >
          <DropdownContent scrollable={true}>
            <DropdownHeader>Account</DropdownHeader>
            
            <DropdownItem href="/profile">
              My Profile
            </DropdownItem>
            
            <DropdownItem href="/orders">
              My Orders
            </DropdownItem>
            
            <DropdownDivider />
            
            <DropdownItem href="/settings">
              Settings
            </DropdownItem>
            
            <DropdownDivider />
            
            <DropdownItem 
              onClick={handleLogout} 
              danger
            >
              Logout
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      )}
    </div>
  );
}
```

---

## Advanced Features

### Scrollable Content

```jsx
<DropdownContent scrollable={true} maxHeight="300px">
  {/* Long list of items */}
</DropdownContent>
```

### Custom Styling

```jsx
<Dropdown 
  className="custom-dropdown" 
  position="bottom"
>
  <DropdownContent className="p-4">
    {/* Custom content */}
  </DropdownContent>
</Dropdown>
```

### With Icons

```jsx
<DropdownItem icon={<UserIcon />}>
  Profile
</DropdownItem>
```

### Disabled Items

```jsx
<DropdownItem disabled>
  Coming Soon
</DropdownItem>
```

### Selected State

```jsx
<DropdownItem selected>
  Active Item
</DropdownItem>
```

---

## Props Reference

### Dropdown Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | string | "bottomRight" | Dropdown position |
| variant | string | "default" | Visual variant |
| size | string | "md" | Dropdown size |
| className | string | "" | Custom classes |
| animated | boolean | true | Enable animations |
| zIndex | number | 50 | Z-index value |

### DropdownContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| scrollable | boolean | false | Enable scrolling |
| maxHeight | string | "16rem" | Max height when scrollable |
| padding | boolean | true | Add padding |
| className | string | "" | Custom classes |

### DropdownItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onClick | function | - | Click handler |
| href | string | - | Link URL |
| icon | node | - | Icon element |
| disabled | boolean | false | Disable item |
| selected | boolean | false | Selected state |
| danger | boolean | false | Danger variant |
| className | string | "" | Custom classes |

---

## Best Practices

✅ Use `bottomRight` for profile menus  
✅ Use `scrollable` for long lists  
✅ Use `DropdownDivider` to separate sections  
✅ Use `DropdownHeader` for section titles  
✅ Use `danger` variant for destructive actions  
✅ Always wrap in click-outside handler  
✅ Use proper z-index for nested dropdowns  

---

## Summary

🎯 **Fully functional dropdown system**  
🎨 **5 variants, 6 sizes, 12 positions**  
🔧 **Highly customizable**  
♿ **Accessible with ARIA roles**  
📱 **Responsive and mobile-friendly**  
🚀 **Production-ready**

