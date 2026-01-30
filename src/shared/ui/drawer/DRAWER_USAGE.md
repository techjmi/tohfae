# Drawer Component

A flexible drawer/sidebar component that slides in from any edge of the screen. Perfect for navigation menus, filters, settings panels, and more.

## Features

- ✅ Multiple positions (left, right, top, bottom)
- ✅ Multiple variants (temporary, persistent, permanent)
- ✅ Multiple sizes (sm, md, lg, xl, full, custom %)
- ✅ Backdrop overlay with click-outside-to-close
- ✅ ESC key to close
- ✅ Body scroll lock when open
- ✅ Smooth slide animations
- ✅ Accessible with ARIA attributes
- ✅ Fully customizable styling

## Basic Usage

```jsx
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '@/shared/ui/drawer';
import { useToggle } from '@/shared/hooks/useToggle';

function MyComponent() {
  const [isOpen, toggleOpen] = useToggle();

  return (
    <>
      <button onClick={() => toggleOpen(true)}>Open Drawer</button>
      
      <Drawer isOpen={isOpen} onClose={() => toggleOpen(false)}>
        <DrawerHeader onClose={() => toggleOpen(false)}>
          <h2 className="text-xl font-semibold">Drawer Title</h2>
        </DrawerHeader>
        
        <DrawerBody>
          <p>Your content here...</p>
        </DrawerBody>
        
        <DrawerFooter>
          <button onClick={() => toggleOpen(false)}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}
```

## Components

### Drawer (Main Container)

The main drawer container that handles positioning, animations, and backdrop.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | **Required.** Controls drawer visibility |
| `onClose` | `function` | - | **Required.** Called when drawer should close |
| `position` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Position on screen |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| string` | `'90%'` | Drawer size (width or height) |
| `variant` | `'temporary' \| 'persistent' \| 'permanent'` | `'temporary'` | Drawer behavior variant |
| `closeOnEsc` | `boolean` | `true` | Close on ESC key press |
| `closeOnBackdrop` | `boolean` | `true` | Close on backdrop click |
| `lockBodyScroll` | `boolean` | `true` | Lock body scroll when open |
| `className` | `string` | `''` | Additional CSS classes |

### DrawerHeader

Header section with optional close button.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Header content |
| `onClose` | `function` | - | Close handler (shows close button if provided) |
| `showCloseButton` | `boolean` | `true` | Show/hide close button |
| `className` | `string` | `''` | Additional CSS classes |

### DrawerBody

Main content area with scrolling support.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Body content |
| `scrollable` | `boolean` | `true` | Enable vertical scrolling |
| `padding` | `boolean` | `true` | Add default padding |
| `className` | `string` | `''` | Additional CSS classes |

### DrawerFooter

Footer section for action buttons.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Footer content |
| `align` | `'left' \| 'center' \| 'right' \| 'between'` | `'right'` | Button alignment |
| `className` | `string` | `''` | Additional CSS classes |

## Positions

### Left Drawer
```jsx
<Drawer isOpen={isOpen} onClose={onClose} position="left">
  {/* Content */}
</Drawer>
```

### Right Drawer (Default)
```jsx
<Drawer isOpen={isOpen} onClose={onClose} position="right">
  {/* Content */}
</Drawer>
```

### Top Drawer
```jsx
<Drawer isOpen={isOpen} onClose={onClose} position="top">
  {/* Content */}
</Drawer>
```

### Bottom Drawer
```jsx
<Drawer isOpen={isOpen} onClose={onClose} position="bottom">
  {/* Content */}
</Drawer>
```

## Sizes

### Predefined Sizes
```jsx
<Drawer size="sm">   {/* 288px (18rem) */}
<Drawer size="md">   {/* 384px (24rem) */}
<Drawer size="lg">   {/* 448px (28rem) */}
<Drawer size="xl">   {/* 512px (32rem) */}
<Drawer size="full"> {/* 100% screen width/height */}
```

### Custom Sizes
```jsx
<Drawer size="50%">     {/* 50% of screen */}
<Drawer size="600px">   {/* Fixed 600px */}
```

## Variants

### Temporary (Default)
Overlay drawer with backdrop. Closes on outside click or ESC.
```jsx
<Drawer variant="temporary">
  {/* Content */}
