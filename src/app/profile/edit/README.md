## Edit Profile Page

## Overview

The Edit Profile page allows authenticated users to update their profile information including profile picture, name, and contact details. The page features Cloudinary integration for image uploads, form validation, and seamless Redux state management.

## Features

- Profile picture upload with Cloudinary integration
- Edit first name, last name, and phone number
- Email display (read-only)
- Form validation
- Success and error handling
- Auto-redirect after successful update
- Loading states during upload and submission
- Responsive design
- Orange theme consistency

## File Structure

```
edit/
├── page.js                      # Server component (SSR, auth check)
├── EditProfileClient.jsx        # Client component (form logic)
├── EditProfile.constants.js     # All constants centralized
├── EditProfile.css              # Tailwind-based styles
├── index.js                     # Module exports
└── README.md                    # Documentation
```

## How It Works

### 1. Image Upload Flow

```
User selects image
    ↓
ImageUpload component uploads to Cloudinary
    ↓
Cloudinary returns URL (e.g., https://res.cloudinary.com/.../photo.jpg)
    ↓
URL stored in formData.avatar
    ↓
Form submits with URL (not the actual image file)
    ↓
Backend API receives URL and saves to database
```

### 2. Form Submission Flow

```
User fills form and clicks "Save Changes"
    ↓
Client-side validation (first name required)
    ↓
Form data mapped to backend format
    ↓
API call to update profile
    ↓
Redux store updated with new user data
    ↓
Success message shown
    ↓
Auto-redirect to profile page after 2 seconds
```

## Constants Configuration

All constants are centralized in `EditProfile.constants.js`:

### PAGE_CONFIG
- Page title
- Back button aria label
- Success redirect delay

### FORM_FIELDS
- Field names, labels, placeholders
- Field types and validation rules
- Helper text

### SECTIONS
- Section titles and descriptions
- Profile Picture section
- Basic Information section

### IMAGE_UPLOAD_CONFIG
- Cloudinary folder structure
- Image transformations (400x400, crop, quality)
- Auto-upload settings

### BUTTONS
- Button text and variants
- Loading states

### MESSAGES
- Success messages
- Error messages

### ICONS
- Icon names for all UI elements

### CSS_CLASSES
- All CSS class names

## Usage

### Accessing the Page

Users can access the edit profile page in two ways:

1. **From Profile Page**: Click the "Edit Profile" button
2. **Direct URL**: Navigate to `/profile/edit`

### Authentication

The page requires authentication:
- If user is not authenticated, they are redirected to login page
- After login, they are redirected back to `/profile/edit`

### Editing Profile

1. **Upload Profile Picture** (optional):
   - Click or drag-and-drop image
   - Image automatically uploads to Cloudinary
   - Preview shown immediately
   - Can remove and re-upload

2. **Update Information**:
   - First Name (required)
   - Last Name (optional)
   - Phone Number (optional)
   - Email (read-only, cannot be changed)

3. **Save Changes**:
   - Click "Save Changes" button
   - Loading state shown during submission
   - Success message displayed
   - Auto-redirect to profile page

4. **Cancel**:
   - Click "Cancel" button
   - Returns to profile page without saving

## API Integration

### Endpoint Used

```javascript
PUT /api/users/me
```

### Request Format

```json
{
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "https://res.cloudinary.com/.../photo.jpg"
  },
  "phone": "+91 9876543210"
}
```

### Response Format

The API should return the updated user object, which is then:
1. Mapped using `mapUserResponse` from user.mapper
2. Updated in Redux store using `updateUser` action
3. Used to update the UI

## Redux Integration

The component integrates with Redux auth slice:

```javascript
import { updateUser } from '@/redux/slice/authSlice';

// After successful API update
dispatch(updateUser(updatedUser));
```

This ensures the user data is synchronized across the entire application.

## Cloudinary Setup

Before using the edit profile page, configure Cloudinary:

### 1. Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 2. Cloudinary Configuration

1. Create account at https://cloudinary.com
2. Get Cloud Name from dashboard
3. Create unsigned upload preset:
   - Settings > Upload > Add upload preset
   - Set "Signing Mode" to "Unsigned"
   - Save preset name

### 3. Image Organization

Images are organized by user ID:
```
users/{userId}/profile/image.jpg
```

This keeps user images organized and prevents conflicts.

## Validation

### Client-side Validation

- First name is required
- File size must be ≤ 5MB
- File format must be JPG, PNG, WEBP, or GIF

### Error Messages

All error messages are defined in constants:
- "First name is required"
- "Failed to update profile"
- "Failed to upload image"

## Styling

The page uses Tailwind CSS with custom classes defined in `EditProfile.css`:

- Responsive grid layout
- Orange theme for primary actions
- Loading states with animations
- Success/error message styling
- Mobile-friendly design

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Semantic HTML structure
- Focus management

## Related Components

- **ImageUpload** from `@/shared/ui/image-upload` - Image upload component
- **Button** from `@/shared/ui/button` - Action buttons
- **Input** from `@/shared/ui/from` - Form inputs
- **Icon** from `@/shared/icons` - UI icons
- **ProfileBody** from `@/shared/ui/profile` - Profile display component

## Future Enhancements

- Add bio/about section
- Add social media links
- Add profile visibility settings
- Add email change with verification
- Add profile completion percentage
- Add profile preview before saving

