# OptimizedImage Component

Centralized image component with Next.js optimization and responsive support.

## Features

- Next.js Image optimization with automatic WebP conversion
- Responsive images for desktop, tablet, and mobile devices
- Single image fallback support
- Built-in error handling with placeholder
- Overlay support
- Priority loading for above-the-fold images
- Aspect ratio control
- Click handlers with hover effects

## Usage

### Multi-Device Images (Responsive)

```jsx
import OptimizedImage from '@/shared/ui/image';

<OptimizedImage
  images={{
    desktop: 'https://example.com/image-1920.jpg',
    tablet: 'https://example.com/image-1024.jpg',
    mobile: 'https://example.com/image-768.jpg'
  }}
  alt="Product image"
  aspectRatio="16/9"
  priority={true}
/>
```

### Single Image (Fallback)

```jsx
<OptimizedImage
  src="/product-thumbnail.jpg"
  alt="Product thumbnail"
  aspectRatio="1/1"
/>
```

### With Overlay

```jsx
<OptimizedImage
  images={banner.image}
  alt="Hero banner"
  overlay={true}
  overlayOpacity={0.5}
  priority={true}
/>
```

### Fixed Dimensions

```jsx
<OptimizedImage
  src="/logo.png"
  alt="Logo"
  fill={false}
  width={200}
  height={100}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | - | Single image source (fallback) |
| `images` | object | - | Multi-device images `{ desktop, tablet, mobile }` |
| `alt` | string | '' | Alt text for accessibility |
| `fill` | boolean | true | Use fill layout (responsive) |
| `width` | number | - | Fixed width (when fill=false) |
| `height` | number | - | Fixed height (when fill=false) |
| `aspectRatio` | string | - | CSS aspect ratio (e.g., '16/9', '4/3', '1/1') |
| `objectFit` | string | 'cover' | Object fit: cover, contain, fill, none |
| `priority` | boolean | false | Load with priority (for LCP elements) |
| `sizes` | string | auto | Custom responsive sizes attribute |
| `className` | string | '' | Additional CSS classes |
| `onClick` | function | - | Click handler |
| `overlay` | boolean | false | Show dark overlay |
| `overlayOpacity` | number | 0.3 | Overlay opacity (0-1) |

## Image Priority

The component automatically selects images in this order:
1. `images.desktop` (if provided)
2. `images.tablet` (if desktop not available)
3. `images.mobile` (if tablet not available)
4. `src` (single image fallback)
5. `/placeholder.jpg` (error fallback)

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Examples

### Hero Banner
```jsx
<OptimizedImage
  images={banner.content.image}
  alt={banner.title}
  sizes="100vw"
  priority={true}
  overlay={true}
/>
```

### Product Card
```jsx
<OptimizedImage
  src={product.thumbnail}
  alt={product.name}
  aspectRatio="1/1"
/>
```

### Category Banner
```jsx
<OptimizedImage
  images={category.banner}
  alt={category.name}
  aspectRatio="21/9"
/>
```

