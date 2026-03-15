# API Service Layer

This directory contains the core API infrastructure for making HTTP requests to the backend.

## Architecture Overview

The API layer is organized into several interconnected files:

```
api/
├── client.js         - Axios instance with interceptors
├── config.js         - API configuration (base URL, timeout, headers)
├── endpoint.js       - All API endpoint definitions
├── errorHandler.js   - Centralized error handling
└── interceptors.js   - Request/response interceptors
```

## How It Works

### 1. Configuration (config.js)

Sets up the base configuration for all API calls:
- Base URL based on environment (development/production)
- Timeout settings (30 seconds)
- Default headers (Content-Type, Accept)
- Feature flags (logging, mock data)

### 2. Endpoints (endpoint.js)

Defines all API endpoints in one place:
- AUTH endpoints (signup, signin, verify-email, etc.)
- USER endpoints (profile, addresses, password)
- PRODUCT endpoints (list, details, by-slug)
- CART endpoints (get, add, update, delete)
- ORDER endpoints (list, create, track)
- UPLOAD endpoints (signature, delete)
- BANNER endpoints (active banners)

### 3. Client (client.js)

Creates the axios instance with:
- Base URL from config
- Timeout settings
- Default headers
- Cookie support (withCredentials: true)
- Request and response interceptors attached

### 4. Interceptors (interceptors.js)

Handles cross-cutting concerns:

Request Interceptor:
- Adds auth token from localStorage to headers
- Adds default headers to every request

Response Interceptor:
- Handles 401 errors (unauthorized)
- Implements token refresh logic (TODO)
- Redirects to login on auth failure

### 5. Error Handler (errorHandler.js)

Standardizes error responses:
- Network errors (timeout, no connection)
- HTTP status errors (400, 401, 403, 404, 409, 422, 429, 500)
- Validation errors with field-specific messages
- Rate limiting errors with retry information

## How Interceptors and Error Handler Are Connected

The connection happens in client.js:

```javascript
// 1. Import interceptors and create axios instance
import { requestInterceptor, responseInterceptor, responseErrorInterceptor } from './interceptors';

const apiClient = axios.create({ baseURL: '...', timeout: 30000 });

// 2. ATTACH interceptors to the axios instance
apiClient.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
apiClient.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

// 3. Export the configured client
export default apiClient;
```

Now when ANY service imports apiClient, the interceptors are already attached:

```javascript
// auth.service.js
import apiClient from '../api/client';  // This already has interceptors attached!
import { handleApiError } from '../api/errorHandler';

const response = await apiClient.post('/api/auth/signup', data);
// Interceptors run automatically because they're attached to apiClient
```

## How Services Use the API Layer

Each service (auth, user, cart, product) follows this pattern:

1. Import the API client (which already has interceptors attached)
2. Import the error handler
3. Import service-specific mappers
4. Make API calls using the client (interceptors run automatically)
5. Handle errors using the error handler (in catch block)
6. Map responses using mappers

## Example 1: User Signup Flow (Complete Connection)

```javascript
// FILE: SignupForm.jsx
// 1. User fills signup form in component
const formData = {
  firstName: "John",
  email: "john@example.com",
  password: "password123"
};

// 2. Component calls AuthService
await AuthService.signup(formData);

// ============================================================
// FILE: auth.service.js
// 3. AuthService receives the call
signup: async (formData) => {
  try {
    // 4. Map the request data
    const requestData = mapSignupRequest(formData);
    // Result: { firstName: "John", email: "john@example.com", password: "password123" }

    // 5. Make API call using apiClient
    const response = await apiClient.post(ENDPOINT.AUTH.SIGN_UP, requestData);
    //                      ↑
    //                      This apiClient already has interceptors attached!

    // ... success handling
  } catch (error) {
    // 10. If error occurs, handle it
    throw handleApiError(error);  // ← Error handler is called HERE
  }
}

// ============================================================
// WHAT HAPPENS WHEN apiClient.post() IS CALLED:

// FILE: client.js (this already ran when the app started)
const apiClient = axios.create({ baseURL: '...', timeout: 30000 });
apiClient.interceptors.request.use(requestInterceptor);      // ← Attached here
apiClient.interceptors.response.use(responseInterceptor, responseErrorInterceptor); // ← Attached here

// ============================================================
// FILE: interceptors.js
// 6. REQUEST INTERCEPTOR runs AUTOMATICALLY (before request is sent)
requestInterceptor = (config) => {
  // Add auth token from localStorage
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Add default headers
  config.headers['Content-Type'] = 'application/json';
  return config;  // Modified config is sent to backend
}

// 7. Request is sent to backend
// POST /api/auth/signup
// Headers: { Authorization: "Bearer ...", Content-Type: "application/json" }
// Body: { firstName: "John", email: "john@example.com", password: "password123" }

// 8. Backend processes and responds
// Response: { success: true, message: "User created", data: { user: {...} } }

// ============================================================
// FILE: interceptors.js
// 9. RESPONSE INTERCEPTOR runs AUTOMATICALLY (after response received)
responseInterceptor = (response) => {
  return response;  // Just pass through if successful
}

// If there was an error (e.g., 400, 401, 500):
responseErrorInterceptor = async (error) => {
  // Check if 401 and try to refresh token
  if (error.response?.status === 401) {
    // Try refresh token logic...
  }
  return Promise.reject(error);  // Reject so it goes to catch block
}

// ============================================================
// BACK TO: auth.service.js
// If response was successful:
const result = mapAuthResponseFromAPI(response.data);
return { ...result, message: result.message || AUTH_MESSAGES.SIGNUP_SUCCESS };

// If response was error (401, 400, 500, etc.):
catch (error) {
  throw handleApiError(error);  // ← Error handler formats the error
}

// ============================================================
// FILE: errorHandler.js
// 10. Error handler processes the error
handleApiError = (error) => {
  const { status, data } = error.response;

  if (status === 400) {
    return {
      type: 'VALIDATION_ERROR',
      message: data?.message || 'Validation failed',
      errors: data?.errors || {}
    };
  }
  // ... other status codes
}

// ============================================================
// BACK TO: SignupForm.jsx
// 11. Component receives the result or error
try {
  const result = await AuthService.signup(formData);
  toast.success(result.message);
} catch (error) {
  // Error is already formatted by handleApiError
  toast.error(error.message);
  if (error.errors) {
    setErrors(error.errors);
  }
}
```

