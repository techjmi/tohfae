## ImageUpload Component

## Overview

The ImageUpload component is a comprehensive, reusable image upload solution with Cloudinary integration. It provides a complete user experience for uploading images with drag-and-drop support, file validation, preview, progress tracking, and error handling. The component is designed to be flexible and can be used across the application for profile pictures, product images, review images, customization uploads, and more.

## Features

- Cloudinary integration for reliable image hosting
- Drag and drop file upload
- Click to browse file selection
- File validation (size and format)
- Real-time image preview
- Upload progress tracking with percentage
- Error handling with user-friendly messages
- Auto-upload option
- Customizable upload folder and transformations
- Responsive design
- Accessible with proper ARIA labels
- Orange theme consistency
- Support for JPG, PNG, WEBP, and GIF formats
- Maximum file size: 5MB (configurable)

## File Structure

```
image-upload/
├── ImageUpload.jsx              # Main component
├── ImageUpload.constants.js     # Configuration and constants
├── ImageUpload.helper.js        # Helper functions
├── ImageUpload.css              # Component styles
├── index.js                     # Module exports
└── README.md                    # Documentation
```

## Setup

### 1. Cloudinary Configuration

Before using the component, you need to set up Cloudinary:

1. Create a Cloudinary account at https://cloudinary.com
2. Get your Cloud Name from the dashboard
3. Create an unsigned upload preset:
   - Go to Settings > Upload
   - Scroll to "Upload presets"
   - Click "Add upload preset"
   - Set "Signing Mode" to "Unsigned"
   - Configure folder and transformations as needed
   - Save the preset name

### 2. Environment Variables

Add these variables to your `.env.local` file:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 3. Next.js Image Configuration

Add Cloudinary to your `next.config.mjs`:

```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};
```

## Basic Usage

```jsx
import ImageUpload from '@/shared/ui/image-upload';

function ProfileEdit() {
  const [profileImage, setProfileImage] = useState(null);

  return (
    <ImageUpload
      value={profileImage}
      onChange={(url) => setProfileImage(url)}
      label="Profile Picture"
      folder="profile-pictures"
      autoUpload={true}
    />
  );
}
```

## Props

### value (String, optional)
Current image URL. Use this for controlled component behavior.

### onChange (Function, optional)
Callback function called when image URL changes.
```javascript
onChange={(url) => console.log('New image URL:', url)}
```

### onUploadStart (Function, optional)
Callback function called when upload starts.
```javascript
onUploadStart={() => console.log('Upload started')}
```

### onUploadComplete (Function, optional)
Callback function called when upload completes successfully.
```javascript
onUploadComplete={(result) => {
  console.log('Upload complete:', result);
  // result: { url, publicId, format, width, height, bytes }
}}
```

### onUploadError (Function, optional)
Callback function called when upload fails.
```javascript
onUploadError={(error) => console.error('Upload error:', error)}
```

### onRemove (Function, optional)
Callback function called when image is removed.
```javascript
onRemove={() => console.log('Image removed')}
```

### autoUpload (Boolean, optional)
Auto upload image immediately after file selection. Default: `false`

### showPreview (Boolean, optional)
Show image preview after selection. Default: `true`

### disabled (Boolean, optional)
Disable the upload component. Default: `false`

### folder (String, optional)
Cloudinary folder path for organizing uploads.
```javascript
folder="profile-pictures"
folder="products/reviews"
folder="customizations"
```

### transformation (Object, optional)
Cloudinary transformation options for image optimization.
```javascript
transformation={{
  quality: 'auto',
  fetch_format: 'auto',
  width: 500,
  height: 500,
  crop: 'fill',
}}
```

### cloudName (String, optional)
Override default Cloudinary cloud name from environment variables.

### uploadPreset (String, optional)
Override default Cloudinary upload preset from environment variables.

### className (String, optional)
Additional CSS classes to apply to the container.

### label (String, optional)
Label text displayed above the upload area.

### helperText (String, optional)
Helper text displayed below the upload area.

