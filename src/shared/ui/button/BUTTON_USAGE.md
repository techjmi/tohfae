# Button Component

A flexible, reusable button component with multiple variants, sizes, colors, and full customization support.

## Features

- ✅ 3 variants (solid, outline, ghost)
- ✅ 4 sizes (xs, sm, md, lg)
- ✅ 6 colors (neutral, primary, info, success, warning, danger)
- ✅ 5 radius options (xs, sm, md, lg, full)
- ✅ Full width support
- ✅ Disabled state
- ✅ Renders as button or anchor tag
- ✅ Accessible with ARIA attributes
- ✅ Fully customizable styling

## Basic Usage

```jsx
import Button from '@/shared/ui/button/Button';

function MyComponent() {
  return (
    <Button onClick={handleClick}>
      Click Me
    </Button>
  );
}
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | string | "button" | Render as "button" or "a" (anchor) |
| `href` | string | - | URL for anchor tag (when as="a") |
| `label` | string | - | Button text (alternative to children) |
| `children` | node | - | Button content |
| `size` | string | "md" | Size: "xs", "sm", "md", "lg" |
| `radius` | string | "md" | Border radius: "xs", "sm", "md", "lg", "full" |
| `color` | string | "neutral" | Color: "neutral", "primary", "info", "success", "warning", "danger" |
| `variant` | string | "outline" | Variant: "solid", "outline", "ghost" |
| `fullWidth` | boolean | false | Make button full width |
| `disabled` | boolean | false | Disable button |
| `className` | string | "" | Additional CSS classes |
| `type` | string | "button" | Button type: "button", "submit", "reset" |
| `onClick` | function | - | Click handler |
| `...rest` | object | - | Any other HTML button/anchor attributes |

## Variants

### Solid (Filled)
Solid background with white text.

```jsx
<Button variant="solid" color="primary">Primary Solid</Button>
<Button variant="solid" color="success">Success Solid</Button>
<Button variant="solid" color="danger">Danger Solid</Button>
```

### Outline
Border with colored text, transparent background.

```jsx
<Button variant="outline" color="primary">Primary Outline</Button>
<Button variant="outline" color="success">Success Outline</Button>
<Button variant="outline" color="danger">Danger Outline</Button>
```

### Ghost
No border, colored text, hover background.

```jsx
<Button variant="ghost" color="primary">Primary Ghost</Button>
<Button variant="ghost" color="success">Success Ghost</Button>
<Button variant="ghost" color="danger">Danger Ghost</Button>
```

## Sizes

```jsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (Default)</Button>
<Button size="lg">Large</Button>
```

## Colors

```jsx
<Button color="neutral">Neutral</Button>
<Button color="primary">Primary</Button>
<Button color="info">Info</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="danger">Danger</Button>
```

## Border Radius

```jsx
<Button radius="xs">Extra Small Radius</Button>
<Button radius="sm">Small Radius</Button>
<Button radius="md">Medium Radius</Button>
<Button radius="lg">Large Radius</Button>
<Button radius="full">Pill Button</Button>
```

## Full Width

```jsx
<Button fullWidth>Full Width Button</Button>
```

## Disabled State

```jsx
<Button disabled>Disabled Button</Button>
<Button disabled variant="solid" color="primary">Disabled Solid</Button>
```

## As Anchor Tag

```jsx
<Button as="a" href="/about">Go to About</Button>
<Button as="a" href="https://example.com" target="_blank">
  External Link
</Button>
```

## With Icons

```jsx
import { Icon } from '@/shared/icons';

<Button>
  <Icon name="add" size={18} />
  <span className="ml-2">Add Item</span>
</Button>

<Button variant="solid" color="primary">
  <span className="mr-2">Download</span>
  <Icon name="download" size={18} />
</Button>
```

## Common Use Cases

### Form Submit Button
```jsx
<Button type="submit" variant="solid" color="primary">
  Submit Form
</Button>
```

### Cancel Button
```jsx
<Button variant="outline" color="neutral" onClick={handleCancel}>
  Cancel
</Button>
```

### Delete Button
```jsx
<Button variant="solid" color="danger" onClick={handleDelete}>
  Delete
</Button>
```

### Loading State (Custom)
```jsx
function LoadingButton() {
  const [loading, setLoading] = React.useState(false);
  
  return (
    <Button disabled={loading} variant="solid" color="primary">
      {loading ? 'Loading...' : 'Submit'}
    </Button>
  );
}
```

## Best Practices

✅ Use `variant="solid"` for primary actions  
✅ Use `variant="outline"` for secondary actions  
✅ Use `variant="ghost"` for tertiary/subtle actions  
✅ Use `color="danger"` for destructive actions  
✅ Use `color="primary"` for main CTAs  
✅ Use `disabled` prop instead of custom disabled styling  
✅ Use `fullWidth` for mobile-friendly layouts  
✅ Always provide meaningful button text  
✅ Use `type="submit"` for form submissions  

## Accessibility

- ✅ Proper ARIA attributes (`aria-disabled`)
- ✅ Keyboard accessible (native button/anchor)
- ✅ Focus states (via Tailwind's focus utilities)
- ✅ Disabled state prevents interaction
- ✅ Semantic HTML (button vs anchor)

## Customization

### Custom Styling
```jsx
<Button className="shadow-lg hover:shadow-xl">
  Custom Shadow
</Button>

<Button className="uppercase tracking-wide">
  Uppercase Text
</Button>
```

### Override Default Styles
```jsx
<Button className="!bg-purple-600 !text-white hover:!bg-purple-700">
  Custom Purple
</Button>
```

## Technical Notes

- Uses `classNames` utility for class merging
- Supports CSS variable heights (`--control-h`)
- Transition effects on hover/active states
- Pointer events disabled when disabled
- Opacity reduced when disabled (60%)
- Renders as `<button>` or `<a>` based on `as` prop
- Automatically sets `type="button"` if not specified

## Summary

The Button component is a versatile, production-ready component that handles all common button use cases with a clean, consistent API. It's fully accessible, customizable, and follows modern React best practices.

