# Modal Component

A flexible, accessible modal/dialog component system for displaying content in an overlay. Perfect for forms, confirmations, alerts, and any content that needs user focus.

## Features

- ✅ Multiple sizes (sm, md, lg, xl, full)
- ✅ Multiple placements (center, top, bottom)
- ✅ Multiple backdrop variants (default, dark, light, blur)
- ✅ ESC key to close
- ✅ Click outside to close
- ✅ Body scroll lock when open
- ✅ Fully accessible (ARIA attributes, keyboard support)
- ✅ Composition pattern (flexible content)
- ✅ Smooth animations

## Basic Usage

```jsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/shared/ui/modal';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader title="Modal Title" onClose={() => setIsOpen(false)} />
        <ModalBody>
          <p>Your content here...</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

## Components

### Modal (Main Container)

The main modal container with backdrop and positioning.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | node | - | Modal content |
| `isOpen` | boolean | - | Whether modal is open (required) |
| `onClose` | function | - | Close handler (required) |
| `size` | string | "md" | Size: "sm", "md", "lg", "xl", "full" |
| `placement` | string | "center" | Placement: "center", "top", "bottom" |
| `backdrop` | string | "default" | Backdrop: "default", "dark", "light", "blur" |
| `closeOnEsc` | boolean | true | Close on ESC key press |
| `closeOnBackdrop` | boolean | true | Close on backdrop click |
| `lockBodyScroll` | boolean | true | Lock body scroll when open |
| `className` | string | "" | Additional CSS classes |

### ModalHeader

Header section with title, subtitle, and close button.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | - | Header title |
| `subtitle` | string | - | Header subtitle |
| `onClose` | function | - | Close handler (shows close button) |
| `icon` | string | "close" | Icon name for close button |
| `children` | node | - | Custom header content (overrides title/subtitle) |
| `padding` | boolean | true | Apply default padding |
| `border` | boolean | true | Show bottom border |
| `className` | string | "" | Additional CSS classes |

### ModalBody

Main content area of the modal.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | node | - | Body content |
| `padding` | boolean | true | Apply default padding |
| `scrollable` | boolean | true | Make content scrollable (max-h-[60vh]) |
| `className` | string | "" | Additional CSS classes |

### ModalFooter

Footer section, typically for action buttons.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | node | - | Footer content |
| `align` | string | "right" | Alignment: "left", "center", "right", "between" |
| `padding` | boolean | true | Apply default padding |
| `border` | boolean | true | Show top border |
| `className` | string | "" | Additional CSS classes |

## Examples

### Simple Modal

```jsx
<Modal isOpen={isOpen} onClose={handleClose}>
  <ModalBody>
    <p>Simple modal with just body content</p>
  </ModalBody>
</Modal>
```

### Complete Modal

```jsx
<Modal isOpen={isOpen} onClose={handleClose} size="lg">
  <ModalHeader 
    title="Edit Profile" 
    subtitle="Update your personal information"
    onClose={handleClose} 
  />
  <ModalBody>
    <form>
      {/* Form fields */}
    </form>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={handleClose}>Cancel</Button>
    <Button variant="solid" color="primary">Save Changes</Button>
  </ModalFooter>
</Modal>
```

### Confirmation Modal

```jsx
<Modal isOpen={isOpen} onClose={handleClose} size="sm">
  <ModalHeader title="Confirm Delete" onClose={handleClose} />
  <ModalBody>
    <p>Are you sure you want to delete this item? This action cannot be undone.</p>
  </ModalBody>
  <ModalFooter align="between">
    <Button variant="ghost" onClick={handleClose}>Cancel</Button>
    <Button variant="solid" color="danger">Delete</Button>
  </ModalFooter>
</Modal>
```

### Bottom Sheet Modal

```jsx
<Modal isOpen={isOpen} onClose={handleClose} placement="bottom">
  <ModalHeader title="Select Option" onClose={handleClose} />
  <ModalBody>
    {/* Options list */}
  </ModalBody>
