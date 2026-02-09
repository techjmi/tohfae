# Input Component

A comprehensive, production-ready input field component following DRY (Don't Repeat Yourself) principles with generic, reusable functions.

## Features

- ✅ **DRY Principles** - Generic helper functions for styling (no code repetition)
- ✅ **Default Focus: False** - No auto-focus by default (as requested)
- ✅ **Multiple Variants** - solid, outline, ghost, underline
- ✅ **Multiple Sizes** - sm, md, lg, xl
- ✅ **Multiple States** - default, error, success, warning, disabled, readonly
- ✅ **Label Support** - Optional label with required indicator
- ✅ **Helper Text** - Optional guidance text below input
- ✅ **Error Messages** - Validation error display
- ✅ **Icon Support** - Prefix and suffix icons
- ✅ **Full Accessibility** - ARIA labels, descriptions, and states
- ✅ **Controlled & Uncontrolled** - Both modes supported

## Basic Usage

### Simple Input

```jsx
import { Input } from '@/shared/ui/from';

function MyComponent() {
  const [value, setValue] = useState('');
  
  return (
    <Input
      label="Full Name"
      placeholder="Enter your name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### Input with Helper Text

```jsx
<Input
  type="email"
  label="Email Address"
  placeholder="you@example.com"
  helperText="We'll never share your email with anyone else."
  required
/>
```

### Input with Error

```jsx
<Input
  type="email"
  label="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  state={INPUT_STATE.ERROR}
  errorMessage="Please enter a valid email address"
/>
```

### Input with Icons

```jsx
<Input
  type="search"
  placeholder="Search products..."
  prefixIcon="search"
/>

<Input
  type="email"
  label="Email"
  prefixIcon="mail"
  suffixIcon="check"
  state={INPUT_STATE.SUCCESS}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | "text" | Input type (text, email, password, etc.) |
| `id` | string | auto-generated | Input ID |
| `name` | string | - | Input name |
| `value` | string | - | Controlled value |
| `defaultValue` | string | - | Uncontrolled default value |
| `onChange` | function | - | Change handler |
| `onBlur` | function | - | Blur handler |
| `onFocus` | function | - | Focus handler |
| `placeholder` | string | - | Placeholder text |
| `variant` | string | "outline" | Visual variant (solid, outline, ghost, underline) |
| `size` | string | "md" | Size (sm, md, lg, xl) |
| `state` | string | "default" | State (default, error, success, warning, disabled, readonly) |
| `radius` | string | "md" | Border radius (none, sm, md, lg, full) |
| `label` | string | - | Label text |
| `required` | boolean | false | Required field indicator |
| `helperText` | string | - | Helper text below input |
| `errorMessage` | string | - | Error message (shown when state is error) |
| `prefixIcon` | string\|ReactNode | - | Icon before input |
| `suffixIcon` | string\|ReactNode | - | Icon after input |
| `disabled` | boolean | false | Disabled state |
| `readonly` | boolean | false | Readonly state |
| `autoFocus` | boolean | **false** | Auto focus (default: false) |
| `className` | string | "" | Additional CSS classes |

## Variants

### Solid
```jsx
<Input variant={INPUT_VARIANT.SOLID} placeholder="Solid input" />
```
- Gray background
- Transparent border
- Changes to white on focus

### Outline (Default)
```jsx
<Input variant={INPUT_VARIANT.OUTLINE} placeholder="Outline input" />
```
- White background
- Gray border
- Blue border on focus

### Ghost
```jsx
<Input variant={INPUT_VARIANT.GHOST} placeholder="Ghost input" />
```
- Transparent background
- No border
- Subtle background on hover/focus

### Underline
```jsx
<Input variant={INPUT_VARIANT.UNDERLINE} placeholder="Underline input" />
```
- Transparent background
- Bottom border only
- No border radius

## Sizes

```jsx
<Input size={INPUT_SIZE.SM} />  // Small
<Input size={INPUT_SIZE.MD} />  // Medium (default)
<Input size={INPUT_SIZE.LG} />  // Large
<Input size={INPUT_SIZE.XL} />  // Extra Large
```

## States

```jsx
<Input state={INPUT_STATE.DEFAULT} />   // Default
<Input state={INPUT_STATE.ERROR} />     // Error (red)
<Input state={INPUT_STATE.SUCCESS} />   // Success (green)
<Input state={INPUT_STATE.WARNING} />   // Warning (yellow)
<Input disabled />                       // Disabled
<Input readonly />                       // Readonly
```

## Icons

### Using Icon Names (String)
```jsx
<Input prefixIcon="search" />
<Input prefixIcon="mail" suffixIcon="check" />
```

### Using React Components
```jsx
import { FiEye, FiEyeOff } from 'react-icons/fi';

<Input 
  suffixIcon={
    <button onClick={togglePassword}>
      {showPassword ? <FiEyeOff /> : <FiEye />}
    </button>
  }
/>
```

## DRY Principles - Generic Helper Functions

The Input component uses generic, reusable helper functions from `form.style.js`:

1. **`getInputClasses(variant, state)`** - Returns input styling classes
2. **`getInputSizeClasses(size)`** - Returns size-specific classes
3. **`getInputRadiusClasses(radius, variant)`** - Returns border radius classes
4. **`getLabelClasses(size, state)`** - Returns label styling classes
5. **`getHelperTextClasses(state)`** - Returns helper text classes
6. **`getIconWrapperClasses(position, size)`** - Returns icon wrapper classes
7. **`getIconPaddingClasses(prefixIcon, suffixIcon, size)`** - Returns padding for icons

These functions eliminate code repetition and make the component maintainable.

## Examples

See `EXAMPLES.jsx` for complete examples:

1. **SimpleInputExample** - Basic input with label
2. **InputWithHelperTextExample** - Input with guidance text
3. **InputWithErrorExample** - Input showing error state
4. **InputWithIconsExample** - Inputs with prefix/suffix icons
5. **AllVariantsExample** - All 4 variants
6. **AllSizesExample** - All 4 sizes
7. **AllStatesExample** - All 6 states
8. **PasswordInputExample** - Password with show/hide toggle
9. **SearchInputExample** - Search field with icon
10. **FormExample** - Complete registration form with validation
11. **AllRadiusExample** - All border radius options

## Best Practices

✅ Use `label` prop for accessibility  
✅ Use `required` prop for required fields  
✅ Use `helperText` for guidance  
✅ Use `errorMessage` with `state={INPUT_STATE.ERROR}` for validation  
✅ Use `prefixIcon` for input type indicators (mail, lock, search)  
✅ Use `suffixIcon` for validation status (check, alert)  
✅ Keep `autoFocus={false}` (default) unless specifically needed  
✅ Use controlled components (`value` + `onChange`) for forms  

## Accessibility

The Input component is fully accessible:

- ✅ Proper `aria-label` attributes
- ✅ `aria-describedby` for helper text and errors
- ✅ `aria-invalid` for error states
- ✅ `aria-required` for required fields
- ✅ Keyboard navigation support
- ✅ Screen reader friendly

## Why DRY Principles?

Instead of repeating styling code in the component, we use generic helper functions:

**❌ Without DRY (Repetitive):**
```jsx
className={`
  ${variant === 'solid' ? 'bg-gray-100 border-transparent' : ''}
  ${variant === 'outline' ? 'bg-white border-gray-300' : ''}
  ${state === 'error' ? 'border-red-500' : ''}
  ${state === 'success' ? 'border-green-500' : ''}
  // ... 50+ more lines of repetitive code
`}
```

**✅ With DRY (Generic Functions):**
```jsx
className={classNames(
  getInputClasses(variant, state),
  getInputSizeClasses(size),
  getInputRadiusClasses(radius, variant),
  iconPaddingClasses
)}
```

Benefits:
- 🎯 **Maintainable** - Change once, apply everywhere
- 🎯 **Testable** - Test functions independently
- 🎯 **Readable** - Clean, easy to understand
- 🎯 **Scalable** - Easy to add new variants/states

