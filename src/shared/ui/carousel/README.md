# Carousel Component

Generic, reusable carousel component using Embla Carousel.

## Features

Customizable navigation arrows, optional pagination dots, loop support, autoplay support, responsive design, and clean CSS. Uses centralized icons from shared/icons.

## Installation

```bash
npm install embla-carousel-react embla-carousel-autoplay
```

## Usage

### Basic Example

```jsx
import Carousel from '@/shared/ui/carousel';

function MyComponent() {
  return (
    <Carousel>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>
  );
}
```

### With Autoplay

```jsx
<Carousel
  showArrows={true}
  showDots={true}
  loop={true}
  autoplay={true}
  autoplayDelay={5000}
  className="my-custom-carousel"
>
  <div>Slide 1</div>
  <div>Slide 2</div>
</Carousel>
```

### Product Image Gallery Example

```jsx
<Carousel showArrows showDots loop autoplay autoplayDelay={4000}>
  {images.map((image, index) => (
    <div key={index} className="image-container">
      <Image src={image} alt={`Product ${index + 1}`} fill />
    </div>
  ))}
</Carousel>
```

### Multiple Slides Per View (Related Products)

```jsx
<Carousel showArrows loop slidesToShow={4}>
  {products.map((product) => (
    <div key={product.id}>
      <ProductCard product={product} />
    </div>
  ))}
</Carousel>
```

Responsive behavior:
- Desktop (1280px+): 4 slides
- Tablet (768px-1024px): 3 slides
- Mobile (640px-768px): 2 slides
- Small mobile (<640px): 1 slide

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Carousel slides (each child is a slide) |
| `showArrows` | `boolean` | `true` | Show navigation arrows |
| `showDots` | `boolean` | `true` | Show pagination dots |
| `loop` | `boolean` | `true` | Enable infinite loop |
| `autoplay` | `boolean` | `false` | Enable autoplay |
| `autoplayDelay` | `number` | `3000` | Autoplay delay in milliseconds |
| `slidesToShow` | `number` | `1` | Number of slides to show at once (1-5) |
| `className` | `string` | `''` | Additional CSS classes |
| `options` | `object` | `{}` | Embla carousel options |

## Styling

The component uses BEM-style CSS classes:

- `.carousel` - Main container
- `.carousel__viewport` - Overflow container
- `.carousel__container` - Slides container
- `.carousel__slide` - Individual slide
- `.carousel__button` - Navigation button
- `.carousel__button--prev` - Previous button
- `.carousel__button--next` - Next button
- `.carousel__button--disabled` - Disabled button state
- `.carousel__dots` - Dots container
- `.carousel__dot` - Individual dot
- `.carousel__dot--active` - Active dot

### Customizing Styles

You can override styles by targeting these classes in your component's CSS:

```css
.my-carousel .carousel__button {
  background: blue;
}

.my-carousel .carousel__dot--active {
  background: red;
}
```

## Advanced Options

Pass Embla-specific options via the `options` prop:

```jsx
<Carousel 
  options={{
    align: 'start',
    slidesToScroll: 2,
    skipSnaps: false
  }}
>
  {/* slides */}
</Carousel>
```

See [Embla Carousel Options](https://www.embla-carousel.com/api/options/) for all available options.

