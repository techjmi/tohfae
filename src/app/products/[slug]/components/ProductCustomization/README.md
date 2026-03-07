# ProductCustomization Component

A comprehensive product customization component with authentication checks and multiple input types.

## Features

- Authentication Check: Shows login prompt for unauthenticated users
- Multiple Input Types: Select, Text, Textarea, Image upload
- Price Modifiers: Display additional costs for customization options
- Validation: Required fields, character limits, file size limits
- Shared Components: Uses Input component from shared UI library
- Modular Structure: Separate components for each input type
- CSS Modules: Scoped styling with Tailwind utilities
- Accessibility: Proper labels, ARIA attributes, keyboard navigation

## File Structure

```
ProductCustomization/
├── ProductCustomization.jsx          # Main component
├── ProductCustomization.constants.js # Constants and configuration
├── ProductCustomization.css          # Component styles
├── index.js                          # Module exports
├── components/                       # Sub-components
│   ├── LoginPrompt.jsx              # Login prompt for unauthenticated users
│   └── index.js                     # Component exports
└── README.md                         # Documentation
```

## Shared Components Used

This component uses the following shared UI components:
- **Input** from `@/shared/ui/from` - For text input fields
- **Select** from `@/shared/ui/from` - For dropdown selections
- **Textarea** from `@/shared/ui/from` - For multi-line text input
- **Button** from `@/shared/ui/button` - For login button in LoginPrompt
- **Icon** from `@/shared/icons` - For icons in LoginPrompt

## Usage

### Basic Usage

```jsx
import ProductCustomization from '@/app/products/[slug]/components/ProductCustomization';

<ProductCustomization
  customization={product.customization}
  onCustomizationChange={handleCustomizationChange}
  customizationData={customData}
/>
```

### With Custom Class

```jsx
<ProductCustomization
  customization={product.customization}
  onCustomizationChange={handleCustomizationChange}
  customizationData={customData}
  className="my-4"
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `customization` | `Object` | Yes | Product customization configuration |
| `onCustomizationChange` | `Function` | Yes | Callback when customization data changes |
| `customizationData` | `Object` | No | Current customization values |
| `className` | `string` | No | Additional CSS classes |

## Customization Object Structure

```javascript
{
  enabled: true,
  options: [
    {
      id: 'opt1',
      key: 'message',
      type: 'text',
      label: 'Custom Message',
      required: true,
      maxLength: 50,
      priceModifier: 50
    },
    {
      id: 'opt2',
      key: 'giftWrap',
      type: 'select',
      label: 'Gift Wrap',
      required: false,
      values: [
        { value: 'basic', label: 'Basic', priceModifier: 20 },
        { value: 'premium', label: 'Premium', priceModifier: 50 }
      ]
    },
    {
      id: 'opt3',
      key: 'image',
      type: 'image',
      label: 'Upload Image',
      required: false,
      maxSize: 5,
      allowedFormats: ['jpg', 'png']
    }
  ]
}
```

## Supported Input Types

### Select Dropdown
- Type: `select`
- Features: Multiple options with price modifiers displayed inline
- Uses: Shared `Select` component from `@/shared/ui/from`
- Props: label, required, placeholder, value, onChange
- Price modifiers shown in option text (e.g., "Gold (+₹500)")

### Text Input
- Type: `text`
- Features: Character limit, required validation, character counter
- Uses: Shared `Input` component from `@/shared/ui/from`
- Props: label, required, placeholder, maxLength, helperText
- Shows remaining characters as helper text

### Textarea
- Type: `textarea`
- Features: Multi-line text, character limit, character counter
- Uses: Shared `Textarea` component from `@/shared/ui/from`
- Props: label, required, placeholder, maxLength, rows, helperText
- Shows remaining characters as helper text

### Image Upload
- Type: `image`
- Features: File size validation, format restrictions
- Uses: Native HTML file input with custom styling
- Validation: Client-side file size and format checking
- Displays allowed formats and maximum file size

## Styling

The component uses a dedicated CSS file (`ProductCustomization.css`) with the following classes:

- `.customization-container`: Main container with border and background
- `.customization-title`: Section title
- `.options-container`: Container for all customization options
- `.option-wrapper`: Individual option wrapper
- `.option-label`: Label for each option
- `.required-indicator`: Red asterisk for required fields
- `.price-modifier`: Price modifier display
- `.price-modifier-positive`: Green color for positive price changes
- `.file-input`: Styled file input
- `.file-info`: File upload information text
- `.login-prompt-container`: Login prompt container
- `.login-prompt-icon`: Icon container in login prompt
- `.login-prompt-message`: Message text in login prompt
- `.login-prompt-button`: Login button styling

## Authentication

The component checks if the user is authenticated using Redux:

```javascript
const isAuthenticated = useSelector(selectIsAuthenticated);
```

If not authenticated, it displays a `LoginPrompt` component that:
- Shows a lock icon
- Displays a message asking users to login
- Provides a login button that redirects to `/login`
- Preserves the current URL for redirect after login

## Constants

All constants are defined in `ProductCustomization.constants.js`:

- `CUSTOMIZATION_TYPES`: Input type constants
- `FILE_UPLOAD_LIMITS`: File size and format limits
- `TEXT_LIMITS`: Character limits for text inputs
- `MESSAGES`: User-facing messages
- `CURRENCY_SYMBOL`: Currency symbol for price display

## Styling

Styles are defined in `ProductCustomization.module.css` using CSS Modules with Tailwind utilities.

Key style classes:
- `container`: Main container with border and padding
- `title`: Component title
- `optionsContainer`: Options wrapper with spacing
- `loginPrompt`: Login prompt container
- `selectInput`, `textareaInput`, `fileInput`: Input-specific styles

## Example

```jsx
const [customData, setCustomData] = useState({});

const handleCustomizationChange = (newData) => {
  setCustomData(newData);
  console.log('Customization updated:', newData);
};

<ProductCustomization
  customization={{
    enabled: true,
    options: [
      {
        id: '1',
        key: 'message',
        type: 'text',
        label: 'Gift Message',
        required: true,
        maxLength: 100,
        priceModifier: 50
      }
    ]
  }}
  onCustomizationChange={handleCustomizationChange}
  customizationData={customData}
/>
```

## Notes

- The component returns `null` if customization is not enabled or has no options
- File uploads validate size and format before accepting
- All inputs support required field validation
- Price modifiers are displayed next to labels
- Character counts are shown for text inputs with limits

