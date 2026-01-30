# Divider Component

A reusable divider/separator component that can be used across the application for sections, menus, lists, and more.

## Features

- ✅ Horizontal and vertical orientations
- ✅ Customizable spacing (none, xs, sm, md, lg, xl)
- ✅ Accessible with ARIA roles
- ✅ Fully customizable with className
- ✅ Lightweight and performant

## Basic Usage

```jsx
import { Divider } from '@/shared/ui/divider';

// Simple horizontal divider
<Divider />

// With custom spacing
<Divider spacing="lg" />

// Vertical divider
<Divider orientation="vertical" />

// Custom styling
<Divider className="border-blue-500" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider orientation |
| `spacing` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Margin spacing around divider |
| `className` | `string` | `''` | Additional CSS classes |

## Examples

### In Lists

```jsx
<ul>
  <li>Item 1</li>
  <Divider spacing="sm" />
  <li>Item 2</li>
  <Divider spacing="sm" />
  <li>Item 3</li>
</ul>
```

### In Sections

```jsx
<div>
  <section>
    <h2>Section 1</h2>
    <p>Content...</p>
  </section>
  
  <Divider spacing="lg" />
  
  <section>
    <h2>Section 2</h2>
    <p>Content...</p>
  </section>
</div>
```

### Vertical Divider

```jsx
<div className="flex items-center gap-4">
  <span>Left Content</span>
  <Divider orientation="vertical" spacing="none" className="h-8" />
  <span>Right Content</span>
</div>
```

### In Dropdown Menus

```jsx
import { DropdownDivider } from '@/shared/ui/dropdown';

// DropdownDivider is a wrapper with dropdown-specific defaults
<Dropdown>
  <DropdownContent>
    <DropdownItem>Item 1</DropdownItem>
    <DropdownDivider />
    <DropdownItem>Item 2</DropdownItem>
  </DropdownContent>
</Dropdown>
```

### Custom Styling

```jsx
// Different colors
<Divider className="border-red-500" />
<Divider className="border-blue-500" />

// Different thickness
<Divider className="border-t-2" />
<Divider className="border-t-4" />

// Dashed or dotted
<Divider className="border-dashed" />
<Divider className="border-dotted" />
```

## Spacing Reference

| Spacing | Horizontal Margin | Vertical Margin |
|---------|------------------|-----------------|
| `none` | `0` | `0` |
| `xs` | `my-1` (0.25rem) | `mx-1` (0.25rem) |
| `sm` | `my-2` (0.5rem) | `mx-2` (0.5rem) |
| `md` | `my-3` (0.75rem) | `mx-3` (0.75rem) |
| `lg` | `my-4` (1rem) | `mx-4` (1rem) |
| `xl` | `my-6` (1.5rem) | `mx-6` (1.5rem) |

## Accessibility

The component includes proper ARIA attributes:
- `role="separator"` - Identifies the element as a separator
- `aria-orientation` - Indicates the orientation (horizontal/vertical)

## Notes

- The divider uses Tailwind's `border-gray-200` by default
- You can override any styles using the `className` prop
- For dropdown menus, use `DropdownDivider` which has dropdown-specific defaults