### maxSize (Number, optional)
Maximum file size in bytes. Default: 5242880 (5MB)

### allowedFormats (Array, optional)
Allowed file MIME types. Default: `['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']`

## Advanced Examples

### Profile Picture Upload

```jsx
<ImageUpload
  value={user.profilePicture}
  onChange={(url) => updateProfile({ profilePicture: url })}
  label="Profile Picture"
  helperText="Upload a profile picture (JPG, PNG, or WEBP)"
  folder={`users/${userId}/profile`}
  autoUpload={true}
  transformation={{
    width: 400,
    height: 400,
    crop: 'fill',
    gravity: 'face',
  }}
/>
```

### Product Review Image

```jsx
<ImageUpload
  value={reviewImage}
  onChange={(url) => setReviewImage(url)}
  label="Add Photo to Review"
  helperText="Share a photo of your product"
  folder={`products/${productId}/reviews`}
  autoUpload={false}
  onUploadComplete={(result) => {
    console.log('Review image uploaded:', result.url);
  }}
/>
```

### Product Customization Upload

```jsx
<ImageUpload
  value={customizationImage}
  onChange={(url) => setCustomizationImage(url)}
  label="Upload Custom Design"
  helperText="Upload your custom design or logo"
  folder={`products/${productId}/customizations`}
  autoUpload={true}
  transformation={{
    quality: 'auto:best',
    fetch_format: 'auto',
  }}
  onUploadStart={() => setUploading(true)}
  onUploadComplete={() => setUploading(false)}
  onUploadError={(error) => {
    setUploading(false);
    toast.error(error.message);
  }}
/>
```

### Multiple Upload Instances

```jsx
function ProductForm() {
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);

  return (
    <div className="space-y-6">
      <ImageUpload
        value={thumbnail}
        onChange={setThumbnail}
        label="Product Thumbnail"
        folder="products/thumbnails"
        autoUpload={true}
      />

      <ImageUpload
        value={gallery[0]}
        onChange={(url) => setGallery([url, ...gallery.slice(1)])}
        label="Gallery Image 1"
        folder="products/gallery"
        autoUpload={true}
      />
    </div>
  );
}
```

## Constants

All configuration is centralized in `ImageUpload.constants.js`:

### UPLOAD_CONFIG
Upload configuration:
- `CLOUD_NAME`: Cloudinary cloud name (from env)
- `UPLOAD_PRESET`: Cloudinary upload preset (from env)
- `MAX_FILE_SIZE`: 5MB (5242880 bytes)
- `ALLOWED_FORMATS`: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
- `AUTO_UPLOAD`: false
- `SHOW_PREVIEW`: true

### UI_CONFIG
UI configuration:
- `PREVIEW_WIDTH`: 200px
- `PREVIEW_HEIGHT`: 200px
- `DROP_ZONE_HEIGHT`: 200px
- `PROGRESS_BAR_COLOR`: '#f97316' (orange)

### LABELS
Text labels for all UI elements

### ERROR_MESSAGES
User-friendly error messages

### UPLOAD_STATES
Upload state constants: IDLE, SELECTING, SELECTED, UPLOADING, UPLOADED, ERROR

## Helper Functions

The component includes several helper functions in `ImageUpload.helper.js`:

### validateFile(file)
Validates file size and format.

### formatFileSize(bytes)
Formats file size for display (e.g., "2.5 MB").

### createPreviewUrl(file)
Creates a blob URL for image preview.

### revokePreviewUrl(url)
Revokes blob URL to prevent memory leaks.

### uploadToCloudinary(file, onProgress, options)
Uploads file to Cloudinary with progress tracking.

## Behavior

### File Selection
- Click on drop zone to browse files
- Drag and drop files onto drop zone
- Only one file can be selected at a time
- File is validated immediately after selection

### Validation
- File size must be ≤ 5MB
- File format must be JPG, PNG, WEBP, or GIF
- Validation errors are displayed immediately

