# Banner Component

A promotional banner component that uses **Card composition pattern** (CardHeader, CardBody, CardFooter) for consistent styling and flexibility.

## Features

- ✅ **Full Card Composition** - Uses CardHeader, CardBody, CardFooter
- ✅ **Contract-Based** - Uses banner contract data
- ✅ **Flexible Layouts** - With/without header, image, footer
- ✅ **Smart Positioning** - Auto-insert into product lists
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Custom Styling** - Background and text colors from contract
- ✅ **CTA Integration** - Button routing with contract data

## Card Composition

The Banner component uses the Card composition pattern:

```jsx
<Card>
  <CardHeader />  {/* Optional - title, subtitle, close button */}
  <CardBody />    {/* Required - image and content */}
  <CardFooter />  {/* Optional - CTA buttons */}
</Card>
```

## Basic Usage

### Simple Banner (CardBody + CardFooter)

```jsx
import { Banner } from '@/shared/ui/banner';
import { BANNER_DATA } from '@/contract/banner.contract';

function MyComponent() {
  const banner = BANNER_DATA[0];
  
  return <Banner banner={banner} />;
}
```

**Renders:**
- CardBody with image and content
- CardFooter with CTA button

### Banner with Header (Full Composition)

```jsx
<Banner 
  banner={banner} 
  showHeader={true}
  closeable={true}
  onClose={() => console.log('Closed')}
/>
```

**Renders:**
- CardHeader with title, subtitle, close button
- CardBody with image and content
- CardFooter with CTA button

### Banner Without Image

```jsx
<Banner banner={banner} showImage={false} />
```

**Renders:**
- CardBody with text content only
- CardFooter with CTA button

### Banner Without Footer

```jsx
<Banner 
  banner={{
    ...banner,
    cta: { ...banner.cta, enabled: false }
  }} 
/>
```

**Renders:**
- CardBody with image and content only
- No CardFooter

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `banner` | Object | required | Banner data from contract |
| `showImage` | boolean | true | Show/hide image in CardBody |
| `showHeader` | boolean | false | Show CardHeader with title |
| `closeable` | boolean | false | Show close button in CardHeader |
| `onClose` | function | - | Close handler callback |
| `className` | string | "" | Additional CSS classes |

## Integration with Product Lists

Use the `insertBannersIntoList` helper to automatically insert banners into product grids:

```jsx
import { insertBannersIntoList } from '@/shared/ui/banner';
import { BANNER_DATA, getBannersByType, BANNER_TYPE } from '@/contract/banner.contract';
import { PRODUCT_DATA } from '@/contract/product.contract';

function ProductGrid() {
  const banners = getBannersByType(BANNER_TYPE.INLINE);
  const products = PRODUCT_DATA.slice(0, 12);
  
  // Auto-insert banners based on contract rules
  const items = insertBannersIntoList(products, banners);
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => {
        if (item.type === 'banner') {
          return (
            <div className="col-span-3">
              <Banner banner={item.data} />
            </div>
          );
        }
        return <ProductCard product={item.data} />;
      })}
    </div>
  );
}
```

## Banner Contract Integration

The Banner component reads from banner contract:

```javascript
{
  content: {
    heading: "Free Shipping",
    subheading: "On orders above ₹999",
    description: "Shop now!",
    image: { desktop: "...", alt: "..." },
    backgroundColor: "#D1FAE5",
    textColor: "#065F46",
  },
  cta: {
    enabled: true,
    text: "Start Shopping",
    url: "/products",
    variant: "solid",
    color: "success",
  },
  display: {
    rule: "INTERVAL",
    interval: 6,        // Show every 6 products
    startPosition: 6,   // First banner at position 6
    repeat: true,       // Repeat at intervals
  }
}
```

## Examples

See `EXAMPLES.jsx` for complete examples:

1. **SimpleBannerExample** - CardBody + CardFooter
2. **BannerWithHeaderExample** - Full composition with CardHeader
3. **BannerWithoutImageExample** - Text-only banner
4. **CloseableBannerExample** - With close button in CardHeader
5. **ProductGridWithBannersExample** - Auto-inserted in product grid
6. **AllBannerTypesExample** - Different compositions

## Best Practices

✅ Use `showHeader={true}` for admin/closeable banners  
✅ Use simple composition (no header) for inline banners  
✅ Use `insertBannersIntoList` for product grids  
✅ Respect contract data for colors and styling  
✅ Use CardFooter for CTA buttons  
✅ Keep banner content concise and scannable  

## Why Card Composition?

- ✅ **Consistency** - Same styling as other cards
- ✅ **Flexibility** - Mix and match Card components
- ✅ **Maintainability** - Changes to Card affect all banners
- ✅ **Reusability** - No duplicate styling code
- ✅ **Best Practice** - Follows atomic design pattern

