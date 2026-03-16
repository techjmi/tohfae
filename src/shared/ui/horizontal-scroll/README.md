# HorizontalScroll Component

A continuous auto-scrolling horizontal container built with Embla Carousel for smooth, ticker-like motion on mobile devices.

## Features

- **Continuous Scrolling** - Smooth motion like a ticker/marquee (not slide-by-slide carousel)
- **Auto-scroll** - Configurable speed with slow, continuous motion
- **Touch-Friendly** - User can scroll manually by touch/drag
- **Pause on Interaction** - Automatically pauses when user touches or hovers
- **Auto-Resume** - Continues scrolling after user stops
- **Infinite Loop** - Seamless continuous loop
- **Lightweight** - Uses existing Embla Carousel installation
- **Mobile-First** - Designed for mobile horizontal scrolling

## Installation

The component uses `embla-carousel-react` and `embla-carousel-auto-scroll`:

```bash
npm install embla-carousel-react embla-carousel-auto-scroll
```

## Basic Usage

```javascript
import { HorizontalScroll } from '@/shared/ui/horizontal-scroll';

<HorizontalScroll speed={1} gap={16} loop={true}>
  <ProductCard product={product1} />
  <ProductCard product={product2} />
  <ProductCard product={product3} />
</HorizontalScroll>
```

**Note:** The component renders child items (like ProductCard) with their natural dimensions. Make sure your child components have consistent sizing if you want uniform appearance.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Items to scroll (required) |
| `speed` | number | `1` | Scroll speed (0.5 = slow, 1 = normal, 2 = fast) |
| `loop` | boolean | `true` | Enable infinite loop (duplicates content for seamless scrolling) |
| `stopOnInteraction` | boolean | `true` | Pause when user touches/drags |
| `stopOnMouseEnter` | boolean | `true` | Pause on hover (desktop) |
| `gap` | number | `16` | Gap between items in pixels |
| `className` | string | `''` | Additional CSS classes |

## Speed Presets

Use the config constants for consistent speeds:

```javascript
import { HORIZONTAL_SCROLL_CONFIG } from '@/shared/ui/horizontal-scroll';

<HorizontalScroll speed={HORIZONTAL_SCROLL_CONFIG.SPEED.SLOW}>
  {/* ... */}
</HorizontalScroll>
```

Available speeds:
- `SLOW` - 0.5
- `NORMAL` - 1
- `FAST` - 2
- `VERY_FAST` - 3

## Gap Presets

```javascript
<HorizontalScroll gap={HORIZONTAL_SCROLL_CONFIG.GAP.LARGE}>
  {/* ... */}
</HorizontalScroll>
```

Available gaps:
- `NONE` - 0px
- `SMALL` - 8px
- `MEDIUM` - 16px
- `LARGE` - 24px
- `EXTRA_LARGE` - 32px

## Example with Device Detection

Use with `useDevice` hook to show horizontal scroll on mobile only:

```javascript
import { useDevice } from '@/shared/hooks/useDevice';
import { HorizontalScroll } from '@/shared/ui/horizontal-scroll';

const MySection = ({ products }) => {
  const { isMobile } = useDevice();

  if (isMobile) {
    return (
      <HorizontalScroll
        speed={1}
        gap={16}
        loop={true}
        stopOnMouseEnter={true}
      >
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </HorizontalScroll>
    );
  }

  // Desktop: Regular grid
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

## Disable Hover Pause

For ticker-style continuous scrolling that never stops:

```javascript
<HorizontalScroll
  speed={1}
  gap={16}
  loop={true}
  stopOnMouseEnter={false}
  stopOnInteraction={false}
>
  {/* ... */}
</HorizontalScroll>
```

## How Loop Works

When `loop={true}` (default), the component **duplicates your content 3 times** to create a seamless infinite scroll:

**Your content:**
```
[Card 1] [Card 2]
```

**What gets rendered:**
```
[Card 1] [Card 2] [Card 1] [Card 2] [Card 1] [Card 2]
```

This ensures smooth continuous scrolling even with just 2-3 items. The duplication is automatic and invisible to users.

## Styling

The component includes minimal CSS for smooth scrolling. You can add custom styles:

```javascript
<HorizontalScroll className="my-custom-scroll">
  {/* ... */}
</HorizontalScroll>
```

## Technical Details

**Built with:**
- `embla-carousel-react` - Lightweight carousel library
- `embla-carousel-auto-scroll` - Auto-scroll plugin

**Key Configuration:**
- `loop: true` - Infinite loop
- `dragFree: true` - No snap points (continuous scroll)
- `containScroll: false` - Allow continuous scrolling
- `playOnInit: true` - Start immediately

**Performance:**
- Uses `will-change: transform` for GPU acceleration
- Hides scrollbar for clean UI
- Touch-optimized with `touch-action: pan-y`