</Drawer>
```

### Persistent
Pushes content aside. Stays open until explicitly closed.
```jsx
<Drawer variant="persistent">
  {/* Content */}
</Drawer>
```

### Permanent
Always visible, part of the layout.
```jsx
<Drawer variant="permanent" isOpen={true}>
  {/* Content */}
</Drawer>
```

## Common Use Cases

### Navigation Menu
```jsx
<Drawer isOpen={isMenuOpen} onClose={closeMenu} position="left" size="md">
  <DrawerHeader onClose={closeMenu}>
    <h2>Menu</h2>
  </DrawerHeader>
  <DrawerBody>
    <nav>
      <a href="/home">Home</a>
      <a href="/products">Products</a>
      <a href="/about">About</a>
    </nav>
  </DrawerBody>
</Drawer>
```

### Filter Panel
```jsx
<Drawer isOpen={isFilterOpen} onClose={closeFilters} position="right" size="sm">
  <DrawerHeader onClose={closeFilters}>
    <h2>Filters</h2>
  </DrawerHeader>
  <DrawerBody>
    {/* Filter controls */}
  </DrawerBody>
  <DrawerFooter align="between">
    <button onClick={clearFilters}>Clear All</button>
    <button onClick={applyFilters}>Apply</button>
  </DrawerFooter>
</Drawer>
```

### Settings Panel
```jsx
<Drawer isOpen={isSettingsOpen} onClose={closeSettings}>
  <DrawerHeader onClose={closeSettings}>
    <h2>Settings</h2>
  </DrawerHeader>
  <DrawerBody scrollable={true}>
    {/* Settings form */}
  </DrawerBody>
  <DrawerFooter>
    <button onClick={closeSettings}>Cancel</button>
    <button onClick={saveSettings}>Save Changes</button>
  </DrawerFooter>
</Drawer>
```

### Shopping Cart
```jsx
<Drawer isOpen={isCartOpen} onClose={closeCart} position="right" size="lg">
  <DrawerHeader onClose={closeCart}>
    <h2>Shopping Cart ({itemCount})</h2>
  </DrawerHeader>
  <DrawerBody>
    {cartItems.map(item => (
      <CartItem key={item.id} {...item} />
    ))}
  </DrawerBody>
  <DrawerFooter align="between">
    <div>Total: ${total}</div>
    <button onClick={checkout}>Checkout</button>
  </DrawerFooter>
</Drawer>
```

## Customization

### Custom Styling
```jsx
<Drawer className="bg-gray-900 text-white">
  <DrawerHeader className="border-gray-700">
    <h2>Dark Theme</h2>
  </DrawerHeader>
  <DrawerBody className="bg-gray-800">
    {/* Content */}
  </DrawerBody>
</Drawer>
```

### Without Close Button
```jsx
<DrawerHeader showCloseButton={false}>
  <h2>No Close Button</h2>
</DrawerHeader>
```

### Footer Alignment
```jsx
<DrawerFooter align="left">
  <button>Left Aligned</button>
</DrawerFooter>

<DrawerFooter align="center">
  <button>Center Aligned</button>
</DrawerFooter>

<DrawerFooter align="between">
  <button>Left</button>
  <button>Right</button>
</DrawerFooter>
```

### No Padding in Body
```jsx
<DrawerBody padding={false}>
  {/* Full-width content */}
</DrawerBody>
```

## Accessibility

The drawer component includes proper ARIA attributes:
- `role="dialog"` - Identifies the drawer as a dialog
- `aria-modal="true"` - Indicates modal behavior (temporary variant)
- Close button has `aria-label="Close drawer"`

## Best Practices

1. **Always provide onClose** - Even if closeOnBackdrop is false
2. **Use appropriate sizes** - Don't make drawers too wide/tall
3. **Include close button** - Make it easy for users to dismiss
4. **Lock body scroll** - Prevent background scrolling (default behavior)
5. **Use DrawerFooter for actions** - Keep action buttons consistent
6. **Consider mobile** - Test on small screens, use responsive sizes

## Notes

- Drawer uses `fixed` positioning by default
- `permanent` variant uses `relative` positioning
- Body scroll is locked only for `temporary` variant
- ESC key works only for `temporary` variant
- Backdrop appears only for `temporary` variant
- Animations use Tailwind's `transition-transform`

