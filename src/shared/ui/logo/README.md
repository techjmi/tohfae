# Logo Component

Reusable, responsive logo component with multiple variants and sizes.

## Features

- Next.js Image optimization
- Multiple sizes (xs, sm, md, lg, xl)
- Multiple variants (full, icon-only, text-only)
- Responsive design
- Link or div wrapper
- Optional tagline
- Dark mode support
- Custom styling
- Arrow function component

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `string` | `'md'` | `xs`, `sm`, `md`, `lg`, `xl` |
| `variant` | `string` | `'full'` | `full`, `icon`, `text` |
| `href` | `string` | `'/'` | Link destination |
| `showTagline` | `boolean` | `false` | Show tagline below text |
| `as` | `string` | `'link'` | `link` or `div` |
| `className` | `string` | `''` | Container classes |
| `imageClassName` | `string` | `''` | Image classes |
| `textClassName` | `string` | `''` | Text classes |
| `onClick` | `function` | - | Click handler |

## Examples

### Basic Usage (Header)

```jsx
import { Logo } from '@/shared/ui/logo';

<Logo size="md" variant="full" />
```

### Icon Only (Mobile)

```jsx
<Logo size="sm" variant="icon" />
```

### With Tagline (Footer)

```jsx
<Logo size="lg" variant="full" showTagline />
```

### Different Sizes

```jsx
<Logo size="xs" />  // Extra small
<Logo size="sm" />  // Small
<Logo size="md" />  // Medium (default)
<Logo size="lg" />  // Large
<Logo size="xl" />  // Extra large
```

### As Div (No Link)

```jsx
<Logo as="div" onClick={() => console.log('Clicked')} />
```

### Custom Styling

```jsx
<Logo 
    size="md"
    className="hover:opacity-80 transition-opacity"
    imageClassName="rounded-full"
    textClassName="text-primary-600"
/>
```

### Responsive

```jsx
// Small on mobile, large on desktop
<Logo 
    size="sm"
    variant="icon"
    className="md:hidden"
/>
<Logo 
    size="md"
    variant="full"
    className="hidden md:flex"
/>
```

### In Header

```jsx
<header>
    <Logo size="md" variant="full" />
</header>
```

### In Footer

```jsx
<footer>
    <Logo size="lg" variant="full" showTagline />
</footer>
```

### In Auth Pages

```jsx
<div className="text-center">
    <Logo size="xl" variant="full" as="div" />
</div>
```

## Configuration

Update logo paths in `logo.constant.js`:

```javascript
export const LOGO = {
    light: "/logo-light.png",
    dark: "/logo-dark.png",
    icon: "/logo-icon.png",
    text: "Tohfae",
    tagline: "Personalized Gifts for Every Occasion",
    altText: "Tohfae - Personalized Gift Store",
};
```

