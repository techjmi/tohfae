# Form Component

A powerful, reusable form component that renders any form based on field configuration. No more repetitive JSX - just define your fields and let the Form component handle the rest!

## Features

- ✅ Config-driven form rendering
- ✅ Supports all field types (input, select, textarea, checkbox, radio)
- ✅ Automatic error handling from backend
- ✅ Responsive grid layouts
- ✅ DRY principle - no repetitive code
- ✅ Consistent with all form components

## Basic Usage

### 1. Define Your Fields

```javascript
// myform.helper.js
import { INPUT_TYPE } from '@/shared/ui/from/form.constant';

export const MY_FORM_FIELDS = [
  {
    name: 'email',
    label: 'Email Address',
    type: INPUT_TYPE.EMAIL,
    placeholder: 'Enter your email',
    required: true
  },
  {
    name: 'password',
    label: 'Password',
    type: INPUT_TYPE.PASSWORD,
    placeholder: 'Enter password',
    required: true
  }
];
```

### 2. Use the Form Component

```javascript
"use client";
import { useState } from 'react';
import { Form } from '@/shared/ui/from';
import { MY_FORM_FIELDS } from './myform.helper';

export default function MyForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    try {
      await myApiCall(formData);
    } catch (error) {
      if (error.errors) setErrors(error.errors);
    }
  };

  return (
    <Form
      fields={MY_FORM_FIELDS}
      formData={formData}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
```

## Field Types

### Input Fields
```javascript
{
  name: 'fullName',
  label: 'Full Name',
  type: INPUT_TYPE.TEXT,
  placeholder: 'Enter your name',
  required: true
}
```

### Select Fields
```javascript
{
  name: 'country',
  label: 'Country',
  type: 'select',
  required: true,
  options: [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' }
  ]
}
```

### Textarea Fields
```javascript
{
  name: 'bio',
  label: 'Bio',
  type: 'textarea',
  placeholder: 'Tell us about yourself',
  rows: 4
}
```

### Checkbox Fields
```javascript
{
  name: 'subscribe',
  label: 'Subscribe to newsletter',
  type: 'checkbox'
}
```

### Radio Fields
```javascript
{
  name: 'gender',
  label: 'Gender',
  type: 'radio',
  options: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ]
}
```

## Grid Layout

For responsive 2-column layouts:

```javascript
export const GRID_FIELDS = [
  {
    row: 1,
    fields: [
      { name: 'city', label: 'City', type: INPUT_TYPE.TEXT, required: true },
      { name: 'state', label: 'State', type: INPUT_TYPE.TEXT, required: true }
    ]
  }
];

// Usage
<Form
  fields={SINGLE_COLUMN_FIELDS}
  gridFields={GRID_FIELDS}
  formData={formData}
  errors={errors}
  onChange={handleChange}
  onSubmit={handleSubmit}
/>
```

## Real Example: Address Form

See `tohfae/src/app/profile/address.helper.js` and `tohfae/src/app/profile/components/AddressFormModal.jsx` for a complete real-world example.

## Benefits

1. **No Repetitive Code**: Define fields once, render automatically
2. **Backend Validation**: Just pass errors from backend
3. **Consistent UI**: All forms look and behave the same
4. **Easy Maintenance**: Change field config, not JSX
5. **Reusable**: Use for login, signup, profile, addresses, etc.