</Modal>
```

### Different Sizes

```jsx
<Modal size="sm">Small Modal (max-w-sm)</Modal>
<Modal size="md">Medium Modal (max-w-lg) - Default</Modal>
<Modal size="lg">Large Modal (max-w-2xl)</Modal>
<Modal size="xl">Extra Large Modal (max-w-4xl)</Modal>
<Modal size="full">Full Width Modal</Modal>
```

### Different Placements

```jsx
<Modal placement="center">Center (default)</Modal>
<Modal placement="top">Top with padding</Modal>
<Modal placement="bottom">Bottom sheet</Modal>
```

### Different Backdrops

```jsx
<Modal backdrop="default">Default backdrop (bg-black/40)</Modal>
<Modal backdrop="dark">Dark backdrop (bg-black/60)</Modal>
<Modal backdrop="light">Light backdrop (bg-black/20)</Modal>
<Modal backdrop="blur">Blur backdrop (with backdrop-blur)</Modal>
```

### Scrollable Content

```jsx
<Modal isOpen={isOpen} onClose={handleClose}>
  <ModalHeader title="Long Content" onClose={handleClose} />
  <ModalBody scrollable>
    {/* Long content that scrolls */}
    <p>Paragraph 1...</p>
    <p>Paragraph 2...</p>
    {/* ... many more paragraphs */}
  </ModalBody>
  <ModalFooter>
    <Button>Close</Button>
  </ModalFooter>
</Modal>
```

### Custom Header

```jsx
<Modal isOpen={isOpen} onClose={handleClose}>
  <ModalHeader>
    <div className="flex items-center gap-3">
      <Icon name="info" size={24} className="text-blue-600" />
      <div>
        <h2 className="text-lg font-semibold">Custom Header</h2>
        <p className="text-sm text-gray-600">With custom layout</p>
      </div>
    </div>
    <Button onClick={handleClose} variant="ghost" size="sm">
      <Icon name="close" size={20} />
    </Button>
  </ModalHeader>
  <ModalBody>
    <p>Content here...</p>
  </ModalBody>
</Modal>
```

## Styling Options

### Sizes

| Size | Max Width | Use Case |
|------|-----------|----------|
| `sm` | max-w-sm (384px) | Alerts, confirmations |
| `md` | max-w-lg (512px) | Forms, simple content (default) |
| `lg` | max-w-2xl (672px) | Complex forms, detailed content |
| `xl` | max-w-4xl (896px) | Rich content, galleries |
| `full` | max-w-full | Full-width modals |

### Placements

| Placement | Position | Use Case |
|-----------|----------|----------|
| `center` | Centered | Standard modals (default) |
| `top` | Top with padding | Notifications, alerts |
| `bottom` | Bottom sheet | Mobile-friendly, selections |

### Backdrops

| Backdrop | Style | Use Case |
|----------|-------|----------|
| `default` | bg-black/40 | Standard (default) |
| `dark` | bg-black/60 | Emphasis, focus |
| `light` | bg-black/20 | Subtle, non-intrusive |
| `blur` | bg-black/40 + blur | Modern, iOS-style |

## Best Practices

✅ Always provide `isOpen` and `onClose` props
✅ Use `ModalHeader` with `onClose` for close button
✅ Use appropriate size for content
✅ Use `placement="bottom"` for mobile-friendly sheets
✅ Keep modal content focused and scannable
✅ Use `closeOnEsc` and `closeOnBackdrop` for better UX
✅ Lock body scroll to prevent background scrolling
✅ Use confirmation modals for destructive actions

## Accessibility

- ✅ `role="dialog"` and `aria-modal="true"` on modal
- ✅ ESC key to close (can be disabled)
- ✅ Click outside to close (can be disabled)
- ✅ Body scroll lock when open
- ✅ Focus management (close button accessible)
- ✅ ARIA labels on close buttons

## Common Patterns

### Form Modal

```jsx
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({});

const handleSubmit = () => {
  // Submit form
  setIsOpen(false);
};

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
  <ModalHeader title="Add New Item" onClose={() => setIsOpen(false)} />
  <ModalBody>
    <form>
      <input type="text" placeholder="Name" />
      <textarea placeholder="Description" />
    </form>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="solid" color="primary" onClick={handleSubmit}>Save</Button>
  </ModalFooter>
</Modal>
```

### Confirmation Modal

```jsx
const [isOpen, setIsOpen] = useState(false);

const handleConfirm = () => {
  // Perform action
  setIsOpen(false);
};

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
  <ModalHeader title="Confirm Action" onClose={() => setIsOpen(false)} />
  <ModalBody>
    <p>Are you sure you want to proceed?</p>
  </ModalBody>
  <ModalFooter align="between">
    <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="solid" color="danger" onClick={handleConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>
```

### Alert Modal

```jsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
  <ModalHeader title="Success!" onClose={() => setIsOpen(false)} />
  <ModalBody>
    <p>Your changes have been saved successfully.</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="solid" color="primary" onClick={() => setIsOpen(false)}>
      OK
    </Button>
  </ModalFooter>
</Modal>
```

## Summary

The Modal component system is a flexible, production-ready solution for displaying overlay content. It uses composition for maximum flexibility and includes all essential features like ESC key support, backdrop clicks, body scroll lock, and full accessibility support.


