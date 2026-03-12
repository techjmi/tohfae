# Modal Component

A flexible modal component system for displaying content in an overlay. Supports multiple sizes, placements, and configurations.

## Structure

```
modal/
├── Modal.jsx
├── ModalHeader.jsx
├── ModalBody.jsx
├── ModalFooter.jsx
├── modalConstant.js
├── index.js
└── README.md
```

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
          <p>Your content here</p>
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

### Modal
Main container with backdrop and positioning.

Props:
- isOpen (required) - Whether modal is visible
- onClose (required) - Close handler function
- size - sm, md, lg, xl, full (default: md)
- placement - center, top, bottom (default: center)
- backdrop - default, dark, light, blur (default: default)
- closeOnEsc - Close on ESC key (default: true)
- closeOnBackdrop - Close on backdrop click (default: true)
- lockBodyScroll - Lock body scroll when open (default: true)

### ModalHeader
Header section with title and close button.

Props:
- title - Header title text
- subtitle - Optional subtitle text
- onClose - Shows close button when provided
- data - Object with title/subtitle or JSX element
- children - Custom header content

### ModalBody
Main content area.

Props:
- children - Body content
- data - String, JSX element, or object with message/description
- padding - Apply default padding (default: true)
- scrollable - Make content scrollable (default: true)

### ModalFooter
Footer section for action buttons.

Props:
- children - Footer content
- data - Array of button configs or JSX element
- align - left, center, right, between (default: right)
- padding - Apply default padding (default: true)
- border - Show top border (default: true)

## Configuration-Based Footer

The footer accepts an array of button configurations:

```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  footer={[
    { label: "Cancel", onClick: handleClose, variant: "outline", color: "neutral" },
    { label: "Confirm", onClick: handleConfirm, variant: "solid", color: "primary" }
  ]}
  footerAlign="between"
/>
```

## Examples

### Confirmation Modal

```jsx
<Modal isOpen={isOpen} onClose={handleClose} size="sm">
  <ModalHeader title="Confirm Delete" onClose={handleClose} />
  <ModalBody>
    <p>Are you sure you want to delete this item?</p>
  </ModalBody>
  <ModalFooter align="between">
    <Button variant="ghost" onClick={handleClose}>Cancel</Button>
    <Button variant="solid" color="danger" onClick={handleDelete}>Delete</Button>
  </ModalFooter>
</Modal>
```

### Form Modal

```jsx
<Modal isOpen={isOpen} onClose={handleClose} size="lg">
  <ModalHeader title="Edit Profile" subtitle="Update your information" onClose={handleClose} />
  <ModalBody>
    <form>
      <input type="text" placeholder="Name" />
      <textarea placeholder="Bio" />
    </form>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={handleClose}>Cancel</Button>
    <Button variant="solid" color="primary" onClick={handleSubmit}>Save</Button>
  </ModalFooter>
</Modal>
```

### Bottom Sheet

```jsx
<Modal isOpen={isOpen} onClose={handleClose} placement="bottom">
  <ModalHeader title="Select Option" onClose={handleClose} />
  <ModalBody>
    <div>Options list here</div>
  </ModalBody>
</Modal>
```

## Sizes

- sm - max-w-sm (384px) - Alerts, confirmations
- md - max-w-lg (512px) - Default, forms
- lg - max-w-2xl (672px) - Complex forms
- xl - max-w-4xl (896px) - Rich content
- full - max-w-full - Full width

## Placements

- center - Centered on screen (default)
- top - Top with padding
- bottom - Bottom sheet style

## Backdrops

- default - bg-black/40
- dark - bg-black/60
- light - bg-black/20
- blur - bg-black/40 with backdrop blur

## Accessibility

The modal includes proper ARIA attributes, keyboard support for ESC key, focus management, and body scroll locking when open.

