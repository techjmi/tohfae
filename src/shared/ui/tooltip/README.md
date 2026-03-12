# Tooltip Component

A reusable tooltip component that displays helpful information on hover.

## Basic Usage

```jsx
import Tooltip from '@/shared/ui/tooltip/Tooltip';

<Tooltip content="This is a tooltip">
  <button>Hover me</button>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | string \| ReactNode | required | Tooltip content to display |
| `position` | string | 'top' | Position: 'top', 'bottom', 'left', 'right' |
| `className` | string | '' | Additional CSS classes |
| `delay` | number | 200 | Delay in ms before showing tooltip |
| `children` | ReactNode | required | Element to attach tooltip to |

## Examples

### Basic Tooltip

```jsx
<Tooltip content="Click to add to cart">
  <button>Add to Cart</button>
</Tooltip>
```

### Different Positions

```jsx
<Tooltip content="Top tooltip" position="top">
  <button>Top</button>
</Tooltip>

<Tooltip content="Bottom tooltip" position="bottom">
  <button>Bottom</button>
</Tooltip>

<Tooltip content="Left tooltip" position="left">
  <button>Left</button>
</Tooltip>

<Tooltip content="Right tooltip" position="right">
  <button>Right</button>
</Tooltip>
```

### Color Swatches (Product Variants)

```jsx
<Tooltip content="White" position="top">
  <button 
    className="w-12 h-12 rounded-full bg-white border"
    aria-label="White"
  />
</Tooltip>
```

### Custom Delay

```jsx
<Tooltip content="Appears after 500ms" delay={500}>
  <button>Hover me</button>
</Tooltip>
```

### Rich Content

```jsx
<Tooltip content={
  <div>
    <strong>Product Name</strong>
    <p>$99.99</p>
  </div>
}>
  <img src="product.jpg" alt="Product" />
</Tooltip>
```

## Styling

The tooltip uses CSS for styling. You can customize it by:

1. Modifying `Tooltip.css`
2. Passing custom `className` prop
3. Using Tailwind classes in the content

## Features

- Smooth fade-in animation
- Automatic positioning
- Arrow pointer
- Customizable delay
- Accessible (uses aria-label)
- Works with any child element
- No tooltip shown if content is empty

## Notes

- Tooltip is positioned absolutely relative to the wrapper
- Uses z-index: 1000 to appear above other content
- Pointer events disabled on tooltip to prevent interference
- Automatically hides when mouse leaves the element

