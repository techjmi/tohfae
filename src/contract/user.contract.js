/* ======================== USER ROLES ======================== */
export const USER_ROLE = {
  CUSTOMER: "customer",
  ADMIN: "admin",
  VENDOR: "vendor",
};

/* ======================== USER STATUS ======================== */
export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
  DELETED: "deleted",
};

/* ======================== AUTH PROVIDER ======================== */
export const AUTH_PROVIDER = {
  LOCAL: "local",
  GOOGLE: "google",
  FACEBOOK: "facebook",
  APPLE: "apple",
};

/* ======================== USER SCHEMA ======================== */
export const USER_SCHEMA = {
  userId: { type: 'string', required: true },
  email: { type: 'string', required: true },
  phone: { type: 'string', optional: true },
  
  profile: {
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', optional: true },
    displayName: { type: 'string', optional: true },
    avatar: { type: 'string', optional: true },
    dateOfBirth: { type: 'date', optional: true },
  },
  
  role: { type: 'string', required: true, enum: Object.values(USER_ROLE) },
  status: { type: 'string', required: true, enum: Object.values(USER_STATUS) },
  
  authProvider: { type: 'string', required: true, enum: Object.values(AUTH_PROVIDER) },
  isEmailVerified: { type: 'boolean', default: false },
  isPhoneVerified: { type: 'boolean', default: false },
  
  addresses: {
    type: 'array',
    optional: true,
    items: {
      addressId: { type: 'string' },
      label: { type: 'string' },
      fullName: { type: 'string' },
      phone: { type: 'string' },
      addressLine1: { type: 'string' },
      addressLine2: { type: 'string', optional: true },
      city: { type: 'string' },
      state: { type: 'string' },
      pincode: { type: 'string' },
      country: { type: 'string' },
      isDefault: { type: 'boolean', default: false },
    }
  },
  
  preferences: {
    type: 'object',
    optional: true,
    properties: {
      language: { type: 'string', default: 'en' },
      currency: { type: 'string', default: 'INR' },
      notifications: {
        email: { type: 'boolean', default: true },
        sms: { type: 'boolean', default: false },
        push: { type: 'boolean', default: true },
      }
    }
  },
  
  createdAt: { type: 'date', required: true },
  updatedAt: { type: 'date', required: true },
};

/* ======================== VALIDATION FUNCTIONS ======================== */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  const cleanPhone = phone.replace(/\D/g, '');
  return phoneRegex.test(cleanPhone);
};

export const validatePassword = (password) => {
  const errors = [];
  
  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateAddress = (address) => {
  const errors = [];
  
  if (!address?.fullName?.trim()) errors.push('Full name is required');
  if (!address?.phone?.trim()) errors.push('Phone number is required');
  if (!address?.addressLine1?.trim()) errors.push('Address is required');
  if (!address?.city?.trim()) errors.push('City is required');
  if (!address?.state?.trim()) errors.push('State is required');
  if (!address?.pincode?.trim()) errors.push('Pincode is required');
  
  if (address?.phone && !validatePhone(address.phone)) {
    errors.push('Invalid phone number format');
  }
  
  if (address?.pincode && !/^\d{6}$/.test(address.pincode.replace(/\D/g, ''))) {
    errors.push('Invalid pincode format');
  }
  
  return { isValid: errors.length === 0, errors };
};

/* ======================== API REQUEST/RESPONSE CONTRACTS ======================== */

/**
 * POST /api/auth/signup - User registration
 */
export const SIGNUP_REQUEST = {
  body: {
    email: { type: 'string', required: true },
    password: { type: 'string', required: true },
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', optional: true },
    phone: { type: 'string', optional: true },
  }
};

export const SIGNUP_RESPONSE = {
  success: { type: 'boolean' },
  message: { type: 'string' },
  data: {
    userId: { type: 'string' },
    email: { type: 'string' },
    token: { type: 'string' },
  }
};

/**
 * POST /api/auth/signin - User login
 */
export const SIGNIN_REQUEST = {
  body: {
    email: { type: 'string', required: true },
    password: { type: 'string', required: true },
  }
};

export const SIGNIN_RESPONSE = {
  success: { type: 'boolean' },
  message: { type: 'string' },
  data: {
    userId: { type: 'string' },
    email: { type: 'string' },
    token: { type: 'string' },
    user: { type: 'User' },
  }
};

/**
 * POST /api/auth/signout - User logout
 */
export const SIGNOUT_REQUEST = {
  body: {}
};

export const SIGNOUT_RESPONSE = {
  success: { type: 'boolean' },
  message: { type: 'string' }
};

/**
 * GET /api/user/profile - Get user profile
 */
export const GET_PROFILE_REQUEST = {
  query: {}
};

export const GET_PROFILE_RESPONSE = {
  success: { type: 'boolean' },
  data: { type: 'User' }
};

/**
 * PUT /api/user/profile - Update user profile
 */
export const UPDATE_PROFILE_REQUEST = {
  body: {
    firstName: { type: 'string', optional: true },
    lastName: { type: 'string', optional: true },
    displayName: { type: 'string', optional: true },
    phone: { type: 'string', optional: true },
    dateOfBirth: { type: 'date', optional: true },
  }
};

export const UPDATE_PROFILE_RESPONSE = {
  success: { type: 'boolean' },
  message: { type: 'string' },
  data: { type: 'User' }
};

/**
 * POST /api/user/addresses - Add new address
 */
export const ADD_ADDRESS_REQUEST = {
  body: {
    label: { type: 'string', optional: true },
    fullName: { type: 'string', required: true },
    phone: { type: 'string', required: true },
    addressLine1: { type: 'string', required: true },
    addressLine2: { type: 'string', optional: true },
    city: { type: 'string', required: true },
    state: { type: 'string', required: true },
    pincode: { type: 'string', required: true },
    country: { type: 'string', optional: true, default: 'India' },
    isDefault: { type: 'boolean', optional: true, default: false },
  }
};

export const ADD_ADDRESS_RESPONSE = {
  success: { type: 'boolean' },
  message: { type: 'string' },
  data: {
    addressId: { type: 'string' },
  }
};

/**
 * PUT /api/user/addresses/:addressId - Update address
 */
export const UPDATE_ADDRESS_REQUEST = {
  params: {
    addressId: { type: 'string', required: true }
  },
  body: {
    label: { type: 'string', optional: true },
    fullName: { type: 'string', optional: true },
    phone: { type: 'string', optional: true },
    addressLine1: { type: 'string', optional: true },
    addressLine2: { type: 'string', optional: true },
    city: { type: 'string', optional: true },
    state: { type: 'string', optional: true },
    pincode: { type: 'string', optional: true },
    isDefault: { type: 'boolean', optional: true },
  }
};

export const UPDATE_ADDRESS_RESPONSE = {
  success: { type: 'boolean' },
  message: { type: 'string' }
};

/**
 * DELETE /api/user/addresses/:addressId - Delete address
 */
export const DELETE_ADDRESS_REQUEST = {
  params: {
    addressId: { type: 'string', required: true }
  }
};

export const DELETE_ADDRESS_RESPONSE = {
  success: { type: 'boolean' },
  message: { type: 'string' }
};

