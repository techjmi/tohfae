# Share Component

A reusable social sharing component with support for multiple platforms and layouts.

## Features

- Multiple Platforms: Copy Link, Twitter, LinkedIn, Facebook, WhatsApp, Telegram, Reddit, Pinterest, Email, SMS
- Flexible Layouts: Horizontal and vertical orientations
- Custom Messages: Support for title and text customization
- Visual Feedback: Shows "Copied!" state for copy action
- Responsive: Works on all screen sizes
- Accessible: Proper ARIA labels and keyboard support
- Customizable: Show/hide labels, select specific platforms
- Extensible: Add custom platforms dynamically

## Basic Usage

```jsx
import Share from '@/shared/ui/share/Share';

// Simple horizontal share buttons
<Share 
  url="https://example.com/product" 
  title="Check out this product!"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | Current page URL | URL to share |
| `title` | `string` | `''` | Title/message for sharing |
| `text` | `string` | `''` | Additional text (used for WhatsApp) |
| `layout` | `'horizontal' \| 'vertical'` | `'horizontal'` | Button layout direction |
| `showLabels` | `boolean` | `false` | Show platform names next to icons |
| `platforms` | `Array<string>` or `Object` | All platforms | Which platforms to show |
| `customPlatforms` | `Object` | `{}` | Custom platform configurations |
| `onCopySuccess` | `Function` | - | Callback when link is copied successfully |
| `onCopyError` | `Function` | - | Callback when copy fails |
| `className` | `string` | `''` | Additional CSS classes |

## Examples

### Horizontal Layout (Default)

```jsx
<Share 
  url="https://example.com/product" 
  title="Amazing Product"
  layout="horizontal"
/>
```

### Vertical Layout

```jsx
<Share 
  url="https://example.com/product" 
  title="Amazing Product"
  layout="vertical"
/>
```

### With Labels

```jsx
<Share 
  url="https://example.com/product" 
  title="Amazing Product"
  showLabels={true}
/>
```

### Specific Platforms Only

```jsx
<Share 
  url="https://example.com/product" 
  title="Amazing Product"
  platforms={['copy', 'twitter', 'facebook']}
/>
```

### With Callbacks

```jsx
<Share 
  url="https://example.com/product" 
  title="Amazing Product"
  onCopySuccess={() => console.log('Link copied!')}
  onCopyError={() => console.log('Copy failed')}
/>
```

### Custom Message for WhatsApp

```jsx
<Share
  url="https://example.com/product"
  title="Amazing Product"
  text="You have to see this amazing product! It's on sale now."
/>
```

### Adding Custom Platforms

You can add custom platforms like SMS, custom messaging apps, or any other sharing method:

```jsx
<Share
  url="https://example.com/product"
  title="Amazing Product"
  customPlatforms={{
    sms: {
      label: 'Text Message',
      icon: 'messageSquare',
      color: 'text-green-600',
      hoverColor: 'hover:text-green-700',
    },
    custom: {
      label: 'Custom Share',
      icon: 'share',
      color: 'text-purple-600',
      onClick: (url, title, text) => {
        // Custom sharing logic
        console.log('Sharing:', url, title, text);
      }
    }
  }}
  platforms={['copy', 'sms', 'custom']}
/>
```

## Available Platforms

- `copy` - Copy link to clipboard
- `twitter` - Share on Twitter
- `linkedin` - Share on LinkedIn
- `facebook` - Share on Facebook
- `whatsapp` - Share on WhatsApp
- `telegram` - Share on Telegram
- `reddit` - Share on Reddit
- `pinterest` - Share on Pinterest
- `email` - Share via Email
- `sms` - Share via SMS/Text Message

## Styling

The component uses Tailwind CSS classes and can be customized with the `className` prop:

```jsx
<Share 
  url="https://example.com/product" 
  title="Amazing Product"
  className="my-4 justify-center"
/>
```

## Integration Example

```jsx
"use client";
import { useState } from 'react';
import Share from '@/shared/ui/share/Share';
import Button from '@/shared/ui/button/Button';

export default function ProductActions() {
  const [showShare, setShowShare] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowShare(!showShare)}>
        Share Product
      </Button>

      {showShare && (
        <div className="mt-4 p-4 border rounded-lg">
          <p className="mb-3 font-semibold">Share this product:</p>
          <Share 
            title="Check out this amazing product!"
            layout="horizontal"
          />
        </div>
      )}
    </div>
  );
}
```

## Platform Configuration

Each platform can be configured with the following properties:

- `label` - Display name for the platform
- `icon` - Icon name from the shared icon library
- `color` - Tailwind text color class
- `hoverColor` - Tailwind hover text color class
- `type` - Platform type ('copy' or 'share')
- `onClick` - Custom click handler (optional, overrides default behavior)

Platform configurations are defined in `share.config.js` and can be extended using the `customPlatforms` prop.

## Notes

- The component automatically uses the current page URL if no `url` prop is provided
- Copy functionality uses the `copyToClipboard` utility from `@/shared/utils/copyToClipBoard`
- Share links open in new windows with proper security attributes
- The "Copied!" state automatically resets after 2 seconds
- Custom platforms can override default behavior by providing an `onClick` function
- All share URLs are properly encoded to handle special characters

