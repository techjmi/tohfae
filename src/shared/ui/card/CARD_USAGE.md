# Card Component

A flexible, composable card component system for displaying content in a structured container. Perfect for products, users, posts, and any content that needs visual grouping.

## Features

- ✅ Composition pattern (flexible for any data shape)
- ✅ Multiple radius options (none, sm, md, lg, xl, 2xl, 3xl, full)
- ✅ Multiple shadow options (none, sm, md, lg, xl, 2xl)
- ✅ Multiple padding options (none, sm, md, lg)
- ✅ Multiple backgrounds (default, muted, transparent)
- ✅ Border options (none, default)
- ✅ Hoverable and clickable states
- ✅ Renders as any HTML element
- ✅ Fully customizable styling
- ✅ Accessible with proper semantics

## Basic Usage

```jsx
import { Card, CardHeader, CardBody, CardFooter } from '@/shared/ui/card';

function MyComponent() {
  return (
    <Card>
      <CardHeader title="Card Title" subtitle="Card subtitle" />
      <CardBody>
        <p>Your content here...</p>
      </CardBody>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  );
}
```

## Components

### Card (Main Container)

The main card container with styling options.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | node | - | Card content |
| `radius` | string | "md" | Border radius: "none", "sm", "md", "lg", "xl", "2xl", "3xl", "full" |
| `shadow` | string | "sm" | Shadow: "none", "sm", "md", "lg", "xl", "2xl" |
| `padding` | string | "md" | Padding: "none", "sm", "md", "lg" |
| `background` | string | "default" | Background: "default", "muted", "transparent" |
| `border` | string | "default" | Border: "none", "default" |
| `hoverable` | boolean | false | Add hover shadow effect |
| `clickable` | boolean | false | Make card clickable |
| `onClick` | function | - | Click handler (requires clickable=true) |
| `as` | string | "div" | HTML element to render as |
| `className` | string | "" | Additional CSS classes |

### CardHeader

Header section with title, subtitle, and optional actions.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | - | Header title |
| `subtitle` | string | - | Header subtitle |
| `actions` | node | - | Action buttons/elements |
| `onClose` | function | - | Close handler (shows close button) |
| `icon` | string | "x" | Icon name for close button |
| `children` | node | - | Custom header content (overrides title/subtitle) |
| `className` | string | "" | Additional CSS classes |

### CardBody

Main content area of the card.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | node | - | Body content |
| `padding` | boolean | true | Apply default padding (p-4) |
| `className` | string | "" | Additional CSS classes |

### CardFooter (CardBottom)

Footer section, typically for actions.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | node | - | Footer content |
| `align` | string | "right" | Alignment: "left", "center", "right", "between" |
| `padding` | boolean | true | Apply default padding (p-4) |
| `border` | boolean | true | Show top border |
| `className` | string | "" | Additional CSS classes |

**Note:** `CardBottom` is an alias for `CardFooter` for backward compatibility.

## Examples

### Simple Card

```jsx
<Card>
  <CardBody>
    <p>Simple card with just body content</p>
  </CardBody>
</Card>
```

### Card with Header and Footer

```jsx
<Card shadow="md">
  <CardHeader title="User Profile" subtitle="View and edit details" />
  <CardBody>
    <p>User information goes here...</p>
  </CardBody>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button variant="solid" color="primary">Save</Button>
  </CardFooter>
</Card>
```

### Hoverable Card

```jsx
<Card hoverable shadow="sm">
  <CardBody>
    <p>Hover over me to see shadow effect</p>
  </CardBody>
</Card>
```

### Clickable Card

```jsx
<Card clickable onClick={() => navigate('/details')}>
  <CardHeader title="Click Me" />
  <CardBody>
    <p>This entire card is clickable</p>
  </CardBody>
</Card>
```

### Card with Actions

```jsx
<Card>
  <CardHeader
    title="Settings"
    subtitle="Manage your preferences"
    actions={
      <Button variant="ghost" size="sm">Edit</Button>
    }
    onClose={handleClose}
  />
  <CardBody>
    <p>Settings content...</p>
  </CardBody>
</Card>
```

### Product Card (Different Data Shape)

```jsx
<Card hoverable shadow="md">
  <CardBody padding={false}>
    <img src={product.image} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
    </div>
  </CardBody>
  <CardFooter>
    <Button fullWidth variant="solid" color="primary">
      Add to Cart
    </Button>
  </CardFooter>
</Card>
```

### User Card (Different Data Shape)

```jsx
<Card border="default">
  <CardHeader title={user.name} subtitle={user.role} />
  <CardBody className="flex items-center gap-4">
    <img src={user.avatar} className="w-16 h-16 rounded-full" />
    <div>
      <p>{user.email}</p>
      <p className="text-sm text-gray-500">{user.phone}</p>
    </div>
  </CardBody>
</Card>
```

## Styling Options

### Radius

```jsx
<Card radius="none">No radius</Card>
<Card radius="sm">Small radius</Card>
<Card radius="md">Medium radius (default)</Card>
<Card radius="lg">Large radius</Card>
<Card radius="xl">Extra large radius</Card>
<Card radius="2xl">2XL radius</Card>
<Card radius="3xl">3XL radius</Card>
<Card radius="full">Full radius (pill)</Card>
```

### Shadow

```jsx
<Card shadow="none">No shadow</Card>
<Card shadow="sm">Small shadow (default)</Card>
<Card shadow="md">Medium shadow</Card>
<Card shadow="lg">Large shadow</Card>
<Card shadow="xl">Extra large shadow</Card>
<Card shadow="2xl">2XL shadow</Card>
```

### Padding

```jsx
<Card padding="none">No padding</Card>
<Card padding="sm">Small padding</Card>
<Card padding="md">Medium padding (default)</Card>
<Card padding="lg">Large padding</Card>
```

### Background

```jsx
<Card background="default">White background (default)</Card>
<Card background="muted">Gray background</Card>
<Card background="transparent">Transparent background</Card>
```

### Border

```jsx
<Card border="none">No border</Card>
<Card border="default">Default border</Card>
```

## Best Practices

✅ Use composition pattern for flexibility  
✅ Use `hoverable` for cards that lead somewhere  
✅ Use `clickable` for entire card interactions  
✅ Use `CardHeader` for titles and actions  
✅ Use `CardBody` for main content  
✅ Use `CardFooter` for action buttons  
✅ Set `padding={false}` on CardBody for full-width images  
✅ Use appropriate shadow for visual hierarchy  
✅ Keep card content focused and scannable  

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy in CardHeader
- ✅ Keyboard accessible (when clickable)
- ✅ ARIA labels on close buttons
- ✅ Focus states (via Tailwind)

## Why Composition Pattern?

The Card component uses **composition** instead of **data-driven** approach:

**✅ Flexible** - Works with any data shape  
**✅ Reusable** - Same component, different content  
**✅ Customizable** - Full control over structure  
**✅ Maintainable** - No complex prop drilling  

This means you can use the same Card component for products, users, posts, or anything else without changing the component!

## Summary

The Card component system is a flexible, production-ready solution for displaying structured content. It uses composition for maximum flexibility and works with any data shape.