## The Key Connection Points

1. Interceptors are attached in client.js (lines 39-48)
2. apiClient is exported with interceptors already attached
3. Services import apiClient (already has interceptors)
4. When service calls apiClient.post(), interceptors run automatically
5. Error handler is called manually in the catch block of each service method

## Visual Flow Diagram

```
Component (SignupForm.jsx)
    |
    | calls AuthService.signup(formData)
    ↓
AuthService (auth.service.js)
    |
    | imports apiClient (which has interceptors attached)
    | calls apiClient.post(url, data)
    ↓
Request Interceptor (interceptors.js) ← RUNS AUTOMATICALLY
    |
    | adds Authorization header
    | adds Content-Type header
    ↓
Axios sends HTTP request to Backend
    |
    | POST /api/auth/signup
    | Headers: { Authorization: "Bearer ...", Content-Type: "application/json" }
    ↓
Backend processes request
    |
    | validates data
    | creates user
    | sends response
    ↓
Response comes back to Axios
    |
    ↓
Response Interceptor (interceptors.js) ← RUNS AUTOMATICALLY
    |
    | checks if 401 (unauthorized)
    | if 401, tries to refresh token
    | if other error, rejects promise
    ↓
Back to AuthService
    |
    | if success: maps response and returns
    | if error: goes to catch block
    ↓
Error Handler (errorHandler.js) ← CALLED MANUALLY in catch block
    |
    | formats error based on status code
    | returns standardized error object
    ↓
Back to Component
    |
    | receives result or formatted error
    | shows toast message
    | updates UI
```

## Why This Design?

Interceptors are attached once:
- When client.js is imported for the first time, it creates apiClient and attaches interceptors
- Every service that imports apiClient gets the same instance with interceptors already attached
- No need to manually add headers or handle 401 errors in every service method

Error handler is called manually:
- Each service decides when to call handleApiError (in catch block)
- Allows services to do custom error handling if needed
- Keeps error formatting consistent across all services

## Example 2: Getting User Profile

```javascript
// 1. Component needs user data
const user = await getMyProfile();

// 2. UserService makes API call
const response = await apiClient.get(ENDPOINT.USER.ME);
// GET /api/users/me

// 3. Request interceptor adds auth token
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// 4. Backend validates token and responds
// Response: { success: true, data: { user: {...} } }

// 5. UserService maps the response
return mapUserResponse(response.data);
// Result: { id: "123", email: "john@example.com", firstName: "John", ... }

// 6. Component receives user data
// Displays user information in UI
```

## Example 3: Add to Cart Flow

```javascript
// 1. User clicks "Add to Cart" button
const productId = "prod_123";
const quantity = 2;

// 2. Component calls CartService
await CartService.addToCart(productId, null, quantity);

// 3. CartService maps the request
const requestData = mapAddToCartRequest(productId, null, quantity);
// Result: { productId: "prod_123", quantity: 2 }

// 4. CartService makes API call
const response = await apiClient.post(ENDPOINT.CART.CART, requestData);
// POST /api/cart

// 5. Request interceptor adds auth token
// Authorization: Bearer <token>

// 6. Backend adds item to cart and responds
// Response: { success: true, data: { cart: { items: [...], total: 1999 } } }

// 7. If error occurs (e.g., out of stock)
// Error handler catches it
// Returns: { type: "VALIDATION_ERROR", message: "Product out of stock" }

// 8. Component shows error toast
// toast.error("Product out of stock")

// 9. If successful, component updates cart state
// Shows success message, updates cart icon badge
```

## Error Handling Flow

```javascript
// When an error occurs:

// 1. Backend returns error response
// Status: 400, Body: { success: false, message: "Validation failed", errors: [...] }

// 2. Response interceptor catches it
// Checks if 401 (tries refresh), otherwise passes to error handler

// 3. Error handler processes it
const error = handleApiError(error);
// Result: { type: "VALIDATION_ERROR", message: "Validation failed", errors: [...] }

// 4. Service throws the formatted error
throw error;

// 5. Component catches it
catch (error) {
  if (error.errors) {
    // Show field-specific errors
    setErrors(error.errors);
  }
  toast.error(error.message);
}
```

## Key Principles

1. Separation of Concerns
   - API client handles HTTP communication
   - Services handle business logic
   - Mappers handle data transformation
   - Error handler handles error formatting

2. Single Source of Truth
   - All endpoints defined in endpoint.js
   - All API config in config.js
   - All error handling in errorHandler.js

3. Consistency
   - All services follow the same pattern
   - All errors are handled the same way
   - All responses are mapped consistently

4. Maintainability
   - Easy to add new endpoints
   - Easy to modify error handling
   - Easy to change base URL or config
   - Easy to add new interceptors