### Upload Process
1. User selects file (click or drag-drop)
2. File is validated
3. Preview is shown (if enabled)
4. If autoUpload is true, upload starts immediately
5. If autoUpload is false, user clicks "Upload" button
6. Progress bar shows upload percentage
7. On success, image URL is returned via onChange
8. On error, error message is displayed

### Preview
- Shows selected image before upload
- Shows uploaded image after upload
- Displays file name and size
- Shows upload progress overlay during upload

### Remove
- "Remove" button clears the selected/uploaded image
- Revokes blob URLs to prevent memory leaks
- Resets component to initial state
- Calls onChange with null value

## Styling

The component uses a dedicated CSS file (`ImageUpload.css`) with Tailwind utilities:

- `.image-upload-container`: Main container
- `.image-upload-drop-zone`: Drop zone area with dashed border
- `.image-upload-drop-zone-active`: Active state when dragging (orange border)
- `.image-upload-drop-zone-error`: Error state (red border)
- `.image-upload-preview-container`: Preview container
- `.image-upload-preview-image`: Preview image styling
- `.image-upload-progress-bar`: Progress bar (orange theme)
- `.image-upload-error-message`: Error message styling

Responsive styles:
- Mobile (max-width: 640px): Stacked buttons, reduced padding

## Accessibility

- Proper ARIA labels for file input
- Keyboard navigation support
- Screen reader friendly error messages
- Semantic HTML structure
- Focus management

## Error Handling

The component handles various error scenarios:

- **File too large**: "File size exceeds 5MB limit"
- **Invalid format**: "Invalid file format. Please upload JPG, PNG, WEBP, or GIF"
- **Upload failed**: "Upload failed. Please try again"
- **Network error**: "Network error. Please check your connection"
- **No file selected**: "Please select a file to upload"
- **Cloudinary not configured**: "Cloudinary is not configured..."

## Performance Considerations

- Blob URLs are properly revoked to prevent memory leaks
- Image preview uses Next.js Image component for optimization
- Upload progress is tracked with XMLHttpRequest
- File validation happens before upload to save bandwidth
- Cloudinary transformations optimize image delivery

## Security Considerations

- File type validation on client side
- File size validation on client side
- Unsigned upload preset (no API key exposed)
- Cloudinary handles server-side validation
- Folder structure for organized uploads

## Use Cases

### Profile/Auth Section
- User profile picture upload
- Avatar upload
- Cover photo upload

### Product Reviews
- Review image upload
- Multiple review images

### Product Customization
- Custom design upload
- Logo upload
- Pattern upload

### Admin/Dashboard
- Product image upload
- Category image upload
- Banner image upload

## Future Enhancements

- Multiple file upload support
- Image cropping before upload
- Image filters and effects
- Drag to reorder multiple images
- Paste from clipboard
- Camera capture on mobile
- Image compression before upload
- Thumbnail generation
- Progress cancellation
- Retry failed uploads
- Upload queue for multiple files

## Troubleshooting

### Images not uploading
- Check environment variables are set correctly
- Verify Cloudinary upload preset is unsigned
- Check browser console for errors
- Verify network connection

### Preview not showing
- Check Next.js image configuration includes Cloudinary domain
- Verify image URL is valid
- Check browser console for errors

### Upload fails with CORS error
- Verify Cloudinary upload preset allows uploads from your domain
- Check Cloudinary CORS settings

## Related Components

- **Button** from `@/shared/ui/button` - Action buttons
- **Icon** from `@/shared/icons` - Upload and status icons
- **Image** from `next/image` - Optimized image preview

## API Integration Ready

The component is designed to work seamlessly with backend APIs:

```jsx
// Example: Save uploaded image URL to backend
<ImageUpload
  value={product.image}
  onChange={async (url) => {
    // Update local state
    setProduct({ ...product, image: url });

    // Save to backend
    await updateProduct(productId, { image: url });
  }}
  onUploadComplete={(result) => {
    console.log('Cloudinary result:', result);
    // You can save additional metadata like publicId, format, etc.
  }}
/>
```
